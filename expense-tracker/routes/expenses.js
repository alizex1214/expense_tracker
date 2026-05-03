// routes/expenses.js — MongoDB version
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// GET /api/expenses
router.get('/', async (req, res) => {
  try {
    const { category, month, sort } = req.query;
    const query = {};
    if (category) query.category = category;
    if (month) query.date = { $regex: `^${month}` };

    let sortOption = { date: -1 };
    if (sort === 'asc') sortOption = { amount: 1 };
    if (sort === 'desc') sortOption = { amount: -1 };

    const expenses = await Expense.find(query).sort(sortOption);
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    res.json({ success: true, count: expenses.length, total, data: expenses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/expenses/summary
router.get('/summary', async (req, res) => {
  try {
    const { month } = req.query;
    const query = month ? { date: { $regex: `^${month}` } } : {};
    const expenses = await Expense.find(query);
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const byCategory = {};
    expenses.forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + e.amount; });
    const highest = expenses.reduce((max, e) => (!max || e.amount > max.amount ? e : max), null);
    const Budget = require('../models/Budget');
    const budgets = month ? await Budget.find({ month }) : await Budget.find();
    res.json({ success: true, data: { total, byCategory, highest, count: expenses.length, budgets } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/expenses/:id
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ success: false, message: 'Expense not found' });
    res.json({ success: true, data: expense });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/expenses
router.post('/', async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json({ success: true, message: 'Expense added successfully', data: expense });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/expenses/:id
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!expense) return res.status(404).json({ success: false, message: 'Expense not found' });
    res.json({ success: true, message: 'Expense updated successfully', data: expense });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/expenses/:id
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ success: false, message: 'Expense not found' });
    res.json({ success: true, message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

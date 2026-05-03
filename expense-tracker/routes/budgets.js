// routes/budgets.js — MongoDB version
const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

// GET /api/budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find().sort({ month: -1 });
    res.json({ success: true, data: budgets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/budgets — upsert (set or update)
router.post('/', async (req, res) => {
  try {
    const { category, limit, month } = req.body;
    // findOneAndUpdate with upsert = true handles both create & update
    const budget = await Budget.findOneAndUpdate(
      { category, month },
      { limit },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(201).json({ success: true, message: 'Budget set successfully', data: budget });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/budgets/:id
router.delete('/:id', async (req, res) => {
  try {
    const budget = await Budget.findByIdAndDelete(req.params.id);
    if (!budget) return res.status(404).json({ success: false, message: 'Budget not found' });
    res.json({ success: true, message: 'Budget deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

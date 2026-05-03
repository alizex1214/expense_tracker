// models/store.js — In-memory data storage (no DB required)
const { v4: uuidv4 } = require('uuid');

// Seed data
let expenses = [
  {
    id: uuidv4(),
    title: 'Groceries',
    amount: 2500,
    category: 'Food',
    date: '2026-04-01',
    note: 'Weekly grocery run',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Uber Ride',
    amount: 350,
    category: 'Transport',
    date: '2026-04-03',
    note: 'Office commute',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Netflix',
    amount: 1100,
    category: 'Entertainment',
    date: '2026-04-05',
    note: 'Monthly subscription',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Electricity Bill',
    amount: 4200,
    category: 'Utilities',
    date: '2026-04-08',
    note: 'Monthly bill',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Dinner Out',
    amount: 1800,
    category: 'Food',
    date: '2026-04-10',
    note: 'Family dinner',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Gym Membership',
    amount: 2000,
    category: 'Health',
    date: '2026-04-12',
    note: 'Monthly fee',
    createdAt: new Date().toISOString()
  }
];

let budgets = [
  { id: uuidv4(), category: 'Food', limit: 8000, month: '2026-04' },
  { id: uuidv4(), category: 'Transport', limit: 3000, month: '2026-04' },
  { id: uuidv4(), category: 'Entertainment', limit: 2000, month: '2026-04' },
  { id: uuidv4(), category: 'Utilities', limit: 5000, month: '2026-04' },
  { id: uuidv4(), category: 'Health', limit: 3000, month: '2026-04' }
];

module.exports = {
  getExpenses: () => [...expenses],
  getExpenseById: (id) => expenses.find(e => e.id === id),
  addExpense: (data) => {
    const expense = { id: uuidv4(), ...data, createdAt: new Date().toISOString() };
    expenses.push(expense);
    return expense;
  },
  updateExpense: (id, data) => {
    const idx = expenses.findIndex(e => e.id === id);
    if (idx === -1) return null;
    expenses[idx] = { ...expenses[idx], ...data };
    return expenses[idx];
  },
  deleteExpense: (id) => {
    const idx = expenses.findIndex(e => e.id === id);
    if (idx === -1) return false;
    expenses.splice(idx, 1);
    return true;
  },
  getBudgets: () => [...budgets],
  setBudget: (category, limit, month) => {
    const idx = budgets.findIndex(b => b.category === category && b.month === month);
    if (idx !== -1) {
      budgets[idx].limit = limit;
      return budgets[idx];
    }
    const budget = { id: uuidv4(), category, limit, month };
    budgets.push(budget);
    return budget;
  },
  deleteBudget: (id) => {
    const idx = budgets.findIndex(b => b.id === id);
    if (idx === -1) return false;
    budgets.splice(idx, 1);
    return true;
  }
};

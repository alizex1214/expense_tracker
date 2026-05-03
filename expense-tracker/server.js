// server.js — Main Express server with MongoDB
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const expenseRoutes = require('./routes/expenses');
const budgetRoutes = require('./routes/budgets');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets', budgetRoutes);

app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  const dbState = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  res.json({
    success: true,
    message: 'Expense Tracker API is running',
    version: '1.0.0',
    database: dbState[mongoose.connection.readyState] || 'Unknown',
    timestamp: new Date().toISOString()
  });
});

// ─── Frontend Routes ──────────────────────────────────────────────────────────
const pages = ['/', '/expenses', '/budget', '/reports', '/about'];
pages.forEach(page => {
  const file = page === '/' ? 'index' : page.slice(1);
  app.get(page, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', `${file}.html`));
  });
});

// 404 handler
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'Route not found' });
  }
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Expense Tracker running at http://localhost:${PORT}`);
  console.log(`📊 Dashboard  → http://localhost:${PORT}`);
  console.log(`💸 Expenses   → http://localhost:${PORT}/expenses`);
  console.log(`🎯 Budget     → http://localhost:${PORT}/budget`);
  console.log(`📈 Reports    → http://localhost:${PORT}/reports`);
  console.log(`🔗 API Health → http://localhost:${PORT}/api/health\n`);
});

module.exports = app;

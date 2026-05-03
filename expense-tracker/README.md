# 💰 ExpenseTrack — Personal Finance Manager

> **CSC-251 Web Technologies | Assignment 4 | Spring 2026**  
> PMAS Arid Agriculture University Rawalpindi  
> Instructor: Dr. Muhammad Habib

---

## 📋 Project Overview

**ExpenseTrack** is a full-stack Personal Finance Manager built with Node.js and Express. It allows users to track daily expenses, set monthly budgets per category, and visualize their spending through interactive charts and reports.

---

## 🎯 Assignment Requirements Fulfilled

| Requirement | Status |
|---|---|
| Backend server using Express | ✅ `server.js` |
| CRUD functionality (Add/View/Update/Delete) | ✅ Full CRUD on expenses & budgets |
| Frontend pages using HTML/CSS + Tailwind | ✅ 5 responsive pages |
| Frontend connected to backend APIs | ✅ Fetch API throughout |
| Data storage (in-memory) | ✅ `models/store.js` |
| Handle requests & return proper responses | ✅ JSON responses with status codes |
| REST API with proper routes | ✅ `/api/expenses`, `/api/budgets` |
| Middleware usage | ✅ CORS, JSON parser, logger, static files |
| Environment configuration | ✅ `.env` + dotenv |
| Home page | ✅ Dashboard (`index.html`) |
| At least 3 functional pages | ✅ Dashboard, Expenses, Budget, Reports, About |
| Form submission with backend processing | ✅ Add/Edit expense forms |
| Data storage and retrieval | ✅ In-memory store with UUID |
| Responsive design | ✅ Tailwind CSS + mobile sidebar |
| Deployment ready | ✅ Render.com compatible |

---

## 🏗️ Project Structure

```
expense-tracker/
├── server.js              # Main Express server
├── package.json           # Dependencies
├── .env                   # Environment variables
├── .gitignore
├── models/
│   └── store.js           # In-memory data store
├── routes/
│   ├── expenses.js        # Expense CRUD routes
│   └── budgets.js         # Budget routes
└── public/                # Frontend (served as static files)
    ├── index.html         # Dashboard (Home)
    ├── expenses.html      # Expense management
    ├── budget.html        # Budget planner
    ├── reports.html       # Analytics & charts
    ├── about.html         # About & API docs
    ├── 404.html           # 404 page
    ├── css/
    │   └── style.css      # Custom styles
    └── js/
        └── app.js         # Shared JS utilities
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Expense Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/expenses` | Get all expenses. Supports `?category=`, `?month=`, `?sort=` |
| GET | `/expenses/summary` | Get summary stats + category breakdown |
| GET | `/expenses/:id` | Get single expense by ID |
| POST | `/expenses` | Create new expense |
| PUT | `/expenses/:id` | Update expense by ID |
| DELETE | `/expenses/:id` | Delete expense by ID |

### POST /api/expenses — Request Body
```json
{
  "title": "Grocery shopping",
  "amount": 2500,
  "category": "Food",
  "date": "2026-04-24",
  "note": "Weekly groceries (optional)"
}
```

### Budget Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/budgets` | Get all budgets |
| POST | `/budgets` | Set a monthly budget |
| DELETE | `/budgets/:id` | Delete a budget |

### POST /api/budgets — Request Body
```json
{
  "category": "Food",
  "limit": 8000,
  "month": "2026-04"
}
```

### Health Check
```
GET /api/health
```

---

## 🛠️ Tech Stack

**Backend**
- Node.js (v18+)
- Express.js 4.x
- CORS middleware
- dotenv (environment config)
- uuid (unique IDs)
- In-memory data storage

**Frontend**
- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript (ES6+)
- Chart.js (doughnut + bar charts)
- Fetch API (frontend-backend integration)
- Google Fonts (Plus Jakarta Sans)

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# 3. Open browser
http://localhost:3000
```

---

## 🌐 Deployment on Render.com

1. Push this project to a GitHub repository
2. Create a free account at [render.com](https://render.com)
3. Click **New +** → **Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
6. Add Environment Variable: `NODE_ENV = production`
7. Click **Create Web Service**

---

## 📚 Learning Resources Used

- [Node.js Official Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs)
- [MDN Web Docs — Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Render Deployment Guide](https://render.com/docs/deploy-node-express-app)

---

## ✨ Features Summary

- 📊 **Dashboard** — Monthly summary, category breakdown, budget status, recent expenses
- 💸 **Expenses** — Full CRUD (Add, Edit, Delete), filter by category/month/sort
- 🎯 **Budget Planner** — Set monthly limits per category with progress tracking  
- 📈 **Reports** — Doughnut & bar charts powered by Chart.js, full expense table
- ℹ️ **About** — API docs, tech stack, learning resources, deployment steps
- 📱 **Responsive** — Mobile-first design with collapsible sidebar
- 🔔 **Toast notifications** — Real-time feedback on all actions

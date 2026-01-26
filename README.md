# 💰 FinTrack – Personal Finance Tracker

FinTrack is a **full-stack personal finance management web application** that helps users track income and expenses, manage monthly budgets, monitor recurring bills, and achieve savings goals — all from a clean, intuitive dashboard.

---

## 🚀 Features

### 🔐 Authentication
- Secure **JWT-based authentication**
- User **Signup & Login**
- Protected routes for authenticated users

### 📊 Dashboard
- Overview of:
  - Total Balance
  - Monthly Income
  - Monthly Expenses
  - Savings
- Budget allocation **pie chart**
- Monthly budgets with **spent & remaining**
- Recent transactions list

### 💳 Transactions
- Add income & expense transactions
- Category-wise tracking
- Search and filter by date

### 📅 Monthly Budgets
- Create budgets per **category, month, and year**
- Auto calculation of:
  - Amount spent
  - Remaining budget
- Over-budget detection

### 🔁 Recurring Bills
- Create recurring bills (monthly / yearly)
- Track:
  - Next due date
  - End date
  - Active / Inactive status
- Manual bill deactivation
- Automatic status updates based on dates

### 🎯 Savings Pots
- Create savings goals
- Add money incrementally
- Track progress visually

### 🎨 UI / UX
- Modern, responsive UI
- Dashboard-style cards
- Reusable components
- Clean tables & modals

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**
- React Router DOM
- Axios
- Recharts
- CSS (custom styling)

### Backend
- **Flask**
- Flask-JWT-Extended
- Flask-CORS
- MySQL Connector

### Database
- **MySQL**
- Normalized relational schema
- Indexed for performance

---

## 📂 Project Structure

        fintrack/
        ├── backend/
        │ ├── app.py
        │ ├── config.py
        │ ├── requirements.txt
        │ ├── db/
        │ │ └── database.py
        │ ├── routes/
        │ │ ├── auth.py
        │ │ ├── dashboard.py
        │ │ ├── transactions.py
        │ │ ├── budgets.py
        │ │ ├── pots.py
        │ │ └── bills.py
        │ └── utils/
        │ └── auth_utils.py
        │
        ├── frontend/
        │ ├── src/
        │ │ ├── pages/
        │ │ ├── components/
        │ │ ├── modal/
        │ │ ├── styles/
        │ │ ├── services/
        │ │ └── App.jsx
        │ └── package.json
        │
        ├── schema.sql
        └── README.md

## 🧠 Database Design

### Core Tables
- `users`
- `categories`
- `transcations`
- `budgets`
- `recurring_bills`
- `pots`

### Highlights
- Foreign key constraints
- Composite unique keys for budgets
- Indexed date and user fields
- Server-side SQL aggregation for dashboard metrics

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/fintrack.git
cd fintrack

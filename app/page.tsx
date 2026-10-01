"use client";

import { useEffect, useMemo, useState } from "react";

type TransactionType = "income" | "expense" | "investment" | "loan" | "savings";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  account: string;
  notes: string;
  recurring: boolean;
}

const categories = {
  income: ["Salary", "Freelance", "Business", "Rental", "Bonus", "Dividends"],
  expense: ["Groceries", "Utilities", "Rent", "Transport", "Dining", "Health", "Sanitary", "Shopping", "Travel", "Bills"],
  investment: ["Stocks", "Mutual Funds", "Crypto", "ETF", "Retirement", "Real Estate"],
  loan: ["EMI", "Personal Loan", "Education Loan", "Mortgage", "Credit Card"],
  savings: ["Emergency Fund", "Vacation Fund", "Education Fund", "House Fund", "General Savings"],
};

const defaultTransactions: Transaction[] = [
  { id: "1", title: "Salary Deposit", amount: 8500, type: "income", category: "Salary", date: "2026-09-01", account: "Bank Account", notes: "Monthly salary", recurring: true },
  { id: "2", title: "Groceries", amount: 420, type: "expense", category: "Groceries", date: "2026-09-04", account: "Debit Card", notes: "Weekly groceries", recurring: false },
  { id: "3", title: "House Rent", amount: 1800, type: "expense", category: "Rent", date: "2026-09-05", account: "Bank Account", notes: "Monthly rent", recurring: true },
  { id: "4", title: "Brokerage Investment", amount: 1200, type: "investment", category: "Mutual Funds", date: "2026-09-08", account: "Brokerage", notes: "Monthly SIP", recurring: true },
  { id: "5", title: "EMI Payment", amount: 650, type: "loan", category: "EMI", date: "2026-09-09", account: "Bank Account", notes: "Auto loan EMI", recurring: true },
  { id: "6", title: "Medicine Purchase", amount: 160, type: "expense", category: "Health", date: "2026-09-11", account: "Cash", notes: "Sanitary and vitamins", recurring: false },
  { id: "7", title: "Freelance Payment", amount: 2200, type: "income", category: "Freelance", date: "2026-09-15", account: "Payoneer", notes: "Client project payment", recurring: false },
  { id: "8", title: "Emergency Fund", amount: 500, type: "savings", category: "Emergency Fund", date: "2026-09-18", account: "Savings Account", notes: "Transfer to emergency fund", recurring: false },
];

const currency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getLastSixMonths = () => {
  const now = new Date();
  return Array.from({ length: 6 }, (_, index) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    return { label: monthNames[d.getMonth()], month: d.getMonth(), year: d.getFullYear() };
  });
};

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [typeFilter, setTypeFilter] = useState<"all" | TransactionType>("all");
  const [draft, setDraft] = useState({
    title: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    type: "expense" as TransactionType,
    category: "Groceries",
    account: "Main Wallet",
    notes: "",
    recurring: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("finance-tracker-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Transaction[];
        setTransactions(parsed.length ? parsed : defaultTransactions);
        return;
      } catch {
        // Ignore invalid data and use defaults.
      }
    }
    setTransactions(defaultTransactions);
  }, []);

  useEffect(() => {
    if (transactions.length) {
      localStorage.setItem("finance-tracker-data", JSON.stringify(transactions));
    }
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    if (typeFilter === "all") return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return transactions
      .filter((item) => item.type === typeFilter)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, typeFilter]);

  const summary = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const incomes = transactions.filter((item) => item.type === "income" && new Date(item.date).getMonth() === currentMonth && new Date(item.date).getFullYear() === currentYear).reduce((sum, item) => sum + item.amount, 0);
    const expenses = transactions.filter((item) => item.type === "expense" && new Date(item.date).getMonth() === currentMonth && new Date(item.date).getFullYear() === currentYear).reduce((sum, item) => sum + item.amount, 0);
    const investments = transactions.filter((item) => item.type === "investment" && new Date(item.date).getMonth() === currentMonth && new Date(item.date).getFullYear() === currentYear).reduce((sum, item) => sum + item.amount, 0);
    const loanPayments = transactions.filter((item) => item.type === "loan" && new Date(item.date).getMonth() === currentMonth && new Date(item.date).getFullYear() === currentYear).reduce((sum, item) => sum + item.amount, 0);
    const balances = transactions.reduce((total, item) => {
      if (item.type === "income" || item.type === "savings") return total + item.amount;
      if (item.type === "expense" || item.type === "investment" || item.type === "loan") return total - item.amount;
      return total;
    }, 0);

    const monthlyTrend = getLastSixMonths().map((monthInfo) => {
      const monthTransactions = transactions.filter((item) => {
        const date = new Date(item.date);
        return date.getMonth() === monthInfo.month && date.getFullYear() === monthInfo.year;
      });

      const income = monthTransactions.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
      const expense = monthTransactions.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);
      return { ...monthInfo, income, expense };
    });

    const categorySpend = Object.entries(
      transactions.reduce<Record<string, number>>((acc, item) => {
        if (item.type === "expense" || item.type === "loan") {
          acc[item.category] = (acc[item.category] || 0) + item.amount;
        }
        return acc;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return { incomes, expenses, investments, loanPayments, balances, monthlyTrend, categorySpend };
  }, [transactions]);

  const categoriesForType = categories[draft.type] || categories.expense;

  const handleAddTransaction = (event: React.FormEvent) => {
    event.preventDefault();
    const amount = Number(draft.amount);
    if (!draft.title.trim() || Number.isNaN(amount) || amount <= 0) return;

    const newTransaction: Transaction = {
      id: `${Date.now()}`,
      title: draft.title.trim(),
      amount,
      type: draft.type,
      category: draft.category,
      date: draft.date,
      account: draft.account,
      notes: draft.notes.trim(),
      recurring: draft.recurring,
    };

    setTransactions((previous) => [newTransaction, ...previous]);
    setDraft({
      title: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      type: "expense",
      category: "Groceries",
      account: "Main Wallet",
      notes: "",
      recurring: false,
    });
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((previous) => previous.filter((item) => item.id !== id));
  };

  return (
    <main className="page-shell">
      <div className="topbar">
        <div>
          <p className="eyebrow">Personal Finance Dashboard</p>
          <h1>Finance Tracker</h1>
        </div>
        <div className="summary-pill">
          <span>Net balance</span>
          <strong>{currency(summary.balances)}</strong>
        </div>
      </div>

      <section className="stats-grid">
        <article className="stat-card income">
          <span>Monthly income</span>
          <strong>{currency(summary.incomes)}</strong>
          <small>+ cash flow from salary and freelance work</small>
        </article>
        <article className="stat-card expense">
          <span>Monthly spending</span>
          <strong>{currency(summary.expenses)}</strong>
          <small>Includes groceries, rent, bills, healthcare and more</small>
        </article>
        <article className="stat-card investment">
          <span>Investments</span>
          <strong>{currency(summary.investments)}</strong>
          <small>Current month total committed to investments</small>
        </article>
        <article className="stat-card debt">
          <span>Loan payments</span>
          <strong>{currency(summary.loanPayments)}</strong>
          <small>EMIs and debt obligations tracked</small>
        </article>
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <h2>Add transaction</h2>
          </div>
          <form className="transaction-form" onSubmit={handleAddTransaction}>
            <div className="field-row two-column">
              <label>
                <span>Title</span>
                <input value={draft.title} onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))} placeholder="Example: Grocery restock" />
              </label>
              <label>
                <span>Amount</span>
                <input type="number" min="0" value={draft.amount} onChange={(e) => setDraft((prev) => ({ ...prev, amount: e.target.value }))} placeholder="0" />
              </label>
            </div>

            <div className="field-row two-column">
              <label>
                <span>Type</span>
                <select value={draft.type} onChange={(e) => {
                  const nextType = e.target.value as TransactionType;
                  const nextCategory = categories[nextType]?.[0] || "Groceries";
                  setDraft((prev) => ({ ...prev, type: nextType, category: nextCategory }));
                }}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                  <option value="investment">Investment</option>
                  <option value="loan">Loan</option>
                  <option value="savings">Savings</option>
                </select>
              </label>
              <label>
                <span>Category</span>
                <select value={draft.category} onChange={(e) => setDraft((prev) => ({ ...prev, category: e.target.value }))}>
                  {categoriesForType.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="field-row two-column">
              <label>
                <span>Date</span>
                <input type="date" value={draft.date} onChange={(e) => setDraft((prev) => ({ ...prev, date: e.target.value }))} />
              </label>
              <label>
                <span>Account</span>
                <input value={draft.account} onChange={(e) => setDraft((prev) => ({ ...prev, account: e.target.value }))} placeholder="Main Wallet" />
              </label>
            </div>

            <label>
              <span>Notes</span>
              <textarea value={draft.notes} onChange={(e) => setDraft((prev) => ({ ...prev, notes: e.target.value }))} rows={3} placeholder="Optional details about the transaction" />
            </label>

            <label className="checkbox-row">
              <input type="checkbox" checked={draft.recurring} onChange={(e) => setDraft((prev) => ({ ...prev, recurring: e.target.checked }))} />
              <span>Recurring transaction</span>
            </label>

            <button type="submit" className="primary-btn">Save transaction</button>
          </form>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Cash flow trend</h2>
          </div>
          <div className="trend-chart">
            {summary.monthlyTrend.map((point) => {
              const highest = Math.max(...summary.monthlyTrend.map((entry) => entry.income || 1), 1);
              const incomeHeight = (point.income / highest) * 100;
              const expenseHeight = (point.expense / highest) * 100;

              return (
                <div key={`${point.label}-${point.month}`} className="bar-group">
                  <div className="bar-stack">
                    <div className="bar bar-income" style={{ height: `${Math.max(incomeHeight, 12)}%` }} title={`${point.label}: ${currency(point.income)}`} />
                    <div className="bar bar-expense" style={{ height: `${Math.max(expenseHeight, 8)}%` }} title={`${point.label}: ${currency(point.expense)}`} />
                  </div>
                  <span>{point.label}</span>
                </div>
              );
            })}
          </div>

          <div className="legend">
            <span><i className="dot income-dot" /> Income</span>
            <span><i className="dot expense-dot" /> Expense</span>
          </div>
        </div>
      </section>

      <section className="panel lower-panel">
        <div className="panel-header split-header">
          <h2>Transactions</h2>
          <div className="filters">
            <button className={typeFilter === "all" ? "filter active" : "filter"} onClick={() => setTypeFilter("all")}>All</button>
            <button className={typeFilter === "income" ? "filter active" : "filter"} onClick={() => setTypeFilter("income")}>Income</button>
            <button className={typeFilter === "expense" ? "filter active" : "filter"} onClick={() => setTypeFilter("expense")}>Expense</button>
            <button className={typeFilter === "investment" ? "filter active" : "filter"} onClick={() => setTypeFilter("investment")}>Investment</button>
            <button className={typeFilter === "loan" ? "filter active" : "filter"} onClick={() => setTypeFilter("loan")}>Loan</button>
          </div>
        </div>

        <div className="transactions-list">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-main">
                <div className={`type-badge ${transaction.type}`}>
                  {transaction.type}
                </div>
                <div>
                  <h3>{transaction.title}</h3>
                  <p>{transaction.category} · {transaction.account}</p>
                </div>
              </div>

              <div className="transaction-meta">
                <span>{new Date(transaction.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                <strong className={transaction.type === "income" || transaction.type === "savings" ? "positive" : "negative"}>
                  {transaction.type === "income" || transaction.type === "savings" ? "+" : "-"}
                  {currency(transaction.amount)}
                </strong>
              </div>

              <button className="delete-btn" onClick={() => handleDeleteTransaction(transaction.id)}>Remove</button>
            </div>
          ))}
        </div>
      </section>

      <section className="panel lower-panel">
        <div className="panel-header">
          <h2>Top spending categories</h2>
        </div>
        <div className="category-list">
          {summary.categorySpend.map(([name, value], index) => (
            <div key={name + index} className="category-row">
              <div className="category-name-wrap">
                <span className="category-dot" />
                <span>{name}</span>
              </div>
              <strong>{currency(value)}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

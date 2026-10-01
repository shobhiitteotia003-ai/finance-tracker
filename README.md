html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(135deg, #081120 0%, #101b2b 55%, #0b1323 100%);
  color: #edf6ff;
}

* {
  box-sizing: border-box;
}

button, input, select, textarea {
  font: inherit;
}

.page-shell {
  max-width: 1300px;
  margin: 0 auto;
  padding: 32px 20px 60px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  gap: 16px;
}

.eyebrow {
  color: #7dd3fc;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  margin: 0 0 8px;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.summary-pill {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 18px;
  padding: 14px 18px;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.3);
}

.summary-pill span {
  color: #cbd5e1;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.summary-pill strong {
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  margin-top: 4px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.stat-card {
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 22px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 130px;
  box-shadow: 0 12px 28px rgba(2, 6, 23, 0.22);
}

.stat-card span {
  color: #cbd5e1;
  font-size: 14px;
}

.stat-card strong {
  font-size: clamp(1.5rem, 2vw, 2rem);
  margin: 16px 0 8px;
}

.stat-card small {
  color: #94a3b8;
  line-height: 1.5;
}

.stat-card.income {
  border-top: 4px solid #34d399;
}

.stat-card.expense {
  border-top: 4px solid #f87171;
}

.stat-card.investment {
  border-top: 4px solid #60a5fa;
}

.stat-card.debt {
  border-top: 4px solid #fbbf24;
}

.content-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.panel {
  background: rgba(15, 23, 42, 0.72);
  border-radius: 22px;
  padding: 22px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 14px 32px rgba(2, 6, 23, 0.2);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.3rem;
}

.transaction-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-row {
  display: grid;
  gap: 16px;
}

.two-column {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #dfeaf5;
}

label span {
  font-size: 0.9rem;
  color: #cbd5e1;
}

input, select, textarea {
  width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(15, 23, 42, 0.45);
  border-radius: 12px;
  color: #f8fafc;
  padding: 12px 14px;
}

input:focus, select:focus, textarea:focus {
  outline: 2px solid rgba(96, 165, 250, 0.45);
  border-color: rgba(96, 165, 250, 0.7);
}

.checkbox-row {
  flex-direction: row !important;
  align-items: center;
  gap: 10px;
  color: #e2e8f0;
}

.checkbox-row input {
  width: auto;
  accent-color: #60a5fa;
}

.primary-btn {
  border: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.primary-btn:hover {
  transform: translateY(-1px);
}

.trend-chart {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  min-height: 220px;
  padding-top: 18px;
}

.bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 44px;
}

.bar-stack {
  width: 100%;
  height: 170px;
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 6px;
  background: rgba(51, 65, 85, 0.24);
  border-radius: 12px 12px 8px 8px;
  padding: 8px 10px;
}

.bar {
  width: 16px;
  border-radius: 8px 8px 0 0;
  min-height: 12px;
}

.bar-income {
  background: linear-gradient(180deg, #34d399 0%, #10b981 100%);
}

.bar-expense {
  background: linear-gradient(180deg, #f87171 0%, #ef4444 100%);
}

.bar-group span {
  color: #cbd5e1;
  font-size: 12px;
}

.legend {
  display: flex;
  gap: 18px;
  color: #cbd5e1;
  font-size: 0.85rem;
  margin-top: 12px;
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  margin-right: 6px;
}

.income-dot {
  background: #34d399;
}

.expense-dot {
  background: #f87171;
}

.lower-panel {
  margin-top: 20px;
}

.split-header {
  gap: 16px;
  flex-wrap: wrap;
}

.filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter {
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(15, 23, 42, 0.4);
  color: #e2e8f0;
  border-radius: 999px;
  padding: 8px 12px;
  cursor: pointer;
}

.filter.active {
  background: rgba(96, 165, 250, 0.2);
  border-color: rgba(96, 165, 250, 0.55);
  color: white;
}

.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.transaction-item {
  display: grid;
  grid-template-columns: 1.3fr auto auto;
  gap: 14px;
  align-items: center;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.38);
  padding: 14px 16px;
}

.transaction-main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.type-badge {
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.type-badge.income {
  background: rgba(52, 211, 153, 0.15);
  color: #a7f3d0;
}

.type-badge.expense {
  background: rgba(248, 113, 113, 0.15);
  color: #fecaca;
}

.type-badge.investment {
  background: rgba(96, 165, 250, 0.15);
  color: #bfdbfe;
}

.type-badge.loan {
  background: rgba(251, 191, 36, 0.15);
  color: #fde68a;
}

.type-badge.savings {
  background: rgba(168, 85, 247, 0.15);
  color: #e9d5ff;
}

.transaction-main h3 {
  margin: 0 0 4px;
  font-size: 1rem;
}

.transaction-main p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.82rem;
}

.transaction-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  color: #cbd5e1;
}

.transaction-meta span {
  font-size: 0.8rem;
}

.positive {
  color: #4ade80;
}

.negative {
  color: #fca5a5;
}

.delete-btn {
  border: 1px solid rgba(248, 113, 113, 0.25);
  background: rgba(127, 29, 29, 0.18);
  color: #fecaca;
  padding: 8px 10px;
  border-radius: 10px;
  cursor: pointer;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(15, 23, 42, 0.35);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 12px;
  padding: 12px 14px;
}

.category-name-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.category-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, #60a5fa, #22d3ee);
}

@media (max-width: 980px) {
  .stats-grid,
  .content-grid {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
}

@media (max-width: 700px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .summary-pill {
    align-items: flex-start;
  }

  .stats-grid,
  .content-grid,
  .two-column {
    grid-template-columns: 1fr;
  }

  .transaction-item {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }

  .transaction-meta {
    align-items: flex-start;
  }
}

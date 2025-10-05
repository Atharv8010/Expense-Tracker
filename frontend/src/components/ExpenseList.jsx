import React from 'react';
import '../styles/ExpenseList.css';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getCategoryEmoji = (category) => {
    const emojiMap = {
      Food: '🍔',
      Transport: '🚗',
      Shopping: '🛍️',
      Entertainment: '🎬',
      Bills: '📄',
      Healthcare: '🏥',
      Other: '📌'
    };
    return emojiMap[category] || '💰';
  };

  if (expenses.length === 0) {
    return (
      <div className="expense-list-empty">
        <p>No expenses yet. Start adding your expenses!</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h3>All Expenses ({expenses.length})</h3>
      <div className="expenses-grid">
        {expenses.map((expense) => (
          <div key={expense._id} className="expense-card">
            <div className="expense-header">
              <div className="expense-category">
                <span className="category-emoji">{getCategoryEmoji(expense.category)}</span>
                <span className="category-name">{expense.category}</span>
              </div>
              <div className="expense-amount">₹{expense.amount.toFixed(2)}</div>
            </div>

            <div className="expense-body">
              <h4 className="expense-title">{expense.title}</h4>
              <p className="expense-date">{formatDate(expense.date)}</p>
              {expense.notes && (
                <p className="expense-notes">{expense.notes}</p>
              )}
            </div>

            <div className="expense-actions">
              <button
                className="btn-icon btn-edit"
                onClick={() => onEdit(expense)}
                title="Edit expense"
              >
                ✏️ Edit
              </button>
              <button
                className="btn-icon btn-delete"
                onClick={() => onDelete(expense._id)}
                title="Delete expense"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
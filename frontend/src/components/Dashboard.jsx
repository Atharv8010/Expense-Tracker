import React, { useState, useEffect } from 'react';
import api from '../api';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/expenses');
      setExpenses(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch expenses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const response = await api.post('/expenses', expenseData);
      setExpenses([response.data, ...expenses]);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to add expense' 
      };
    }
  };

  const handleUpdateExpense = async (id, expenseData) => {
    try {
      const response = await api.put(`/expenses/${id}`, expenseData);
      setExpenses(expenses.map(exp => exp._id === id ? response.data : exp));
      setEditingExpense(null);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to update expense' 
      };
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(exp => exp._id !== id));
    } catch (err) {
      setError('Failed to delete expense');
      console.error(err);
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (loading) {
    return <div className="loading">Loading expenses...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Your Expenses</h2>
        <div className="total-card">
          <span className="total-label">Total Expenses:</span>
          <span className="total-amount">₹{totalExpenses.toFixed(2)}</span>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-content">
        <div className="expense-form-section">
          <ExpenseForm
            onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
            editingExpense={editingExpense}
            onCancel={() => setEditingExpense(null)}
          />
        </div>

        <div className="expense-list-section">
          <ExpenseList
            expenses={expenses}
            onEdit={setEditingExpense}
            onDelete={handleDeleteExpense}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
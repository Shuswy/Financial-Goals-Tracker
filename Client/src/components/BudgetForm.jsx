import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BudgetForm = () => {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [savings, setSavings] = useState('');
  const [debts, setDebts] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/budgets', { income, expenses, savings, debts });
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Set Budget</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Income</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Expenses</label>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Savings</label>
          <input
            type="number"
            value={savings}
            onChange={(e) => setSavings(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Debts</label>
          <input
            type="number"
            value={debts}
            onChange={(e) => setDebts(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-success">Set Budget</button>
      </form>
    </div>
  );
};

export default BudgetForm;

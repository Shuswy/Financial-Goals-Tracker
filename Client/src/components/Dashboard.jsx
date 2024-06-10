import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseChart from './ExpenseChart';
import DebtChart from './DebtChart';
import BudgetChart from './BudgetChart';
import SavingsStats from './SavingsStats';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [debts, setDebts] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [savings, setSavings] = useState(0);
  const [target, setTarget] = useState(0);
  const [savingsHistory, setSavingsHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expenseRes, debtRes, budgetRes, savingsRes] = await Promise.all([
          axios.get('/api/expenses'),
          axios.get('/api/debts'),
          axios.get('/api/budgets'),
          axios.get('/api/savings')
        ]);

        setExpenses(Array.isArray(expenseRes.data) ? expenseRes.data : []);
        setDebts(Array.isArray(debtRes.data) ? debtRes.data : []);
        setBudgets(Array.isArray(budgetRes.data) ? budgetRes.data : []);
        setSavings(savingsRes.data.currentSavings);
        setTarget(savingsRes.data.savingsTarget);
        setSavingsHistory(savingsRes.data.history);
      } catch (error) {
        console.error('Error fetching data', error);
        setExpenses([]);
        setDebts([]);
        setBudgets([]);
        setSavings(0);
        setTarget(0);
        setSavingsHistory([]);
      }
    };
    fetchData();
  }, []);

  const expenseData = expenses.map(expense => ({
    name: expense.description,
    value: expense.amount
  }));

  const debtData = debts.map(debt => ({
    name: debt.description,
    value: debt.amount
  }));

  const budgetData = budgets.flatMap(budget => [
    { name: 'Income', value: budget.income },
    { name: 'Expenses', value: budget.expenses },
    { name: 'Savings', value: budget.savings },
    { name: 'Debts', value: budget.debts }
  ]);

  return (
    <div>
      <div className="my-8">
        <h2 className="text-xl font-bold mb-2">Savings</h2>
        <SavingsStats savings={savings} target={target} savingsHistory={savingsHistory} />
      </div>
      <div className="mb-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/3 px-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Expenses</h2>
            <ExpenseChart data={expenseData} />
          </div>
          <div className="w-full md:w-1/3 px-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Debts</h2>
            <DebtChart data={debtData} />
          </div>
          <div className="w-full md:w-1/3 px-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Budget</h2>
            <BudgetChart data={budgetData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

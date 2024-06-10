import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]); // Initial state as an empty array

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const result = await axios.get('/api/budgets');
        console.log(result.data); // Debug log
        if (Array.isArray(result.data)) { // Ensure the response is an array
          setBudgets(result.data);
        } else {
          setBudgets([]); // Fallback to an empty array if the response is not an array
        }
      } catch (error) {
        console.error('Error fetching budgets', error);
        setBudgets([]); // Fallback to an empty array on error
      }
    };
    fetchBudgets();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Budgets</h2>
      <ul className="list-disc pl-5">
        {budgets.length > 0 ? ( // Check if budgets array has items
          budgets.map((budget, index) => (
            <li key={index}>
              Income: ${budget.income}, Expenses: ${budget.expenses}, Savings: ${budget.savings}, Debts: ${budget.debts}
            </li>
          ))
        ) : (
          <li>No budgets yet</li> // Default message
        )}
      </ul>
    </div>
  );
};

export default BudgetList;

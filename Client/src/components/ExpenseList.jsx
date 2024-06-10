import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]); // Initial state as an empty array

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const result = await axios.get('/api/expenses');
        console.log(result.data); // Debug log
        if (Array.isArray(result.data)) { // Ensure the response is an array
          setExpenses(result.data);
        } else {
          setExpenses([]); // Fallback to an empty array if the response is not an array
        }
      } catch (error) {
        console.error('Error fetching expenses', error);
        setExpenses([]); // Fallback to an empty array on error
      }
    };
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Expenses</h2>
      <ul className="list-disc pl-5">
        {expenses.length > 0 ? ( // Check if expenses array has items
          expenses.map((expense, index) => (
            <li key={index}>
              {expense.description}: ${expense.amount}
            </li>
          ))
        ) : (
          <li>No expenses yet</li> // Default message
        )}
      </ul>
    </div>
  );
};

export default ExpenseList;

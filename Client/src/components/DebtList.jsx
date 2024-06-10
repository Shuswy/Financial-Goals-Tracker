import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DebtList = () => {
  const [debts, setDebts] = useState([]); // Initial state as an empty array

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const result = await axios.get('/api/debts');
        console.log(result.data); // Debug log
        if (Array.isArray(result.data)) { // Ensure the response is an array
          setDebts(result.data);
        } else {
          setDebts([]); // Fallback to an empty array if the response is not an array
        }
      } catch (error) {
        console.error('Error fetching debts', error);
        setDebts([]); // Fallback to an empty array on error
      }
    };
    fetchDebts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Debts</h2>
      <ul className="list-disc pl-5">
        {debts.length > 0 ? ( // Check if debts array has items
          debts.map((debt, index) => (
            <li key={index}>
              {debt.description}: ${debt.amount}
            </li>
          ))
        ) : (
          <li>No debts yet</li> // Default message
        )}
      </ul>
    </div>
  );
};

export default DebtList;

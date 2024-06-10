import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavingsList = () => {
  const [savings, setSavings] = useState([]); // Initial state as an empty array

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const result = await axios.get('/api/savings');
        console.log(result.data); // Debug log
        if (Array.isArray(result.data)) { // Ensure the response is an array
          setSavings(result.data);
        } else {
          setSavings([]); // Fallback to an empty array if the response is not an array
        }
      } catch (error) {
        console.error('Error fetching savings', error);
        setSavings([]); // Fallback to an empty array on error
      }
    };
    fetchSavings();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Savings</h2>
      <ul className="list-disc pl-5">
        {savings.length > 0 ? ( // Check if savings array has items
          savings.map((saving, index) => (
            <li key={index}>
              {saving.description}: ${saving.amount}
            </li>
          ))
        ) : (
          <li>No savings yet</li> // Default message
        )}
      </ul>
    </div>
  );
};

export default SavingsList;

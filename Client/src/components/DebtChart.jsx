import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DebtChart = ({ data }) => {
  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

  return (
    <ResponsiveContainer width="100%" height={400}>
      {data.length > 0 ? (
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-60 h-60 rounded-full bg-gray-300 mx-auto"></div>
            <p className="mt-4 text-gray-500">No debts</p>
          </div>
        </div>
      )}
    </ResponsiveContainer>
  );
};

export default DebtChart;
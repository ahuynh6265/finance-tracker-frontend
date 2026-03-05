import { useEffect, useState } from 'react';
import { getSummary } from '../api/api';

export default function Summary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getSummary().then(res => setSummary(res.data));
  }, []);

  if (!summary) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Summary</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-100 border border-green-300 rounded-lg p-6">
          <p className="text-sm text-green-600 font-medium">Total Income</p>
          <p className="text-2xl font-bold text-green-700">${summary.income}</p>
        </div>
        <div className="bg-red-100 border border-red-300 rounded-lg p-6">
          <p className="text-sm text-red-600 font-medium">Total Expenses</p>
          <p className="text-2xl font-bold text-red-700">${summary.expenses}</p>
        </div>
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-6">
          <p className="text-sm text-blue-600 font-medium">Net Balance</p>
          <p className="text-2xl font-bold text-blue-700">${summary['net balance']}</p>
        </div>
      </div>
    </div>
  );
}


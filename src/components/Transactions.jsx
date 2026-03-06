import { useEffect, useState } from 'react';
import { getTransactions, createTransaction, deleteTransaction, getAccounts, getCategories } from '../api/api';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    amount: '', transaction_type: 'income', description: '', date: '', account_id: '', category_id: ''
  });

  useEffect(() => {
    getTransactions().then(res => setTransactions(res.data));
    getAccounts().then(res => setAccounts(res.data));
    getCategories().then(res => setCategories(res.data));
  }, []);

  const handleSubmit = async () => {
    await createTransaction(form);
    getTransactions().then(res => setTransactions(res.data));
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const getAccountName = (id) => {
    const account = accounts.find(a => a.id === id);
    return account ? account.bank_name : 'Unknown';
  };
  
  const getCategoryName = (id) => {
    const category = categories.find(c => c.id === id);
    return category ? category.name : 'Unknown';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>

      <div className="grid grid-cols-2 gap-5">
      <div className="bg-green-100 border border-green-300 rounded-lg p-6">
      <input placeholder="Amount" onChange={e => setForm({...form, amount: e.target.value})} />
      </div>

      <div className="bg-red-100 border border-red-300 rounded-lg p-6">
      <select onChange={e => setForm({...form, transaction_type: e.target.value})}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      </div>

      <div className="bg-blue-100 border border-blue-300 rounded-lg p-6">
      <input placeholder="Description" onChange={e => setForm({...form, description: e.target.value})} />
      </div>

      <div className="bg-purple-100 border border-purple-300 rounded-lg p-6">
      <input type="date" onChange={e => setForm({...form, date: e.target.value})} />
      </div>

      <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-6">
      <select onChange={e => setForm({...form, account_id: e.target.value})}>
        <option value="">Select Account</option>
        {accounts.map(a => <option key={a.id} value={a.id}>{a.bank_name}</option>)}
      </select>
      </div>

      <div className="bg-orange-100 border border-orange-300 rounded-lg p-6">
      <select onChange={e => setForm({...form, category_id: e.target.value})}>
        <option value="">Select Category</option>
        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      </div>

    </div>
    <div className="flex justify-center">
      <button className="bg-white-50 border border-black-500 rounded-lg p-1 text mt-3 mb-3" onClick={handleSubmit}>Add Transaction</button>
      </div> 
    <div className="grid grid-cols-2 gap-6 mt-4">
    <div>
    <h2 className="text-green-600 font-bold mb-2">Income</h2>
    {transactions.filter(t => t.transaction_type === 'income').map(t => (
      <div className="border border-green-300 rounded-lg p-3 mb-2" key={t.id}>
        <p>{t.date} — {t.description} — ${t.amount} — {getAccountName(t.account_id)} — {getCategoryName(t.category_id)}</p>
        <button className="bg-white-50 border border-black-500 rounded-lg p-1 text" onClick={() => handleDelete(t.id)}>Delete</button>
      </div>
    ))}
    </div>
    <div>
    <h2 className="text-red-600 font-bold mb-2">Expenses</h2>
    {transactions.filter(t => t.transaction_type === 'expense').map(t => (
      <div className="border border-red-300 rounded-lg p-3 mb-2" key={t.id}>
        <p>{t.date} — {t.description} — ${t.amount} — {getAccountName(t.account_id)} — {getCategoryName(t.category_id)}</p>
        <button className="bg-white-50 border border-black-500 rounded-lg p-1 text" onClick={() => handleDelete(t.id)}>Delete</button>
      </div>
    ))}
      </div>
      </div>
      </div>

  );
}
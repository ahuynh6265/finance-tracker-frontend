import {useEffect, useState} from 'react'; 
import {getAccounts, createAccount, deleteAccount, getTransactions} from "../api/api"; 

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    bank_name: '', account_type: '', balance: ''
  });

  useEffect(() => {
    getAccounts().then(res => setAccounts(res.data));
    getTransactions().then(res => setTransactions(res.data));
  }, []);

  const handleSubmit = async () => {
    await createAccount(form); 
    getAccounts().then(res => setAccounts(res.data));
  };

  const handleDelete = async (id) => {
    await deleteAccount(id); 
    setAccounts(accounts.filter(a => a.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Accounts</h1>
    
    <div className="grid grid-cols-3 gap-5">
      <div className="bg-red-100 border border-red-300 rounded-lg p-6">
      <input placeholder="Bank Name" onChange={e => setForm({...form, bank_name: e.target.value})} />
      </div>

      <div className="bg-green-100 border border-green-300 rounded-lg p-6">
      <select onChange={e => setForm({...form, account_type: e.target.value})}>
        <option value="checking">Checking</option>
        <option value="savings">Savings</option>
        <option value="credit">Credit</option>
      </select>
      </div>

      <div className="bg-blue-100 border border-blue-300 rounded-lg p-6">
      <input placeholder="Balance" onChange={e => setForm({...form, balance: e.target.value})} />
      </div>
    </div>  

      <div className = "flex justify-center"> 
      <button className="bg-white-50 border border-black-500 rounded-lg p-1 text mt-3 mb-3" onClick={handleSubmit}>Add Account</button>
      </div> 


      <h2 className="text-xl font-bold mb-3 underline flex justify-center">Account Balances</h2> 

      {accounts.map(a => {
  const accountTransactions = transactions.filter(t => t.account_id === a.id);
  const income = accountTransactions.filter(t => t.transaction_type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expenses = accountTransactions.filter(t => t.transaction_type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="border border-green-300 rounded-lg p-3 mb-2" key={a.id}>
      <div className="flex justify-between items-center">
        <span className="font-medium">{a.bank_name}</span>
        <span className="text-gray-500">{a.account_type}</span>
        <span className="text-green-600 font-bold">${a.balance}</span>
        <button onClick={() => handleDelete(a.id)} className="text-red-500">Delete</button>
      </div>
      <div className="flex gap-4 mt-1 text-sm">
        <span className="text-green-600">Income: ${income.toFixed(2)}</span>
        <span className="text-red-600">Expenses: ${expenses.toFixed(2)}</span>
      </div>
    </div>
  );
})}
    </div>
  );
}
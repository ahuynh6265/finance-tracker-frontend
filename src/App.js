import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Summary from './components/Summary';
import Transactions from './components/Transactions';
import Accounts from './components/Accounts';
import Categories from './components/Categories';

function App() {
  return (
    <Router>
      <nav className="bg-gray-900 text-white px-8 py-4 flex gap-8">
        <Link to="/" className="hover:text-blue-400">Summary</Link>
        <Link to="/transactions" className="hover:text-blue-400">Transactions</Link>
        <Link to="/accounts" className="hover:text-blue-400">Accounts</Link>
        <Link to="/categories" className="hover:text-blue-400">Categories</Link>
      </nav>
      <div className="max-w-4xl mx-auto px-8 py-8">
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
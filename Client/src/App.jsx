import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import DebtForm from './components/DebtForm';
import SavingsForm from './components/SavingsForm';
import BudgetForm from './components/BudgetForm';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './Pages/LandingPage';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <AuthProvider>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/expenses" element={<ExpenseForm />} />
          <Route path="/debts" element={<DebtForm />} />
          <Route path="/savings" element={<SavingsForm />} />
          <Route path="/budget" element={<BudgetForm />} />
          <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;

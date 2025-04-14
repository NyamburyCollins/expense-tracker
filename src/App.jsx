import { useState } from 'react';
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";

export default function App() {
  // State management
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Groceries', amount: 150, category: 'Food' },
    { id: 2, description: 'Electricity', amount: 200, category: 'Utilities' },
    { id: 3, description: 'Movie tickets', amount: 30, category: 'Entertainment' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ 
    key: null, 
    direction: 'asc' 
  });

  // Handler functions
  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Processed data
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredExpenses = sortedExpenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Expense Tracker
        </h1>
        
        
        <ExpenseForm onAddExpense={handleAddExpense} />
        
        <div className="mt-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search expenses..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <ExpenseTable 
            expenses={filteredExpenses} 
            onDelete={handleDeleteExpense} 
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        </div>
      </div>
    </div>
  );
}
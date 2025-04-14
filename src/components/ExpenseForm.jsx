import { useState } from 'react';

export default function ExpenseForm({ onAddExpense }) {
  // State for controlled form inputs
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;
    
    onAddExpense({
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category
    });
    
    // Reset form
    setFormData({
      description: '',
      amount: '',
      category: 'Food'
    });
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              name="description"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              min="0.01"
              step="0.01"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
import { useState, useEffect } from 'react';

const ExpenseForm = ({ onSubmit, editingExpense }) => {
  const [form, setForm] = useState({ title: '', amount: '', date: '', category: '' });

  useEffect(() => {
    if (editingExpense) {
      setForm(editingExpense);
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'amount' ? +value : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', amount: '', date: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
      <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} />
      <input name="date" type="date" value={form.date} onChange={handleChange} />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="">Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit">{editingExpense ? 'Update' : 'Add'} Expense</button>
    </form>
  );
};

export default ExpenseForm;

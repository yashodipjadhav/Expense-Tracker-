import { useEffect, useState } from 'react';
import API from '../api';
import { useAuth } from '../context';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: '', amount: '', date: '', category: '' });
  const [editingId, setEditingId] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    const res = await API.get('/expenses');
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const total = expenses.reduce((acc, e) => acc + e.amount, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await API.put(`/expenses/${editingId}`, form);
      setEditingId(null);
    } else {
      await API.post('/expenses', form);
    }
    setForm({ title: '', amount: '', date: '', category: '' });
    fetchExpenses();
  };

  const handleEdit = (expense) => {
    setForm(expense);
    setEditingId(expense._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/expenses/${id}`);
    fetchExpenses();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
      <h2>Total: ${total}</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: +e.target.value })} />
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
          <option value="">Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">{editingId ? 'Update' : 'Add'} Expense</button>
      </form>

      <ul>
        {expenses.map(exp => (
          <li key={exp._id}>
            {exp.title} - ${exp.amount} ({exp.category}) on {new Date(exp.date).toLocaleDateString()}
            <button onClick={() => handleEdit(exp)}>Edit</button>
            <button onClick={() => handleDelete(exp._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

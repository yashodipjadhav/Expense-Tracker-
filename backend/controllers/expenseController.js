import Expense from '../models/Expense.js';

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ userId: req.userId });
  res.json(expenses);
};

export const createExpense = async (req, res) => {
  const expense = await Expense.create({ ...req.body, userId: req.userId });
  res.status(201).json(expense);
};

export const updateExpense = async (req, res) => {
  const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(expense);
};

export const deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

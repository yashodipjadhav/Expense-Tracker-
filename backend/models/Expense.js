import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  date: Date,
  category: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Expense', expenseSchema);

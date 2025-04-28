const ExpenseItem = ({ expense, onEdit, onDelete }) => {
    return (
      <li>
        {expense.title} - ${expense.amount} ({expense.category}) on {new Date(expense.date).toLocaleDateString()}
        <button onClick={() => onEdit(expense)}>Edit</button>
        <button onClick={() => onDelete(expense._id)}>Delete</button>
      </li>
    );
  };
  
  export default ExpenseItem;
  
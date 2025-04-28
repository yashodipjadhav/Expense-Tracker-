import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  return (
    <ul>
      {expenses.map(exp => (
        <ExpenseItem
          key={exp._id}
          expense={exp}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default ExpenseList;

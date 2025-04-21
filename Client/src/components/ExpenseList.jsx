import { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../Services/api";
import { useAuth } from "../context/AuthContext";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = await user.getIdToken();
        const data = await getExpenses(token);
        setExpenses(data);
      } catch  {
        setError("Failed to fetch expenses");
      }
    };
    if (user) fetchExpenses();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const token = await user.getIdToken();
      await deleteExpense(id, token);
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch {
      setError("Failed to delete expense");
    }
  };

  return (
    <div className="expense-list">
      <h3>Expenses</h3>
      {error && <p className="error">{error}</p>}
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              <span>
                {expense.description} - ${expense.amount.toFixed(2)} ({expense.category}) - {expense.date}
              </span>
              <button onClick={() => handleDelete(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
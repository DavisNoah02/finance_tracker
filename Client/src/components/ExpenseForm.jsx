import { useState } from "react";
import { addExpense } from "../Services/api";
import { useAuth } from "../context/AuthContext";

export default function ExpenseForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = await user.getIdToken();
      await addExpense(
        { description, amount: parseFloat(amount), category },
        token
      );
      setDescription("");
      setAmount("");
      setCategory("");
    } catch (err) {
      setError("Failed to add expense");
    }
  };

  return (
    <div className="expense-form">
      <h3>Add Expense</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            step="0.01"
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}
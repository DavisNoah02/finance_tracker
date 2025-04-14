import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

export default function Home() {
  return (
    <div>
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
}
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Dashboard</h2>
      <ExpenseForm />
      <div className="my-8 border-t border-gray-200"></div>
      <ExpenseList />
    </div>
  );
}
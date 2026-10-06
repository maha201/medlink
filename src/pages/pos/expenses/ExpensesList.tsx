import React, { useState } from "react";
import {
  Receipt,
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
  FileText,
} from "lucide-react";

interface ExpenseItem {
  id: string;
  expenseNo: string;
  category: string;
  title: string;
  amount: number;
  paidTo: string;
  date: string;
}

const initialExpenses: ExpenseItem[] = [
  {
    id: "1",
    expenseNo: "EXP-2026-001",
    category: "Utilities",
    title: "Electricity Bill - October",
    amount: 4500.0,
    paidTo: "TNEB Board",
    date: "2026-10-05",
  },
  {
    id: "2",
    expenseNo: "EXP-2026-002",
    category: "Rent",
    title: "Pharmacy Store Rent",
    amount: 25000.0,
    paidTo: "Mr. Murugan (Landlord)",
    date: "2026-10-01",
  },
  {
    id: "3",
    expenseNo: "EXP-2026-003",
    category: "Salaries",
    title: "Staff Pharmacist Advance",
    amount: 10000.0,
    paidTo: "Kavitha (Staff)",
    date: "2026-10-04",
  },
];

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredExpenses = expenses.filter((item) => {
    const matchesSearch =
      item.expenseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paidTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this expense record?")
    ) {
      setExpenses(expenses.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Receipt className="text-indigo-600" /> Expenses List
          </h1>
          <p className="text-sm text-gray-500">
            Track and manage store operational costs, utilities, rent, and
            salaries.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors self-start md:self-auto">
          <Plus size={16} /> Add Expense
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by expense no, title or paid to..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            <option value="Utilities">Utilities</option>
            <option value="Rent">Rent</option>
            <option value="Salaries">Salaries</option>
          </select>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Expense No</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Title / Description</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Paid To</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-xs font-semibold text-indigo-600">
                      {expense.expenseNo}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        {expense.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {expense.title}
                    </td>
                    <td className="py-3 px-4 font-bold text-red-600">
                      ₹{expense.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {expense.paidTo}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs flex items-center gap-1 mt-1">
                      <Calendar size={14} /> {expense.date}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        className="p-1.5 text-gray-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No expense records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;

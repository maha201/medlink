import {
  Receipt,
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
  ChevronDown,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useState, useMemo } from "react";

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

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter((item) => {
      const matchesSearch =
        item.expenseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.paidTo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, searchTerm, categoryFilter]);

  // Pagination calculation
  const totalEntries = filteredExpenses.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this expense record?")
    ) {
      setExpenses(expenses.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaf6f5] text-[#3a9898] flex items-center justify-center">
              <Receipt size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a2632]">
                Expenses Directory
              </h2>
              <p className="text-xs text-[#8b9bae]">
                Track store operational costs, utilities, rent, and salaries.
              </p>
            </div>
            <button
              onClick={handleRefresh}
              title="Refresh Data"
              className="p-1.5 text-[#8b9bae] hover:text-[#3a9898] hover:bg-[#f5f7f8] rounded-full transition-all ml-2"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="flex gap-4 items-center flex-wrap">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]"
                size={16}
              />
              <input
                type="text"
                placeholder="Search expense..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 bg-[#f5f7f8] border border-[#dde5e7] rounded-full text-xs text-[#1a2632] placeholder-[#8b9bae] focus:outline-none focus:border-[#3a9898] transition-colors"
              />
            </div>

            {/* Category Filter Dropdown */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none px-4 py-2 pr-9 bg-[#f5f7f8] hover:bg-[#eaf6f5] text-[#5a6a76] hover:text-[#3a9898] text-xs font-semibold rounded-full transition-colors border border-[#dde5e7] hover:border-[#b5d9d5] focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Utilities">Utilities</option>
                <option value="Rent">Rent</option>
                <option value="Salaries">Salaries</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b9bae] pointer-events-none"
              />
            </div>

            <div className="w-px h-8 bg-[#dde5e7] mx-1 hidden sm:block"></div>

            <button
              onClick={() => alert("Open Add Expense Modal")}
              className="flex items-center gap-2 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20"
            >
              <Plus size={16} strokeWidth={2.5} />
              Add Expense
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-3">
              <Loader2 size={32} className="animate-spin text-[#3a9898]" />
              <p className="text-xs font-semibold">Loading expenses list...</p>
            </div>
          ) : paginatedExpenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-2">
              <p className="text-sm font-semibold text-[#1a2632]">
                No Expense Records Found
              </p>
              <p className="text-xs">
                Click "Add Expense" to record a new transaction.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-[#dde5e7]">
                  <th className="py-4 pl-6 pr-4 w-12">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8]"
                    />
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Expense No ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Category ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Title / Description ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Amount ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Paid To ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Date ↕
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dde5e7]">
                {paginatedExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="hover:bg-[#f5f7f8] transition-colors group"
                  >
                    <td className="py-4 pl-6 pr-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer"
                      />
                    </td>

                    {/* Expense No */}
                    <td className="py-4 px-4 font-mono text-xs font-bold text-[#3a9898]">
                      {expense.expenseNo}
                    </td>

                    {/* Category Badge */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0] capitalize">
                        {expense.category}
                      </span>
                    </td>

                    {/* Title */}
                    <td className="py-4 px-4 text-sm font-bold text-[#1a2632]">
                      {expense.title}
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-4 text-sm font-bold text-[#e11d48]">
                      ₹{expense.amount.toFixed(2)}
                    </td>

                    {/* Paid To */}
                    <td className="py-4 px-4 text-sm font-medium text-[#5a6a76]">
                      {expense.paidTo}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap flex items-center gap-1.5 pt-5">
                      <Calendar size={14} className="text-[#8b9bae]" />
                      {expense.date}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className="p-1.5 text-[#5a6a76] hover:text-[#3a9898] rounded-lg hover:bg-[#eaf6f5] transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="p-1.5 text-[#5a6a76] hover:text-[#e11d48] rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Dynamic Pagination Footer */}
        <div className="p-4 border-t border-[#dde5e7] flex items-center justify-between text-sm text-[#5a6a76] flex-wrap gap-3">
          <div>
            Showing{" "}
            {paginatedExpenses.length === 0
              ? 0
              : (currentPage - 1) * itemsPerPage + 1}{" "}
            to {Math.min(currentPage * itemsPerPage, totalEntries)} of{" "}
            {totalEntries} entries
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7] disabled:opacity-40 disabled:hover:bg-transparent"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded font-medium transition-all ${
                    currentPage === pageNum
                      ? "bg-[#3a9898] text-white"
                      : "hover:bg-[#f0f4f5]"
                  }`}
                >
                  {pageNum}
                </button>
              ),
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={
                currentPage === totalPages || loading || totalPages === 0
              }
              className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7] disabled:opacity-40 disabled:hover:bg-transparent"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

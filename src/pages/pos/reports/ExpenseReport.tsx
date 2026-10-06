import React, { useState } from "react";
import { Receipt, Search, Download, Calendar } from "lucide-react";

interface ExpenseReportItem {
  id: string;
  expenseNo: string;
  category: string;
  title: string;
  paidTo: string;
  amount: number;
  date: string;
}

const initialExpenseReports: ExpenseReportItem[] = [
  {
    id: "1",
    expenseNo: "EXP-2026-001",
    category: "Utilities",
    title: "Electricity Bill",
    paidTo: "TNEB",
    amount: 4500.0,
    date: "2026-10-05",
  },
  {
    id: "2",
    expenseNo: "EXP-2026-002",
    category: "Rent",
    title: "Monthly Store Rent",
    paidTo: "Mr. Murugan",
    amount: 25000.0,
    date: "2026-10-01",
  },
  {
    id: "3",
    expenseNo: "EXP-2026-003",
    category: "Salaries",
    title: "Staff Advance",
    paidTo: "Kavitha",
    amount: 10000.0,
    date: "2026-10-04",
  },
];

const ExpenseReport: React.FC = () => {
  const [reports, setReports] = useState<ExpenseReportItem[]>(
    initialExpenseReports,
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reports.filter(
    (item) =>
      item.expenseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Receipt className="text-indigo-600" /> Expense & Operational Cost
            Report
          </h1>
          <p className="text-sm text-gray-500">
            Analyze store overheads, utilities, rental outlays, and payroll
            disbursements.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors self-start md:self-auto">
          <Download size={16} /> Export Expense Report
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by expense no, category or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Expense Report Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Expense No</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Paid To</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredReports.length > 0 ? (
                filteredReports.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-xs font-semibold text-indigo-600">
                      {item.expenseNo}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {item.title}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.paidTo}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs flex items-center gap-1 mt-1">
                      <Calendar size={14} /> {item.date}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-red-600">
                      ₹{item.amount.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No expense report records found.
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

export default ExpenseReport;

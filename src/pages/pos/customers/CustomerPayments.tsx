import React, { useState } from "react";
import {
  CreditCard,
  Search,
  Plus,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";

interface CustomerPayment {
  id: string;
  paymentNo: string;
  customerName: string;
  amount: number;
  paymentMethod: "Cash" | "UPI" | "Card" | "Bank Transfer";
  status: "Completed" | "Pending";
  date: string;
}

const initialPayments: CustomerPayment[] = [
  {
    id: "1",
    paymentNo: "PAY-2026-001",
    customerName: "Arun Kumar",
    amount: 1500.0,
    paymentMethod: "UPI",
    status: "Completed",
    date: "2026-10-06",
  },
  {
    id: "2",
    paymentNo: "PAY-2026-002",
    customerName: "Divya Ramesh",
    amount: 850.0,
    paymentMethod: "Cash",
    status: "Completed",
    date: "2026-10-05",
  },
  {
    id: "3",
    paymentNo: "PAY-2026-003",
    customerName: "Karthik Raja",
    amount: 3200.0,
    paymentMethod: "Card",
    status: "Pending",
    date: "2026-10-04",
  },
];

const CustomerPayments: React.FC = () => {
  const [payments, setPayments] = useState<CustomerPayment[]>(initialPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [methodFilter, setMethodFilter] = useState("All");

  const filteredPayments = payments.filter((item) => {
    const matchesSearch =
      item.paymentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod =
      methodFilter === "All" || item.paymentMethod === methodFilter;
    return matchesSearch && matchesMethod;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <CreditCard className="text-indigo-600" /> Customer Payments & Due
            Clearances
          </h1>
          <p className="text-sm text-gray-500">
            Track customer settlements, pending credit balances, and receipt
            logs.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors self-start md:self-auto">
          <Plus size={16} /> Record Payment
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
            placeholder="Search by payment no or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Payment Methods</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Payment No</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-xs font-semibold text-indigo-600">
                      {item.paymentNo}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {item.customerName}
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600">
                      ₹{item.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium">
                        {item.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-max ${
                          item.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.status === "Completed" ? (
                          <CheckCircle size={12} />
                        ) : (
                          <Clock size={12} />
                        )}
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs flex items-center gap-1 mt-1">
                      <Calendar size={14} /> {item.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No customer payment records found.
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

export default CustomerPayments;

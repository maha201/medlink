import React, { useState } from "react";
import {
  Wallet,
  Search,
  Plus,
  Lock,
  Unlock,
  Calendar,
  ArrowUpRight,
  DollarSign,
} from "lucide-react";

interface CashRegisterSession {
  id: string;
  registerNo: string;
  cashierName: string;
  openingBalance: number;
  cashSales: number;
  closingBalance: number;
  status: "Open" | "Closed";
  date: string;
}

const initialRegisters: CashRegisterSession[] = [
  {
    id: "1",
    registerNo: "REG-001",
    cashierName: "Arun Kumar (Morning)",
    openingBalance: 2000.0,
    cashSales: 14500.0,
    closingBalance: 16500.0,
    status: "Open",
    date: "2026-10-06",
  },
  {
    id: "2",
    registerNo: "REG-002",
    cashierName: "Divya Ramesh (Evening)",
    openingBalance: 2000.0,
    cashSales: 8200.0,
    closingBalance: 10200.0,
    status: "Closed",
    date: "2026-10-05",
  },
  {
    id: "3",
    registerNo: "REG-003",
    cashierName: "Karthik Raja (Night)",
    openingBalance: 1500.0,
    cashSales: 5400.0,
    closingBalance: 6900.0,
    status: "Closed",
    date: "2026-10-04",
  },
];

const CashRegister: React.FC = () => {
  const [registers, setRegisters] =
    useState<CashRegisterSession[]>(initialRegisters);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredRegisters = registers.filter((item) => {
    const matchesSearch =
      item.registerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cashierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Wallet className="text-indigo-600" /> Cash Register & Shifts
          </h1>
          <p className="text-sm text-gray-500">
            Manage cashier opening/closing balances, cash drawers, and shift
            logs.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors self-start md:self-auto">
          <Plus size={16} /> Open New Register
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Current Drawer Status
            </p>
            <h3 className="text-xl font-bold text-emerald-600 mt-1 flex items-center gap-1">
              <Unlock size={18} /> Active (Open)
            </h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Wallet size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Today's Cash Sales
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              ₹14,500.00
            </h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <ArrowUpRight size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Opening Float</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">₹2,000.00</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <DollarSign size={24} />
          </div>
        </div>
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
            placeholder="Search by register no or cashier name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Registers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Register No</th>
                <th className="py-3 px-4">Cashier Name</th>
                <th className="py-3 px-4">Opening Balance</th>
                <th className="py-3 px-4">Cash Sales</th>
                <th className="py-3 px-4">Closing Balance</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredRegisters.length > 0 ? (
                filteredRegisters.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-xs font-semibold text-indigo-600">
                      {item.registerNo}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {item.cashierName}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      ₹{item.openingBalance.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-600">
                      +₹{item.cashSales.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900">
                      ₹{item.closingBalance.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-max ${
                          item.status === "Open"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.status === "Open" ? (
                          <Unlock size={12} />
                        ) : (
                          <Lock size={12} />
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
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No cash register logs found.
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

export default CashRegister;

import React, { useState } from "react";
import {
  ArrowLeftRight,
  Search,
  Calendar,
  Filter,
  Package,
} from "lucide-react";

interface StockMovementItem {
  id: string;
  productName: string;
  code: string;
  type: "Stock In" | "Stock Out" | "Transfer";
  quantity: number;
  reference: string;
  date: string;
  performedBy: string;
}

const initialMovements: StockMovementItem[] = [
  {
    id: "1",
    productName: "Paracetamol 650mg",
    code: "MED-001",
    type: "Stock In",
    quantity: 100,
    reference: "PUR-2026-001",
    date: "2026-10-06",
    performedBy: "Admin",
  },
  {
    id: "2",
    productName: "Amoxicillin 500mg",
    code: "MED-002",
    type: "Stock Out",
    quantity: 25,
    reference: "INV-2026-104",
    date: "2026-10-06",
    performedBy: "Cashier",
  },
  {
    id: "3",
    productName: "Cough Syrup 100ml",
    code: "MED-003",
    type: "Stock Out",
    quantity: 10,
    reference: "INV-2026-102",
    date: "2026-10-05",
    performedBy: "Cashier",
  },
];

const StockMovement: React.FC = () => {
  const [movements, setMovements] =
    useState<StockMovementItem[]>(initialMovements);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredMovements = movements.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ArrowLeftRight className="text-indigo-600" /> Stock Movement Log
          </h1>
          <p className="text-sm text-gray-500">
            Track incoming and outgoing stock transactions in real-time.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by product, code or reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Movements</option>
            <option value="Stock In">Stock In</option>
            <option value="Stock Out">Stock Out</option>
            <option value="Transfer">Transfer</option>
          </select>
        </div>
      </div>

      {/* Movement Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Movement Type</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Reference No.</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Performed By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredMovements.length > 0 ? (
                filteredMovements.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {item.productName}
                    </td>
                    <td className="py-3 px-4 text-gray-500 font-mono text-xs">
                      {item.code}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.type === "Stock In"
                            ? "bg-emerald-50 text-emerald-700"
                            : item.type === "Stock Out"
                              ? "bg-indigo-50 text-indigo-700"
                              : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {item.type === "Stock In"
                        ? `+${item.quantity}`
                        : `-${item.quantity}`}
                    </td>
                    <td className="py-3 px-4 text-indigo-600 font-mono text-xs">
                      {item.reference}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs flex items-center gap-1">
                      <Calendar size={14} /> {item.date}
                    </td>
                    <td className="py-3 px-4 text-gray-700 font-medium">
                      {item.performedBy}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No stock movement logs found.
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

export default StockMovement;

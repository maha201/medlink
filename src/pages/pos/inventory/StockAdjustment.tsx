import React, { useState } from "react";
import { Sliders, Search, Plus, Calendar, FileText } from "lucide-react";

interface StockAdjustmentItem {
  id: string;
  productName: string;
  code: string;
  type: "Addition" | "Subtraction";
  quantity: number;
  reason: string;
  date: string;
  adjustedBy: string;
}

const initialAdjustments: StockAdjustmentItem[] = [
  {
    id: "1",
    productName: "Paracetamol 650mg",
    code: "MED-001",
    type: "Addition",
    quantity: 50,
    reason: "New Stock Shipment Received",
    date: "2026-10-06",
    adjustedBy: "Admin",
  },
  {
    id: "2",
    productName: "Amoxicillin 500mg",
    code: "MED-002",
    type: "Subtraction",
    quantity: 10,
    reason: "Damaged Strips / Expired",
    date: "2026-10-05",
    adjustedBy: "Pharmacist",
  },
];

const StockAdjustment: React.FC = () => {
  const [adjustments, setAdjustments] =
    useState<StockAdjustmentItem[]>(initialAdjustments);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAdjustments = adjustments.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Sliders className="text-indigo-600" /> Stock Adjustments
          </h1>
          <p className="text-sm text-gray-500">
            Manually add or remove stock due to damages, returns, or audits.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors self-start md:self-auto">
          <Plus size={16} /> New Adjustment
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
            placeholder="Search adjustments by product or reason..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Adjustments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Adjusted By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredAdjustments.length > 0 ? (
                filteredAdjustments.map((item) => (
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
                          item.type === "Addition"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {item.type === "Addition"
                        ? `+${item.quantity}`
                        : `-${item.quantity}`}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.reason}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs flex items-center gap-1">
                      <Calendar size={14} /> {item.date}
                    </td>
                    <td className="py-3 px-4 text-gray-700 font-medium">
                      {item.adjustedBy}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No stock adjustment records found.
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

export default StockAdjustment;

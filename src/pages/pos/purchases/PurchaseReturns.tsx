import React, { useState } from "react";
import { RotateCcw, Search, Plus, Calendar, FileText } from "lucide-react";

interface PurchaseReturnItem {
  id: string;
  returnNo: string;
  purchaseNo: string;
  supplierName: string;
  quantity: number;
  refundAmount: number;
  reason: string;
  date: string;
}

const initialReturns: PurchaseReturnItem[] = [
  {
    id: "1",
    returnNo: "PR-2026-001",
    purchaseNo: "PUR-2026-001",
    supplierName: "Sun Pharma Dist.",
    quantity: 5,
    refundAmount: 1250.0,
    reason: "Damaged strips received",
    date: "2026-10-06",
  },
  {
    id: "2",
    returnNo: "PR-2026-002",
    purchaseNo: "PUR-2026-003",
    supplierName: "Cipla Med Pro",
    quantity: 2,
    refundAmount: 850.0,
    reason: "Near expiry stock return",
    date: "2026-10-04",
  },
];

const PurchaseReturns: React.FC = () => {
  const [returns, setReturns] = useState<PurchaseReturnItem[]>(initialReturns);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReturns = returns.filter(
    (item) =>
      item.returnNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.purchaseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplierName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <RotateCcw className="text-indigo-600" /> Purchase Returns
          </h1>
          <p className="text-sm text-gray-500">
            Manage returned items sent back to suppliers and refund claims.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors self-start md:self-auto">
          <Plus size={16} /> New Return
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
            placeholder="Search return no, purchase no or supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Returns Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Return No</th>
                <th className="py-3 px-4">Purchase No</th>
                <th className="py-3 px-4">Supplier Name</th>
                <th className="py-3 px-4">Quantity Returned</th>
                <th className="py-3 px-4">Refund Amount</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredReturns.length > 0 ? (
                filteredReturns.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-xs font-semibold text-indigo-600">
                      {item.returnNo}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-600">
                      {item.purchaseNo}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {item.supplierName}
                    </td>
                    <td className="py-3 px-4 font-semibold text-red-600">
                      {item.quantity} items
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600">
                      ₹{item.refundAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.reason}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs flex items-center gap-1 mt-1">
                      <Calendar size={14} /> {item.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No purchase return records found.
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

export default PurchaseReturns;

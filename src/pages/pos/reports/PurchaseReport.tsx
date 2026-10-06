import React, { useState } from "react";
import { ShoppingCart, Search, Download, Calendar } from "lucide-react";

interface PurchaseReportItem {
  id: string;
  purchaseNo: string;
  supplierName: string;
  itemsCount: number;
  totalAmount: number;
  status: string;
  date: string;
}

const initialPurchaseReports: PurchaseReportItem[] = [
  {
    id: "1",
    purchaseNo: "PUR-2026-001",
    supplierName: "MediCorp Distributors",
    itemsCount: 45,
    totalAmount: 18500.0,
    status: "Received",
    date: "2026-10-05",
  },
  {
    id: "2",
    purchaseNo: "PUR-2026-002",
    supplierName: "Apollo Pharma Wholesale",
    itemsCount: 30,
    totalAmount: 12400.0,
    status: "Received",
    date: "2026-10-03",
  },
  {
    id: "3",
    purchaseNo: "PUR-2026-003",
    supplierName: "Zenith Healthcare",
    itemsCount: 15,
    totalAmount: 6200.0,
    status: "Pending",
    date: "2026-10-01",
  },
];

const PurchaseReport: React.FC = () => {
  const [reports, setReports] = useState<PurchaseReportItem[]>(
    initialPurchaseReports,
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reports.filter(
    (item) =>
      item.purchaseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplierName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingCart className="text-indigo-600" /> Purchase & Supplier
            Report
          </h1>
          <p className="text-sm text-gray-500">
            Monitor supplier purchase history, stock acquisitions, and payment
            statuses.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors self-start md:self-auto">
          <Download size={16} /> Export Purchase Report
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
            placeholder="Search by purchase no or supplier name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Purchase Report Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Purchase No</th>
                <th className="py-3 px-4">Supplier Name</th>
                <th className="py-3 px-4">Items Count</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
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
                      {item.purchaseNo}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {item.supplierName}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.itemsCount} items
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Received"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs flex items-center gap-1 mt-1">
                      <Calendar size={14} /> {item.date}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-gray-900">
                      ₹{item.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No purchase report records found.
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

export default PurchaseReport;

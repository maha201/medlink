import React, { useState } from "react";
import {
  ShoppingBag,
  Search,
  Plus,
  Download,
  Eye,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";

interface PurchaseOrder {
  id: string;
  purchaseNo: string;
  supplierName: string;
  totalItems: number;
  grandTotal: number;
  paymentStatus: "Paid" | "Pending" | "Partial";
  orderDate: string;
}

const initialPurchases: PurchaseOrder[] = [
  {
    id: "1",
    purchaseNo: "PUR-2026-001",
    supplierName: "Sun Pharma Dist.",
    totalItems: 5,
    grandTotal: 12500.0,
    paymentStatus: "Paid",
    orderDate: "2026-10-06",
  },
  {
    id: "2",
    purchaseNo: "PUR-2026-002",
    supplierName: "Micro Labs Ltd.",
    totalItems: 3,
    grandTotal: 8400.0,
    paymentStatus: "Pending",
    orderDate: "2026-10-05",
  },
  {
    id: "3",
    purchaseNo: "PUR-2026-003",
    supplierName: "Cipla Med Pro",
    totalItems: 8,
    grandTotal: 24500.0,
    paymentStatus: "Partial",
    orderDate: "2026-10-03",
  },
];

const PurchaseList: React.FC = () => {
  const [purchases, setPurchases] = useState<PurchaseOrder[]>(initialPurchases);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPurchases = purchases.filter((item) => {
    const matchesSearch =
      item.purchaseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || item.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="text-indigo-600" /> Purchase Orders
          </h1>
          <p className="text-sm text-gray-500">
            Manage stock purchases from various pharmaceutical suppliers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors">
            <Plus size={16} /> Add Purchase
          </button>
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
            placeholder="Search by purchase no or supplier..."
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
            <option value="All">All Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Partial">Partial</option>
          </select>
        </div>
      </div>

      {/* Purchases Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Purchase No</th>
                <th className="py-3 px-4">Supplier Name</th>
                <th className="py-3 px-4">Total Items</th>
                <th className="py-3 px-4">Grand Total</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4">Order Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredPurchases.length > 0 ? (
                filteredPurchases.map((item) => (
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
                      {item.totalItems} items
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900">
                      ₹{item.grandTotal.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.paymentStatus === "Paid"
                            ? "bg-emerald-50 text-emerald-700"
                            : item.paymentStatus === "Pending"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {item.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs flex items-center gap-1 mt-1">
                      <Calendar size={14} /> {item.orderDate}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        className="p-1.5 text-gray-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No purchase orders found.
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

export default PurchaseList;

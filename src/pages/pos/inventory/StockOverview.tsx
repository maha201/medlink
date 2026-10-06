import React, { useState } from "react";
import {
  Package,
  Search,
  Filter,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Download,
  Eye,
} from "lucide-react";

interface StockItem {
  id: string;
  name: string;
  code: string;
  category: string;
  totalStock: number;
  unit: string;
  warehouse: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastUpdated: string;
}

const initialStock: StockItem[] = [
  {
    id: "1",
    name: "Paracetamol 650mg",
    code: "MED-001",
    category: "Tablets",
    totalStock: 150,
    unit: "Strip",
    warehouse: "Main Pharmacy",
    status: "In Stock",
    lastUpdated: "2026-10-06",
  },
  {
    id: "2",
    name: "Amoxicillin 500mg",
    code: "MED-002",
    category: "Capsules",
    totalStock: 15,
    unit: "Strip",
    warehouse: "Main Pharmacy",
    status: "Low Stock",
    lastUpdated: "2026-10-05",
  },
  {
    id: "3",
    name: "Cough Syrup 100ml",
    code: "MED-003",
    category: "Syrups",
    totalStock: 40,
    unit: "Bottle",
    warehouse: "Branch Store",
    status: "In Stock",
    lastUpdated: "2026-10-06",
  },
  {
    id: "4",
    name: "Digital Thermometer",
    code: "EQ-001",
    category: "Equipments",
    totalStock: 0,
    unit: "Piece",
    warehouse: "Main Pharmacy",
    status: "Out of Stock",
    lastUpdated: "2026-10-01",
  },
];

const StockOverview: React.FC = () => {
  const [stockList, setStockList] = useState<StockItem[]>(initialStock);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredStock = stockList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="text-indigo-600" /> Stock Overview
          </h1>
          <p className="text-sm text-gray-500">
            Real-time inventory levels across your pharmacy stores.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Total Inventory Items
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">2,450</h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Package size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Low Stock Alerts
            </p>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">14</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <AlertTriangle size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Out of Stock</p>
            <h3 className="text-2xl font-bold text-red-600 mt-1">3</h3>
          </div>
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <TrendingDown size={24} />
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search stock by name or code..."
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
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Warehouse</th>
                <th className="py-3 px-4">Total Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredStock.length > 0 ? (
                filteredStock.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-gray-500 font-mono text-xs">
                      {item.code}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.warehouse}
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {item.totalStock} {item.unit}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.status === "In Stock"
                            ? "bg-emerald-50 text-emerald-700"
                            : item.status === "Low Stock"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        className="p-1.5 text-gray-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                        title="View History"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No stock records found.
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
export default StockOverview;
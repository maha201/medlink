import React, { useState } from "react";
import {
  AlertTriangle,
  Search,
  Bell,
  ShoppingCart,
  ArrowUpRight,
} from "lucide-react";

interface LowStockItem {
  id: string;
  name: string;
  code: string;
  category: string;
  currentStock: number;
  alertQuantity: number;
  unit: string;
  supplier: string;
}

const initialLowStock: LowStockItem[] = [
  {
    id: "1",
    name: "Amoxicillin 500mg",
    code: "MED-002",
    category: "Capsules",
    currentStock: 15,
    alertQuantity: 25,
    unit: "Strip",
    supplier: "Sun Pharma Dist.",
  },
  {
    id: "2",
    name: "Digital Thermometer",
    code: "EQ-001",
    category: "Equipments",
    currentStock: 2,
    alertQuantity: 5,
    unit: "Piece",
    supplier: "Omron India",
  },
  {
    id: "3",
    name: "Pantoprazole 40mg",
    code: "MED-010",
    category: "Tablets",
    currentStock: 8,
    alertQuantity: 20,
    unit: "Strip",
    supplier: "Cipla Med Pro",
  },
];

const LowStock: React.FC = () => {
  const [lowStockList, setLowStockList] =
    useState<LowStockItem[]>(initialLowStock);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = lowStockList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <AlertTriangle className="text-amber-500" /> Low Stock Alerts
          </h1>
          <p className="text-sm text-gray-500">
            Monitor items that have fallen below the minimum safety stock limit.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors self-start md:self-auto">
          <ShoppingCart size={16} /> Reorder All Low Stock
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
            placeholder="Search low stock items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Low Stock Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Alert Level</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredList.length > 0 ? (
                filteredList.map((item) => (
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
                    <td className="py-3 px-4 font-bold text-red-600">
                      {item.currentStock} {item.unit}
                    </td>
                    <td className="py-3 px-4 text-gray-600 font-medium">
                      {item.alertQuantity} {item.unit}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{item.supplier}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                        <ShoppingCart size={14} /> Reorder
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No low stock alerts right now. All inventory levels are
                    healthy!
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

export default LowStock;

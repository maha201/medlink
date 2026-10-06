import React, { useState } from "react";
import {
  Package,
  Search,
  Download,
  Calendar,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface InventoryReportItem {
  id: string;
  productName: string;
  code: string;
  category: string;
  openingStock: number;
  purchased: number;
  sold: number;
  closingStock: number;
  unit: string;
}

const initialInventoryReports: InventoryReportItem[] = [
  {
    id: "1",
    productName: "Paracetamol 650mg",
    code: "MED-001",
    category: "Tablets",
    openingStock: 100,
    purchased: 150,
    sold: 100,
    closingStock: 150,
    unit: "Strip",
  },
  {
    id: "2",
    productName: "Amoxicillin 500mg",
    code: "MED-002",
    category: "Capsules",
    // categoryId: "2",
    openingStock: 40,
    purchased: 0,
    sold: 25,
    closingStock: 15,
    unit: "Strip",
  },
  {
    id: "3",
    productName: "Cough Syrup 100ml",
    code: "MED-003",
    category: "Syrups",
    openingStock: 50,
    purchased: 20,
    sold: 30,
    closingStock: 40,
    unit: "Bottle",
  },
];

const InventoryReport: React.FC = () => {
  const [reports, setReports] = useState<InventoryReportItem[]>(
    initialInventoryReports,
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reports.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="text-indigo-600" /> Inventory Valuation & Stock
            Report
          </h1>
          <p className="text-sm text-gray-500">
            Track stock movement, opening/closing balance, and item turnover
            rates.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors self-start md:self-auto">
          <Download size={16} /> Export Inventory Report
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
            placeholder="Search by product name, code or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Inventory Report Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Opening Stock</th>
                <th className="py-3 px-4">Purchased</th>
                <th className="py-3 px-4">Sold</th>
                <th className="py-3 px-4">Closing Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredReports.length > 0 ? (
                filteredReports.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {item.productName}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-500">
                      {item.code}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.openingStock} {item.unit}
                    </td>
                    <td className="py-3 px-4 text-emerald-600 font-semibold">
                      +{item.purchased} {item.unit}
                    </td>
                    <td className="py-3 px-4 text-red-600 font-semibold">
                      -{item.sold} {item.unit}
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900">
                      {item.closingStock} {item.unit}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No inventory report records found.
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

export default InventoryReport;

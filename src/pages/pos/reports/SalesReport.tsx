import React, { useState } from "react";
import {
  BarChart3,
  Search,
  Download,
  Calendar,
  CheckCircle,
} from "lucide-react";

interface SalesReportDetailItem {
  id: string;
  invoiceNo: string;
  customerName: string;
  itemsCount: number;
  paymentMethod: string;
  totalAmount: number;
  date: string;
}

const initialSalesDetails: SalesReportDetailItem[] = [
  {
    id: "1",
    invoiceNo: "INV-2026-001",
    customerName: "Arun Kumar",
    itemsCount: 4,
    paymentMethod: "UPI",
    totalAmount: 1250.0,
    date: "2026-10-06",
  },
  {
    id: "2",
    invoiceNo: "INV-2026-002",
    customerName: "Divya Ramesh",
    itemsCount: 2,
    paymentMethod: "Cash",
    totalAmount: 840.0,
    date: "2026-10-06",
  },
  {
    id: "3",
    invoiceNo: "INV-2026-003",
    customerName: "Karthik Raja",
    itemsCount: 6,
    paymentMethod: "Card",
    totalAmount: 3100.0,
    date: "2026-10-05",
  },
];

const SalesReport: React.FC = () => {
  const [reports, setReports] =
    useState<SalesReportDetailItem[]>(initialSalesDetails);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reports.filter(
    (item) =>
      item.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BarChart3 className="text-indigo-600" /> Detailed Sales Report
          </h1>
          <p className="text-sm text-gray-500">
            Comprehensive itemized list of all generated billing invoices and
            customer transactions.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors self-start md:self-auto">
          <Download size={16} /> Export Sales Report
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
            placeholder="Search by invoice no or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Sales Detail Report Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Invoice No</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Items Count</th>
                <th className="py-3 px-4">Payment Method</th>
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
                      {item.invoiceNo}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {item.customerName}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.itemsCount} items
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium">
                        {item.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs flex items-center gap-1 mt-1">
                      <Calendar size={14} /> {item.date}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600">
                      ₹{item.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No sales invoice records found.
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

export default SalesReport;

import React, { useState } from "react";
import {
  TrendingUp,
  Search,
  Download,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface ProfitReportItem {
  id: string;
  period: string;
  totalRevenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  operatingExpenses: number;
  netProfit: number;
}

const initialProfitReports: ProfitReportItem[] = [
  {
    id: "1",
    period: "October 2026 (W1)",
    totalRevenue: 185200.0,
    costOfGoodsSold: 112000.0,
    grossProfit: 73200.0,
    operatingExpenses: 39500.0,
    netProfit: 33700.0,
  },
  {
    id: "2",
    period: "September 2026",
    totalRevenue: 742000.0,
    costOfGoodsSold: 450000.0,
    grossProfit: 292000.0,
    operatingExpenses: 145000.0,
    netProfit: 147000.0,
  },
  {
    id: "3",
    period: "August 2026",
    totalRevenue: 698000.0,
    costOfGoodsSold: 420000.0,
    grossProfit: 278000.0,
    operatingExpenses: 140000.0,
    netProfit: 138000.0,
  },
];

const ProfitReport: React.FC = () => {
  const [reports, setReports] =
    useState<ProfitReportItem[]>(initialProfitReports);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reports.filter((item) =>
    item.period.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="text-indigo-600" /> Profit & Loss Statement
          </h1>
          <p className="text-sm text-gray-500">
            Analyze gross revenue, cost of goods sold (COGS), operating
            overheads, and net profit margins.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors self-start md:self-auto">
          <Download size={16} /> Export P&L Statement
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
            placeholder="Search by period (e.g. October 2026)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Profit Report Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Accounting Period</th>
                <th className="py-3 px-4">Total Revenue</th>
                <th className="py-3 px-4">COGS</th>
                <th className="py-3 px-4">Gross Profit</th>
                <th className="py-3 px-4">Operating Expenses</th>
                <th className="py-3 px-4 text-right">Net Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredReports.length > 0 ? (
                filteredReports.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900 flex items-center gap-1.5">
                      <Calendar size={15} className="text-indigo-500" />{" "}
                      {item.period}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800">
                      ₹{item.totalRevenue.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-red-600 font-medium">
                      -₹{item.costOfGoodsSold.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-indigo-600 font-semibold">
                      ₹{item.grossProfit.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-red-600 font-medium">
                      -₹{item.operatingExpenses.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600">
                      ₹{item.netProfit.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No profit and loss records found.
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

export default ProfitReport;

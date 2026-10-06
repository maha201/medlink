import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  ArrowUpRight,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function SalesHistory() {
  const [searchTerm, setSearchTerm] = useState("");

  const salesData = [
    {
      id: "INV-1092",
      customer: "Ramesh Kumar",
      items: 4,
      total: "₹1,250",
      mode: "UPI",
      time: "10:45 AM",
      status: "Completed",
    },
    {
      id: "INV-1091",
      customer: "Priya Sharma",
      items: 2,
      total: "₹850",
      mode: "Cash",
      time: "10:30 AM",
      status: "Completed",
    },
    {
      id: "INV-1090",
      customer: "Anbu Selvan",
      items: 6,
      total: "₹3,400",
      mode: "Card",
      time: "10:15 AM",
      status: "Completed",
    },
    {
      id: "INV-1089",
      customer: "Kavitha M.",
      items: 1,
      total: "₹450",
      mode: "UPI",
      time: "09:50 AM",
      status: "Completed",
    },
  ];

  return (
    <div className="p-3 sm:p-4 space-y-4 bg-[#f5f7f8] min-h-full font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white px-5 py-4 rounded-xl shadow-sm border border-[#dde5e7]">
        <div>
          <h1 className="text-lg font-bold text-[#1a2632]">
            Sales Transactions
          </h1>
          <p className="text-[11px] text-[#8b9bae] mt-0.5">
            Manage and view all counter sales records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-[#f0f4f5] hover:bg-[#dde5e7] text-[#1a2632] text-xs font-bold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-[#dde5e7] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]"
              size={14}
            />
            <input
              type="text"
              placeholder="Search invoice or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#f5f7f8] border border-[#dde5e7] rounded-lg pl-9 pr-3 py-1.5 text-xs font-medium focus:outline-none focus:border-[#3a9898]"
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#5a6a76]">
            <Calendar size={14} /> Today: Oct 06, 2026
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#dde5e7] text-[#8b9bae]">
                <th className="pb-2.5 font-semibold">Invoice ID</th>
                <th className="pb-2.5 font-semibold">Customer</th>
                <th className="pb-2.5 font-semibold">Items</th>
                <th className="pb-2.5 font-semibold">Payment Mode</th>
                <th className="pb-2.5 font-semibold">Total Amount</th>
                <th className="pb-2.5 font-semibold">Time</th>
                <th className="pb-2.5 font-semibold">Status</th>
                <th className="pb-2.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f5]">
              {salesData.map((row) => (
                <tr key={row.id} className="hover:bg-[#f5f7f8]/50">
                  <td className="py-3 font-bold text-[#1a2632]">{row.id}</td>
                  <td className="py-3 text-[#5a6a76] font-medium">
                    {row.customer}
                  </td>
                  <td className="py-3 text-[#5a6a76]">{row.items} items</td>
                  <td className="py-3">
                    <span className="bg-[#f0f4f5] text-[#1a2632] px-2 py-0.5 rounded text-[10px] font-bold">
                      {row.mode}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-[#1a2632]">{row.total}</td>
                  <td className="py-3 text-[#8b9bae]">{row.time}</td>
                  <td className="py-3">
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 w-max">
                      <CheckCircle size={11} /> {row.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-[#3a9898] hover:bg-[#eaf6f5] p-1.5 rounded-lg transition-colors">
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

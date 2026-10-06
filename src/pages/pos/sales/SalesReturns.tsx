import React, { useState } from "react";
import {
  Search,
  RotateCcw,
  AlertCircle,
  Plus,
  CheckCircle,
} from "lucide-react";

export default function ReturnsManagement() {
  const [returns, setReturns] = useState([
    {
      id: "RET-501",
      invoice: "INV-1089",
      customer: "Kavitha M.",
      item: "Antiseptic Cream 50g",
      qty: 1,
      amount: "₹75",
      reason: "Damaged seal",
      status: "Refunded",
    },
    {
      id: "RET-502",
      invoice: "INV-1065",
      customer: "Suresh Babu",
      item: "Paracetamol 500mg",
      qty: 2,
      amount: "₹90",
      reason: "Wrong item",
      status: "Processing",
    },
  ]);

  return (
    <div className="p-3 sm:p-4 space-y-4 bg-[#f5f7f8] min-h-full font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white px-5 py-4 rounded-xl shadow-sm border border-[#dde5e7]">
        <div>
          <h1 className="text-lg font-bold text-[#1a2632]">
            Returns & Refunds
          </h1>
          <p className="text-[11px] text-[#8b9bae] mt-0.5">
            Process product returns and manage customer refunds.
          </p>
        </div>
        <div>
          <button className="bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors shadow-sm flex items-center gap-1.5">
            <Plus size={15} /> Process New Return
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-[#dde5e7] space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs text-[#1a2632]">
            Recent Returns Log
          </h3>
          <span className="text-xs text-[#8b9bae]">Total 2 items</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#dde5e7] text-[#8b9bae]">
                <th className="pb-2.5 font-semibold">Return ID</th>
                <th className="pb-2.5 font-semibold">Original Invoice</th>
                <th className="pb-2.5 font-semibold">Customer</th>
                <th className="pb-2.5 font-semibold">Returned Item</th>
                <th className="pb-2.5 font-semibold">Qty</th>
                <th className="pb-2.5 font-semibold">Refund Amt</th>
                <th className="pb-2.5 font-semibold">Reason</th>
                <th className="pb-2.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f5]">
              {returns.map((item) => (
                <tr key={item.id} className="hover:bg-[#f5f7f8]/50">
                  <td className="py-3 font-bold text-[#1a2632]">{item.id}</td>
                  <td className="py-3 text-[#3a9898] font-semibold">
                    {item.invoice}
                  </td>
                  <td className="py-3 text-[#5a6a76] font-medium">
                    {item.customer}
                  </td>
                  <td className="py-3 text-[#1a2632] font-semibold">
                    {item.item}
                  </td>
                  <td className="py-3 text-[#5a6a76]">{item.qty}</td>
                  <td className="py-3 font-bold text-rose-600">
                    {item.amount}
                  </td>
                  <td className="py-3 text-[#8b9bae]">{item.reason}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.status === "Refunded" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
                    >
                      {item.status}
                    </span>
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

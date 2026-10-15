import React from "react";
import {
  TrendingUp,
  ArrowUpRight,
  DollarSign,
  Wallet,
  ArrowDownRight,
  CreditCard,
} from "lucide-react";

export default function FinanceOverview() {
  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue Trend Chart Card */}
        <div className="lg:col-span-2 bg-[#f5f7f8] p-5 rounded-2xl border border-[#dde5e7] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#1a2632] flex items-center gap-1.5">
              <TrendingUp size={16} className="text-[#3a9898]" /> Weekly Revenue
              & Collection Trend
            </h3>
            <span className="text-[10px] text-[#8b9bae] font-semibold">
              Updated live today
            </span>
          </div>

          <div className="h-44 flex items-end justify-between px-3 pt-6 bg-white rounded-xl border border-[#dde5e7]">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <div
                key={day}
                className="flex flex-col items-center gap-1.5 w-full"
              >
                <div className="w-3/4 bg-[#eaf6f5] rounded-t relative h-32 flex items-end justify-center">
                  <div
                    className="w-full bg-[#3a9898] rounded-t transition-all"
                    style={{ height: `${[40, 65, 50, 85, 95, 70, 60][i]}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-[#5a6a76]">
                  {day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Channels Split */}
        <div className="bg-[#f5f7f8] p-5 rounded-2xl border border-[#dde5e7] space-y-3">
          <h3 className="text-xs font-bold text-[#1a2632]">
            Realized Payment Split
          </h3>
          <div className="space-y-2.5">
            {[
              {
                method: "UPI / QR Scanner",
                share: "52%",
                amount: "₹24,800",
                color: "bg-[#3a9898]",
              },
              {
                method: "Cash Drawer",
                share: "28%",
                amount: "₹12,450",
                color: "bg-emerald-500",
              },
              {
                method: "Credit / Debit Card",
                share: "20%",
                amount: "₹7,950",
                color: "bg-purple-500",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-xl border border-[#dde5e7] space-y-1"
              >
                <div className="flex justify-between text-xs font-bold text-[#1a2632]">
                  <span>{item.method}</span>
                  <span className="text-[#3a9898]">{item.amount}</span>
                </div>
                <div className="w-full bg-[#f0f4f5] h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color}`}
                    style={{ width: item.share }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Summary Snapshot Table */}
      <div className="bg-white rounded-2xl border border-[#dde5e7] p-4">
        <h3 className="text-xs font-bold text-[#1a2632] mb-3">
          Recent Activity Snapshot
        </h3>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#dde5e7] text-[#8b9bae]">
              <th className="pb-2">Transaction ID</th>
              <th className="pb-2">Patient / Party</th>
              <th className="pb-2">Type</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f5]">
            <tr className="hover:bg-[#f5f7f8]">
              <td className="py-2.5 font-bold text-[#3a9898]">
                MED-INV-2026-001
              </td>
              <td className="py-2.5 font-semibold text-[#1a2632]">
                Ramesh Kumar
              </td>
              <td className="py-2.5 text-[#5a6a76]">Patient Invoice</td>
              <td className="py-2.5 font-bold text-[#1a2632]">₹1,470</td>
              <td className="py-2.5">
                <span className="px-2 py-0.5 bg-[#eaf6f5] text-[#3a9898] rounded font-bold text-[10px]">
                  Paid
                </span>
              </td>
            </tr>
            <tr className="hover:bg-[#f5f7f8]">
              <td className="py-2.5 font-bold text-[#3a9898]">EXP-2026-001</td>
              <td className="py-2.5 font-semibold text-[#1a2632]">
                Metro Healthcare Estates
              </td>
              <td className="py-2.5 text-[#5a6a76]">Clinic Lease Rent</td>
              <td className="py-2.5 font-bold text-rose-600">₹45,000</td>
              <td className="py-2.5">
                <span className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded font-bold text-[10px]">
                  Disbursed
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

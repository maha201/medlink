import React, { useState } from "react";
import { BookOpen, Plus, Search } from "lucide-react";

interface LedgerEntry {
  id: string;
  date: string;
  particulars: string;
  voucherType: "Receipt" | "Payment" | "Journal" | "Contra";
  debit: number;
  credit: number;
  balance: number;
}

const initialLedger: LedgerEntry[] = [
  {
    id: "LED-01",
    date: "2026-10-12",
    particulars: "Patient Consultation Collection (UPI - Ramesh)",
    voucherType: "Receipt",
    debit: 1470,
    credit: 0,
    balance: 1470,
  },
  {
    id: "LED-02",
    date: "2026-10-13",
    particulars: "Monthly Clinic Premise Lease Payment",
    voucherType: "Payment",
    debit: 0,
    credit: 45000,
    balance: -43530,
  },
  {
    id: "LED-03",
    date: "2026-10-14",
    particulars: "Pharmacy Bulk Stock Purchase",
    voucherType: "Journal",
    debit: 0,
    credit: 12500,
    balance: -56030,
  },
];

export default function GeneralLedger() {
  const [ledger] = useState<LedgerEntry[]>(initialLedger);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLedger = ledger.filter(
    (item) =>
      item.particulars.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.voucherType.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="relative w-full sm:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]"
            size={15}
          />
          <input
            type="text"
            placeholder="Search ledger particulars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#f5f7f8] border border-[#dde5e7] rounded-full text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898]"
          />
        </div>
        <button
          onClick={() => alert("Add Journal Entry Modal Opened")}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm"
        >
          <Plus size={14} strokeWidth={2.5} /> Add Journal Entry
        </button>
      </div>

      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-[#dde5e7] text-[#8b9bae]">
            <th className="pb-3">Date</th>
            <th className="pb-3">Particulars / Description</th>
            <th className="pb-3">Voucher Type</th>
            <th className="pb-3">Debit (₹)</th>
            <th className="pb-3">Credit (₹)</th>
            <th className="pb-3">Running Balance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0f4f5]">
          {filteredLedger.map((item) => (
            <tr key={item.id} className="hover:bg-[#f5f7f8]">
              <td className="py-3 text-[#5a6a76]">{item.date}</td>
              <td className="py-3 font-semibold text-[#1a2632]">
                {item.particulars}
              </td>
              <td className="py-3">
                <span className="px-2 py-0.5 bg-[#f0f4f5] text-[#3a9898] rounded font-bold text-[10px]">
                  {item.voucherType}
                </span>
              </td>
              <td className="py-3 font-bold text-emerald-600">
                {item.debit > 0 ? `₹${item.debit.toLocaleString()}` : "-"}
              </td>
              <td className="py-3 font-bold text-rose-600">
                {item.credit > 0 ? `₹${item.credit.toLocaleString()}` : "-"}
              </td>
              <td
                className={`py-3 font-bold ${item.balance >= 0 ? "text-[#1a2632]" : "text-rose-600"}`}
              >
                ₹{item.balance.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

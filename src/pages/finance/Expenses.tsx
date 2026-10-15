import React from "react";
import { Receipt, Plus } from "lucide-react";

export default function Expenses() {
  const expenses = [
    {
      id: "1",
      expenseNo: "EXP-2026-001",
      date: "2026-10-01",
      category: "Premise Rent",
      description: "Monthly clinic premise lease",
      vendor: "Metro Healthcare Estates",
      amount: 45000,
      method: "Bank Transfer",
      status: "Disbursed",
    },
    {
      id: "2",
      expenseNo: "EXP-2026-002",
      date: "2026-10-03",
      category: "Medical Supplies",
      description: "Surgical masks and gloves bulk pack",
      vendor: "Apollo Surgical Supplies",
      amount: 12500,
      method: "Card",
      status: "Disbursed",
    },
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold text-[#1a2632] flex items-center gap-1.5">
          <Receipt size={16} className="text-[#3a9898]" /> Operating & Office
          Expenses
        </h3>
        <button className="px-3.5 py-1.5 bg-[#3a9898] text-white text-xs font-bold rounded-full">
          + Add Expense
        </button>
      </div>

      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-[#dde5e7] text-[#8b9bae]">
            <th className="pb-3">Expense No</th>
            <th className="pb-3">Date</th>
            <th className="pb-3">Category</th>
            <th className="pb-3">Description</th>
            <th className="pb-3">Vendor / Payee</th>
            <th className="pb-3">Amount</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0f4f5]">
          {expenses.map((e) => (
            <tr key={e.id} className="hover:bg-[#f5f7f8]">
              <td className="py-3 font-bold text-[#3a9898]">{e.expenseNo}</td>
              <td className="py-3 text-[#5a6a76]">{e.date}</td>
              <td className="py-3 font-semibold text-[#1a2632]">
                {e.category}
              </td>
              <td className="py-3 text-[#5a6a76]">{e.description}</td>
              <td className="py-3 text-[#1a2632]">{e.vendor}</td>
              <td className="py-3 font-bold text-rose-600">
                ₹{e.amount.toLocaleString()}
              </td>
              <td className="py-3">
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 font-bold text-[10px]">
                  {e.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

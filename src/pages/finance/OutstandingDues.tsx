import React from "react";
import { AlertCircle, Send } from "lucide-react";

export default function OutstandingDues() {
  const dues = [
    {
      id: "1",
      invoiceNo: "MED-INV-2026-002",
      patientName: "Priya Sharma",
      dueDate: "2026-10-24",
      total: 3150,
      paid: 1000,
      balance: 2150,
    },
    {
      id: "2",
      invoiceNo: "MED-INV-2026-003",
      patientName: "Anbu Selvan",
      dueDate: "2026-09-30",
      total: 4725,
      paid: 0,
      balance: 4725,
    },
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-800 flex items-center justify-between">
        <span className="flex items-center gap-2 font-medium">
          <AlertCircle size={16} className="text-amber-600" /> Total Active
          Patient Receivables: <strong>₹6,875</strong>
        </span>
        <button className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors">
          Send Batch Reminders
        </button>
      </div>

      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-[#dde5e7] text-[#8b9bae]">
            <th className="pb-3">Invoice No</th>
            <th className="pb-3">Patient Name</th>
            <th className="pb-3">Due Date</th>
            <th className="pb-3">Total Billed</th>
            <th className="pb-3">Amount Paid</th>
            <th className="pb-3">Outstanding Balance</th>
            <th className="pb-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0f4f5]">
          {dues.map((item) => (
            <tr key={item.id} className="hover:bg-[#f5f7f8]">
              <td className="py-3 font-bold text-[#3a9898]">
                {item.invoiceNo}
              </td>
              <td className="py-3 font-semibold text-[#1a2632]">
                {item.patientName}
              </td>
              <td className="py-3 text-rose-600 font-bold">{item.dueDate}</td>
              <td className="py-3">₹{item.total}</td>
              <td className="py-3 text-emerald-600">₹{item.paid}</td>
              <td className="py-3 font-black text-rose-600">₹{item.balance}</td>
              <td className="py-3 text-right">
                <button className="px-3 py-1 bg-[#3a9898] text-white rounded font-bold text-xs hover:bg-[#2b6e6e] transition-colors">
                  Collect Due
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

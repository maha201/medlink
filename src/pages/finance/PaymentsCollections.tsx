import React, { useState } from "react";
import { Search, Plus, CreditCard } from "lucide-react";

export default function PaymentsCollections() {
  const [searchTerm, setSearchTerm] = useState("");

  const collections = [
    {
      id: "PAY-001",
      receiptNo: "REC-8921",
      dateTime: "2026-10-06 10:45 AM",
      patientName: "Ramesh Kumar",
      invoiceNo: "MED-INV-2026-001",
      amount: 1470,
      method: "UPI",
      referenceNo: "UPI/293849382",
      receivedBy: "Divya Ramesh",
    },
    {
      id: "PAY-002",
      receiptNo: "REC-8922",
      dateTime: "2026-10-10 02:15 PM",
      patientName: "Priya Sharma",
      invoiceNo: "MED-INV-2026-002",
      amount: 1000,
      method: "Cash",
      referenceNo: "CASH-REG-01",
      receivedBy: "Divya Ramesh",
    },
  ];

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
            placeholder="Search collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#f5f7f8] border border-[#dde5e7] rounded-full text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898]"
          />
        </div>
        <button
          onClick={() => alert("Record Payment Opened")}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm"
        >
          <CreditCard size={14} /> Record Payment
        </button>
      </div>

      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-[#dde5e7] text-[#8b9bae]">
            <th className="pb-3">Receipt No</th>
            <th className="pb-3">Date & Time</th>
            <th className="pb-3">Patient Name</th>
            <th className="pb-3">Linked Invoice</th>
            <th className="pb-3">Amount Realized</th>
            <th className="pb-3">Channel</th>
            <th className="pb-3">Reference No</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0f4f5]">
          {collections.map((item) => (
            <tr key={item.id} className="hover:bg-[#f5f7f8]">
              <td className="py-3 font-bold text-[#3a9898]">
                {item.receiptNo}
              </td>
              <td className="py-3 text-[#5a6a76]">{item.dateTime}</td>
              <td className="py-3 font-semibold text-[#1a2632]">
                {item.patientName}
              </td>
              <td className="py-3 font-mono text-[11px] text-[#5a6a76]">
                {item.invoiceNo}
              </td>
              <td className="py-3 font-bold text-emerald-600">
                ₹{item.amount}
              </td>
              <td className="py-3">
                <span className="px-2 py-0.5 bg-[#f0f4f5] text-[#1a2632] rounded font-bold text-[10px]">
                  {item.method}
                </span>
              </td>
              <td className="py-3 text-[#8b9bae]">{item.referenceNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from "react";
import { Scale } from "lucide-react";

export default function PaymentReconciliation() {
  const reconciliations = [
    {
      id: "REC-01",
      date: "2026-10-14",
      method: "UPI / QR Gateway",
      expected: 24800,
      actual: 24800,
      difference: 0,
      reference: "HDFC-SETT-9921",
      status: "Matched",
    },
    {
      id: "REC-02",
      date: "2026-10-14",
      method: "Cash Drawer",
      expected: 12450,
      actual: 12400,
      difference: -50,
      reference: "REG-CLOSE-01",
      status: "Discrepancy",
    },
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <h3 className="text-xs font-bold text-[#1a2632] flex items-center gap-1.5">
        <Scale size={16} className="text-[#3a9898]" /> Register & Gateway
        Settlement Audit
      </h3>
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-[#dde5e7] text-[#8b9bae]">
            <th className="pb-3">Date</th>
            <th className="pb-3">Channel / Source</th>
            <th className="pb-3">Expected Amount</th>
            <th className="pb-3">Actual Realized</th>
            <th className="pb-3">Difference</th>
            <th className="pb-3">Reference</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0f4f5]">
          {reconciliations.map((rec) => (
            <tr key={rec.id} className="hover:bg-[#f5f7f8]">
              <td className="py-3 text-[#5a6a76]">{rec.date}</td>
              <td className="py-3 font-bold text-[#1a2632]">{rec.method}</td>
              <td className="py-3">₹{rec.expected}</td>
              <td className="py-3 font-bold">₹{rec.actual}</td>
              <td
                className={`py-3 font-bold ${rec.difference === 0 ? "text-emerald-600" : "text-rose-600"}`}
              >
                ₹{rec.difference}
              </td>
              <td className="py-3 font-mono text-[11px] text-[#8b9bae]">
                {rec.reference}
              </td>
              <td className="py-3">
                <span
                  className={`px-2 py-0.5 rounded font-bold text-[10px] ${rec.status === "Matched" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-700"}`}
                >
                  {rec.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

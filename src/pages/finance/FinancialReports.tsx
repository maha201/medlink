import React from "react";
import { Download, FileText } from "lucide-react";

export default function FinancialReports() {
  const reports = [
    "Revenue & Collections Master Report",
    "Daily Register Closing Summary",
    "Tax Liability & GST Audit Statement",
    "Operating Expenses Breakdown",
    "Patient Ledger & Outstanding Statement",
    "Operating Profitability Summary",
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <h3 className="text-xs font-bold text-[#1a2632] flex items-center gap-1.5">
        <FileText size={16} className="text-[#3a9898]" /> Financial Statements &
        Export Directory
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {reports.map((rep, idx) => (
          <div
            key={idx}
            className="bg-[#f5f7f8] p-3.5 rounded-xl border border-[#dde5e7] flex items-center justify-between"
          >
            <div>
              <h4 className="text-xs font-bold text-[#1a2632]">{rep}</h4>
              <p className="text-[10px] text-[#8b9bae]">
                PDF / Excel Export Ready
              </p>
            </div>
            <button className="p-1.5 bg-white rounded-lg text-[#3a9898] hover:bg-[#eaf6f5] shadow-sm border border-[#dde5e7]">
              <Download size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

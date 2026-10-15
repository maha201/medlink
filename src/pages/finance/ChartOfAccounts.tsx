import React, { useState } from "react";
import { FileSpreadsheet, Plus, Search } from "lucide-react";

interface AccountHead {
  code: string;
  name: string;
  type: "Asset" | "Liability" | "Equity" | "Revenue" | "Expense";
  balance: number;
}

const initialAccounts: AccountHead[] = [
  {
    code: "1000",
    name: "Current Assets (Cash, Bank & UPI)",
    type: "Asset",
    balance: 145000,
  },
  {
    code: "2000",
    name: "Accounts Payable & Vendor Dues",
    type: "Liability",
    balance: 28400,
  },
  {
    code: "3000",
    name: "Clinic Capital & Retained Earnings",
    type: "Equity",
    balance: 500000,
  },
  {
    code: "4000",
    name: "Patient Consultation & Lab Revenue",
    type: "Revenue",
    balance: 215400,
  },
  {
    code: "5000",
    name: "Operating Expenses & Payroll",
    type: "Expense",
    balance: 102500,
  },
];

export default function ChartOfAccounts() {
  const [accounts] = useState<AccountHead[]>(initialAccounts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.code.includes(searchTerm) ||
      acc.type.toLowerCase().includes(searchTerm.toLowerCase()),
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
            placeholder="Search account code or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#f5f7f8] border border-[#dde5e7] rounded-full text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898]"
          />
        </div>
        <button
          onClick={() => alert("Add Account Head Modal Opened")}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm"
        >
          <Plus size={14} strokeWidth={2.5} /> Add Account Head
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {filteredAccounts.map((acc, i) => (
          <div
            key={i}
            className="bg-[#f5f7f8] p-4 rounded-xl border border-[#dde5e7] flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="font-mono text-[11px] font-bold text-[#3a9898]">
                [{acc.code}]
              </span>
              <h4 className="text-xs font-bold text-[#1a2632]">{acc.name}</h4>
              <p className="text-[10px] text-[#5a6a76]">
                Current Balance: ₹{acc.balance.toLocaleString()}
              </p>
            </div>
            <span className="px-2.5 py-1 bg-white border border-[#dde5e7] text-[#5a6a76] rounded-lg text-[10px] font-bold">
              {acc.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

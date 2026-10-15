import React, { useState } from "react";
import {
  PieChart,
  BookOpen,
  FileText,
  Receipt,
  Plus,
  CreditCard,
} from "lucide-react";

// Sub-component Imports
import FinanceOverview from "./FinanceOverview";
import BillingInvoices from "./BillingInvoices";
import Expenses from "./Expenses";
import GeneralLedger from "./GeneralLedger";

type FinanceTab =
  | "Overview"
  | "General Ledger"
  | "Invoices & Bills"
  | "Office Expenses";

export default function FinanceModule() {
  const [activeTab, setActiveTab] = useState<FinanceTab>("Overview");

  return (
    <div className="animate-in fade-in duration-300 space-y-4 font-sans">
      {/* SINGLE-LEVEL CLEAN TAB NAVIGATION */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#dde5e7] gap-2 overflow-x-auto bg-[#f5f7f8]">
          <div className="flex items-center gap-2">
            {[
              { id: "Overview", label: "Overview", icon: PieChart },
              { id: "General Ledger", label: "General Ledger", icon: BookOpen },
              {
                id: "Invoices & Bills",
                label: "Invoices & Bills",
                icon: FileText,
              },
              {
                id: "Office Expenses",
                label: "Office Expenses",
                icon: Receipt,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as FinanceTab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-white text-[#3a9898] shadow-sm border border-[#dde5e7]"
                      : "text-[#5a6a76] hover:text-[#1a2632] hover:bg-white/60"
                  }`}
                >
                  <Icon
                    size={14}
                    className={isActive ? "text-[#3a9898]" : "text-[#8b9bae]"}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* QUICK ACTION BUTTONS */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => alert("Add Entry / Invoice Modal Opened")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              <Plus size={14} strokeWidth={2.5} /> Add Entry
            </button>
          </div>
        </div>

        {/* WORKSPACE CONTENT AREA */}
        <div className="p-5 min-h-[350px]">
          {activeTab === "Overview" && <FinanceOverview />}
          {activeTab === "General Ledger" && <GeneralLedger />}
          {activeTab === "Invoices & Bills" && <BillingInvoices />}
          {activeTab === "Office Expenses" && <Expenses />}
        </div>
      </div>
    </div>
  );
}

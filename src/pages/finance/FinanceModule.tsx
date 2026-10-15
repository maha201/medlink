import React, { useState, useMemo } from "react";
import {
  DollarSign,
  ArrowUpRight,
  Plus,
  CreditCard,
  RefreshCw,
  Loader2,
  PieChart,
  BookOpen,
  FileSpreadsheet,
  FileText,
  Clock,
  RotateCcw,
  Receipt,
  Users2,
  Scale,
  Settings,
} from "lucide-react";

// Sub-component Imports
import FinanceOverview from "./FinanceOverview";
import BillingInvoices from "./BillingInvoices";
import PaymentsCollections from "./PaymentsCollections";
import OutstandingDues from "./OutstandingDues";
import RefundsCreditNotes from "./RefundsCreditNotes";
import Expenses from "./Expenses";
import FinancialReports from "./FinancialReports";
import PaymentReconciliation from "./PaymentReconciliation";
import TaxInvoiceSettings from "./TaxInvoiceSettings";
import GeneralLedger from "./GeneralLedger";
import ChartOfAccounts from "./ChartOfAccounts";
import PayrollSalaries from "./PayrollSalaries";

type MainCategory =
  | "Overview & Accounting"
  | "Revenue & Billing"
  | "Expenses & Payroll"
  | "Reconciliation & Settings";

interface SubTab {
  id: string;
  label: string;
  category: MainCategory;
  icon: React.ElementType;
}

const SUB_TABS: SubTab[] = [
  // Group 1: Overview & Accounting
  {
    id: "Overview",
    label: "Overview",
    category: "Overview & Accounting",
    icon: PieChart,
  },
  {
    id: "General Ledger",
    label: "General Ledger",
    category: "Overview & Accounting",
    icon: BookOpen,
  },
  {
    id: "Chart of Accounts",
    label: "Chart of Accounts",
    category: "Overview & Accounting",
    icon: FileSpreadsheet,
  },
  {
    id: "Financial Reports",
    label: "Financial Reports",
    category: "Overview & Accounting",
    icon: FileText,
  },

  // Group 2: Revenue & Billing
  {
    id: "Billing & Invoices",
    label: "Invoices & Bills",
    category: "Revenue & Billing",
    icon: FileText,
  },
  {
    id: "Payments & Collections",
    label: "Collections",
    category: "Revenue & Billing",
    icon: CreditCard,
  },
  {
    id: "Outstanding Dues",
    label: "Outstanding Dues",
    category: "Revenue & Billing",
    icon: Clock,
  },
  {
    id: "Refunds & Credit Notes",
    label: "Refunds & Credits",
    category: "Revenue & Billing",
    icon: RotateCcw,
  },

  // Group 3: Expenses & Payroll
  {
    id: "Office Expenses",
    label: "Office Expenses",
    category: "Expenses & Payroll",
    icon: Receipt,
  },
  {
    id: "Payroll & Salaries",
    label: "Payroll & Salaries",
    category: "Expenses & Payroll",
    icon: Users2,
  },

  // Group 4: Reconciliation & Settings
  {
    id: "Payment Reconciliation",
    label: "Reconciliation",
    category: "Reconciliation & Settings",
    icon: Scale,
  },
  {
    id: "Tax & Invoice Settings",
    label: "Tax & Settings",
    category: "Reconciliation & Settings",
    icon: Settings,
  },
];

export default function FinanceModule() {
  const [activeCategory, setActiveCategory] = useState<MainCategory>(
    "Overview & Accounting",
  );
  const [activeSubTab, setActiveSubTab] = useState<string>("Overview");
  const [dateRange, setDateRange] = useState("This Month");
  const [loading, setLoading] = useState(false);

  // Filter sub-tabs based on chosen master category
  const availableSubTabs = useMemo(() => {
    return SUB_TABS.filter((tab) => tab.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category: MainCategory) => {
    setActiveCategory(category);
    const firstTab = SUB_TABS.find((t) => t.category === category);
    if (firstTab) setActiveSubTab(firstTab.id);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="animate-in fade-in duration-300 space-y-4 font-sans">
      {/* PAGE HEADER */}
      <div className="bg-white px-5 py-4 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#eaf6f5] text-[#3a9898] flex items-center justify-center">
            <DollarSign size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#1a2632]">
              Finance & Accounts Workspace
            </h1>
            <p className="text-xs text-[#8b9bae]">
              Manage billing, general ledger, payroll, expenses, and financial
              settings.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            title="Refresh Data"
            className="p-1.5 text-[#8b9bae] hover:text-[#3a9898] hover:bg-[#f5f7f8] rounded-full transition-all ml-2"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 bg-[#f5f7f8] hover:bg-[#eaf6f5] text-[#5a6a76] hover:text-[#3a9898] text-xs font-semibold rounded-full border border-[#dde5e7] focus:outline-none cursor-pointer"
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Quarter">This Quarter</option>
            <option value="Custom Range">Custom Range</option>
          </select>

          <button
            onClick={() => alert("Create Invoice Modal Opened")}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20"
          >
            <Plus size={14} strokeWidth={2.5} /> Create Invoice
          </button>

          <button
            onClick={() => alert("Record Payment Modal Opened")}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#f0f4f5] hover:bg-[#dde5e7] text-[#1a2632] text-xs font-bold rounded-full transition-all border border-[#dde5e7]"
          >
            <CreditCard size={14} /> Record Payment
          </button>
        </div>
      </div>

      {/* COMPACT KPI SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl shadow-sm border border-[#dde5e7]">
          <p className="text-[11px] font-semibold text-[#8b9bae]">
            Total Revenue
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-base font-black text-[#1a2632]">₹4,620</h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <ArrowUpRight size={10} /> +12%
            </span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl shadow-sm border border-[#dde5e7]">
          <p className="text-[11px] font-semibold text-[#8b9bae]">
            Collections Realized
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-base font-black text-[#3a9898]">₹24,800</h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              Deposited
            </span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl shadow-sm border border-[#dde5e7]">
          <p className="text-[11px] font-semibold text-[#8b9bae]">
            Pending Receivables
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-base font-black text-amber-600">₹6,875</h3>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
              Outstanding
            </span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl shadow-sm border border-[#dde5e7]">
          <p className="text-[11px] font-semibold text-[#8b9bae]">
            Operating Expenses
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-base font-black text-rose-600">₹57,500</h3>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
              Outlays
            </span>
          </div>
        </div>
      </div>

      {/* TWO-LEVEL CATEGORY & TAB NAVIGATION */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* LEVEL 1: MASTER CATEGORIES */}
        <div className="p-2.5 bg-[#f5f7f8] border-b border-[#dde5e7] flex items-center gap-2 overflow-x-auto">
          {(
            [
              "Overview & Accounting",
              "Revenue & Billing",
              "Expenses & Payroll",
              "Reconciliation & Settings",
            ] as MainCategory[]
          ).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-white text-[#3a9898] shadow-sm border border-[#dde5e7]"
                  : "text-[#5a6a76] hover:text-[#1a2632] hover:bg-white/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LEVEL 2: CONTEXTUAL SUB-TABS */}
        <div className="px-4 py-2.5 bg-white border-b border-[#dde5e7] flex items-center gap-2 overflow-x-auto">
          {availableSubTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#eaf6f5] text-[#3a9898] font-bold border border-[#c4e4e0]"
                    : "text-[#5a6a76] hover:text-[#1a2632] hover:bg-[#f5f7f8]"
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

        {/* DYNAMIC ROUTED VIEW AREA */}
        <div className="p-5 min-h-[320px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-[#8b9bae] gap-2">
              <Loader2 size={28} className="animate-spin text-[#3a9898]" />
              <p className="text-xs font-semibold">
                Loading submodule details...
              </p>
            </div>
          ) : (
            <div>
              {activeSubTab === "Overview" && <FinanceOverview />}
              {activeSubTab === "Billing & Invoices" && <BillingInvoices />}
              {activeSubTab === "Payments & Collections" && (
                <PaymentsCollections />
              )}
              {activeSubTab === "Outstanding Dues" && <OutstandingDues />}
              {activeSubTab === "Refunds & Credit Notes" && (
                <RefundsCreditNotes />
              )}
              {activeSubTab === "Office Expenses" && <Expenses />}
              {activeSubTab === "Financial Reports" && <FinancialReports />}
              {activeSubTab === "Payment Reconciliation" && (
                <PaymentReconciliation />
              )}
              {activeSubTab === "Tax & Invoice Settings" && (
                <TaxInvoiceSettings />
              )}

              {activeSubTab === "General Ledger" && <GeneralLedger />}
              {activeSubTab === "Chart of Accounts" && <ChartOfAccounts />}
              {activeSubTab === "Payroll & Salaries" && <PayrollSalaries />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

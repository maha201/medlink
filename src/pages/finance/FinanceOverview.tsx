import React, { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";

export default function FinanceOverview() {
  const [selectedMonth, setSelectedMonth] = useState("October 2026");
  const [entryFilter, setEntryFilter] = useState("Both entries");

  return (
    <div className="space-y-4 animate-in fade-in duration-300 font-sans">
      {/* FILTER BAR: Month Selector & Entry Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div className="flex items-center gap-2.5">
          {/* Month Picker dropdown */}
          <div className="flex items-center gap-2 bg-[#f5f7f8] px-3.5 py-1.5 rounded-xl border border-[#dde5e7] text-xs font-semibold text-[#1a2632] cursor-pointer hover:bg-[#eaf6f5] transition-all">
            <Calendar size={14} className="text-[#3a9898]" />
            <span>{selectedMonth}</span>
            <ChevronDown size={14} className="text-[#8b9bae]" />
          </div>

          {/* Both Entries Filter */}
          <div className="flex items-center gap-2 bg-[#f5f7f8] px-3.5 py-1.5 rounded-xl border border-[#dde5e7] text-xs font-semibold text-[#5a6a76] cursor-pointer hover:bg-[#eaf6f5] transition-all">
            <span>{entryFilter}</span>
            <ChevronDown size={14} className="text-[#8b9bae]" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-1.5 bg-white border border-[#dde5e7] text-[#1a2632] text-xs font-bold rounded-xl shadow-sm hover:bg-[#f5f7f8] transition-all">
            Accounts
          </button>
        </div>
      </div>

      {/* 4 KPI CARDS (Matching Exact Layout & Colors) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Card 1: Net Profit (Red Highlight Box) */}
        <div className="bg-[#b93838] text-white p-4 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-medium text-white/80">
              Net profit - Oct 2026
            </p>
            <h3 className="text-xl font-black mt-1">₹-2,000.00</h3>
          </div>
          <div className="mt-4 text-[11px] font-semibold text-white/95">
            Margin 0%
          </div>
        </div>

        {/* Card 2: Income */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-semibold text-[#8b9bae]">Income</p>
            <h3 className="text-xl font-black text-emerald-600 mt-1">₹0.00</h3>
          </div>
          <div className="mt-4 text-[11px] text-[#8b9bae]">This month</div>
        </div>

        {/* Card 3: Expense */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-semibold text-[#8b9bae]">Expense</p>
            <h3 className="text-xl font-black text-[#1a2632] mt-1">
              ₹2,000.00
            </h3>
          </div>
          <div className="mt-4 text-[11px] text-[#8b9bae]">This month</div>
        </div>

        {/* Card 4: Cash & Bank Balance */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-semibold text-[#8b9bae]">
              Cash & bank balance
            </p>
            <h3 className="text-xl font-black text-[#1a2632] mt-1">₹0.00</h3>
          </div>
          <div className="mt-4 text-[11px] font-bold text-[#3a9898] cursor-pointer hover:underline">
            0 accounts →
          </div>
        </div>
      </div>

      {/* CHARTS & HEAD BREAKDOWNS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Left 2 Cols: Income vs Expense Chart */}
        <div className="lg:col-span-2 bg-white p-4 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col justify-between min-h-[300px]">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-[#1a2632]">
                Income vs Expense
              </h4>
              <p className="text-[10px] text-[#8b9bae] mt-0.5">Last 6 months</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold">
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>{" "}
                Income
              </span>
              <span className="flex items-center gap-1.5 text-rose-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>{" "}
                Expense
              </span>
            </div>
          </div>

          {/* Corrected Income vs Expense Vertical Bar Chart */}
          <div className="flex items-end justify-between px-6 pt-10 pb-3 h-52 border-b border-[#f0f4f5] gap-3">
            {[
              { month: "May", inc: "h-0", exp: "h-0" },
              { month: "Jun", inc: "h-0", exp: "h-0" },
              { month: "Jul", inc: "h-6", exp: "h-36" },
              { month: "Aug", inc: "h-4", exp: "h-0" },
              { month: "Sep", inc: "h-0", exp: "h-0" },
              { month: "Oct", inc: "h-0", exp: "h-6" },
            ].map((item) => (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
              >
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  <div
                    title="Income"
                    className={`w-3.5 bg-emerald-500 rounded-t transition-all ${item.inc}`}
                  ></div>
                  <div
                    title="Expense"
                    className={`w-3.5 bg-rose-500 rounded-t transition-all ${item.exp}`}
                  ></div>
                </div>
                <span className="text-[10px] font-semibold text-[#8b9bae]">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Income & Expense by Head */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-xs font-bold text-[#1a2632]">Income by head</h4>
            <p className="text-[11px] text-[#8b9bae] mt-2">
              No income this period.
            </p>
          </div>

          <div className="border-t border-[#f0f4f5] pt-3">
            <h4 className="text-xs font-bold text-[#1a2632]">
              Expense by head
            </h4>
            <div className="flex items-center justify-between mt-2.5 text-xs">
              <span className="text-[#5a6a76] font-medium">
                Medicine purchase
              </span>
              <span className="font-bold text-rose-600">₹2,000.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Dietitian-wise consultation revenue */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#dde5e7]">
        <h4 className="text-xs font-bold text-[#1a2632]">
          Dietitian-wise consultation revenue
        </h4>
        <p className="text-[11px] text-[#8b9bae] mt-2">
          No consultation payments this period.
        </p>
      </div>
    </div>
  );
}

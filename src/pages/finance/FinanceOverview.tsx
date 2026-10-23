import React, { useState, useEffect, useCallback } from "react";
import { Calendar, ChevronDown, RefreshCw } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

// ── Fallback Data for Income vs Expense Chart ──
const defaultRevenueData = [
  { name: "Jan", income: 45000, expense: 22000 },
  { name: "Feb", income: 52000, expense: 28000 },
  { name: "Mar", income: 48000, expense: 25000 },
  { name: "Apr", income: 61000, expense: 32000 },
  { name: "May", income: 55000, expense: 30000 },
  { name: "Jun", income: 67000, expense: 35000 },
  { name: "Jul", income: 72000, expense: 40000 },
  { name: "Aug", income: 68000, expense: 38000 },
  { name: "Sep", income: 80000, expense: 42000 },
  { name: "Oct", income: 75000, expense: 45000 },
];

export interface FinanceOverviewData {
  netProfit: number;
  margin: number;
  income: number;
  expense: number;
  cashBankBalance: number;
  monthlyTrend: Array<{ name: string; income: number; expense: number }>;
  topExpenseCategories: Array<{ category: string; total: number }>;
}

export default function FinanceOverview() {
  const [selectedMonth, setSelectedMonth] = useState("October 2026");
  const [entryFilter, setEntryFilter] = useState("Both entries");
  const [overviewData, setOverviewData] = useState<FinanceOverviewData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOverview = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch(API_ENDPOINTS.hospitalFinanceOverview, { method: "GET" });
      const data = typeof res?.json === "function" ? await res.json() : res;

      if (data?.data) {
        setOverviewData(data.data);
      } else if (data && typeof data === "object") {
        setOverviewData(data);
      }
    } catch (err) {
      console.error("Failed to fetch finance overview:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  const chartData = overviewData?.monthlyTrend?.length ? overviewData.monthlyTrend : defaultRevenueData;

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

          <button
            onClick={fetchOverview}
            disabled={loading}
            className="p-1.5 text-[#8b9bae] hover:text-[#3a9898] hover:bg-[#eaf6f5] rounded-lg transition-colors cursor-pointer"
            title="Refresh Overview"
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-[#3a9898]" : ""} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-1.5 bg-white border border-[#dde5e7] text-[#1a2632] text-xs font-bold rounded-xl shadow-sm hover:bg-[#f5f7f8] transition-all cursor-pointer">
            Accounts
          </button>
        </div>
      </div>

      {/* 4 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Card 1: Net Profit */}
        <div className="bg-[#b93838] text-white p-4 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-medium text-white/80">
              Net profit - {selectedMonth}
            </p>
            <h3 className="text-xl font-black mt-1">
              ₹{(overviewData?.netProfit ?? 30000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="mt-4 text-[11px] font-semibold text-white/95">
            Margin {overviewData?.margin ?? 40}%
          </div>
        </div>

        {/* Card 2: Income */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-semibold text-[#8b9bae]">Income</p>
            <h3 className="text-xl font-black text-emerald-600 mt-1">
              ₹{(overviewData?.income ?? 75000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="mt-4 text-[11px] text-[#8b9bae]">This month</div>
        </div>

        {/* Card 3: Expense */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-semibold text-[#8b9bae]">Expense</p>
            <h3 className="text-xl font-black text-[#1a2632] mt-1">
              ₹{(overviewData?.expense ?? 45000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
            <h3 className="text-xl font-black text-[#1a2632] mt-1">
              ₹{(overviewData?.cashBankBalance ?? 120000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="mt-4 text-[11px] font-bold text-[#3a9898] cursor-pointer hover:underline">
            Accounts Total →
          </div>
        </div>
      </div>

      {/* CHARTS & HEAD BREAKDOWNS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Left 2 Cols: Income vs Expense Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-[#dde5e7] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-[#1a2632] text-sm">Revenue</h3>
              <div className="flex gap-4 mt-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2C8C89]"></div>
                  <span className="text-xs font-medium text-slate-500">
                    Income
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0F393B]"></div>
                  <span className="text-xs font-medium text-slate-500">
                    Expense
                  </span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer">
              Last Year <ChevronDown size={14} />
            </button>
          </div>

          <div className="w-full h-56 flex items-center justify-center">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorIncome"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#2C8C89"
                        stopOpacity={0.25}
                      />
                      <stop offset="95%" stopColor="#2C8C89" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorExpense"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#0F393B"
                        stopOpacity={0.25}
                      />
                      <stop offset="95%" stopColor="#0F393B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#F1F5F9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    tickFormatter={(v) => `₹${v / 1000}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      border: "1px solid #e2e8ed",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#0F393B"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorExpense)"
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#2C8C89"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorIncome)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-slate-400">
                No Revenue Data Available
              </p>
            )}
          </div>
        </div>

        {/* Right 1 Col: Income & Expense by Head */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-xs font-bold text-[#1a2632]">Income by head</h4>
            <div className="flex items-center justify-between mt-2.5 text-xs">
              <span className="text-[#5a6a76] font-medium">Pharmacy Sales</span>
              <span className="font-bold text-emerald-600">₹75,000.00</span>
            </div>
          </div>

          <div className="border-t border-[#f0f4f5] pt-3">
            <h4 className="text-xs font-bold text-[#1a2632]">
              Expense by head
            </h4>
            <div className="flex items-center justify-between mt-2.5 text-xs">
              <span className="text-[#5a6a76] font-medium">
                Medicine purchase
              </span>
              <span className="font-bold text-rose-600">₹45,000.00</span>
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
          No consultation payments recorded for this period.
        </p>
      </div>
    </div>
  );
}

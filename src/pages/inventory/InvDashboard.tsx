import React, { useState } from "react";
import {
  AlertTriangle,
  Clock,
  Plus,
  ShoppingCart,
  MoreHorizontal,
  TrendingUp,
  Package,
  Layers,
  AlertCircle,
} from "lucide-react";
import { StatCard, Badge, Th, Td } from "./InvComponents";
import { items, expiryItems } from "./inventoryData";

const lowStock = items.filter((i) =>
  ["Low Stock", "Critical", "Out of Stock"].includes(i.status),
);

function expiryStatus(days: number) {
  if (days < 0) return "Expired";
  if (days <= 7) return "Critical";
  if (days <= 30) return "Expiring Soon";
  return "Normal";
}

export default function InvDashboard({
  onAddItem,
  onCreatePO,
}: {
  onAddItem: () => void;
  onCreatePO: () => void;
}) {
  const [activeFilter, setActiveFilter] = useState("This Week");

  return (
    <div className="flex-1 bg-white rounded-2xl p-3 sm:p-4 flex flex-col min-h-0 space-y-5 text-slate-800 font-sans">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Inventory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor stock levels, purchases, usage, and inventory activity.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={onAddItem}
            className="flex items-center gap-1.5 bg-[#0F393B] hover:bg-[#0a2729] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <Plus size={15} /> Add Item
          </button>
          <button
            onClick={onCreatePO}
            className="flex items-center gap-1.5 bg-white border border-slate-200 hover:border-[#2C8C89] text-slate-700 hover:text-[#2C8C89] text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <ShoppingCart size={15} /> Create PO
          </button>
        </div>
      </div>

      {/* STAT CARDS (DASHBOARD MATCHED) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-medium">
              Total Items
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#0F393B] flex items-center justify-center text-white">
              <Package size={16} />
            </div>
          </div>
          <div className="my-2">
            <h3 className="text-xl font-bold text-slate-900">1,248</h3>
          </div>
          <span className="text-slate-400 text-[11px]">
            Across all categories
          </span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-medium">
              Total Stock Value
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#0F393B] flex items-center justify-center text-white">
              <Layers size={16} />
            </div>
          </div>
          <div className="my-2">
            <h3 className="text-xl font-bold text-[#2C8C89]">₹8,42,650</h3>
          </div>
          <span className="text-slate-400 text-[11px]">Current valuation</span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-medium">
              Low Stock
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="my-2">
            <h3 className="text-xl font-bold text-amber-600">18</h3>
          </div>
          <span className="text-amber-600/80 text-[11px] font-medium">
            Need reorder
          </span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-medium">
              Expiring Soon
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <div className="my-2">
            <h3 className="text-xl font-bold text-amber-600">12</h3>
          </div>
          <span className="text-amber-600/80 text-[11px] font-medium">
            Within 30 days
          </span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-medium">
              Out of Stock
            </span>
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
              <AlertCircle size={16} />
            </div>
          </div>
          <div className="my-2">
            <h3 className="text-xl font-bold text-red-500">7</h3>
          </div>
          <span className="text-red-500/80 text-[11px] font-medium">
            Immediate action
          </span>
        </div>
      </div>

      {/* CHART OVERVIEW SECTION */}
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <h2 className="text-sm font-bold text-slate-900">Stock Overview</h2>
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200/60 self-start sm:self-auto">
            {["Today", "This Week", "This Month", "Custom"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === f
                    ? "bg-[#0F393B] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* CUSTOM BAR CHART */}
        <div className="flex items-end gap-3 h-32 pt-2">
          {[
            { label: "Mon", in: 70, out: 40, cur: 85 },
            { label: "Tue", in: 55, out: 60, cur: 80 },
            { label: "Wed", in: 90, out: 35, cur: 95 },
            { label: "Thu", in: 45, out: 55, cur: 70 },
            { label: "Fri", in: 80, out: 45, cur: 88 },
            { label: "Sat", in: 30, out: 20, cur: 60 },
            { label: "Sun", in: 20, out: 15, cur: 50 },
          ].map((d) => (
            <div
              key={d.label}
              className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
            >
              <div className="w-full flex items-end gap-1 h-24">
                <div
                  className="flex-1 bg-[#0F393B] rounded-t-sm transition-all"
                  style={{ height: `${d.in}%` }}
                  title="Stock In"
                />
                <div
                  className="flex-1 bg-amber-400 rounded-t-sm transition-all"
                  style={{ height: `${d.out}%` }}
                  title="Stock Out"
                />
                <div
                  className="flex-1 bg-[#A2D4D1] rounded-t-sm transition-all"
                  style={{ height: `${d.cur}%` }}
                  title="Current"
                />
              </div>
              <span className="text-[11px] font-medium text-slate-400">
                {d.label}
              </span>
            </div>
          ))}
        </div>

        {/* LEGEND */}
        <div className="flex items-center gap-5 mt-4 pt-3 border-t border-slate-100 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0F393B]" />
            <span>Stock In</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Stock Out</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#A2D4D1]" />
            <span>Current Stock</span>
          </div>
        </div>
      </div>

      {/* TABLES ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LOW STOCK TABLE */}
        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-500" />
            <h2 className="text-sm font-bold text-slate-900">
              Low Stock Items
            </h2>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <Th>Item</Th>
                  <Th>Stock</Th>
                  <Th>Min Level</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {lowStock.map((i) => (
                  <tr
                    key={i.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <Td>
                      <p className="font-bold text-slate-900 text-xs">
                        {i.name}
                      </p>
                      <p className="text-[11px] text-slate-400 font-normal">
                        {i.category}
                      </p>
                    </Td>
                    <Td>
                      <span className="font-semibold text-slate-800">
                        {i.stock}
                      </span>{" "}
                      <span className="text-[11px] text-slate-400">
                        {i.unit}
                      </span>
                    </Td>
                    <Td className="text-slate-600 font-medium">{i.reorder}</Td>
                    <Td>
                      <Badge status={i.status} />
                    </Td>
                    <Td className="text-right pr-4">
                      <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={15} />
                      </button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* EXPIRING SOON TABLE */}
        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <Clock size={16} className="text-amber-500" />
            <h2 className="text-sm font-bold text-slate-900">Expiring Soon</h2>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <Th>Item</Th>
                  <Th>Batch</Th>
                  <Th>Expiry</Th>
                  <Th>Qty</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {expiryItems.map((e) => (
                  <tr
                    key={e.batch}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <Td>
                      <p className="font-bold text-slate-900 text-xs">
                        {e.name}
                      </p>
                    </Td>
                    <Td className="text-[11px] font-medium text-slate-500">
                      {e.batch}
                    </Td>
                    <Td className="text-[11px] font-medium text-slate-500">
                      {e.expiry}
                    </Td>
                    <Td className="font-semibold text-slate-800">{e.qty}</Td>
                    <Td>
                      <Badge status={expiryStatus(e.days)} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

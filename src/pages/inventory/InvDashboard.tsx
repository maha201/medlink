import React, { useState } from "react";
import {
  Grid,
  TrendingDown,
  XSquare,
  Info,
  ChevronDown,
  MoreHorizontal,
  Plus,
  Minus,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

// --- TYPES & INTERFACES ---
export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  availability: "Available" | "Low" | "Out of Stock";
  quantity: number;
  unit: string;
  percentage: number;
  expiryDate: string;
  expiryStatus: "Safe" | "Near Expiry" | "Expired";
}

export interface ActivityLog {
  id: string;
  type:
    | "Stock added"
    | "Stock removed"
    | "Transfer"
    | "Wastage"
    | "Damaged items report";
  time: string;
  description: string;
}

// --- MOCK DATA ---
const inventoryList: InventoryItem[] = [
  {
    id: "1",
    sku: "SKU: GLV-NT-M",
    name: "Surgical Gloves Nitrile Medium",
    category: "Consumables",
    availability: "Available",
    quantity: 320,
    unit: "Boxes",
    percentage: 80,
    expiryDate: "30 Dec 2035",
    expiryStatus: "Safe",
  },
  {
    id: "2",
    sku: "SKU: IVF-NS-500",
    name: "Normal Saline 0.9% 500ml",
    category: "IV & Fluids",
    availability: "Available",
    quantity: 180,
    unit: "Bottles",
    percentage: 70,
    expiryDate: "15 Nov 2035",
    expiryStatus: "Safe",
  },
  {
    id: "3",
    sku: "SKU: MED-PARA-500",
    name: "Paracetamol 500mg Tablets",
    category: "Medications",
    availability: "Low",
    quantity: 24,
    unit: "Boxes",
    percentage: 20,
    expiryDate: "20 August 2035",
    expiryStatus: "Near Expiry",
  },
  {
    id: "4",
    sku: "SKU: MED-CEF-1G",
    name: "Ceftriaxone 1g Injection",
    category: "Medications",
    availability: "Available",
    quantity: 95,
    unit: "Vials",
    percentage: 60,
    expiryDate: "05 July 2036",
    expiryStatus: "Safe",
  },
  {
    id: "5",
    sku: "SKU: LAB-RAP-AG",
    name: "Rapid COVID-19 Antigen Test Kit",
    category: "Laboratory Supplies",
    availability: "Out of Stock",
    quantity: 0,
    unit: "Packs",
    percentage: 0,
    expiryDate: "01 June 2035",
    expiryStatus: "Expired",
  },
];

const activityLogs: ActivityLog[] = [
  {
    id: "1",
    type: "Stock added",
    time: "5m ago",
    description: "50 boxes Surgical Gloves (Medium) to Central Store",
  },
  {
    id: "2",
    type: "Stock removed",
    time: "37m ago",
    description: "20 bottles Normal Saline 0.9% for Emergency Dept",
  },
  {
    id: "3",
    type: "Transfer",
    time: "2h ago",
    description: "10 vials Insulin to ICU from Pharmacy",
  },
  {
    id: "4",
    type: "Wastage",
    time: "4h ago",
    description: "6 packs expired Rapid Test Kits disposed",
  },
  {
    id: "5",
    type: "Damaged items report",
    time: "Yesterday",
    description: "2 units Portable BP Monitor (screen cracked)",
  },
  {
    id: "6",
    type: "Stock added",
    time: "Yesterday",
    description: "120 units N95 Masks to Isolation Ward Store",
  },
  {
    id: "7",
    type: "Transfer",
    time: "Yesterday",
    description: "5 units Syringe Pump to NICU from Equipment Room",
  },
  {
    id: "8",
    type: "Wastage",
    time: "2d ago",
    description: "12 bottles expired Cough Syrup disposed",
  },
  {
    id: "9",
    type: "Damaged items report",
    time: "3d ago",
    description: "1 unit Patient Monitor (battery failure)",
  },
];

// --- REUSABLE SUB-COMPONENTS ---
function StatCard({
  title,
  value,
  trend,
  trendType,
  icon: Icon,
}: {
  title: string;
  value: string;
  trend: string;
  trendType: "up" | "down";
  icon: React.ElementType;
}) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <span className="text-xs font-medium text-slate-400">{title}</span>
        <div className="w-8 h-8 rounded-lg bg-[#3a9898]/10 text-[#3a9898] flex items-center justify-center">
          <Icon size={18} />
        </div>
      </div>
      <div className="my-2">
        <h3 className="text-2xl font-bold text-[#1a2632]">{value}</h3>
      </div>
      <div className="flex items-center gap-1.5 text-[11px] font-medium">
        <span
          className={`flex items-center justify-center w-4 h-4 rounded-full text-[10px] ${
            trendType === "up"
              ? "bg-emerald-100 text-emerald-600"
              : "bg-rose-100 text-rose-500"
          }`}
        >
          {trendType === "up" ? "↗" : "↘"}
        </span>
        <span
          className={trendType === "up" ? "text-emerald-600" : "text-rose-500"}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}

function CategoryBar({
  title,
  subtitle,
  percentage,
  count,
  colorClass,
}: {
  title: string;
  subtitle: string;
  percentage: string;
  count: number;
  colorClass: string;
}) {
  return (
    <div className="flex-1 min-w-[100px]">
      <div className={`h-16 rounded-xl ${colorClass} mb-2`}></div>
      <div className="text-[11px]">
        <p className="font-bold text-[#1a2632] leading-tight">{title}</p>
        <p className="text-[#8b9bae] text-[10px] truncate">{subtitle}</p>
        <p className="font-bold text-[#1a2632] mt-1">
          {percentage}{" "}
          <span className="font-normal text-[#8b9bae]">| {count}</span>
        </p>
      </div>
    </div>
  );
}

function ActivityIcon({ type }: { type: ActivityLog["type"] }) {
  switch (type) {
    case "Stock added":
      return (
        <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <Plus size={13} />
        </div>
      );
    case "Stock removed":
      return (
        <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
          <Minus size={13} />
        </div>
      );
    case "Transfer":
      return (
        <div className="w-6 h-6 rounded-md bg-teal-50 text-[#3a9898] flex items-center justify-center shrink-0">
          <TrendingUp size={13} />
        </div>
      );
    default:
      return (
        <div className="w-6 h-6 rounded-md bg-teal-50 text-[#3a9898] flex items-center justify-center shrink-0">
          <AlertCircle size={13} />
        </div>
      );
  }
}

// --- MAIN DASHBOARD COMPONENT ---
export default function InvDashboard({
  onAddItem,
  onCreatePO,
}: {
  onAddItem: () => void;
  onCreatePO: () => void;
}) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItems(e.target.checked ? inventoryList.map((i) => i.id) : []);
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-4">
      {/* 1. TOP STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Items In Stock"
          value="1,280 Items"
          trend="+6% vs. last month"
          trendType="up"
          icon={Grid}
        />
        <StatCard
          title="Low Stock Items"
          value="34 Items"
          trend="-3% vs. last week"
          trendType="down"
          icon={TrendingDown}
        />
        <StatCard
          title="Out-of-Stock Items"
          value="7 Items"
          trend="-2 items vs. last week"
          trendType="down"
          icon={XSquare}
        />
        <StatCard
          title="Expiring Soon Items"
          value="19 Items"
          trend="+4 items vs. last month"
          trendType="up"
          icon={Info}
        />
      </div>

      {/* 2. CHARTS & CATEGORY ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Usage Trend Chart */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-[#1a2632]">
              Inventory Usage Trend
            </h2>
            <button
              type="button"
              className="flex items-center gap-1 px-3 py-1 bg-[#3a9898] text-white text-xs font-semibold rounded-full"
            >
              This Week <ChevronDown size={12} />
            </button>
          </div>

          <div className="flex items-end justify-between mt-4 gap-2">
            <div className="mb-2">
              <h3 className="text-2xl font-bold text-[#1a2632]">+2,6%</h3>
              <p className="text-[11px] text-[#8b9bae] max-w-[130px]">
                Inventory Usage Trend normally increase every weeks
              </p>
            </div>

            {/* Bars */}
            <div className="flex items-end gap-2.5 h-32 flex-1 justify-end">
              {[
                { day: "Mon", h: "35%" },
                { day: "Tue", h: "45%" },
                { day: "Wed", h: "60%" },
                { day: "Thu", h: "55%" },
                { day: "Fri", h: "85%", active: true },
                { day: "Sat", h: "65%" },
                { day: "Sun", h: "75%" },
              ].map((b) => (
                <div key={b.day} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-7 rounded-lg transition-all ${
                      b.active
                        ? "bg-[#3a9898]"
                        : "bg-[#eaf6f5] border border-dashed border-[#b5d9d5]"
                    }`}
                    style={{ height: b.h }}
                  />
                  <span className="text-[10px] text-[#8b9bae]">{b.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-[#1a2632]">
              Category Breakdown
            </h2>
            <button
              type="button"
              className="text-[#8b9bae] hover:text-[#1a2632]"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>

          <div className="flex gap-2.5 overflow-x-auto my-3 pb-1">
            <CategoryBar
              title="Medications"
              subtitle="Stuff"
              percentage="40%"
              count={512}
              colorClass="bg-striped-pattern bg-emerald-50 border border-emerald-200"
            />
            <CategoryBar
              title="Consumables"
              subtitle="(Gloves, Syringes, etc)"
              percentage="30%"
              count={384}
              colorClass="bg-[#eaf6f5]"
            />
            <CategoryBar
              title="IV & Fluids"
              subtitle="Items"
              percentage="12%"
              count={154}
              colorClass="bg-[#c4e4e0]"
            />
            <CategoryBar
              title="Laboratory"
              subtitle="Supplies"
              percentage="10%"
              count={128}
              colorClass="bg-[#3a9898]"
            />
            <CategoryBar
              title="Medical Equipment"
              subtitle="& Accessories"
              percentage="8%"
              count={102}
              colorClass="bg-[#1a2632]"
            />
          </div>
        </div>
      </div>

      {/* 3. TABLE & ACTIVITY LOG ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Inventory Main Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-sm font-bold text-[#1a2632]">Inventory</h2>

            {/* ACTION BUTTONS CONTAINED IN CONTAINER (Touch-friendly & Safe Placement) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onAddItem}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Plus size={14} /> Add Item
              </button>
              <button
                type="button"
                onClick={onCreatePO}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#f5f7f8] hover:bg-[#eaf6f5] text-[#5a6a76] hover:text-[#3a9898] text-xs font-semibold rounded-full border border-slate-200 transition-colors active:scale-95 cursor-pointer"
              >
                Create PO
              </button>
              <button
                type="button"
                className="text-[#8b9bae] hover:text-[#1a2632] ml-1"
              >
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-slate-100 text-[11px] font-medium text-[#8b9bae]">
                  <th className="py-3 pl-4 w-10">
                    <input
                      type="checkbox"
                      onChange={toggleSelectAll}
                      checked={selectedItems.length === inventoryList.length}
                      className="rounded border-slate-300 text-[#3a9898] focus:ring-[#3a9898]"
                    />
                  </th>
                  <th className="py-3 px-2">Photo ↕</th>
                  <th className="py-3 px-3">Item ↕</th>
                  <th className="py-3 px-3">Category ↕</th>
                  <th className="py-3 px-3">Availability ↕</th>
                  <th className="py-3 px-3">Quantity in Stock ↕</th>
                  <th className="py-3 px-3">Status ↕</th>
                  <th className="py-3 pr-4 text-center">Action ↕</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {inventoryList.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#f5f7f8] transition-colors"
                  >
                    <td className="py-3 pl-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                        className="rounded border-slate-300 text-[#3a9898] focus:ring-[#3a9898]"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-bold text-[#1a2632] text-xs">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-[#8b9bae]">{item.sku}</p>
                    </td>
                    <td className="py-3 px-3 text-[#5a6a76] font-medium">
                      {item.category}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.availability === "Available"
                            ? "bg-[#eaf6f5] text-[#3a9898]"
                            : item.availability === "Low"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-rose-50 text-rose-500"
                        }`}
                      >
                        {item.availability}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-bold text-[#1a2632]">
                        {item.quantity}{" "}
                        <span className="font-normal text-[10px] text-[#8b9bae]">
                          {item.unit}
                        </span>
                      </p>
                      <div className="w-20 bg-slate-100 h-1 rounded-full mt-1 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.percentage > 50
                              ? "bg-[#3a9898]"
                              : item.percentage > 0
                                ? "bg-amber-400"
                                : "bg-rose-400"
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-[#1a2632]">
                        {item.expiryDate}
                      </p>
                      <p
                        className={`text-[10px] font-bold ${
                          item.expiryStatus === "Safe"
                            ? "text-[#3a9898]"
                            : item.expiryStatus === "Near Expiry"
                              ? "text-amber-500"
                              : "text-rose-500"
                        }`}
                      >
                        {item.expiryStatus}
                      </p>
                    </td>
                    <td className="py-3 pr-4 text-center">
                      <button
                        type="button"
                        className="px-3 py-1 rounded-full border border-[#3a9898] text-[#3a9898] hover:bg-[#3a9898] hover:text-white text-xs font-semibold transition-colors"
                      >
                        Reorder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Activities Log Panel */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-bold text-[#1a2632]">
              Inventory Activities
            </h2>
            <button
              type="button"
              className="text-[#8b9bae] hover:text-[#1a2632]"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[420px] pr-1">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex gap-2.5 items-start">
                <ActivityIcon type={log.type} />
                <div className="flex-1 text-[11px]">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#8b9bae]">
                      {log.type}
                    </span>
                    <span className="text-[10px] text-[#8b9bae]">
                      {log.time}
                    </span>
                  </div>
                  <p className="text-[#1a2632] leading-tight mt-0.5">
                    {log.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

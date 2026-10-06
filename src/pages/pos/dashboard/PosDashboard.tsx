import React from "react";
import {
  TrendingUp,
  ShoppingCart,
  Package,
  AlertTriangle,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  User,
  CreditCard,
  QrCode,
  Banknote,
  Plus,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function PosDashboard() {
  // Enhanced metrics data
  const stats = [
    {
      title: "Total Sales Today",
      value: "₹45,200",
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      badge: "vs yesterday",
    },
    {
      title: "Total Orders",
      value: "148",
      change: "+8.2%",
      isPositive: true,
      icon: ShoppingCart,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      badge: "12 pending",
    },
    {
      title: "Products in Stock",
      value: "1,240",
      change: "-2.4%",
      isPositive: false,
      icon: Package,
      color: "bg-purple-50 text-purple-600 border-purple-100",
      badge: "41 Categories",
    },
    {
      title: "Low Stock Alerts",
      value: "7",
      change: "Action needed",
      isPositive: false,
      icon: AlertTriangle,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      badge: "Critical",
    },
  ];

  // Top Selling Products with visual progress bars
  const topProducts = [
    {
      name: "Paracetamol 500mg",
      category: "Tablet",
      sold: "240 units",
      percentage: 85,
      color: "bg-[#3a9898]",
    },
    {
      name: "Amoxicillin 250mg",
      category: "Capsule",
      sold: "190 units",
      percentage: 65,
      color: "bg-blue-500",
    },
    {
      name: "Digital Thermometer",
      category: "Equipment",
      sold: "120 units",
      percentage: 45,
      color: "bg-purple-500",
    },
    {
      name: "Cough Syrup 100ml",
      category: "Syrup",
      sold: "95 units",
      percentage: 30,
      color: "bg-amber-500",
    },
  ];

  // Recent transactions
  const recentSales = [
    {
      id: "INV-1092",
      customer: "Ramesh Kumar",
      mode: "UPI",
      items: 4,
      total: "₹1,250",
      time: "10:45 AM",
      status: "Completed",
    },
    {
      id: "INV-1091",
      customer: "Priya Sharma",
      mode: "Cash",
      items: 2,
      total: "₹850",
      time: "10:30 AM",
      status: "Completed",
    },
    {
      id: "INV-1090",
      customer: "Anbu Selvan",
      mode: "Card",
      items: 6,
      total: "₹3,400",
      time: "10:15 AM",
      status: "Completed",
    },
    {
      id: "INV-1089",
      customer: "Kavitha M.",
      mode: "UPI",
      items: 1,
      total: "₹450",
      time: "09:50 AM",
      status: "Returned",
    },
  ];

  return (
    <div className="p-3 sm:p-4 space-y-4 bg-[#f5f7f8] min-h-full font-sans">
      {/* Top Banner / Quick Action Bar */}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-sm border border-[#dde5e7] hover:shadow-md transition-shadow flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[#5a6a76]">{stat.title}</p>
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center border ${stat.color}`}
                >
                  <Icon size={18} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#1a2632] tracking-tight">
                  {stat.value}
                </h3>
                <div className="flex items-center justify-between mt-1 pt-2 border-t border-[#f0f4f5]">
                  <span
                    className={`text-[11px] font-bold flex items-center gap-0.5 ${stat.isPositive ? "text-emerald-600" : "text-rose-500"}`}
                  >
                    {stat.isPositive ? (
                      <ArrowUpRight size={13} />
                    ) : (
                      <ArrowDownRight size={13} />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-[10px] bg-[#f5f7f8] text-[#5a6a76] px-2 py-0.5 rounded font-medium">
                    {stat.badge}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Section: Recent Transactions & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Transactions Table (Takes 2 Columns) */}
        <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow-sm border border-[#dde5e7] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-xs text-[#1a2632]">
                  Recent Sales Transactions
                </h3>
                <p className="text-[10px] text-[#8b9bae]">
                  Latest completed bills at the counter
                </p>
              </div>
              <span className="text-[11px] text-[#3a9898] font-bold cursor-pointer hover:underline flex items-center gap-0.5">
                View All <ArrowRight size={12} />
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#dde5e7] text-[#8b9bae]">
                    <th className="pb-2.5 font-semibold">Invoice ID</th>
                    <th className="pb-2.5 font-semibold">Customer</th>
                    <th className="pb-2.5 font-semibold">Mode</th>
                    <th className="pb-2.5 font-semibold">Items</th>
                    <th className="pb-2.5 font-semibold">Total</th>
                    <th className="pb-2.5 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f4f5]">
                  {recentSales.map((sale) => (
                    <tr
                      key={sale.id}
                      className="hover:bg-[#f5f7f8]/60 transition-colors"
                    >
                      <td className="py-2.5 font-bold text-[#1a2632]">
                        {sale.id}
                      </td>
                      <td className="py-2.5 text-[#5a6a76] font-medium">
                        {sale.customer}
                      </td>
                      <td className="py-2.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-[#f0f4f5] px-2 py-0.5 rounded text-[#1a2632]">
                          {sale.mode === "UPI" && (
                            <QrCode size={10} className="text-[#3a9898]" />
                          )}
                          {sale.mode === "Cash" && (
                            <Banknote size={10} className="text-emerald-600" />
                          )}
                          {sale.mode === "Card" && (
                            <CreditCard size={10} className="text-blue-600" />
                          )}
                          {sale.mode}
                        </span>
                      </td>
                      <td className="py-2.5 text-[#5a6a76]">
                        {sale.items} items
                      </td>
                      <td className="py-2.5 font-bold text-[#1a2632]">
                        {sale.total}
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            sale.status === "Completed"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-rose-50 text-rose-600"
                          }`}
                        >
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Selling Products / Visual Breakdown */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#dde5e7] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-xs text-[#1a2632]">
                Top Selling Items
              </h3>
              <span className="text-[10px] font-semibold text-[#8b9bae] bg-[#f5f7f8] px-2 py-0.5 rounded">
                Today
              </span>
            </div>

            <div className="space-y-3.5">
              {topProducts.map((prod, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1a2632]">
                      {prod.name}
                    </span>
                    <span className="text-[11px] font-semibold text-[#5a6a76]">
                      {prod.sold}
                    </span>
                  </div>
                  <div className="w-full bg-[#f0f4f5] h-2 rounded-full overflow-hidden">
                    <div
                      className={`${prod.color} h-full rounded-full`}
                      style={{ width: `${prod.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#dde5e7] bg-[#fefefe] flex items-center justify-between">
            <span className="text-[11px] text-[#8b9bae]">
              Low Stock Items Warning
            </span>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              7 Products
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Quick Analytics & Payment Methods Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#dde5e7] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-[#8b9bae]">
              Cash in Drawer
            </p>
            <h4 className="text-lg font-bold text-[#1a2632] mt-0.5">₹12,450</h4>
            <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
              Register Open (Drawer #1)
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Banknote size={20} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#dde5e7] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-[#8b9bae]">
              UPI / QR Collection
            </p>
            <h4 className="text-lg font-bold text-[#1a2632] mt-0.5">₹24,800</h4>
            <p className="text-[10px] text-blue-600 font-semibold mt-0.5">
              64 Successful Scans
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <QrCode size={20} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#dde5e7] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-[#8b9bae]">
              Card Payments
            </p>
            <h4 className="text-lg font-bold text-[#1a2632] mt-0.5">₹7,950</h4>
            <p className="text-[10px] text-purple-600 font-semibold mt-0.5">
              18 POS Swipes
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <CreditCard size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

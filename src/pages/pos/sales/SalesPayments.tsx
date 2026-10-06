import React from "react";
import {
  CreditCard,
  QrCode,
  Banknote,
  ShieldCheck,
  ArrowUpRight,
  DollarSign,
} from "lucide-react";

export default function PaymentGateways() {
  const paymentMethods = [
    {
      title: "UPI / QR Scanner",
      desc: "PhonePe, Google Pay, Paytm, BHIM",
      volume: "₹24,800",
      count: "64 transactions",
      icon: QrCode,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Cash Drawer",
      desc: "Physical currency register settlement",
      volume: "₹12,450",
      count: "42 transactions",
      icon: Banknote,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Credit / Debit Card POS",
      desc: "Swipe, Tap & Chip terminal",
      volume: "₹7,950",
      count: "18 transactions",
      icon: CreditCard,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
  ];

  return (
    <div className="p-3 sm:p-4 space-y-4 bg-[#f5f7f8] min-h-full font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white px-5 py-4 rounded-xl shadow-sm border border-[#dde5e7]">
        <div>
          <h1 className="text-lg font-bold text-[#1a2632]">
            Payment & Settlement
          </h1>
          <p className="text-[11px] text-[#8b9bae] mt-0.5">
            Monitor collection modes, settlements, and gateway statuses.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-100">
          <ShieldCheck size={16} /> All Terminals Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {paymentMethods.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl shadow-sm border border-[#dde5e7] flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs text-[#1a2632]">
                    {m.title}
                  </h3>
                  <p className="text-[10px] text-[#8b9bae] mt-0.5">{m.desc}</p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border ${m.color}`}
                >
                  <Icon size={20} />
                </div>
              </div>

              <div className="pt-3 border-t border-[#f0f4f5] flex items-center justify-between">
                <div>
                  <span className="text-lg font-black text-[#1a2632]">
                    {m.volume}
                  </span>
                  <p className="text-[10px] text-[#5a6a76] font-medium">
                    {m.count}
                  </p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  Settled
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-[#dde5e7] space-y-3">
        <h3 className="font-bold text-xs text-[#1a2632]">
          Recent Settlement History
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#f5f7f8] border border-[#dde5e7]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <QrCode size={16} />
              </div>
              <div>
                <h4 className="font-bold text-[#1a2632]">
                  UPI Batch Settlement #UPI-892
                </h4>
                <p className="text-[10px] text-[#8b9bae]">
                  Settled to HDFC Bank A/c ending 4092
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-[#1a2632]">₹24,800</span>
              <p className="text-[10px] text-emerald-600 font-semibold">
                Completed at 02:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

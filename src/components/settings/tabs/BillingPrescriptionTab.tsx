import { useState } from "react";
import { Receipt, CreditCard, FileCheck2, CheckCircle2 } from "lucide-react";

export default function BillingPrescriptionTab() {
  const [billing, setBilling] = useState({
    invoicePrefix: "INV-2026-",
    nextInvoiceNo: "10045",
    prescriptionPrefix: "RX-2026-",
    nextPrescriptionNo: "8801",
    showDoctorRegNo: true,
    showClinicLogoOnRx: true,
    rxFooterNote:
      "Get well soon! Contact hospital emergency for urgent issues.",
    paymentModes: {
      cash: true,
      upi: true,
      card: true,
      insurance: false,
    },
  });

  const [saved, setSaved] = useState(false);

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[10px] px-3.5 py-2.5 text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";

  return (
    <div className="space-y-6">
      {/* Invoice & Sequence Numbers */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider flex items-center gap-1.5">
          <Receipt size={14} className="text-[#3a9898]" /> Invoice &
          Prescription Sequence Formats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Invoice Prefix</label>
            <input
              type="text"
              className={inputCls}
              value={billing.invoicePrefix}
              onChange={(e) =>
                setBilling({ ...billing, invoicePrefix: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelCls}>Next Invoice Counter Number</label>
            <input
              type="text"
              className={inputCls}
              value={billing.nextInvoiceNo}
              onChange={(e) =>
                setBilling({ ...billing, nextInvoiceNo: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelCls}>Prescription Serial Prefix</label>
            <input
              type="text"
              className={inputCls}
              value={billing.prescriptionPrefix}
              onChange={(e) =>
                setBilling({ ...billing, prescriptionPrefix: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelCls}>Next Prescription Counter</label>
            <input
              type="text"
              className={inputCls}
              value={billing.nextPrescriptionNo}
              onChange={(e) =>
                setBilling({ ...billing, nextPrescriptionNo: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Payment Methods Config */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider flex items-center gap-1.5">
          <CreditCard size={14} className="text-[#3a9898]" /> Allowed Payment
          Modes at Billing Counter
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: "cash", label: "Cash" },
            { id: "upi", label: "UPI / GPay / PhonePe" },
            { id: "card", label: "Credit/Debit Card" },
            { id: "insurance", label: "Insurance / TPA Claim" },
          ].map((mode) => {
            const isChecked = (billing.paymentModes as any)[mode.id];
            return (
              <label
                key={mode.id}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isChecked
                    ? "border-[#3a9898] bg-[#eaf6f5] text-[#1a2632]"
                    : "border-[#e2e8ed] bg-[#f8fafb] text-[#8b9bae]"
                }`}
              >
                <span className="text-xs font-bold">{mode.label}</span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) =>
                    setBilling({
                      ...billing,
                      paymentModes: {
                        ...billing.paymentModes,
                        [mode.id]: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 accent-[#3a9898]"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Prescription Print Customization */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider flex items-center gap-1.5">
          <FileCheck2 size={14} className="text-[#3a9898]" /> Prescription
          Header & Print Layout
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f8fafb] border border-[#e8edf2]">
            <div>
              <span className="text-xs font-bold text-[#1a2632] block">
                Print Hospital Header Logo
              </span>
              <span className="text-[11px] text-[#8b9bae]">
                Display uploaded logo on printable doctor prescriptions
              </span>
            </div>
            <input
              type="checkbox"
              checked={billing.showClinicLogoOnRx}
              onChange={(e) =>
                setBilling({ ...billing, showClinicLogoOnRx: e.target.checked })
              }
              className="w-4 h-4 accent-[#3a9898]"
            />
          </div>

          <div>
            <label className={labelCls}>
              Prescription Footer Advice / Note
            </label>
            <textarea
              rows={3}
              className={`${inputCls} resize-none`}
              value={billing.rxFooterNote}
              onChange={(e) =>
                setBilling({ ...billing, rxFooterNote: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Save Action */}
      <div className="flex items-center justify-between pt-2">
        {saved ? (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
            <CheckCircle2 size={16} /> Billing & Print templates saved!
          </span>
        ) : (
          <span />
        )}
        <button
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
          }}
          className="px-6 py-2.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
        >
          Save Billing Config
        </button>
      </div>
    </div>
  );
}

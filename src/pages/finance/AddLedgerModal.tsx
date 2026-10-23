import { useState, FormEvent, ChangeEvent } from "react";
import { X, BookOpen, CheckCircle2, Loader2, IndianRupee } from "lucide-react";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

interface Props {
  onClose: () => void;
  onSuccess?: (newEntry: any) => void;
}

export default function AddLedgerModal({ onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    particulars: "",
    voucherType: "Receipt" as "Receipt" | "Payment" | "Journal" | "Contra",
    amount: "",
    entryType: "debit" as "debit" | "credit",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.particulars || !formData.amount) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const numAmount = Number(formData.amount);
    const debitVal = formData.entryType === "debit" ? numAmount : 0;
    const creditVal = formData.entryType === "credit" ? numAmount : 0;

    try {
      const res = await apiFetch(API_ENDPOINTS.hospitalFinanceLedger, {
        method: "POST",
        body: JSON.stringify({
          date: formData.date,
          particulars: formData.particulars,
          voucherType: formData.voucherType,
          debit: debitVal,
          credit: creditVal,
        }),
      });

      const data = typeof res?.json === "function" ? await res.json() : res;

      if (data?.success || res?.ok) {
        if (onSuccess) {
          onSuccess(data?.data || {
            id: `LED-${Math.floor(10 + Math.random() * 90)}`,
            date: formData.date,
            particulars: formData.particulars,
            voucherType: formData.voucherType,
            debit: debitVal,
            credit: creditVal,
          });
        }
        onClose();
      } else {
        setError(data?.message || "Failed to record journal entry.");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to record journal entry.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all placeholder:text-[#b0bec8]";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";
  const reqStar = <span className="text-red-500 ml-0.5">*</span>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 font-sans animate-in fade-in duration-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-[650px] max-h-[92vh] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed] overflow-hidden"
      >
        {/* Header */}
        <div className="px-7 py-5 flex items-start justify-between shrink-0 border-b border-[#f0f4f5] bg-white">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#eaf6f5] flex items-center justify-center shrink-0">
              <BookOpen size={18} className="text-[#3a9898]" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-[#1a2632]">
                Add Journal Entry
              </h2>
              <p className="text-[12px] text-[#8b9bae] mt-0.5">
                Record new financial transaction into General Ledger.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae] hover:text-[#1a2632] transition-colors shrink-0 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-4 bg-white">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] p-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Voucher Type{reqStar}</label>
              <select
                name="voucherType"
                value={formData.voucherType}
                onChange={handleInputChange}
                className={inputCls}
              >
                <option value="Receipt">Receipt</option>
                <option value="Payment">Payment</option>
                <option value="Journal">Journal</option>
                <option value="Contra">Contra</option>
              </select>
            </div>

            <div>
              <label className={labelCls}>Transaction Date{reqStar}</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={inputCls}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Entry Nature{reqStar}</label>
              <select
                name="entryType"
                value={formData.entryType}
                onChange={handleInputChange}
                className={inputCls}
              >
                <option value="debit">Debit (Inflow / Asset)</option>
                <option value="credit">Credit (Outflow / Expense)</option>
              </select>
            </div>

            <div>
              <label className={labelCls}>Amount (₹){reqStar}</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className={`${inputCls} pl-8`}
                  required
                />
                <IndianRupee
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className={labelCls}>
              Particulars / Description{reqStar}
            </label>
            <textarea
              name="particulars"
              rows={3}
              value={formData.particulars}
              onChange={handleInputChange}
              placeholder="Enter ledger entry description..."
              className="w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all resize-none placeholder:text-[#b0bec8]"
              required
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 py-4 border-t border-[#f0f4f5] flex items-center justify-between shrink-0 bg-[#f8fafb] rounded-b-[20px]">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-[12.5px] font-semibold text-[#8b9bae] hover:text-[#e11d48] transition-colors px-4 py-2.5 rounded-xl hover:bg-red-50 disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#3a9898]/20 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <CheckCircle2 size={15} />
            )}
            {loading ? "Saving Entry..." : "Save Ledger Entry"}
          </button>
        </div>
      </form>
    </div>
  );
}

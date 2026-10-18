import { useState, FormEvent, ChangeEvent } from "react";
import { X, Receipt, CheckCircle2, Loader2, IndianRupee } from "lucide-react";

interface Props {
  onClose: () => void;
  onSuccess?: (newExpense: any) => void;
}

export default function AddExpenseModal({ onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    expenseNo: `EXP-2026-${Math.floor(100 + Math.random() * 900)}`,
    date: new Date().toISOString().split("T")[0],
    category: "Premise Rent",
    description: "",
    vendor: "",
    amount: "",
    method: "Bank Transfer",
    status: "Disbursed",
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

    if (!formData.vendor || !formData.amount || !formData.description) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      // API call simulation or actual fetch
      // await apiFetch('/expenses', { method: 'POST', body: JSON.stringify(formData) });

      setTimeout(() => {
        if (onSuccess) {
          onSuccess({
            ...formData,
            id: String(Date.now()),
            amount: Number(formData.amount),
          });
        }
        setLoading(false);
        onClose();
      }, 500);
    } catch (err: any) {
      setError(err?.message || "Failed to add expense record.");
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
        {/* ── Header ── */}
        <div className="px-7 py-5 flex items-start justify-between shrink-0 border-b border-[#f0f4f5] bg-white">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#eaf6f5] flex items-center justify-center shrink-0">
              <Receipt size={18} className="text-[#3a9898]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-[16px] font-bold text-[#1a2632]">
                  Add New Expense
                </h2>
                <span className="text-[10.5px] font-bold bg-[#eaf6f5] text-[#3a9898] border border-[#c4e4e0] px-2.5 py-1 rounded-full">
                  {formData.expenseNo}
                </span>
              </div>
              <p className="text-[12px] text-[#8b9bae] mt-0.5">
                Record clinic operating and office expenditure details.
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

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-4 bg-white">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] p-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Expense Category{reqStar}</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={inputCls}
              >
                <option value="Premise Rent">Premise Rent</option>
                <option value="Medical Supplies">Medical Supplies</option>
                <option value="Utilities">Utilities (Electricity/Water)</option>
                <option value="Staff Salaries">Staff Salaries</option>
                <option value="Maintenance">Equipment Maintenance</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>

            <div>
              <label className={labelCls}>Expense Date{reqStar}</label>
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
              <label className={labelCls}>Vendor / Payee Name{reqStar}</label>
              <input
                type="text"
                name="vendor"
                value={formData.vendor}
                onChange={handleInputChange}
                placeholder="e.g. Apollo Surgical Supplies"
                className={inputCls}
                required
              />
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Payment Method</label>
              <select
                name="method"
                value={formData.method}
                onChange={handleInputChange}
                className={inputCls}
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Card">Credit / Debit Card</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI / Online</option>
              </select>
            </div>

            <div>
              <label className={labelCls}>Payment Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={inputCls}
              >
                <option value="Disbursed">Disbursed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Description / Notes{reqStar}</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter brief description about the expense..."
              className="w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all resize-none placeholder:text-[#b0bec8]"
              required
            />
          </div>
        </div>

        {/* ── Sticky Footer ── */}
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
            {loading ? "Saving Expense..." : "Save Expense"}
          </button>
        </div>
      </form>
    </div>
  );
}

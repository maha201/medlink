import React, { useState, useEffect } from "react";
import {
  X,
  RotateCcw,
  Receipt,
  Package,
  FileText,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { apiFetch } from "@/lib/api/api";

const returnReasons = [
  { id: "defective", label: "Defective / Damaged Product" },
  { id: "wrong_item", label: "Wrong Item Delivered" },
  { id: "customer_dissatisfied", label: "Customer Dissatisfied" },
  { id: "size_fit_issue", label: "Size / Fit Issue" },
  { id: "other", label: "Other" },
];

export interface ReturnItemData {
  id?: string;
  invoiceNo: string;
  customerName: string;
  mobile: string;
  returnReason: string;
  returnedItems: string;
  refundAmount: number;
  remarks: string;
}

interface Props {
  isOpen?: boolean;
  initialData?: ReturnItemData | null;
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function ProcessReturnModal({
  isOpen = true,
  initialData = null,
  onClose = () => {},
  onSuccess = () => {},
}: Props) {
  const [returnReason, setReturnReason] = useState("defective");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ReturnItemData, "id">>({
    invoiceNo: "",
    customerName: "",
    mobile: "",
    returnReason: "defective",
    returnedItems: "",
    refundAmount: 0,
    remarks: "",
  });

  // Populate data if Editing, or reset if Adding new
  useEffect(() => {
    if (initialData?.id) {
      setFormData({
        invoiceNo: initialData.invoiceNo || "",
        customerName: initialData.customerName || "",
        mobile: initialData.mobile || "",
        returnReason: initialData.returnReason || "defective",
        returnedItems: initialData.returnedItems || "",
        refundAmount: initialData.refundAmount || 0,
        remarks: initialData.remarks || "",
      });
      setReturnReason(initialData.returnReason || "defective");
    } else {
      setFormData({
        invoiceNo: "",
        customerName: "",
        mobile: "",
        returnReason: "defective",
        returnedItems: "",
        refundAmount: 0,
        remarks: "",
      });
      setReturnReason("defective");
    }
    setErrorMessage(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const isEdit = Boolean(initialData?.id);
    const endpoint = isEdit
      ? `/api/pos/returns/${initialData?.id}`
      : `/api/pos/returns`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const payload = {
        ...formData,
        returnReason,
      };

      const response = await apiFetch(endpoint, {
        method,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          (errorData as any).message ||
            `Failed to ${isEdit ? "update" : "process"} return request.`,
        );
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMessage(
        err.message || "Something went wrong while processing return.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all placeholder:text-[#b0bec8]";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";
  const reqStar = <span className="text-red-500 ml-0.5">*</span>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-[900px] max-h-[92vh] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed] animate-in fade-in duration-200">
        {/* ── Header ── */}
        <div className="px-7 py-5 flex items-start justify-between shrink-0 border-b border-[#f0f4f5]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#eaf6f5] flex items-center justify-center shrink-0">
              <RotateCcw size={18} className="text-[#3a9898]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-[16px] font-bold text-[#1a2632]">
                  {initialData?.id
                    ? "Edit Return Record"
                    : "Process New Return"}
                </h2>
                <span className="text-[10.5px] font-bold bg-[#eaf6f5] text-[#3a9898] border border-[#c4e4e0] px-2.5 py-1 rounded-full">
                  {initialData?.id ? `ID: ${initialData.id}` : "New Return"}
                </span>
              </div>
              <p className="text-[12px] text-[#8b9bae] mt-0.5">
                {initialData?.id
                  ? "Update existing sales return and refund tracking details."
                  : "Enter original invoice credentials and item details to process refund or exchange."}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae] hover:text-[#1a2632] transition-colors shrink-0 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <form
          id="return-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-7 py-5 space-y-5"
        >
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-semibold">
              <AlertCircle size={16} />
              {errorMessage}
            </div>
          )}

          {/* Section 1: Invoice & Customer Info */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-[#eaf6f5] flex items-center justify-center">
                <Receipt size={13} className="text-[#3a9898]" />
              </div>
              <h3 className="text-[13px] font-bold text-[#1a2632]">
                1. Invoice & Customer Details
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Invoice Number{reqStar}</label>
                <input
                  required
                  className={inputCls}
                  placeholder="e.g. INV-2026-089"
                  value={formData.invoiceNo}
                  onChange={(e) =>
                    setFormData({ ...formData, invoiceNo: e.target.value })
                  }
                />
              </div>

              <div>
                <label className={labelCls}>Customer Full Name{reqStar}</label>
                <input
                  required
                  className={inputCls}
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className={labelCls}>Mobile Number{reqStar}</label>
                <input
                  required
                  className={inputCls}
                  placeholder="+91 98450 23145"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Section 2: Return Reason & Categories */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-[#eaf6f5] flex items-center justify-center">
                <Package size={13} className="text-[#3a9898]" />
              </div>
              <h3 className="text-[13px] font-bold text-[#1a2632]">
                2. Return Reason & Category
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelCls}>
                  Select Return Reason{reqStar}
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {returnReasons.map((t) => {
                    const active = returnReason === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setReturnReason(t.id)}
                        className={`px-3 py-2 rounded-[9px] border text-xs font-semibold transition-all text-center cursor-pointer ${
                          active
                            ? "border-[#3a9898] bg-[#eaf6f5] text-[#3a9898]"
                            : "border-[#e2e8ed] bg-[#f8fafb] text-[#5a6a76] hover:border-[#c4d4dc]"
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className={labelCls}>
                  Returned Items Description / SKU{reqStar}
                </label>
                <input
                  required
                  className={inputCls}
                  placeholder="e.g. Organic Multivitamin 60tabs (SKU: MED-992)"
                  value={formData.returnedItems}
                  onChange={(e) =>
                    setFormData({ ...formData, returnedItems: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Section 3: Refund Amount & Remarks */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-[#eaf6f5] flex items-center justify-center">
                <FileText size={13} className="text-[#3a9898]" />
              </div>
              <h3 className="text-[13px] font-bold text-[#1a2632]">
                3. Refund Calculation & Remarks
              </h3>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className={labelCls}>Refund Amount (₹){reqStar}</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  className={inputCls}
                  placeholder="0.00"
                  value={formData.refundAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      refundAmount: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <label className={labelCls}>Inspection Notes & Remarks</label>
                <textarea
                  rows={2}
                  className={`${inputCls} resize-none`}
                  placeholder="Enter product inspection results, refund method (Cash/UPI/Credit)..."
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </form>

        {/* ── Sticky Footer ── */}
        <div className="px-7 py-4 border-t border-[#f0f4f5] flex items-center justify-between shrink-0 bg-white rounded-b-[20px]">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            className="text-[12.5px] font-semibold text-[#8b9bae] hover:text-[#e11d48] transition-colors px-4 py-2.5 rounded-xl hover:bg-red-50 disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              form="return-form"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#3a9898]/20 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <CheckCircle2 size={15} />
              )}
              {isSubmitting
                ? "Processing..."
                : initialData?.id
                  ? "Update Return Record"
                  : "Complete & Process Return"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  X,
  Package,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Barcode,
  Tag,
  DollarSign,
  Layers,
} from "lucide-react";

export interface ProductData {
  id?: string;
  name: string;
  code: string;
  category: string;
  brand: string;
  unit: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  alertQuantity: number;
}

interface Props {
  isOpen?: boolean;
  initialData?: ProductData | null;
  onClose?: () => void;
  onSuccess?: (product: ProductData) => void;
}

export default function ProductModal({
  isOpen = true,
  initialData = null,
  onClose = () => {},
  onSuccess = () => {},
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ProductData, "id">>({
    name: "",
    code: "",
    category: "Tablets",
    brand: "",
    unit: "Strip",
    costPrice: 0,
    salePrice: 0,
    stock: 0,
    alertQuantity: 10,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        code: initialData.code || "",
        category: initialData.category || "Tablets",
        brand: initialData.brand || "",
        unit: initialData.unit || "Strip",
        costPrice: initialData.costPrice || 0,
        salePrice: initialData.salePrice || 0,
        stock: initialData.stock || 0,
        alertQuantity: initialData.alertQuantity || 10,
      });
    } else {
      setFormData({
        name: "",
        code: `MED-${Math.floor(100 + Math.random() * 900)}`,
        category: "Tablets",
        brand: "",
        unit: "Strip",
        costPrice: 0,
        salePrice: 0,
        stock: 0,
        alertQuantity: 10,
      });
    }
    setErrorMessage(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      const savedProduct: ProductData = {
        id: initialData?.id || String(Date.now()),
        ...formData,
      };

      onSuccess(savedProduct);
      onClose();
    } catch (err: any) {
      setErrorMessage(
        err.message || "Something went wrong while saving product.",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 font-sans">
      <div className="bg-white w-full max-w-[900px] max-h-[92vh] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed] animate-in fade-in duration-200">
        {/* Header */}
        <div className="px-7 py-5 flex items-start justify-between shrink-0 border-b border-[#f0f4f5]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#eaf6f5] flex items-center justify-center shrink-0">
              <Package size={18} className="text-[#3a9898]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-[16px] font-bold text-[#1a2632]">
                  {initialData?.id ? "Edit Product Details" : "Add New Product"}
                </h2>
                <span className="text-[10.5px] font-bold bg-[#eaf6f5] text-[#3a9898] border border-[#c4e4e0] px-2.5 py-1 rounded-full">
                  {initialData?.id ? `ID: ${initialData.id}` : "New Item"}
                </span>
              </div>
              <p className="text-[12px] text-[#8b9bae] mt-0.5">
                Configure inventory pricing, stock levels, and categorization.
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

        {/* Form Body */}
        <form
          id="product-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-7 py-5 space-y-5"
        >
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-semibold">
              <AlertCircle size={16} />
              {errorMessage}
            </div>
          )}

          {/* Section 1: Basic Info */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-[#eaf6f5] flex items-center justify-center">
                <Tag size={13} className="text-[#3a9898]" />
              </div>
              <h3 className="text-[13px] font-bold text-[#1a2632]">
                1. Product Identification
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Product Name{reqStar}</label>
                <input
                  required
                  className={inputCls}
                  placeholder="e.g. Paracetamol 650mg"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className={labelCls}>Code / Barcode{reqStar}</label>
                <input
                  required
                  className={inputCls}
                  placeholder="e.g. MED-001"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                />
              </div>

              <div>
                <label className={labelCls}>Category{reqStar}</label>
                <select
                  className={inputCls}
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="Tablets">Tablets</option>
                  <option value="Capsules">Capsules</option>
                  <option value="Syrups">Syrups</option>
                  <option value="Equipments">Equipments</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>
                  Brand / Manufacturer{reqStar}
                </label>
                <input
                  required
                  className={inputCls}
                  placeholder="e.g. Sun Pharma"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Units */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-[#eaf6f5] flex items-center justify-center">
                <DollarSign size={13} className="text-[#3a9898]" />
              </div>
              <h3 className="text-[13px] font-bold text-[#1a2632]">
                2. Pricing & Packaging Unit
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Cost Price (₹){reqStar}</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  className={inputCls}
                  value={formData.costPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      costPrice: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <label className={labelCls}>Sale Price (₹){reqStar}</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  className={inputCls}
                  value={formData.salePrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salePrice: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <label className={labelCls}>Unit Type{reqStar}</label>
                <select
                  className={inputCls}
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                >
                  <option value="Strip">Strip</option>
                  <option value="Bottle">Bottle</option>
                  <option value="Piece">Piece</option>
                  <option value="Box">Box</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Stock Levels */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-[#eaf6f5] flex items-center justify-center">
                <Layers size={13} className="text-[#3a9898]" />
              </div>
              <h3 className="text-[13px] font-bold text-[#1a2632]">
                3. Stock & Low Alert Limits
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>
                  Initial Stock Quantity{reqStar}
                </label>
                <input
                  required
                  type="number"
                  className={inputCls}
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: Number(e.target.value) })
                  }
                />
              </div>

              <div>
                <label className={labelCls}>
                  Low Stock Alert Quantity{reqStar}
                </label>
                <input
                  required
                  type="number"
                  className={inputCls}
                  value={formData.alertQuantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      alertQuantity: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-7 py-4 border-t border-[#f0f4f5] flex items-center justify-between shrink-0 bg-white rounded-b-[20px]">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            className="text-[12.5px] font-semibold text-[#8b9bae] hover:text-[#e11d48] transition-colors px-4 py-2.5 rounded-xl hover:bg-red-50 disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="product-form"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#3a9898]/20 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <CheckCircle2 size={15} />
            )}
            {isSubmitting
              ? "Saving..."
              : initialData?.id
                ? "Update Product"
                : "Save & Register Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

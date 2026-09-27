import { useState, useEffect } from "react";
import { X, Save, ClipboardList, Loader2 } from "lucide-react";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api"; // Path check pannikkonga

export interface MasterTreatmentPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  consultations: number;
  durationDays: number;
  isActive: boolean;
}

interface TreatmentPlanModalProps {
  isOpen: boolean;
  initialData?: MasterTreatmentPlan | null;
  onClose: () => void;
  onSuccess: () => void; // Save aana pinnaadi list refresh panna
}

export default function TreatmentPlanModal({
  isOpen,
  initialData,
  onClose,
  onSuccess,
}: TreatmentPlanModalProps) {
  const [formData, setFormData] = useState<Partial<MasterTreatmentPlan>>({
    name: "",
    description: "",
    price: 0,
    consultations: 1,
    durationDays: 1,
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        consultations: 1,
        durationDays: 1,
        isActive: true,
      });
    }
    setError(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const isEdit = Boolean(initialData?.id);

    // Dynamic endpoint setting for Create vs Update
    const endpoint = isEdit
      ? API_ENDPOINTS.hospitalTreatmentPlanById.replace(
          "{id}",
          initialData!.id!,
        )
      : API_ENDPOINTS.hospitalTreatmentPlans;

    const method = isEdit ? "PUT" : "POST";

    try {
      const response = await apiFetch(endpoint, {
        method,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Failed to ${isEdit ? "update" : "create"} treatment plan.`,
        );
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-[#dde5e7] shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#dde5e7] flex items-center justify-between bg-[#f8fafb]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#eaf6f5] flex items-center justify-center text-[#3a9898]">
              <ClipboardList size={18} />
            </div>
            <h3 className="text-lg font-bold text-[#1a2632]">
              {initialData ? "Edit Treatment Plan" : "New Treatment Plan"}
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1 rounded-lg text-[#8b9bae] hover:text-[#1a2632] hover:bg-[#eef3f5] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-3 text-xs bg-rose-50 text-rose-600 rounded-xl border border-rose-200">
            {error}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Plan Name */}
          <div>
            <label className="block text-xs font-semibold text-[#5a6a76] mb-1">
              Plan Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. General Dental Checkup"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-[#dde5e7] rounded-xl text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898] transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-[#5a6a76] mb-1">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Brief summary of what this plan offers..."
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-[#dde5e7] rounded-xl text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898] transition-all resize-none"
            />
          </div>

          {/* Price, Visits, Duration Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#5a6a76] mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                min="0"
                value={formData.price ?? 0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-[#dde5e7] rounded-xl text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a6a76] mb-1">
                Visits / Quota
              </label>
              <input
                type="number"
                min="1"
                value={formData.consultations ?? 1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    consultations: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-[#dde5e7] rounded-xl text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a6a76] mb-1">
                Duration (Days)
              </label>
              <input
                type="number"
                min="1"
                value={formData.durationDays ?? 1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    durationDays: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-[#dde5e7] rounded-xl text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898] transition-all"
              />
            </div>
          </div>

          {/* Status Toggle */}
          <div className="pt-2">
            <label className="flex items-center justify-between p-3 border border-[#dde5e7] rounded-xl bg-[#f8fafb] cursor-pointer">
              <span className="text-xs font-bold text-[#1a2632]">
                Active Status
              </span>
              <input
                type="checkbox"
                checked={formData.isActive ?? true}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-4 h-4 accent-[#3a9898] rounded cursor-pointer"
              />
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#dde5e7] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-xl border border-[#dde5e7] text-xs font-bold text-[#5a6a76] hover:bg-[#f0f4f5] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-[#3a9898]/20 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Save size={14} />
              )}
              {initialData ? "Save Plan" : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

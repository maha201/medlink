import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  ArrowUpDown,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import TreatmentPlanModal, { MasterTreatmentPlan } from "./TreatmentPlanModal";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

export default function TreatmentPlanList() {
  const [plans, setPlans] = useState<MasterTreatmentPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "inactive">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<MasterTreatmentPlan | null>(
    null,
  );

  // Fetch Treatment Plans from API
  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(API_ENDPOINTS.hospitalTreatmentPlans);
      if (!response.ok) {
        throw new Error("Failed to fetch treatment plans");
      }

      const resData = await response.json();
      const rawPlans = Array.isArray(resData) ? resData : (resData?.data ?? []);

      // Map backend response fields into MasterTreatmentPlan structure
      const mappedPlans: MasterTreatmentPlan[] = rawPlans.map((item: any) => ({
        id: String(item.id),
        name: item.name || "",
        description: item.description || "",
        price: Number(item.price) || 0,
        consultations: Number(item.consultations) || 1,
        durationDays: Number(item.duration_days ?? item.durationDays) || 1,
        isActive: Boolean(item.is_active ?? item.isActive ?? true),
      }));

      setPlans(mappedPlans);
    } catch (err: any) {
      setError(err.message || "Failed to load treatment plans.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  // Filter plans based on Search and Tabs
  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === "active") return plan.isActive;
    if (activeTab === "inactive") return !plan.isActive;
    return true;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredPlans.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const isAllSelected =
    filteredPlans.length > 0 &&
    filteredPlans.every((p) => selectedIds.includes(p.id));

  const handleOpenCreateModal = () => {
    setEditingPlan(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (plan: MasterTreatmentPlan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  // Delete Plan API Handler
  const handleDeletePlan = async (id: string) => {
    if (!confirm("Are you sure you want to delete this treatment plan?"))
      return;

    try {
      const endpoint = API_ENDPOINTS.hospitalTreatmentPlanById.replace(
        "{id}",
        id,
      );
      const response = await apiFetch(endpoint, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete treatment plan");
      }

      setPlans((prev) => prev.filter((p) => p.id !== id));
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    } catch (err: any) {
      alert(err.message || "Error deleting treatment plan.");
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      {isModalOpen && (
        <TreatmentPlanModal
          isOpen={isModalOpen}
          initialData={editingPlan}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchPlans}
        />
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-col lg:flex-row gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1a2632]">
              Treatment Plans Setup
            </h2>
          </div>

          <div className="flex items-center gap-3 flex-wrap w-full lg:w-auto justify-between lg:justify-end">
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]"
              />
              <input
                type="text"
                placeholder="Search plan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-[#f0f4f5] border border-transparent focus:border-[#c4e4e0] focus:bg-white text-xs font-medium rounded-full text-[#1a2632] outline-none transition-all w-48 focus:w-60"
              />
            </div>

            <div className="bg-[#f0f4f5] p-1 rounded-full flex items-center gap-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  activeTab === "all"
                    ? "bg-white text-[#3a9898] shadow-sm"
                    : "text-[#5a6a76] hover:text-[#1a2632]"
                }`}
              >
                All ({plans.length})
              </button>
              <button
                onClick={() => setActiveTab("active")}
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  activeTab === "active"
                    ? "bg-white text-[#3a9898] shadow-sm"
                    : "text-[#5a6a76] hover:text-[#1a2632]"
                }`}
              >
                Active ({plans.filter((p) => p.isActive).length})
              </button>
            </div>

            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 px-4 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-[#3a9898]/20"
            >
              <Plus size={15} strokeWidth={2.5} />
              New Treatment Plan
            </button>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 bg-rose-50 border-b border-rose-200 text-xs text-rose-600 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={fetchPlans}
              className="underline font-bold text-rose-700 hover:text-rose-900"
            >
              Retry
            </button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafb] border-b border-[#dde5e7]">
                <th className="py-4 pl-6 pr-4 w-12">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={isAllSelected}
                    className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-white cursor-pointer accent-[#3a9898]"
                  />
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae]">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Plan Name & Description <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae]">
                  Price
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae]">
                  Visits Included
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae]">
                  Duration
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] text-center">
                  Status
                </th>
                <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eef3f5]">
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-xs text-[#8b9bae]"
                  >
                    <div className="flex items-center justify-center gap-2 text-[#3a9898] font-semibold">
                      <Loader2 size={18} className="animate-spin" /> Loading
                      treatment plans...
                    </div>
                  </td>
                </tr>
              ) : filteredPlans.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-8 text-center text-xs text-[#8b9bae]"
                  >
                    No treatment plans found.
                  </td>
                </tr>
              ) : (
                filteredPlans.map((row) => {
                  const isSelected = selectedIds.includes(row.id);
                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-[#f8fafb] transition-colors"
                    >
                      <td className="py-4 pl-6 pr-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(row.id)}
                          className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-white cursor-pointer accent-[#3a9898]"
                        />
                      </td>

                      <td className="py-4 px-4">
                        <div className="text-sm font-bold text-[#1a2632]">
                          {row.name}
                        </div>
                        <div className="text-xs text-[#8b9bae]">
                          {row.description || "No description"}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-xs font-bold text-[#3a9898]">
                        ₹{row.price.toLocaleString("en-IN")}
                      </td>

                      <td className="py-4 px-4 text-xs font-semibold text-[#1a2632]">
                        {row.consultations} Visit(s)
                      </td>

                      <td className="py-4 px-4 text-xs font-semibold text-[#5a6a76]">
                        {row.durationDays} Day(s)
                      </td>

                      <td className="py-4 px-4 text-center">
                        {row.isActive ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-200">
                            <CheckCircle2 size={12} /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold border border-slate-200">
                            <XCircle size={12} /> Inactive
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEditModal(row)}
                            className="p-1.5 text-[#5a6a76] hover:text-[#3a9898] hover:bg-[#eaf6f5] rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeletePlan(row.id)}
                            className="p-1.5 text-[#5a6a76] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#dde5e7] flex items-center justify-between text-xs text-[#5a6a76]">
          <div>
            Showing 1 to {filteredPlans.length} of {plans.length} entries
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded bg-[#3a9898] text-white font-medium">
              1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

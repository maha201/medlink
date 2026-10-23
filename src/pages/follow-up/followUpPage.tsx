import { useState, useEffect, useCallback } from "react";
import {
  ArrowUpDown,
  MessageSquare,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  Check,
  Loader2,
  RefreshCw,
} from "lucide-react";
import AddFollowUpModal from "./AddFollowUpModal";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

export interface FollowUpRecord {
  id: string;
  name: string;
  patientId: string;
  reason: string;
  doctor: string;
  specialty: string;
  followUpDate: string;
  location: string;
  status: "Missed" | "Due Soon" | "Completed";
  notes?: string;
}

export default function FollowUpPage() {
  const [records, setRecords] = useState<FollowUpRecord[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "due" | "missed">("all");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tabCounts, setTabCounts] = useState({
    allCount: 0,
    dueSoonCount: 0,
    missedCount: 0,
  });

  const fetchFollowUps = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch(
        `${API_ENDPOINTS.hospitalFollowUps}?tab=${activeTab}&limit=50`,
        { method: "GET" },
      );
      const data = typeof res?.json === "function" ? await res.json() : res;

      if (data?.data) {
        setRecords(data.data);
      } else if (Array.isArray(data)) {
        setRecords(data);
      }

      if (data?.meta) {
        setTabCounts({
          allCount: data.meta.allCount ?? 0,
          dueSoonCount: data.meta.dueSoonCount ?? 0,
          missedCount: data.meta.missedCount ?? 0,
        });
      }
    } catch (err) {
      console.error("Error fetching follow-ups:", err);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchFollowUps();
  }, [fetchFollowUps]);

  const handleAddFollowUp = async (data: any) => {
    try {
      await apiFetch(API_ENDPOINTS.hospitalFollowUps, {
        method: "POST",
        body: JSON.stringify(data),
      });
      setShowModal(false);
      fetchFollowUps();
    } catch (err) {
      console.error("Failed to add follow up:", err);
    }
  };

  const handleMarkCompleted = async (id: string) => {
    try {
      await apiFetch(`${API_ENDPOINTS.hospitalFollowUps}/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: "Completed" }),
      });
      fetchFollowUps();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Fixed to use `records` instead of `filteredRecords`
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(records.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Fixed to use `records` instead of `filteredRecords`
  const isAllSelected =
    records.length > 0 && records.every((r) => selectedIds.includes(r.id));

  return (
    <div className="animate-in fade-in duration-500 font-sans p-2">
      {showModal && (
        <AddFollowUpModal
          onClose={() => setShowModal(false)}
          onAddFollowUp={handleAddFollowUp}
        />
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header Bar */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-col lg:flex-row gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#3a9898]">Follow-ups</h2>
            <button
              onClick={fetchFollowUps}
              disabled={loading}
              className="p-1.5 text-[#8b9bae] hover:text-[#3a9898] hover:bg-[#eaf6f5] rounded-lg transition-colors cursor-pointer"
              title="Refresh"
            >
              <RefreshCw
                size={15}
                className={loading ? "animate-spin text-[#3a9898]" : ""}
              />
            </button>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Tab filter buttons */}
            <div className="bg-[#eaf6f5] p-1 rounded-full flex items-center gap-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-white text-[#3a9898] shadow-xs font-bold"
                    : "text-[#5a6a76] hover:text-[#1a2632]"
                }`}
              >
                All ({tabCounts.allCount})
              </button>
              <button
                onClick={() => setActiveTab("due")}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "due"
                    ? "bg-white text-[#3a9898] shadow-xs font-bold"
                    : "text-[#5a6a76] hover:text-[#1a2632]"
                }`}
              >
                Due Soon ({tabCounts.dueSoonCount})
              </button>
              <button
                onClick={() => setActiveTab("missed")}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "missed"
                    ? "bg-white text-[#3a9898] shadow-xs font-bold"
                    : "text-[#5a6a76] hover:text-[#1a2632]"
                }`}
              >
                Missed ({tabCounts.missedCount})
              </button>
            </div>
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f5f5] border-b border-[#e2e8ed]">
                <th className="py-3.5 pl-6 pr-4 w-12">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={isAllSelected}
                    className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-white cursor-pointer accent-[#3a9898]"
                  />
                </th>
                <th className="py-3.5 px-4 text-xs font-semibold text-[#5a6a76] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Name <ArrowUpDown size={12} className="text-[#8b9bae]" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-xs font-semibold text-[#5a6a76] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Reason for visit{" "}
                    <ArrowUpDown size={12} className="text-[#8b9bae]" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-xs font-semibold text-[#5a6a76] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Doctor <ArrowUpDown size={12} className="text-[#8b9bae]" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-xs font-semibold text-[#5a6a76] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Follow-up Date & Time{" "}
                    <ArrowUpDown size={12} className="text-[#8b9bae]" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-xs font-semibold text-[#5a6a76] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Location{" "}
                    <ArrowUpDown size={12} className="text-[#8b9bae]" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-xs font-semibold text-[#5a6a76] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Status <ArrowUpDown size={12} className="text-[#8b9bae]" />
                  </div>
                </th>
                <th className="py-3.5 px-6 text-xs font-semibold text-[#5a6a76] whitespace-nowrap text-left">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Action <ArrowUpDown size={12} className="text-[#8b9bae]" />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eef3f5]">
              {loading && records.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#8b9bae]">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2
                        size={18}
                        className="animate-spin text-[#3a9898]"
                      />
                      <span className="text-xs">
                        Loading follow-up records...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center text-[#8b9bae] text-xs"
                  >
                    No follow-up records found.
                  </td>
                </tr>
              ) : (
                records.map((row) => {
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

                      {/* Name & Patient ID */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#c8d8dc] shrink-0 flex items-center justify-center text-white text-xs font-bold">
                            {row.name ? row.name.charAt(0) : "P"}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#1a2632]">
                              {row.name}
                            </div>
                            <div className="text-[11px] text-[#8b9bae]">
                              #{row.patientId}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Reason for visit */}
                      <td className="py-4 px-4 text-xs font-semibold text-[#3a9898]">
                        {row.reason}
                      </td>

                      {/* Doctor */}
                      <td className="py-4 px-4">
                        <div className="text-xs font-bold text-[#1a2632]">
                          {row.doctor}
                        </div>
                        <div className="text-[10.5px] text-[#8b9bae]">
                          {row.specialty}
                        </div>
                      </td>

                      {/* Follow-up Date & Time */}
                      <td className="py-4 px-4 text-xs text-[#1a2632] font-medium">
                        {row.followUpDate}
                      </td>

                      {/* Location */}
                      <td className="py-4 px-4 text-xs text-[#1a2632] font-medium">
                        {row.location}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4">
                        {row.status === "Completed" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-semibold border border-emerald-200">
                            <CheckCircle2 size={12} /> Completed
                          </span>
                        ) : row.status === "Missed" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f8fafc] text-[#718096] text-[11px] font-semibold border border-[#e2e8f0]">
                            <AlertCircle size={12} className="text-[#a0aec0]" />{" "}
                            Missed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eaf6f5] text-[#3a9898] text-[11px] font-semibold border border-[#c4e4e0]">
                            <CheckCircle2 size={12} /> Due Soon
                          </span>
                        )}
                      </td>

                      {/* Action Icons */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5">
                          <button
                            title="Message / Chat"
                            className="p-1.5 text-[#3a9898] bg-[#f0f4f5] border border-[#d2e3e3] rounded-md hover:bg-[#3a9898] hover:text-white transition-colors cursor-pointer"
                          >
                            <MessageSquare size={14} />
                          </button>
                          {row.status !== "Completed" && (
                            <button
                              onClick={() => handleMarkCompleted(row.id)}
                              title="Mark Completed"
                              className="p-1.5 text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"
                            >
                              <Check size={14} />
                            </button>
                          )}
                          <button
                            title="Patient Profile"
                            className="p-1.5 text-[#3a9898] bg-[#f0f4f5] border border-[#d2e3e3] rounded-md hover:bg-[#3a9898] hover:text-white transition-colors cursor-pointer"
                          >
                            <UserCheck size={14} />
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
      </div>
    </div>
  );
}

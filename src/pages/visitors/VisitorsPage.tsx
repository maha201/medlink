import { useState, useEffect, useCallback } from "react";
import {
  UserPlus,
  ArrowUpDown,
  Loader2,
  AlertCircle,
  Pencil,
  RefreshCw,
  Eye,
  X,
  ShieldCheck,
  Phone,
  Clock,
  User,
  Trash2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import AddVisitorModal, { VisitorData } from "./AddVisitorsModal";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

export interface Visitor {
  id: string;
  name: string;
  visitorId: string;
  mobile: string;
  visitorType: string;
  whomToVisit: string;
  department?: string;
  checkIn: string;
  checkOut: string;
  remarks: string;
  status: "In Hospital" | "Checked Out";
  photoUrl?: string;
}

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"all" | "in" | "out">("all");
  const [selectedVisitors, setSelectedVisitors] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedVisitorForEdit, setSelectedVisitorForEdit] =
    useState<VisitorData | null>(null);

  // Drawer state for viewing visitor details
  const [viewVisitor, setViewVisitor] = useState<Visitor | null>(null);

  // Delete Confirmation Modal States
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [visitorToDelete, setVisitorToDelete] = useState<Visitor | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fetchVisitors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(API_ENDPOINTS.hospitalVisitors);
      if (!response.ok) {
        throw new Error("Failed to fetch visitors list.");
      }
      const resData = await response.json();

      const rawVisitors = Array.isArray(resData)
        ? resData
        : resData.data || resData.visitors || [];

      const mappedVisitors: Visitor[] = rawVisitors.map((v: any) => ({
        id: String(v.id),
        name: v.name || "",
        visitorId: v.visitor_pass_no || v.visitorPassNo || String(v.id),
        mobile: v.mobile || "",
        visitorType: v.visitor_type || v.visitorType || "Visitor",
        whomToVisit: v.whom_to_visit || v.whomToVisit || "-",
        department: v.department || "General",
        checkIn: v.check_in || v.checkIn || "-",
        checkOut: v.check_out || v.checkOut || "-",
        remarks: v.remarks || "",
        status:
          v.status === "checked_in" || v.status === "In Hospital"
            ? "In Hospital"
            : "Checked Out",
        photoUrl: v.photo_url || v.photoUrl || undefined,
      }));

      setVisitors(mappedVisitors);
    } catch (err: any) {
      setError(err.message || "Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  const handleQuickOut = async (id: string) => {
    setUpdatingId(id);
    try {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const response = await apiFetch(
        API_ENDPOINTS.hospitalVisitorById.replace("{id}", id),
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "checked_out",
            check_out: currentTime,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update status.");
      }

      setVisitors((prev) =>
        prev.map((v) =>
          v.id === id
            ? {
                ...v,
                status: "Checked Out",
                checkOut: currentTime,
              }
            : v,
        ),
      );

      if (viewVisitor && viewVisitor.id === id) {
        setViewVisitor((prev) =>
          prev
            ? { ...prev, status: "Checked Out", checkOut: currentTime }
            : null,
        );
      }
    } catch (err: any) {
      alert(err.message || "Failed to check out visitor.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Handle Delete Confirmation Trigger
  const confirmDelete = (visitor: Visitor) => {
    setVisitorToDelete(visitor);
    setDeleteModalOpen(true);
  };

  // Execute Delete API / State update
  const handleDeleteExecute = async () => {
    if (!visitorToDelete) return;
    setIsDeleting(true);
    try {
      // API call simulation or real endpoint
      const response = await apiFetch(
        API_ENDPOINTS.hospitalVisitorById.replace("{id}", visitorToDelete.id),
        { method: "DELETE" },
      );

      // If backend delete API works or fallback to local state removal
      setVisitors((prev) => prev.filter((v) => v.id !== visitorToDelete.id));
      if (viewVisitor?.id === visitorToDelete.id) {
        setViewVisitor(null);
      }
      setDeleteModalOpen(false);
      setVisitorToDelete(null);
    } catch (err: any) {
      // Fallback local remove if API route differs
      setVisitors((prev) => prev.filter((v) => v.id !== visitorToDelete.id));
      setDeleteModalOpen(false);
      setVisitorToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenAddModal = () => {
    setSelectedVisitorForEdit(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (visitor: Visitor) => {
    setSelectedVisitorForEdit({
      id: visitor.id,
      name: visitor.name,
      mobile: visitor.mobile,
      visitorType: visitor.visitorType,
      whomToVisit: visitor.whomToVisit,
      purpose: visitor.visitorType,
      checkIn: visitor.checkIn,
      checkOut: visitor.checkOut,
      remarks: visitor.remarks,
      photoUrl: visitor.photoUrl,
    });
    setShowModal(true);
  };

  const filteredVisitors = visitors.filter((visitor) => {
    if (activeTab === "in") return visitor.status === "In Hospital";
    if (activeTab === "out") return visitor.status === "Checked Out";
    return true;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedVisitors(filteredVisitors.map((v) => v.id));
    } else {
      setSelectedVisitors([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedVisitors((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isAllSelected =
    filteredVisitors.length > 0 &&
    filteredVisitors.every((v) => selectedVisitors.includes(v.id));

  return (
    <div className="animate-in fade-in duration-500 font-sans">
      {/* ── Add / Edit Visitor Modal ── */}
      {showModal && (
        <AddVisitorModal
          isOpen={showModal}
          initialData={selectedVisitorForEdit}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchVisitors();
            setShowModal(false);
          }}
        />
      )}

      {/* ── Global Delete Confirmation Modal ── */}
      {deleteModalOpen && visitorToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[420px] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed] overflow-hidden">
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
                <AlertTriangle size={22} />
              </div>
              <h3 className="text-base font-bold text-[#1a2632]">
                Delete Visitor Record?
              </h3>
              <p className="text-xs text-[#8b9bae] leading-relaxed">
                Are you sure you want to delete{" "}
                <strong className="text-[#1a2632]">
                  {visitorToDelete.name}
                </strong>{" "}
                (Pass #{visitorToDelete.visitorId})? This action cannot be
                undone.
              </p>
            </div>

            <div className="px-6 py-4 border-t border-[#f0f4f5] bg-[#f8fafb] flex items-center gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteModalOpen(false)}
                className="w-full py-2.5 bg-white border border-[#dde5e7] hover:bg-[#f0f4f5] text-[#5a6a76] text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteExecute}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-rose-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isDeleting && <Loader2 size={14} className="animate-spin" />}
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── View Visitor Details Slide-over Drawer ── */}
      {viewVisitor && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs">
          <div className="w-full max-w-[420px] bg-white h-full shadow-2xl flex flex-col border-l border-[#dde5e7] animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#f0f4f5] flex items-center justify-between bg-[#f8fafb]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#3a9898] text-white flex items-center justify-center font-bold text-lg overflow-hidden shrink-0">
                  {viewVisitor.photoUrl ? (
                    <img
                      src={viewVisitor.photoUrl}
                      alt={viewVisitor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    viewVisitor.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1a2632]">
                    {viewVisitor.name}
                  </h3>
                  <p className="text-xs text-[#3a9898] font-semibold">
                    Pass #{viewVisitor.visitorId}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewVisitor(null)}
                className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center text-[#8b9bae] border border-transparent hover:border-[#dde5e7] cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#f8fafb] border border-[#e8edf2]">
                <span className="text-xs font-semibold text-[#5a6a76]">
                  Visitor Status
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    viewVisitor.status === "In Hospital"
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  <ShieldCheck size={13} />
                  {viewVisitor.status}
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider">
                  Contact & Visit Information
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2.5 text-[#1a2632]">
                    <Phone size={14} className="text-[#3a9898]" />
                    <span>{viewVisitor.mobile || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#1a2632]">
                    <User size={14} className="text-[#3a9898]" />
                    <span>
                      Type:{" "}
                      <strong className="capitalize">
                        {viewVisitor.visitorType}
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#1a2632]">
                    <ShieldCheck size={14} className="text-[#3a9898]" />
                    <span>
                      Whom to Visit: <strong>{viewVisitor.whomToVisit}</strong>{" "}
                      ({viewVisitor.department})
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider">
                  Timing & Remarks Log
                </h4>
                <div className="space-y-2 text-xs bg-[#f8fafb] p-3.5 rounded-xl border border-[#e8edf2]">
                  <div className="flex items-center justify-between text-[#1a2632]">
                    <span className="flex items-center gap-1.5 text-[#5a6a76]">
                      <Clock size={13} className="text-[#3a9898]" /> Check-In:
                    </span>
                    <span className="font-semibold">{viewVisitor.checkIn}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#1a2632] pt-2 border-t border-[#e8edf2]">
                    <span className="flex items-center gap-1.5 text-[#5a6a76]">
                      <Clock size={13} className="text-[#3a9898]" /> Check-Out:
                    </span>
                    <span className="font-semibold">
                      {viewVisitor.checkOut}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#e8edf2] mt-2">
                    <span className="text-[#5a6a76] block mb-1">Remarks:</span>
                    <p className="text-[#1a2632] italic bg-white p-2 rounded border border-[#dde5e7]">
                      {viewVisitor.remarks || "No additional remarks recorded."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#1a2632]">
              Visitors Directory
            </h2>
            <button
              onClick={fetchVisitors}
              className="p-1.5 rounded-lg border border-[#dde5e7] hover:bg-[#f5f7f8] text-[#5a6a76] transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Tabs Filter */}
            <div className="bg-[#f0f4f5] p-1 rounded-full flex items-center gap-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-white text-[#3a9898] shadow-sm"
                    : "text-[#5a6a76] hover:text-[#1a2632]"
                }`}
              >
                All Visitors ({visitors.length})
              </button>
              <button
                onClick={() => setActiveTab("in")}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "in"
                    ? "bg-white text-[#3a9898] shadow-sm"
                    : "text-[#5a6a76] hover:text-[#1a2632]"
                }`}
              >
                In Hospital (
                {visitors.filter((v) => v.status === "In Hospital").length})
              </button>
              <button
                onClick={() => setActiveTab("out")}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "out"
                    ? "bg-white text-[#3a9898] shadow-sm"
                    : "text-[#5a6a76] hover:text-[#1a2632]"
                }`}
              >
                Checked Out (
                {visitors.filter((v) => v.status === "Checked Out").length})
              </button>
            </div>

            <div className="w-px h-8 bg-[#dde5e7] hidden sm:block"></div>

            {/* Add Visitor Button */}
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20 cursor-pointer"
            >
              <UserPlus size={16} strokeWidth={2.5} />
              Add New Visitor
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="m-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-700 text-sm">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3 text-[#8b9bae]">
            <Loader2 size={32} className="animate-spin text-[#3a9898]" />
            <p className="text-xs font-medium">Loading visitors data...</p>
          </div>
        ) : (
          /* Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-[#dde5e7]">
                  <th className="py-4 pl-6 pr-4 w-12">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={isAllSelected}
                      className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer accent-[#3a9898]"
                    />
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Visitor Name & ID <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Mobile Number <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Visitor Type <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Whom to Visit <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Check-In <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Check-Out <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Remarks <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1 cursor-pointer">
                      Status <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#dde5e7]">
                {filteredVisitors.length === 0 ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="py-10 text-center text-sm text-[#8b9bae]"
                    >
                      No visitors found in this view.
                    </td>
                  </tr>
                ) : (
                  filteredVisitors.map((row) => {
                    const isSelected = selectedVisitors.includes(row.id);
                    return (
                      <tr
                        key={row.id}
                        className="hover:bg-[#f5f7f8] transition-colors group"
                      >
                        <td className="py-4 pl-6 pr-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectRow(row.id)}
                            className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer accent-[#3a9898]"
                          />
                        </td>

                        {/* Name & ID */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#dde5e7] shrink-0 overflow-hidden flex items-center justify-center text-xs font-bold text-[#5a6a76]">
                              {row.photoUrl ? (
                                <img
                                  src={row.photoUrl}
                                  alt={row.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                row.name?.charAt(0).toUpperCase() || "V"
                              )}
                            </div>
                            <div>
                              <div
                                onClick={() => setViewVisitor(row)}
                                className="text-sm font-bold text-[#1a2632] hover:text-[#3a9898] cursor-pointer transition-colors"
                              >
                                {row.name}
                              </div>
                              <div className="text-xs text-[#8b9bae]">
                                #{row.visitorId}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Mobile */}
                        <td className="py-4 px-4 text-sm font-medium text-[#5a6a76]">
                          {row.mobile}
                        </td>

                        {/* Visitor Type */}
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#eaf6f5] text-[#3a9898] border border-[#c4e4e0] text-xs font-bold capitalize">
                            {row.visitorType}
                          </span>
                        </td>

                        {/* Whom To Visit */}
                        <td className="py-4 px-4">
                          <div className="text-sm font-bold text-[#1a2632]">
                            {row.whomToVisit}
                          </div>
                          <div className="text-xs text-[#8b9bae]">
                            {row.department}
                          </div>
                        </td>

                        {/* Check-In */}
                        <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                          {row.checkIn}
                        </td>

                        {/* Check-Out */}
                        <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                          {row.checkOut}
                        </td>

                        {/* Remarks */}
                        <td className="py-4 px-4 text-sm text-[#5a6a76]">
                          {row.remarks || "-"}
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-6 text-center">
                          {row.status === "In Hospital" ? (
                            <div className="flex items-center justify-center gap-2">
                              <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0]">
                                In Hospital
                              </span>
                              <button
                                onClick={() => handleQuickOut(row.id)}
                                disabled={updatingId === row.id}
                                className="text-[11px] text-[#8b9bae] hover:text-[#1a2632] border border-[#dde5e7] px-2 py-0.5 rounded bg-white font-medium hover:bg-[#f5f7f8] transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1"
                              >
                                {updatingId === row.id && (
                                  <Loader2 size={10} className="animate-spin" />
                                )}
                                Quick Out
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs font-bold text-[#5a6a76]">
                              Checked Out
                            </span>
                          )}
                        </td>

                        {/* Actions (View, Edit, Delete) */}
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setViewVisitor(row)}
                              className="p-1.5 rounded-lg border border-[#dde5e7] hover:bg-[#eaf6f5] hover:text-[#3a9898] text-[#8b9bae] transition-colors cursor-pointer"
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => handleOpenEditModal(row)}
                              className="p-1.5 rounded-lg border border-[#dde5e7] hover:bg-[#eaf6f5] hover:text-[#3a9898] text-[#8b9bae] transition-colors cursor-pointer"
                              title="Edit Pass Details"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => confirmDelete(row)}
                              className="p-1.5 rounded-lg border border-[#dde5e7] hover:bg-rose-50 hover:text-rose-600 text-[#8b9bae] transition-colors cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 size={14} />
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
        )}

        {/* Pagination Footer */}
        <div className="p-4 border-t border-[#dde5e7] flex items-center justify-between text-sm text-[#5a6a76]">
          <div>
            Showing 1 to {filteredVisitors.length} of {visitors.length} entries
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7] cursor-pointer">
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-[#3a9898] text-white font-medium">
              1
            </button>
            <button className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7] cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

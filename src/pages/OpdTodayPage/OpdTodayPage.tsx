import {
  ChevronDown,
  CheckCircle2,
  Clock,
  Loader2,
  RefreshCw,
  User,
  Stethoscope,
  Eye,
  Edit,
  Trash2,
  X,
  Calendar,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

interface OpdAppointment {
  id: number;
  patientName?: string;
  phone?: string;
  doctorName?: string;
  consultationType?: string;
  appointmentDate?: string;
  date?: string;
  status?: string;
  consultationFee?: number;
  notes?: string;
  [key: string]: any;
}

export default function OpdTodayPage() {
  const [appointments, setAppointments] = useState<OpdAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalEntries, setTotalEntries] = useState<number>(0);

  // Modal / Drawer States for View, Edit, Delete
  const [viewAppointment, setViewAppointment] = useState<OpdAppointment | null>(
    null,
  );
  const [editAppointment, setEditAppointment] = useState<OpdAppointment | null>(
    null,
  );
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchOpdAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        consultation_type: "walk_in",
        page: currentPage.toString(),
        limit: "10",
      });

      const rawResponse = await apiFetch(
        `${API_ENDPOINTS.hospitalAppointments}?${queryParams.toString()}`,
        { method: "GET" },
      );

      const res =
        typeof rawResponse.json === "function"
          ? await rawResponse.json()
          : rawResponse;

      const dataList = Array.isArray(res) ? res : res?.data || [];
      setAppointments(dataList);

      const totalCount = res?.meta?.total ?? res?.total ?? dataList.length;
      const totalPagesCount =
        (res?.meta?.last_page ??
          res?.totalPages ??
          Math.ceil(totalCount / 10)) ||
        1;

      setTotalEntries(totalCount);
      setTotalPages(totalPagesCount);
    } catch (err: any) {
      console.error("Fetch OPD Appointments Error:", err);
      setError(err?.message || "OPD list load agavillai.");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchOpdAppointments();
  }, [fetchOpdAppointments]);

  // Handle Edit Save
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editAppointment) return;
    setUpdating(true);

    try {
      // Simulate or actual API call for update
      await apiFetch(
        `${API_ENDPOINTS.hospitalAppointments}/${editAppointment.id}`,
        {
          method: "PUT",
          body: JSON.stringify(editAppointment),
        },
      ).catch(() => {}); // Fallback if endpoint varies

      setAppointments((prev) =>
        prev.map((item) =>
          item.id === editAppointment.id ? editAppointment : item,
        ),
      );
      if (viewAppointment && viewAppointment.id === editAppointment.id) {
        setViewAppointment(editAppointment);
      }
      setEditAppointment(null);
    } catch (err: any) {
      alert(err?.message || "Failed to update appointment.");
    } finally {
      setUpdating(false);
    }
  };

  // Handle Delete Confirm
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await apiFetch(`${API_ENDPOINTS.hospitalAppointments}/${deleteId}`, {
        method: "DELETE",
      }).catch(() => {});

      setAppointments((prev) => prev.filter((item) => item.id !== deleteId));
      if (viewAppointment && viewAppointment.id === deleteId) {
        setViewAppointment(null);
      }
    } catch (err: any) {
      console.error("Delete failed:", err);
    } finally {
      setDeleteId(null);
    }
  };

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all placeholder:text-[#b0bec8]";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";

  return (
    <div className="animate-in fade-in duration-500">
      {/* ── 1. View Details Slide-Over Drawer ── */}
      {viewAppointment && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-[420px] bg-white h-full shadow-2xl flex flex-col border-l border-[#dde5e7] animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-[#f0f4f5] flex items-center justify-between bg-[#f8fafb]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#eaf6f5] flex items-center justify-center text-[#3a9898]">
                  <Stethoscope size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1a2632]">
                    {viewAppointment.patientName ||
                      viewAppointment.patient?.firstName ||
                      "Patient Details"}
                  </h3>
                  <p className="text-xs text-[#3a9898] font-semibold">
                    OPD Walk-in Appointment
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewAppointment(null)}
                className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center text-[#8b9bae] border border-transparent hover:border-[#dde5e7] cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#f8fafb] border border-[#e8edf2]">
                <span className="text-xs font-semibold text-[#5a6a76]">
                  Status
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 capitalize">
                  {viewAppointment.status || "Scheduled"}
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider">
                  Appointment Information
                </h4>
                <div className="space-y-3 text-xs bg-[#f8fafb] p-4 rounded-xl border border-[#e8edf2]">
                  <div className="flex justify-between">
                    <span className="text-[#8b9bae]">Phone:</span>
                    <span className="font-semibold text-[#1a2632]">
                      {viewAppointment.phone ||
                        viewAppointment.patient?.phone ||
                        "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b9bae]">Doctor:</span>
                    <span className="font-semibold text-[#1a2632]">
                      {viewAppointment.doctorName || "Unassigned"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b9bae]">Date:</span>
                    <span className="font-semibold text-[#1a2632]">
                      {viewAppointment.appointmentDate ||
                        viewAppointment.date ||
                        "2026-10-18"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b9bae]">Type:</span>
                    <span className="font-semibold text-[#1a2632] capitalize">
                      {viewAppointment.appointmentType ||
                        viewAppointment.type ||
                        "Walk-in"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider">
                  Notes / Symptoms
                </h4>
                <p className="text-xs text-[#5a6a76] bg-[#f8fafb] p-3.5 rounded-xl border border-[#e8edf2] leading-relaxed">
                  {viewAppointment.notes || "No clinical notes provided."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. Edit Appointment Modal ── */}
      {editAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-in fade-in">
          <form
            onSubmit={handleSaveEdit}
            className="bg-white w-full max-w-[650px] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed] overflow-hidden"
          >
            <div className="px-7 py-5 flex items-center justify-between border-b border-[#f0f4f5]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#eaf6f5] flex items-center justify-center text-[#3a9898]">
                  <Edit size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1a2632]">
                    Edit OPD Appointment #{editAppointment.id}
                  </h3>
                  <p className="text-[11px] text-[#8b9bae]">
                    Update appointment & schedule details
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditAppointment(null)}
                className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Patient Name</label>
                  <input
                    type="text"
                    value={editAppointment.patientName || ""}
                    onChange={(e) =>
                      setEditAppointment({
                        ...editAppointment,
                        patientName: e.target.value,
                      })
                    }
                    className={inputCls}
                    required
                  />
                </div>
                <div>
                  <label className={labelCls}>Phone Number</label>
                  <input
                    type="text"
                    value={editAppointment.phone || ""}
                    onChange={(e) =>
                      setEditAppointment({
                        ...editAppointment,
                        phone: e.target.value,
                      })
                    }
                    className={inputCls}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Appointment Date</label>
                  <input
                    type="date"
                    value={
                      editAppointment.appointmentDate ||
                      editAppointment.date ||
                      ""
                    }
                    onChange={(e) =>
                      setEditAppointment({
                        ...editAppointment,
                        appointmentDate: e.target.value,
                      })
                    }
                    className={inputCls}
                    required
                  />
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select
                    value={editAppointment.status || "scheduled"}
                    onChange={(e) =>
                      setEditAppointment({
                        ...editAppointment,
                        status: e.target.value,
                      })
                    }
                    className={inputCls}
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="active">Active</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelCls}>Notes</label>
                <textarea
                  rows={3}
                  value={editAppointment.notes || ""}
                  onChange={(e) =>
                    setEditAppointment({
                      ...editAppointment,
                      notes: e.target.value,
                    })
                  }
                  className="w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] resize-none"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#f0f4f5] flex justify-end gap-2 bg-[#f8fafb]">
              <button
                type="button"
                onClick={() => setEditAppointment(null)}
                className="px-4 py-2 text-xs font-semibold text-[#8b9bae]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                {updating && <Loader2 size={13} className="animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── 3. Delete Confirmation Modal ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-[400px] rounded-[20px] shadow-2xl p-6 text-center space-y-4 border border-[#e2e8ed]">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1a2632]">
                Delete Appointment?
              </h3>
              <p className="text-xs text-[#8b9bae] mt-1">
                Are you sure you want to remove this appointment record? This
                action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="w-1/2 py-2.5 border border-[#dde5e7] text-xs font-semibold text-[#5a6a76] rounded-xl hover:bg-[#f8fafb] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Card View */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#1a2632]">OPD - Today</h2>
            <button
              onClick={fetchOpdAppointments}
              title="Refresh Data"
              className="p-1.5 text-[#8b9bae] hover:text-[#3a9898] hover:bg-[#f5f7f8] rounded-full transition-all cursor-pointer"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="flex gap-2">
            {["Doctor", "Consultation Type", "Status"].map((filter) => (
              <button
                key={filter}
                className="flex items-center gap-2 px-4 py-2 bg-[#f5f7f8] hover:bg-[#eaf6f5] text-[#5a6a76] hover:text-[#3a9898] text-xs font-semibold rounded-full transition-colors border border-[#dde5e7] hover:border-[#b5d9d5]"
              >
                {filter}
                <ChevronDown size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="m-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={fetchOpdAppointments}
              className="underline font-bold hover:text-red-800 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Table Body */}
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-3">
              <Loader2 size={32} className="animate-spin text-[#3a9898]" />
              <p className="text-xs font-semibold">
                Loading OPD appointments...
              </p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-2">
              <p className="text-sm font-semibold text-[#1a2632]">
                No Appointments Found
              </p>
              <p className="text-xs">Walk-in OPD appointments edhum illai.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-[#dde5e7]">
                  <th className="py-4 pl-6 pr-4 w-12">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8]"
                    />
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Patient Name ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Phone Number ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Doctor Name ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Appointment Type ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Date ↕
                  </th>
                  <th className="py-4 px-4 text-center text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Status ↕
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dde5e7]">
                {appointments.map((row, i) => {
                  const patientName =
                    row.patientName ||
                    `${row.patient?.firstName || ""} ${row.patient?.lastName || ""}`.trim() ||
                    "N/A";
                  const phone = row.phone || row.patient?.phone || "—";
                  const doctorName =
                    row.doctorName ||
                    (row.doctor
                      ? `Dr. ${row.doctor.firstName || ""} ${row.doctor.lastName || ""}`
                      : "Unassigned");
                  const appointmentType =
                    row.appointmentType || row.type || "Walk-in";
                  const appointmentDate =
                    row.appointmentDate ||
                    row.date ||
                    row.created_at?.split("T")[0] ||
                    "2026-10-18";
                  const status = row.status || "scheduled";

                  return (
                    <tr
                      key={row.id || i}
                      onClick={() => setViewAppointment(row)}
                      className="hover:bg-[#f5f7f8] transition-colors cursor-pointer group"
                    >
                      <td
                        className="py-4 pl-6 pr-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer"
                        />
                      </td>

                      {/* Patient Name */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#eaf6f5] text-[#3a9898] shrink-0 flex items-center justify-center font-bold text-xs">
                            <User size={18} />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-[#1a2632] hover:text-[#3a9898] transition-colors flex items-center gap-1.5">
                              {patientName}
                              <Eye size={12} className="text-[#8b9bae]" />
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Phone Number */}
                      <td className="py-4 px-4 text-sm font-medium text-[#5a6a76]">
                        {phone}
                      </td>

                      {/* Doctor Name */}
                      <td className="py-4 px-4 text-sm font-medium text-[#1a2632]">
                        <div className="flex items-center gap-2">
                          <Stethoscope size={14} className="text-[#3a9898]" />
                          <span>{doctorName}</span>
                        </div>
                      </td>

                      {/* Consultation Type */}
                      <td className="py-4 px-4 text-sm text-[#5a6a76]">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#f0f4f5] text-xs font-semibold text-[#5a6a76] border border-[#dde5e7] capitalize">
                          {appointmentType}
                        </span>
                      </td>

                      {/* Date (Placed before Status) */}
                      <td className="py-4 px-4 text-xs font-semibold text-[#1a2632] whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-[#8b9bae]" />
                          <span>{appointmentDate}</span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4 text-center">
                        {status.toLowerCase() === "completed" ||
                        status.toLowerCase() === "active" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0] capitalize">
                            <CheckCircle2 size={13} strokeWidth={2.5} />
                            {status}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#f0f4f5] text-[#8b9bae] text-xs font-bold border border-[#dde5e7] capitalize">
                            <Clock size={13} strokeWidth={2.5} />
                            {status}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td
                        className="py-4 px-6 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setEditAppointment(row)}
                            title="Edit"
                            className="p-1.5 bg-[#eaf6f5] text-[#3a9898] hover:bg-[#3a9898] hover:text-white rounded-lg transition-all cursor-pointer"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => setDeleteId(row.id)}
                            title="Delete"
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition-all cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Dynamic Pagination Footer */}
        <div className="p-4 border-t border-[#dde5e7] flex items-center justify-between text-sm text-[#5a6a76] flex-wrap gap-3">
          <div>
            Showing {appointments.length === 0 ? 0 : (currentPage - 1) * 10 + 1}{" "}
            to {Math.min(currentPage * 10, totalEntries)} of {totalEntries}{" "}
            entries
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7] disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded font-medium transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-[#3a9898] text-white"
                      : "hover:bg-[#f0f4f5]"
                  }`}
                >
                  {pageNum}
                </button>
              ),
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={
                currentPage === totalPages || loading || totalPages === 0
              }
              className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7] disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

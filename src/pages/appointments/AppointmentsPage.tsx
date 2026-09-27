import {
  ChevronDown,
  Plus,
  CheckCircle2,
  Info,
  Loader2,
  RefreshCw,
  Clock,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import BookAppointmentModal from "./BookAppointmentModal";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

// Interface directly matching your API response object
export interface AppointmentItem {
  id: number;
  appointmentDate: string;
  timeSlot: string;
  appointmentType: string;
  status: string;
  priority: string;
  symptoms?: string | null;
  patientName: string;
  patientMrn: string;
  doctorName: string;
  departmentName: string;
  gender?: string;
  age?: number;
  location?: string;
  photoUrl?: string | null;
  [key: string]: any;
}

export default function AppointmentsPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalEntries, setTotalEntries] = useState<number>(0);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rawResponse = await apiFetch(
        `${API_ENDPOINTS.hospitalAppointments}?page=${currentPage}&limit=20`,
        { method: "GET" },
      );

      // Extract JSON response
      const res =
        typeof rawResponse.json === "function"
          ? await rawResponse.json()
          : rawResponse;

      console.log("Parsed JSON Response:", res);

      // Handle array or object with data array
      const dataList = Array.isArray(res) ? res : res?.data || [];

      setAppointments(dataList);

      const totalCount = res?.meta?.total ?? res?.total ?? dataList.length;
      const totalPagesCount =
        (res?.meta?.last_page ??
          res?.totalPages ??
          Math.ceil(totalCount / 20)) ||
        1;

      setTotalEntries(totalCount);
      setTotalPages(totalPagesCount);
    } catch (err: any) {
      console.error("Fetch Appointments Error:", err);
      setError(err?.message || "Appointments data-vai load seyyavillai.");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleAppointmentCreated = () => {
    setShowModal(false);
    fetchAppointments();
  };

  return (
    <div className="animate-in fade-in duration-500">
      {showModal && (
        <BookAppointmentModal
          onClose={() => setShowModal(false)}
          onSuccess={handleAppointmentCreated}
        />
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#1a2632]">Appointments</h2>
            <button
              type="button"
              onClick={fetchAppointments}
              className="p-1.5 text-[#8b9bae] hover:text-[#3a9898] hover:bg-[#eaf6f5] rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {["Gender", "Age", "Patient Type", "Condition"].map((filter) => (
              <button
                key={filter}
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-[#eaf6f5] hover:bg-[#d4efed] text-[#3a9898] text-xs font-semibold rounded-full transition-colors"
              >
                {filter}
                <ChevronDown size={14} />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20"
            >
              <Plus size={14} strokeWidth={2.5} /> Book Appointment
            </button>
          </div>
        </div>

        {/* Dynamic States: Loading, Error, Empty, or Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-[#8b9bae]">
            <Loader2 className="w-8 h-8 animate-spin text-[#3a9898] mb-2" />
            <p className="text-sm font-medium">Loading appointments...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">
            <p className="font-semibold mb-2">{error}</p>
            <button
              type="button"
              onClick={fetchAppointments}
              className="px-4 py-2 text-xs font-bold bg-[#eaf6f5] text-[#3a9898] rounded-md hover:bg-[#d4efed] transition-colors"
            >
              Retry
            </button>
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-12 text-center text-[#8b9bae]">
            <p className="text-sm font-medium">No appointments found.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
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
                      Name ↕
                    </th>
                    <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                      Gender / Age ↕
                    </th>
                    <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                      Symptoms / Priority ↕
                    </th>
                    <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                      Doctor ↕
                    </th>
                    <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                      Type ↕
                    </th>
                    <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                      Date & Time ↕
                    </th>
                    <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                      Location ↕
                    </th>
                    <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] whitespace-nowrap text-center">
                      Status ↕
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dde5e7]">
                  {appointments.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-[#f5f7f8] transition-colors group"
                    >
                      <td className="py-4 pl-6 pr-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer"
                        />
                      </td>

                      {/* Patient Name & MRN */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#dde5e7] shrink-0 overflow-hidden flex items-center justify-center font-bold text-[#3a9898] text-sm bg-[#eaf6f5]">
                            {row.photoUrl ? (
                              <img
                                src={row.photoUrl}
                                alt={row.patientName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              row.patientName?.charAt(0)?.toUpperCase() || "P"
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#1a2632] group-hover:text-[#3a9898] transition-colors cursor-pointer">
                              {row.patientName || "—"}
                            </div>
                            <div className="text-xs text-[#8b9bae]">
                              #{row.patientMrn || row.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Gender / Age */}
                      <td className="py-4 px-4 text-sm text-[#5a6a76]">
                        <span className="inline-flex items-center gap-1.5">
                          {row.gender === "Female" ? (
                            <span className="text-[#3a9898] font-bold">♀</span>
                          ) : row.gender === "Male" ? (
                            <span className="text-[#8b9bae] font-bold">♂</span>
                          ) : null}
                          {row.gender || row.age
                            ? `${row.gender || ""} / ${row.age || ""}`
                            : "—"}
                        </span>
                      </td>

                      {/* Symptoms or Priority */}
                      <td className="py-4 px-4">
                        <span className="text-sm font-semibold text-[#3a9898] capitalize">
                          {row.symptoms || row.priority || "General"}
                        </span>
                      </td>

                      {/* Doctor & Department */}
                      <td className="py-4 px-4">
                        <div className="text-sm font-bold text-[#1a2632]">
                          {row.doctorName || "—"}
                        </div>
                        <div className="text-xs text-[#8b9bae]">
                          {row.departmentName || "—"}
                        </div>
                      </td>

                      {/* Appointment Type */}
                      <td className="py-4 px-4 text-sm text-[#5a6a76] capitalize">
                        {row.appointmentType || "—"}
                      </td>

                      {/* Date & Time Slot */}
                      <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                        <div>{row.appointmentDate || "—"}</div>
                        {row.timeSlot && (
                          <div className="text-xs text-[#8b9bae] flex items-center gap-1 mt-0.5">
                            <Clock size={12} /> {row.timeSlot}
                          </div>
                        )}
                      </td>

                      {/* Location */}
                      <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                        {row.location || "—"}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6 text-center">
                        {row.status?.toLowerCase() === "discharged" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#f0f4f5] text-[#8b9bae] text-xs font-bold border border-[#dde5e7] capitalize">
                            <Info size={14} strokeWidth={2.5} />
                            Discharged
                          </span>
                        )}
                        {(row.status?.toLowerCase() === "scheduled" ||
                          row.status?.toLowerCase() === "admitted") && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0] capitalize">
                            <CheckCircle2 size={14} strokeWidth={2.5} />
                            {row.status}
                          </span>
                        )}
                        {(row.status?.toLowerCase() === "in treatment" ||
                          row.status?.toLowerCase() === "in-progress") && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#3a9898] text-white text-xs font-bold shadow-sm shadow-[#3a9898]/20 capitalize">
                            <Info size={14} strokeWidth={2.5} />
                            {row.status}
                          </span>
                        )}
                        {![
                          "discharged",
                          "scheduled",
                          "admitted",
                          "in treatment",
                          "in-progress",
                        ].includes(row.status?.toLowerCase()) && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#f5f7f8] text-[#5a6a76] text-xs font-bold border border-[#dde5e7] capitalize">
                            {row.status || "Pending"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-[#dde5e7] flex items-center justify-between text-xs text-[#8b9bae]">
              <div>
                Total Entries:{" "}
                <span className="font-bold text-[#1a2632]">{totalEntries}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-3 py-1 rounded bg-[#f5f7f8] hover:bg-[#eaf6f5] disabled:opacity-50 transition-colors"
                >
                  Previous
                </button>
                <span>
                  Page <strong className="text-[#1a2632]">{currentPage}</strong>{" "}
                  of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  className="px-3 py-1 rounded bg-[#f5f7f8] hover:bg-[#eaf6f5] disabled:opacity-50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
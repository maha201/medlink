import {
  ChevronDown,
  CheckCircle2,
  Clock,
  Loader2,
  RefreshCw,
  User,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

interface OpdAppointment {
  id: number;
  patientName?: string;
  phone?: string;
  doctorName?: string;
  consultationType?: string;
  status?: string;
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

  const fetchOpdAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Querying standard appointments endpoint with consultation_type=walk_in
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

      console.log("Walk-in OPD Appointments Response:", res);

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

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#1a2632]">OPD - Walk-in</h2>
            <button
              onClick={fetchOpdAppointments}
              title="Refresh Data"
              className="p-1.5 text-[#8b9bae] hover:text-[#3a9898] hover:bg-[#f5f7f8] rounded-full transition-all"
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
              className="underline font-bold hover:text-red-800"
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
                    Consultation Type ↕
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Status ↕
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
                  const consultationType =
                    row.consultationType || row.type || "Walk-in";
                  const status = row.status || "scheduled";

                  return (
                    <tr
                      key={row.id || i}
                      className="hover:bg-[#f5f7f8] transition-colors group"
                    >
                      <td className="py-4 pl-6 pr-4">
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
                            <Link
                              to={`/appointments/${row.id}`}
                              className="text-sm font-bold text-[#1a2632] hover:text-[#3a9898] transition-colors"
                            >
                              {patientName}
                            </Link>
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
                          {consultationType}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6 text-center">
                        {status.toLowerCase() === "completed" ||
                        status.toLowerCase() === "active" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0] capitalize">
                            <CheckCircle2 size={14} strokeWidth={2.5} />
                            {status}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#f0f4f5] text-[#8b9bae] text-xs font-bold border border-[#dde5e7] capitalize">
                            <Clock size={14} strokeWidth={2.5} />
                            {status}
                          </span>
                        )}
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
              className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7] disabled:opacity-40 disabled:hover:bg-transparent"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded font-medium transition-all ${
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
              className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7] disabled:opacity-40 disabled:hover:bg-transparent"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

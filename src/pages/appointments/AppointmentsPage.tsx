import {
  ChevronDown,
  Plus,
  CheckCircle2,
  Info,
  Loader2,
  RefreshCw,
  Clock,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import BookAppointmentModal from "./BookAppointmentModal";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";

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
  phone?: string;
  photoUrl?: string | null;
  [key: string]: any;
}

export interface AppointmentKpiData {
  todayAppointments: number;
  completedCount: number;
  ongoingCount: number;
  cancelledCount: number;
  totalWeeklyAppointments: number;
  typeCounts: {
    consultation: { count: number; percentage: number };
    followUp: { count: number; percentage: number };
    surgery: { count: number; percentage: number };
    emergency: { count: number; percentage: number };
  };
  weeklyTrend: Array<{ name: string; date?: string; appointments: number }>;
}

// Fallback dummy data for top Trend chart
const defaultTrendData = [
  { name: "Mon", appointments: 0 },
  { name: "Tue", appointments: 0 },
  { name: "Wed", appointments: 0 },
  { name: "Thu", appointments: 0 },
  { name: "Fri", appointments: 0 },
  { name: "Sat", appointments: 0 },
  { name: "Sun", appointments: 0 },
];

export default function AppointmentsPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [kpiData, setKpiData] = useState<AppointmentKpiData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalEntries, setTotalEntries] = useState<number>(0);

  const fetchKpiData = useCallback(async () => {
    try {
      const rawResponse = await apiFetch(
        API_ENDPOINTS.hospitalAppointmentsKpi,
        {
          method: "GET",
        },
      );
      const res =
        typeof rawResponse.json === "function"
          ? await rawResponse.json()
          : rawResponse;

      if (res?.data) {
        setKpiData(res.data);
      } else if (res && typeof res === "object") {
        setKpiData(res);
      }
    } catch (err: any) {
      console.error("Fetch Appointment KPI Error:", err);
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rawResponse = await apiFetch(
        `${API_ENDPOINTS.hospitalAppointments}?page=${currentPage}&limit=20`,
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
    fetchKpiData();
  }, [fetchAppointments, fetchKpiData]);

  const handleAppointmentCreated = () => {
    setShowModal(false);
    fetchAppointments();
    fetchKpiData();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Safe trend data fallback to avoid undefined errors
  const chartData =
    kpiData?.weeklyTrend && kpiData.weeklyTrend.length > 0
      ? kpiData.weeklyTrend
      : defaultTrendData;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      {showModal && (
        <BookAppointmentModal
          onClose={() => setShowModal(false)}
          onSuccess={handleAppointmentCreated}
        />
      )}

      {/* ── TOP 4 KPI SUMMARY CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11.5px] font-semibold text-[#8b9bae]">
                Today's Appointments
              </p>
              <h3 className="text-2xl font-black text-[#1a2632] mt-1">
                {kpiData?.todayAppointments ?? 0}
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10.5px] font-bold">
              <TrendingUp size={11} /> Live
            </span>
          </div>
          <p className="text-[11px] text-[#8b9bae] mt-3">
            Total active appointments today
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11.5px] font-semibold text-[#8b9bae]">
                Completed
              </p>
              <h3 className="text-2xl font-black text-[#1a2632] mt-1">
                {kpiData?.completedCount ?? 0}
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10.5px] font-bold">
              <TrendingUp size={11} /> Success
            </span>
          </div>
          <p className="text-[11px] text-[#8b9bae] mt-3">
            Completed consultations & appointments
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11.5px] font-semibold text-[#8b9bae]">
                Ongoing
              </p>
              <h3 className="text-2xl font-black text-[#1a2632] mt-1">
                {kpiData?.ongoingCount ?? 0}
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10.5px] font-bold">
              <Clock size={11} /> In Queue
            </span>
          </div>
          <p className="text-[11px] text-[#8b9bae] mt-3">
            In-progress and scheduled visits
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11.5px] font-semibold text-[#8b9bae]">
                Canceled
              </p>
              <h3 className="text-2xl font-black text-[#1a2632] mt-1">
                {kpiData?.cancelledCount ?? 0}
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-[10.5px] font-bold">
              <TrendingUp size={11} className="rotate-180" /> Cancelled
            </span>
          </div>
          <p className="text-[11px] text-[#8b9bae] mt-3">
            Cancelled patient bookings
          </p>
        </div>
      </div>

      {/* ── APPOINTMENT TRENDS & TYPE CHARTS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Trend Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-bold text-[#1a2632] text-sm">
                Appointment Trends
              </h3>
              <p className="text-xs text-[#8b9bae] mt-0.5">
                Total Appointments (7 Days):{" "}
                <strong className="text-[#1a2632]">
                  {kpiData?.totalWeeklyAppointments ?? 0}
                </strong>
              </p>
            </div>
            <button className="flex items-center gap-1.5 bg-[#f5f7f8] border border-[#dde5e7] text-[#5a6a76] text-xs font-semibold px-3 py-1.5 rounded-xl cursor-pointer">
              This Week <ChevronDown size={14} />
            </button>
          </div>
          <div className="w-full h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3a9898" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3a9898" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F1F5F9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e2e8ed",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="appointments"
                  stroke="#3a9898"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTrend)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Appointment Type Breakdown */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-[#1a2632] text-sm">
              Appointment Type
            </h3>
            <span className="text-xs text-[#8b9bae]">•••</span>
          </div>
          <div className="space-y-3.5 my-auto">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#1a2632]">Consultation</span>
                <span className="text-[#3a9898]">
                  {kpiData?.typeCounts?.consultation?.percentage ?? 0}% (
                  {kpiData?.typeCounts?.consultation?.count ?? 0} Patients)
                </span>
              </div>
              <div className="w-full h-2 bg-[#f5f7f8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3a9898] rounded-full transition-all"
                  style={{
                    width: `${kpiData?.typeCounts?.consultation?.percentage ?? 0}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#1a2632]">Follow-up</span>
                <span className="text-[#3a9898]">
                  {kpiData?.typeCounts?.followUp?.percentage ?? 0}% (
                  {kpiData?.typeCounts?.followUp?.count ?? 0} Patients)
                </span>
              </div>
              <div className="w-full h-2 bg-[#f5f7f8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3a9898]/80 rounded-full transition-all"
                  style={{
                    width: `${kpiData?.typeCounts?.followUp?.percentage ?? 0}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#1a2632]">Surgery</span>
                <span className="text-[#3a9898]">
                  {kpiData?.typeCounts?.surgery?.percentage ?? 0}% (
                  {kpiData?.typeCounts?.surgery?.count ?? 0} Patients)
                </span>
              </div>
              <div className="w-full h-2 bg-[#f5f7f8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3a9898]/60 rounded-full transition-all"
                  style={{
                    width: `${kpiData?.typeCounts?.surgery?.percentage ?? 0}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#1a2632]">Emergency</span>
                <span className="text-[#3a9898]">
                  {kpiData?.typeCounts?.emergency?.percentage ?? 0}% (
                  {kpiData?.typeCounts?.emergency?.count ?? 0} Patients)
                </span>
              </div>
              <div className="w-full h-2 bg-[#f5f7f8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all"
                  style={{
                    width: `${kpiData?.typeCounts?.emergency?.percentage ?? 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN APPOINTMENTS TABLE SECTION ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#1a2632]">Appointments</h2>
            <button
              type="button"
              onClick={fetchAppointments}
              className="p-1.5 text-[#8b9bae] hover:text-[#3a9898] hover:bg-[#eaf6f5] rounded-lg transition-colors cursor-pointer"
              title="Refresh"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {["This Week", "Source"].map((filter) => (
              <button
                key={filter}
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-[#f5f7f8] hover:bg-[#eaf6f5] text-[#5a6a76] hover:text-[#3a9898] text-xs font-semibold rounded-full transition-colors border border-[#dde5e7] cursor-pointer"
              >
                {filter}
                <ChevronDown size={14} />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20 cursor-pointer"
            >
              <Plus size={14} strokeWidth={2.5} /> Add Appointment
            </button>
          </div>
        </div>

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
              className="px-4 py-2 text-xs font-bold bg-[#eaf6f5] text-[#3a9898] rounded-md hover:bg-[#d4efed] transition-colors cursor-pointer"
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
                        className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer"
                      />
                    </th>
                    <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                      Name ↕
                    </th>
                    <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                      Phone Number ↕
                    </th>
                    <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                      Doctor ↕
                    </th>
                    <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                      Appointment Type ↕
                    </th>
                    <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                      Date ↕
                    </th>
                    <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap text-center">
                      Status ↕
                    </th>
                    <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] whitespace-nowrap text-center">
                      Actions ↕
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

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden flex items-center justify-center font-bold text-[#3a9898] text-sm bg-[#eaf6f5]">
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

                      <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                        {row.phone || "+91 98765-43210"}
                      </td>

                      <td className="py-4 px-4">
                        <div className="text-sm font-bold text-[#1a2632]">
                          {row.doctorName || "—"}
                        </div>
                        <div className="text-xs text-[#8b9bae]">
                          {row.departmentName || "General"}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-sm font-semibold text-[#1a2632] capitalize">
                        {row.appointmentType || "Consultation"}
                      </td>

                      <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                        <div>{row.appointmentDate || "12 March 2035"}</div>
                        <div className="text-xs text-[#8b9bae] flex items-center gap-1 mt-0.5">
                          <Clock size={12} /> {row.timeSlot || "09:00 - 09:30"}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        {row.status?.toLowerCase() === "completed" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0] capitalize">
                            <CheckCircle2 size={14} strokeWidth={2.5} />
                            Completed
                          </span>
                        ) : row.status?.toLowerCase() === "ongoing" ||
                          row.status?.toLowerCase() === "in treatment" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#3a9898] text-white text-xs font-bold shadow-sm shadow-[#3a9898]/20 capitalize">
                            <Info size={14} strokeWidth={2.5} />
                            Ongoing
                          </span>
                        ) : row.status?.toLowerCase() === "canceled" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-50 text-rose-600 text-xs font-bold border border-rose-200 capitalize">
                            Canceled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200 capitalize">
                            {row.status || "Scheduled"}
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() =>
                              alert(`View details for ID: ${row.id}`)
                            }
                            className="p-1.5 text-[#5a6a76] hover:text-[#3a9898] rounded-lg hover:bg-[#eaf6f5] transition-colors cursor-pointer"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() =>
                              alert(`Edit appointment ID: ${row.id}`)
                            }
                            className="p-1.5 text-[#5a6a76] hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="p-1.5 text-[#5a6a76] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
                  className="px-3 py-1 rounded bg-[#f5f7f8] hover:bg-[#eaf6f5] disabled:opacity-50 transition-colors cursor-pointer"
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
                  className="px-3 py-1 rounded bg-[#f5f7f8] hover:bg-[#eaf6f5] disabled:opacity-50 transition-colors cursor-pointer"
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

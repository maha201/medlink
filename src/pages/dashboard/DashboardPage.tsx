import { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  Calendar as CalendarIcon,
  TrendingUp,
  MoreHorizontal,
  Info,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  FileText,
  DollarSign,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import { API_ENDPOINTS, apiFetch } from "@/lib/api/api";

// Dynamic Chart Color Palette Fallback (Assigns colors automatically if API doesn't provide them)
const DEPT_COLORS = [
  "#0F393B",
  "#2C8C89",
  "#68B3AF",
  "#A2D4D1",
  "#D2ECEB",
  "#EAF6F5",
];

// Icon Mapping Helper
const getActivityIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case "user_plus":
    case "patient":
      return UserPlus;
    case "appointment":
    case "calendar":
      return CalendarIcon;
    case "file":
    case "report":
      return FileText;
    case "doctor":
      return UserCheck;
    case "billing":
    case "invoice":
      return DollarSign;
    default:
      return Info;
  }
};

export default function DashboardPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);

  // --- API INTEGRATION ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiFetch(API_ENDPOINTS.hospitalDashboard);

        if (!response.ok) {
          throw new Error(
            `Server Error: ${response.status} ${response.statusText}`,
          );
        }

        const result = await response.json();
        // API Payload structure extractor (support both result.data or raw object)
        setDashboardData(result?.data || result);
      } catch (err: any) {
        console.error("Dashboard API Fetch Error:", err);
        setError(err.message || "Failed to load dashboard data from API.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Strict API Data Variables (Zero Dummy Data)
  const stats = dashboardData?.stats;
  const ageData = dashboardData?.ageData || [];
  const deptData = (dashboardData?.deptData || []).map(
    (dept: any, index: number) => ({
      ...dept,
      color: dept.color || DEPT_COLORS[index % DEPT_COLORS.length],
    }),
  );
  const revenueData = dashboardData?.revenueData || [];
  const patientAppointments = dashboardData?.patientAppointments || [];
  const reports = dashboardData?.reports || [];
  const agenda = dashboardData?.agenda || [];
  const doctorsSchedule = dashboardData?.doctorsSchedule || {
    total: 0,
    available: 0,
    unavailable: 0,
    list: [],
  };
  const recentActivities = dashboardData?.recentActivities || [];

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#2C8C89]" />
        <p className="text-sm font-medium">Fetching Live API Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 font-sans text-slate-800">
      {/* ERROR ALERT BANNER */}
      {error && (
        <div className="max-w-[1600px] mx-auto mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-sm">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* MAIN CONTAINER GRID */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* ================= LEFT MAIN CONTENT (8 COLS) ================= */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs font-medium">
                  Overall Visitors
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#0F393B] flex items-center justify-center text-white">
                  <Users size={18} />
                </div>
              </div>
              <div className="my-3">
                <h3 className="text-2xl font-bold text-slate-900">
                  {stats?.overallVisitors ?? "-"}
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#EAF6F5] flex items-center justify-center text-[#2C8C89]">
                  <TrendingUp size={10} />
                </div>
                <span className="text-[#2C8C89] text-xs font-semibold">
                  {stats?.visitorsGrowth ?? "0%"}
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs font-medium">
                  Total Patients
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#0F393B] flex items-center justify-center text-white">
                  <UserPlus size={18} />
                </div>
              </div>
              <div className="my-3">
                <h3 className="text-2xl font-bold text-slate-900">
                  {stats?.totalPatients ?? "-"}
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#EAF6F5] flex items-center justify-center text-[#2C8C89]">
                  <TrendingUp size={10} />
                </div>
                <span className="text-[#2C8C89] text-xs font-semibold">
                  {stats?.patientsGrowth ?? "0%"}
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs font-medium">
                  Appointments
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#0F393B] flex items-center justify-center text-white">
                  <CalendarIcon size={18} />
                </div>
              </div>
              <div className="my-3">
                <h3 className="text-2xl font-bold text-slate-900">
                  {stats?.appointments ?? "-"}
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#EAF6F5] flex items-center justify-center text-[#2C8C89]">
                  <TrendingUp size={10} />
                </div>
                <span className="text-[#2C8C89] text-xs font-semibold">
                  {stats?.appointmentsGrowth ?? "0%"}
                </span>
              </div>
            </div>
          </div>

          {/* ROW 1 CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* BAR CHART */}
            <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Patient by Age Stages
                  </h3>
                  <p className="text-[11px] text-slate-400">Total Patients</p>
                  <div className="text-xl font-bold text-[#2C8C89] mt-0.5">
                    {dashboardData?.totalAgeCount ?? "-"}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#A2D4D1]"></span>{" "}
                      Children
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2C8C89]"></span>{" "}
                      Teens
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0F393B]"></span>{" "}
                      Adults
                    </span>
                  </div>
                  <button className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-lg">
                    This Week <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              <div className="w-full h-52 flex items-center justify-center">
                {ageData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageData} barGap={4}>
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
                        dy={5}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94A3B8", fontSize: 11 }}
                      />
                      <Tooltip
                        cursor={{ fill: "#F8FAFC" }}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        }}
                      />
                      <Bar
                        dataKey="children"
                        fill="#A2D4D1"
                        radius={[4, 4, 0, 0]}
                        barSize={8}
                      />
                      <Bar
                        dataKey="teens"
                        fill="#2C8C89"
                        radius={[4, 4, 0, 0]}
                        barSize={8}
                      />
                      <Bar
                        dataKey="adults"
                        fill="#0F393B"
                        radius={[4, 4, 0, 0]}
                        barSize={8}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-xs text-slate-400">
                    No Age Stage Data Available
                  </p>
                )}
              </div>
            </div>

            {/* DONUT CHART */}
            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-900 text-sm">
                  Patient by Departments
                </h3>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div className="relative h-40 flex items-center justify-center my-2">
                {deptData.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deptData}
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                          stroke="none"
                        >
                          {deptData.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute text-center">
                      <div className="text-[11px] text-slate-400 font-medium">
                        All Patients
                      </div>
                      <div className="text-lg font-bold text-slate-900">
                        {stats?.totalPatients ?? 0}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-slate-400">No Department Data</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 text-xs">
                {deptData.map((dept: any) => (
                  <div key={dept.name} className="flex items-start gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-sm mt-0.5 shrink-0"
                      style={{ backgroundColor: dept.color }}
                    ></div>
                    <div className="truncate">
                      <div className="font-semibold text-slate-800 truncate">
                        {dept.name}
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        {dept.value?.toLocaleString() ?? 0} Patients
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 2 CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* REVENUE AREA CHART */}
            <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Revenue</h3>
                  <div className="flex gap-4 mt-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2C8C89]"></div>
                      <span className="text-xs font-medium text-slate-500">
                        Income
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0F393B]"></div>
                      <span className="text-xs font-medium text-slate-500">
                        Expense
                      </span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-lg">
                  Last Year <ChevronDown size={14} />
                </button>
              </div>

              <div className="w-full h-44 flex items-center justify-center">
                {revenueData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={revenueData}
                      margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorIncome"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#2C8C89"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="95%"
                            stopColor="#2C8C89"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorExpense"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#0F393B"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="95%"
                            stopColor="#0F393B"
                            stopOpacity={0}
                          />
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
                        tickFormatter={(v) => `${v / 1000}K`}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="expense"
                        stroke="#0F393B"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorExpense)"
                      />
                      <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#2C8C89"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorIncome)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-xs text-slate-400">
                    No Revenue Data Available
                  </p>
                )}
              </div>
            </div>

            {/* REPORTS */}
            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-slate-900 text-sm">Reports</h3>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div className="space-y-3">
                {reports.length > 0 ? (
                  reports.map((report: any, i: number) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start p-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#EAF6F5] flex items-center justify-center text-[#2C8C89] shrink-0 mt-0.5">
                        <Info size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-slate-800 truncate">
                          {report.title}
                        </h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[11px] text-slate-400">
                            {report.id || report.by}
                          </span>
                          <button className="text-[11px] font-semibold text-[#2C8C89] hover:underline">
                            Details &gt;
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-4 text-center">
                    No reports available
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 text-sm">
                Patient Appointment
              </h3>
              <button className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-lg">
                This Week <ChevronDown size={14} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 pl-2 w-8">
                      <input
                        type="checkbox"
                        className="rounded text-[#2C8C89] focus:ring-0"
                      />
                    </th>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Doctor (+ Specialty)</th>
                    <th className="pb-3">Appointment Type</th>
                    <th className="pb-3">Date & Time</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 pr-2 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {patientAppointments.length > 0 ? (
                    patientAppointments.map((row: any, i: number) => (
                      <tr
                        key={row.id || i}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="py-3.5 pl-2">
                          <input
                            type="checkbox"
                            className="rounded text-[#2C8C89] focus:ring-0"
                          />
                        </td>
                        <td className="py-3.5 font-bold text-slate-900">
                          <div>{row.name}</div>
                          <div className="text-[11px] text-slate-400 font-normal">
                            {row.id}
                          </div>
                        </td>
                        <td className="py-3.5">
                          <div className="font-semibold text-slate-800">
                            {row.doctor}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {row.dept}
                          </div>
                        </td>
                        <td className="py-3.5 text-slate-600 font-medium">
                          {row.type}
                        </td>
                        <td className="py-3.5">
                          <div className="text-slate-800 font-medium">
                            {row.date}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {row.time}
                          </div>
                        </td>
                        <td className="py-3.5">
                          {row.status === "Completed" && (
                            <span className="px-2.5 py-1 bg-[#EAF6F5] text-[#2C8C89] text-[11px] font-semibold rounded-lg">
                              Completed
                            </span>
                          )}
                          {row.status === "Scheduled" && (
                            <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[11px] font-semibold rounded-lg">
                              Scheduled
                            </span>
                          )}
                          {row.status === "Canceled" && (
                            <span className="px-2.5 py-1 bg-red-50 text-red-500 text-[11px] font-semibold rounded-lg">
                              Canceled
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 pr-2 text-right text-slate-400">
                          <button className="hover:text-slate-700">
                            <MoreHorizontal size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-6 text-center text-slate-400"
                      >
                        No patient appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDEBAR (4 COLS) ================= */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* CALENDAR */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 text-sm">Calendar</h3>
              <div className="flex gap-1">
                <button className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg">
                  <ChevronLeft size={16} />
                </button>
                <button className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400 mb-3">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="grid grid-cols-7 text-center text-xs gap-y-2">
              {[
                27,
                28,
                29,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                "8-active",
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                "17-light",
                18,
                19,
                "20-light",
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                "28-light",
                1,
                2,
                3,
                4,
              ].map((day, i) => {
                if (typeof day === "string" && day.includes("active")) {
                  return (
                    <div key={i} className="flex justify-center">
                      <div className="w-7 h-7 flex items-center justify-center bg-[#2C8C89] text-white rounded-full font-bold text-xs shadow-sm">
                        {day.split("-")[0]}
                      </div>
                    </div>
                  );
                }
                if (typeof day === "string" && day.includes("light")) {
                  return (
                    <div key={i} className="flex justify-center">
                      <div className="w-7 h-7 flex items-center justify-center bg-[#EAF6F5] text-[#2C8C89] rounded-full font-bold text-xs">
                        {day.split("-")[0]}
                      </div>
                    </div>
                  );
                }
                const isMuted = i < 3 || i > 30;
                return (
                  <div
                    key={i}
                    className={`flex justify-center items-center h-7 text-xs font-medium ${isMuted ? "text-slate-300" : "text-slate-700"}`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* AGENDA */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 text-sm">Agenda</h3>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <div className="space-y-3">
              {agenda.length > 0 ? (
                agenda.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="bg-[#EAF6F5]/60 border border-[#2C8C89]/10 rounded-xl p-3 flex gap-3.5 items-center"
                  >
                    <div className="bg-white rounded-xl w-11 h-11 flex flex-col items-center justify-center shrink-0 shadow-sm">
                      <span className="text-sm font-bold text-slate-900 leading-none">
                        {item.date}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400 mt-0.5">
                        {item.day}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="text-[9px] font-bold text-white bg-[#2C8C89] px-1.5 py-0.5 rounded-md self-start mb-1 uppercase tracking-wider">
                        {item.tag}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">{item.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 py-2 text-center">
                  No agenda events
                </p>
              )}
            </div>
          </div>

          {/* DOCTORS SCHEDULE */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 text-sm">
                Doctors' Schedule
              </h3>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="flex justify-around mb-4 pb-3 border-b border-slate-100 text-center">
              <div>
                <div className="text-base font-bold text-slate-900">
                  {doctorsSchedule?.total ?? 0}
                </div>
                <div className="text-[11px] text-slate-400">All Doctor</div>
              </div>
              <div className="h-8 w-[1px] bg-slate-100"></div>
              <div>
                <div className="text-base font-bold text-slate-900">
                  {doctorsSchedule?.available ?? 0}
                </div>
                <div className="text-[11px] text-slate-400">Available</div>
              </div>
              <div className="h-8 w-[1px] bg-slate-100"></div>
              <div>
                <div className="text-base font-bold text-slate-900">
                  {doctorsSchedule?.unavailable ?? 0}
                </div>
                <div className="text-[11px] text-slate-400">Unavailable</div>
              </div>
            </div>

            <div className="space-y-3.5">
              {doctorsSchedule?.list?.length > 0 ? (
                doctorsSchedule.list.map((doc: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0"></div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">
                          {doc.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">{doc.dept}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {doc.status === "Available" ? (
                        <span className="inline-block px-2 py-0.5 bg-[#2C8C89] text-white text-[10px] font-semibold rounded-md">
                          Available
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 bg-red-100 text-red-500 text-[10px] font-semibold rounded-md">
                          Unavailable
                        </span>
                      )}
                      <p className="text-[10px] text-slate-400 mt-1">
                        {doc.time}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 py-2 text-center">
                  No doctor schedule available
                </p>
              )}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 text-sm">
                Recent Activity
              </h3>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="space-y-3.5">
              {recentActivities.length > 0 ? (
                recentActivities.map((act: any, i: number) => {
                  const IconComponent = getActivityIcon(act.type);
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#EAF6F5] text-[#2C8C89] flex items-center justify-center shrink-0 mt-0.5">
                        <IconComponent size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 leading-tight">
                          {act.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {act.desc}
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {act.time}
                      </span>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-400 py-2 text-center">
                  No recent activities
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

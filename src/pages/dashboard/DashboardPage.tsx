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

// --- MOCK DATA ---
const ageData = [
  { name: "Mon", children: 25, teens: 45, adults: 10 },
  { name: "Tue", children: 30, teens: 40, adults: 25 },
  { name: "Wed", children: 38, teens: 56, adults: 17 },
  { name: "Thu", children: 45, teens: 35, adults: 30 },
  { name: "Fri", children: 50, teens: 45, adults: 20 },
  { name: "Sat", children: 40, teens: 30, adults: 15 },
  { name: "Sun", children: 30, teens: 40, adults: 25 },
];

const deptData = [
  {
    name: "General Medicine",
    value: 2140,
    percentage: "30%",
    color: "#0F393B",
  },
  { name: "Pediatrics", value: 1620, percentage: "28%", color: "#2C8C89" },
  { name: "Cardiology", value: 1380, percentage: "18%", color: "#68B3AF" },
  { name: "Orthopedics", value: 1050, percentage: "14%", color: "#A2D4D1" },
  { name: "Dermatology", value: 1060, percentage: "10%", color: "#D2ECEB" },
  { name: "Neurology", value: 1090, percentage: "10%", color: "#EAF6F5" },
];

const revenueData = [
  { name: "Jan", income: 1000, expense: 500 },
  { name: "Feb", income: 1200, expense: 600 },
  { name: "Mar", income: 1100, expense: 700 },
  { name: "Apr", income: 1500, expense: 800 },
  { name: "May", income: 1300, expense: 900 },
  { name: "Jun", income: 1620, expense: 872 },
  { name: "Jul", income: 1400, expense: 700 },
  { name: "Aug", income: 1700, expense: 900 },
  { name: "Sep", income: 1800, expense: 1000 },
  { name: "Oct", income: 1600, expense: 900 },
  { name: "Nov", income: 1900, expense: 1100 },
  { name: "Dec", income: 2000, expense: 1200 },
];

const patientAppointments = [
  {
    name: "Alicia Perth",
    id: "PT-2035-001",
    doctor: "Dr. Amelia Hart",
    dept: "Cardiology",
    type: "Consultation",
    date: "20 March 2035",
    time: "09:00 - 09:20",
    status: "Completed",
  },
  {
    name: "Bima Kurnia",
    id: "PT-2035-024",
    doctor: "Dr. Rizky Pratama",
    dept: "General Medicine",
    type: "Follow-up",
    date: "20 March 2035",
    time: "10:15 - 10:45",
    status: "Scheduled",
  },
  {
    name: "Clara Wright",
    id: "PT-2035-053",
    doctor: "Dr. Sophia Liang",
    dept: "Pediatrics",
    type: "Consultation",
    date: "20 March 2035",
    time: "13:00 - 13:30",
    status: "Completed",
  },
  {
    name: "Erica Smith",
    id: "PT-2035-091",
    doctor: "Dr. Nina Alvarez",
    dept: "Dermatology",
    type: "Surgery",
    date: "06 March 2035",
    time: "08:00 - 11:00",
    status: "Scheduled",
  },
  {
    name: "Rendy Tan",
    id: "PT-2035-052",
    doctor: "Dr. Daniel Obeng",
    dept: "Orthopedics",
    type: "Follow-up",
    date: "06 March 2035",
    time: "15:30 - 16:00",
    status: "Canceled",
  },
  {
    name: "Sintya Wavy",
    id: "PT-2035-021",
    doctor: "Dr. Rusy Writes",
    dept: "Cardiology",
    type: "Surgery",
    date: "07 March 2035",
    time: "09:00 - 09:20",
    status: "Completed",
  },
];

const recentActivities = [
  {
    icon: UserPlus,
    title: "New patient profile created",
    desc: "for PT-2035-112",
    time: "3m ago",
  },
  {
    icon: CalendarIcon,
    title: "Appointment rescheduled",
    desc: "for #PT-2035-024 (Cardiology)",
    time: "15m ago",
  },
  {
    icon: FileText,
    title: "Discharge summary updated",
    desc: "for #PT-2035-089",
    time: "40m ago",
  },
  {
    icon: UserCheck,
    title: "New doctor added",
    desc: "Dr. Kevia Lim (Neurology)",
    time: "2h ago",
  },
  {
    icon: DollarSign,
    title: "Billing invoice generated",
    desc: "for #PT-2035-067",
    time: "3h ago",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-4 md:p-6 font-sans text-slate-800">
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
                <h3 className="text-2xl font-bold text-slate-900">24,580</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#EAF6F5] flex items-center justify-center text-[#2C8C89]">
                  <TrendingUp size={10} />
                </div>
                <span className="text-[#2C8C89] text-xs font-semibold">
                  +12% vs. yesterday
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
                <h3 className="text-2xl font-bold text-slate-900">8,340</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#EAF6F5] flex items-center justify-center text-[#2C8C89]">
                  <TrendingUp size={10} />
                </div>
                <span className="text-[#2C8C89] text-xs font-semibold">
                  +1.5% vs. last week
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
                <h3 className="text-2xl font-bold text-slate-900">1,275</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#EAF6F5] flex items-center justify-center text-[#2C8C89]">
                  <TrendingUp size={10} />
                </div>
                <span className="text-[#2C8C89] text-xs font-semibold">
                  +8% vs. yesterday
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
                    465
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

              <div className="w-full h-52">
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
                      {deptData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute text-center">
                  <div className="text-[11px] text-slate-400 font-medium">
                    All Patients
                  </div>
                  <div className="text-lg font-bold text-slate-900">8,340</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 text-xs">
                {deptData.map((dept) => (
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
                        {dept.value.toLocaleString()} Patients
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

              <div className="w-full h-44">
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
                {[
                  {
                    title: "Medication stock running low in Pharmacy",
                    id: "PT-2035-112",
                    time: "5m ago",
                  },
                  {
                    title: "System lag on Outpatient Registration",
                    id: "Elliana Marks (Front Desk)",
                    time: "18m ago",
                  },
                  {
                    title: "Air conditioning error in ICU ward",
                    id: "Eduardo Huarez (Maintenance)",
                    time: "Yesterday",
                  },
                  {
                    title: "Broken wheelchair near Emergency entrance",
                    id: "Andrew Feign (Hospital Staff)",
                    time: "Yesterday",
                  },
                ].map((report, i) => (
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
                          {report.id}
                        </span>
                        <button className="text-[11px] font-semibold text-[#2C8C89] hover:underline">
                          Details &gt;
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
                  {patientAppointments.map((row, i) => (
                    <tr
                      key={i}
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
                  ))}
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
              <h3 className="font-bold text-slate-900 text-sm">March 2035</h3>
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
              {[
                {
                  date: "17",
                  day: "Fri",
                  tag: "Meeting",
                  title: "Monthly Staff Meeting & Hospital Upd...",
                  time: "09:00 - 10:30",
                },
                {
                  date: "20",
                  day: "Mon",
                  tag: "Training",
                  title: "Industry Networking Night",
                  time: "14:00 - 16:00",
                },
                {
                  date: "28",
                  day: "Tue",
                  tag: "Review",
                  title: "Policy Review & Compliance Docume...",
                  time: "10:00 - 11:30",
                },
              ].map((item, i) => (
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
              ))}
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
                <div className="text-base font-bold text-slate-900">35</div>
                <div className="text-[11px] text-slate-400">All Doctor</div>
              </div>
              <div className="h-8 w-[1px] bg-slate-100"></div>
              <div>
                <div className="text-base font-bold text-slate-900">24</div>
                <div className="text-[11px] text-slate-400">Available</div>
              </div>
              <div className="h-8 w-[1px] bg-slate-100"></div>
              <div>
                <div className="text-base font-bold text-slate-900">11</div>
                <div className="text-[11px] text-slate-400">Unavailable</div>
              </div>
            </div>

            <div className="space-y-3.5">
              {[
                {
                  name: "Dr. Amelia Hart",
                  dept: "Cardiology",
                  status: "Available",
                  time: "08:00 - 12:00",
                },
                {
                  name: "Dr. Rizky Pratama",
                  dept: "General Medicine",
                  status: "Unavailable",
                  time: "-",
                },
                {
                  name: "Dr. Sophia Liang",
                  dept: "Pediatrics",
                  status: "Available",
                  time: "13:00 - 17:00",
                },
                {
                  name: "Dr. Daniel Obeng",
                  dept: "Orthopedics",
                  status: "Unavailable",
                  time: "-",
                },
                {
                  name: "Dr. Nina Alvarez",
                  dept: "Dermatology",
                  status: "Available",
                  time: "14:00 - 18:00",
                },
              ].map((doc, i) => (
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
              ))}
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
              {recentActivities.map((act, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#EAF6F5] text-[#2C8C89] flex items-center justify-center shrink-0 mt-0.5">
                    <act.icon size={14} />
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

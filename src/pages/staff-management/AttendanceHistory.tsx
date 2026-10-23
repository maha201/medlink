import React, { useState, useMemo, useEffect, useCallback } from "react";
import { History, Search, Download, Calendar, Filter, Loader2, RefreshCw } from "lucide-react";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

interface AttendanceHistoryRecord {
  id: string;
  date: string;
  staffId: string;
  staffName: string;
  role: string;
  department: string;
  status: "Present" | "Absent" | "Half-Day" | "On Leave";
  checkIn: string;
  checkOut: string;
  workingHours: string;
}

const mockHistoryData: AttendanceHistoryRecord[] = [
  {
    id: "H001",
    date: "2026-10-15",
    staffId: "EMP-001",
    staffName: "Dr. Arun Sharma",
    role: "Senior Consultant",
    department: "Cardiology",
    status: "Present",
    checkIn: "09:00 AM",
    checkOut: "05:00 PM",
    workingHours: "8.0 hrs",
  },
  {
    id: "H002",
    date: "2026-10-15",
    staffId: "EMP-002",
    staffName: "Divya Ramesh",
    role: "Cashier",
    department: "Finance & Billing",
    status: "Present",
    checkIn: "08:15 AM",
    checkOut: "04:30 PM",
    workingHours: "8.25 hrs",
  },
  {
    id: "H003",
    date: "2026-10-14",
    staffId: "EMP-001",
    staffName: "Dr. Arun Sharma",
    role: "Senior Consultant",
    department: "Cardiology",
    status: "Present",
    checkIn: "09:05 AM",
    checkOut: "05:10 PM",
    workingHours: "8.08 hrs",
  },
  {
    id: "H004",
    date: "2026-10-14",
    staffId: "EMP-003",
    staffName: "Karthik Raja",
    role: "Pharmacist",
    department: "Pharmacy",
    status: "Half-Day",
    checkIn: "09:00 AM",
    checkOut: "01:00 PM",
    workingHours: "4.0 hrs",
  },
  {
    id: "H005",
    date: "2026-10-13",
    staffId: "EMP-002",
    staffName: "Divya Ramesh",
    role: "Cashier",
    department: "Finance & Billing",
    status: "Absent",
    checkIn: "-",
    checkOut: "-",
    workingHours: "0 hrs",
  },
  {
    id: "H006",
    date: "2026-10-13",
    staffId: "EMP-003",
    staffName: "Karthik Raja",
    role: "Pharmacist",
    department: "Pharmacy",
    status: "On Leave",
    checkIn: "-",
    checkOut: "-",
    workingHours: "0 hrs",
  },
];

export default function AttendanceHistory() {
  const currentMonthStr = new Date().toISOString().substring(0, 7);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(currentMonthStr);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [records, setRecords] = useState<AttendanceHistoryRecord[]>(mockHistoryData);
  const [loading, setLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        month: selectedMonth,
        status: selectedStatus,
        search: searchTerm,
      });

      const res = await apiFetch(
        `${API_ENDPOINTS.hospitalStaffAttendance}?${queryParams.toString()}`,
        { method: "GET" }
      );
      const data = typeof res?.json === "function" ? await res.json() : res;

      if (data?.data && Array.isArray(data.data)) {
        setRecords(data.data);
      }
    } catch (err) {
      console.error("Failed to load attendance history:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedMonth, selectedStatus, searchTerm]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleExport = () => {
    if (records.length === 0) {
      alert("No records to export.");
      return;
    }
    const headers = ["Date", "EMP ID", "Staff Name", "Department", "Check-In", "Check-Out", "Working Hours", "Status"];
    const rows = records.map((r) => [
      r.date,
      r.staffId,
      `"${r.staffName.replace(/"/g, '""')}"`,
      `"${r.department.replace(/"/g, '""')}"`,
      r.checkIn,
      r.checkOut,
      r.workingHours,
      r.status,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_report_${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* FILTER CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#f5f7f8] p-3.5 rounded-xl border border-[#dde5e7]">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {/* Search Field */}
          <div className="relative w-full sm:w-56">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]"
              size={14}
            />
            <input
              type="text"
              placeholder="Search employee or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#dde5e7] rounded-lg text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898]"
            />
          </div>

          {/* Month Selector */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 border border-[#dde5e7] rounded-lg text-xs text-[#5a6a76]">
            <Calendar size={14} className="text-[#3a9898]" />
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 border border-[#dde5e7] rounded-lg text-xs text-[#5a6a76]">
            <Filter size={14} className="text-[#3a9898]" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent font-semibold text-xs focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Present">Present</option>
              <option value="Half-Day">Half-Day</option>
              <option value="Absent">Absent</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchHistory()}
            title="Refresh History"
            className="p-1.5 bg-white border border-[#dde5e7] hover:bg-[#eaf6f5] text-[#3a9898] rounded-lg transition-all shadow-sm"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-[#dde5e7] hover:bg-[#eaf6f5] text-[#3a9898] text-xs font-bold rounded-lg transition-all shadow-sm"
          >
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* HISTORY TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#dde5e7] text-[#8b9bae]">
              <th className="pb-3 px-2">Date</th>
              <th className="pb-3 px-2">EMP ID</th>
              <th className="pb-3 px-2">Staff Name</th>
              <th className="pb-3 px-2">Department</th>
              <th className="pb-3 px-2">Check-In</th>
              <th className="pb-3 px-2">Check-Out</th>
              <th className="pb-3 px-2">Working Hours</th>
              <th className="pb-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f5]">
            {loading ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-[#8b9bae]">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin text-[#3a9898]" />
                    <span>Loading attendance records...</span>
                  </div>
                </td>
              </tr>
            ) : records.length > 0 ? (
              records.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-[#f5f7f8] transition-colors"
                >
                  <td className="py-3 px-2 font-mono text-[#8b9bae]">
                    {record.date}
                  </td>
                  <td className="py-3 px-2 font-mono font-bold text-[#3a9898]">
                    {record.staffId}
                  </td>
                  <td className="py-3 px-2 font-bold text-[#1a2632]">
                    {record.staffName}
                  </td>
                  <td className="py-3 px-2 text-[#5a6a76]">
                    {record.department}
                  </td>
                  <td className="py-3 px-2 font-mono text-[#5a6a76]">
                    {record.checkIn}
                  </td>
                  <td className="py-3 px-2 font-mono text-[#5a6a76]">
                    {record.checkOut}
                  </td>
                  <td className="py-3 px-2 font-mono font-semibold text-[#1a2632]">
                    {record.workingHours}
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        record.status === "Present"
                          ? "bg-emerald-50 text-emerald-600"
                          : record.status === "Half-Day"
                            ? "bg-purple-50 text-purple-700"
                            : record.status === "On Leave"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-[#8b9bae]">
                  No attendance history records found for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

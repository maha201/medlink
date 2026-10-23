import React, { useState, useEffect, useCallback } from "react";
import {
  CalendarCheck,
  ChevronDown,
  X,
  CheckCircle2,
  Calendar,
  Clock,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

interface AttendanceRecord {
  id: string;
  name: string;
  role: string;
  status: "Present" | "Absent" | "Half-Day" | "On Leave" | "Long Leave";
  checkIn: string;
  checkOut: string;
  leaveStartDate?: string;
  leaveEndDate?: string;
  leaveReason?: string;
}

const defaultStaffAttendance: AttendanceRecord[] = [
  {
    id: "1",
    name: "Dr. Arun Sharma",
    role: "Senior Consultant",
    status: "Present",
    checkIn: "09:00",
    checkOut: "17:00",
  },
  {
    id: "2",
    name: "Divya Ramesh",
    role: "Cashier",
    status: "Present",
    checkIn: "08:15",
    checkOut: "16:30",
  },
  {
    id: "3",
    name: "Karthik Raja",
    role: "Pharmacist",
    status: "Long Leave",
    checkIn: "",
    checkOut: "",
    leaveStartDate: "2026-10-15",
    leaveEndDate: "2026-10-25",
    leaveReason: "Annual Family Vacation",
  },
  {
    id: "4",
    name: "Dr. Kavitha",
    role: "Pediatrician",
    status: "Absent",
    checkIn: "",
    checkOut: "",
  },
];

export default function AttendanceLeave() {
  const [attendanceList, setAttendanceList] =
    useState<AttendanceRecord[]>(defaultStaffAttendance);
  const [loading, setLoading] = useState(false);

  // Long Leave Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<AttendanceRecord | null>(
    null,
  );
  const [leaveData, setLeaveData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const todayDate = new Date().toISOString().split("T")[0];

  const fetchDailyAttendance = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch(
        `${API_ENDPOINTS.hospitalStaffAttendance}?date=${todayDate}`,
        { method: "GET" },
      );
      const data = typeof res?.json === "function" ? await res.json() : res;

      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        setAttendanceList(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch daily staff attendance:", err);
    } finally {
      setLoading(false);
    }
  }, [todayDate]);

  useEffect(() => {
    fetchDailyAttendance();
  }, [fetchDailyAttendance]);

  // Persist single attendance record to backend
  const persistAttendance = async (record: AttendanceRecord) => {
    try {
      await apiFetch(API_ENDPOINTS.hospitalStaffAttendance, {
        method: "POST",
        body: JSON.stringify({
          staffId: record.id,
          date: todayDate,
          status: record.status,
          checkIn: record.checkIn,
          checkOut: record.checkOut,
          leaveStartDate: record.leaveStartDate,
          leaveEndDate: record.leaveEndDate,
          leaveReason: record.leaveReason,
        }),
      });
    } catch (err) {
      console.error("Failed to persist attendance:", err);
    }
  };

  // Handle status selection change from dropdown
  const handleStatusChange = (
    staff: AttendanceRecord,
    newStatus: AttendanceRecord["status"],
  ) => {
    if (newStatus === staff.status) {
      persistAttendance(staff);
      return;
    }

    if (newStatus === "Long Leave") {
      setSelectedStaff(staff);
      setLeaveData({
        startDate: staff.leaveStartDate || todayDate,
        endDate: staff.leaveEndDate || "",
        reason: staff.leaveReason || "",
      });
      setIsModalOpen(true);
      return;
    }

    const isWorking = newStatus === "Present" || newStatus === "Half-Day";
    const updatedRecord: AttendanceRecord = {
      ...staff,
      status: newStatus,
      checkIn: isWorking ? staff.checkIn || "09:00" : "",
      checkOut: isWorking ? staff.checkOut || (newStatus === "Half-Day" ? "13:00" : "17:00") : "",
      leaveStartDate: undefined,
      leaveEndDate: undefined,
      leaveReason: undefined,
    };

    setAttendanceList((prev) =>
      prev.map((item) => (item.id === staff.id ? updatedRecord : item)),
    );

    persistAttendance(updatedRecord);
  };

  // Submit Long Leave Details
  const handleLongLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff) return;

    const updatedRecord: AttendanceRecord = {
      ...selectedStaff,
      status: "Long Leave",
      checkIn: "",
      checkOut: "",
      leaveStartDate: leaveData.startDate,
      leaveEndDate: leaveData.endDate,
      leaveReason: leaveData.reason,
    };

    setAttendanceList((prev) =>
      prev.map((item) =>
        item.id === selectedStaff.id ? updatedRecord : item,
      ),
    );

    persistAttendance(updatedRecord);
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  // Time change handler
  const handleTimeChange = (
    id: string,
    field: "checkIn" | "checkOut",
    value: string,
  ) => {
    setAttendanceList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
    const target = attendanceList.find((item) => item.id === id);
    if (target) persistAttendance({ ...target, [field]: value });
  };

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all placeholder:text-[#b0bec8]";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      {/* Attendance Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden p-6">
        <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
          <div>
            <h3 className="text-base font-bold text-[#1a2632] flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#eaf6f5] text-[#3a9898] flex items-center justify-center">
                <CalendarCheck size={18} />
              </div>
              Staff Attendance & Time Register
            </h3>
            <p className="text-xs text-[#8b9bae] mt-0.5">
              Manage daily presence, timings, one-day leave, and long-term
              leaves.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#dde5e7] text-[#8b9bae] bg-[#f8fafb]">
                <th className="py-3 px-4 font-semibold">Staff Name</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Current Status</th>
                <th className="py-3 px-4 font-semibold">
                  Leave Details / Duration
                </th>
                <th className="py-3 px-4 font-semibold">Check-In</th>
                <th className="py-3 px-4 font-semibold">Check-Out</th>
                <th className="py-3 px-4 font-semibold text-right">
                  Status Control
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f5]">
              {attendanceList.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#f5f7f8] transition-colors"
                >
                  <td className="py-4 px-4 font-bold text-[#1a2632]">
                    {item.name}
                  </td>
                  <td className="py-4 px-4 text-[#5a6a76] font-medium">
                    {item.role}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-md font-bold text-[11px] inline-flex items-center gap-1.5 border ${
                        item.status === "Present"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : item.status === "Half-Day"
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : item.status === "On Leave"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : item.status === "Long Leave"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Leave Details / Duration Column */}
                  <td className="py-4 px-4 text-[#5a6a76]">
                    {item.status === "Long Leave" && item.leaveStartDate ? (
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-[#1a2632] flex items-center gap-1">
                          <Calendar size={12} className="text-[#3a9898]" />
                          {item.leaveStartDate} to {item.leaveEndDate}
                        </span>
                        {item.leaveReason && (
                          <span className="text-[10.5px] text-[#8b9bae] italic">
                            "{item.leaveReason}"
                          </span>
                        )}
                      </div>
                    ) : item.status === "On Leave" ? (
                      <span className="text-[11px] text-amber-700 font-medium">
                        1-Day Leave Today
                      </span>
                    ) : (
                      <span className="text-[#c4d1d9]">—</span>
                    )}
                  </td>

                  {/* Check-in Time */}
                  <td className="py-4 px-4">
                    <input
                      type="time"
                      disabled={
                        item.status === "Absent" ||
                        item.status === "On Leave" ||
                        item.status === "Long Leave"
                      }
                      value={item.checkIn}
                      onChange={(e) =>
                        handleTimeChange(item.id, "checkIn", e.target.value)
                      }
                      className="px-3 py-1.5 bg-[#f5f7f8] border border-[#dde5e7] rounded-lg text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] disabled:opacity-40 cursor-pointer"
                    />
                  </td>

                  {/* Check-out Time */}
                  <td className="py-4 px-4">
                    <input
                      type="time"
                      disabled={
                        item.status === "Absent" ||
                        item.status === "On Leave" ||
                        item.status === "Long Leave"
                      }
                      value={item.checkOut}
                      onChange={(e) =>
                        handleTimeChange(item.id, "checkOut", e.target.value)
                      }
                      className="px-3 py-1.5 bg-[#f5f7f8] border border-[#dde5e7] rounded-lg text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] disabled:opacity-40 cursor-pointer"
                    />
                  </td>

                  {/* Status Dropdown Selector */}
                  <td className="py-4 px-4 text-right">
                    <div className="relative inline-block">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(
                            item,
                            e.target.value as AttendanceRecord["status"],
                          )
                        }
                        onClick={(e) => {
                          const sel = e.currentTarget;
                          // force onChange to fire even if same option re-selected
                          sel.value = "";
                          requestAnimationFrame(() => { sel.value = item.status; });
                        }}
                        className="appearance-none px-3.5 py-1.5 pr-8 bg-[#f5f7f8] hover:bg-[#eaf6f5] text-[#5a6a76] hover:text-[#3a9898] text-xs font-semibold rounded-lg transition-colors border border-[#dde5e7] hover:border-[#b5d9d5] focus:outline-none cursor-pointer"
                      >
                        <option value="Present">Present</option>
                        <option value="Half-Day">Half-Day</option>
                        <option value="On Leave">On Leave (1 Day)</option>
                        <option value="Long Leave">
                          Long Leave (Multi-Day)
                        </option>
                        <option value="Absent">Absent</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8b9bae] pointer-events-none"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Long Leave Modal Window ── */}
      {isModalOpen && selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white w-full max-w-[500px] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed] animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 flex items-start justify-between shrink-0 border-b border-[#f0f4f5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#eaf6f5] flex items-center justify-center shrink-0">
                  <Calendar size={18} className="text-[#3a9898]" />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-[#1a2632]">
                    Long Leave Details - {selectedStaff.name}
                  </h2>
                  <p className="text-[11.5px] text-[#8b9bae]">
                    Specify the date range and reason for multi-day absence.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae] hover:text-[#1a2632] transition-colors shrink-0 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form
              id="long-leave-form"
              onSubmit={handleLongLeaveSubmit}
              className="px-6 py-5 space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    className={inputCls}
                    value={leaveData.startDate}
                    onChange={(e) =>
                      setLeaveData({ ...leaveData, startDate: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className={labelCls}>
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    className={inputCls}
                    value={leaveData.endDate}
                    onChange={(e) =>
                      setLeaveData({ ...leaveData, endDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Reason for Long Leave</label>
                <textarea
                  rows={3}
                  className={`${inputCls} resize-none`}
                  placeholder="e.g. Annual Vacation, Medical Leave, Personal work..."
                  value={leaveData.reason}
                  onChange={(e) =>
                    setLeaveData({ ...leaveData, reason: e.target.value })
                  }
                />
              </div>
            </form>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#f0f4f5] flex items-center justify-between bg-white rounded-b-[20px]">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[12px] font-semibold text-[#8b9bae] hover:text-[#e11d48] px-4 py-2 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="long-leave-form"
                className="flex items-center gap-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#3a9898]/20 cursor-pointer"
              >
                <CheckCircle2 size={15} /> Save Long Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

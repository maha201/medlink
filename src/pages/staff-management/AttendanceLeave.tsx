import React, { useState } from "react";
import { CalendarCheck, Check, X, Clock, Calendar, Save } from "lucide-react";

interface AttendanceRecord {
  id: string;
  name: string;
  role: string;
  status: "Present" | "Absent" | "Half-Day" | "On Leave";
  checkIn: string;
  checkOut: string;
}

interface LeaveRequest {
  id: string;
  name: string;
  type: string;
  dates: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const initialAttendance: AttendanceRecord[] = [
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
    status: "On Leave",
    checkIn: "",
    checkOut: "",
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

const initialLeaves: LeaveRequest[] = [
  {
    id: "1",
    name: "Karthik Raja",
    type: "Casual Leave",
    dates: "Oct 15 - Oct 16",
    reason: "Personal family event",
    status: "Approved",
  },
  {
    id: "2",
    name: "Divya Ramesh",
    type: "Sick Leave",
    dates: "Oct 20",
    reason: "Medical checkup",
    status: "Pending",
  },
];

export default function AttendanceLeave() {
  const [attendanceList, setAttendanceList] =
    useState<AttendanceRecord[]>(initialAttendance);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(initialLeaves);

  // Manual status change handler
  const handleStatusChange = (
    id: string,
    newStatus: AttendanceRecord["status"],
  ) => {
    setAttendanceList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isWorking = newStatus === "Present" || newStatus === "Half-Day";
          return {
            ...item,
            status: newStatus,
            checkIn: isWorking ? item.checkIn || "09:00" : "",
            checkOut: isWorking ? item.checkOut || "17:00" : "",
          };
        }
        return item;
      }),
    );
  };

  // Manual Check-in / Check-out time change handler
  const handleTimeChange = (
    id: string,
    field: "checkIn" | "checkOut",
    value: string,
  ) => {
    setAttendanceList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  // Handle leave approval / rejection
  const handleLeaveAction = (id: string, decision: "Approved" | "Rejected") => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status: decision } : leave,
      ),
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Attendance Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-[#1a2632] flex items-center gap-1.5">
            <CalendarCheck size={16} className="text-[#3a9898]" /> Manual
            Attendance & Time Register
          </h3>
          <span className="text-[11px] text-[#8b9bae] font-medium">
            Manually adjust status and Check-In / Check-Out times
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#dde5e7] text-[#8b9bae]">
                <th className="pb-3 px-2">Staff Name</th>
                <th className="pb-3 px-2">Role</th>
                <th className="pb-3 px-2">Current Status</th>
                <th className="pb-3 px-2">Manual Check-In</th>
                <th className="pb-3 px-2">Manual Check-Out</th>
                <th className="pb-3 px-2 text-right">
                  Attendance Status Controls
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f5]">
              {attendanceList.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#f5f7f8] transition-colors"
                >
                  <td className="py-3 px-2 font-bold text-[#1a2632]">
                    {item.name}
                  </td>
                  <td className="py-3 px-2 text-[#5a6a76]">{item.role}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[10px] inline-flex items-center gap-1 ${
                        item.status === "Present"
                          ? "bg-emerald-50 text-emerald-600"
                          : item.status === "Half-Day"
                            ? "bg-purple-50 text-purple-700"
                            : item.status === "On Leave"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  {/* Manual Check-in Time Input */}
                  <td className="py-3 px-2">
                    <input
                      type="time"
                      disabled={
                        item.status === "Absent" || item.status === "On Leave"
                      }
                      value={item.checkIn}
                      onChange={(e) =>
                        handleTimeChange(item.id, "checkIn", e.target.value)
                      }
                      className="px-2 py-1 bg-[#f5f7f8] border border-[#dde5e7] rounded text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] disabled:opacity-40"
                    />
                  </td>
                  {/* Manual Check-out Time Input */}
                  <td className="py-3 px-2">
                    <input
                      type="time"
                      disabled={
                        item.status === "Absent" || item.status === "On Leave"
                      }
                      value={item.checkOut}
                      onChange={(e) =>
                        handleTimeChange(item.id, "checkOut", e.target.value)
                      }
                      className="px-2 py-1 bg-[#f5f7f8] border border-[#dde5e7] rounded text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] disabled:opacity-40"
                    />
                  </td>
                  {/* Attendance Controls */}
                  <td className="py-3 px-2 text-right space-x-1">
                    <button
                      onClick={() => handleStatusChange(item.id, "Present")}
                      className={`px-2.5 py-1 rounded font-bold text-[10px] transition-all ${
                        item.status === "Present"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.id, "Half-Day")}
                      className={`px-2.5 py-1 rounded font-bold text-[10px] transition-all ${
                        item.status === "Half-Day"
                          ? "bg-purple-600 text-white shadow-sm"
                          : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                      }`}
                    >
                      Half-Day
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.id, "Absent")}
                      className={`px-2.5 py-1 rounded font-bold text-[10px] transition-all ${
                        item.status === "Absent"
                          ? "bg-rose-600 text-white shadow-sm"
                          : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                      }`}
                    >
                      Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Requests Section */}
      <div className="space-y-3 pt-4 border-t border-[#dde5e7]">
        <h3 className="text-xs font-bold text-[#1a2632] flex items-center gap-1.5">
          <Calendar size={16} className="text-[#3a9898]" /> Staff Leave Requests
          & Approvals
        </h3>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#dde5e7] text-[#8b9bae]">
              <th className="pb-3">Staff Name</th>
              <th className="pb-3">Leave Type</th>
              <th className="pb-3">Requested Dates</th>
              <th className="pb-3">Reason</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f5]">
            {leaves.map((leave) => (
              <tr
                key={leave.id}
                className="hover:bg-[#f5f7f8] transition-colors"
              >
                <td className="py-3 font-bold text-[#1a2632]">{leave.name}</td>
                <td className="py-3 font-semibold text-[#3a9898]">
                  {leave.type}
                </td>
                <td className="py-3 text-[#5a6a76]">{leave.dates}</td>
                <td className="py-3 text-[#8b9bae]">{leave.reason}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      leave.status === "Approved"
                        ? "bg-emerald-50 text-emerald-600"
                        : leave.status === "Rejected"
                          ? "bg-rose-50 text-rose-600"
                          : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {leave.status}
                  </span>
                </td>
                <td className="py-3 text-right space-x-1">
                  {leave.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleLeaveAction(leave.id, "Approved")}
                        title="Approve Leave"
                        className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded transition-colors"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => handleLeaveAction(leave.id, "Rejected")}
                        title="Reject Leave"
                        className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <span className="text-[10px] text-[#8b9bae] font-medium">
                      Processed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

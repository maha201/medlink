import React from "react";
import { Users, UserCheck, UserX, Calendar, Clock } from "lucide-react";

export default function StaffOverview() {
  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* 4 COMPACT SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-[#f5f7f8] p-4 rounded-xl border border-[#dde5e7] space-y-1">
          <p className="text-[11px] font-bold text-[#8b9bae]">Total Staff</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-black text-[#1a2632]">24</h3>
            <Users size={16} className="text-[#3a9898]" />
          </div>
          <p className="text-[10px] text-[#5a6a76]">Registered in clinic</p>
        </div>

        <div className="bg-[#f5f7f8] p-4 rounded-xl border border-[#dde5e7] space-y-1">
          <p className="text-[11px] font-bold text-[#8b9bae]">Active Staff</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-black text-emerald-600">22</h3>
            <UserCheck size={16} className="text-emerald-600" />
          </div>
          <p className="text-[10px] text-[#5a6a76]">Active accounts</p>
        </div>

        <div className="bg-[#f5f7f8] p-4 rounded-xl border border-[#dde5e7] space-y-1">
          <p className="text-[11px] font-bold text-[#8b9bae]">Present Today</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-black text-[#3a9898]">20</h3>
            <Clock size={16} className="text-[#3a9898]" />
          </div>
          <p className="text-[10px] text-[#5a6a76]">Checked in on time</p>
        </div>

        <div className="bg-[#f5f7f8] p-4 rounded-xl border border-[#dde5e7] space-y-1">
          <p className="text-[11px] font-bold text-[#8b9bae]">On Leave Today</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-black text-amber-600">2</h3>
            <Calendar size={16} className="text-amber-600" />
          </div>
          <p className="text-[10px] text-[#5a6a76]">Approved leave</p>
        </div>
      </div>

      {/* RECENT STAFF & ATTENDANCE SNIPPET */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-[#f5f7f8] p-4 rounded-xl border border-[#dde5e7] space-y-3">
          <h3 className="text-xs font-bold text-[#1a2632]">
            Recent Staff Members
          </h3>
          <div className="space-y-2">
            {[
              {
                name: "Dr. Arun Sharma",
                role: "Senior Consultant",
                dept: "Cardiology",
              },
              {
                name: "Divya Ramesh",
                role: "Cashier",
                dept: "Finance & Billing",
              },
              { name: "Karthik Raja", role: "Pharmacist", dept: "Pharmacy" },
            ].map((staff, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-lg border border-[#dde5e7] flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-[#1a2632]">{staff.name}</p>
                  <p className="text-[10px] text-[#8b9bae]">
                    {staff.role} • {staff.dept}
                  </p>
                </div>
                <span className="px-2 py-0.5 bg-[#eaf6f5] text-[#3a9898] font-bold rounded text-[10px]">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#f5f7f8] p-4 rounded-xl border border-[#dde5e7] space-y-3">
          <h3 className="text-xs font-bold text-[#1a2632]">
            Today's Attendance Status
          </h3>
          <div className="space-y-2">
            {[
              { name: "Dr. Arun Sharma", time: "09:00 AM", status: "Present" },
              { name: "Divya Ramesh", time: "08:15 AM", status: "Present" },
              { name: "Karthik Raja", time: "-", status: "On Leave" },
            ].map((att, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-lg border border-[#dde5e7] flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-[#1a2632]">{att.name}</p>
                  <p className="text-[10px] text-[#8b9bae]">
                    Check-in: {att.time}
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 font-bold rounded text-[10px] ${att.status === "Present" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-700"}`}
                >
                  {att.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

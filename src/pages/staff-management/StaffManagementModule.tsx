import React, { useState } from "react";
import {
  Users,
  LayoutDashboard,
  UserCheck,
  CalendarCheck,
  History,
  Building,
  RefreshCw,
  Loader2,
  Plus,
} from "lucide-react";

import StaffOverview from "./StaffOverview";
import StaffDirectory from "./StaffDirectory";
import AttendanceLeave from "./AttendanceLeave";
import AttendanceHistory from "./AttendanceHistory";
import DepartmentsDesignations from "./DepartmentsDesignations";

type StaffTab =
  | "Overview"
  // | "Staff Directory"
  | "Attendance"
  | "Attendance History";
// | "Departments & Designations";

export default function StaffManagementModule() {
  const [activeTab, setActiveTab] = useState<StaffTab>("Overview");
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="animate-in fade-in duration-300 space-y-4 font-sans">
      {/* PAGE HEADER */}

      {/* HORIZONTAL IN-PAGE TABS */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        <div className="flex items-center px-4 py-2.5 border-b border-[#dde5e7] gap-2 overflow-x-auto bg-[#f5f7f8]">
          {[
            { id: "Overview", label: "Overview", icon: LayoutDashboard },
            // {
            //   id: "Staff Directory",
            //   label: "Staff Directory",
            //   icon: UserCheck,
            // },
            {
              id: "Attendance",
              label: "Daily Attendance",
              icon: CalendarCheck,
            },
            {
              id: "Attendance History",
              label: "Attendance History",
              icon: History,
            },
            // {
            //   id: "Departments & Designations",
            //   label: "Departments & Designations",
            //   icon: Building,
            // },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as StaffTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-white text-[#3a9898] shadow-sm border border-[#dde5e7]"
                    : "text-[#5a6a76] hover:text-[#1a2632] hover:bg-white/60"
                }`}
              >
                <Icon
                  size={14}
                  className={isActive ? "text-[#3a9898]" : "text-[#8b9bae]"}
                />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* WORKSPACE CONTENT AREA */}
        <div className="p-5 min-h-[350px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-[#8b9bae] gap-2.5">
              <Loader2 size={28} className="animate-spin text-[#3a9898]" />
              <p className="text-xs font-semibold">
                Loading staff workspace...
              </p>
            </div>
          ) : (
            <div>
              {activeTab === "Overview" && <StaffOverview />}
              {/* {activeTab === "Staff Directory" && <StaffDirectory />} */}
              {activeTab === "Attendance" && <AttendanceLeave />}
              {activeTab === "Attendance History" && <AttendanceHistory />}
              {/* {activeTab === "Departments & Designations" && (
                <DepartmentsDesignations />
              )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

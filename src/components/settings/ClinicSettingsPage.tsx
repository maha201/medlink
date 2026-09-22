import { useState } from "react";
import {
  Building2,
  Clock,
  Calendar,
  Receipt,
  Settings,
  ShieldCheck,
  ChevronRight,
  Info,
  Sparkles,
} from "lucide-react";

import ClinicProfileTab from "./tabs/ClinicProfileTab";
import WorkingHoursTab from "./tabs/WorkingHoursTab";
import AppointmentSettingsTab from "./tabs/AppointmentSettingsTab";
import BillingPrescriptionTab from "./tabs/BillingPrescriptionTab";
import GeneralSettingsTab from "./tabs/GeneralSettingsTab";

const TABS = [
  {
    id: "profile",
    label: "Clinic Profile",
    description: "Logo, contact details, address & GST",
    icon: Building2,
  },
  {
    id: "working_hours",
    label: "Working Hours & Services",
    description: "Opd timings, holidays & service fees",
    icon: Clock,
  },
  {
    id: "appointments",
    label: "Appointment Settings",
    description: "Slot duration, advance booking & rules",
    icon: Calendar,
  },
  {
    id: "billing",
    label: "Billing & Prescription",
    description: "Invoice numbers, payment modes & Rx print",
    icon: Receipt,
  },
  {
    id: "general",
    label: "General Settings",
    description: "Patient ID format, language & security",
    icon: Settings,
  },
];

export default function ClinicSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Page Header */}
        <div className="p-6 border-b border-[#dde5e7] bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-[#1a2632]">
                  Clinic Settings
                </h2>
                <span className="bg-[#eaf6f5] text-[#3a9898] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#c4e4e0] flex items-center gap-1">
                  <Sparkles size={11} /> Master Config
                </span>
              </div>
              <p className="text-xs text-[#8b9bae] mt-1">
                Configure your hospital profile, consultation fees, print
                headers, and software preferences.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-[#f8fafb] px-4 py-2 rounded-xl border border-[#dde5e7] text-[#5a6a76] text-xs font-semibold">
              <ShieldCheck size={16} className="text-[#3a9898]" />
              <span>Admin Privileges Active</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation + Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
          {/* Left Vertical Navigation Panel */}
          <div className="lg:col-span-4 xl:col-span-3 border-r border-[#dde5e7] bg-[#f8fafb] p-4 flex flex-col justify-between">
            {/* Top Section - Navigation Tabs */}
            <div className="space-y-2">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8b9bae] px-2 mb-3">
                Configuration Menu
              </p>

              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full group text-left p-3.5 rounded-xl transition-all relative flex items-center justify-between border ${
                      isActive
                        ? "bg-white border-[#3a9898]/30 shadow-sm"
                        : "border-transparent hover:bg-white/80 hover:border-[#dde5e7]"
                    }`}
                  >
                    {/* Active Left Indicator Bar */}
                    {isActive && (
                      <div className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-[#3a9898] rounded-r-full" />
                    )}

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                          isActive
                            ? "bg-[#3a9898] text-white shadow-sm shadow-[#3a9898]/30"
                            : "bg-[#eaf6f5]/60 text-[#3a9898] group-hover:bg-[#eaf6f5]"
                        }`}
                      >
                        <Icon size={18} />
                      </div>

                      <div>
                        <h4
                          className={`text-xs font-bold transition-colors ${
                            isActive
                              ? "text-[#1a2632]"
                              : "text-[#5a6a76] group-hover:text-[#1a2632]"
                          }`}
                        >
                          {tab.label}
                        </h4>
                        <p className="text-[10.5px] text-[#8b9bae] line-clamp-1 mt-0.5 font-normal">
                          {tab.description}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={15}
                      className={`transition-transform duration-200 ${
                        isActive
                          ? "text-[#3a9898] translate-x-0.5"
                          : "text-[#b0bec8] opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Bottom Card - Visual Filler & Help Widget */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-[#eaf6f5] to-[#f2faf9] border border-[#c4e4e0] space-y-2">
              <div className="flex items-center gap-2 text-[#3a9898]">
                <Info size={16} />
                <span className="text-xs font-bold">Need Help Setting Up?</span>
              </div>
              <p className="text-[11px] text-[#5a6a76] leading-relaxed">
                Changes saved here reflect instantly across Rx printouts,
                billing, and patient portals.
              </p>
              <div className="pt-1">
                <span className="text-[10px] font-bold text-[#3a9898] uppercase tracking-wider bg-white/80 px-2 py-1 rounded-md border border-[#c4e4e0]/60 inline-block">
                  Auto-Sync Enabled
                </span>
              </div>
            </div>
          </div>

          {/* Right Main Content Tab View */}
          <div className="lg:col-span-8 xl:col-span-9 p-6 bg-white">
            {activeTab === "profile" && <ClinicProfileTab />}
            {activeTab === "working_hours" && <WorkingHoursTab />}
            {activeTab === "appointments" && <AppointmentSettingsTab />}
            {activeTab === "billing" && <BillingPrescriptionTab />}
            {activeTab === "general" && <GeneralSettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

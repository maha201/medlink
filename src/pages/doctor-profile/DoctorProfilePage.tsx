import React, { useState, useEffect } from "react";
import {
  User,
  Phone,
  Mail,
  Stethoscope,
  Clock,
  Video,
  Building2,
  Save,
  CheckCircle2,
  Copy,
  Sparkles,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api"; // Existing helper path Check pannikonga

export interface DaySlot {
  day: string;
  isAvailable: boolean;
  opdStart: string;
  opdEnd: string;
  videoStart: string;
  videoEnd: string;
}

export interface DoctorProfileData {
  id?: string;
  name: string;
  specialization: string;
  qualification: string;
  phone: string;
  email: string;
  experienceYears: number;
  registrationNo: string;
  slotDurationMins: number;
}

const defaultDays: DaySlot[] = [
  {
    day: "Monday",
    isAvailable: true,
    opdStart: "09:00",
    opdEnd: "13:00",
    videoStart: "16:00",
    videoEnd: "18:00",
  },
  {
    day: "Tuesday",
    isAvailable: true,
    opdStart: "09:00",
    opdEnd: "13:00",
    videoStart: "16:00",
    videoEnd: "18:00",
  },
  {
    day: "Wednesday",
    isAvailable: true,
    opdStart: "09:00",
    opdEnd: "13:00",
    videoStart: "16:00",
    videoEnd: "18:00",
  },
  {
    day: "Thursday",
    isAvailable: true,
    opdStart: "09:00",
    opdEnd: "13:00",
    videoStart: "16:00",
    videoEnd: "18:00",
  },
  {
    day: "Friday",
    isAvailable: true,
    opdStart: "09:00",
    opdEnd: "13:00",
    videoStart: "16:00",
    videoEnd: "18:00",
  },
  {
    day: "Saturday",
    isAvailable: true,
    opdStart: "09:00",
    opdEnd: "13:00",
    videoStart: "14:00",
    videoEnd: "16:00",
  },
  {
    day: "Sunday",
    isAvailable: false,
    opdStart: "09:00",
    opdEnd: "12:00",
    videoStart: "14:00",
    videoEnd: "16:00",
  },
];

export default function DoctorProfilePage() {
  const [profile, setProfile] = useState<DoctorProfileData>({
    name: "",
    specialization: "",
    qualification: "",
    phone: "",
    email: "",
    experienceYears: 0,
    registrationNo: "",
    slotDurationMins: 15,
  });

  const [schedule, setSchedule] = useState<DaySlot[]>(defaultDays);
  const [activeTabDay, setActiveTabDay] = useState<string>("Monday");

  // Status & Feedback States
  const [loading, setLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Initial Data Fetching via apiFetch Standard
  useEffect(() => {
    const fetchDoctorProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint =
          API_ENDPOINTS.hospitalDoctorProfile || "/hospital/doctor-profile";
        const response = await apiFetch(endpoint, { method: "GET" });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || "Failed to fetch doctor profile.",
          );
        }

        const data = await response.json();
        const payload = data.data || data;

        if (payload.profile) {
          setProfile({
            id: payload.profile.id,
            name: payload.profile.name || "",
            specialization: payload.profile.specialization || "",
            qualification: payload.profile.qualification || "",
            phone: payload.profile.phone || "",
            email: payload.profile.email || "",
            experienceYears: Number(payload.profile.experienceYears) || 0,
            registrationNo: payload.profile.registrationNo || "",
            slotDurationMins: Number(payload.profile.slotDurationMins) || 15,
          });
        }

        if (payload.schedule && Array.isArray(payload.schedule)) {
          setSchedule(payload.schedule);
        }
      } catch (err: any) {
        setError(
          err.message || "Error occurred while fetching doctor details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, []);

  // 2. Form Submission & Save API Call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const endpoint =
      API_ENDPOINTS.hospitalDoctorProfile || "/hospital/doctor-profile";

    try {
      const response = await apiFetch(endpoint, {
        method: "PUT",
        body: JSON.stringify({
          profile,
          schedule,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to save profile settings.",
        );
      }

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err: any) {
      setError(
        err.message || "Something went wrong while saving doctor settings.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const updateSchedule = (
    dayName: string,
    field: keyof DaySlot,
    value: any,
  ) => {
    setSchedule((prev) =>
      prev.map((s) => (s.day === dayName ? { ...s, [field]: value } : s)),
    );
  };

  const copyMondayToWeekdays = () => {
    const monday = schedule.find((s) => s.day === "Monday");
    if (!monday) return;
    setSchedule((prev) =>
      prev.map((s) =>
        s.day !== "Saturday" && s.day !== "Sunday"
          ? {
              ...s,
              opdStart: monday.opdStart,
              opdEnd: monday.opdEnd,
              videoStart: monday.videoStart,
              videoEnd: monday.videoEnd,
              isAvailable: monday.isAvailable,
            }
          : s,
      ),
    );
  };

  const calculateTotalSlots = (start: string, end: string, mins: number) => {
    if (!start || !end) return 0;
    const [h1, m1] = start.split(":").map(Number);
    const [h2, m2] = end.split(":").map(Number);
    const diffMins = h2 * 60 + m2 - (h1 * 60 + m1);
    return diffMins > 0 ? Math.floor(diffMins / mins) : 0;
  };

  const currentActiveSlot =
    schedule.find((s) => s.day === activeTabDay) || schedule[0];

  const opdSlotCount = currentActiveSlot
    ? calculateTotalSlots(
        currentActiveSlot.opdStart,
        currentActiveSlot.opdEnd,
        profile.slotDurationMins,
      )
    : 0;

  const videoSlotCount = currentActiveSlot
    ? calculateTotalSlots(
        currentActiveSlot.videoStart,
        currentActiveSlot.videoEnd,
        profile.slotDurationMins,
      )
    : 0;

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3 text-[#3a9898]">
        <Loader2 size={32} className="animate-spin" />
        <p className="text-xs font-bold">Loading Doctor Profile...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 pb-6 animate-in fade-in duration-300"
    >
      {/* Toast Feedback */}
      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-700 text-xs font-bold shadow-sm">
          <CheckCircle2 size={16} />
          Doctor profile settings saved successfully!
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-bold shadow-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-white via-white to-[#f0f7f7] border border-[#dde5e7] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#3a9898] text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-[#3a9898]/20 shrink-0">
            <Stethoscope size={30} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#1a2632]">
                {profile.name || "Doctor Profile"}
              </h2>
              <span className="bg-[#eaf6f5] text-[#3a9898] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#c4e4e0]">
                Clinic Doctor
              </span>
            </div>
            <p className="text-xs font-semibold text-[#3a9898] mt-0.5">
              {profile.specialization || "Specialization not set"}
            </p>
            <p className="text-[11px] text-[#8b9bae] mt-1">
              {profile.qualification} • {profile.experienceYears} Yrs Exp. •
              Reg: {profile.registrationNo}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#3a9898] hover:bg-[#2b6e6e] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-[#3a9898]/20 cursor-pointer"
        >
          {isSaving ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Save size={15} />
          )}
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Doctor Personal Info */}
        <div className="bg-white border border-[#dde5e7] rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1a2632] flex items-center gap-2 border-b border-[#dde5e7] pb-3">
            <User size={16} className="text-[#3a9898]" />
            Doctor Details
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#5a6a76] mb-1">
                Doctor Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#f8fafb] border border-[#dde5e7] rounded-xl text-xs text-[#1a2632] font-medium focus:outline-none focus:bg-white focus:border-[#3a9898]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#5a6a76] mb-1">
                Specialization
              </label>
              <input
                type="text"
                value={profile.specialization}
                onChange={(e) =>
                  setProfile({ ...profile, specialization: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#f8fafb] border border-[#dde5e7] rounded-xl text-xs text-[#1a2632] font-medium focus:outline-none focus:bg-white focus:border-[#3a9898]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#5a6a76] mb-1">
                Qualifications
              </label>
              <input
                type="text"
                value={profile.qualification}
                onChange={(e) =>
                  setProfile({ ...profile, qualification: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#f8fafb] border border-[#dde5e7] rounded-xl text-xs text-[#1a2632] font-medium focus:outline-none focus:bg-white focus:border-[#3a9898]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#5a6a76] mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]"
                  />
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="w-full pl-8 pr-2 py-2 bg-[#f8fafb] border border-[#dde5e7] rounded-xl text-xs text-[#1a2632] font-medium focus:outline-none focus:bg-white focus:border-[#3a9898]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5a6a76] mb-1">
                  Reg. No
                </label>
                <input
                  type="text"
                  value={profile.registrationNo}
                  onChange={(e) =>
                    setProfile({ ...profile, registrationNo: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#f8fafb] border border-[#dde5e7] rounded-xl text-xs text-[#1a2632] font-medium focus:outline-none focus:bg-white focus:border-[#3a9898]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#5a6a76] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]"
                />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="w-full pl-8 pr-3 py-2 bg-[#f8fafb] border border-[#dde5e7] rounded-xl text-xs text-[#1a2632] font-medium focus:outline-none focus:bg-white focus:border-[#3a9898]"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[#dde5e7]">
              <label className="block text-[11px] font-semibold text-[#5a6a76] mb-1">
                Slot Duration Interval
              </label>
              <select
                value={profile.slotDurationMins}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    slotDurationMins: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-[#eaf6f5] border border-[#c4e4e0] text-[#3a9898] font-bold rounded-xl text-xs focus:outline-none cursor-pointer"
              >
                <option value={10}>10 Minutes per slot</option>
                <option value={15}>15 Minutes per slot</option>
                <option value={20}>20 Minutes per slot</option>
                <option value={30}>30 Minutes per slot</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Timing & Slot Controls */}
        <div className="lg:col-span-2 bg-white border border-[#dde5e7] rounded-2xl p-5 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dde5e7] pb-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1a2632] flex items-center gap-2">
                <Clock size={16} className="text-[#3a9898]" />
                Consultation & Slot Timing Management
              </h3>
              <p className="text-[11px] text-[#8b9bae] mt-0.5">
                Configure offline clinic OPD hours and online video call
                availability
              </p>
            </div>

            <button
              type="button"
              onClick={copyMondayToWeekdays}
              className="flex items-center gap-1.5 text-[11px] text-[#3a9898] hover:text-[#2b6e6e] font-bold bg-[#eaf6f5] hover:bg-[#d4efed] px-3 py-1.5 rounded-lg border border-[#c4e4e0] transition-colors self-start sm:self-auto cursor-pointer"
            >
              <Copy size={12} />
              Apply Mon timings to Weekdays
            </button>
          </div>

          {/* Days Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {schedule.map((item) => {
              const isActive = activeTabDay === item.day;
              return (
                <button
                  key={item.day}
                  type="button"
                  onClick={() => setActiveTabDay(item.day)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-[#3a9898] text-white shadow-sm shadow-[#3a9898]/30"
                      : item.isAvailable
                        ? "bg-[#f5f7f8] text-[#5a6a76] hover:bg-[#eaf6f5] hover:text-[#3a9898]"
                        : "bg-[#f8fafb] text-[#c0cbd2] line-through"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.isAvailable
                        ? isActive
                          ? "bg-white"
                          : "bg-emerald-500"
                        : "bg-gray-300"
                    }`}
                  />
                  {item.day.slice(0, 3)}
                </button>
              );
            })}
          </div>

          {/* Active Day Slots Box */}
          {currentActiveSlot && (
            <div className="bg-[#f8fafb] border border-[#dde5e7] rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#dde5e7]">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-bold text-[#1a2632]">
                    {currentActiveSlot.day} Availability
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      currentActiveSlot.isAvailable
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {currentActiveSlot.isAvailable
                      ? "Open for Booking"
                      : "Clinic Closed"}
                  </span>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentActiveSlot.isAvailable}
                    onChange={(e) =>
                      updateSchedule(
                        currentActiveSlot.day,
                        "isAvailable",
                        e.target.checked,
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3a9898]"></div>
                </label>
              </div>

              {currentActiveSlot.isAvailable ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-[#dde5e7] space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#3a9898]" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#3a9898] font-bold text-xs">
                        <Building2 size={16} />
                        Offline OPD Timing
                      </div>
                      <span className="text-[10px] bg-[#eaf6f5] text-[#3a9898] font-bold px-2 py-0.5 rounded-md">
                        {opdSlotCount} slots available
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="block text-[10px] font-bold text-[#8b9bae] uppercase mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={currentActiveSlot.opdStart}
                          onChange={(e) =>
                            updateSchedule(
                              currentActiveSlot.day,
                              "opdStart",
                              e.target.value,
                            )
                          }
                          className="w-full px-2.5 py-2 bg-[#f8fafb] border border-[#dde5e7] rounded-lg text-xs font-bold text-[#1a2632] focus:outline-none focus:border-[#3a9898]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#8b9bae] uppercase mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={currentActiveSlot.opdEnd}
                          onChange={(e) =>
                            updateSchedule(
                              currentActiveSlot.day,
                              "opdEnd",
                              e.target.value,
                            )
                          }
                          className="w-full px-2.5 py-2 bg-[#f8fafb] border border-[#dde5e7] rounded-lg text-xs font-bold text-[#1a2632] focus:outline-none focus:border-[#3a9898]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#dde5e7] space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                        <Video size={16} />
                        Online Video Call Timing
                      </div>
                      <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded-md">
                        {videoSlotCount} slots available
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="block text-[10px] font-bold text-[#8b9bae] uppercase mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={currentActiveSlot.videoStart}
                          onChange={(e) =>
                            updateSchedule(
                              currentActiveSlot.day,
                              "videoStart",
                              e.target.value,
                            )
                          }
                          className="w-full px-2.5 py-2 bg-[#f8fafb] border border-[#dde5e7] rounded-lg text-xs font-bold text-[#1a2632] focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#8b9bae] uppercase mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={currentActiveSlot.videoEnd}
                          onChange={(e) =>
                            updateSchedule(
                              currentActiveSlot.day,
                              "videoEnd",
                              e.target.value,
                            )
                          }
                          className="w-full px-2.5 py-2 bg-[#f8fafb] border border-[#dde5e7] rounded-lg text-xs font-bold text-[#1a2632] focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-white rounded-xl border border-dashed border-[#dde5e7]">
                  <p className="text-xs font-bold text-[#5a6a76]">
                    Clinic is closed on {currentActiveSlot.day}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Estimated Slot Count Preview */}
          {currentActiveSlot && (
            <div className="bg-[#eaf6f5] border border-[#c4e4e0] rounded-xl p-3 flex items-center justify-between text-xs text-[#3a9898] font-semibold">
              <div className="flex items-center gap-2">
                <Sparkles size={16} />
                <span>
                  Total slots for <b>{currentActiveSlot.day}</b>:{" "}
                  <b>{opdSlotCount + videoSlotCount} slots</b> (
                  {profile.slotDurationMins} min per slot)
                </span>
              </div>
              <ChevronRight size={16} />
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

import {
  X,
  CalendarPlus,
  CheckCircle2,
  ShieldCheck,
  Video,
  Repeat2,
  Search,
  Scissors,
  Stethoscope,
  Loader2,
} from "lucide-react";
import { useState, FormEvent } from "react";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api"; // Unga API endpoints file path-ai check seiyavum

const apptTypes = [
  {
    id: "consultation",
    icon: Stethoscope,
    label: "Consultation",
    sub: "Standard visit",
  },
  { id: "followup", icon: Repeat2, label: "Follow-up", sub: "Post review" },
  { id: "surgery", icon: Scissors, label: "Surgery", sub: "Operation / OR" },
  {
    id: "emergency",
    icon: Video,
    label: "Emergency",
    sub: "Emergency",
  },
];

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:15 AM",
  "11:00 AM",
  "02:00 PM",
  "03:30 PM",
];

const priorities = [
  { id: "normal", label: "Normal", color: "emerald" },
  { id: "urgent", label: "Urgent", color: "amber" },
  { id: "high", label: "High Priority / Emergency", color: "red" },
];

interface Props {
  onClose: () => void;
  onSuccess?: () => void; // Refresh appointments list after successful booking
}

export default function BookAppointmentModal({ onClose, onSuccess }: Props) {
  // 1. All useState Hooks inside Component Body
  const [patientTab, setPatientTab] = useState<"existing" | "new">("existing");

  // Dynamic Form States
  const [patientName, setPatientName] = useState("Riya Sharma");
  const [mrn] = useState("PT-2035-091");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [gender, setGender] = useState("Female");
  const [age, setAge] = useState("26");
  const [doctorId, setDoctorId] = useState("1");
  const departmentId = "1";
  const patientId = "1";
  const [apptType, setApptType] = useState("consultation");
  const [date, setDate] = useState("2026-09-27");
  const [fee, setFee] = useState("500");
  const [timeSlot, setTimeSlot] = useState("09:30 AM");
  const [notes, setNotes] = useState(
    "Patient presents with intermittent chest discomfort and mild shortness of breath over the past 3 days.",
  );
  const [priority, setPriority] = useState("normal");

  // Pudhiya Consultation Type, Source & OPD States (Inside Function Component)
  const [consultationType, setConsultationType] = useState("In-clinic");
  const [consultationSource, setConsultationSource] = useState("Walk-in");

  // API Call States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Source maarumpodhu "OPD Today" badge auto-check aagum logic
  const handleSourceChange = (val: string) => {
    setConsultationSource(val);
  };

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all placeholder:text-[#b0bec8]";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";
  const reqStar = <span className="text-red-500 ml-0.5">*</span>;

  // Handle Form Submit to PHP Backend API
  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const payload = {
      patientId: Number(patientId),
      doctorId: Number(doctorId),
      departmentId: Number(departmentId),
      appointmentDate: date,
      timeSlot: timeSlot,
      appointmentType: apptType,
      consultationFee: Number(fee),
      notes: notes,
      priorityLevel: priority,
      patientType: patientTab,
      consultationType: consultationType,
      consultationSource: consultationSource,
      age: Number(age),
      // symptoms: symptoms,
      // roomNumber: roomNumber,
    };

    try {
      await apiFetch(API_ENDPOINTS.hospitalAppointments, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMsg(
        err?.message || "Appointment booking failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const SectionHead = ({ n, title }: { n: string; title: string }) => (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="w-5 h-5 rounded-md bg-[#3a9898] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
        {n}
      </span>
      <h3 className="text-[11.5px] font-bold text-[#8b9bae] tracking-widest uppercase">
        {title}
      </h3>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-[980px] max-h-[92vh] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed]">
        {/* Header */}
        <div className="px-7 py-5 flex items-start justify-between shrink-0 border-b border-[#f0f4f5]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#eaf6f5] flex items-center justify-center shrink-0">
              <CalendarPlus size={18} className="text-[#3a9898]" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-[#1a2632]">
                Book New Appointment
              </h2>
              <p className="text-[12px] text-[#8b9bae] mt-0.5">
                Fill in patient and scheduling details for outpatient or surgery
                appointment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae] hover:text-[#1a2632] transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Error Alert Message */}
        {errorMsg && (
          <div className="mx-7 mt-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex justify-between items-center">
            <span>{errorMsg}</span>
            <button
              onClick={() => setErrorMsg(null)}
              className="font-bold ml-2"
            >
              ×
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-5">
          {/* Section 1 — Patient Information */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            {/* Header & Existing/New Tab */}
            <div className="flex items-center justify-between mb-4">
              <SectionHead n="1" title="Patient Information" />
              <div className="flex bg-[#f0f4f5] rounded-lg p-0.5 text-[11.5px] font-semibold">
                {(["existing", "new"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setPatientTab(t)}
                    className={`px-3.5 py-1.5 rounded-md transition-all capitalize ${
                      patientTab === t
                        ? "bg-white text-[#1a2632] shadow-sm"
                        : "text-[#8b9bae] hover:text-[#5a6a76]"
                    }`}
                  >
                    {t === "existing" ? "Existing Patient" : "New Patient"}
                  </button>
                ))}
              </div>
            </div>

            {/* Existing Patient Search Box */}
            {patientTab === "existing" && (
              <div className="mb-4 p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl">
                <label className="block text-[11px] font-bold text-[#5a6a76] uppercase tracking-wider mb-1.5">
                  Search Patient
                </label>
                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b9bae]"
                    />
                    <input
                      type="text"
                      className={`${inputCls} pl-10 pr-4 bg-white`}
                      placeholder="Search by Patient Name or Phone Number..."
                    />
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-lg transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
                  >
                    <Search size={14} />
                    Search
                  </button>
                </div>
              </div>
            )}

            {/* Form Fields Grid */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-3.5">
              {/* Patient Name */}
              <div>
                <label className={labelCls}>Patient Full Name{reqStar}</label>
                <div className="relative">
                  <input
                    className={inputCls}
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient name"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10.5px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <ShieldCheck size={10} /> Verified
                  </span>
                </div>
              </div>

              {/* MRN */}
              <div>
                <label className={labelCls}>Patient ID / MRN</label>
                <input
                  className={`${inputCls} bg-[#f0f4f5] text-[#8b9bae] cursor-not-allowed`}
                  value={mrn}
                  readOnly
                />
              </div>

              {/* Phone */}
              <div>
                <label className={labelCls}>Phone Number{reqStar}</label>
                <input
                  className={inputCls}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>

              {/* Gender & Age */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Gender</label>
                  <select
                    className={inputCls}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Age</label>
                  <input
                    type="number"
                    className={inputCls}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                  />
                </div>
              </div>

              {/* PUDHIYA FIELD 1: Consultation Type */}
              <div>
                <label className={labelCls}>Consultation Type{reqStar}</label>
                <select
                  className={inputCls}
                  value={consultationType}
                  onChange={(e) => setConsultationType(e.target.value)}
                >
                  <option value="In-clinic">In-clinic (Physical)</option>
                  <option value="Video">Video Consultation</option>
                  <option value="Phone">Phone Consultation</option>
                </select>
              </div>

              {/* PUDHIYA FIELD 2: Booking Source & OPD Badge */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className={labelCls}>Booking Source{reqStar}</label>
                  {consultationSource === "Walk-in" && (
                    <span className="text-[10px] font-bold text-[#3a9898] bg-[#3a9898]/10 border border-[#3a9898]/20 px-2 py-0.5 rounded-full animate-pulse">
                      • OPD Today
                    </span>
                  )}
                </div>
                <select
                  className={inputCls}
                  value={consultationSource}
                  onChange={(e) => handleSourceChange(e.target.value)}
                >
                  <option value="Walk-in">Walk-in (Hospital Visit)</option>
                  <option value="Phone Call">Phone Call Booking</option>
                  <option value="Online">Online Portal / App</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2 — Clinical Details */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <SectionHead n="2" title="Clinical Details & Specialist" />

            <div className="grid grid-cols-2 gap-5 mb-4">
              <div>
                <label className={labelCls}>Attending Doctor{reqStar}</label>
                <select
                  className={inputCls}
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                >
                  <option value="1">
                    Dr. Amelia Hart (Cardiologist — Available Today)
                  </option>
                  <option value="2">
                    Dr. Rizky Pratama (General — Available Today)
                  </option>
                  <option value="3">
                    Dr. Sophia Liang (Pediatrics — Busy)
                  </option>
                  <option value="4">
                    Dr. Daniel Obeng (Neurology — Available Today)
                  </option>
                </select>
              </div>
            </div>

            {/* Appointment Type */}
            <div>
              <label className={labelCls}>Appointment Type</label>
              <div className="grid grid-cols-4 gap-3">
                {apptTypes.map((t) => {
                  const active = apptType === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setApptType(t.id)}
                      className={`text-left px-4 py-3.5 rounded-[11px] border-2 transition-all ${
                        active
                          ? "border-[#3a9898] bg-[#eaf6f5]"
                          : "border-[#e2e8ed] bg-[#f8fafb] hover:border-[#c4d4dc]"
                      }`}
                    >
                      <t.icon
                        size={16}
                        className={`mb-1.5 ${
                          active ? "text-[#3a9898]" : "text-[#8b9bae]"
                        }`}
                      />
                      <p
                        className={`text-[12.5px] font-bold ${
                          active ? "text-[#3a9898]" : "text-[#1a2632]"
                        }`}
                      >
                        {t.label}
                      </p>
                      <p className="text-[10.5px] text-[#8b9bae] mt-0.5">
                        {t.sub}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3 — Date & Time */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <SectionHead n="3" title="Date & Schedule Time Slot" />

            <div className="grid grid-cols-2 gap-5 mb-4">
              <div>
                <label className={labelCls}>Appointment Date{reqStar}</label>
                <input
                  type="date"
                  className={inputCls}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelCls}>
                  Consultation Fee (₹){reqStar}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 500"
                  className={inputCls}
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <p className="text-[12px] font-semibold text-[#1a2632]">
                Available Time Slots{" "}
                <span className="text-[#8b9bae] font-normal">({date})</span>
              </p>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                6 Slots Available
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {timeSlots.map((slot) => {
                const active = timeSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`px-4 py-2 rounded-[9px] text-[12.5px] font-semibold border transition-all ${
                      active
                        ? "bg-[#3a9898] text-white border-[#3a9898] shadow-sm"
                        : "bg-white text-[#5a6a76] border-[#e2e8ed] hover:border-[#3a9898] hover:text-[#3a9898]"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4 — Chief Complaint */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <SectionHead n="4" title="Chief Complaint & Clinical Notes" />

            <div className="mb-4">
              <label className={labelCls}>Symptoms / Reason for Visit</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all resize-none placeholder:text-[#b0bec8]"
              />
            </div>
            <div>
              <label className={labelCls}>Triage Priority Level:</label>
              <div className="flex gap-2.5">
                {priorities.map((p) => {
                  const active = priority === p.id;
                  const styles: Record<
                    string,
                    { active: string; inactive: string }
                  > = {
                    normal: {
                      active: "bg-emerald-500 text-white border-emerald-500",
                      inactive:
                        "border-[#e2e8ed] text-[#5a6a76] hover:border-emerald-400 hover:text-emerald-600",
                    },
                    urgent: {
                      active: "bg-amber-400 text-white border-amber-400",
                      inactive:
                        "border-[#e2e8ed] text-[#5a6a76] hover:border-amber-400 hover:text-amber-600",
                    },
                    high: {
                      active: "bg-red-500 text-white border-red-500",
                      inactive:
                        "border-[#e2e8ed] text-[#5a6a76] hover:border-red-400 hover:text-red-600",
                    },
                  };
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPriority(p.id)}
                      className={`px-4 py-2 rounded-full text-[12px] font-semibold border-2 transition-all ${
                        active
                          ? styles[p.id].active
                          : `bg-white ${styles[p.id].inactive}`
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 py-4 border-t border-[#f0f4f5] flex items-center justify-between shrink-0 bg-white rounded-b-[20px]">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-[12.5px] font-semibold text-[#8b9bae] hover:text-red-500 transition-colors px-4 py-2.5 rounded-xl hover:bg-red-50 disabled:opacity-50"
          >
            Discard & Cancel
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={loading}
              className="text-[12.5px] font-semibold text-[#5a6a76] border border-[#e2e8ed] hover:border-[#3a9898] hover:text-[#3a9898] px-5 py-2.5 rounded-xl transition-all bg-white disabled:opacity-50"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              disabled={loading}
              className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#3a9898]/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <CheckCircle2 size={15} />
                  Confirm & Book Appointment
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

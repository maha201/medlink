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
import { useState, useEffect, FormEvent } from "react";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

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

interface Props {
  onClose: () => void;
  onSuccess?: () => void;
  onOpenRegisterPatient?: () => void;
}

export default function BookAppointmentModal({
  onClose,
  onSuccess,
  onOpenRegisterPatient,
}: Props) {
  const [patientTab, setPatientTab] = useState<"existing" | "new">("existing");

  // Search & Auto-fill Patient States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | number>(
    "",
  );

  // Dynamic Form States
  const [patientName, setPatientName] = useState("");
  const [mrn, setMrn] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Female");
  const [age, setAge] = useState("");

  const [doctorId, setDoctorId] = useState("1");
  const departmentId = "1";
  const [apptType, setApptType] = useState("consultation");
  const [date, setDate] = useState("2026-09-27");
  const [fee, setFee] = useState("500");
  const [timeSlot, setTimeSlot] = useState("09:30 AM");
  const [notes, setNotes] = useState(
    "Patient presents with intermittent chest discomfort and mild shortness of breath over the past 3 days.",
  );

  const [consultationType, setConsultationType] = useState("In-clinic");
  const [consultationSource, setConsultationSource] = useState("Walk-in");

  // API Call States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Helper function to calculate age from DOB
  const calculateAge = (dobString?: string): string => {
    if (!dobString) return "";
    const birthDate = new Date(dobString);
    if (isNaN(birthDate.getTime())) return "";
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    return String(calculatedAge);
  };

  // Search Patient API Handler
  useEffect(() => {
    const handlePatientSearch = async () => {
      if (!searchQuery || searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const rawResponse = await apiFetch(
          `${API_ENDPOINTS.hospitalPatients}?search=${encodeURIComponent(searchQuery)}`,
          { method: "GET" },
        );
        const res =
          typeof rawResponse.json === "function"
            ? await rawResponse.json()
            : rawResponse;

        const dataList = Array.isArray(res) ? res : res?.data || [];
        setSearchResults(dataList);
      } catch (err) {
        console.error("Patient Search Error:", err);
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(() => {
      handlePatientSearch();
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Select Patient from Suggestions
  const handleSelectPatient = (patient: any) => {
    setSelectedPatientId(patient.id);
    const fullName =
      `${patient.firstName || ""} ${patient.lastName || ""}`.trim() ||
      patient.name ||
      "";
    setPatientName(fullName);
    setPhone(patient.phone || patient.mobile || "");
    setGender(patient.gender || "Female");
    setMrn(patient.mrn || `PT-${patient.id}`);

    const computedAge = patient.age
      ? String(patient.age)
      : calculateAge(patient.dateOfBirth || patient.dob);
    setAge(computedAge);

    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const payload = {
      patientId: selectedPatientId ? Number(selectedPatientId) : 1,
      doctorId: Number(doctorId),
      departmentId: Number(departmentId),
      appointmentDate: date,
      timeSlot: timeSlot,
      appointmentType: apptType,
      consultationFee: Number(fee),
      notes: notes,
      priorityLevel: "normal",
      patientType: patientTab,
      consultationType: consultationType,
      consultationSource: consultationSource,
      age: Number(age) || 0,
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

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all placeholder:text-[#b0bec8]";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";
  const reqStar = <span className="text-red-500 ml-0.5">*</span>;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 font-sans">
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
                appointment[cite: 3]
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae] hover:text-[#1a2632] transition-colors shrink-0 cursor-pointer"
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
              className="font-bold ml-2 cursor-pointer"
            >
              ×
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-5">
          {/* Section 1 — Patient Information */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center justify-between mb-4">
              <SectionHead n="1" title="Patient Information" />
              <div className="flex bg-[#f0f4f5] rounded-lg p-0.5 text-[11.5px] font-semibold">
                {(["existing", "new"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setPatientTab(t);
                      if (t === "new") {
                        if (onOpenRegisterPatient) {
                          onOpenRegisterPatient();
                        }
                      }
                    }}
                    className={`px-3.5 py-1.5 rounded-md transition-all capitalize cursor-pointer ${
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

            {/* Existing Patient Search Box & Suggestions */}
            {patientTab === "existing" && (
              <div className="mb-4 p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl relative">
                <label className="block text-[11px] font-bold text-[#5a6a76] uppercase tracking-wider mb-1.5">
                  Search Patient (Name or Phone Number)
                </label>
                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b9bae]"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`${inputCls} pl-10 pr-4 bg-white`}
                      placeholder="Type patient name or mobile number to search..."
                    />
                    {isSearching && (
                      <Loader2
                        size={16}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-[#3a9898]"
                      />
                    )}
                  </div>
                </div>

                {/* Suggestions Dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute left-3.5 right-3.5 mt-1 bg-white border border-[#dde5e7] rounded-xl shadow-xl z-20 max-h-56 overflow-y-auto">
                    {searchResults.map((patient) => {
                      const name =
                        `${patient.firstName || ""} ${patient.lastName || ""}`.trim() ||
                        patient.name;
                      return (
                        <div
                          key={patient.id}
                          onClick={() => handleSelectPatient(patient)}
                          className="px-4 py-2.5 hover:bg-[#f5f7f8] cursor-pointer border-b border-[#f0f4f5] last:border-none flex items-center justify-between text-xs"
                        >
                          <div>
                            <p className="font-bold text-[#1a2632]">{name}</p>
                            <p className="text-[#8b9bae]">
                              Phone: {patient.phone || patient.mobile || "N/A"}{" "}
                              | MRN: {patient.mrn || `PT-${patient.id}`}
                            </p>
                          </div>
                          <span className="text-[#3a9898] font-bold bg-[#eaf6f5] px-2.5 py-1 rounded-full">
                            Select
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Form Fields Grid */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-3.5">
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
                  {selectedPatientId && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10.5px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <ShieldCheck size={10} /> Verified
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className={labelCls}>Patient ID / MRN</label>
                <input
                  className={`${inputCls} bg-[#f0f4f5] text-[#8b9bae]`}
                  value={mrn}
                  onChange={(e) => setMrn(e.target.value)}
                  placeholder="Auto-filled or generated"
                />
              </div>

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
                  onChange={(e) => setConsultationSource(e.target.value)}
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
                      className={`text-left px-4 py-3.5 rounded-[11px] border-2 transition-all cursor-pointer ${
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
                    className={`px-4 py-2 rounded-[9px] text-[12.5px] font-semibold border transition-all cursor-pointer ${
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
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 py-4 border-t border-[#f0f4f5] flex items-center justify-between shrink-0 bg-white rounded-b-[20px]">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-[12.5px] font-semibold text-[#8b9bae] hover:text-red-500 transition-colors px-4 py-2.5 rounded-xl hover:bg-red-50 disabled:opacity-50 cursor-pointer"
          >
            Discard & Cancel
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={loading}
              className="text-[12.5px] font-semibold text-[#5a6a76] border border-[#e2e8ed] hover:border-[#3a9898] hover:text-[#3a9898] px-5 py-2.5 rounded-xl transition-all bg-white disabled:opacity-50 cursor-pointer"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              disabled={loading}
              className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#3a9898]/20 disabled:opacity-50 cursor-pointer"
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

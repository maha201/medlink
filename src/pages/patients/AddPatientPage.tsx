import { useState, useRef, KeyboardEvent, ChangeEvent, FormEvent } from "react";
import {
  X,
  User,
  UserPlus,
  MapPin,
  Stethoscope,
  Upload,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

const intakeTypes = [
  {
    id: "consultation",
    label: "Consultation",
    sub: "Routine checkup & initial diagnosis",
    accent: "teal",
  },
  {
    id: "followup",
    label: "Follow-up",
    sub: "Review & progress tracking",
    accent: "teal",
  },
  {
    id: "surgery",
    label: "Surgery",
    sub: "Pre-op & procedure scheduling",
    accent: "teal",
  },
  {
    id: "emergency",
    label: "Emergency",
    sub: "Immediate triage protocol",
    accent: "red",
  },
];

const availableTimeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:15 AM",
  "11:00 AM",
  "02:00 PM",
  "03:30 PM",
];

interface Props {
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function RegisterPatientModal({
  onClose = () => {},
  onSuccess,
}: Props) {
  // Form State
  const [formData, setFormData] = useState({
    firstName: "Riya",
    lastName: "Sharma",
    dob: "1992-04-18",
    gender: "Female",
    bloodGroup: "O+",
    maritalStatus: "Single",
    phone: "+91 98765 43210",
    email: "riya.sharma@email.com",
    nationalId: "4821-9034-7612",
    streetAddress: "12, MG Road, Anna Nagar",
    cityPostalCode: "Chennai - 600040",
    emergencyContactName: "Arjun Sharma",
    emergencyRelationship: "Spouse",
    emergencyPhone: "+91 87654 32109",
    attendingDoctor: "Dr. Rizky Pratama — General Medicine",
    reasonForVisit: "Tooth Sensitivity",
    type: "In-Clinic",
    source: "Walk-In",
  });

  const [intake, setIntake] = useState("consultation");
  const [allergies, setAllergies] = useState<string[]>([
    "Penicillin",
    "Asthma",
  ]);
  const [allergyInput, setAllergyInput] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Date & Time Slot state
  const [appointmentDate, setAppointmentDate] = useState("2026-03-14");
  const [selectedSlot, setSelectedSlot] = useState("09:30 AM");
  const [fees, setFees] = useState("");

  // Loading & Error States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAllergyKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && allergyInput.trim()) {
      e.preventDefault();
      setAllergies((p) => [...p, allergyInput.trim()]);
      setAllergyInput("");
    }
  };

  const removeAllergy = (i: number) =>
    setAllergies((p) => p.filter((_, idx) => idx !== i));

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Destructure dob and map it to dateOfBirth
    const { dob, ...restFormData } = formData;

    const payload = {
      ...restFormData,
      dateOfBirth: dob, // Mapped to backend expectation
      intakeType: intake,
      allergies,
      photo: photoPreview,
      appointmentDate,
      selectedSlot,
      fees,
    };

    try {
      await apiFetch(API_ENDPOINTS.hospitalPatients, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError(
        err?.message || "Patient registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all placeholder:text-[#b0bec8]";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";
  const reqStar = <span className="text-red-500 ml-0.5">*</span>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-[1000px] max-h-[92vh] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed]"
      >
        {/* ── Header ── */}
        <div className="px-7 py-5 flex items-start justify-between shrink-0 border-b border-[#f0f4f5]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#eaf6f5] flex items-center justify-center shrink-0">
              <UserPlus size={18} className="text-[#3a9898]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-[16px] font-bold text-[#1a2632]">
                  Register New Patient
                </h2>
                <span className="text-[10.5px] font-bold bg-[#eaf6f5] text-[#3a9898] border border-[#c4e4e0] px-2.5 py-1 rounded-full">
                  New MRN: #PT-2026-
                  {String(Math.floor(1000 + Math.random() * 9000))}
                </span>
              </div>
              <p className="text-[12px] text-[#8b9bae] mt-0.5">
                Create a new electronic medical record (EMR / MRN) for hospital
                intake and care tracking.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae] hover:text-[#1a2632] transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Section 1 */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-[#eaf6f5] flex items-center justify-center">
                <User size={13} className="text-[#3a9898]" />
              </div>
              <h3 className="text-[13px] font-bold text-[#1a2632]">
                1. Demographics & Personal Information
              </h3>
            </div>

            <div className="flex gap-5">
              {/* Photo Upload */}
              <div className="flex flex-col items-center gap-2.5 shrink-0">
                <div
                  onClick={() => fileRef.current?.click()}
                  className="w-[88px] h-[88px] rounded-full bg-[#f0f4f5] border-2 border-dashed border-[#c8d4dc] flex items-center justify-center cursor-pointer hover:border-[#3a9898] transition-colors overflow-hidden"
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      className="w-full h-full object-cover"
                      alt="Patient Preview"
                    />
                  ) : (
                    <User size={28} className="text-[#b0bec8]" />
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhoto}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-[#3a9898] hover:text-[#2b6e6e] transition-colors"
                >
                  <Upload size={11} /> Upload Photo
                </button>
                <p className="text-[10px] text-[#b0bec8] text-center">
                  JPG, PNG max 2MB
                </p>
              </div>

              {/* Fields */}
              <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-3.5">
                <div>
                  <label className={labelCls}>First Name{reqStar}</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={inputCls}
                    placeholder="e.g. Riya"
                    required
                  />
                </div>
                <div>
                  <label className={labelCls}>Last Name{reqStar}</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={inputCls}
                    placeholder="e.g. Sharma"
                    required
                  />
                </div>
                <div>
                  <label className={labelCls}>Date of Birth{reqStar}</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className={inputCls}
                    required
                  />
                </div>
                <div>
                  <label className={labelCls}>Gender{reqStar}</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={inputCls}
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className={inputCls}
                  >
                    <option>O+</option>
                    <option>O-</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Marital Status</label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    className={inputCls}
                  >
                    <option>Single</option>
                    <option>Married</option>
                    <option>Divorced</option>
                    <option>Widowed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-[#eaf6f5] flex items-center justify-center">
                <MapPin size={13} className="text-[#3a9898]" />
              </div>
              <h3 className="text-[13px] font-bold text-[#1a2632]">
                2. Contact & Identity Identification
              </h3>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Phone Number{reqStar}</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={inputCls}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div>
                  <label className={labelCls}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputCls}
                    placeholder="riya@email.com"
                  />
                </div>
                <div>
                  <label className={labelCls}>National ID / SSN</label>
                  <input
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleInputChange}
                    className={inputCls}
                    placeholder="XXXX-XXXX-XXXX"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Street Address</label>
                  <input
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className={inputCls}
                    placeholder="12, MG Road, Anna Nagar"
                  />
                </div>
                <div>
                  <label className={labelCls}>City & Postal Code</label>
                  <input
                    name="cityPostalCode"
                    value={formData.cityPostalCode}
                    onChange={handleInputChange}
                    className={inputCls}
                    placeholder="Chennai - 600040"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Emergency Contact Name</label>
                  <input
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    className={inputCls}
                    placeholder="e.g. Arjun Sharma"
                  />
                </div>
                <div>
                  <label className={labelCls}>Relationship</label>
                  <select
                    name="emergencyRelationship"
                    value={formData.emergencyRelationship}
                    onChange={handleInputChange}
                    className={inputCls}
                  >
                    <option>Spouse</option>
                    <option>Parent</option>
                    <option>Sibling</option>
                    <option>Friend</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Emergency Phone</label>
                  <input
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className={inputCls}
                    placeholder="+91 87654 32109"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="border border-[#e8edf2] rounded-[14px] p-6 bg-white">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-md bg-[#eaf6f5] flex items-center justify-center shrink-0">
                <Stethoscope size={13} className="text-[#3a9898]" />
              </div>
              <h3 className="text-[14px] font-bold text-[#1a2632]">
                3. Clinical Intake & Care Classification
              </h3>
            </div>

            {/* Appointment Type Grid */}
            <div className="mb-5">
              <label className={labelCls}>Appointment Type{reqStar}</label>
              <div className="grid grid-cols-4 gap-3">
                {intakeTypes.map((t) => {
                  const active = intake === t.id;
                  const isEmergency = t.id === "emergency";

                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setIntake(t.id)}
                      className={`flex flex-col items-center justify-center py-4 px-3 rounded-[12px] border transition-all ${
                        active
                          ? isEmergency
                            ? "border-red-400 bg-red-50/50 text-red-600"
                            : "border-[#3a9898] bg-white text-[#3a9898] ring-1 ring-[#3a9898]"
                          : "border-[#e2e8ed] bg-white text-[#5a6a76] hover:border-[#c4d4dc]"
                      }`}
                    >
                      <div className="mb-2">
                        {t.id === "consultation" && (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.8}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        )}
                        {t.id === "followup" && (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.8}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                        )}
                        {t.id === "surgery" && (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.8}
                              d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.828 2.828a1 1 0 01-1.414 0L3 8.121M12 12L4.929 4.929"
                            />
                          </svg>
                        )}
                        {t.id === "emergency" && (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.8}
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-[13px] font-medium">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Attending Doctor & Reason for Visit */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls}>Attending Doctor{reqStar}</label>
                <select
                  name="attendingDoctor"
                  value={formData.attendingDoctor}
                  onChange={handleInputChange}
                  className={inputCls}
                >
                  <option>Dr. Rizky Pratama — General Medicine</option>
                  <option>Dr. Amelia Hart — Cardiology</option>
                  <option>Dr. Sophia Liang — Pediatrics</option>
                  <option>Dr. Daniel Obeng — Neurology</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Reason for visit</label>
                <select
                  name="reasonForVisit"
                  value={formData.reasonForVisit}
                  onChange={handleInputChange}
                  className={inputCls}
                >
                  <option>Tooth Sensitivity</option>
                  <option>Routine Checkup</option>
                  <option>Fever & Cold</option>
                  <option>Follow-up Visit</option>
                </select>
              </div>
            </div>

            {/* Type & Source */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelCls}>Type{reqStar}</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={inputCls}
                >
                  <option>In-Clinic</option>
                  <option>Online Consultation</option>
                  <option>Home Visit</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Source{reqStar}</label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  className={inputCls}
                >
                  <option>Walk-In</option>
                  <option>Online Booking</option>
                  <option>Referral</option>
                </select>
              </div>
            </div>

            {/* Known Allergies */}
            <div>
              <label className={labelCls}>
                Known Allergies & Chronic Notes
              </label>
              <div className="min-h-[46px] bg-[#f8fafb] border border-[#e2e8ed] rounded-[10px] px-3 py-2 flex flex-wrap gap-2 items-center focus-within:border-[#3a9898] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#3a9898]/20 transition-all">
                {allergies.map((a, i) => (
                  <span
                    key={i}
                    className={`flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-md ${
                      a.toLowerCase().includes("penicillin")
                        ? "bg-red-100 text-red-600"
                        : "bg-cyan-100/70 text-cyan-700"
                    }`}
                  >
                    {a}
                    <button
                      type="button"
                      onClick={() => removeAllergy(i)}
                      className="hover:opacity-75 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                <input
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onKeyDown={handleAllergyKey}
                  placeholder="Type allergy / tag and hit Enter..."
                  className="flex-1 min-w-[180px] bg-transparent text-[12.5px] text-[#1a2632] focus:outline-none placeholder:text-[#94a3b8]"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Date & Schedule Time Slot */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#0d8a83] text-white text-[11px] font-bold flex items-center justify-center">
                4
              </div>
              <h3 className="text-[13px] font-bold text-[#1a2632] uppercase tracking-wide">
                Date & Schedule Time Slot
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls}>Appointment Date{reqStar}</label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className={inputCls}
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Fees{reqStar}</label>
                <input
                  type="text"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  placeholder="Enter fees amount"
                  className={inputCls}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11.5px] font-semibold text-[#5a6a76]">
                  Available Time Slots
                </label>
                <span className="text-[11.5px] font-bold text-[#0d8a83]">
                  {availableTimeSlots.length} Slots Available
                </span>
              </div>

              <div className="grid grid-cols-6 gap-2.5">
                {availableTimeSlots.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2.5 px-3 rounded-xl border text-[12.5px] font-semibold transition-all ${
                        isSelected
                          ? "bg-[#0d8a83] text-white border-[#0d8a83] shadow-sm"
                          : "bg-white text-[#1a2632] border-[#e2e8ed] hover:border-[#0d8a83]"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Sticky Footer ── */}
        <div className="px-7 py-4 border-t border-[#f0f4f5] flex items-center justify-between shrink-0 bg-white rounded-b-[20px]">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-[12.5px] font-semibold text-[#8b9bae] hover:text-[#e11d48] transition-colors px-4 py-2.5 rounded-xl hover:bg-red-50 disabled:opacity-50"
          >
            Discard / Cancel
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
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#3a9898]/20 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <CheckCircle2 size={15} />
              )}
              {loading
                ? "Registering..."
                : "Complete Registration & Create EMR"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

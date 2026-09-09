import { useState, useRef, KeyboardEvent } from "react";
import {
  X,
  User,
  UserPlus,
  MapPin,
  Stethoscope,
  Upload,
  CheckCircle2,
} from "lucide-react";

const intakeTypes = [
  {
    id: "opd",
    label: "Outpatient (OPD)",
    sub: "Routine consultation & tests",
    accent: "teal",
  },
  {
    id: "ipd",
    label: "Inpatient (IPD)",
    sub: "Bed assignment & ward stay",
    accent: "teal",
  },
  {
    id: "er",
    label: "Emergency (ER)",
    sub: "Immediate triage protocol",
    accent: "red",
  },
];

interface Props {
  onClose?: () => void;
}

export default function RegisterPatientModal({ onClose = () => {} }: Props) {
  const [intake, setIntake] = useState("opd");
  const [allergies, setAllergies] = useState(["Penicillin", "Asthma"]);
  const [allergyInput, setAllergyInput] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAllergyKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && allergyInput.trim()) {
      e.preventDefault();
      setAllergies((p) => [...p, allergyInput.trim()]);
      setAllergyInput("");
    }
  };

  const removeAllergy = (i: number) =>
    setAllergies((p) => p.filter((_, idx) => idx !== i));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all placeholder:text-[#b0bec8]";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";
  const reqStar = <span className="text-red-500 ml-0.5">*</span>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-[1000px] max-h-[92vh] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed]">
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
                  New MRN: #PT-2025-
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
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae] hover:text-[#1a2632] transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-5">
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
                    className={inputCls}
                    placeholder="e.g. Riya"
                    defaultValue="Riya"
                  />
                </div>
                <div>
                  <label className={labelCls}>Last Name{reqStar}</label>
                  <input
                    className={inputCls}
                    placeholder="e.g. Sharma"
                    defaultValue="Sharma"
                  />
                </div>
                <div>
                  <label className={labelCls}>Date of Birth{reqStar}</label>
                  <input
                    type="date"
                    className={inputCls}
                    defaultValue="1992-04-18"
                  />
                </div>
                <div>
                  <label className={labelCls}>Gender{reqStar}</label>
                  <select className={inputCls}>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Blood Group</label>
                  <select className={inputCls}>
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
                  <select className={inputCls}>
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
                    className={inputCls}
                    placeholder="+91 98765 43210"
                    defaultValue="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className={labelCls}>Email Address</label>
                  <input
                    type="email"
                    className={inputCls}
                    placeholder="riya@email.com"
                    defaultValue="riya.sharma@email.com"
                  />
                </div>
                <div>
                  <label className={labelCls}>National ID / SSN</label>
                  <input
                    className={inputCls}
                    placeholder="XXXX-XXXX-XXXX"
                    defaultValue="4821-9034-7612"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Street Address</label>
                  <input
                    className={inputCls}
                    placeholder="12, MG Road, Anna Nagar"
                    defaultValue="12, MG Road, Anna Nagar"
                  />
                </div>
                <div>
                  <label className={labelCls}>City & Postal Code</label>
                  <input
                    className={inputCls}
                    placeholder="Chennai - 600040"
                    defaultValue="Chennai - 600040"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Emergency Contact Name</label>
                  <input
                    className={inputCls}
                    placeholder="e.g. Arjun Sharma"
                    defaultValue="Arjun Sharma"
                  />
                </div>
                <div>
                  <label className={labelCls}>Relationship</label>
                  <select className={inputCls}>
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
                    className={inputCls}
                    placeholder="+91 87654 32109"
                    defaultValue="+91 87654 32109"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-[#eaf6f5] flex items-center justify-center">
                <Stethoscope size={13} className="text-[#3a9898]" />
              </div>
              <h3 className="text-[13px] font-bold text-[#1a2632]">
                3. Clinical Intake & Care Classification
              </h3>
            </div>

            {/* Intake Type */}
            <div className="mb-4">
              <label className={labelCls}>Initial Intake Type{reqStar}</label>
              <div className="grid grid-cols-3 gap-3">
                {intakeTypes.map((t) => {
                  const active = intake === t.id;
                  const isER = t.id === "er";
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setIntake(t.id)}
                      className={`relative text-left px-4 py-3.5 rounded-[11px] border-2 transition-all ${
                        active
                          ? isER
                            ? "border-red-400 bg-red-50"
                            : "border-[#3a9898] bg-[#eaf6f5]"
                          : "border-[#e2e8ed] bg-[#f8fafb] hover:border-[#c4d4dc]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-[12.5px] font-bold ${active ? (isER ? "text-red-600" : "text-[#3a9898]") : "text-[#1a2632]"}`}
                        >
                          {t.label}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            active
                              ? isER
                                ? "border-red-400"
                                : "border-[#3a9898]"
                              : "border-[#c8d4dc]"
                          }`}
                        >
                          {active && (
                            <div
                              className={`w-2 h-2 rounded-full ${isER ? "bg-red-400" : "bg-[#3a9898]"}`}
                            />
                          )}
                        </div>
                      </div>
                      <p className="text-[11px] text-[#8b9bae]">{t.sub}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Doctor & Insurance */}
            <div className="grid grid-cols-2 gap-4 mb-3.5">
              <div>
                <label className={labelCls}>
                  Assigned Primary Doctor{reqStar}
                </label>
                <select className={inputCls}>
                  <option>Dr. Amelia Hart — Cardiology</option>
                  <option>Dr. Rizky Pratama — General</option>
                  <option>Dr. Sophia Liang — Pediatrics</option>
                  <option>Dr. Daniel Obeng — Neurology</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>
                  Insurance Provider & Policy No.
                </label>
                <input
                  className={inputCls}
                  placeholder="e.g. Star Health — POL-2024-88321"
                  defaultValue="Star Health — POL-2024-88321"
                />
              </div>
            </div>

            {/* Allergies */}
            <div>
              <label className={labelCls}>
                Known Allergies & Chronic Notes
              </label>
              <div className="min-h-[44px] bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3 py-2 flex flex-wrap gap-2 items-center focus-within:border-[#3a9898] focus-within:ring-1 focus-within:ring-[#3a9898]/20 transition-all">
                {allergies.map((a, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 bg-[#eaf6f5] text-[#3a9898] border border-[#c4e4e0] text-[11.5px] font-semibold px-2.5 py-1 rounded-full"
                  >
                    {a}
                    <button
                      type="button"
                      onClick={() => removeAllergy(i)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
                <input
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onKeyDown={handleAllergyKey}
                  placeholder="Type allergy / tag and hit Enter..."
                  className="flex-1 min-w-[180px] bg-transparent text-[12.5px] text-[#1a2632] focus:outline-none placeholder:text-[#b0bec8]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Sticky Footer ── */}
        <div className="px-7 py-4 border-t border-[#f0f4f5] flex items-center justify-between shrink-0 bg-white rounded-b-[20px]">
          <button
            type="button"
            onClick={onClose}
            className="text-[12.5px] font-semibold text-[#8b9bae] hover:text-[#e11d48] transition-colors px-4 py-2.5 rounded-xl hover:bg-red-50"
          >
            Discard / Cancel
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-[12.5px] font-semibold text-[#5a6a76] border border-[#e2e8ed] hover:border-[#3a9898] hover:text-[#3a9898] px-5 py-2.5 rounded-xl transition-all bg-white"
            >
              Save as Draft
            </button>
            <button
              type="button"
              className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#3a9898]/20"
            >
              <CheckCircle2 size={15} />
              Complete Registration & Create EMR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

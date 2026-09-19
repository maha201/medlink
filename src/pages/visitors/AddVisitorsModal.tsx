import { useState, useRef } from "react";
import {
  X,
  User,
  UserPlus,
  Phone,
  Clock,
  ShieldCheck,
  Upload,
  CheckCircle2,
  FileText,
} from "lucide-react";

const visitorTypes = [
  { id: "family", label: "Family / Relative" },
  { id: "vendor", label: "Vendor / Guest" },
  { id: "official", label: "Official Work" },
  { id: "other", label: "Other" },
];

interface Props {
  onClose?: () => void;
  onAddVisitor?: (visitor: any) => void;
}

export default function AddVisitorModal({
  onClose = () => {},
  onAddVisitor,
}: Props) {
  const [visitorType, setVisitorType] = useState("family");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "Sarah Jenkins",
    mobile: "+91 98450 23145",
    whomToVisit: "Daniel Wong (Room 402B - Orthopedics)",
    purpose: "Patient Visit / General Care",
    checkIn: "10:15 AM (Current)",
    checkOut: "12:15 PM (2 Hours Pass)",
    remarks:
      "Issued RFID visitor card #842. Thermal scan normal (98.4°F). Accompanied by 1 minor.",
  });

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddVisitor) {
      onAddVisitor({
        ...formData,
        visitorType:
          visitorTypes.find((t) => t.id === visitorType)?.label || "Other",
      });
    }
    onClose();
  };

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all placeholder:text-[#b0bec8]";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";
  const reqStar = <span className="text-red-500 ml-0.5">*</span>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-[900px] max-h-[92vh] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed]">
        {/* ── Header ── */}
        <div className="px-7 py-5 flex items-start justify-between shrink-0 border-b border-[#f0f4f5]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#eaf6f5] flex items-center justify-center shrink-0">
              <UserPlus size={18} className="text-[#3a9898]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-[16px] font-bold text-[#1a2632]">
                  Add New Visitor Entry
                </h2>
                <span className="text-[10.5px] font-bold bg-[#eaf6f5] text-[#3a9898] border border-[#c4e4e0] px-2.5 py-1 rounded-full">
                  Pass #VIS-2035-{String(Math.floor(100 + Math.random() * 900))}
                </span>
              </div>
              <p className="text-[12px] text-[#8b9bae] mt-0.5">
                Enter visitor credentials and generate instant gate pass &
                security check-in.
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
          {/* Section 1: Basic Information */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-[#eaf6f5] flex items-center justify-center">
                <User size={13} className="text-[#3a9898]" />
              </div>
              <h3 className="text-[13px] font-bold text-[#1a2632]">
                1. Visitor Personal Details
              </h3>
            </div>

            <div className="flex gap-5">
              {/* Visitor Photo Upload */}
              <div className="flex flex-col items-center gap-2.5 shrink-0">
                <div
                  onClick={() => fileRef.current?.click()}
                  className="w-[88px] h-[88px] rounded-full bg-[#f0f4f5] border-2 border-dashed border-[#c8d4dc] flex items-center justify-center cursor-pointer hover:border-[#3a9898] transition-colors overflow-hidden"
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Visitor"
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

              {/* Input Fields */}
              <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-3.5">
                <div>
                  <label className={labelCls}>Visitor Full Name{reqStar}</label>
                  <input
                    className={inputCls}
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className={labelCls}>Mobile Number{reqStar}</label>
                  <div className="relative">
                    <input
                      className={inputCls}
                      placeholder="+91 98450 23145"
                      value={formData.mobile}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className={labelCls}>
                    Visitor Category / Type{reqStar}
                  </label>
                  <div className="grid grid-cols-4 gap-2.5">
                    {visitorTypes.map((t) => {
                      const active = visitorType === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setVisitorType(t.id)}
                          className={`px-3 py-2 rounded-[9px] border text-xs font-semibold transition-all ${
                            active
                              ? "border-[#3a9898] bg-[#eaf6f5] text-[#3a9898]"
                              : "border-[#e2e8ed] bg-[#f8fafb] text-[#5a6a76] hover:border-[#c4d4dc]"
                          }`}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Visit Target & Purpose */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-[#eaf6f5] flex items-center justify-center">
                <ShieldCheck size={13} className="text-[#3a9898]" />
              </div>
              <h3 className="text-[13px] font-bold text-[#1a2632]">
                2. Visit Destination & Clearance
              </h3>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>
                    Whom to Visit (Patient / Staff Name){reqStar}
                  </label>
                  <input
                    className={inputCls}
                    placeholder="e.g. Daniel Wong (Room 402B)"
                    value={formData.whomToVisit}
                    onChange={(e) =>
                      setFormData({ ...formData, whomToVisit: e.target.value })
                    }
                  />
                  <span className="text-[10px] text-[#3a9898] mt-1 block font-medium">
                    MRN #PT-2035-078 • Admitted Ward B
                  </span>
                </div>

                <div>
                  <label className={labelCls}>Purpose of Visit{reqStar}</label>
                  <select
                    className={inputCls}
                    value={formData.purpose}
                    onChange={(e) =>
                      setFormData({ ...formData, purpose: e.target.value })
                    }
                  >
                    <option>Patient Visit / General Care</option>
                    <option>Medical Consultation</option>
                    <option>Official Business / Delivery</option>
                    <option>Hospital Staff Guest</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Time & Remarks */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-[#eaf6f5] flex items-center justify-center">
                <Clock size={13} className="text-[#3a9898]" />
              </div>
              <h3 className="text-[13px] font-bold text-[#1a2632]">
                3. Gate Timing & Security Remarks
              </h3>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Check-In Time{reqStar}</label>
                  <input
                    className={inputCls}
                    value={formData.checkIn}
                    onChange={(e) =>
                      setFormData({ ...formData, checkIn: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    Expected Check-out Time{reqStar}
                  </label>
                  <input
                    className={inputCls}
                    value={formData.checkOut}
                    onChange={(e) =>
                      setFormData({ ...formData, checkOut: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Remarks & Security Notes</label>
                <textarea
                  rows={2}
                  className={`${inputCls} resize-none`}
                  placeholder="Enter badge RFID number, thermal scan result or items carried..."
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
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
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#3a9898]/20"
            >
              <CheckCircle2 size={15} />
              Check-In & Generate Visitor Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

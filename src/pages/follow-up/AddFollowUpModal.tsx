import { useState, useRef } from "react";
import {
  X,
  User,
  Calendar,
  Clock,
  CheckCircle2,
  Upload,
} from "lucide-react";

interface Props {
  onClose?: () => void;
  onAddFollowUp?: (data: any) => void;
}

export default function AddFollowUpModal({
  onClose = () => {},
  onAddFollowUp,
}: Props) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "Daniel Wong",
    patientId: "PT-2035-078",
    genderAge: "Male / 42",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    previousVisit: "Sep 12, 2026",
    followUpDate: "Sep 25, 2026",
    followUpTime: "11:00 AM",
    reason: "Tooth Sensitivity - Post Procedure Review",
    location: "Room 402B - 4th Floor",
    status: "Scheduled",
  });

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddFollowUp) {
      onAddFollowUp(formData);
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
        {/* Header */}
        <div className="px-7 py-5 flex items-start justify-between shrink-0 border-b border-[#f0f4f5]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#eaf6f5] flex items-center justify-center shrink-0">
              <Calendar size={18} className="text-[#3a9898]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-[16px] font-bold text-[#1a2632]">
                  Schedule Patient Follow-up
                </h2>
                <span className="text-[10.5px] font-bold bg-[#eaf6f5] text-[#3a9898] border border-[#c4e4e0] px-2.5 py-1 rounded-full">
                  #{formData.patientId}
                </span>
              </div>
              <p className="text-[12px] text-[#8b9bae] mt-0.5">
                Book a post-treatment follow-up session with the attending
                physician.
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-5">
          {/* Section 1: Patient Profile */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-[#eaf6f5] flex items-center justify-center">
                <User size={13} className="text-[#3a9898]" />
              </div>
              <h3 className="text-[13px] font-bold text-[#1a2632]">
                1. Patient Credentials
              </h3>
            </div>

            <div className="flex gap-5">
              <div className="flex flex-col items-center gap-2.5 shrink-0">
                <div
                  onClick={() => fileRef.current?.click()}
                  className="w-[88px] h-[88px] rounded-full bg-[#f0f4f5] border-2 border-dashed border-[#c8d4dc] flex items-center justify-center cursor-pointer hover:border-[#3a9898] transition-colors overflow-hidden"
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Patient"
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
                  <Upload size={11} /> Photo Upload
                </button>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-3.5">
                <div>
                  <label className={labelCls}>Patient Name{reqStar}</label>
                  <input
                    className={inputCls}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className={labelCls}>Gender / Age{reqStar}</label>
                  <input
                    className={inputCls}
                    value={formData.genderAge}
                    onChange={(e) =>
                      setFormData({ ...formData, genderAge: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className={labelCls}>Assigned Doctor{reqStar}</label>
                  <input
                    className={inputCls}
                    value={formData.doctor}
                    onChange={(e) =>
                      setFormData({ ...formData, doctor: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className={labelCls}>Previous Consultation Date</label>
                  <input
                    className={inputCls}
                    value={formData.previousVisit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        previousVisit: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Follow-up Timing */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-[#eaf6f5] flex items-center justify-center">
                <Clock size={13} className="text-[#3a9898]" />
              </div>
              <h3 className="text-[13px] font-bold text-[#1a2632]">
                2. Follow-Up Schedule & Reason
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Follow-Up Date{reqStar}</label>
                <input
                  type="text"
                  className={inputCls}
                  value={formData.followUpDate}
                  onChange={(e) =>
                    setFormData({ ...formData, followUpDate: e.target.value })
                  }
                />
              </div>

              <div>
                <label className={labelCls}>Follow-Up Time{reqStar}</label>
                <input
                  className={inputCls}
                  value={formData.followUpTime}
                  onChange={(e) =>
                    setFormData({ ...formData, followUpTime: e.target.value })
                  }
                />
              </div>

              <div className="col-span-2">
                <label className={labelCls}>
                  Follow-up Reason / Clinical Notes{reqStar}
                </label>
                <input
                  className={inputCls}
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 py-4 border-t border-[#f0f4f5] flex items-center justify-between shrink-0 bg-white rounded-b-[20px]">
          <button
            type="button"
            onClick={onClose}
            className="text-[12.5px] font-semibold text-[#8b9bae] hover:text-[#e11d48] transition-colors px-4 py-2.5 rounded-xl hover:bg-red-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#3a9898]/20"
          >
            <CheckCircle2 size={15} />
            Confirm Follow-Up Schedule
          </button>
        </div>
      </div>
    </div>
  );
}

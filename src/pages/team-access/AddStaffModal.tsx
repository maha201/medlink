import { useState } from "react";
import {
  X,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Phone,
  Building2,
} from "lucide-react";

interface Props {
  onClose: () => void;
  onAddStaff: (staffData: any) => void;
}

const MODULE_LIST = [
  { id: "dashboard", label: "Dashboard & Analytics" },
  { id: "visitors", label: "Visitors Register" },
  { id: "consultation", label: "Consultation & OPD" },
  { id: "followups", label: "Patient Follow-ups" },
  { id: "pharmacy", label: "Pharmacy & Prescriptions" },
  { id: "billing", label: "Billing & Invoices" },
  { id: "reports", label: "Medical Reports" },
  { id: "settings", label: "Hospital Settings" },
];

export default function AddStaffModal({ onClose, onAddStaff }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Doctor",
    department: "Dental",
    shift: "Morning (08:00 AM - 04:00 PM)",
  });

  const [accessModules, setAccessModules] = useState<string[]>([
    "dashboard",
    "consultation",
    "followups",
  ]);

  const toggleModule = (id: string) => {
    setAccessModules((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    onAddStaff({
      ...formData,
      accessModules,
      status: "Active",
      joinedDate: "Today",
    });
    onClose();
  };

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all placeholder:text-[#b0bec8]";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-[850px] max-h-[92vh] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed] animate-in fade-in duration-200">
        {/* Modal Header */}
        <div className="px-7 py-5 flex items-start justify-between shrink-0 border-b border-[#f0f4f5]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#eaf6f5] flex items-center justify-center shrink-0">
              <UserPlus size={18} className="text-[#3a9898]" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-[#1a2632]">
                Add New Staff & Assign Software Access
              </h2>
              <p className="text-[12px] text-[#8b9bae] mt-0.5">
                Create staff profile and set granular module permissions inside
                hospital system.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae] hover:text-[#1a2632] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-5">
          {/* Section 1: Staff Details */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <h3 className="text-[13px] font-bold text-[#1a2632] mb-4 flex items-center gap-2">
              <Building2 size={15} className="text-[#3a9898]" />
              1. Staff Personal & Designation Info
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Anitha Ramesh"
                  className={inputCls}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className={labelCls}>
                  Email Address (Login ID){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="anitha@hospital.com"
                    className={inputCls}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <Mail
                    size={14}
                    className="absolute right-3 top-3 text-[#b0bec8]"
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Phone Number</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    className={inputCls}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                  <Phone
                    size={14}
                    className="absolute right-3 top-3 text-[#b0bec8]"
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Staff Role</label>
                <select
                  className={inputCls}
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Lab Technician">Lab Technician</option>
                  <option value="Billing Admin">Billing Admin</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>Department</label>
                <select
                  className={inputCls}
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                >
                  <option value="Dental">Dental</option>
                  <option value="General OPD">General OPD</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Accounts & Billing">Accounts & Billing</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>Duty Shift</label>
                <input
                  type="text"
                  className={inputCls}
                  value={formData.shift}
                  onChange={(e) =>
                    setFormData({ ...formData, shift: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Section 2: Software Access Matrix */}
          <div className="border border-[#e8edf2] rounded-[14px] p-5">
            <h3 className="text-[13px] font-bold text-[#1a2632] mb-1 flex items-center gap-2">
              <ShieldCheck size={15} className="text-[#3a9898]" />
              2. Grant System & Module Access
            </h3>
            <p className="text-[11.5px] text-[#8b9bae] mb-4">
              Select which software features this staff member can view or edit:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MODULE_LIST.map((mod) => {
                const isGranted = accessModules.includes(mod.id);
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => toggleModule(mod.id)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      isGranted
                        ? "border-[#3a9898] bg-[#eaf6f5] text-[#1a2632]"
                        : "border-[#e2e8ed] bg-[#f8fafb] text-[#8b9bae] hover:border-[#c4d4dc]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#3a9898]">
                        Module
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          isGranted ? "bg-[#3a9898] text-white" : "bg-[#dde5e7]"
                        }`}
                      >
                        {isGranted && <CheckCircle2 size={12} />}
                      </div>
                    </div>
                    <span className="text-[12px] font-bold leading-snug">
                      {mod.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
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
            Add Staff & Save Access
          </button>
        </div>
      </div>
    </div>
  );
}

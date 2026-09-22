import { useState } from "react";
import {
  Building2,
  Upload,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle2,
} from "lucide-react";

export default function ClinicProfileTab() {
  const [profile, setProfile] = useState({
    clinicName: "Apex Dental & Healthcare Centre",
    tagline: "Advanced Oral Care & Multispecialty Clinic",
    phone: "+91 98765 43210",
    altPhone: "+91 044 2345 6789",
    email: "contact@apexdental.com",
    addressLine1: "12, Main Canal Bank Road",
    addressLine2: "Near Gandhi Statue, Adyar",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600020",
    gstNumber: "33AAAAA0000A1Z5",
    regNumber: "TN-MED-2024-8891",
  });

  const [saved, setSaved] = useState(false);

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[10px] px-3.5 py-2.5 text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all placeholder:text-[#b0bec8]";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Clinic Logo & Brand Section */}
      <div className="border border-[#e8edf2] rounded-xl p-5 bg-[#f8fafb]">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-[#eaf6f5] border border-[#c4e4e0] flex flex-col items-center justify-center text-[#3a9898] font-bold text-center p-2 relative group cursor-pointer">
              <Building2 size={28} />
              <span className="text-[9px] uppercase tracking-wider mt-1 font-extrabold">
                Logo
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a2632]">
                Clinic Brand Identity
              </h4>
              <p className="text-xs text-[#8b9bae] mt-0.5">
                Upload ungal hospital logo. Ithudhan Invoices & Prescriptions-il
                print aagum.
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  className="px-3 py-1.5 bg-[#3a9898] text-white text-xs font-semibold rounded-lg hover:bg-[#2b6e6e] transition-all flex items-center gap-1.5"
                >
                  <Upload size={12} /> Upload Logo
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-white border border-[#dde5e7] text-[#5a6a76] text-xs font-semibold rounded-lg hover:bg-[#f0f4f5]"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Details */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider">
          Clinic Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>
              Clinic Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              className={inputCls}
              value={profile.clinicName}
              onChange={(e) =>
                setProfile({ ...profile, clinicName: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelCls}>Clinic Tagline / Subtitle</label>
            <input
              type="text"
              className={inputCls}
              value={profile.tagline}
              onChange={(e) =>
                setProfile({ ...profile, tagline: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelCls}>
              Primary Phone <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                className={inputCls}
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
              <Phone
                size={14}
                className="absolute right-3 top-3 text-[#b0bec8]"
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>
              Official Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                className={inputCls}
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
              <Mail
                size={14}
                className="absolute right-3 top-3 text-[#b0bec8]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Address Details */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider flex items-center gap-1.5">
          <MapPin size={14} className="text-[#3a9898]" /> Clinic Location &
          Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelCls}>Address Line 1</label>
            <input
              type="text"
              className={inputCls}
              value={profile.addressLine1}
              onChange={(e) =>
                setProfile({ ...profile, addressLine1: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelCls}>Address Line 2 (Area/Landmark)</label>
            <input
              type="text"
              className={inputCls}
              value={profile.addressLine2}
              onChange={(e) =>
                setProfile({ ...profile, addressLine2: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelCls}>City</label>
            <input
              type="text"
              className={inputCls}
              value={profile.city}
              onChange={(e) => setProfile({ ...profile, city: e.target.value })}
            />
          </div>
          <div>
            <label className={labelCls}>State</label>
            <input
              type="text"
              className={inputCls}
              value={profile.state}
              onChange={(e) =>
                setProfile({ ...profile, state: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelCls}>Pincode</label>
            <input
              type="text"
              className={inputCls}
              value={profile.pincode}
              onChange={(e) =>
                setProfile({ ...profile, pincode: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Registration & GST */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider flex items-center gap-1.5">
          <FileText size={14} className="text-[#3a9898]" /> Registration & Tax
          Compliance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>GSTIN Number</label>
            <input
              type="text"
              className={inputCls}
              value={profile.gstNumber}
              onChange={(e) =>
                setProfile({ ...profile, gstNumber: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelCls}>Medical Establishment Reg No.</label>
            <input
              type="text"
              className={inputCls}
              value={profile.regNumber}
              onChange={(e) =>
                setProfile({ ...profile, regNumber: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Save Action */}
      <div className="flex items-center justify-between pt-2">
        {saved ? (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
            <CheckCircle2 size={16} /> Profile settings saved successfully!
          </span>
        ) : (
          <span />
        )}
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
        >
          Save Profile Changes
        </button>
      </div>
    </form>
  );
}

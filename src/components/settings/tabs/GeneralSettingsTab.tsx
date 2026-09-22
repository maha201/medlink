import { useState } from "react";
import { User, Globe, Bell, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function GeneralSettingsTab() {
  const [general, setGeneral] = useState({
    patientIdPrefix: "PID-2026-",
    nextPatientNo: "05420",
    language: "English",
    smsAlerts: true,
    whatsappAlerts: true,
    emailAlerts: false,
    twoFactorAuth: true,
    sessionTimeout: "30",
  });

  const [saved, setSaved] = useState(false);

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[10px] px-3.5 py-2.5 text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";

  return (
    <div className="space-y-6">
      {/* Patient ID Generator Format */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider flex items-center gap-1.5">
          <User size={14} className="text-[#3a9898]" /> Patient ID Unique Format
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Patient ID Prefix</label>
            <input
              type="text"
              className={inputCls}
              value={general.patientIdPrefix}
              onChange={(e) =>
                setGeneral({ ...general, patientIdPrefix: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelCls}>Next Serial Sequence</label>
            <input
              type="text"
              className={inputCls}
              value={general.nextPatientNo}
              onChange={(e) =>
                setGeneral({ ...general, nextPatientNo: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Software Language */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider flex items-center gap-1.5">
          <Globe size={14} className="text-[#3a9898]" /> System Preferred
          Language
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Primary Interface Language</label>
            <select
              className={inputCls}
              value={general.language}
              onChange={(e) =>
                setGeneral({ ...general, language: e.target.value })
              }
            >
              <option value="English">English</option>
              <option value="Tamil">Tamil (தமிழ்)</option>
              <option value="Bilingual">English + Tamil Mixed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider flex items-center gap-1.5">
          <Bell size={14} className="text-[#3a9898]" /> Automated Patient
          Reminder Notifications
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f8fafb] border border-[#e8edf2]">
            <div>
              <span className="text-xs font-bold text-[#1a2632] block">
                SMS Reminders
              </span>
              <span className="text-[11px] text-[#8b9bae]">
                Send appointment SMS reminders 2 hours prior to consultation
              </span>
            </div>
            <input
              type="checkbox"
              checked={general.smsAlerts}
              onChange={(e) =>
                setGeneral({ ...general, smsAlerts: e.target.checked })
              }
              className="w-4 h-4 accent-[#3a9898]"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f8fafb] border border-[#e8edf2]">
            <div>
              <span className="text-xs font-bold text-[#1a2632] block">
                WhatsApp Messages
              </span>
              <span className="text-[11px] text-[#8b9bae]">
                Send automated Rx digital PDFs and invoices via WhatsApp API
              </span>
            </div>
            <input
              type="checkbox"
              checked={general.whatsappAlerts}
              onChange={(e) =>
                setGeneral({ ...general, whatsappAlerts: e.target.checked })
              }
              className="w-4 h-4 accent-[#3a9898]"
            />
          </div>
        </div>
      </div>

      {/* Security Preferences */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-[#3a9898]" /> Security & Staff
          Lock Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>
              Auto Logout / Inactive Session Timeout
            </label>
            <select
              className={inputCls}
              value={general.sessionTimeout}
              onChange={(e) =>
                setGeneral({ ...general, sessionTimeout: e.target.value })
              }
            >
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes (Recommended)</option>
              <option value="60">1 Hour</option>
              <option value="never">Never Lock Automatically</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f8fafb] border border-[#e8edf2] self-end">
            <div>
              <span className="text-xs font-bold text-[#1a2632] block">
                2FA for Staff Login
              </span>
              <span className="text-[11px] text-[#8b9bae]">
                Require OTP verification for remote logins
              </span>
            </div>
            <input
              type="checkbox"
              checked={general.twoFactorAuth}
              onChange={(e) =>
                setGeneral({ ...general, twoFactorAuth: e.target.checked })
              }
              className="w-4 h-4 accent-[#3a9898]"
            />
          </div>
        </div>
      </div>

      {/* Save Action */}
      <div className="flex items-center justify-between pt-2">
        {saved ? (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
            <CheckCircle2 size={16} /> General system settings saved!
          </span>
        ) : (
          <span />
        )}
        <button
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
          }}
          className="px-6 py-2.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
        >
          Save General Preferences
        </button>
      </div>
    </div>
  );
}

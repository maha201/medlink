import { useState } from "react";
import {
  Clock,
  AlertTriangle,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

export default function AppointmentSettingsTab() {
  const [settings, setSettings] = useState({
    slotDuration: "15",
    advanceBookingDays: "30",
    allowSameDay: true,
    minCancellationHours: "2",
    allowRefund: false,
    autoConfirmWalkin: true,
    enableTokenSystem: true,
  });

  const [saved, setSaved] = useState(false);

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[10px] px-3.5 py-2.5 text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";

  return (
    <div className="space-y-6">
      {/* Duration & Slotting */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider flex items-center gap-1.5">
          <Clock size={14} className="text-[#3a9898]" /> Slot Duration &
          Interval
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Default Consultation Slot Time</label>
            <select
              className={inputCls}
              value={settings.slotDuration}
              onChange={(e) =>
                setSettings({ ...settings, slotDuration: e.target.value })
              }
            >
              <option value="10">10 Minutes</option>
              <option value="15">15 Minutes (Recommended)</option>
              <option value="20">20 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="45">45 Minutes</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Max Advance Booking Window</label>
            <select
              className={inputCls}
              value={settings.advanceBookingDays}
              onChange={(e) =>
                setSettings({ ...settings, advanceBookingDays: e.target.value })
              }
            >
              <option value="7">7 Days Ahead</option>
              <option value="15">15 Days Ahead</option>
              <option value="30">30 Days Ahead</option>
              <option value="60">60 Days Ahead</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cancellation & Reschedule Rules */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider flex items-center gap-1.5">
          <AlertTriangle size={14} className="text-[#3a9898]" /> Cancellation &
          Reschedule Policy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>
              Minimum Notice Required for Cancellation
            </label>
            <select
              className={inputCls}
              value={settings.minCancellationHours}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  minCancellationHours: e.target.value,
                })
              }
            >
              <option value="1">1 Hour before slot</option>
              <option value="2">2 Hours before slot</option>
              <option value="4">4 Hours before slot</option>
              <option value="24">24 Hours before slot</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f8fafb] border border-[#e8edf2]">
            <div>
              <span className="text-xs font-bold text-[#1a2632] block">
                Same Day Booking
              </span>
              <span className="text-[11px] text-[#8b9bae]">
                Allow patients to book today's slots
              </span>
            </div>
            <input
              type="checkbox"
              checked={settings.allowSameDay}
              onChange={(e) =>
                setSettings({ ...settings, allowSameDay: e.target.checked })
              }
              className="w-4 h-4 accent-[#3a9898]"
            />
          </div>
        </div>
      </div>

      {/* Walk-in & Queue Rules */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider flex items-center gap-1.5">
          <UserCheck size={14} className="text-[#3a9898]" /> Walk-In Patient
          Queue Settings
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f8fafb] border border-[#e8edf2]">
            <div>
              <span className="text-xs font-bold text-[#1a2632] block">
                Auto-Assign Queue Tokens
              </span>
              <span className="text-[11px] text-[#8b9bae]">
                Generate sequential live token number for walk-in OPD entries
              </span>
            </div>
            <input
              type="checkbox"
              checked={settings.enableTokenSystem}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  enableTokenSystem: e.target.checked,
                })
              }
              className="w-4 h-4 accent-[#3a9898]"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f8fafb] border border-[#e8edf2]">
            <div>
              <span className="text-xs font-bold text-[#1a2632] block">
                Instant Confirmation
              </span>
              <span className="text-[11px] text-[#8b9bae]">
                Automatically approve walk-in visits without receptionist
                approval flag
              </span>
            </div>
            <input
              type="checkbox"
              checked={settings.autoConfirmWalkin}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  autoConfirmWalkin: e.target.checked,
                })
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
            <CheckCircle2 size={16} /> Appointment configurations saved!
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
          Save Appointment Rules
        </button>
      </div>
    </div>
  );
}

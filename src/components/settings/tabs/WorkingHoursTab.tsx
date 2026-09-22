import { useState } from "react";
import {
  Plus,
  Trash2,
  Clock,
  CalendarX,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";

interface Service {
  id: string;
  dept: string;
  serviceName: string;
  fee: number;
}

export default function WorkingHoursTab() {
  const [days, setDays] = useState([
    { day: "Monday", active: true, open: "09:00", close: "20:00" },
    { day: "Tuesday", active: true, open: "09:00", close: "20:00" },
    { day: "Wednesday", active: true, open: "09:00", close: "20:00" },
    { day: "Thursday", active: true, open: "09:00", close: "20:00" },
    { day: "Friday", active: true, open: "09:00", close: "20:00" },
    { day: "Saturday", active: true, open: "09:00", close: "18:00" },
    { day: "Sunday", active: false, open: "10:00", close: "14:00" },
  ]);

  const [holidays, setHolidays] = useState([
    { date: "2026-10-02", reason: "Gandhi Jayanti" },
    { date: "2026-11-08", reason: "Diwali Special Holiday" },
  ]);

  const [newHoliday, setNewHoliday] = useState({ date: "", reason: "" });

  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      dept: "Dental",
      serviceName: "General Dental Consultation",
      fee: 400,
    },
    {
      id: "2",
      dept: "Dental",
      serviceName: "Root Canal Treatment (RCT)",
      fee: 3500,
    },
    {
      id: "3",
      dept: "Pediatrics",
      serviceName: "Child Health Checkup",
      fee: 500,
    },
    {
      id: "4",
      dept: "General OPD",
      serviceName: "General Physician Consultation",
      fee: 300,
    },
  ]);

  const [newService, setNewService] = useState({
    dept: "Dental",
    serviceName: "",
    fee: "",
  });
  const [saved, setSaved] = useState(false);

  const inputCls =
    "bg-[#f8fafb] border border-[#e2e8ed] rounded-lg px-3 py-1.5 text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898]";

  const toggleDay = (index: number) => {
    const updated = [...days];
    updated[index].active = !updated[index].active;
    setDays(updated);
  };

  const addHoliday = () => {
    if (!newHoliday.date || !newHoliday.reason) return;
    setHolidays([...holidays, newHoliday]);
    setNewHoliday({ date: "", reason: "" });
  };

  const removeHoliday = (index: number) => {
    setHolidays(holidays.filter((_, i) => i !== index));
  };

  const addService = () => {
    if (!newService.serviceName || !newService.fee) return;
    setServices([
      ...services,
      {
        id: String(Date.now()),
        dept: newService.dept,
        serviceName: newService.serviceName,
        fee: Number(newService.fee),
      },
    ]);
    setNewService({ dept: "Dental", serviceName: "", fee: "" });
  };

  const removeService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Working Days & Hours */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider flex items-center gap-1.5">
          <Clock size={14} className="text-[#3a9898]" /> Weekly Operating Hours
        </h3>
        <div className="space-y-2.5">
          {days.map((item, index) => (
            <div
              key={item.day}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                item.active
                  ? "border-[#c4e4e0] bg-[#f2faf9]"
                  : "border-[#e2e8ed] bg-[#f8fafb]"
              }`}
            >
              <div className="flex items-center gap-3 w-32">
                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={() => toggleDay(index)}
                  className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] accent-[#3a9898]"
                />
                <span
                  className={`text-xs font-bold ${item.active ? "text-[#1a2632]" : "text-[#8b9bae]"}`}
                >
                  {item.day}
                </span>
              </div>

              {item.active ? (
                <div className="flex items-center gap-2 text-xs text-[#5a6a76]">
                  <input
                    type="time"
                    value={item.open}
                    onChange={(e) => {
                      const updated = [...days];
                      updated[index].open = e.target.value;
                      setDays(updated);
                    }}
                    className={inputCls}
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={item.close}
                    onChange={(e) => {
                      const updated = [...days];
                      updated[index].close = e.target.value;
                      setDays(updated);
                    }}
                    className={inputCls}
                  />
                </div>
              ) : (
                <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                  Closed / Holiday
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Holidays */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider flex items-center gap-1.5">
          <CalendarX size={14} className="text-[#3a9898]" /> Special Non-Working
          Days / Holidays
        </h3>

        <div className="flex gap-2 flex-wrap">
          <input
            type="date"
            value={newHoliday.date}
            onChange={(e) =>
              setNewHoliday({ ...newHoliday, date: e.target.value })
            }
            className={inputCls}
          />
          <input
            type="text"
            placeholder="Reason (e.g. Festival)"
            value={newHoliday.reason}
            onChange={(e) =>
              setNewHoliday({ ...newHoliday, reason: e.target.value })
            }
            className={`${inputCls} flex-1 min-w-[200px]`}
          />
          <button
            type="button"
            onClick={addHoliday}
            className="px-4 py-1.5 bg-[#3a9898] text-white text-xs font-bold rounded-lg hover:bg-[#2b6e6e] flex items-center gap-1"
          >
            <Plus size={14} /> Add Holiday
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
          {holidays.map((h, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl border border-[#dde5e7] bg-[#f8fafb]"
            >
              <div>
                <span className="text-xs font-bold text-[#1a2632] block">
                  {h.reason}
                </span>
                <span className="text-[11px] font-semibold text-[#3a9898]">
                  {h.date}
                </span>
              </div>
              <button
                onClick={() => removeHoliday(i)}
                className="text-[#8b9bae] hover:text-rose-500 transition-colors p-1"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Departments & Services Fees */}
      <div className="border border-[#e8edf2] rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider flex items-center gap-1.5">
          <Stethoscope size={14} className="text-[#3a9898]" /> Departments &
          Consultation Services
        </h3>

        <div className="flex gap-2 flex-wrap bg-[#f8fafb] p-3 rounded-xl border border-[#e8edf2]">
          <select
            value={newService.dept}
            onChange={(e) =>
              setNewService({ ...newService, dept: e.target.value })
            }
            className={inputCls}
          >
            <option value="Dental">Dental</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="General OPD">General OPD</option>
            <option value="Orthopedics">Orthopedics</option>
          </select>
          <input
            type="text"
            placeholder="Service / Procedure Name"
            value={newService.serviceName}
            onChange={(e) =>
              setNewService({ ...newService, serviceName: e.target.value })
            }
            className={`${inputCls} flex-1 min-w-[200px]`}
          />
          <input
            type="number"
            placeholder="Fee (₹)"
            value={newService.fee}
            onChange={(e) =>
              setNewService({ ...newService, fee: e.target.value })
            }
            className={`${inputCls} w-28`}
          />
          <button
            type="button"
            onClick={addService}
            className="px-4 py-1.5 bg-[#3a9898] text-white text-xs font-bold rounded-lg hover:bg-[#2b6e6e] flex items-center gap-1"
          >
            <Plus size={14} /> Add Service
          </button>
        </div>

        <div className="divide-y divide-[#eef3f5] border border-[#dde5e7] rounded-xl overflow-hidden">
          {services.map((s) => (
            <div
              key={s.id}
              className="p-3.5 flex items-center justify-between hover:bg-[#f8fafb]"
            >
              <div>
                <span className="text-xs font-bold text-[#1a2632]">
                  {s.serviceName}
                </span>
                <span className="text-[10px] font-semibold text-[#3a9898] bg-[#eaf6f5] px-2 py-0.5 rounded-full ml-2 border border-[#c4e4e0]">
                  {s.dept}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-[#1a2632]">
                  ₹{s.fee}
                </span>
                <button
                  onClick={() => removeService(s.id)}
                  className="text-[#8b9bae] hover:text-rose-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-2">
        {saved ? (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
            <CheckCircle2 size={16} /> Timings & Services saved!
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
          Save Timings & Fees
        </button>
      </div>
    </div>
  );
}

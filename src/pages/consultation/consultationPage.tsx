import { useState } from "react";
import { UserPlus, ArrowUpDown, ChevronDown, Play } from "lucide-react";
import AddConsultationModal from "./AddConsultationModal";

interface ConsultationRecord {
  id: string;
  name: string;
  patientId: string;
  gender: "female" | "male";
  age: number;
  reason: string;
  doctor: string;
  specialty: string;
  patientType: "OPD" | "Follow Up" | "Emergency" | "Appointment";
  time: string;
  location: string;
  status: "Start" | "In Treatment" | "Completed";
  highlight?: boolean;
}

const initialConsultations: ConsultationRecord[] = [
  {
    id: "1",
    name: "Alicia Perth",
    patientId: "PT-2035-001",
    gender: "female",
    age: 34,
    reason: "Tooth Pain",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "OPD",
    time: "1:00 PM",
    location: "ICU 02 - 1st Floor",
    status: "Start",
  },
  {
    id: "2",
    name: "Bima Kurnia",
    patientId: "PT-2035-024",
    gender: "male",
    age: 29,
    reason: "Gum Bleeding",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "Follow Up",
    time: "1:00 PM",
    location: "ICU 02 - 1st Floor",
    status: "Start",
  },
  {
    id: "3",
    name: "Clara Wright",
    patientId: "PT-2035-053",
    gender: "female",
    age: 7,
    reason: "Other",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "Emergency",
    time: "1:00 PM",
    location: "ICU 02 - 1st Floor",
    status: "In Treatment",
  },
  {
    id: "4",
    name: "Daniel Wong",
    patientId: "PT-2035-078",
    gender: "male",
    age: 42,
    reason: "Tooth Sensitivity",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "Appointment",
    time: "3:10 PM",
    location: "Room 402B - 4th Floor",
    status: "Start",
    highlight: true, // Image light green row highlight
  },
];

export default function ConsultationPage() {
  const [records, setRecords] =
    useState<ConsultationRecord[]>(initialConsultations);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Filters State
  const [genderFilter, setGenderFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const handleAddConsultation = (newConsult: any) => {
    const newEntry: ConsultationRecord = {
      id: String(Date.now()),
      name: newConsult.name || "Patient Name",
      patientId:
        newConsult.patientId ||
        `PT-2035-${Math.floor(100 + Math.random() * 900)}`,
      gender: newConsult.genderAge?.toLowerCase().includes("female")
        ? "female"
        : "male",
      age: parseInt(newConsult.genderAge?.replace(/\D/g, "")) || 25,
      reason: newConsult.reason || "General Checkup",
      doctor: newConsult.doctor || "Dr. Sriram",
      specialty: newConsult.specialty || "Dentist",
      patientType: newConsult.patientType || "OPD",
      time: newConsult.time || "2:00 PM",
      location: newConsult.location || "Room 101",
      status: "Start",
    };
    setRecords([newEntry, ...records]);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(records.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isAllSelected =
    records.length > 0 && records.every((r) => selectedIds.includes(r.id));

  const toggleStatus = (id: string) => {
    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id === id) {
          const nextStatus =
            rec.status === "Start" ? "In Treatment" : "Completed";
          return { ...rec, status: nextStatus };
        }
        return rec;
      }),
    );
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Consultation Modal Trigger */}
      {showModal && (
        <AddConsultationModal
          onClose={() => setShowModal(false)}
          onAddConsultation={handleAddConsultation}
        />
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* ── Top Bar / Header ── */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-col sm:flex-row gap-4">
          <h2 className="text-2xl font-bold text-[#1a2632]">Consultation</h2>

          {/* Filters & Register Button */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Gender Filter Badge */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#eaf6f5] text-[#3a9898] rounded-full text-xs font-semibold border border-[#c4e4e0] cursor-pointer hover:bg-[#d8efed] transition-colors">
              <span>Gender</span>
              <ChevronDown size={14} />
            </div>

            {/* Age Filter Badge */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#eaf6f5] text-[#3a9898] rounded-full text-xs font-semibold border border-[#c4e4e0] cursor-pointer hover:bg-[#d8efed] transition-colors">
              <span>Age</span>
              <ChevronDown size={14} />
            </div>

            {/* Patient Type Filter Badge */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#eaf6f5] text-[#3a9898] rounded-full text-xs font-semibold border border-[#c4e4e0] cursor-pointer hover:bg-[#d8efed] transition-colors">
              <span>Patient Type</span>
              <ChevronDown size={14} />
            </div>

            {/* Condition Filter Badge */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#eaf6f5] text-[#3a9898] rounded-full text-xs font-semibold border border-[#c4e4e0] cursor-pointer hover:bg-[#d8efed] transition-colors">
              <span>Condition</span>
              <ChevronDown size={14} />
            </div>

            {/* Register Patient Primary Button */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-[#3a9898]/20 ml-2"
            >
              <UserPlus size={15} strokeWidth={2.5} />
              Register Patient
            </button>
          </div>
        </div>

        {/* ── Table Area ── */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafb] border-b border-[#dde5e7]">
                <th className="py-4 pl-6 pr-4 w-12">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={isAllSelected}
                    className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-white cursor-pointer accent-[#3a9898]"
                  />
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Name <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Gender / Age <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Reason for visit <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Doctor <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Patient Type <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Time <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Location <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-1 cursor-pointer">
                    Action <ArrowUpDown size={12} />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eef3f5]">
              {records.map((row) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <tr
                    key={row.id}
                    className={`transition-colors ${
                      row.highlight
                        ? "bg-[#f2faf9] hover:bg-[#eaf6f5]"
                        : "hover:bg-[#f8fafb]"
                    }`}
                  >
                    <td className="py-4 pl-6 pr-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(row.id)}
                        className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-white cursor-pointer accent-[#3a9898]"
                      />
                    </td>

                    {/* Name & ID */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#c8d8dc] shrink-0 overflow-hidden flex items-center justify-center text-white text-xs font-bold">
                          {row.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#1a2632]">
                            {row.name}
                          </div>
                          <div className="text-xs text-[#8b9bae]">
                            #{row.patientId}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Gender / Age */}
                    <td className="py-4 px-4 text-xs font-bold text-[#3a9898]">
                      {row.gender === "female" ? "♀" : "♂"} / {row.age}
                    </td>

                    {/* Reason for Visit */}
                    <td className="py-4 px-4 text-xs font-bold text-[#3a9898]">
                      {row.reason}
                    </td>

                    {/* Doctor */}
                    <td className="py-4 px-4">
                      <div className="text-xs font-bold text-[#1a2632]">
                        {row.doctor}
                      </div>
                      <div className="text-[11px] text-[#8b9bae]">
                        {row.specialty}
                      </div>
                    </td>

                    {/* Patient Type */}
                    <td className="py-4 px-4 text-xs font-semibold text-[#1a2632]">
                      {row.patientType}
                    </td>

                    {/* Time */}
                    <td className="py-4 px-4 text-xs font-semibold text-[#1a2632]">
                      {row.time}
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4 text-xs font-semibold text-[#1a2632]">
                      {row.location}
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => toggleStatus(row.id)}
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          row.status === "In Treatment"
                            ? "bg-[#3a9898] text-white"
                            : "bg-[#3a9898] text-white hover:bg-[#2b6e6e]"
                        }`}
                      >
                        {row.status === "Start" && (
                          <div className="w-3.5 h-3.5 border border-white border-dashed rounded-full flex items-center justify-center">
                            <Play size={8} fill="currentColor" />
                          </div>
                        )}
                        {row.status}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Bar */}
        <div className="p-4 border-t border-[#dde5e7] flex items-center justify-between text-xs text-[#5a6a76]">
          <div>
            Showing 1 to {records.length} of {records.length} entries
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7]">
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-[#3a9898] text-white font-medium">
              1
            </button>
            <button className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors">
              2
            </button>
            <button className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import {
  CalendarPlus,
  ArrowUpDown,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
import AddFollowUpModal from "./AddFollowUpModal";

interface FollowUpRecord {
  id: string;
  name: string;
  patientId: string;
  gender: "female" | "male";
  age: number;
  reason: string;
  doctor: string;
  specialty: string;
  previousVisit: string;
  followUpDate: string;
  followUpTime: string;
  location: string;
  status: "Due Today" | "Scheduled" | "Completed" | "Overdue";
  highlight?: boolean;
}

const initialFollowUps: FollowUpRecord[] = [
  {
    id: "1",
    name: "Alicia Perth",
    patientId: "PT-2035-001",
    gender: "female",
    age: 34,
    reason: "Post Tooth Extraction Review",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    previousVisit: "Sep 12, 2026",
    followUpDate: "Today",
    followUpTime: "02:30 PM",
    location: "ICU 02 - 1st Floor",
    status: "Due Today",
  },
  {
    id: "2",
    name: "Bima Kurnia",
    patientId: "PT-2035-024",
    gender: "male",
    age: 29,
    reason: "Gum Bleeding Follow-up",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    previousVisit: "Sep 10, 2026",
    followUpDate: "Sep 22, 2026",
    followUpTime: "11:00 AM",
    location: "ICU 02 - 1st Floor",
    status: "Scheduled",
  },
  {
    id: "3",
    name: "Clara Wright",
    patientId: "PT-2035-053",
    gender: "female",
    age: 7,
    reason: "Pediatric Dental Check",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    previousVisit: "Sep 05, 2026",
    followUpDate: "Sep 18, 2026",
    followUpTime: "10:00 AM",
    location: "ICU 02 - 1st Floor",
    status: "Completed",
  },
  {
    id: "4",
    name: "Daniel Wong",
    patientId: "PT-2035-078",
    gender: "male",
    age: 42,
    reason: "Root Canal Follow-up",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    previousVisit: "Sep 01, 2026",
    followUpDate: "Sep 15, 2026",
    followUpTime: "04:00 PM",
    location: "Room 402B - 4th Floor",
    status: "Overdue",
    highlight: true, // Selected highlight matching your image style
  },
];

export default function FollowUpPage() {
  const [records, setRecords] = useState<FollowUpRecord[]>(initialFollowUps);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<
    "all" | "today" | "pending" | "completed"
  >("all");
  const [showModal, setShowModal] = useState(false);

  const handleAddFollowUp = (data: any) => {
    const newEntry: FollowUpRecord = {
      id: String(Date.now()),
      name: data.name || "Patient Name",
      patientId:
        data.patientId || `PT-2035-${Math.floor(100 + Math.random() * 900)}`,
      gender: data.genderAge?.toLowerCase().includes("female")
        ? "female"
        : "male",
      age: parseInt(data.genderAge?.replace(/\D/g, "")) || 30,
      reason: data.reason || "General Follow-up",
      doctor: data.doctor || "Dr. Sriram",
      specialty: data.specialty || "Dentist",
      previousVisit: data.previousVisit || "Sep 14, 2026",
      followUpDate: data.followUpDate || "Today",
      followUpTime: data.followUpTime || "03:00 PM",
      location: data.location || "Room 101",
      status: "Scheduled",
    };
    setRecords([newEntry, ...records]);
  };

  const filteredRecords = records.filter((rec) => {
    if (activeTab === "today") return rec.status === "Due Today";
    if (activeTab === "pending")
      return rec.status === "Scheduled" || rec.status === "Overdue";
    if (activeTab === "completed") return rec.status === "Completed";
    return true;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredRecords.map((r) => r.id));
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
    filteredRecords.length > 0 &&
    filteredRecords.every((r) => selectedIds.includes(r.id));

  const markCompleted = (id: string) => {
    setRecords((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, status: "Completed", highlight: false } : rec,
      ),
    );
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Follow-up Modal */}
      {showModal && (
        <AddFollowUpModal
          onClose={() => setShowModal(false)}
          onAddFollowUp={handleAddFollowUp}
        />
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header Bar */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-col lg:flex-row gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1a2632]">
              Patient Follow-ups
            </h2>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Tab Filter Pills */}
            <div className="bg-[#f0f4f5] p-1 rounded-full flex items-center gap-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  activeTab === "all"
                    ? "bg-white text-[#3a9898] shadow-sm"
                    : "text-[#5a6a76] hover:text-[#1a2632]"
                }`}
              >
                All ({records.length})
              </button>
              <button
                onClick={() => setActiveTab("today")}
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  activeTab === "today"
                    ? "bg-white text-[#3a9898] shadow-sm"
                    : "text-[#5a6a76] hover:text-[#1a2632]"
                }`}
              >
                Due Today (
                {records.filter((r) => r.status === "Due Today").length})
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  activeTab === "pending"
                    ? "bg-white text-[#3a9898] shadow-sm"
                    : "text-[#5a6a76] hover:text-[#1a2632]"
                }`}
              >
                Pending
              </button>
            </div>

            {/* Filter Badges */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#eaf6f5] text-[#3a9898] rounded-full text-xs font-semibold border border-[#c4e4e0] cursor-pointer hover:bg-[#d8efed] transition-colors">
                <span>Doctor</span>
                <ChevronDown size={14} />
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#eaf6f5] text-[#3a9898] rounded-full text-xs font-semibold border border-[#c4e4e0] cursor-pointer hover:bg-[#d8efed] transition-colors">
                <span>Status</span>
                <ChevronDown size={14} />
              </div>
            </div>

            {/* Add Schedule Button */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-[#3a9898]/20"
            >
              <CalendarPlus size={15} strokeWidth={2.5} />
              Schedule Follow-up
            </button>
          </div>
        </div>

        {/* Table Area */}
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
                    Patient Name <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Gender / Age <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Follow-up Reason <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Doctor <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Last Visit <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Follow-up Date & Time <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Location <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-1 cursor-pointer">
                    Action / Status <ArrowUpDown size={12} />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eef3f5]">
              {filteredRecords.map((row) => {
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

                    {/* Patient Name & ID */}
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

                    {/* Follow-up Reason */}
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

                    {/* Last Visit */}
                    <td className="py-4 px-4 text-xs text-[#5a6a76]">
                      {row.previousVisit}
                    </td>

                    {/* Follow-up Date & Time */}
                    <td className="py-4 px-4">
                      <div className="text-xs font-bold text-[#1a2632]">
                        {row.followUpDate}
                      </div>
                      <div className="text-[11px] text-[#3a9898] font-semibold">
                        {row.followUpTime}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4 text-xs font-semibold text-[#1a2632]">
                      {row.location}
                    </td>

                    {/* Action Button & Status Badge */}
                    <td className="py-4 px-6 text-center">
                      {row.status === "Completed" ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-200">
                          <CheckCircle size={12} /> Completed
                        </span>
                      ) : (
                        <button
                          onClick={() => markCompleted(row.id)}
                          className={`inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            row.status === "Due Today"
                              ? "bg-[#3a9898] text-white hover:bg-[#2b6e6e]"
                              : row.status === "Overdue"
                                ? "bg-rose-500 text-white hover:bg-rose-600"
                                : "bg-[#3a9898] text-white hover:bg-[#2b6e6e]"
                          }`}
                        >
                          {row.status === "Due Today"
                            ? "Start Visit"
                            : row.status}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 border-t border-[#dde5e7] flex items-center justify-between text-xs text-[#5a6a76]">
          <div>
            Showing 1 to {filteredRecords.length} of {records.length} entries
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

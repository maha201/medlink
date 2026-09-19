import { useState } from "react";
import { UserPlus, ArrowUpDown } from "lucide-react";
import AddVisitorModal from "./AddVisitorsModal";

interface Visitor {
  id: string;
  name: string;
  visitorId: string;
  mobile: string;
  visitorType: string;
  whomToVisit: string;
  department: string;
  checkIn: string;
  checkOut: string;
  remarks: string;
  status: "In Hospital" | "Checked Out";
}

const initialVisitors: Visitor[] = [
  {
    id: "1",
    name: "Alicia Perth",
    visitorId: "PT-2035-001",
    mobile: "+91 98450 23145",
    visitorType: "Family / Relative",
    whomToVisit: "Daniel Wong",
    department: "Room 402B • Ortho",
    checkIn: "09:45 AM",
    checkOut: "10:45 AM",
    remarks: "RFID badge #842 issued",
    status: "In Hospital",
  },
  {
    id: "2",
    name: "Bima Kurnia",
    visitorId: "PT-2035-024",
    mobile: "+91 98450 23145",
    visitorType: "Vendor / Guest",
    whomToVisit: "Dr. Sriram",
    department: "Dentist",
    checkIn: "09:45 AM",
    checkOut: "10:45 AM",
    remarks: "Equipment review demo",
    status: "Checked Out",
  },
  {
    id: "3",
    name: "Clara Wright",
    visitorId: "PT-2035-053",
    mobile: "+91 98450 23145",
    visitorType: "Other",
    whomToVisit: "Pooja Sharma",
    department: "Maternity Ward 201",
    checkIn: "09:45 AM",
    checkOut: "10:45 AM",
    remarks: "Pass badge #V-8902 returned",
    status: "Checked Out",
  },
  {
    id: "4",
    name: "Daniel Wong",
    visitorId: "PT-2035-078",
    mobile: "+91 98450 23145",
    visitorType: "Tooth Sensitivity",
    whomToVisit: "Dr. Sriram",
    department: "Dentist",
    checkIn: "09:45 AM",
    checkOut: "10:45 AM",
    remarks: "Equipment review demo",
    status: "In Hospital",
  },
  {
    id: "5",
    name: "Erica Smith",
    visitorId: "PT-2035-091",
    mobile: "+91 98450 23145",
    visitorType: "Other",
    whomToVisit: "Dr. Sriram",
    department: "Dentist",
    checkIn: "09:45 AM",
    checkOut: "10:45 AM",
    remarks: "Equipment review demo",
    status: "Checked Out",
  },
  {
    id: "6",
    name: "Francis Rowe",
    visitorId: "PT-2035-129",
    mobile: "+91 98450 23145",
    visitorType: "Other",
    whomToVisit: "Dr. Sriram",
    department: "Dentist",
    checkIn: "09:45 AM",
    checkOut: "10:45 AM",
    remarks: "Equipment review demo",
    status: "Checked Out",
  },
  {
    id: "7",
    name: "Grace Nathanile",
    visitorId: "PT-2035-141",
    mobile: "+91 98450 23145",
    visitorType: "Tooth Sensitivity",
    whomToVisit: "Dr. Sriram",
    department: "Dentist",
    checkIn: "09:45 AM",
    checkOut: "10:45 AM",
    remarks: "Equipment review demo",
    status: "In Hospital",
  },
  {
    id: "8",
    name: "Hasan Malik",
    visitorId: "PT-2035-152",
    mobile: "+91 98450 23145",
    visitorType: "Tooth Sensitivity",
    whomToVisit: "Dr. Sriram",
    department: "Dentist",
    checkIn: "09:45 AM",
    checkOut: "10:45 AM",
    remarks: "Equipment review demo",
    status: "Checked Out",
  },
];

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>(initialVisitors);
  const [activeTab, setActiveTab] = useState<"all" | "in" | "out">("all");
  const [selectedVisitors, setSelectedVisitors] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddVisitor = (newVisitorData: any) => {
    const newEntry: Visitor = {
      id: String(Date.now()),
      name: newVisitorData.name || "New Visitor",
      visitorId: `VIS-2035-${Math.floor(100 + Math.random() * 900)}`,
      mobile: newVisitorData.mobile || "+91 00000 00000",
      visitorType: newVisitorData.visitorType || "Family / Relative",
      whomToVisit: newVisitorData.whomToVisit || "Hospital Ward",
      department: "General Ward",
      checkIn: newVisitorData.checkIn || "Just now",
      checkOut: newVisitorData.checkOut || "In 2 Hours",
      remarks: newVisitorData.remarks || "No remarks",
      status: "In Hospital",
    };
    setVisitors([newEntry, ...visitors]);
  };

  const filteredVisitors = visitors.filter((visitor) => {
    if (activeTab === "in") return visitor.status === "In Hospital";
    if (activeTab === "out") return visitor.status === "Checked Out";
    return true;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedVisitors(filteredVisitors.map((v) => v.id));
    } else {
      setSelectedVisitors([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedVisitors((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isAllSelected =
    filteredVisitors.length > 0 &&
    filteredVisitors.every((v) => selectedVisitors.includes(v.id));

  return (
    <div className="animate-in fade-in duration-500">
      {/* ── Add Visitor Modal Triggered State ── */}
      {showModal && (
        <AddVisitorModal
          onClose={() => setShowModal(false)}
          onAddVisitor={handleAddVisitor}
        />
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-col sm:flex-row gap-4">
          <h2 className="text-xl font-bold text-[#1a2632]">
            Visitors Directory
          </h2>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Tabs Filter */}
            <div className="bg-[#f0f4f5] p-1 rounded-full flex items-center gap-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  activeTab === "all"
                    ? "bg-white text-[#3a9898] shadow-sm"
                    : "text-[#5a6a76] hover:text-[#1a2632]"
                }`}
              >
                All Visitors ({visitors.length})
              </button>
              <button
                onClick={() => setActiveTab("in")}
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  activeTab === "in"
                    ? "bg-white text-[#3a9898] shadow-sm"
                    : "text-[#5a6a76] hover:text-[#1a2632]"
                }`}
              >
                In Hospital (
                {visitors.filter((v) => v.status === "In Hospital").length})
              </button>
              <button
                onClick={() => setActiveTab("out")}
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  activeTab === "out"
                    ? "bg-white text-[#3a9898] shadow-sm"
                    : "text-[#5a6a76] hover:text-[#1a2632]"
                }`}
              >
                Checked Out (
                {visitors.filter((v) => v.status === "Checked Out").length})
              </button>
            </div>

            <div className="w-px h-8 bg-[#dde5e7] hidden sm:block"></div>

            {/* Add Visitor Button Trigger */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20"
            >
              <UserPlus size={16} strokeWidth={2.5} />
              Add New Visitor
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#dde5e7]">
                <th className="py-4 pl-6 pr-4 w-12">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={isAllSelected}
                    className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer accent-[#3a9898]"
                  />
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Visitor Name & ID <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Mobile Number <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Visitor Type <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Whom to Visit <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Check-In <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Check-Out <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Remarks <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-1 cursor-pointer">
                    Status <ArrowUpDown size={12} />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#dde5e7]">
              {filteredVisitors.map((row) => {
                const isSelected = selectedVisitors.includes(row.id);
                return (
                  <tr
                    key={row.id}
                    className="hover:bg-[#f5f7f8] transition-colors group"
                  >
                    <td className="py-4 pl-6 pr-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(row.id)}
                        className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer accent-[#3a9898]"
                      />
                    </td>

                    {/* Name & ID */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#dde5e7] shrink-0 overflow-hidden">
                          <div className="w-full h-full bg-gray-200"></div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#1a2632]">
                            {row.name}
                          </div>
                          <div className="text-xs text-[#8b9bae]">
                            #{row.visitorId}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Mobile */}
                    <td className="py-4 px-4 text-sm font-medium text-[#5a6a76]">
                      {row.mobile}
                    </td>

                    {/* Visitor Type */}
                    <td className="py-4 px-4">
                      {row.visitorType === "Family / Relative" ||
                      row.visitorType === "Vendor / Guest" ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#eaf6f5] text-[#3a9898] border border-[#c4e4e0] text-xs font-bold">
                          {row.visitorType}
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-[#3a9898]">
                          {row.visitorType}
                        </span>
                      )}
                    </td>

                    {/* Whom To Visit */}
                    <td className="py-4 px-4">
                      <div className="text-sm font-bold text-[#1a2632]">
                        {row.whomToVisit}
                      </div>
                      <div className="text-xs text-[#8b9bae]">
                        {row.department}
                      </div>
                    </td>

                    {/* Check-In */}
                    <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                      {row.checkIn}
                    </td>

                    {/* Check-Out */}
                    <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                      {row.checkOut}
                    </td>

                    {/* Remarks */}
                    <td className="py-4 px-4 text-sm text-[#5a6a76]">
                      {row.remarks}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6 text-center">
                      {row.status === "In Hospital" ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0]">
                            In Hospital
                          </span>
                          <button className="text-[11px] text-[#8b9bae] hover:text-[#1a2632] border border-[#dde5e7] px-2 py-0.5 rounded bg-white font-medium hover:bg-[#f5f7f8] transition-colors">
                            Quick Out
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-[#5a6a76]">
                          Checked Out
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-[#dde5e7] flex items-center justify-between text-sm text-[#5a6a76]">
          <div>
            Showing 1 to {filteredVisitors.length} of {visitors.length} entries
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
            <button className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors">
              3
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

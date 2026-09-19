import React, { useState } from "react";
import { ChevronDown, Printer, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export interface ReportItem {
  id: string;
  name: string;
  gender: "Female" | "Male";
  age: number;
  reason: string;
  doctor: string;
  specialty: string;
  patientType: "New Consultation" | "Follow Up" | "Emergency" | "Appointment";
  time: string;
  location: string;
  status: "Completed" | "Pending" | "Cancelled";
}

const reportsData: ReportItem[] = [
  {
    id: "PT-2035-001",
    name: "Alicia Perth",
    gender: "Female",
    age: 34,
    reason: "Tooth Pain",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "New Consultation",
    time: "1:00 PM",
    location: "ICU 02 - 1st Floor",
    status: "Completed",
  },
  {
    id: "PT-2035-024",
    name: "Bima Kurnia",
    gender: "Male",
    age: 29,
    reason: "Gum Bleeding",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "Follow Up",
    time: "1:00 PM",
    location: "ICU 02 - 1st Floor",
    status: "Completed",
  },
  {
    id: "PT-2035-053",
    name: "Clara Wright",
    gender: "Female",
    age: 7,
    reason: "Other",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "Emergency",
    time: "1:00 PM",
    location: "ICU 02 - 1st Floor",
    status: "Completed",
  },
  {
    id: "PT-2035-078",
    name: "Daniel Wong",
    gender: "Male",
    age: 42,
    reason: "Tooth Sensitivity",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "Appointment",
    time: "3:10 PM",
    location: "Room 402B - 4th Floor",
    status: "Completed",
  },
  {
    id: "PT-2035-091",
    name: "Erica Smith",
    gender: "Female",
    age: 26,
    reason: "Other",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "Emergency",
    time: "1:00 PM",
    location: "ICU 02 - 1st Floor",
    status: "Completed",
  },
  {
    id: "PT-2035-129",
    name: "Francis Rowe",
    gender: "Male",
    age: 51,
    reason: "Other",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "New Consultation",
    time: "1:00 PM",
    location: "Room 305A - 3rd Floor",
    status: "Completed",
  },
  {
    id: "PT-2035-141",
    name: "Grace Nathanile",
    gender: "Female",
    age: 31,
    reason: "Tooth Sensitivity",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "Follow Up",
    time: "1:00 PM",
    location: "ICU 02 - 1st Floor",
    status: "Completed",
  },
  {
    id: "PT-2035-152",
    name: "Hasan Malik",
    gender: "Male",
    age: 47,
    reason: "Tooth Sensitivity",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "Follow Up",
    time: "1:00 PM",
    location: "Room 210C - 2nd Floor",
    status: "Completed",
  },
  {
    id: "PT-2035-163",
    name: "Indah Lestari",
    gender: "Female",
    age: 9,
    reason: "Other",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "New Consultation",
    time: "1:00 PM",
    location: "ICU 02 - 1st Floor",
    status: "Completed",
  },
  {
    id: "PT-2035-175",
    name: "Johan Greece",
    gender: "Male",
    age: 38,
    reason: "Denture Problem",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "New Consultation",
    time: "1:00 PM",
    location: "ICU 02 - 1st Floor",
    status: "Completed",
  },
  {
    id: "PT-2035-188",
    name: "Liam Becker",
    gender: "Male",
    age: 52,
    reason: "Denture Problem",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "Follow Up",
    time: "2:00 PM",
    location: "Room 108A - 1st Floor",
    status: "Completed",
  },
  {
    id: "PT-2035-196",
    name: "Mei Tan",
    gender: "Female",
    age: 36,
    reason: "Tooth Sensitivity",
    doctor: "Dr. Sriram",
    specialty: "Dentist",
    patientType: "New Consultation",
    time: "3:20 PM",
    location: "ICU 02 - 1st Floor",
    status: "Completed",
  },
];

export default function ReportsPage(): React.ReactElement {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      setSelectedRows(reportsData.map((r) => r.id));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleSelectRow = (id: string): void => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleExport = (): void => {
    // Export functionality logic goes here
    alert("Exporting report CSV / Passes...");
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Filter Controls */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-[#1a2632]">Report</h2>

          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {["Gender", "Age", "Patient Type"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 bg-[#f5f7f8] hover:bg-[#eaf6f5] text-[#5a6a76] hover:text-[#3a9898] text-xs font-semibold rounded-full transition-colors border border-[#dde5e7] hover:border-[#b5d9d5]"
                >
                  {filter}
                  <ChevronDown size={14} />
                </button>
              ))}
            </div>

            <button
              onClick={handleExport}
              type="button"
              className="flex items-center gap-2 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20"
            >
              <Printer size={15} strokeWidth={2} />
              Export CSV / Passes
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#dde5e7]">
                <th className="py-4 pl-6 pr-4 w-12">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={
                      selectedRows.length === reportsData.length &&
                      reportsData.length > 0
                    }
                    className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer"
                  />
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  Name ↕
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  Gender / Age ↕
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  Reason for visit ↕
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  Doctor ↕
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  Patient Type ↕
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  Time ↕
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                  Location ↕
                </th>
                <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] whitespace-nowrap text-center">
                  Status ↕
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dde5e7]">
              {reportsData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#f5f7f8] transition-colors group"
                >
                  <td className="py-4 pl-6 pr-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleSelectRow(row.id)}
                      className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer"
                    />
                  </td>

                  {/* Patient Name & Identifier */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#dde5e7] shrink-0 overflow-hidden">
                        <div className="w-full h-full bg-gray-200" />
                      </div>
                      <div>
                        <Link
                          to={`/patients/${row.id}`}
                          className="text-sm font-bold text-[#1a2632] hover:text-[#3a9898] transition-colors"
                        >
                          {row.name}
                        </Link>
                        <div className="text-xs text-[#8b9bae]">#{row.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Gender / Age */}
                  <td className="py-4 px-4 text-sm text-[#5a6a76]">
                    <span className="inline-flex items-center gap-1">
                      {row.gender === "Female" ? (
                        <span className="text-[#8b9bae] font-bold">♀</span>
                      ) : (
                        <span className="text-[#8b9bae] font-bold">♂</span>
                      )}
                      / {row.age}
                    </span>
                  </td>

                  {/* Reason for Visit */}
                  <td className="py-4 px-4 text-sm font-semibold text-[#1a2632]">
                    {row.reason}
                  </td>

                  {/* Doctor Info */}
                  <td className="py-4 px-4">
                    <div className="text-sm font-bold text-[#1a2632]">
                      {row.doctor}
                    </div>
                    <div className="text-xs text-[#8b9bae]">
                      {row.specialty}
                    </div>
                  </td>

                  {/* Patient Type */}
                  <td className="py-4 px-4 text-sm text-[#5a6a76] font-medium">
                    {row.patientType}
                  </td>

                  {/* Time */}
                  <td className="py-4 px-4 text-sm font-semibold text-[#1a2632] whitespace-nowrap">
                    {row.time}
                  </td>

                  {/* Location */}
                  <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                    {row.location}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf6f5] text-[#3a9898] text-xs font-semibold">
                      <CheckCircle2 size={13} strokeWidth={2.5} />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

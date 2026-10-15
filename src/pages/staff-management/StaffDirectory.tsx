import React, { useState } from "react";
import { Search, Plus, Eye, Edit, UserCheck, UserX } from "lucide-react";

interface StaffMember {
  id: string;
  employeeId: string;
  name: string;
  designation: string;
  department: string;
  phone: string;
  joiningDate: string;
  status: "Active" | "Inactive";
}

const initialStaff: StaffMember[] = [
  {
    id: "1",
    employeeId: "EMP-001",
    name: "Dr. Arun Sharma",
    designation: "Senior Consultant",
    department: "Cardiology",
    phone: "+91 98401 23456",
    joiningDate: "2024-01-15",
    status: "Active",
  },
  {
    id: "2",
    employeeId: "EMP-002",
    name: "Divya Ramesh",
    designation: "Cashier",
    department: "Finance & Billing",
    phone: "+91 97112 34567",
    joiningDate: "2024-05-10",
    status: "Active",
  },
  {
    id: "3",
    employeeId: "EMP-003",
    name: "Karthik Raja",
    designation: "Pharmacist",
    department: "Pharmacy",
    phone: "+91 94433 89012",
    joiningDate: "2023-11-20",
    status: "Inactive",
  },
];

export default function StaffDirectory() {
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaff);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStaff = staffList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="relative w-full sm:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]"
            size={15}
          />
          <input
            type="text"
            placeholder="Search staff by ID, name, or dept..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#f5f7f8] border border-[#dde5e7] rounded-full text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898]"
          />
        </div>
        <button
          onClick={() => alert("Add Staff Form Modal Opened")}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm"
        >
          <Plus size={14} strokeWidth={2.5} /> Add Staff Member
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#dde5e7] text-[#8b9bae]">
              <th className="pb-3">Employee ID</th>
              <th className="pb-3">Staff Name</th>
              <th className="pb-3">Designation</th>
              <th className="pb-3">Department</th>
              <th className="pb-3">Phone Number</th>
              <th className="pb-3">Joining Date</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f5]">
            {filteredStaff.map((staff) => (
              <tr key={staff.id} className="hover:bg-[#f5f7f8]">
                <td className="py-3 font-mono font-bold text-[#3a9898]">
                  {staff.employeeId}
                </td>
                <td className="py-3 font-bold text-[#1a2632]">{staff.name}</td>
                <td className="py-3 text-[#5a6a76]">{staff.designation}</td>
                <td className="py-3 text-[#5a6a76]">{staff.department}</td>
                <td className="py-3 text-[#8b9bae]">{staff.phone}</td>
                <td className="py-3 text-[#8b9bae]">{staff.joiningDate}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[10px] ${staff.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"}`}
                  >
                    {staff.status}
                  </span>
                </td>
                <td className="py-3 text-right space-x-1">
                  <button
                    className="p-1 hover:bg-[#eaf6f5] rounded text-[#3a9898]"
                    title="View Details"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    className="p-1 hover:bg-[#eaf6f5] rounded text-[#5a6a76]"
                    title="Edit"
                  >
                    <Edit size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

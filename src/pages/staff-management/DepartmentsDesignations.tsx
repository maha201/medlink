import React, { useState } from "react";
import { Building, Plus } from "lucide-react";

export default function DepartmentsDesignations() {
  const [departments] = useState([
    { id: "1", name: "Cardiology", staffCount: 4, status: "Active" },
    { id: "2", name: "Finance & Billing", staffCount: 3, status: "Active" },
    { id: "3", name: "Pharmacy", staffCount: 5, status: "Active" },
    {
      id: "4",
      name: "General Administration",
      staffCount: 2,
      status: "Active",
    },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-3xl">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold text-[#1a2632] flex items-center gap-1.5">
          <Building size={16} className="text-[#3a9898]" /> Clinic Departments
          Directory
        </h3>
        <button
          onClick={() => alert("Add Department Modal")}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all"
        >
          <Plus size={14} /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-[#f5f7f8] p-4 rounded-xl border border-[#dde5e7] flex items-center justify-between"
          >
            <div>
              <h4 className="text-xs font-bold text-[#1a2632]">{dept.name}</h4>
              <p className="text-[10px] text-[#5a6a76] mt-0.5">
                {dept.staffCount} Assigned Staff Members
              </p>
            </div>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded font-bold text-[10px]">
              {dept.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

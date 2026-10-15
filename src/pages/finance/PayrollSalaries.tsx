import React, { useState } from "react";
import { Users2, Plus, Search, DollarSign, Edit } from "lucide-react";

interface SalaryStructure {
  id: string;
  staffName: string;
  role: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: "Configured" | "Pending";
}

const initialSalaries: SalaryStructure[] = [
  {
    id: "1",
    staffName: "Dr. Arun Sharma",
    role: "Senior Consultant",
    baseSalary: 120000,
    allowances: 15000,
    deductions: 5000,
    netSalary: 130000,
    status: "Configured",
  },
  {
    id: "2",
    staffName: "Divya Ramesh",
    role: "Cashier",
    baseSalary: 25000,
    allowances: 2000,
    deductions: 1200,
    netSalary: 25800,
    status: "Configured",
  },
];

export default function PayrollSalaries() {
  const [salaries, setSalaries] = useState<SalaryStructure[]>(initialSalaries);
  const [selectedStaff, setSelectedStaff] = useState<SalaryStructure | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);

  const handleEditSalary = (staff: SalaryStructure) => {
    setSelectedStaff(staff);
    setShowModal(true);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold text-[#1a2632] flex items-center gap-1.5">
          <DollarSign size={16} className="text-[#3a9898]" /> Staff Salary
          Configuration & Payroll
        </h3>
        <button
          onClick={() => alert("Run Monthly Payroll Cycle")}
          className="px-4 py-1.5 bg-[#3a9898] text-white text-xs font-bold rounded-full shadow-sm hover:bg-[#2b6e6e] transition-all"
        >
          Run Monthly Payroll
        </button>
      </div>

      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-[#dde5e7] text-[#8b9bae]">
            <th className="pb-3">Staff Name</th>
            <th className="pb-3">Role</th>
            <th className="pb-3">Base Salary (₹)</th>
            <th className="pb-3">Allowances (₹)</th>
            <th className="pb-3">Deductions (₹)</th>
            <th className="pb-3">Net Monthly Payable (₹)</th>
            <th className="pb-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0f4f5]">
          {salaries.map((s) => (
            <tr key={s.id} className="hover:bg-[#f5f7f8]">
              <td className="py-3 font-bold text-[#1a2632]">{s.staffName}</td>
              <td className="py-3 text-[#5a6a76]">{s.role}</td>
              <td className="py-3 font-semibold">
                ₹{s.baseSalary.toLocaleString()}
              </td>
              <td className="py-3 text-emerald-600 font-semibold">
                +₹{s.allowances.toLocaleString()}
              </td>
              <td className="py-3 text-rose-600 font-semibold">
                -₹{s.deductions.toLocaleString()}
              </td>
              <td className="py-3 font-black text-[#3a9898]">
                ₹{s.netSalary.toLocaleString()}
              </td>
              <td className="py-3 text-right">
                <button
                  onClick={() => handleEditSalary(s)}
                  className="px-3 py-1 bg-[#eaf6f5] text-[#3a9898] hover:bg-[#3a9898] hover:text-white rounded-lg font-bold transition-all text-[11px]"
                >
                  Set Salary
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* SET SALARY MODAL DIALOG */}
      {showModal && selectedStaff && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 border border-[#dde5e7] shadow-lg animate-in zoom-in-95">
            <h4 className="text-sm font-bold text-[#1a2632]">
              Set Salary Structure — {selectedStaff.staffName}
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#5a6a76]">
                  Base Salary (₹)
                </label>
                <input
                  type="number"
                  defaultValue={selectedStaff.baseSalary}
                  className="w-full mt-1 p-2 bg-[#f5f7f8] border border-[#dde5e7] rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-[#5a6a76]">
                  Allowances / Bonus (₹)
                </label>
                <input
                  type="number"
                  defaultValue={selectedStaff.allowances}
                  className="w-full mt-1 p-2 bg-[#f5f7f8] border border-[#dde5e7] rounded-lg text-emerald-600 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-[#5a6a76]">
                  Fixed Deductions / PF (₹)
                </label>
                <input
                  type="number"
                  defaultValue={selectedStaff.deductions}
                  className="w-full mt-1 p-2 bg-[#f5f7f8] border border-[#dde5e7] rounded-lg text-rose-600 font-semibold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-[#f0f4f5] text-[#5a6a76] font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Salary structure updated!");
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-[#3a9898] text-white font-bold rounded-xl text-xs shadow-sm"
              >
                Save Salary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { ShieldCheck, Plus, Key, Check } from "lucide-react";

interface RoleItem {
  id: string;
  name: string;
  description: string;
  membersCount: number;
}

const initialRoles: RoleItem[] = [
  {
    id: "1",
    name: "Store Manager",
    description: "Full access to all modules, reports, and configurations.",
    membersCount: 2,
  },
  {
    id: "2",
    name: "Cashier",
    description: "Access to POS billing terminal and cash register shifts.",
    membersCount: 5,
  },
  {
    id: "3",
    name: "Pharmacist",
    description: "Access to inventory stock management and medicine batches.",
    membersCount: 3,
  },
  {
    id: "4",
    name: "Inventory Admin",
    description: "Exclusive control over warehouse adjustments and purchases.",
    membersCount: 1,
  },
];

const StaffRoles: React.FC = () => {
  const [roles] = useState<RoleItem[]>(initialRoles);
  const [success, setSuccess] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ShieldCheck className="text-indigo-600" /> Staff Roles Management
          </h1>
          <p className="text-sm text-gray-500">
            Define and manage organizational job roles and designations.
          </p>
        </div>
        <button
          onClick={() => setSuccess(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors self-start md:self-auto"
        >
          <Plus size={16} /> Create New Role
        </button>
      </div>

      {success && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-2 text-sm font-medium">
          <Check size={18} /> Role action executed successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Key className="text-indigo-600" size={18} /> {role.name}
                </h3>
                <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                  {role.membersCount} Members
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{role.description}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-2">
              <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 px-3 py-1.5 bg-indigo-50 rounded-lg">
                Edit Role
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffRoles;

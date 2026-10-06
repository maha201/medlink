import React, { useState } from "react";
import { Lock, Check, Shield } from "lucide-react";

interface PermissionGroup {
  roleName: string;
  permissions: {
    posBilling: boolean;
    inventory: boolean;
    purchases: boolean;
    reports: boolean;
    settings: boolean;
  };
}

const initialPermissions: PermissionGroup[] = [
  {
    roleName: "Store Manager",
    permissions: {
      posBilling: true,
      inventory: true,
      purchases: true,
      reports: true,
      settings: true,
    },
  },
  {
    roleName: "Cashier",
    permissions: {
      posBilling: true,
      inventory: false,
      purchases: false,
      reports: false,
      settings: false,
    },
  },
  {
    roleName: "Pharmacist",
    permissions: {
      posBilling: true,
      inventory: true,
      purchases: true,
      reports: false,
      settings: false,
    },
  },
  {
    roleName: "Inventory Admin",
    permissions: {
      posBilling: false,
      inventory: true,
      purchases: true,
      reports: true,
      settings: false,
    },
  },
];

const StaffPermissions: React.FC = () => {
  const [permissionsList, setPermissionsList] =
    useState<PermissionGroup[]>(initialPermissions);
  const [saved, setSaved] = useState(false);

  const handleToggle = (
    roleIdx: number,
    key: keyof PermissionGroup["permissions"],
  ) => {
    const updated = [...permissionsList];
    updated[roleIdx].permissions[key] = !updated[roleIdx].permissions[key];
    setPermissionsList(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Lock className="text-indigo-600" /> Access Permissions Matrix
          </h1>
          <p className="text-sm text-gray-500">
            Configure granular module-level permissions for each specific role.
          </p>
        </div>
      </div>

      {saved && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-2 text-sm font-medium">
          <Check size={18} /> Permission matrix updated in real-time!
        </div>
      )}

      <div className="space-y-6">
        {permissionsList.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 mb-4">
              <Shield className="text-indigo-600" size={18} /> {item.roleName}{" "}
              Access Matrix
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {Object.entries(item.permissions).map(
                ([permKey, isAllowed], pIdx) => (
                  <div
                    key={pIdx}
                    onClick={() =>
                      handleToggle(
                        idx,
                        permKey as keyof PermissionGroup["permissions"],
                      )
                    }
                    className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isAllowed
                        ? "bg-indigo-50/50 border-indigo-200 text-indigo-900"
                        : "bg-gray-50 border-gray-200 text-gray-500"
                    }`}
                  >
                    <span className="text-xs font-semibold capitalize">
                      {permKey === "posBilling" ? "POS Billing" : permKey}
                    </span>
                    <input
                      type="checkbox"
                      checked={isAllowed}
                      onChange={() => {}}
                      className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 pointer-events-none"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffPermissions;

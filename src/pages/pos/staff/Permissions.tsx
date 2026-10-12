import { Lock, Check, Shield, Search, RefreshCw, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";

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

export default function StaffPermissions() {
  const [permissionsList, setPermissionsList] =
    useState<PermissionGroup[]>(initialPermissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

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

  const filteredPermissions = useMemo(() => {
    return permissionsList.filter((item) =>
      item.roleName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [permissionsList, searchTerm]);

  // Pagination calculation
  const totalEntries = filteredPermissions.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const paginatedPermissions = filteredPermissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      {saved && (
        <div className="bg-[#eaf6f5] border border-[#c4e4e0] text-[#3a9898] p-4 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-sm">
          <Check size={16} strokeWidth={2.5} /> Permission matrix updated in
          real-time!
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaf6f5] text-[#3a9898] flex items-center justify-center">
              <Lock size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a2632]">
                Access Permissions Matrix
              </h2>
              <p className="text-xs text-[#8b9bae]">
                Configure granular module-level permissions for each specific
                role.
              </p>
            </div>
            <button
              onClick={handleRefresh}
              title="Refresh Data"
              className="p-1.5 text-[#8b9bae] hover:text-[#3a9898] hover:bg-[#f5f7f8] rounded-full transition-all ml-2"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="flex gap-4 items-center flex-wrap">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]"
                size={16}
              />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 bg-[#f5f7f8] border border-[#dde5e7] rounded-full text-xs text-[#1a2632] placeholder-[#8b9bae] focus:outline-none focus:border-[#3a9898] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Matrix Cards Content */}
        <div className="p-6 min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-3">
              <Loader2 size={32} className="animate-spin text-[#3a9898]" />
              <p className="text-xs font-semibold">
                Loading access permissions...
              </p>
            </div>
          ) : paginatedPermissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-2">
              <p className="text-sm font-semibold text-[#1a2632]">
                No Permissions Matrix Found
              </p>
              <p className="text-xs">Try adjusting your role search query.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {paginatedPermissions.map((item, idx) => {
                const originalIndex = permissionsList.findIndex(
                  (p) => p.roleName === item.roleName,
                );
                return (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-[#dde5e7]"
                  >
                    <h3 className="text-base font-bold text-[#1a2632] flex items-center gap-2 mb-4">
                      <Shield className="text-[#3a9898]" size={18} />{" "}
                      {item.roleName} Access Matrix
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {Object.entries(item.permissions).map(
                        ([permKey, isAllowed], pIdx) => (
                          <div
                            key={pIdx}
                            onClick={() =>
                              handleToggle(
                                originalIndex !== -1 ? originalIndex : idx,
                                permKey as keyof PermissionGroup["permissions"],
                              )
                            }
                            className={`cursor-pointer p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                              isAllowed
                                ? "bg-[#eaf6f5] border-[#c4e4e0] text-[#3a9898]"
                                : "bg-[#f5f7f8] border-[#dde5e7] text-[#8b9bae]"
                            }`}
                          >
                            <span className="text-xs font-bold capitalize">
                              {permKey === "posBilling"
                                ? "POS Billing"
                                : permKey}
                            </span>
                            <input
                              type="checkbox"
                              checked={isAllowed}
                              onChange={() => {}}
                              className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-white cursor-pointer pointer-events-none"
                            />
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Dynamic Pagination Footer */}
        <div className="p-4 border-t border-[#dde5e7] flex items-center justify-between text-sm text-[#5a6a76] flex-wrap gap-3">
          <div>
            Showing{" "}
            {paginatedPermissions.length === 0
              ? 0
              : (currentPage - 1) * itemsPerPage + 1}{" "}
            to {Math.min(currentPage * itemsPerPage, totalEntries)} of{" "}
            {totalEntries} entries
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7] disabled:opacity-40 disabled:hover:bg-transparent"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded font-medium transition-all ${
                    currentPage === pageNum
                      ? "bg-[#3a9898] text-white"
                      : "hover:bg-[#f0f4f5]"
                  }`}
                >
                  {pageNum}
                </button>
              ),
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={
                currentPage === totalPages || loading || totalPages === 0
              }
              className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7] disabled:opacity-40 disabled:hover:bg-transparent"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

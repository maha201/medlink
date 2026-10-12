import {
  ShieldCheck,
  Plus,
  Key,
  Check,
  Search,
  RefreshCw,
  Loader2,
  Edit,
} from "lucide-react";
import { useState, useMemo } from "react";

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

export default function StaffRoles() {
  const [roles, setRoles] = useState<RoleItem[]>(initialRoles);
  const [searchTerm, setSearchTerm] = useState("");
  const [success, setSuccess] = useState(false);
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

  const filteredRoles = useMemo(() => {
    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [roles, searchTerm]);

  // Pagination calculation
  const totalEntries = filteredRoles.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const paginatedRoles = filteredRoles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      {success && (
        <div className="bg-[#eaf6f5] border border-[#c4e4e0] text-[#3a9898] p-4 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-sm">
          <Check size={16} strokeWidth={2.5} /> Role action executed
          successfully!
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaf6f5] text-[#3a9898] flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a2632]">
                Staff Roles Management
              </h2>
              <p className="text-xs text-[#8b9bae]">
                Define and manage organizational job roles and designations.
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

            <div className="w-px h-8 bg-[#dde5e7] mx-1 hidden sm:block"></div>

            <button
              onClick={() => setSuccess(true)}
              className="flex items-center gap-2 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20"
            >
              <Plus size={16} strokeWidth={2.5} />
              Create New Role
            </button>
          </div>
        </div>

        {/* Roles Grid Content */}
        <div className="p-6 min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-3">
              <Loader2 size={32} className="animate-spin text-[#3a9898]" />
              <p className="text-xs font-semibold">Loading roles list...</p>
            </div>
          ) : paginatedRoles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-2">
              <p className="text-sm font-semibold text-[#1a2632]">
                No Roles Found
              </p>
              <p className="text-xs">
                Click "Create New Role" to define a new designation.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedRoles.map((role) => (
                <div
                  key={role.id}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-[#dde5e7] hover:border-[#b5d9d5] transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-[#1a2632] flex items-center gap-2">
                        <Key className="text-[#3a9898]" size={18} /> {role.name}
                      </h3>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#f0f4f5] text-[#5a6a76] text-xs font-bold border border-[#dde5e7]">
                        {role.membersCount} Members
                      </span>
                    </div>
                    <p className="text-xs text-[#5a6a76] font-medium mt-1">
                      {role.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#dde5e7] flex justify-end gap-2">
                    <button
                      onClick={() => alert(`Edit role: ${role.name}`)}
                      className="inline-flex items-center gap-1.5 bg-[#eaf6f5] text-[#3a9898] hover:bg-[#c4e4e0] px-3.5 py-1.5 rounded-md text-xs font-bold border border-[#c4e4e0] transition-colors"
                    >
                      <Edit size={14} strokeWidth={2.5} /> Edit Role
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Pagination Footer */}
        <div className="p-4 border-t border-[#dde5e7] flex items-center justify-between text-sm text-[#5a6a76] flex-wrap gap-3">
          <div>
            Showing{" "}
            {paginatedRoles.length === 0
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

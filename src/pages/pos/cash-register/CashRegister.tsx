import {
  Wallet,
  Search,
  Plus,
  Lock,
  Unlock,
  Calendar,
  ArrowUpRight,
  DollarSign,
  ChevronDown,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useState, useMemo } from "react";

interface CashRegisterSession {
  id: string;
  registerNo: string;
  cashierName: string;
  openingBalance: number;
  cashSales: number;
  closingBalance: number;
  status: "Open" | "Closed";
  date: string;
}

const initialRegisters: CashRegisterSession[] = [
  {
    id: "1",
    registerNo: "REG-001",
    cashierName: "Arun Kumar (Morning)",
    openingBalance: 2000.0,
    cashSales: 14500.0,
    closingBalance: 16500.0,
    status: "Open",
    date: "2026-10-06",
  },
  {
    id: "2",
    registerNo: "REG-002",
    cashierName: "Divya Ramesh (Evening)",
    openingBalance: 2000.0,
    cashSales: 8200.0,
    closingBalance: 10200.0,
    status: "Closed",
    date: "2026-10-05",
  },
  {
    id: "3",
    registerNo: "REG-003",
    cashierName: "Karthik Raja (Night)",
    openingBalance: 1500.0,
    cashSales: 5400.0,
    closingBalance: 6900.0,
    status: "Closed",
    date: "2026-10-04",
  },
];

export default function CashRegister() {
  const [registers, setRegisters] =
    useState<CashRegisterSession[]>(initialRegisters);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
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

  const filteredRegisters = useMemo(() => {
    return registers.filter((item) => {
      const matchesSearch =
        item.registerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cashierName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [registers, searchTerm, statusFilter]);

  // Pagination calculation
  const totalEntries = filteredRegisters.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const paginatedRegisters = filteredRegisters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="animate-in fade-in duration-500">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#dde5e7] flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8b9bae] font-semibold uppercase tracking-wider">
              Current Drawer Status
            </p>
            <h3 className="text-xl font-bold text-[#3a9898] mt-1 flex items-center gap-1.5">
              <Unlock size={18} /> Active (Open)
            </h3>
          </div>
          <div className="p-3 bg-[#eaf6f5] text-[#3a9898] rounded-xl">
            <Wallet size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#dde5e7] flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8b9bae] font-semibold uppercase tracking-wider">
              Today's Cash Sales
            </p>
            <h3 className="text-2xl font-bold text-[#1a2632] mt-1">
              ₹14,500.00
            </h3>
          </div>
          <div className="p-3 bg-[#eaf6f5] text-[#3a9898] rounded-xl">
            <ArrowUpRight size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#dde5e7] flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8b9bae] font-semibold uppercase tracking-wider">
              Opening Float
            </p>
            <h3 className="text-2xl font-bold text-[#1a2632] mt-1">
              ₹2,000.00
            </h3>
          </div>
          <div className="p-3 bg-[#f0f4f5] text-[#5a6a76] rounded-xl">
            <DollarSign size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaf6f5] text-[#3a9898] flex items-center justify-center">
              <Wallet size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a2632]">
                Cash Register & Shifts
              </h2>
              <p className="text-xs text-[#8b9bae]">
                Manage cashier opening/closing balances, cash drawers, and shift
                logs.
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
                placeholder="Search register or cashier..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 bg-[#f5f7f8] border border-[#dde5e7] rounded-full text-xs text-[#1a2632] placeholder-[#8b9bae] focus:outline-none focus:border-[#3a9898] transition-colors"
              />
            </div>

            {/* Status Filter Dropdown */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none px-4 py-2 pr-9 bg-[#f5f7f8] hover:bg-[#eaf6f5] text-[#5a6a76] hover:text-[#3a9898] text-xs font-semibold rounded-full transition-colors border border-[#dde5e7] hover:border-[#b5d9d5] focus:outline-none cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b9bae] pointer-events-none"
              />
            </div>

            <div className="w-px h-8 bg-[#dde5e7] mx-1 hidden sm:block"></div>

            <button
              onClick={() => alert("Open New Register Modal")}
              className="flex items-center gap-2 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20"
            >
              <Plus size={16} strokeWidth={2.5} />
              Open New Register
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-3">
              <Loader2 size={32} className="animate-spin text-[#3a9898]" />
              <p className="text-xs font-semibold">
                Loading cash register logs...
              </p>
            </div>
          ) : paginatedRegisters.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-2">
              <p className="text-sm font-semibold text-[#1a2632]">
                No Cash Register Logs Found
              </p>
              <p className="text-xs">
                Click "Open New Register" to start a shift.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-[#dde5e7]">
                  <th className="py-4 pl-6 pr-4 w-12">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8]"
                    />
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Register No ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Cashier Name ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Opening Balance ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Cash Sales ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Closing Balance ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Status ↕
                  </th>
                  <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Date ↕
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dde5e7]">
                {paginatedRegisters.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#f5f7f8] transition-colors group"
                  >
                    <td className="py-4 pl-6 pr-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer"
                      />
                    </td>

                    {/* Register No */}
                    <td className="py-4 px-4 font-mono text-xs font-bold text-[#3a9898]">
                      {item.registerNo}
                    </td>

                    {/* Cashier Name */}
                    <td className="py-4 px-4 text-sm font-bold text-[#1a2632]">
                      {item.cashierName}
                    </td>

                    {/* Opening Balance */}
                    <td className="py-4 px-4 text-sm text-[#5a6a76]">
                      ₹{item.openingBalance.toFixed(2)}
                    </td>

                    {/* Cash Sales */}
                    <td className="py-4 px-4 text-sm font-bold text-[#3a9898]">
                      +₹{item.cashSales.toFixed(2)}
                    </td>

                    {/* Closing Balance */}
                    <td className="py-4 px-4 text-sm font-bold text-[#1a2632]">
                      ₹{item.closingBalance.toFixed(2)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      {item.status === "Open" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0] capitalize">
                          <Unlock size={14} strokeWidth={2.5} />
                          {item.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#f0f4f5] text-[#8b9bae] text-xs font-bold border border-[#dde5e7] capitalize">
                          <Lock size={14} strokeWidth={2.5} />
                          {item.status}
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-sm text-[#5a6a76] whitespace-nowrap flex items-center gap-1.5 pt-5">
                      <Calendar size={14} className="text-[#8b9bae]" />
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Dynamic Pagination Footer */}
        <div className="p-4 border-t border-[#dde5e7] flex items-center justify-between text-sm text-[#5a6a76] flex-wrap gap-3">
          <div>
            Showing{" "}
            {paginatedRegisters.length === 0
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

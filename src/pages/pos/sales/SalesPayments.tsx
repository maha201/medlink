import {
  CreditCard,
  QrCode,
  Banknote,
  ShieldCheck,
  Search,
  CheckCircle2,
  ChevronDown,
  RefreshCw,
  Loader2,
  Calendar,
} from "lucide-react";
import { useState, useMemo } from "react";

interface SettlementItem {
  id: string;
  batchNo: string;
  method: string;
  account: string;
  amount: string;
  time: string;
  status: string;
}

const initialSettlements: SettlementItem[] = [
  {
    id: "1",
    batchNo: "UPI-892",
    method: "UPI / QR Scanner",
    account: "HDFC Bank A/c ending 4092",
    amount: "₹24,800",
    time: "02:00 PM",
    status: "Completed",
  },
  {
    id: "2",
    batchNo: "CSH-410",
    method: "Cash Drawer",
    account: "Main Counter Register",
    amount: "₹12,450",
    time: "01:30 PM",
    status: "Completed",
  },
  {
    id: "3",
    batchNo: "POS-104",
    method: "Credit / Debit Card POS",
    account: "ICICI Bank A/c ending 8810",
    amount: "₹7,950",
    time: "11:45 AM",
    status: "Completed",
  },
];

export default function PaymentGateways() {
  const [settlements, setSettlements] =
    useState<SettlementItem[]>(initialSettlements);
  const [searchTerm, setSearchTerm] = useState("");
  const [methodFilter, setMethodFilter] = useState("All");
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

  const filteredSettlements = useMemo(() => {
    return settlements.filter((item) => {
      const matchesSearch =
        item.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.account.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMethod =
        methodFilter === "All" || item.method === methodFilter;
      return matchesSearch && matchesMethod;
    });
  }, [settlements, searchTerm, methodFilter]);

  // Pagination calculation
  const totalEntries = filteredSettlements.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const paginatedSettlements = filteredSettlements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const paymentMethods = [
    {
      title: "UPI / QR Scanner",
      desc: "PhonePe, Google Pay, Paytm, BHIM",
      volume: "₹24,800",
      count: "64 transactions",
      icon: QrCode,
    },
    {
      title: "Cash Drawer",
      desc: "Physical currency register settlement",
      volume: "₹12,450",
      count: "42 transactions",
      icon: Banknote,
    },
    {
      title: "Credit / Debit Card POS",
      desc: "Swipe, Tap & Chip terminal",
      volume: "₹7,950",
      count: "18 transactions",
      icon: CreditCard,
    },
  ];

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      {/* Top Banner / Status Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#eaf6f5] text-[#3a9898] flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1a2632]">
              Payment & Settlement
            </h2>
            <p className="text-xs text-[#8b9bae]">
              Monitor collection modes, settlements, and gateway statuses.
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

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0]">
            <ShieldCheck size={14} strokeWidth={2.5} /> All Terminals Active
          </span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paymentMethods.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#1a2632]">
                    {m.title}
                  </h3>
                  <p className="text-xs text-[#8b9bae] mt-0.5">{m.desc}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#eaf6f5] text-[#3a9898] flex items-center justify-center">
                  <Icon size={20} />
                </div>
              </div>

              <div className="pt-3 border-t border-[#dde5e7] flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-[#1a2632]">
                    {m.volume}
                  </span>
                  <p className="text-xs text-[#5a6a76] font-medium">
                    {m.count}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0]">
                  Settled
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Table Filters & Search */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#1a2632]">
              Recent Settlement History
            </h3>
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
                placeholder="Search batch, method..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 bg-[#f5f7f8] border border-[#dde5e7] rounded-full text-xs text-[#1a2632] placeholder-[#8b9bae] focus:outline-none focus:border-[#3a9898] transition-colors"
              />
            </div>

            {/* Method Filter Dropdown */}
            <div className="relative">
              <select
                value={methodFilter}
                onChange={(e) => {
                  setMethodFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none px-4 py-2 pr-9 bg-[#f5f7f8] hover:bg-[#eaf6f5] text-[#5a6a76] hover:text-[#3a9898] text-xs font-semibold rounded-full transition-colors border border-[#dde5e7] hover:border-[#b5d9d5] focus:outline-none cursor-pointer"
              >
                <option value="All">All Methods</option>
                <option value="UPI / QR Scanner">UPI / QR Scanner</option>
                <option value="Cash Drawer">Cash Drawer</option>
                <option value="Credit / Debit Card POS">
                  Credit / Debit Card POS
                </option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b9bae] pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto min-h-[250px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-3">
              <Loader2 size={32} className="animate-spin text-[#3a9898]" />
              <p className="text-xs font-semibold">Loading settlements...</p>
            </div>
          ) : paginatedSettlements.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-2">
              <p className="text-sm font-semibold text-[#1a2632]">
                No Settlement Records Found
              </p>
              <p className="text-xs">Try adjusting your search filter.</p>
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
                    Batch No ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Payment Method ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Settled Account / Info ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Amount ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Time ↕
                  </th>
                  <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Status ↕
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dde5e7]">
                {paginatedSettlements.map((item) => (
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

                    {/* Batch No */}
                    <td className="py-4 px-4 font-mono text-xs font-bold text-[#3a9898]">
                      {item.batchNo}
                    </td>

                    {/* Payment Method */}
                    <td className="py-4 px-4 text-sm font-bold text-[#1a2632]">
                      {item.method}
                    </td>

                    {/* Account Info */}
                    <td className="py-4 px-4 text-sm font-medium text-[#5a6a76]">
                      {item.account}
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-4 text-sm font-bold text-[#3a9898]">
                      {item.amount}
                    </td>

                    {/* Time */}
                    <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#8b9bae]" />
                        {item.time}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0] capitalize">
                        <CheckCircle2 size={14} strokeWidth={2.5} />
                        {item.status}
                      </span>
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
            {paginatedSettlements.length === 0
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

import {
  RotateCcw,
  Search,
  Plus,
  Calendar,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useState, useMemo } from "react";

interface PurchaseReturnItem {
  id: string;
  returnNo: string;
  purchaseNo: string;
  supplierName: string;
  quantity: number;
  refundAmount: number;
  reason: string;
  date: string;
}

const initialReturns: PurchaseReturnItem[] = [
  {
    id: "1",
    returnNo: "PR-2026-001",
    purchaseNo: "PUR-2026-001",
    supplierName: "Sun Pharma Dist.",
    quantity: 5,
    refundAmount: 1250.0,
    reason: "Damaged strips received",
    date: "2026-10-06",
  },
  {
    id: "2",
    returnNo: "PR-2026-002",
    purchaseNo: "PUR-2026-003",
    supplierName: "Cipla Med Pro",
    quantity: 2,
    refundAmount: 850.0,
    reason: "Near expiry stock return",
    date: "2026-10-04",
  },
];

export default function PurchaseReturns() {
  const [returns, setReturns] = useState<PurchaseReturnItem[]>(initialReturns);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredReturns = useMemo(() => {
    return returns.filter(
      (item) =>
        item.returnNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.purchaseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplierName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [returns, searchTerm]);

  // Pagination calculation
  const totalEntries = filteredReturns.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const paginatedReturns = filteredReturns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaf6f5] text-[#3a9898] flex items-center justify-center">
              <RotateCcw size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a2632]">
                Purchase Returns
              </h2>
              <p className="text-xs text-[#8b9bae]">
                Manage returned items sent back to suppliers and refund claims.
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
                placeholder="Search return no, purchase..."
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
              onClick={() => alert("New Return Modal opened")}
              className="flex items-center gap-2 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20"
            >
              <Plus size={16} strokeWidth={2.5} />
              New Return
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-3">
              <Loader2 size={32} className="animate-spin text-[#3a9898]" />
              <p className="text-xs font-semibold">
                Loading purchase returns...
              </p>
            </div>
          ) : paginatedReturns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-2">
              <p className="text-sm font-semibold text-[#1a2632]">
                No Purchase Returns Found
              </p>
              <p className="text-xs">
                Click "New Return" to initiate a supplier return request.
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
                    Return No ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Purchase No ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Supplier Name ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Quantity Returned ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Refund Amount ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Reason ↕
                  </th>
                  <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Date ↕
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dde5e7]">
                {paginatedReturns.map((item) => (
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

                    {/* Return No */}
                    <td className="py-4 px-4 font-mono text-xs font-bold text-[#3a9898]">
                      {item.returnNo}
                    </td>

                    {/* Purchase No */}
                    <td className="py-4 px-4 font-mono text-xs font-bold text-[#3a9898]">
                      {item.purchaseNo}
                    </td>

                    {/* Supplier Name */}
                    <td className="py-4 px-4 text-sm font-bold text-[#1a2632]">
                      {item.supplierName}
                    </td>

                    {/* Quantity Returned */}
                    <td className="py-4 px-4 text-sm font-bold text-rose-600">
                      {item.quantity} items
                    </td>

                    {/* Refund Amount */}
                    <td className="py-4 px-4 text-sm font-bold text-[#3a9898]">
                      ₹{item.refundAmount.toFixed(2)}
                    </td>

                    {/* Reason */}
                    <td className="py-4 px-4 text-sm font-medium text-[#5a6a76]">
                      {item.reason}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-sm text-[#5a6a76] whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#8b9bae]" />
                        {item.date}
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
            {paginatedReturns.length === 0
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

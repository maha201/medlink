import {
  ArrowLeftRight,
  Search,
  Calendar,
  ChevronDown,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useState, useMemo } from "react";

interface StockMovementItem {
  id: string;
  productName: string;
  code: string;
  type: "Stock In" | "Stock Out" | "Transfer";
  quantity: number;
  reference: string;
  date: string;
  performedBy: string;
}

const initialMovements: StockMovementItem[] = [
  {
    id: "1",
    productName: "Paracetamol 650mg",
    code: "MED-001",
    type: "Stock In",
    quantity: 100,
    reference: "PUR-2026-001",
    date: "2026-10-06",
    performedBy: "Admin",
  },
  {
    id: "2",
    productName: "Amoxicillin 500mg",
    code: "MED-002",
    type: "Stock Out",
    quantity: 25,
    reference: "INV-2026-104",
    date: "2026-10-06",
    performedBy: "Cashier",
  },
  {
    id: "3",
    productName: "Cough Syrup 100ml",
    code: "MED-003",
    type: "Stock Out",
    quantity: 10,
    reference: "INV-2026-102",
    date: "2026-10-05",
    performedBy: "Cashier",
  },
];

export default function StockMovement() {
  const [movements, setMovements] =
    useState<StockMovementItem[]>(initialMovements);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
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

  const filteredMovements = useMemo(() => {
    return movements.filter((item) => {
      const matchesSearch =
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reference.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "All" || item.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [movements, searchTerm, typeFilter]);

  // Pagination calculation
  const totalEntries = filteredMovements.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const paginatedMovements = filteredMovements.slice(
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
              <ArrowLeftRight size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a2632]">
                Stock Movement Log
              </h2>
              <p className="text-xs text-[#8b9bae]">
                Track incoming and outgoing stock transactions in real-time.
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
                placeholder="Search product, code or ref..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 bg-[#f5f7f8] border border-[#dde5e7] rounded-full text-xs text-[#1a2632] placeholder-[#8b9bae] focus:outline-none focus:border-[#3a9898] transition-colors"
              />
            </div>

            {/* Movement Type Filter Dropdown */}
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none px-4 py-2 pr-9 bg-[#f5f7f8] hover:bg-[#eaf6f5] text-[#5a6a76] hover:text-[#3a9898] text-xs font-semibold rounded-full transition-colors border border-[#dde5e7] hover:border-[#b5d9d5] focus:outline-none cursor-pointer"
              >
                <option value="All">All Movements</option>
                <option value="Stock In">Stock In</option>
                <option value="Stock Out">Stock Out</option>
                <option value="Transfer">Transfer</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b9bae] pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-3">
              <Loader2 size={32} className="animate-spin text-[#3a9898]" />
              <p className="text-xs font-semibold">Loading movement logs...</p>
            </div>
          ) : paginatedMovements.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-2">
              <p className="text-sm font-semibold text-[#1a2632]">
                No Stock Movement Logs Found
              </p>
              <p className="text-xs">
                Try adjusting your search criteria or filters.
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
                    Product Name ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Code ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Movement Type ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Quantity ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Reference No. ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Date ↕
                  </th>
                  <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Performed By ↕
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dde5e7]">
                {paginatedMovements.map((item) => (
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

                    {/* Product Name */}
                    <td className="py-4 px-4 text-sm font-bold text-[#1a2632]">
                      {item.productName}
                    </td>

                    {/* Code */}
                    <td className="py-4 px-4 font-mono text-xs font-bold text-[#3a9898]">
                      {item.code}
                    </td>

                    {/* Movement Type Badge */}
                    <td className="py-4 px-4">
                      {item.type === "Stock In" ? (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0] capitalize">
                          {item.type}
                        </span>
                      ) : item.type === "Stock Out" ? (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#f0f4f5] text-[#5a6a76] text-xs font-bold border border-[#dde5e7] capitalize">
                          {item.type}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 capitalize">
                          {item.type}
                        </span>
                      )}
                    </td>

                    {/* Quantity */}
                    <td className="py-4 px-4 text-sm font-bold text-[#1a2632]">
                      {item.type === "Stock In"
                        ? `+${item.quantity}`
                        : `-${item.quantity}`}
                    </td>

                    {/* Reference No */}
                    <td className="py-4 px-4 font-mono text-xs font-bold text-[#3a9898]">
                      {item.reference}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#8b9bae]" />
                        {item.date}
                      </span>
                    </td>

                    {/* Performed By */}
                    <td className="py-4 px-6 text-sm font-medium text-[#5a6a76]">
                      {item.performedBy}
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
            {paginatedMovements.length === 0
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

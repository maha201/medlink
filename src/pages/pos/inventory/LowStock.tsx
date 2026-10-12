import {
  AlertTriangle,
  Search,
  ShoppingCart,
  Calendar,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useState, useMemo } from "react";

interface LowStockItem {
  id: string;
  name: string;
  code: string;
  category: string;
  currentStock: number;
  alertQuantity: number;
  unit: string;
  supplier: string;
}

const initialLowStock: LowStockItem[] = [
  {
    id: "1",
    name: "Amoxicillin 500mg",
    code: "MED-002",
    category: "Capsules",
    currentStock: 15,
    alertQuantity: 25,
    unit: "Strip",
    supplier: "Sun Pharma Dist.",
  },
  {
    id: "2",
    name: "Digital Thermometer",
    code: "EQ-001",
    category: "Equipments",
    currentStock: 2,
    alertQuantity: 5,
    unit: "Piece",
    supplier: "Omron India",
  },
  {
    id: "3",
    name: "Pantoprazole 40mg",
    code: "MED-010",
    category: "Tablets",
    currentStock: 8,
    alertQuantity: 20,
    unit: "Strip",
    supplier: "Cipla Med Pro",
  },
];

export default function LowStock() {
  const [lowStockList, setLowStockList] =
    useState<LowStockItem[]>(initialLowStock);
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

  const filteredList = useMemo(() => {
    return lowStockList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [lowStockList, searchTerm]);

  // Pagination calculation
  const totalEntries = filteredList.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Search */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a2632]">
                Low Stock Alerts
              </h2>
              <p className="text-xs text-[#8b9bae]">
                Monitor items that have fallen below the minimum safety stock
                limit.
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
                placeholder="Search low stock items..."
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
              onClick={() => alert("Reorder All Low Stock triggered")}
              className="flex items-center gap-2 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20"
            >
              <ShoppingCart size={16} strokeWidth={2.5} />
              Reorder All Low Stock
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-3">
              <Loader2 size={32} className="animate-spin text-[#3a9898]" />
              <p className="text-xs font-semibold">
                Loading low stock items...
              </p>
            </div>
          ) : paginatedList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-2">
              <p className="text-sm font-semibold text-[#1a2632]">
                No Low Stock Alerts
              </p>
              <p className="text-xs">
                All inventory levels are healthy and above safety limits!
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
                    Category ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Current Stock ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Alert Level ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Supplier ↕
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dde5e7]">
                {paginatedList.map((item) => (
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
                      {item.name}
                    </td>

                    {/* Code */}
                    <td className="py-4 px-4 font-mono text-xs font-bold text-[#3a9898]">
                      {item.code}
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0] capitalize">
                        {item.category}
                      </span>
                    </td>

                    {/* Current Stock */}
                    <td className="py-4 px-4 text-sm font-bold text-[#e11d48]">
                      {item.currentStock} {item.unit}
                    </td>

                    {/* Alert Level */}
                    <td className="py-4 px-4 text-sm font-medium text-[#5a6a76]">
                      {item.alertQuantity} {item.unit}
                    </td>

                    {/* Supplier */}
                    <td className="py-4 px-4 text-sm font-medium text-[#5a6a76]">
                      {item.supplier}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <button
                        onClick={() => alert(`Reorder item: ${item.name}`)}
                        className="inline-flex items-center gap-1.5 bg-[#eaf6f5] text-[#3a9898] hover:bg-[#c4e4e0] px-3.5 py-1.5 rounded-md text-xs font-bold border border-[#c4e4e0] transition-colors"
                      >
                        <ShoppingCart size={14} strokeWidth={2.5} /> Reorder
                      </button>
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
            {paginatedList.length === 0
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

import {
  Package,
  Search,
  AlertTriangle,
  TrendingDown,
  Download,
  Eye,
  ChevronDown,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useState, useMemo } from "react";

interface StockItem {
  id: string;
  name: string;
  code: string;
  category: string;
  totalStock: number;
  unit: string;
  warehouse: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastUpdated: string;
}

const initialStock: StockItem[] = [
  {
    id: "1",
    name: "Paracetamol 650mg",
    code: "MED-001",
    category: "Tablets",
    totalStock: 150,
    unit: "Strip",
    warehouse: "Main Pharmacy",
    status: "In Stock",
    lastUpdated: "2026-10-06",
  },
  {
    id: "2",
    name: "Amoxicillin 500mg",
    code: "MED-002",
    category: "Capsules",
    totalStock: 15,
    unit: "Strip",
    warehouse: "Main Pharmacy",
    status: "Low Stock",
    lastUpdated: "2026-10-05",
  },
  {
    id: "3",
    name: "Cough Syrup 100ml",
    code: "MED-003",
    category: "Syrups",
    totalStock: 40,
    unit: "Bottle",
    warehouse: "Branch Store",
    status: "In Stock",
    lastUpdated: "2026-10-06",
  },
  {
    id: "4",
    name: "Digital Thermometer",
    code: "EQ-001",
    category: "Equipments",
    totalStock: 0,
    unit: "Piece",
    warehouse: "Main Pharmacy",
    status: "Out of Stock",
    lastUpdated: "2026-10-01",
  },
];

export default function StockOverview() {
  const [stockList, setStockList] = useState<StockItem[]>(initialStock);
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

  const filteredStock = useMemo(() => {
    return stockList.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [stockList, searchTerm, statusFilter]);

  // Pagination calculation
  const totalEntries = filteredStock.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const paginatedStock = filteredStock.slice(
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
              Total Inventory Items
            </p>
            <h3 className="text-2xl font-bold text-[#1a2632] mt-1">2,450</h3>
          </div>
          <div className="p-3 bg-[#eaf6f5] text-[#3a9898] rounded-xl">
            <Package size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#dde5e7] flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8b9bae] font-semibold uppercase tracking-wider">
              Low Stock Alerts
            </p>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">14</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <AlertTriangle size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#dde5e7] flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8b9bae] font-semibold uppercase tracking-wider">
              Out of Stock
            </p>
            <h3 className="text-2xl font-bold text-red-600 mt-1">3</h3>
          </div>
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <TrendingDown size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaf6f5] text-[#3a9898] flex items-center justify-center">
              <Package size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a2632]">
                Stock Overview
              </h2>
              <p className="text-xs text-[#8b9bae]">
                Real-time inventory levels across your pharmacy stores.
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
                placeholder="Search stock by name or code..."
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
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b9bae] pointer-events-none"
              />
            </div>

            <div className="w-px h-8 bg-[#dde5e7] mx-1 hidden sm:block"></div>

            <button
              onClick={() => alert("Export Report triggered")}
              className="flex items-center gap-2 px-5 py-2 bg-[#f5f7f8] hover:bg-[#eaf6f5] text-[#5a6a76] hover:text-[#3a9898] text-xs font-bold rounded-full transition-all border border-[#dde5e7]"
            >
              <Download size={16} strokeWidth={2.5} />
              Export Report
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-3">
              <Loader2 size={32} className="animate-spin text-[#3a9898]" />
              <p className="text-xs font-semibold">Loading stock records...</p>
            </div>
          ) : paginatedStock.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-2">
              <p className="text-sm font-semibold text-[#1a2632]">
                No Stock Records Found
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
                    Category ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Warehouse ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Total Stock ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Status ↕
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dde5e7]">
                {paginatedStock.map((item) => (
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

                    {/* Category Badge */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0] capitalize">
                        {item.category}
                      </span>
                    </td>

                    {/* Warehouse */}
                    <td className="py-4 px-4 text-sm font-medium text-[#5a6a76]">
                      {item.warehouse}
                    </td>

                    {/* Total Stock */}
                    <td className="py-4 px-4 text-sm font-bold text-[#1a2632]">
                      {item.totalStock} {item.unit}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      {item.status === "In Stock" ? (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0] capitalize">
                          {item.status}
                        </span>
                      ) : item.status === "Low Stock" ? (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 capitalize">
                          {item.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-red-50 text-red-700 text-xs font-bold border border-red-200 capitalize">
                          {item.status}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <button
                        className="p-1.5 text-[#5a6a76] hover:text-[#3a9898] rounded-lg hover:bg-[#eaf6f5] transition-colors"
                        title="View History"
                      >
                        <Eye size={16} />
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
            {paginatedStock.length === 0
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

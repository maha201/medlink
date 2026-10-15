import {
  ShoppingBag,
  Search,
  Plus,
  Download,
  Eye,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronDown,
  RefreshCw,
  Loader2,
  X,
  AlertCircle,
} from "lucide-react";
import { useState, useMemo } from "react";

interface PurchaseOrder {
  id: string;
  purchaseNo: string;
  supplierName: string;
  totalItems: number;
  grandTotal: number;
  paymentStatus: "Paid" | "Pending" | "Partial";
  orderDate: string;
}

const initialPurchases: PurchaseOrder[] = [
  {
    id: "1",
    purchaseNo: "PUR-2026-001",
    supplierName: "Sun Pharma Dist.",
    totalItems: 5,
    grandTotal: 12500.0,
    paymentStatus: "Paid",
    orderDate: "2026-10-06",
  },
  {
    id: "2",
    purchaseNo: "PUR-2026-002",
    supplierName: "Micro Labs Ltd.",
    totalItems: 3,
    grandTotal: 8400.0,
    paymentStatus: "Pending",
    orderDate: "2026-10-05",
  },
  {
    id: "3",
    purchaseNo: "PUR-2026-003",
    supplierName: "Cipla Med Pro",
    totalItems: 8,
    grandTotal: 24500.0,
    paymentStatus: "Partial",
    orderDate: "2026-10-03",
  },
];

export default function PurchaseList() {
  const [purchases, setPurchases] = useState<PurchaseOrder[]>(initialPurchases);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] =
    useState<PurchaseOrder | null>(null);

  // Form State inside Add Modal
  const [formData, setFormData] = useState({
    supplierName: "",
    totalItems: 1,
    grandTotal: 0,
    paymentStatus: "Pending" as "Paid" | "Pending" | "Partial",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  // Open Add Purchase Modal
  const handleOpenAddModal = () => {
    setFormData({
      supplierName: "",
      totalItems: 1,
      grandTotal: 0,
      paymentStatus: "Pending",
    });
    setErrorMessage(null);
    setIsAddModalOpen(true);
  };

  // Open View Details Modal
  const handleOpenViewModal = (item: PurchaseOrder) => {
    setSelectedPurchase(item);
    setIsViewModalOpen(true);
  };

  // Handle Add Purchase Submit
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newPurchase: PurchaseOrder = {
        id: String(Date.now()),
        purchaseNo: `PUR-2026-00${purchases.length + 1}`,
        ...formData,
        orderDate: new Date().toISOString().split("T")[0],
      };

      setPurchases([newPurchase, ...purchases]);
      setIsAddModalOpen(false);
    } catch (err) {
      setErrorMessage("Failed to save purchase order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPurchases = useMemo(() => {
    return purchases.filter((item) => {
      const matchesSearch =
        item.purchaseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || item.paymentStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [purchases, searchTerm, statusFilter]);

  // Pagination calculation
  const totalEntries = filteredPurchases.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const paginatedPurchases = filteredPurchases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all placeholder:text-[#b0bec8]";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";
  const reqStar = <span className="text-red-500 ml-0.5">*</span>;

  return (
    <div className="animate-in fade-in duration-500 font-sans">
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaf6f5] text-[#3a9898] flex items-center justify-center">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a2632]">
                Purchase Orders
              </h2>
              <p className="text-xs text-[#8b9bae]">
                Manage stock purchases from various pharmaceutical suppliers.
              </p>
            </div>
            <button
              onClick={handleRefresh}
              title="Refresh Data"
              className="p-1.5 text-[#8b9bae] hover:text-[#3a9898] hover:bg-[#f5f7f8] rounded-full transition-all ml-2 cursor-pointer"
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
                placeholder="Search purchase no or supplier..."
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
                <option value="All">All Payment Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b9bae] pointer-events-none"
              />
            </div>

            <div className="w-px h-8 bg-[#dde5e7] mx-1 hidden sm:block"></div>

            <button
              onClick={() => alert("Export report triggered")}
              className="flex items-center gap-2 px-4 py-2 bg-[#f5f7f8] hover:bg-[#eaf6f5] text-[#5a6a76] hover:text-[#3a9898] text-xs font-bold rounded-full transition-all border border-[#dde5e7] cursor-pointer"
            >
              <Download size={16} strokeWidth={2.5} />
              Export
            </button>

            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20 cursor-pointer"
            >
              <Plus size={16} strokeWidth={2.5} />
              Add Purchase
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-3">
              <Loader2 size={32} className="animate-spin text-[#3a9898]" />
              <p className="text-xs font-semibold">
                Loading purchase orders...
              </p>
            </div>
          ) : paginatedPurchases.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-2">
              <p className="text-sm font-semibold text-[#1a2632]">
                No Purchase Orders Found
              </p>
              <p className="text-xs">
                Click "Add Purchase" to register a new stock purchase order.
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
                    Purchase No ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Supplier Name ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Total Items ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Grand Total ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Payment Status ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Order Date ↕
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dde5e7]">
                {paginatedPurchases.map((item) => (
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

                    {/* Purchase No */}
                    <td className="py-4 px-4 font-mono text-xs font-bold text-[#3a9898]">
                      {item.purchaseNo}
                    </td>

                    {/* Supplier Name */}
                    <td className="py-4 px-4 text-sm font-bold text-[#1a2632]">
                      {item.supplierName}
                    </td>

                    {/* Total Items */}
                    <td className="py-4 px-4 text-sm font-medium text-[#5a6a76]">
                      {item.totalItems} items
                    </td>

                    {/* Grand Total */}
                    <td className="py-4 px-4 text-sm font-bold text-[#3a9898]">
                      ₹{item.grandTotal.toFixed(2)}
                    </td>

                    {/* Payment Status Badge */}
                    <td className="py-4 px-4">
                      {item.paymentStatus === "Paid" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0] capitalize">
                          <CheckCircle2 size={14} strokeWidth={2.5} />
                          {item.paymentStatus}
                        </span>
                      ) : item.paymentStatus === "Pending" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 capitalize">
                          <Clock size={14} strokeWidth={2.5} />
                          {item.paymentStatus}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 capitalize">
                          {item.paymentStatus}
                        </span>
                      )}
                    </td>

                    {/* Order Date */}
                    <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#8b9bae]" />
                        {item.orderDate}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleOpenViewModal(item)}
                        className="p-1.5 text-[#5a6a76] hover:text-[#3a9898] rounded-lg hover:bg-[#eaf6f5] transition-colors cursor-pointer"
                        title="View Details"
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
            {paginatedPurchases.length === 0
              ? 0
              : (currentPage - 1) * itemsPerPage + 1}{" "}
            to {Math.min(currentPage * itemsPerPage, totalEntries)} of{" "}
            {totalEntries} entries
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7] disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded font-medium transition-all cursor-pointer ${
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
              className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7] disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ── Add Purchase Modal ── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white w-full max-w-[650px] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed] animate-in fade-in duration-200">
            <div className="px-7 py-5 flex items-start justify-between shrink-0 border-b border-[#f0f4f5]">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#eaf6f5] flex items-center justify-center shrink-0">
                  <ShoppingBag size={18} className="text-[#3a9898]" />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#1a2632]">
                    Add New Purchase Order
                  </h2>
                  <p className="text-[12px] text-[#8b9bae] mt-0.5">
                    Register stock procurement and supplier billing details.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                type="button"
                className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae] hover:text-[#1a2632] transition-colors shrink-0 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form
              id="purchase-modal-form"
              onSubmit={handleAddSubmit}
              className="px-7 py-5 space-y-4"
            >
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-semibold">
                  <AlertCircle size={16} />
                  {errorMessage}
                </div>
              )}

              <div>
                <label className={labelCls}>Supplier Name{reqStar}</label>
                <input
                  required
                  className={inputCls}
                  placeholder="e.g. Sun Pharma Dist."
                  value={formData.supplierName}
                  onChange={(e) =>
                    setFormData({ ...formData, supplierName: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Total Items{reqStar}</label>
                  <input
                    required
                    type="number"
                    min="1"
                    className={inputCls}
                    value={formData.totalItems || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalItems: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <label className={labelCls}>Grand Total (₹){reqStar}</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    className={inputCls}
                    placeholder="0.00"
                    value={formData.grandTotal || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        grandTotal: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Payment Status{reqStar}</label>
                <select
                  className={inputCls}
                  value={formData.paymentStatus}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentStatus: e.target.value as
                        | "Paid"
                        | "Pending"
                        | "Partial",
                    })
                  }
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Partial">Partial</option>
                </select>
              </div>
            </form>

            <div className="px-7 py-4 border-t border-[#f0f4f5] flex items-center justify-between shrink-0 bg-white rounded-b-[20px]">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setIsAddModalOpen(false)}
                className="text-[12.5px] font-semibold text-[#8b9bae] hover:text-[#e11d48] transition-colors px-4 py-2.5 rounded-xl hover:bg-red-50 disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="purchase-modal-form"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#3a9898]/20 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <CheckCircle2 size={15} />
                )}
                {isSubmitting ? "Saving..." : "Save Purchase Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── View Details Modal ── */}
      {isViewModalOpen && selectedPurchase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white w-full max-w-[550px] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed] animate-in fade-in duration-200">
            <div className="px-7 py-5 flex items-start justify-between shrink-0 border-b border-[#f0f4f5]">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#eaf6f5] flex items-center justify-center shrink-0">
                  <ShoppingBag size={18} className="text-[#3a9898]" />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#1a2632]">
                    Order Details - {selectedPurchase.purchaseNo}
                  </h2>
                  <p className="text-[12px] text-[#8b9bae] mt-0.5">
                    Detailed breakdown of the selected purchase order.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                type="button"
                className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae] hover:text-[#1a2632] transition-colors shrink-0 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-7 py-6 space-y-4 text-xs text-[#5a6a76]">
              <div className="flex justify-between py-2 border-b border-[#f0f4f5]">
                <span className="font-semibold text-[#8b9bae]">
                  Purchase Number:
                </span>
                <span className="font-mono font-bold text-[#3a9898]">
                  {selectedPurchase.purchaseNo}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#f0f4f5]">
                <span className="font-semibold text-[#8b9bae]">
                  Supplier Name:
                </span>
                <span className="font-bold text-[#1a2632]">
                  {selectedPurchase.supplierName}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#f0f4f5]">
                <span className="font-semibold text-[#8b9bae]">
                  Total Items:
                </span>
                <span className="font-bold text-[#1a2632]">
                  {selectedPurchase.totalItems} items
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#f0f4f5]">
                <span className="font-semibold text-[#8b9bae]">
                  Grand Total:
                </span>
                <span className="font-bold text-[#3a9898]">
                  ₹{selectedPurchase.grandTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#f0f4f5]">
                <span className="font-semibold text-[#8b9bae]">
                  Payment Status:
                </span>
                <span className="font-bold uppercase text-[#1a2632]">
                  {selectedPurchase.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-[#8b9bae]">
                  Order Date:
                </span>
                <span className="font-bold text-[#1a2632]">
                  {selectedPurchase.orderDate}
                </span>
              </div>
            </div>

            <div className="px-7 py-4 border-t border-[#f0f4f5] flex justify-end shrink-0 bg-white rounded-b-[20px]">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

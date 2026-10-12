import {
  Plus,
  Search,
  Edit,
  Trash2,
  FolderTree,
  Tag,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useState, useMemo } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
}

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Tablets",
    slug: "tablets",
    description: "Oral solid dosage medications",
    productCount: 45,
  },
  {
    id: "2",
    name: "Capsules",
    slug: "capsules",
    description: "Gelatin shell enclosed medications",
    productCount: 30,
  },
  {
    id: "3",
    name: "Syrups",
    slug: "syrups",
    description: "Liquid oral medications and suspensions",
    productCount: 18,
  },
  {
    id: "4",
    name: "Equipments",
    slug: "equipments",
    description: "Medical devices and monitoring tools",
    productCount: 12,
  },
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const filteredCategories = useMemo(() => {
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [categories, searchTerm]);

  // Pagination calculation
  const totalEntries = filteredCategories.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaf6f5] text-[#3a9898] flex items-center justify-center">
              <FolderTree size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a2632]">
                Product Categories
              </h2>
              <p className="text-xs text-[#8b9bae]">
                Organize your pharmacy inventory into structured categories.
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
                placeholder="Search categories..."
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
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20"
            >
              <Plus size={16} strokeWidth={2.5} />
              Add Category
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-3">
              <Loader2 size={32} className="animate-spin text-[#3a9898]" />
              <p className="text-xs font-semibold">Loading categories...</p>
            </div>
          ) : paginatedCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-2">
              <p className="text-sm font-semibold text-[#1a2632]">
                No Categories Found
              </p>
              <p className="text-xs">
                Click "Add Category" to create a new record.
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
                    Category Name ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Slug ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Description ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Products Count ↕
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dde5e7]">
                {paginatedCategories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-[#f5f7f8] transition-colors group"
                  >
                    <td className="py-4 pl-6 pr-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer"
                      />
                    </td>

                    {/* Category Name */}
                    <td className="py-4 px-4 text-sm font-bold text-[#1a2632]">
                      <span className="inline-flex items-center gap-2">
                        <Tag size={16} className="text-[#3a9898]" />
                        {cat.name}
                      </span>
                    </td>

                    {/* Slug */}
                    <td className="py-4 px-4 font-mono text-xs font-bold text-[#3a9898]">
                      {cat.slug}
                    </td>

                    {/* Description */}
                    <td className="py-4 px-4 text-sm font-medium text-[#5a6a76]">
                      {cat.description}
                    </td>

                    {/* Products Count */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#f0f4f5] text-[#5a6a76] text-xs font-bold border border-[#dde5e7]">
                        {cat.productCount} items
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className="p-1.5 text-[#5a6a76] hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-1.5 text-[#5a6a76] hover:text-[#e11d48] rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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
            {paginatedCategories.length === 0
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

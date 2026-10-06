import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, FolderTree, Tag } from "lucide-react";

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

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FolderTree className="text-blue-600" /> Product Categories
          </h1>
          <p className="text-sm text-gray-500">
            Organize your pharmacy inventory into structured categories.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors self-start md:self-auto"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Categories Grid/Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Category Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Products Count</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900 flex items-center gap-2">
                      <Tag size={16} className="text-blue-500" /> {cat.name}
                    </td>
                    <td className="py-3 px-4 text-gray-500 font-mono text-xs">
                      {cat.slug}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {cat.description}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-full text-xs font-semibold">
                        {cat.productCount} items
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        className="p-1.5 text-gray-500 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Categories;
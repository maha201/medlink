import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, Award, ShieldCheck } from "lucide-react";

interface Brand {
  id: string;
  name: string;
  code: string;
  country: string;
  productCount: number;
}

const initialBrands: Brand[] = [
  {
    id: "1",
    name: "Micro Labs",
    code: "BRD-001",
    country: "India",
    productCount: 25,
  },
  {
    id: "2",
    name: "Sun Pharma",
    code: "BRD-002",
    country: "India",
    productCount: 40,
  },
  {
    id: "3",
    name: "Dr. Reddy",
    code: "BRD-003",
    country: "India",
    productCount: 15,
  },
  {
    id: "4",
    name: "Omron",
    code: "BRD-004",
    country: "Japan",
    productCount: 8,
  },
];

const Brands: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredBrands = brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.country.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      setBrands(brands.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Award className="text-blue-600" /> Brands Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage pharmaceutical companies and product manufacturers.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors self-start md:self-auto"
        >
          <Plus size={16} /> Add Brand
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
            placeholder="Search brands or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Brands Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Brand Name</th>
                <th className="py-3 px-4">Brand Code</th>
                <th className="py-3 px-4">Origin Country</th>
                <th className="py-3 px-4">Products Linked</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-green-600" />{" "}
                      {brand.name}
                    </td>
                    <td className="py-3 px-4 text-gray-500 font-mono text-xs">
                      {brand.code}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{brand.country}</td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        {brand.productCount} items
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
                        onClick={() => handleDelete(brand.id)}
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
                    No brands found.
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

export default Brands;
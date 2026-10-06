import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertTriangle,
  Barcode,
  ArrowUpDown,
  Download,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  brand: string;
  unit: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  alertQuantity: number;
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Paracetamol 650mg",
    code: "MED-001",
    category: "Tablets",
    brand: "Micro Labs",
    unit: "Strip",
    costPrice: 20.0,
    salePrice: 30.0,
    stock: 150,
    alertQuantity: 20,
  },
  {
    id: "2",
    name: "Amoxicillin 500mg",
    code: "MED-002",
    category: "Capsules",
    brand: "Sun Pharma",
    unit: "Strip",
    costPrice: 45.0,
    salePrice: 65.0,
    stock: 15,
    alertQuantity: 25,
  },
  {
    id: "3",
    name: "Cough Syrup 100ml",
    code: "MED-003",
    category: "Syrups",
    brand: "Dr. Reddy",
    unit: "Bottle",
    costPrice: 80.0,
    salePrice: 110.0,
    stock: 40,
    alertQuantity: 10,
  },
  {
    id: "4",
    name: "Digital Thermometer",
    code: "EQ-001",
    category: "Equipments",
    brand: "Omron",
    unit: "Piece",
    costPrice: 250.0,
    salePrice: 350.0,
    stock: 8,
    alertQuantity: 5,
  },
];

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="text-blue-600" /> Products Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage your pharmacy inventory, pricing, and stocks efficiently.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
            <Download size={16} /> Export
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by product name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="Tablets">Tablets</option>
            <option value="Capsules">Capsules</option>
            <option value="Syrups">Syrups</option>
            <option value="Equipments">Equipments</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Code / Barcode</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Brand</th>
                <th className="py-3 px-4">Cost Price</th>
                <th className="py-3 px-4">Sale Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="py-3 px-4 text-gray-500 flex items-center gap-1">
                      <Barcode size={14} /> {product.code}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">{product.brand}</td>
                    <td className="py-3 px-4">
                      ₹{product.costPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 font-semibold text-green-600">
                      ₹{product.salePrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold ${product.stock <= product.alertQuantity ? "text-red-600 flex items-center gap-1" : "text-gray-800"}`}
                        >
                          {product.stock <= product.alertQuantity && (
                            <AlertTriangle size={14} />
                          )}
                          {product.stock} {product.unit}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        className="p-1.5 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-1.5 text-gray-500 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
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
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    No products found matching your search.
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

export default ProductsList;
import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, Scale, Ruler } from "lucide-react";

interface Unit {
  id: string;
  name: string;
  shortName: string;
  description: string;
  productCount: number;
}

const initialUnits: Unit[] = [
  {
    id: "1",
    name: "Strip",
    shortName: "strip",
    description: "Standard strip containing tablets/capsules",
    productCount: 75,
  },
  {
    id: "2",
    name: "Piece",
    shortName: "pcs",
    description: "Individual unit for devices/syringes",
    productCount: 20,
  },
  {
    id: "3",
    name: "Bottle",
    shortName: "btl",
    description: "Liquid containers for syrups/drops",
    productCount: 18,
  },
  {
    id: "4",
    name: "Box",
    shortName: "box",
    description: "Bulk packaging box",
    productCount: 10,
  },
];

const Units: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUnits = units.filter(
    (unit) =>
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.shortName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this unit?")) {
      setUnits(units.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Scale className="text-blue-600" /> Units Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage measurement units (pieces, strips, bottles, etc.) for your
            products.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors self-start md:self-auto"
        >
          <Plus size={16} /> Add Unit
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
            placeholder="Search units or short name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Units Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Unit Name</th>
                <th className="py-3 px-4">Short Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Products Linked</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredUnits.length > 0 ? (
                filteredUnits.map((unit) => (
                  <tr
                    key={unit.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900 flex items-center gap-2">
                      <Ruler size={16} className="text-purple-600" />{" "}
                      {unit.name}
                    </td>
                    <td className="py-3 px-4 text-gray-500 font-mono text-xs font-semibold">
                      <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded">
                        {unit.shortName}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {unit.description}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        {unit.productCount} items
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
                        onClick={() => handleDelete(unit.id)}
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
                    No units found.
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
export default Units;

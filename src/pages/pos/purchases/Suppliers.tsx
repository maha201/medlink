import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  totalSupplied: number;
}

const initialSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Sun Pharma Dist.",
    contactPerson: "Mr. Ramesh",
    phone: "+91 98765 43210",
    email: "ramesh@sunpharma.com",
    address: "Chennai, TN",
    totalSupplied: 45,
  },
  {
    id: "2",
    name: "Micro Labs Ltd.",
    contactPerson: "Mr. Suresh",
    phone: "+91 91234 56789",
    email: "suresh@microlabs.com",
    address: "Bangalore, KA",
    totalSupplied: 30,
  },
  {
    id: "3",
    name: "Cipla Med Pro",
    contactPerson: "Ms. Priya",
    phone: "+91 99887 76655",
    email: "priya@cipla.com",
    address: "Mumbai, MH",
    totalSupplied: 18,
  },
];

const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSuppliers = suppliers.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm),
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      setSuppliers(suppliers.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-indigo-600" /> Suppliers Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage pharmaceutical vendors, distributors, and contact details.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors self-start md:self-auto">
          <Plus size={16} /> Add Supplier
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
            placeholder="Search suppliers by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Supplier Name</th>
                <th className="py-3 px-4">Contact Person</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Orders Supplied</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier) => (
                  <tr
                    key={supplier.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {supplier.name}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {supplier.contactPerson}
                    </td>
                    <td className="py-3 px-4 text-gray-600 flex items-center gap-1 mt-1">
                      <Phone size={14} className="text-indigo-500" />{" "}
                      {supplier.phone}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <Mail size={14} className="text-gray-400" />{" "}
                        {supplier.email}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin size={14} className="text-red-500" />{" "}
                      {supplier.address}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        {supplier.totalSupplied} orders
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        className="p-1.5 text-gray-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(supplier.id)}
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
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No suppliers found.
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

export default Suppliers;

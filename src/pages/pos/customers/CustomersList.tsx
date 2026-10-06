import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Phone,
  Mail,
  Award,
  Calendar,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  loyaltyPoints: number;
  totalSpent: number;
  lastVisit: string;
}

const initialCustomers: Customer[] = [
  {
    id: "1",
    name: "Arun Kumar",
    phone: "+91 98401 12345",
    email: "arun.kumar@gmail.com",
    loyaltyPoints: 240,
    totalSpent: 4500.0,
    lastVisit: "2026-10-06",
  },
  {
    id: "2",
    name: "Divya Ramesh",
    phone: "+91 97123 98765",
    email: "divya.r@yahoo.com",
    loyaltyPoints: 120,
    totalSpent: 2100.0,
    lastVisit: "2026-10-05",
  },
  {
    id: "3",
    name: "Karthik Raja",
    phone: "+91 99445 67890",
    email: "karthik.raja@outlook.com",
    loyaltyPoints: 550,
    totalSpent: 12400.0,
    lastVisit: "2026-10-01",
  },
];

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-indigo-600" /> Customers Directory
          </h1>
          <p className="text-sm text-gray-500">
            Manage patient and regular customer profiles, loyalty points, and
            purchase history.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors self-start md:self-auto">
          <Plus size={16} /> Add Customer
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
            placeholder="Search by name, phone or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Loyalty Points</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Last Visit</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {customer.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600 flex items-center gap-1 mt-1">
                      <Phone size={14} className="text-indigo-500" />{" "}
                      {customer.phone}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <Mail size={14} className="text-gray-400" />{" "}
                        {customer.email}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <Award size={13} /> {customer.loyaltyPoints} pts
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600">
                      ₹{customer.totalSpent.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs flex items-center gap-1 mt-1">
                      <Calendar size={14} /> {customer.lastVisit}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        className="p-1.5 text-gray-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
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
                    No customers found.
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

export default CustomerList;
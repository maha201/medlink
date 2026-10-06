import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Shield,
} from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  lastLogin: string;
}

const initialStaff: StaffMember[] = [
  {
    id: "1",
    name: "Arun Kumar",
    role: "Store Manager",
    email: "arun@medlink.com",
    phone: "+91 98401 23456",
    status: "Active",
    lastLogin: "2026-10-06 09:30 AM",
  },
  {
    id: "2",
    name: "Divya Ramesh",
    role: "Cashier",
    email: "divya@medlink.com",
    phone: "+91 97112 34567",
    status: "Active",
    lastLogin: "2026-10-05 08:15 PM",
  },
  {
    id: "3",
    name: "Karthik Raja",
    role: "Pharmacist",
    email: "karthik@medlink.com",
    phone: "+91 94433 89012",
    status: "Inactive",
    lastLogin: "2026-09-28 02:00 PM",
  },
];

const StaffList: React.FC = () => {
  const [staffList] = useState<StaffMember[]>(initialStaff);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStaff = staffList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-indigo-600" /> Staff Directory
          </h1>
          <p className="text-sm text-gray-500">
            Manage all registered staff members and their active status.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors self-start md:self-auto">
          <Plus size={16} /> Add Staff Member
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search staff by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4">Staff Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredStaff.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                      <Shield size={12} /> {item.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs text-gray-600 flex items-center gap-1">
                      <Mail size={12} /> {item.email}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Phone size={12} /> {item.phone}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-max ${
                        item.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.status === "Active" ? (
                        <UserCheck size={12} />
                      ) : (
                        <UserX size={12} />
                      )}{" "}
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-xs">
                    {item.lastLogin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffList;

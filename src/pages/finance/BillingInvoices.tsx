import React, { useState, useMemo } from "react";
import { Search, Plus, Eye, Download, Edit, Trash2 } from "lucide-react";

interface Invoice {
  id: string;
  invoiceNo: string;
  patientId: string;
  patientName: string;
  provider: string;
  date: string;
  dueDate: string;
  total: number;
  paidAmount: number;
  balance: number;
  status: "Draft" | "Unpaid" | "Partially Paid" | "Paid" | "Overdue";
}

const initialInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNo: "MED-INV-2026-001",
    patientId: "PAT-892",
    patientName: "Ramesh Kumar",
    provider: "Dr. Arun Sharma",
    date: "2026-10-06",
    dueDate: "2026-10-20",
    total: 1470,
    paidAmount: 1470,
    balance: 0,
    status: "Paid",
  },
  {
    id: "2",
    invoiceNo: "MED-INV-2026-002",
    patientId: "PAT-410",
    patientName: "Priya Sharma",
    provider: "Dr. Kavitha",
    date: "2026-10-10",
    dueDate: "2026-10-24",
    total: 3150,
    paidAmount: 1000,
    balance: 2150,
    status: "Partially Paid",
  },
];

export default function BillingInvoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredInvoices = useMemo(() => {
    return initialInvoices.filter(
      (inv) =>
        inv.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.patientName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="relative w-full sm:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]"
            size={15}
          />
          <input
            type="text"
            placeholder="Search invoice or patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#f5f7f8] border border-[#dde5e7] rounded-full text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898]"
          />
        </div>
        <button
          onClick={() => alert("New Invoice Modal Opened")}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm"
        >
          <Plus size={14} strokeWidth={2.5} /> Create Invoice
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#dde5e7] text-[#8b9bae]">
              <th className="py-3 px-2">Invoice No</th>
              <th className="py-3 px-2">Patient</th>
              <th className="py-3 px-2">Provider</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Total Amount</th>
              <th className="py-3 px-2">Amount Paid</th>
              <th className="py-3 px-2">Balance</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f5]">
            {filteredInvoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-[#f5f7f8] transition-colors">
                <td className="py-3 px-2 font-bold text-[#3a9898]">
                  {inv.invoiceNo}
                </td>
                <td className="py-3 px-2 font-semibold text-[#1a2632]">
                  {inv.patientName}
                </td>
                <td className="py-3 px-2 text-[#5a6a76]">{inv.provider}</td>
                <td className="py-3 px-2 text-[#8b9bae]">{inv.date}</td>
                <td className="py-3 px-2 font-bold text-[#1a2632]">
                  ₹{inv.total}
                </td>
                <td className="py-3 px-2 text-emerald-600 font-bold">
                  ₹{inv.paidAmount}
                </td>
                <td className="py-3 px-2 text-rose-600 font-bold">
                  ₹{inv.balance}
                </td>
                <td className="py-3 px-2">
                  <span className="px-2 py-0.5 rounded bg-[#eaf6f5] text-[#3a9898] font-bold text-[10px]">
                    {inv.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-right space-x-1">
                  <button
                    className="p-1 hover:bg-[#eaf6f5] rounded text-[#3a9898]"
                    title="View"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    className="p-1 hover:bg-[#eaf6f5] rounded text-[#5a6a76]"
                    title="Download"
                  >
                    <Download size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

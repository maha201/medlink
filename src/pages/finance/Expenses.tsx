import React, { useState, useEffect, useCallback } from "react";
import {
  Receipt,
  Eye,
  Edit,
  Trash2,
  X,
  CheckCircle2,
  Loader2,
  IndianRupee,
  RefreshCw,
} from "lucide-react";
import AddExpenseModal from "./AddExpenseModal";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

interface ExpenseItem {
  id: string;
  expenseNo: string;
  date: string;
  category: string;
  description: string;
  vendor: string;
  amount: number;
  method: string;
  status: string;
}

export default function Expenses() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal / Drawer States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewExpense, setViewExpense] = useState<ExpenseItem | null>(null);
  const [editExpense, setEditExpense] = useState<ExpenseItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`${API_ENDPOINTS.hospitalFinanceExpenses}?limit=50`, {
        method: "GET",
      });
      const data = typeof res?.json === "function" ? await res.json() : res;

      if (data?.data && Array.isArray(data.data)) {
        setExpenses(data.data);
      } else if (Array.isArray(data)) {
        setExpenses(data);
      }
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // Add Success
  const handleAddSuccess = () => {
    fetchExpenses();
  };

  // Edit Save
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editExpense) return;
    setUpdating(true);

    try {
      await apiFetch(`${API_ENDPOINTS.hospitalFinanceExpenses}/${editExpense.id}`, {
        method: "PUT",
        body: JSON.stringify(editExpense),
      });

      setExpenses((prev) =>
        prev.map((item) => (item.id === editExpense.id ? editExpense : item)),
      );
      if (viewExpense && viewExpense.id === editExpense.id) {
        setViewExpense(editExpense);
      }
      setEditExpense(null);
    } catch (err) {
      console.error("Failed to update expense:", err);
    } finally {
      setUpdating(false);
    }
  };

  // Delete Confirm
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await apiFetch(`${API_ENDPOINTS.hospitalFinanceExpenses}/${deleteId}`, {
        method: "DELETE",
      });

      setExpenses((prev) => prev.filter((item) => item.id !== deleteId));
      if (viewExpense && viewExpense.id === deleteId) {
        setViewExpense(null);
      }
    } catch (err) {
      console.error("Failed to delete expense:", err);
    } finally {
      setDeleteId(null);
    }
  };

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all placeholder:text-[#b0bec8]";
  const labelCls = "block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5";

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* ── 1. Add Expense Modal ── */}
      {isAddModalOpen && (
        <AddExpenseModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleAddSuccess}
        />
      )}

      {/* ── 2. View Details Slide-Over Drawer ── */}
      {viewExpense && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-[420px] bg-white h-full shadow-2xl flex flex-col border-l border-[#dde5e7] animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-[#f0f4f5] flex items-center justify-between bg-[#f8fafb]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#eaf6f5] flex items-center justify-center text-[#3a9898]">
                  <Receipt size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1a2632]">
                    {viewExpense.expenseNo}
                  </h3>
                  <p className="text-xs text-[#3a9898] font-semibold">
                    {viewExpense.category}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewExpense(null)}
                className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center text-[#8b9bae] border border-transparent hover:border-[#dde5e7] cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#f8fafb] border border-[#e8edf2]">
                <span className="text-xs font-semibold text-[#5a6a76]">
                  Status
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  {viewExpense.status}
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider">
                  Expense Information
                </h4>
                <div className="space-y-3 text-xs bg-[#f8fafb] p-4 rounded-xl border border-[#e8edf2]">
                  <div className="flex justify-between">
                    <span className="text-[#8b9bae]">Date:</span>
                    <span className="font-semibold text-[#1a2632]">
                      {viewExpense.date}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b9bae]">Vendor / Payee:</span>
                    <span className="font-semibold text-[#1a2632]">
                      {viewExpense.vendor}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b9bae]">Payment Method:</span>
                    <span className="font-semibold text-[#1a2632]">
                      {viewExpense.method}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b9bae]">Amount:</span>
                    <span className="font-bold text-rose-600 text-sm">
                      ₹{viewExpense.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider">
                  Description / Notes
                </h4>
                <p className="text-xs text-[#5a6a76] bg-[#f8fafb] p-3.5 rounded-xl border border-[#e8edf2] leading-relaxed">
                  {viewExpense.description}
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-[#f0f4f5] bg-[#f8fafb] flex gap-2">
              <button
                onClick={() => {
                  setEditExpense(viewExpense);
                }}
                className="w-1/2 py-2.5 bg-white border border-[#dde500] hover:border-[#3a9898] text-[#1a2632] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Edit size={14} className="text-[#3a9898]" /> Edit
              </button>
              <button
                onClick={() => {
                  setDeleteId(viewExpense.id);
                }}
                className="w-1/2 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. Edit Expense Modal ── */}
      {editExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-in fade-in">
          <form
            onSubmit={handleSaveEdit}
            className="bg-white w-full max-w-[650px] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed] overflow-hidden"
          >
            <div className="px-7 py-5 flex items-center justify-between border-b border-[#f0f4f5]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#eaf6f5] flex items-center justify-center text-[#3a9898]">
                  <Edit size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1a2632]">
                    Edit Expense ({editExpense.expenseNo})
                  </h3>
                  <p className="text-[11px] text-[#8b9bae]">
                    Update expenditure records
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditExpense(null)}
                className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Category</label>
                  <select
                    value={editExpense.category}
                    onChange={(e) =>
                      setEditExpense({
                        ...editExpense,
                        category: e.target.value,
                      })
                    }
                    className={inputCls}
                  >
                    <option value="Premise Rent">Premise Rent</option>
                    <option value="Medical Supplies">Medical Supplies</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Staff Salaries">Staff Salaries</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Date</label>
                  <input
                    type="date"
                    value={editExpense.date}
                    onChange={(e) =>
                      setEditExpense({ ...editExpense, date: e.target.value })
                    }
                    className={inputCls}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Vendor / Payee</label>
                  <input
                    type="text"
                    value={editExpense.vendor}
                    onChange={(e) =>
                      setEditExpense({ ...editExpense, vendor: e.target.value })
                    }
                    className={inputCls}
                    required
                  />
                </div>
                <div>
                  <label className={labelCls}>Amount (₹)</label>
                  <input
                    type="number"
                    value={editExpense.amount}
                    onChange={(e) =>
                      setEditExpense({
                        ...editExpense,
                        amount: Number(e.target.value),
                      })
                    }
                    className={inputCls}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Description</label>
                <textarea
                  rows={3}
                  value={editExpense.description}
                  onChange={(e) =>
                    setEditExpense({
                      ...editExpense,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] resize-none"
                  required
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#f0f4f5] flex justify-end gap-2 bg-[#f8fafb]">
              <button
                type="button"
                onClick={() => setEditExpense(null)}
                className="px-4 py-2 text-xs font-semibold text-[#8b9bae]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                {updating && <Loader2 size={13} className="animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── 4. Global Delete Confirmation Modal ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-[400px] rounded-[20px] shadow-2xl p-6 text-center space-y-4 border border-[#e2e8ed]">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1a2632]">
                Delete Expense Record?
              </h3>
              <p className="text-xs text-[#8b9bae] mt-1">
                Are you sure you want to remove this entry? This action cannot
                be undone.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="w-1/2 py-2.5 border border-[#dde5e7] text-xs font-semibold text-[#5a6a76] rounded-xl hover:bg-[#f8fafb] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header & Add Button ── */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-[#dde5e7] shadow-xs">
        <h3 className="text-xs font-bold text-[#1a2632] flex items-center gap-1.5 uppercase tracking-wider">
          <Receipt size={16} className="text-[#3a9898]" /> Operating & Office
          Expenses
        </h3>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-[#3a9898]/20 cursor-pointer flex items-center gap-1"
        >
          + Add Expense
        </button>
      </div>

      {/* ── Expenses Table Card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#dde5e7] text-[#8b9bae] bg-[#f8fafb]">
                <th className="p-3">Expense No</th>
                <th className="p-3">Date</th>
                <th className="p-3">Category</th>
                <th className="p-3">Description</th>
                <th className="p-3">Vendor / Payee</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f5]">
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[#8b9bae]">
                    No expense records found.
                  </td>
                </tr>
              ) : (
                expenses.map((e) => (
                  <tr
                    key={e.id}
                    onClick={() => setViewExpense(e)}
                    className="hover:bg-[#f5f7f8] transition-colors cursor-pointer"
                  >
                    <td className="p-3 font-bold text-[#3a9898] flex items-center gap-1.5">
                      {e.expenseNo}
                      <Eye size={12} className="text-[#8b9bae]" />
                    </td>
                    <td className="p-3 text-[#5a6a76]">{e.date}</td>
                    <td className="p-3 font-semibold text-[#1a2632]">
                      {e.category}
                    </td>
                    <td className="p-3 text-[#5a6a76] truncate max-w-[180px]">
                      {e.description}
                    </td>
                    <td className="p-3 text-[#1a2632]">{e.vendor}</td>
                    <td className="p-3 font-bold text-rose-600">
                      ₹{Number(e.amount).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-50 text-emerald-600">
                        {e.status}
                      </span>
                    </td>
                    <td
                      className="p-3 text-center"
                      onClick={(ev) => ev.stopPropagation()}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setEditExpense(e)}
                          title="Edit"
                          className="p-1.5 bg-[#eaf6f5] text-[#3a9898] hover:bg-[#3a9898] hover:text-white rounded-lg transition-all cursor-pointer"
                        >
                          <Edit size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteId(e.id)}
                          title="Delete"
                          className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition-all cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

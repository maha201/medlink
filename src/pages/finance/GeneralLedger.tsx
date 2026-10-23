import React, { useState, useEffect, useCallback } from "react";
import { BookOpen, Plus, Search, Edit, Trash2, X, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import AddLedgerModal from "./AddLedgerModal";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

export interface LedgerEntry {
  id: string;
  rawId?: number;
  date: string;
  particulars: string;
  voucherType: "Receipt" | "Payment" | "Journal" | "Contra";
  debit: number;
  credit: number;
  balance?: number;
}

export default function GeneralLedger() {
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editEntry, setEditEntry] = useState<LedgerEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchLedger = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch(API_ENDPOINTS.hospitalFinanceLedger, { method: "GET" });
      const data = typeof res?.json === "function" ? await res.json() : res;

      if (data?.data && Array.isArray(data.data)) {
        setLedger(data.data);
      } else if (Array.isArray(data)) {
        setLedger(data);
      }
    } catch (err) {
      console.error("Failed to fetch ledger:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLedger();
  }, [fetchLedger]);

  const handleAddSuccess = () => {
    fetchLedger();
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEntry) return;
    setUpdating(true);

    try {
      const entryId = editEntry.rawId || editEntry.id.replace(/^LED-/, "");
      await apiFetch(`${API_ENDPOINTS.hospitalFinanceLedger}/${entryId}`, {
        method: "PUT",
        body: JSON.stringify({
          date: editEntry.date,
          particulars: editEntry.particulars,
          voucherType: editEntry.voucherType,
          debit: Number(editEntry.debit),
          credit: Number(editEntry.credit),
        }),
      });

      setEditEntry(null);
      fetchLedger();
    } catch (err) {
      console.error("Failed to update ledger entry:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (item: LedgerEntry) => {
    if (!window.confirm(`Are you sure you want to delete ledger entry "${item.particulars}"?`)) {
      return;
    }

    try {
      const entryId = item.rawId || item.id.replace(/^LED-/, "");
      await apiFetch(`${API_ENDPOINTS.hospitalFinanceLedger}/${entryId}`, {
        method: "DELETE",
      });
      fetchLedger();
    } catch (err) {
      console.error("Failed to delete ledger entry:", err);
    }
  };

  const filteredLedger = ledger.filter(
    (item) =>
      item.particulars.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.voucherType.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Add Modal */}
      {isAddModalOpen && (
        <AddLedgerModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleAddSuccess}
        />
      )}

      {/* Edit Modal */}
      {editEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 font-sans animate-in fade-in duration-200">
          <form
            onSubmit={handleSaveEdit}
            className="bg-white w-full max-w-[600px] rounded-2xl shadow-2xl p-6 border border-[#e2e8ed] space-y-4"
          >
            <div className="flex justify-between items-center border-b border-[#f0f4f5] pb-3">
              <h2 className="text-base font-bold text-[#1a2632]">Edit Journal Entry ({editEntry.id})</h2>
              <button
                type="button"
                onClick={() => setEditEntry(null)}
                className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae] hover:text-[#1a2632] cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-[#5a6a76] mb-1">Date</label>
                <input
                  type="date"
                  value={editEntry.date}
                  onChange={(e) => setEditEntry({ ...editEntry, date: e.target.value })}
                  className="w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-lg p-2 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5a6a76] mb-1">Voucher Type</label>
                <select
                  value={editEntry.voucherType}
                  onChange={(e) => setEditEntry({ ...editEntry, voucherType: e.target.value as any })}
                  className="w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-lg p-2 font-medium"
                >
                  <option value="Receipt">Receipt</option>
                  <option value="Payment">Payment</option>
                  <option value="Journal">Journal</option>
                  <option value="Contra">Contra</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#5a6a76] mb-1">Particulars / Description</label>
              <input
                type="text"
                value={editEntry.particulars}
                onChange={(e) => setEditEntry({ ...editEntry, particulars: e.target.value })}
                className="w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-lg p-2 text-xs font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-[#5a6a76] mb-1">Debit (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editEntry.debit}
                  onChange={(e) => setEditEntry({ ...editEntry, debit: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-lg p-2 font-bold text-emerald-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5a6a76] mb-1">Credit (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editEntry.credit}
                  onChange={(e) => setEditEntry({ ...editEntry, credit: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-lg p-2 font-bold text-rose-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#f0f4f5]">
              <button
                type="button"
                onClick={() => setEditEntry(null)}
                className="px-4 py-2 border border-[#dde5e7] text-[#5a6a76] rounded-xl text-xs font-semibold hover:bg-[#f8fafb] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Top Search & Actions */}
      <div className="flex justify-between items-center flex-wrap gap-3 bg-white p-4 rounded-xl border border-[#dde5e7] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]"
              size={15}
            />
            <input
              type="text"
              placeholder="Search ledger particulars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-[#f5f7f8] border border-[#dde5e7] rounded-full text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898]"
            />
          </div>
          <button
            onClick={fetchLedger}
            disabled={loading}
            className="p-1.5 text-[#8b9bae] hover:text-[#3a9898] hover:bg-[#eaf6f5] rounded-lg transition-colors cursor-pointer"
            title="Refresh Ledger"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-[#3a9898]" : ""} />
          </button>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <Plus size={14} strokeWidth={2.5} /> Add Journal Entry
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#dde5e7] text-[#8b9bae] bg-[#f8fafb]">
                <th className="p-3">Date</th>
                <th className="p-3">Particulars / Description</th>
                <th className="p-3">Voucher Type</th>
                <th className="p-3">Debit (₹)</th>
                <th className="p-3">Credit (₹)</th>
                <th className="p-3">Running Balance</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f5]">
              {loading && filteredLedger.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-[#8b9bae]">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 size={16} className="animate-spin text-[#3a9898]" />
                      <span>Loading ledger records...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredLedger.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#8b9bae]">
                    No ledger entries found.
                  </td>
                </tr>
              ) : (
                filteredLedger.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#f5f7f8] transition-colors"
                  >
                    <td className="p-3 text-[#5a6a76]">{item.date}</td>
                    <td className="p-3 font-semibold text-[#1a2632]">
                      {item.particulars}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-[#f0f4f5] text-[#3a9898] rounded font-bold text-[10px]">
                        {item.voucherType}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-emerald-600">
                      {item.debit > 0 ? `₹${item.debit.toLocaleString()}` : "-"}
                    </td>
                    <td className="p-3 font-bold text-rose-600">
                      {item.credit > 0
                        ? `₹${item.credit.toLocaleString()}`
                        : "-"}
                    </td>
                    <td
                      className={`p-3 font-bold ${
                        (item.balance ?? 0) >= 0
                          ? "text-[#1a2632]"
                          : "text-rose-600"
                      }`}
                    >
                      ₹{(item.balance ?? 0).toLocaleString()}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setEditEntry(item)}
                          title="Edit Entry"
                          className="p-1 text-[#5a6a76] hover:text-[#3a9898] hover:bg-[#eaf6f5] rounded transition-colors cursor-pointer"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          title="Delete Entry"
                          className="p-1 text-[#8b9bae] hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
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

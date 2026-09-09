import { useState } from 'react'
import { Save } from 'lucide-react'

const subscriptions = [
  { id: 1, hospital: 'Apollo Clinic Chennai', plan: 'Pro', status: 'Active', start: '2025-01-01', expiry: '2025-12-31', amount: '₹4,999/mo' },
  { id: 2, hospital: 'Sunrise Medical Center', plan: 'Basic', status: 'Trial', start: '2025-07-01', expiry: '2025-08-15', amount: '₹0 (Trial)' },
  { id: 3, hospital: 'Green Valley Hospital', plan: 'Pro', status: 'Active', start: '2024-11-20', expiry: '2025-11-20', amount: '₹4,999/mo' },
  { id: 4, hospital: 'City Care Clinic', plan: 'Basic', status: 'Expired', start: '2025-01-01', expiry: '2025-06-01', amount: '₹1,999/mo' },
  { id: 5, hospital: 'Lotus Health Hub', plan: 'Pro', status: 'Active', start: '2025-01-15', expiry: '2026-01-15', amount: '₹4,999/mo' },
]

const statusStyle: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-700',
  Trial: 'bg-amber-100 text-amber-700',
  Expired: 'bg-red-100 text-red-700',
}

export default function SAPlansPage() {
  const [editing, setEditing] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ plan: '', status: '', expiry: '' })

  const startEdit = (s: typeof subscriptions[0]) => {
    setEditing(s.id)
    setEditForm({ plan: s.plan, status: s.status, expiry: s.expiry })
  }

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-lg font-bold text-[#1a2632]">Subscription Management</h1>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'Basic', price: '₹1,999/mo', features: ['Up to 5 Doctors', '3 Modules', 'Email Support', '500 Patients/mo'] },
          { name: 'Pro', price: '₹4,999/mo', features: ['Unlimited Doctors', 'All Modules', 'Priority Support', 'Unlimited Patients'] },
        ].map(p => (
          <div key={p.name} className={`bg-white rounded-2xl shadow-sm p-5 border-2 ${p.name === 'Pro' ? 'border-[#3a9898]' : 'border-transparent'}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#1a2632]">{p.name}</h3>
              {p.name === 'Pro' && <span className="text-[10px] font-bold bg-[#3a9898] text-white px-2 py-0.5 rounded-full">Popular</span>}
            </div>
            <p className="text-2xl font-bold text-[#3a9898] mb-3">{p.price}</p>
            <ul className="space-y-1.5">
              {p.features.map(f => (
                <li key={f} className="text-xs text-[#5a6a76] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3a9898] shrink-0" />{f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0f4f5]">
          <h2 className="text-sm font-bold text-[#1a2632]">Hospital Subscriptions</h2>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#f0f4f5]">
              {['Hospital', 'Plan', 'Status', 'Start', 'Expiry', 'Amount', 'Action'].map(h => (
                <th key={h} className="px-6 py-3 text-left font-semibold text-[#8b9bae]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(s => (
              <>
                <tr key={s.id} className="border-b border-[#f0f4f5] last:border-0 hover:bg-[#f9fafb]">
                  <td className="px-6 py-3.5 font-semibold text-[#1a2632]">{s.hospital}</td>
                  <td className="px-6 py-3.5 text-[#5a6a76]">{s.plan}</td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[s.status]}`}>{s.status}</span>
                  </td>
                  <td className="px-6 py-3.5 text-[#5a6a76]">{s.start}</td>
                  <td className="px-6 py-3.5 text-[#5a6a76]">{s.expiry}</td>
                  <td className="px-6 py-3.5 text-[#5a6a76]">{s.amount}</td>
                  <td className="px-6 py-3.5">
                    <button onClick={() => editing === s.id ? setEditing(null) : startEdit(s)} className="text-[#3a9898] font-semibold hover:underline">
                      {editing === s.id ? 'Cancel' : 'Edit'}
                    </button>
                  </td>
                </tr>
                {editing === s.id && (
                  <tr key={`edit-${s.id}`} className="bg-[#f9fafb] border-b border-[#f0f4f5]">
                    <td colSpan={7} className="px-6 py-4">
                      <div className="flex items-end gap-4 flex-wrap">
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-[#5a6a76]">Plan</label>
                          <select value={editForm.plan} onChange={e => setEditForm(p => ({ ...p, plan: e.target.value }))}
                            className="bg-white border border-[#dde5e7] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#3a9898]">
                            <option>Basic</option><option>Pro</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-[#5a6a76]">Status</label>
                          <select value={editForm.status} onChange={e => setEditForm(p => ({ ...p, status: e.target.value }))}
                            className="bg-white border border-[#dde5e7] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#3a9898]">
                            <option>Trial</option><option>Active</option><option>Expired</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-[#5a6a76]">Expiry Date</label>
                          <input type="date" value={editForm.expiry} onChange={e => setEditForm(p => ({ ...p, expiry: e.target.value }))}
                            className="bg-white border border-[#dde5e7] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#3a9898]" />
                        </div>
                        <button onClick={() => setEditing(null)}
                          className="flex items-center gap-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                          <Save size={12} /> Save
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

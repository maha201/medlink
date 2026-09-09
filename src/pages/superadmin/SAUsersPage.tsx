import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

const initialUsers = [
  { id: 1, name: 'Arjun Mehta', email: 'arjun@medlink.io', role: 'Super Admin', status: 'Active', joined: '2024-01-10' },
  { id: 2, name: 'Priya Nair', email: 'priya@medlink.io', role: 'Support Admin', status: 'Active', joined: '2024-03-22' },
  { id: 3, name: 'Karthik Raja', email: 'karthik@medlink.io', role: 'Billing Admin', status: 'Inactive', joined: '2024-06-15' },
]

export default function SAUsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', role: 'Support Admin' })

  const addUser = (e: React.FormEvent) => {
    e.preventDefault()
    setUsers(prev => [...prev, { id: Date.now(), ...form, status: 'Active', joined: new Date().toISOString().split('T')[0] }])
    setForm({ name: '', email: '', role: 'Support Admin' })
    setShowForm(false)
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#1a2632]">Admin Users</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={14} /> Invite User
        </button>
      </div>

      {/* Invite Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-sm font-bold text-[#1a2632] mb-4">Invite New Admin</h2>
          <form onSubmit={addUser} className="flex items-end gap-4 flex-wrap">
            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'e.g. Ravi Kumar' },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'ravi@medlink.io' },
            ].map(f => (
              <div key={f.key} className="space-y-1.5 flex-1 min-w-[160px]">
                <label className="text-xs font-semibold text-[#5a6a76]">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={(form as Record<string, string>)[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  required
                  className="w-full bg-[#f5f7f8] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#3a9898]"
                />
              </div>
            ))}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5a6a76]">Role</label>
              <select
                value={form.role}
                onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                className="bg-[#f5f7f8] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#3a9898]"
              >
                <option>Super Admin</option>
                <option>Support Admin</option>
                <option>Billing Admin</option>
              </select>
            </div>
            <button type="submit" className="bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors">
              Send Invite
            </button>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#f0f4f5]">
              {['Name', 'Email', 'Role', 'Status', 'Joined', ''].map(h => (
                <th key={h} className="px-6 py-3 text-left font-semibold text-[#8b9bae]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-[#f0f4f5] last:border-0 hover:bg-[#f9fafb]">
                <td className="px-6 py-3.5 font-semibold text-[#1a2632]">{u.name}</td>
                <td className="px-6 py-3.5 text-[#5a6a76]">{u.email}</td>
                <td className="px-6 py-3.5">
                  <span className="bg-[#eaf6f5] text-[#3a9898] px-2.5 py-1 rounded-full text-[10px] font-bold">{u.role}</span>
                </td>
                <td className="px-6 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-[#5a6a76]">{u.joined}</td>
                <td className="px-6 py-3.5">
                  <button onClick={() => setUsers(prev => prev.filter(x => x.id !== u.id))}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-[#8b9bae] hover:text-red-500 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

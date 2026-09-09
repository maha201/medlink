import { useState } from 'react'
import { Search } from 'lucide-react'

const logs = [
  { id: 1, user: 'Arjun Mehta', action: 'Created hospital', target: 'Apollo Clinic Chennai', time: '2025-07-15 10:32', type: 'Create' },
  { id: 2, user: 'Priya Nair', action: 'Updated subscription', target: 'Sunrise Medical Center', time: '2025-07-15 09:18', type: 'Update' },
  { id: 3, user: 'Arjun Mehta', action: 'Disabled module', target: 'City Care Clinic → Pharmacy', time: '2025-07-14 16:45', type: 'Update' },
  { id: 4, user: 'Karthik Raja', action: 'Invited admin user', target: 'priya@medlink.io', time: '2025-07-14 14:20', type: 'Create' },
  { id: 5, user: 'Arjun Mehta', action: 'Expired subscription', target: 'City Care Clinic', time: '2025-07-13 11:00', type: 'Delete' },
  { id: 6, user: 'Priya Nair', action: 'Enabled module', target: 'Green Valley Hospital → Reports', time: '2025-07-13 09:55', type: 'Update' },
  { id: 7, user: 'Arjun Mehta', action: 'Upgraded plan', target: 'Lotus Health Hub → Pro', time: '2025-07-12 15:30', type: 'Update' },
  { id: 8, user: 'Karthik Raja', action: 'Deleted admin user', target: 'old@medlink.io', time: '2025-07-12 10:10', type: 'Delete' },
]

const typeStyle: Record<string, string> = {
  Create: 'bg-emerald-100 text-emerald-700',
  Update: 'bg-blue-100 text-blue-700',
  Delete: 'bg-red-100 text-red-700',
}

export default function SAAuditLogsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = logs.filter(l => {
    const matchSearch = l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.target.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || l.type === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-lg font-bold text-[#1a2632]">Audit Logs</h1>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0f4f5] flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]" size={14} />
            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#f5f7f8] rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#3a9898]"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Create', 'Update', 'Delete'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === f ? 'bg-[#3a9898] text-white' : 'bg-[#f5f7f8] text-[#5a6a76] hover:bg-[#e8f0f0]'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#f0f4f5]">
              {['Time', 'User', 'Action', 'Target', 'Type'].map(h => (
                <th key={h} className="px-6 py-3 text-left font-semibold text-[#8b9bae]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} className="border-b border-[#f0f4f5] last:border-0 hover:bg-[#f9fafb]">
                <td className="px-6 py-3.5 text-[#8b9bae] whitespace-nowrap">{l.time}</td>
                <td className="px-6 py-3.5 font-semibold text-[#1a2632]">{l.user}</td>
                <td className="px-6 py-3.5 text-[#5a6a76]">{l.action}</td>
                <td className="px-6 py-3.5 text-[#5a6a76]">{l.target}</td>
                <td className="px-6 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${typeStyle[l.type]}`}>{l.type}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

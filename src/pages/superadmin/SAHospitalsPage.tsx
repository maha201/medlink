import { useState } from 'react'
import { Search, Plus, Eye } from 'lucide-react'

const hospitals = [
  { id: 1, name: 'Apollo Clinic Chennai', email: 'admin@apollo.com', phone: '+91 98765 43210', plan: 'Pro', status: 'Active', expiry: '2025-12-31', city: 'Chennai' },
  { id: 2, name: 'Sunrise Medical Center', email: 'info@sunrise.com', phone: '+91 87654 32109', plan: 'Basic', status: 'Trial', expiry: '2025-08-15', city: 'Coimbatore' },
  { id: 3, name: 'Green Valley Hospital', email: 'contact@greenvalley.com', phone: '+91 76543 21098', plan: 'Pro', status: 'Active', expiry: '2025-11-20', city: 'Madurai' },
  { id: 4, name: 'City Care Clinic', email: 'admin@citycare.com', phone: '+91 65432 10987', plan: 'Basic', status: 'Expired', expiry: '2025-06-01', city: 'Salem' },
  { id: 5, name: 'Lotus Health Hub', email: 'hello@lotus.com', phone: '+91 54321 09876', plan: 'Pro', status: 'Active', expiry: '2026-01-15', city: 'Trichy' },
  { id: 6, name: 'Nova Specialty Clinic', email: 'nova@clinic.com', phone: '+91 43210 98765', plan: 'Basic', status: 'Trial', expiry: '2025-09-01', city: 'Vellore' },
]

const statusStyle: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-700',
  Trial: 'bg-amber-100 text-amber-700',
  Expired: 'bg-red-100 text-red-700',
}

export default function SAHospitalsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = hospitals.filter(h => {
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase()) || h.city.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || h.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#1a2632]">Hospital List</h1>
        <button className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={14} /> Add Hospital
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="px-6 py-4 border-b border-[#f0f4f5] flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]" size={14} />
            <input
              type="text"
              placeholder="Search hospital or city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#f5f7f8] rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#3a9898]"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Active', 'Trial', 'Expired'].map(f => (
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
              {['Hospital', 'City', 'Contact', 'Plan', 'Status', 'Expiry', ''].map(h => (
                <th key={h} className="px-6 py-3 text-left font-semibold text-[#8b9bae]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(h => (
              <tr key={h.id} className="border-b border-[#f0f4f5] last:border-0 hover:bg-[#f9fafb]">
                <td className="px-6 py-3.5 font-semibold text-[#1a2632]">{h.name}</td>
                <td className="px-6 py-3.5 text-[#5a6a76]">{h.city}</td>
                <td className="px-6 py-3.5 text-[#5a6a76]">
                  <p>{h.email}</p>
                  <p className="text-[#8b9bae]">{h.phone}</p>
                </td>
                <td className="px-6 py-3.5 text-[#5a6a76]">{h.plan}</td>
                <td className="px-6 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[h.status]}`}>{h.status}</span>
                </td>
                <td className="px-6 py-3.5 text-[#5a6a76]">{h.expiry}</td>
                <td className="px-6 py-3.5">
                  <button className="p-1.5 rounded-lg hover:bg-[#f0f4f5] text-[#8b9bae] hover:text-[#3a9898] transition-colors">
                    <Eye size={14} />
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

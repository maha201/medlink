import { Building2, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react'

const stats = [
  { label: 'Total Hospitals', value: '24', icon: Building2, color: 'bg-[#3a9898]', change: '+3 this month' },
  { label: 'Active', value: '18', icon: CheckCircle, color: 'bg-emerald-500', change: '75% of total' },
  { label: 'Trial', value: '4', icon: Clock, color: 'bg-amber-500', change: '2 expiring soon' },
  { label: 'Expired', value: '2', icon: XCircle, color: 'bg-red-500', change: 'Needs attention' },
]

const recentHospitals = [
  { name: 'Apollo Clinic Chennai', plan: 'Pro', status: 'Active', expiry: '2025-12-31', modules: 6 },
  { name: 'Sunrise Medical Center', plan: 'Basic', status: 'Trial', expiry: '2025-08-15', modules: 3 },
  { name: 'Green Valley Hospital', plan: 'Pro', status: 'Active', expiry: '2025-11-20', modules: 6 },
  { name: 'City Care Clinic', plan: 'Basic', status: 'Expired', expiry: '2025-06-01', modules: 2 },
  { name: 'Lotus Health Hub', plan: 'Pro', status: 'Active', expiry: '2026-01-15', modules: 6 },
]

const statusStyle: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-700',
  Trial: 'bg-amber-100 text-amber-700',
  Expired: 'bg-red-100 text-red-700',
}

export default function SADashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-[#8b9bae]">{s.label}</p>
              <div className={`w-8 h-8 ${s.color} rounded-xl flex items-center justify-center`}>
                <s.icon size={15} className="text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1a2632]">{s.value}</p>
            <p className="text-[11px] text-[#8b9bae] mt-1 flex items-center gap-1">
              <TrendingUp size={10} /> {s.change}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Hospitals */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0f4f5]">
          <h2 className="text-sm font-bold text-[#1a2632]">Recent Hospitals</h2>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#f0f4f5]">
              {['Hospital', 'Plan', 'Status', 'Expiry', 'Modules'].map(h => (
                <th key={h} className="px-6 py-3 text-left font-semibold text-[#8b9bae]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentHospitals.map((h, i) => (
              <tr key={i} className="border-b border-[#f0f4f5] last:border-0 hover:bg-[#f9fafb]">
                <td className="px-6 py-3.5 font-semibold text-[#1a2632]">{h.name}</td>
                <td className="px-6 py-3.5 text-[#5a6a76]">{h.plan}</td>
                <td className="px-6 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[h.status]}`}>{h.status}</span>
                </td>
                <td className="px-6 py-3.5 text-[#5a6a76]">{h.expiry}</td>
                <td className="px-6 py-3.5 text-[#5a6a76]">{h.modules} enabled</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

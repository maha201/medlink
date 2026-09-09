import { useState } from 'react'
import { Save } from 'lucide-react'

const allModules = ['Dashboard', 'Patients', 'Doctors', 'Appointments', 'Pharmacy', 'Laboratory', 'Billing', 'Inventory', 'Reports', 'Messages']

const initialData = [
  { id: 1, hospital: 'Apollo Clinic Chennai', plan: 'Pro', modules: ['Dashboard', 'Patients', 'Doctors', 'Appointments', 'Pharmacy', 'Billing'] },
  { id: 2, hospital: 'Sunrise Medical Center', plan: 'Basic', modules: ['Dashboard', 'Patients', 'Appointments'] },
  { id: 3, hospital: 'Green Valley Hospital', plan: 'Pro', modules: ['Dashboard', 'Patients', 'Doctors', 'Appointments', 'Laboratory', 'Billing'] },
  { id: 4, hospital: 'City Care Clinic', plan: 'Basic', modules: ['Dashboard', 'Patients'] },
]

export default function SAModuleControlPage() {
  const [data, setData] = useState(initialData)
  const [saved, setSaved] = useState<number | null>(null)

  const toggle = (hospitalId: number, mod: string) => {
    setData(prev => prev.map(h => {
      if (h.id !== hospitalId) return h
      const has = h.modules.includes(mod)
      return { ...h, modules: has ? h.modules.filter(m => m !== mod) : [...h.modules, mod] }
    }))
  }

  const save = (id: number) => {
    setSaved(id)
    setTimeout(() => setSaved(null), 2000)
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-lg font-bold text-[#1a2632]">Module Control</h1>
      <p className="text-xs text-[#8b9bae]">Enable or disable modules per hospital. Changes take effect immediately after saving.</p>

      <div className="space-y-4">
        {data.map(h => (
          <div key={h.id} className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#1a2632]">{h.hospital}</h3>
                <p className="text-[11px] text-[#8b9bae]">{h.plan} Plan · {h.modules.length} modules enabled</p>
              </div>
              <button
                onClick={() => save(h.id)}
                className="flex items-center gap-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                {saved === h.id ? '✓ Saved' : <><Save size={12} /> Save</>}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allModules.map(m => {
                const enabled = h.modules.includes(m)
                return (
                  <button
                    key={m}
                    onClick={() => toggle(h.id, m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      enabled
                        ? 'bg-[#3a9898] text-white border-[#3a9898]'
                        : 'bg-[#f5f7f8] text-[#8b9bae] border-transparent hover:border-[#3a9898]/30'
                    }`}
                  >
                    {m}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

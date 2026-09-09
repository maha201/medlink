import { useState } from 'react'
import { Save } from 'lucide-react'

const modules = ['Dashboard', 'Patients', 'Doctors', 'Appointments', 'Pharmacy', 'Laboratory', 'Billing', 'Inventory', 'Reports', 'Messages']

export default function SAHospitalSetupPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '', state: '', address: '',
    adminName: '', adminEmail: '', adminPhone: '',
    plan: 'Basic', status: 'Trial',
    expiryDate: '', maxDoctors: '', maxPatients: '',
  })
  const [enabledModules, setEnabledModules] = useState<string[]>(['Dashboard', 'Patients'])
  const [saved, setSaved] = useState(false)

  const toggle = (m: string) =>
    setEnabledModules(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const Field = ({ label, name, type = 'text', placeholder }: { label: string; name: string; type?: string; placeholder?: string }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-[#5a6a76]">{label}</label>
      <input
        type={type}
        placeholder={placeholder || label}
        value={(form as Record<string, string>)[name]}
        onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
        className="w-full bg-[#f5f7f8] border border-transparent rounded-xl px-4 py-2.5 text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898] transition-all placeholder:text-[#a8b8c8]"
      />
    </div>
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-[#1a2632]">Hospital Setup</h1>
        {saved && <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">✓ Saved successfully</span>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Hospital Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#1a2632] mb-2">Hospital Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Hospital Name" name="name" placeholder="e.g. Apollo Clinic" />
            <Field label="Email" name="email" type="email" placeholder="admin@hospital.com" />
            <Field label="Phone" name="phone" placeholder="+91 98765 43210" />
            <Field label="City" name="city" placeholder="Chennai" />
            <Field label="State" name="state" placeholder="Tamil Nadu" />
            <Field label="Address" name="address" placeholder="Full address" />
          </div>
        </div>

        {/* Admin Account */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#1a2632] mb-2">Hospital Admin Account</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Admin Name" name="adminName" placeholder="Dr. John" />
            <Field label="Admin Email" name="adminEmail" type="email" placeholder="john@hospital.com" />
            <Field label="Admin Phone" name="adminPhone" placeholder="+91 98765 43210" />
          </div>
        </div>

        {/* Plan & Limits */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#1a2632] mb-2">Plan & Limits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5a6a76]">Plan</label>
              <select
                value={form.plan}
                onChange={e => setForm(p => ({ ...p, plan: e.target.value }))}
                className="w-full bg-[#f5f7f8] border border-transparent rounded-xl px-4 py-2.5 text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]"
              >
                <option>Basic</option>
                <option>Pro</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5a6a76]">Status</label>
              <select
                value={form.status}
                onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                className="w-full bg-[#f5f7f8] border border-transparent rounded-xl px-4 py-2.5 text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]"
              >
                <option>Trial</option>
                <option>Active</option>
                <option>Expired</option>
              </select>
            </div>
            <Field label="Expiry Date" name="expiryDate" type="date" />
            <Field label="Max Doctors" name="maxDoctors" type="number" placeholder="e.g. 20" />
          </div>
        </div>

        {/* Modules */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-sm font-bold text-[#1a2632] mb-4">Enable Modules</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {modules.map(m => (
              <button
                key={m}
                type="button"
                onClick={() => toggle(m)}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  enabledModules.includes(m)
                    ? 'bg-[#3a9898] text-white border-[#3a9898]'
                    : 'bg-[#f5f7f8] text-[#5a6a76] border-transparent hover:border-[#3a9898]/30'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
          >
            <Save size={14} /> Save Hospital
          </button>
        </div>
      </form>
    </div>
  )
}

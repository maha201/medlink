import { statusBadge } from './inventoryData'

export const inputCls = 'w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3.5 py-2.5 text-[13px] text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]/20 transition-all placeholder:text-[#b0bec8]'
export const labelCls = 'block text-[11.5px] font-semibold text-[#5a6a76] mb-1.5'
export const req = <span className="text-red-500 ml-0.5">*</span>

export function Badge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10.5px] font-bold border ${statusBadge[status] ?? 'bg-slate-100 text-slate-500 border-slate-200'}`}>
      {status}
    </span>
  )
}

export function Th({ children }: { children?: React.ReactNode }) {
  return <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#8b9bae] whitespace-nowrap">{children}</th>
}

export function Td({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3.5 text-[13px] text-[#5a6a76] ${className}`}>{children}</td>
}

export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-[#e8edf2] rounded-[14px] p-5">
      <h3 className="text-[12px] font-bold text-[#8b9bae] tracking-widest uppercase mb-4">{title}</h3>
      {children}
    </div>
  )
}

export function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div className="bg-white border border-[#e8edf2] rounded-[14px] p-4">
      <p className="text-[11.5px] font-semibold text-[#8b9bae] mb-2">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-[11px] text-[#8b9bae] mt-1">{sub}</p>}
    </div>
  )
}

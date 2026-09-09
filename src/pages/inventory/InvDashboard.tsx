import { AlertTriangle, Clock, Plus, ShoppingCart, MoreHorizontal } from 'lucide-react'
import { StatCard, Badge, Th, Td } from './InvComponents'
import { items, expiryItems } from './inventoryData'

const lowStock = items.filter(i => ['Low Stock', 'Critical', 'Out of Stock'].includes(i.status))

function expiryStatus(days: number) {
  if (days < 0) return 'Expired'
  if (days <= 7) return 'Critical'
  if (days <= 30) return 'Expiring Soon'
  return 'Normal'
}

export default function InvDashboard({ onAddItem, onCreatePO }: { onAddItem: () => void; onCreatePO: () => void }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[17px] font-bold text-[#1a2632]">Inventory</h1>
          <p className="text-[12px] text-[#8b9bae] mt-0.5">Monitor stock levels, purchases, usage and inventory activity.</p>
        </div>
        <div className="flex gap-2.5">
          <button onClick={onAddItem} className="flex items-center gap-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12px] font-bold px-4 py-2.5 rounded-xl transition-all">
            <Plus size={13} /> Add Item
          </button>
          <button onClick={onCreatePO} className="flex items-center gap-1.5 border border-[#e2e8ed] hover:border-[#3a9898] text-[#5a6a76] hover:text-[#3a9898] text-[12px] font-semibold px-4 py-2.5 rounded-xl transition-all">
            <ShoppingCart size={13} /> Create PO
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        <StatCard label="Total Items" value="1,248" sub="Across all categories" color="text-[#1a2632]" />
        <StatCard label="Total Stock Value" value="₹8,42,650" sub="Current valuation" color="text-[#3a9898]" />
        <StatCard label="Low Stock" value="18" sub="Need reorder" color="text-amber-600" />
        <StatCard label="Expiring Soon" value="12" sub="Within 30 days" color="text-amber-600" />
        <StatCard label="Out of Stock" value="7" sub="Immediate action" color="text-red-600" />
      </div>

      <div className="bg-white border border-[#e8edf2] rounded-[14px] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[13px] font-bold text-[#1a2632]">Stock Overview</h2>
          <div className="flex gap-1.5">
            {['Today', 'This Week', 'This Month', 'Custom'].map(f => (
              <button key={f} className={`px-3 py-1.5 rounded-lg text-[11.5px] font-semibold transition-colors ${f === 'This Week' ? 'bg-[#3a9898] text-white' : 'bg-[#f5f7f8] text-[#5a6a76] hover:bg-[#e8f0f0]'}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="flex items-end gap-2 h-28">
          {[
            { label: 'Mon', in: 70, out: 40, cur: 85 },
            { label: 'Tue', in: 55, out: 60, cur: 80 },
            { label: 'Wed', in: 90, out: 35, cur: 95 },
            { label: 'Thu', in: 45, out: 55, cur: 70 },
            { label: 'Fri', in: 80, out: 45, cur: 88 },
            { label: 'Sat', in: 30, out: 20, cur: 60 },
            { label: 'Sun', in: 20, out: 15, cur: 50 },
          ].map(d => (
            <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end gap-0.5 h-20">
                <div className="flex-1 bg-[#3a9898] rounded-t-sm" style={{ height: `${d.in}%` }} title="Stock In" />
                <div className="flex-1 bg-amber-400 rounded-t-sm" style={{ height: `${d.out}%` }} title="Stock Out" />
                <div className="flex-1 bg-[#c4e4e0] rounded-t-sm" style={{ height: `${d.cur}%` }} title="Current" />
              </div>
              <span className="text-[10px] text-[#8b9bae]">{d.label}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          {[['bg-[#3a9898]', 'Stock In'], ['bg-amber-400', 'Stock Out'], ['bg-[#c4e4e0]', 'Current Stock']].map(([c, l]) => (
            <div key={l} className="flex items-center gap-1.5"><div className={`w-2.5 h-2.5 rounded-sm ${c}`} /><span className="text-[11px] text-[#8b9bae]">{l}</span></div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-[#e8edf2] rounded-[14px] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#f0f4f5] flex items-center gap-2">
            <AlertTriangle size={14} className="text-amber-500" />
            <h2 className="text-[13px] font-bold text-[#1a2632]">Low Stock Items</h2>
          </div>
          <table className="w-full">
            <thead className="border-b border-[#f0f4f5]">
              <tr><Th>Item</Th><Th>Stock</Th><Th>Min Level</Th><Th>Status</Th><Th></Th></tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f5]">
              {lowStock.map(i => (
                <tr key={i.id} className="hover:bg-[#f9fafb]">
                  <Td><p className="font-semibold text-[#1a2632] text-[12.5px]">{i.name}</p><p className="text-[11px] text-[#8b9bae]">{i.category}</p></Td>
                  <Td><span className="font-semibold text-[#1a2632]">{i.stock}</span> <span className="text-[11px] text-[#8b9bae]">{i.unit}</span></Td>
                  <Td>{i.reorder}</Td>
                  <Td><Badge status={i.status} /></Td>
                  <Td><button className="p-1 hover:bg-[#f0f4f5] rounded-lg text-[#8b9bae]"><MoreHorizontal size={13} /></button></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white border border-[#e8edf2] rounded-[14px] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#f0f4f5] flex items-center gap-2">
            <Clock size={14} className="text-amber-500" />
            <h2 className="text-[13px] font-bold text-[#1a2632]">Expiring Soon</h2>
          </div>
          <table className="w-full">
            <thead className="border-b border-[#f0f4f5]">
              <tr><Th>Item</Th><Th>Batch</Th><Th>Expiry</Th><Th>Qty</Th><Th>Status</Th></tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f5]">
              {expiryItems.map(e => (
                <tr key={e.batch} className="hover:bg-[#f9fafb]">
                  <Td><p className="font-semibold text-[#1a2632] text-[12.5px]">{e.name}</p></Td>
                  <Td className="text-[11px]">{e.batch}</Td>
                  <Td className="text-[11px]">{e.expiry}</Td>
                  <Td>{e.qty}</Td>
                  <Td><Badge status={expiryStatus(e.days)} /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

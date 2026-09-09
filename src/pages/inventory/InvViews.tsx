import { useState } from 'react'
import { Search, Plus, MoreHorizontal, FileDown, Printer } from 'lucide-react'
import { Badge, Th, Td, StatCard, inputCls } from './InvComponents'
import { items, expiryItems, suppliers, purchaseOrders } from './inventoryData'

// ── Items List ────────────────────────────────────────────
export function InvItems({ onAdd, onAdjust }: { onAdd: () => void; onAdjust: () => void }) {
  const [search, setSearch] = useState('')
  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="text-[17px] font-bold text-[#1a2632]">Inventory Items</h1><p className="text-[12px] text-[#8b9bae]">Manage medicines, supplies, consumables and hospital stock.</p></div>
        <button onClick={onAdd} className="flex items-center gap-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12px] font-bold px-4 py-2.5 rounded-xl transition-all"><Plus size={13} /> Add Item</button>
      </div>
      <div className="bg-white border border-[#e8edf2] rounded-[14px] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#f0f4f5] flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]" size={13} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search item name, SKU..." className="w-full bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] pl-8 pr-4 py-2 text-[12.5px] focus:outline-none focus:border-[#3a9898]" />
          </div>
          {['Category', 'Stock Status', 'Supplier', 'Location', 'Item Type'].map(f => (
            <select key={f} className="bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3 py-2 text-[12px] text-[#5a6a76] focus:outline-none focus:border-[#3a9898]">
              <option>{f}</option>
            </select>
          ))}
        </div>
        <table className="w-full">
          <thead className="border-b border-[#f0f4f5] bg-[#f8fafb]">
            <tr><Th>Item</Th><Th>SKU</Th><Th>Category</Th><Th>Unit</Th><Th>Stock</Th><Th>Reorder</Th><Th>Location</Th><Th>Status</Th><Th>Updated</Th><Th></Th></tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f5]">
            {filtered.map(i => (
              <tr key={i.id} className="hover:bg-[#f9fafb]">
                <Td><p className="font-semibold text-[#1a2632] text-[12.5px]">{i.name}</p></Td>
                <Td className="text-[11.5px] font-mono text-[#8b9bae]">{i.id}</Td>
                <Td>{i.category}</Td>
                <Td>{i.unit}</Td>
                <Td><span className="font-semibold text-[#1a2632]">{i.stock}</span></Td>
                <Td>{i.reorder}</Td>
                <Td className="text-[11.5px]">{i.location}</Td>
                <Td><Badge status={i.status} /></Td>
                <Td className="text-[11.5px]">{i.updated}</Td>
                <Td>
                  <div className="flex gap-1">
                    <button onClick={onAdjust} className="text-[11px] font-semibold text-[#3a9898] hover:underline px-2 py-1">Adjust</button>
                    <button className="p-1.5 hover:bg-[#f0f4f5] rounded-lg text-[#8b9bae]"><MoreHorizontal size={13} /></button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-[#f0f4f5] flex items-center justify-between text-[12px] text-[#8b9bae]">
          <span>Showing {filtered.length} of {items.length} items</span>
          <div className="flex gap-1">
            {['Previous', '1', '2', '3', 'Next'].map(p => (
              <button key={p} className={`px-3 py-1 rounded-lg text-[12px] transition-colors ${p === '1' ? 'bg-[#3a9898] text-white' : 'hover:bg-[#f0f4f5] text-[#5a6a76]'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Expiry Tracking ───────────────────────────────────────
function expiryStatus(days: number) {
  if (days < 0) return 'Expired'
  if (days <= 7) return 'Critical'
  if (days <= 30) return 'Expiring Soon'
  return 'Normal'
}

export function InvExpiry() {
  return (
    <div className="space-y-4">
      <div><h1 className="text-[17px] font-bold text-[#1a2632]">Expiry Tracking</h1><p className="text-[12px] text-[#8b9bae]">Monitor inventory approaching expiry and reduce wastage.</p></div>
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="Expiring in 7 Days" value="3" color="text-red-600" />
        <StatCard label="Expiring in 30 Days" value="9" color="text-amber-600" />
        <StatCard label="Expired Items" value="4" color="text-red-600" />
        <StatCard label="Expired Stock Value" value="₹12,400" color="text-red-600" />
      </div>
      <div className="bg-white border border-[#e8edf2] rounded-[14px] overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-[#f0f4f5] bg-[#f8fafb]">
            <tr><Th>Item</Th><Th>Batch</Th><Th>Expiry Date</Th><Th>Qty</Th><Th>Location</Th><Th>Days Remaining</Th><Th>Status</Th><Th>Action</Th></tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f5]">
            {expiryItems.map(e => {
              const st = expiryStatus(e.days)
              return (
                <tr key={e.batch} className="hover:bg-[#f9fafb]">
                  <Td><p className="font-semibold text-[#1a2632] text-[12.5px]">{e.name}</p></Td>
                  <Td className="text-[11.5px] font-mono">{e.batch}</Td>
                  <Td className="text-[12px]">{e.expiry}</Td>
                  <Td>{e.qty}</Td>
                  <Td className="text-[11.5px]">{e.location}</Td>
                  <Td><span className={`font-bold text-[12.5px] ${e.days < 0 ? 'text-red-600' : e.days <= 7 ? 'text-red-500' : e.days <= 30 ? 'text-amber-600' : 'text-emerald-600'}`}>{e.days < 0 ? `${Math.abs(e.days)}d ago` : `${e.days}d`}</span></Td>
                  <Td><Badge status={st} /></Td>
                  <Td>
                    <div className="flex gap-1">
                      <button className="text-[11px] font-semibold text-[#3a9898] hover:underline px-2 py-1">View</button>
                      <button className="text-[11px] font-semibold text-amber-600 hover:underline px-2 py-1">Transfer</button>
                      <button className="text-[11px] font-semibold text-red-500 hover:underline px-2 py-1">Dispose</button>
                    </div>
                  </Td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Suppliers ─────────────────────────────────────────────
export function InvSuppliers({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="text-[17px] font-bold text-[#1a2632]">Suppliers</h1><p className="text-[12px] text-[#8b9bae]">Manage inventory suppliers and vendor details.</p></div>
        <button onClick={onAdd} className="flex items-center gap-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12px] font-bold px-4 py-2.5 rounded-xl transition-all"><Plus size={13} /> Add Supplier</button>
      </div>
      <div className="bg-white border border-[#e8edf2] rounded-[14px] overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-[#f0f4f5] bg-[#f8fafb]">
            <tr><Th>Supplier</Th><Th>Contact Person</Th><Th>Phone</Th><Th>Email</Th><Th>Items</Th><Th>Outstanding</Th><Th>Status</Th><Th></Th></tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f5]">
            {suppliers.map(s => (
              <tr key={s.id} className="hover:bg-[#f9fafb]">
                <Td><p className="font-semibold text-[#1a2632] text-[12.5px]">{s.name}</p><p className="text-[11px] text-[#8b9bae]">{s.id}</p></Td>
                <Td>{s.contact}</Td>
                <Td className="text-[12px]">{s.phone}</Td>
                <Td className="text-[12px]">{s.email}</Td>
                <Td>{s.items}</Td>
                <Td><span className={`font-semibold ${s.outstanding === '₹0' ? 'text-emerald-600' : 'text-amber-600'}`}>{s.outstanding}</span></Td>
                <Td><Badge status={s.status} /></Td>
                <Td><button className="p-1.5 hover:bg-[#f0f4f5] rounded-lg text-[#8b9bae]"><MoreHorizontal size={13} /></button></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Purchase Orders ───────────────────────────────────────
export function InvPurchaseOrders({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="text-[17px] font-bold text-[#1a2632]">Purchase Orders</h1><p className="text-[12px] text-[#8b9bae]">Track and manage supplier purchase orders.</p></div>
        <button onClick={onCreate} className="flex items-center gap-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12px] font-bold px-4 py-2.5 rounded-xl transition-all"><Plus size={13} /> Create PO</button>
      </div>
      <div className="bg-white border border-[#e8edf2] rounded-[14px] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#f0f4f5] flex gap-3">
          {['Status', 'Supplier', 'Date Range'].map(f => (
            <select key={f} className="bg-[#f8fafb] border border-[#e2e8ed] rounded-[9px] px-3 py-2 text-[12px] text-[#5a6a76] focus:outline-none focus:border-[#3a9898]"><option>{f}</option></select>
          ))}
        </div>
        <table className="w-full">
          <thead className="border-b border-[#f0f4f5] bg-[#f8fafb]">
            <tr><Th>PO Number</Th><Th>Supplier</Th><Th>Order Date</Th><Th>Expected</Th><Th>Items</Th><Th>Total</Th><Th>Status</Th><Th></Th></tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f5]">
            {purchaseOrders.map(p => (
              <tr key={p.po} className="hover:bg-[#f9fafb]">
                <Td><span className="font-mono font-semibold text-[#3a9898] text-[12px]">{p.po}</span></Td>
                <Td><p className="font-semibold text-[#1a2632] text-[12.5px]">{p.supplier}</p></Td>
                <Td className="text-[12px]">{p.ordered}</Td>
                <Td className="text-[12px]">{p.expected}</Td>
                <Td>{p.items}</Td>
                <Td><span className="font-semibold text-[#1a2632]">{p.total}</span></Td>
                <Td><Badge status={p.status} /></Td>
                <Td><button className="p-1.5 hover:bg-[#f0f4f5] rounded-lg text-[#8b9bae]"><MoreHorizontal size={13} /></button></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Reports ───────────────────────────────────────────────
const reports = [
  'Stock Summary', 'Stock Movement', 'Purchase Report', 'Stock Consumption',
  'Expiry Report', 'Low Stock Report', 'Supplier Purchase Report', 'Stock Adjustment Report',
]

export function InvReports() {
  const [selected, setSelected] = useState('Stock Summary')
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="text-[17px] font-bold text-[#1a2632]">Inventory Reports</h1><p className="text-[12px] text-[#8b9bae]">Generate and export inventory reports.</p></div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 border border-[#e2e8ed] text-[#5a6a76] hover:border-[#3a9898] hover:text-[#3a9898] text-[12px] font-semibold px-4 py-2.5 rounded-xl transition-all"><FileDown size={13} /> Export CSV</button>
          <button className="flex items-center gap-1.5 border border-[#e2e8ed] text-[#5a6a76] hover:border-[#3a9898] hover:text-[#3a9898] text-[12px] font-semibold px-4 py-2.5 rounded-xl transition-all"><Printer size={13} /> Print</button>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-52 shrink-0 bg-white border border-[#e8edf2] rounded-[14px] p-2 space-y-0.5">
          {reports.map(r => (
            <button key={r} onClick={() => setSelected(r)}
              className={`w-full text-left px-3 py-2.5 rounded-[9px] text-[12.5px] font-semibold transition-colors ${selected === r ? 'bg-[#eaf6f5] text-[#3a9898]' : 'text-[#5a6a76] hover:bg-[#f5f7f8]'}`}>
              {r}
            </button>
          ))}
        </div>
        <div className="flex-1 bg-white border border-[#e8edf2] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-bold text-[#1a2632]">{selected}</h2>
            <div className="flex gap-3">
              <div><select className={inputCls + ' py-2 text-[12px]'}><option>All Categories</option><option>Medicines</option><option>Consumables</option></select></div>
              <div><input type="date" className={inputCls + ' py-2 text-[12px]'} defaultValue="2025-07-01" /></div>
              <div><input type="date" className={inputCls + ' py-2 text-[12px]'} defaultValue="2025-07-15" /></div>
            </div>
          </div>
          <table className="w-full text-[12.5px]">
            <thead className="border-b border-[#f0f4f5] bg-[#f8fafb]">
              <tr><Th>Item</Th><Th>Category</Th><Th>Opening</Th><Th>Stock In</Th><Th>Stock Out</Th><Th>Closing</Th><Th>Value</Th></tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f5]">
              {items.map(i => (
                <tr key={i.id} className="hover:bg-[#f9fafb]">
                  <Td><p className="font-semibold text-[#1a2632]">{i.name}</p></Td>
                  <Td>{i.category}</Td>
                  <Td>{i.stock + 20}</Td>
                  <Td className="text-emerald-600 font-semibold">+{Math.floor(Math.random() * 50 + 10)}</Td>
                  <Td className="text-red-500 font-semibold">-{Math.floor(Math.random() * 30 + 5)}</Td>
                  <Td className="font-semibold text-[#1a2632]">{i.stock}</Td>
                  <Td className="font-semibold text-[#3a9898]">₹{(i.stock * i.price).toLocaleString()}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

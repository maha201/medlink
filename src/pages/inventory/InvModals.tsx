import { useState } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'
import { inputCls, labelCls, req } from './InvComponents'

// ── Stock In ──────────────────────────────────────────────
export function StockInModal({ onClose }: { onClose: () => void }) {
  const [rows, setRows] = useState([{ item: '', batch: '', expiry: '', qty: '', price: '', tax: '' }])
  const addRow = () => setRows(p => [...p, { item: '', batch: '', expiry: '', qty: '', price: '', tax: '' }])
  const removeRow = (i: number) => setRows(p => p.filter((_, idx) => idx !== i))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-[900px] max-h-[92vh] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed]">
        <div className="px-6 py-4 flex items-center justify-between border-b border-[#f0f4f5] shrink-0">
          <div><h2 className="text-[15px] font-bold text-[#1a2632]">Stock In</h2><p className="text-[12px] text-[#8b9bae]">Record inventory received into the hospital.</p></div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae]"><X size={15} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div><label className={labelCls}>Supplier{req}</label><select className={inputCls}><option>MedPharma Distributors</option><option>HealthCare Supplies Co.</option><option>SurgicalPro India</option></select></div>
            <div><label className={labelCls}>Purchase Order</label><select className={inputCls}><option>PO-2025-0041</option><option>PO-2025-0038</option></select></div>
            <div><label className={labelCls}>Invoice Number</label><input className={inputCls} placeholder="INV-XXXX" /></div>
            <div><label className={labelCls}>Received Date{req}</label><input type="date" className={inputCls} defaultValue="2025-07-15" /></div>
            <div><label className={labelCls}>Storage Location</label><select className={inputCls}><option>Pharmacy Store</option><option>Main Store</option><option>Ward Store</option></select></div>
          </div>
          <div className="border border-[#e8edf2] rounded-[12px] overflow-hidden">
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#f8fafb] border-b border-[#e8edf2]">
                <tr>{['Item', 'Batch No.', 'Expiry Date', 'Qty', 'Unit Price', 'Tax %', ''].map(h => <th key={h} className="px-3 py-2.5 text-left text-[11px] font-semibold text-[#8b9bae]">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4f5]">
                {rows.map((_, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2"><select className={inputCls + ' text-[12px] py-2'}><option>Paracetamol 500mg</option><option>Surgical Gloves (M)</option><option>IV Cannula 20G</option></select></td>
                    <td className="px-3 py-2"><input className={inputCls + ' text-[12px] py-2'} placeholder="BT-2025-XXX" /></td>
                    <td className="px-3 py-2"><input type="date" className={inputCls + ' text-[12px] py-2'} /></td>
                    <td className="px-3 py-2 w-20"><input type="number" className={inputCls + ' text-[12px] py-2'} placeholder="0" /></td>
                    <td className="px-3 py-2 w-24"><input type="number" className={inputCls + ' text-[12px] py-2'} placeholder="₹0" /></td>
                    <td className="px-3 py-2 w-16"><input type="number" className={inputCls + ' text-[12px] py-2'} placeholder="0" /></td>
                    <td className="px-3 py-2"><button onClick={() => removeRow(i)} className="p-1.5 hover:bg-red-50 rounded-lg text-[#8b9bae] hover:text-red-500"><Trash2 size={13} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-3 py-2 border-t border-[#f0f4f5]">
              <button onClick={addRow} className="flex items-center gap-1.5 text-[12px] font-semibold text-[#3a9898] hover:text-[#2b6e6e]"><Plus size={13} /> Add Item</button>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-[#f8fafb] border border-[#e8edf2] rounded-[12px] p-4 text-[12.5px] space-y-1.5 min-w-[220px]">
              <div className="flex justify-between text-[#5a6a76]"><span>Subtotal</span><span>₹0.00</span></div>
              <div className="flex justify-between text-[#5a6a76]"><span>Tax</span><span>₹0.00</span></div>
              <div className="flex justify-between font-bold text-[#1a2632] border-t border-[#e8edf2] pt-1.5"><span>Grand Total</span><span>₹0.00</span></div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#f0f4f5] flex items-center justify-between shrink-0 bg-white rounded-b-[20px]">
          <button onClick={onClose} className="text-[12.5px] font-semibold text-[#8b9bae] hover:text-red-500 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors">Cancel</button>
          <div className="flex gap-3">
            <button className="text-[12.5px] font-semibold text-[#5a6a76] border border-[#e2e8ed] px-5 py-2.5 rounded-xl">Save Draft</button>
            <button className="bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all">Receive Stock</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Stock Out ─────────────────────────────────────────────
export function StockOutModal({ onClose }: { onClose: () => void }) {
  const [rows, setRows] = useState([{ item: '', batch: '', qty: '' }])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-[860px] max-h-[92vh] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed]">
        <div className="px-6 py-4 flex items-center justify-between border-b border-[#f0f4f5] shrink-0">
          <div><h2 className="text-[15px] font-bold text-[#1a2632]">Stock Out</h2><p className="text-[12px] text-[#8b9bae]">Record inventory issued or consumed.</p></div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae]"><X size={15} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div><label className={labelCls}>Issue Type{req}</label><select className={inputCls}><option>Pharmacy</option><option>OPD</option><option>IPD</option><option>Laboratory</option><option>Emergency</option><option>General Use</option><option>Damaged</option><option>Expired</option></select></div>
            <div><label className={labelCls}>Department{req}</label><select className={inputCls}><option>Cardiology</option><option>General Medicine</option><option>Pediatrics</option><option>Orthopedics</option><option>Emergency</option></select></div>
            <div><label className={labelCls}>Requested By</label><input className={inputCls} placeholder="Staff name" /></div>
            <div><label className={labelCls}>Date</label><input type="date" className={inputCls} defaultValue="2025-07-15" /></div>
            <div><label className={labelCls}>Reference Number</label><input className={inputCls} placeholder="REF-XXXX" /></div>
            <div><label className={labelCls}>Notes</label><input className={inputCls} placeholder="Optional notes" /></div>
          </div>
          <div className="border border-[#e8edf2] rounded-[12px] overflow-hidden">
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#f8fafb] border-b border-[#e8edf2]">
                <tr>{['Item', 'Batch', 'Available Qty', 'Issue Qty', 'Unit', 'Reason', ''].map(h => <th key={h} className="px-3 py-2.5 text-left text-[11px] font-semibold text-[#8b9bae]">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4f5]">
                {rows.map((_, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2"><select className={inputCls + ' text-[12px] py-2'}><option>Paracetamol 500mg</option><option>Surgical Gloves (M)</option></select></td>
                    <td className="px-3 py-2"><select className={inputCls + ' text-[12px] py-2'}><option>BT-2025-001</option><option>BT-2025-018</option></select></td>
                    <td className="px-3 py-2"><span className="text-[12px] font-semibold text-[#1a2632]">245</span></td>
                    <td className="px-3 py-2 w-20"><input type="number" max={245} className={inputCls + ' text-[12px] py-2'} placeholder="0" /></td>
                    <td className="px-3 py-2 w-16"><span className="text-[12px] text-[#8b9bae]">Strip</span></td>
                    <td className="px-3 py-2"><input className={inputCls + ' text-[12px] py-2'} placeholder="Reason" /></td>
                    <td className="px-3 py-2"><button onClick={() => setRows(p => p.filter((_, idx) => idx !== i))} className="p-1.5 hover:bg-red-50 rounded-lg text-[#8b9bae] hover:text-red-500"><Trash2 size={13} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-3 py-2 border-t border-[#f0f4f5]">
              <button onClick={() => setRows(p => [...p, { item: '', batch: '', qty: '' }])} className="flex items-center gap-1.5 text-[12px] font-semibold text-[#3a9898]"><Plus size={13} /> Add Item</button>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#f0f4f5] flex items-center justify-between shrink-0 bg-white rounded-b-[20px]">
          <button onClick={onClose} className="text-[12.5px] font-semibold text-[#8b9bae] hover:text-red-500 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors">Cancel</button>
          <button className="bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all">Confirm Stock Out</button>
        </div>
      </div>
    </div>
  )
}

// ── Adjust Stock ──────────────────────────────────────────
export function AdjustStockModal({ onClose }: { onClose: () => void }) {
  const [adjType, setAdjType] = useState('Increase')
  const [qty, setQty] = useState(0)
  const currentStock = 245
  const isDecrease = ['Decrease', 'Damaged', 'Expired', 'Lost'].includes(adjType)
  const adjusted = isDecrease ? currentStock - qty : currentStock + qty

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-[520px] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed]">
        <div className="px-6 py-4 flex items-center justify-between border-b border-[#f0f4f5] shrink-0">
          <div><h2 className="text-[15px] font-bold text-[#1a2632]">Adjust Stock</h2><p className="text-[12px] text-[#8b9bae]">Manually correct stock quantity.</p></div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae]"><X size={15} /></button>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div><label className={labelCls}>Item{req}</label><select className={inputCls}><option>Paracetamol 500mg</option><option>Surgical Gloves (M)</option></select></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelCls}>Batch Number</label><select className={inputCls}><option>BT-2025-001</option></select></div>
            <div><label className={labelCls}>Current Stock</label><input className={inputCls + ' bg-[#f0f4f5] cursor-not-allowed'} value={`${currentStock} Strips`} readOnly /></div>
          </div>
          <div>
            <label className={labelCls}>Adjustment Type{req}</label>
            <div className="grid grid-cols-3 gap-2">
              {['Increase', 'Decrease', 'Damaged', 'Expired', 'Lost', 'Physical Count'].map(t => (
                <button key={t} type="button" onClick={() => setAdjType(t)}
                  className={`px-3 py-2 rounded-[9px] text-[11.5px] font-semibold border transition-all ${adjType === t ? (isDecrease || t === 'Damaged' || t === 'Expired' || t === 'Lost' ? 'bg-red-500 text-white border-red-500' : 'bg-[#3a9898] text-white border-[#3a9898]') : 'bg-[#f8fafb] text-[#5a6a76] border-[#e2e8ed] hover:border-[#3a9898]'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelCls}>Adjustment Quantity{req}</label><input type="number" className={inputCls} value={qty} onChange={e => setQty(Number(e.target.value))} /></div>
            <div><label className={labelCls}>Reason{req}</label><input className={inputCls} placeholder="e.g. Physical count mismatch" /></div>
          </div>
          <div><label className={labelCls}>Notes</label><textarea rows={2} className={inputCls + ' resize-none'} placeholder="Additional notes..." /></div>
          <div className={`flex items-center justify-between p-3.5 rounded-[10px] border ${isDecrease ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'}`}>
            <div className="text-center"><p className="text-[10.5px] text-[#8b9bae] mb-0.5">Current Stock</p><p className="text-lg font-bold text-[#1a2632]">{currentStock}</p></div>
            <span className="text-[#8b9bae] text-lg">→</span>
            <div className="text-center"><p className="text-[10.5px] text-[#8b9bae] mb-0.5">Adjusted Stock</p><p className={`text-lg font-bold ${isDecrease ? 'text-red-600' : 'text-emerald-600'}`}>{adjusted}</p></div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#f0f4f5] flex items-center justify-between shrink-0 bg-white rounded-b-[20px]">
          <button onClick={onClose} className="text-[12.5px] font-semibold text-[#8b9bae] hover:text-red-500 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors">Cancel</button>
          <button className="bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all">Save Adjustment</button>
        </div>
      </div>
    </div>
  )
}

// ── Transfer Stock ────────────────────────────────────────
export function TransferStockModal({ onClose }: { onClose: () => void }) {
  const [rows, setRows] = useState([{ item: '', batch: '', qty: '' }])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-[720px] max-h-[92vh] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed]">
        <div className="px-6 py-4 flex items-center justify-between border-b border-[#f0f4f5] shrink-0">
          <div><h2 className="text-[15px] font-bold text-[#1a2632]">Transfer Stock</h2><p className="text-[12px] text-[#8b9bae]">Move inventory between storage locations.</p></div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae]"><X size={15} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelCls}>From Location{req}</label><select className={inputCls}><option>Pharmacy Store</option><option>Main Store</option><option>Ward Store</option></select></div>
            <div><label className={labelCls}>To Location{req}</label><select className={inputCls}><option>Main Store</option><option>Ward Store</option><option>Lab Store</option></select></div>
            <div><label className={labelCls}>Transfer Date</label><input type="date" className={inputCls} defaultValue="2025-07-15" /></div>
            <div><label className={labelCls}>Reference Number</label><input className={inputCls} placeholder="TRF-XXXX" /></div>
          </div>
          <div className="border border-[#e8edf2] rounded-[12px] overflow-hidden">
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#f8fafb] border-b border-[#e8edf2]">
                <tr>{['Item', 'Batch', 'Available Qty', 'Transfer Qty', ''].map(h => <th key={h} className="px-3 py-2.5 text-left text-[11px] font-semibold text-[#8b9bae]">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4f5]">
                {rows.map((_, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2"><select className={inputCls + ' text-[12px] py-2'}><option>Paracetamol 500mg</option><option>Surgical Gloves (M)</option></select></td>
                    <td className="px-3 py-2"><select className={inputCls + ' text-[12px] py-2'}><option>BT-2025-001</option></select></td>
                    <td className="px-3 py-2"><span className="text-[12px] font-semibold text-[#1a2632]">245</span></td>
                    <td className="px-3 py-2 w-24"><input type="number" className={inputCls + ' text-[12px] py-2'} placeholder="0" /></td>
                    <td className="px-3 py-2"><button onClick={() => setRows(p => p.filter((_, idx) => idx !== i))} className="p-1.5 hover:bg-red-50 rounded-lg text-[#8b9bae] hover:text-red-500"><Trash2 size={13} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-3 py-2 border-t border-[#f0f4f5]">
              <button onClick={() => setRows(p => [...p, { item: '', batch: '', qty: '' }])} className="flex items-center gap-1.5 text-[12px] font-semibold text-[#3a9898]"><Plus size={13} /> Add Item</button>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#f0f4f5] flex items-center justify-between shrink-0 bg-white rounded-b-[20px]">
          <button onClick={onClose} className="text-[12.5px] font-semibold text-[#8b9bae] hover:text-red-500 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors">Cancel</button>
          <button className="bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all">Confirm Transfer</button>
        </div>
      </div>
    </div>
  )
}

// ── Add Supplier Modal ────────────────────────────────────
export function AddSupplierModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-[560px] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed]">
        <div className="px-6 py-4 flex items-center justify-between border-b border-[#f0f4f5] shrink-0">
          <div><h2 className="text-[15px] font-bold text-[#1a2632]">Add Supplier</h2><p className="text-[12px] text-[#8b9bae]">Register a new inventory supplier.</p></div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae]"><X size={15} /></button>
        </div>
        <div className="px-6 py-4 space-y-3.5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><label className={labelCls}>Supplier Name{req}</label><input className={inputCls} placeholder="e.g. MedPharma Distributors" /></div>
            <div><label className={labelCls}>Contact Person</label><input className={inputCls} placeholder="Full name" /></div>
            <div><label className={labelCls}>Phone{req}</label><input className={inputCls} placeholder="+91 XXXXX XXXXX" /></div>
            <div><label className={labelCls}>Email</label><input type="email" className={inputCls} placeholder="supplier@email.com" /></div>
            <div><label className={labelCls}>GST Number</label><input className={inputCls} placeholder="GST-XXXXXXXXXX" /></div>
            <div className="col-span-2"><label className={labelCls}>Address</label><input className={inputCls} placeholder="Full address" /></div>
            <div><label className={labelCls}>Payment Terms</label><select className={inputCls}><option>Net 30</option><option>Net 15</option><option>Immediate</option><option>Net 60</option></select></div>
            <div><label className={labelCls}>Notes</label><input className={inputCls} placeholder="Optional" /></div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#f0f4f5] flex items-center justify-between shrink-0 bg-white rounded-b-[20px]">
          <button onClick={onClose} className="text-[12.5px] font-semibold text-[#8b9bae] hover:text-red-500 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors">Cancel</button>
          <button className="bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all">Add Supplier</button>
        </div>
      </div>
    </div>
  )
}

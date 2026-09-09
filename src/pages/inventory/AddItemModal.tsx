import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { inputCls, labelCls, req, SectionCard } from './InvComponents'

const itemTypes = ['Medicine', 'Medical Supply', 'Consumable', 'Equipment', 'Laboratory', 'General']

interface Props { onClose: () => void }

export default function AddItemModal({ onClose }: Props) {
  const [tracking, setTracking] = useState({ batch: true, expiry: true, barcode: false })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-[860px] max-h-[92vh] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed]">
        <div className="px-6 py-4 flex items-center justify-between border-b border-[#f0f4f5] shrink-0">
          <div>
            <h2 className="text-[15px] font-bold text-[#1a2632]">Add Inventory Item</h2>
            <p className="text-[12px] text-[#8b9bae]">Create a new item and configure its inventory details.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae]"><X size={15} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <SectionCard title="1. Basic Information">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2"><label className={labelCls}>Item Name{req}</label><input className={inputCls} placeholder="e.g. Paracetamol 500mg" /></div>
              <div><label className={labelCls}>Item Code / SKU{req}</label><input className={inputCls} placeholder="MED-00XXX" /></div>
              <div><label className={labelCls}>Barcode</label><input className={inputCls} placeholder="Scan or enter barcode" /></div>
              <div>
                <label className={labelCls}>Item Type{req}</label>
                <select className={inputCls}>{itemTypes.map(t => <option key={t}>{t}</option>)}</select>
              </div>
              <div>
                <label className={labelCls}>Category{req}</label>
                <select className={inputCls}><option>Medicines</option><option>Consumables</option><option>Medical Supplies</option><option>Equipment</option><option>Laboratory</option></select>
              </div>
              <div><label className={labelCls}>Subcategory</label><input className={inputCls} placeholder="Optional" /></div>
            </div>
          </SectionCard>

          <SectionCard title="2. Unit & Stock">
            <div className="grid grid-cols-3 gap-4">
              <div><label className={labelCls}>Unit of Measure{req}</label><select className={inputCls}><option>Strip</option><option>Box</option><option>Pack</option><option>Bottle</option><option>Unit</option><option>Vial</option></select></div>
              <div><label className={labelCls}>Pack Size</label><input className={inputCls} placeholder="e.g. 10 tablets/strip" /></div>
              <div><label className={labelCls}>Min Stock Level{req}</label><input type="number" className={inputCls} placeholder="0" /></div>
              <div><label className={labelCls}>Reorder Level</label><input type="number" className={inputCls} placeholder="0" /></div>
              <div><label className={labelCls}>Max Stock Level</label><input type="number" className={inputCls} placeholder="0" /></div>
            </div>
          </SectionCard>

          <SectionCard title="3. Storage">
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelCls}>Storage Location{req}</label><select className={inputCls}><option>Pharmacy Store</option><option>Main Store</option><option>Ward Store</option><option>Lab Store</option></select></div>
              <div><label className={labelCls}>Rack / Shelf</label><input className={inputCls} placeholder="e.g. Rack A - Shelf 2" /></div>
              <div><label className={labelCls}>Supplier</label><select className={inputCls}><option>MedPharma Distributors</option><option>HealthCare Supplies Co.</option><option>SurgicalPro India</option></select></div>
              <div><label className={labelCls}>Manufacturer</label><input className={inputCls} placeholder="e.g. Cipla Ltd." /></div>
            </div>
          </SectionCard>

          <SectionCard title="4. Tracking">
            <div className="flex gap-6 mb-4">
              {(['batch', 'expiry', 'barcode'] as const).map(k => (
                <label key={k} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={tracking[k]} onChange={() => setTracking(p => ({ ...p, [k]: !p[k] }))}
                    className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898]" />
                  <span className="text-[12.5px] font-semibold text-[#1a2632] capitalize">{k} Tracking</span>
                </label>
              ))}
            </div>
            {tracking.batch && (
              <div className="grid grid-cols-3 gap-4">
                <div><label className={labelCls}>Batch Number</label><input className={inputCls} placeholder="BT-2025-XXX" /></div>
                <div><label className={labelCls}>Manufacturing Date</label><input type="date" className={inputCls} /></div>
                <div><label className={labelCls}>Expiry Date</label><input type="date" className={inputCls} /></div>
              </div>
            )}
          </SectionCard>

          <SectionCard title="5. Pricing">
            <div className="grid grid-cols-4 gap-4">
              <div><label className={labelCls}>Purchase Price</label><input type="number" className={inputCls} placeholder="₹0.00" /></div>
              <div><label className={labelCls}>Selling / Issue Price</label><input type="number" className={inputCls} placeholder="₹0.00" /></div>
              <div><label className={labelCls}>Tax / GST %</label><input type="number" className={inputCls} placeholder="0" /></div>
              <div><label className={labelCls}>HSN Code</label><input className={inputCls} placeholder="e.g. 30049099" /></div>
            </div>
          </SectionCard>
        </div>

        <div className="px-6 py-4 border-t border-[#f0f4f5] flex items-center justify-between shrink-0 bg-white rounded-b-[20px]">
          <button onClick={onClose} className="text-[12.5px] font-semibold text-[#8b9bae] hover:text-red-500 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors">Cancel</button>
          <div className="flex gap-3">
            <button className="text-[12.5px] font-semibold text-[#5a6a76] border border-[#e2e8ed] hover:border-[#3a9898] hover:text-[#3a9898] px-5 py-2.5 rounded-xl transition-all">Save as Draft</button>
            <button className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[12.5px] font-bold px-5 py-2.5 rounded-xl transition-all">
              <Plus size={14} /> Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

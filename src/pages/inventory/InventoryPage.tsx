import { Filter, Search } from 'lucide-react'

const inventoryData = [
  { id: 'INV-001', name: 'Surgical Masks (N95)', category: 'Consumables', stock: 12500, unit: 'Box', status: 'In Stock' },
  { id: 'INV-002', name: 'Paracetamol 500mg', category: 'Medicine', stock: 120, unit: 'Strips', status: 'Low Stock' },
  { id: 'INV-003', name: 'Digital Thermometers', category: 'Equipment', stock: 0, unit: 'Units', status: 'Out of Stock' },
  { id: 'INV-004', name: 'Disposable Syringes 5ml', category: 'Consumables', stock: 8400, unit: 'Box', status: 'In Stock' },
  { id: 'INV-005', name: 'Amoxicillin 250mg', category: 'Medicine', stock: 45, unit: 'Strips', status: 'Low Stock' },
]

export default function InventoryPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-[#1a2632]">Inventory Management</h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]" size={14} />
              <input type="text" placeholder="Search inventory..." className="pl-9 pr-4 py-2 bg-[#f5f7f8] border border-[#dde5e7] rounded-full text-xs outline-none focus:border-[#3a9898]" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#eaf6f5] text-[#3a9898] text-xs font-semibold rounded-full hover:bg-[#d4efed]">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f7f8] border-b border-[#dde5e7]">
                <th className="py-4 px-6 text-xs font-bold text-[#5a6a76]">Item ID</th>
                <th className="py-4 px-4 text-xs font-bold text-[#5a6a76]">Item Name</th>
                <th className="py-4 px-4 text-xs font-bold text-[#5a6a76]">Category</th>
                <th className="py-4 px-4 text-xs font-bold text-[#5a6a76]">Stock Level</th>
                <th className="py-4 px-6 text-xs font-bold text-[#5a6a76] text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dde5e7]">
              {inventoryData.map((row, i) => (
                <tr key={i} className="hover:bg-[#f5f7f8] transition-colors">
                  <td className="py-4 px-6 text-xs font-bold text-[#8b9bae]">{row.id}</td>
                  <td className="py-4 px-4 text-sm font-bold text-[#1a2632]">{row.name}</td>
                  <td className="py-4 px-4 text-sm text-[#5a6a76]">{row.category}</td>
                  <td className="py-4 px-4 text-sm text-[#5a6a76] font-medium">{row.stock.toLocaleString()} <span className="text-xs font-normal text-[#8b9bae]">{row.unit}</span></td>
                  <td className="py-4 px-6 text-right">
                    {row.status === 'In Stock' && <span className="px-3 py-1 bg-[#eaf6f5] text-[#3a9898] text-xs font-bold rounded-md border border-[#c4e4e0]">In Stock</span>}
                    {row.status === 'Low Stock' && <span className="px-3 py-1 bg-[#fef3c7] text-[#f59e0b] text-xs font-bold rounded-md border border-[#fde68a]">Low Stock</span>}
                    {row.status === 'Out of Stock' && <span className="px-3 py-1 bg-[#fee2e2] text-[#ef4444] text-xs font-bold rounded-md border border-[#fecaca]">Out of Stock</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

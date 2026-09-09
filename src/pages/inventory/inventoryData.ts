export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Critical'
export type ExpiryStatus = 'Normal' | 'Expiring Soon' | 'Critical' | 'Expired'

export const statusBadge: Record<string, string> = {
  'In Stock': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Low Stock': 'bg-amber-50 text-amber-700 border-amber-200',
  'Out of Stock': 'bg-red-50 text-red-600 border-red-200',
  'Critical': 'bg-red-100 text-red-700 border-red-300',
  'Normal': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Expiring Soon': 'bg-amber-50 text-amber-700 border-amber-200',
  'Expired': 'bg-red-50 text-red-600 border-red-200',
  'Draft': 'bg-slate-100 text-slate-600 border-slate-200',
  'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
  'Approved': 'bg-blue-50 text-blue-700 border-blue-200',
  'Received': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Partially Received': 'bg-teal-50 text-teal-700 border-teal-200',
  'Cancelled': 'bg-red-50 text-red-600 border-red-200',
  'Active': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Inactive': 'bg-slate-100 text-slate-500 border-slate-200',
}

export const items = [
  { id: 'MED-00125', name: 'Paracetamol 500mg', category: 'Medicines', unit: 'Strip', stock: 245, reorder: 50, location: 'Pharmacy Store', status: 'In Stock', price: 12, updated: '15 Jul 2025' },
  { id: 'MED-00342', name: 'Surgical Gloves (M)', category: 'Consumables', unit: 'Box', stock: 18, reorder: 25, location: 'Main Store', status: 'Low Stock', price: 320, updated: '14 Jul 2025' },
  { id: 'MED-00451', name: 'IV Cannula 20G', category: 'Medical Supplies', unit: 'Pack', stock: 0, reorder: 20, location: 'Main Store', status: 'Out of Stock', price: 85, updated: '13 Jul 2025' },
  { id: 'MED-00512', name: 'Amoxicillin 250mg', category: 'Medicines', unit: 'Strip', stock: 8, reorder: 30, location: 'Pharmacy Store', status: 'Critical', price: 45, updated: '15 Jul 2025' },
  { id: 'MED-00623', name: 'Disposable Syringe 5ml', category: 'Consumables', unit: 'Box', stock: 420, reorder: 100, location: 'Main Store', status: 'In Stock', price: 180, updated: '12 Jul 2025' },
  { id: 'MED-00714', name: 'Betadine Solution 100ml', category: 'Medicines', unit: 'Bottle', stock: 34, reorder: 40, location: 'Pharmacy Store', status: 'Low Stock', price: 95, updated: '11 Jul 2025' },
  { id: 'MED-00821', name: 'BP Cuff Adult', category: 'Equipment', unit: 'Unit', stock: 12, reorder: 5, location: 'Ward Store', status: 'In Stock', price: 1200, updated: '10 Jul 2025' },
  { id: 'MED-00934', name: 'Surgical Mask N95', category: 'Consumables', unit: 'Box', stock: 156, reorder: 50, location: 'Main Store', status: 'In Stock', price: 650, updated: '09 Jul 2025' },
]

export const expiryItems = [
  { id: 'MED-00125', name: 'Paracetamol 500mg', batch: 'BT-2025-001', expiry: '2025-07-22', qty: 120, location: 'Pharmacy Store', days: 7 },
  { id: 'MED-00512', name: 'Amoxicillin 250mg', batch: 'BT-2025-018', expiry: '2025-08-05', qty: 45, location: 'Pharmacy Store', days: 21 },
  { id: 'MED-00342', name: 'Surgical Gloves (M)', batch: 'BT-2024-092', expiry: '2025-07-18', qty: 8, location: 'Main Store', days: 3 },
  { id: 'MED-00714', name: 'Betadine Solution', batch: 'BT-2025-034', expiry: '2025-06-30', qty: 12, location: 'Pharmacy Store', days: -15 },
  { id: 'MED-00623', name: 'Disposable Syringe 5ml', batch: 'BT-2025-055', expiry: '2025-09-10', qty: 200, location: 'Main Store', days: 57 },
]

export const suppliers = [
  { id: 'SUP-001', name: 'MedPharma Distributors', contact: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh@medpharma.com', items: 48, outstanding: '₹24,500', status: 'Active' },
  { id: 'SUP-002', name: 'HealthCare Supplies Co.', contact: 'Priya Nair', phone: '+91 87654 32109', email: 'priya@hcsupplies.com', items: 32, outstanding: '₹0', status: 'Active' },
  { id: 'SUP-003', name: 'SurgicalPro India', contact: 'Arun Mehta', phone: '+91 76543 21098', email: 'arun@surgicalpro.in', items: 21, outstanding: '₹8,200', status: 'Active' },
  { id: 'SUP-004', name: 'PharmaBridge Ltd.', contact: 'Sunita Rao', phone: '+91 65432 10987', email: 'sunita@pharmabridge.com', items: 15, outstanding: '₹0', status: 'Inactive' },
]

export const purchaseOrders = [
  { po: 'PO-2025-0041', supplier: 'MedPharma Distributors', ordered: '10 Jul 2025', expected: '17 Jul 2025', items: 6, total: '₹18,450', status: 'Pending' },
  { po: 'PO-2025-0038', supplier: 'HealthCare Supplies Co.', ordered: '05 Jul 2025', expected: '12 Jul 2025', items: 4, total: '₹9,200', status: 'Received' },
  { po: 'PO-2025-0035', supplier: 'SurgicalPro India', ordered: '01 Jul 2025', expected: '08 Jul 2025', items: 3, total: '₹6,750', status: 'Partially Received' },
  { po: 'PO-2025-0030', supplier: 'MedPharma Distributors', ordered: '20 Jun 2025', expected: '27 Jun 2025', items: 8, total: '₹32,100', status: 'Received' },
  { po: 'PO-2025-0028', supplier: 'PharmaBridge Ltd.', ordered: '15 Jun 2025', expected: '22 Jun 2025', items: 2, total: '₹4,400', status: 'Cancelled' },
]

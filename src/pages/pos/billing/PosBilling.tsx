import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle,
  Package,
  ArrowRight,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageBg: string;
}

interface CartItem extends Product {
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: "P-101",
    name: "Paracetamol 500mg",
    category: "Tablet",
    price: 45,
    stock: 120,
    imageBg: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "P-102",
    name: "Amoxicillin 250mg",
    category: "Capsule",
    price: 120,
    stock: 45,
    imageBg: "bg-blue-50 text-blue-600",
  },
  {
    id: "P-103",
    name: "Digital Thermometer",
    category: "Equipment",
    price: 350,
    stock: 15,
    imageBg: "bg-purple-50 text-purple-600",
  },
  {
    id: "P-104",
    name: "Cough Syrup 100ml",
    category: "Syrup",
    price: 95,
    stock: 30,
    imageBg: "bg-amber-50 text-amber-600",
  },
  {
    id: "P-105",
    name: "Hand Sanitizer 500ml",
    category: "Hygiene",
    price: 180,
    stock: 60,
    imageBg: "bg-teal-50 text-[#3a9898]",
  },
  {
    id: "P-106",
    name: "Blood Pressure Monitor",
    category: "Equipment",
    price: 1450,
    stock: 8,
    imageBg: "bg-indigo-50 text-indigo-600",
  },
  {
    id: "P-107",
    name: "Vitamin C 1000mg",
    category: "Supplement",
    price: 220,
    stock: 90,
    imageBg: "bg-rose-50 text-rose-600",
  },
  {
    id: "P-108",
    name: "Antiseptic Cream 50g",
    category: "Ointment",
    price: 75,
    stock: 50,
    imageBg: "bg-cyan-50 text-cyan-600",
  },
];

const categories = [
  "All",
  "Tablet",
  "Capsule",
  "Equipment",
  "Syrup",
  "Hygiene",
  "Supplement",
  "Ointment",
];

export default function PosBilling() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMode, setPaymentMode] = useState<"Cash" | "UPI" | "Card">(
    "UPI",
  );
  const [discount, setDiscount] = useState(0);
  const [customerName, setCustomerName] = useState("Walk-in Customer");
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  // Filter products
  const filteredProducts = mockProducts.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Cart Handlers
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === id) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[],
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + tax - discount;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsSuccessModal(true);
  };

  const resetOrder = () => {
    setCart([]);
    setIsSuccessModal(false);
    setDiscount(0);
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col lg:flex-row gap-3 p-3 bg-[#f5f7f8] overflow-hidden">
      {/* LEFT SIDE: Products Catalog */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-[#dde5e7] overflow-hidden min-w-0">
        {/* Top Header & Search */}
        <div className="p-3 border-b border-[#dde5e7] space-y-2 bg-white shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-xs font-bold text-[#1a2632]">
                POS Billing Counter
              </h1>
              <p className="text-[10px] text-[#8b9bae]">
                Click product items to add directly to cart
              </p>
            </div>
            <div className="relative w-full sm:w-56">
              <Search
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8b9bae]"
                size={13}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f5f7f8] border border-[#dde5e7] rounded-lg pl-8 pr-3 py-1 text-xs font-medium focus:outline-none focus:border-[#3a9898] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Categories Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#3a9898] text-white shadow-sm"
                    : "bg-[#f0f4f5] text-[#5a6a76] hover:bg-[#dde5e7]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid Area (Scrollable independently) */}
        <div className="flex-1 p-3 overflow-y-auto bg-[#fefefe]">
          {filteredProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#8b9bae] space-y-2">
              <Package size={32} className="text-[#dde5e7]" />
              <p className="text-xs font-semibold">
                No products found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2.5">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => addToCart(prod)}
                  className="group bg-white p-2.5 rounded-xl border border-[#dde5e7] hover:border-[#3a9898] hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-1.5"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${prod.imageBg}`}
                    >
                      {prod.name.charAt(0)}
                    </span>
                    <span className="text-[9px] font-medium text-[#8b9bae] bg-[#f5f7f8] px-1.5 py-0.5 rounded">
                      Stock: {prod.stock}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-[11px] text-[#1a2632] group-hover:text-[#3a9898] transition-colors line-clamp-1">
                      {prod.name}
                    </h4>
                    <p className="text-[9px] text-[#8b9bae]">{prod.category}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1.5 border-t border-[#f0f4f5]">
                    <span className="text-xs font-black text-[#1a2632]">
                      ₹{prod.price}
                    </span>
                    <div className="w-5 h-5 rounded-md bg-[#eaf6f5] text-[#3a9898] flex items-center justify-center group-hover:bg-[#3a9898] group-hover:text-white transition-colors">
                      <Plus size={12} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: Cart & Checkout Summary (Fixed Height / Sticky Layout) */}
      <div className="w-full lg:w-[360px] bg-white rounded-xl shadow-sm border border-[#dde5e7] flex flex-col overflow-hidden shrink-0">
        {/* Cart Header (Fixed) */}
        <div className="p-3 border-b border-[#dde5e7] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#eaf6f5] text-[#3a9898] flex items-center justify-center">
              <ShoppingCart size={14} />
            </div>
            <div>
              <h3 className="font-bold text-xs text-[#1a2632]">
                Current Order
              </h3>
              <p className="text-[9px] text-[#8b9bae]">
                {cart.reduce((a, c) => a + c.quantity, 0)} items in cart
              </p>
            </div>
          </div>
          <button
            onClick={() => setCart([])}
            disabled={cart.length === 0}
            className="text-[10px] font-semibold text-rose-500 hover:text-rose-700 disabled:opacity-40"
          >
            Clear All
          </button>
        </div>

        {/* Customer Banner */}
        <div className="px-3 py-1.5 bg-[#f5f7f8] border-b border-[#dde5e7] flex items-center justify-between text-[11px] shrink-0">
          <span className="text-[#5a6a76] font-medium">Customer:</span>
          <span className="font-bold text-[#1a2632] bg-white px-2 py-0.5 rounded border border-[#dde5e7]">
            {customerName}
          </span>
        </div>

        {/* Cart Items List (Scrollable independently inside) */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2 divide-y divide-[#f0f4f5] min-h-[140px] max-h-[calc(100vh-22rem)]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#8b9bae] space-y-1.5 py-8">
              <ShoppingCart size={28} className="text-[#dde5e7]" />
              <p className="text-[11px] font-medium">
                Cart is empty. Click items to bill.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="pt-2 first:pt-0 flex items-center justify-between gap-2"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[11px] text-[#1a2632] truncate">
                    {item.name}
                  </h4>
                  <p className="text-[9px] text-[#8b9bae]">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="flex items-center border border-[#dde5e7] rounded-lg bg-[#f5f7f8]">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-5 h-5 flex items-center justify-center text-[#5a6a76] hover:bg-[#dde5e7] rounded-l-lg transition-colors"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="w-6 text-center text-[11px] font-bold text-[#1a2632]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-5 h-5 flex items-center justify-center text-[#5a6a76] hover:bg-[#dde5e7] rounded-r-lg transition-colors"
                    >
                      <Plus size={11} />
                    </button>
                  </div>

                  <span className="text-[11px] font-bold text-[#1a2632] w-10 text-right">
                    ₹{item.price * item.quantity}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#8b9bae] hover:text-rose-500 transition-colors p-0.5"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Payment & Summary Footer (Always fixed at bottom of right panel) */}
        <div className="p-3 border-t border-[#dde5e7] bg-[#fcfdfd] space-y-2.5 shrink-0">
          {/* Payment Mode Selector */}
          <div>
            <label className="text-[9px] font-bold text-[#8b9bae] block mb-1">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { mode: "UPI", icon: QrCode },
                { mode: "Cash", icon: Banknote },
                { mode: "Card", icon: CreditCard },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMode === m.mode;
                return (
                  <button
                    key={m.mode}
                    onClick={() => setPaymentMode(m.mode as any)}
                    className={`flex items-center justify-center gap-1 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                      isSelected
                        ? "bg-[#3a9898] text-white border-[#3a9898] shadow-sm"
                        : "bg-white text-[#5a6a76] border-[#dde5e7] hover:bg-[#f0f4f5]"
                    }`}
                  >
                    <Icon size={13} />
                    {m.mode}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bill Totals breakdown */}
          <div className="space-y-1 text-[11px] pt-1.5 border-t border-[#dde5e7]">
            <div className="flex justify-between text-[#5a6a76]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#1a2632]">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-[#5a6a76]">
              <span>GST (5%)</span>
              <span className="font-semibold text-[#1a2632]">₹{tax}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-[#1a2632] pt-1.5 border-t border-dashed border-[#dde5e7]">
              <span>Grand Total</span>
              <span className="text-[#3a9898]">₹{grandTotal}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold py-2 rounded-lg transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-40 cursor-pointer"
          >
            Complete Payment (₹{grandTotal}) <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccessModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-5 text-center space-y-3.5">
            <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle size={26} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1a2632]">
                Payment Successful!
              </h3>
              <p className="text-[11px] text-[#8b9bae] mt-0.5">
                Invoice #INV-1093 generated successfully via {paymentMode}.
              </p>
            </div>

            <div className="bg-[#f5f7f8] p-2.5 rounded-lg text-left text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#8b9bae]">Customer:</span>
                <span className="font-bold">{customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b9bae]">Total Items:</span>
                <span className="font-bold">
                  {cart.reduce((a, c) => a + c.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b9bae]">Amount Paid:</span>
                <span className="font-bold text-[#3a9898]">₹{grandTotal}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={resetOrder}
                className="flex-1 bg-[#f0f4f5] hover:bg-[#dde5e7] text-[#1a2632] text-xs font-bold py-2 rounded-lg transition-colors"
              >
                New Sale
              </button>
              <button
                onClick={() => {
                  alert("Printing thermal receipt...");
                  resetOrder();
                }}
                className="flex-1 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold py-2 rounded-lg transition-colors shadow-sm"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

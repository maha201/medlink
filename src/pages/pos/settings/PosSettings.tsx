import React, { useState } from "react";
import {
  Settings,
  Printer,
  Barcode,
  DollarSign,
  Sliders,
  ShieldCheck,
  Save,
  Check,
} from "lucide-react";

const POSSetting: React.FC = () => {
  const [autoPrint, setAutoPrint] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [quickCash, setQuickCash] = useState("100, 500, 2000");
  const [defaultDiscount, setDefaultDiscount] = useState("0");
  const [barcodePrefix, setBarcodePrefix] = useState("MED-");
  const [taxInclusive, setTaxInclusive] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Sliders className="text-indigo-600" /> POS Terminal & Billing
          Settings
        </h1>
        <p className="text-sm text-gray-500">
          Fine-tune point of sale shortcuts, thermal receipt behaviors, barcode
          parsing, and quick cash buttons.
        </p>
      </div>

      {saved && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-2 text-sm font-medium shadow-sm">
          <Check size={18} /> POS settings successfully updated!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Terminal Billing Behaviors */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Printer className="text-indigo-600" size={20} /> Terminal & Receipt
            Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  Auto-Print Receipt on Checkout
                </h4>
                <p className="text-xs text-gray-500">
                  Automatically send invoice to the default thermal printer upon
                  payment completion.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoPrint}
                  onChange={(e) => setAutoPrint(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  Scan Beep Sound Effect
                </h4>
                <p className="text-xs text-gray-500">
                  Play a beep confirmation audio tone whenever a barcode is
                  successfully scanned.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  Tax Inclusive Pricing
                </h4>
                <p className="text-xs text-gray-500">
                  Display item prices inclusive of applicable GST on the POS
                  billing screen.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={taxInclusive}
                  onChange={(e) => setTaxInclusive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Quick Cash Buttons & Shortcuts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
            <DollarSign className="text-indigo-600" size={20} /> Quick Cash &
            Denominations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Quick Cash Denomination Buttons
              </label>
              <input
                type="text"
                value={quickCash}
                onChange={(e) => setQuickCash(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. 100, 500, 1000, 2000"
              />
              <p className="text-xs text-gray-400 mt-1">
                Comma-separated amounts displayed on the payment modal.
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Default Item Discount (%)
              </label>
              <input
                type="number"
                value={defaultDiscount}
                onChange={(e) => setDefaultDiscount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors"
          >
            <Save size={16} /> Save POS Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default POSSetting;

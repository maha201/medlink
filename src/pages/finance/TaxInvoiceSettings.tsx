import React, { useState } from "react";
import { Settings, Save } from "lucide-react";

export default function TaxInvoiceSettings() {
  const [settings, setSettings] = useState({
    prefix: "MED-INV-2026-",
    taxRate: 5,
    dueDays: 14,
    footerNote: "Thank you for choosing Medlink HMS. Get well soon!",
  });

  return (
    <div className="space-y-4 animate-in fade-in duration-300 max-w-xl">
      <h3 className="text-xs font-bold text-[#1a2632] flex items-center gap-1.5">
        <Settings size={16} className="text-[#3a9898]" /> Financial & Invoicing
        Defaults
      </h3>
      <div className="space-y-3 text-xs">
        <div className="space-y-1">
          <label className="font-bold text-[#5a6a76]">Invoice Prefix</label>
          <input
            type="text"
            value={settings.prefix}
            onChange={(e) =>
              setSettings({ ...settings, prefix: e.target.value })
            }
            className="w-full px-3 py-1.5 bg-[#f5f7f8] border border-[#dde5e7] rounded-lg font-mono focus:outline-none focus:border-[#3a9898]"
          />
        </div>
        <div className="space-y-1">
          <label className="font-bold text-[#5a6a76]">
            Default GST Rate (%)
          </label>
          <input
            type="number"
            value={settings.taxRate}
            onChange={(e) =>
              setSettings({ ...settings, taxRate: Number(e.target.value) })
            }
            className="w-full px-3 py-1.5 bg-[#f5f7f8] border border-[#dde5e7] rounded-lg focus:outline-none focus:border-[#3a9898]"
          />
        </div>
        <div className="space-y-1">
          <label className="font-bold text-[#5a6a76]">
            Default Invoice Due Period (Days)
          </label>
          <input
            type="number"
            value={settings.dueDays}
            onChange={(e) =>
              setSettings({ ...settings, dueDays: Number(e.target.value) })
            }
            className="w-full px-3 py-1.5 bg-[#f5f7f8] border border-[#dde5e7] rounded-lg focus:outline-none focus:border-[#3a9898]"
          />
        </div>
        <div className="space-y-1">
          <label className="font-bold text-[#5a6a76]">
            Invoice Footer Terms & Note
          </label>
          <textarea
            value={settings.footerNote}
            onChange={(e) =>
              setSettings({ ...settings, footerNote: e.target.value })
            }
            className="w-full px-3 py-1.5 bg-[#f5f7f8] border border-[#dde5e7] rounded-lg h-20 focus:outline-none focus:border-[#3a9898]"
          />
        </div>
        <button
          onClick={() => alert("Settings saved successfully!")}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white font-bold rounded-full shadow-sm text-xs transition-all"
        >
          <Save size={14} /> Save Configurations
        </button>
      </div>
    </div>
  );
}

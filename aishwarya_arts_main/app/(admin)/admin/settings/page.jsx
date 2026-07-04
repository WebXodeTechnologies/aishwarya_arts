"use client";
import React, { useState } from "react";
import { 
  Globe, Truck, ShieldCheck, 
  Bell, CreditCard, Save, 
  Info, Percent, Loader2,
  Mail, MapPin, Receipt, X
} from "lucide-react";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState({
    orderConfirmation: true,
    newOrderAdmin: true,
    shippingUpdates: true,
    lowStockAlerts: true,
    marketingEmails: false,
  });

  // Policies State
  const [policies, setPolicies] = useState({
    "Refund & Return Policy": "We offer a 7-day return policy for transit damages. Since each Tanjore painting is a unique custom masterpiece, returns are only accepted if the artwork is damaged during delivery. Patrons must provide unboxing videos as proof.",
    "Shipping Policy": "All orders are packaged in robust wooden crates to ensure maximum protection. Deliveries across India typically take 5-7 business days. International shipping is calculated during checkout and may take 14-21 business days.",
    "Terms of Service": "By purchasing from Aishwarya Arts, you agree to our terms of handcrafted art. Minor variations in gold leaf detailing, color gradients, and stone shapes are natural characteristics of authentic Tanjore art."
  });

  // Modal State for editing policy
  const [editingPolicyName, setEditingPolicyName] = useState("");
  const [tempPolicyText, setTempPolicyText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings synchronized successfully.");
    }, 1000);
  };

  const handleOpenPolicyEditor = (policyName) => {
    setEditingPolicyName(policyName);
    setTempPolicyText(policies[policyName]);
    setIsModalOpen(true);
  };

  const handleSavePolicy = () => {
    setPolicies(prev => ({
      ...prev,
      [editingPolicyName]: tempPolicyText
    }));
    setIsModalOpen(false);
    toast.success(`${editingPolicyName} updated locally. Apply changes to commit.`);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 lg:p-12 font-outfit text-zinc-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">System Settings</h1>
          <p className="text-zinc-400 text-sm font-medium mt-1 uppercase tracking-widest italic">Core configuration for Aishwarya Arts</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-3.5 bg-zinc-900 text-white rounded-2xl text-xs font-semibold hover:bg-black transition-all shadow-xl active:scale-95 cursor-pointer"
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          Apply Global Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* Sidebar Tabs */}
        <div className="space-y-2">
          <TabNav active={activeTab === "general"} icon={<Globe size={18}/>} label="General" onClick={() => setActiveTab("general")} />
          <TabNav active={activeTab === "tax"} icon={<Receipt size={18}/>} label="Tax & Currency" onClick={() => setActiveTab("tax")} />
          <TabNav active={activeTab === "shipping"} icon={<Truck size={18}/>} label="Shipping & Delivery" onClick={() => setActiveTab("shipping")} />
          <TabNav active={activeTab === "notifications"} icon={<Bell size={18}/>} label="Notifications" onClick={() => setActiveTab("notifications")} />
          <TabNav active={activeTab === "legal"} icon={<ShieldCheck size={18}/>} label="Legal & Policies" onClick={() => setActiveTab("legal")} />
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] border border-zinc-200/60 shadow-sm p-10">
            
            {activeTab === "general" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <SectionHeader title="Store Identity" desc="Basic information about your gallery visible to patrons." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputBox label="Gallery Name" value="Aishwarya Arts" />
                  <InputBox label="Public Email" value="contact@aishwaryaarts.com" />
                  <InputBox label="Phone Number" value="+91 98765 43210" />
                  <InputBox label="Store Currency" value="INR (₹)" disabled />
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-3 block">Gallery Location (for Invoices)</label>
                    <textarea className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-zinc-900 h-24 transition-all" defaultValue="No. 12, Temple Street, Thanjavur, Tamil Nadu - 613001" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tax" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <SectionHeader title="Taxation Logic" desc="Configure how GST is applied to your masterpieces." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputBox label="GST Registration Number" placeholder="22AAAAA0000A1Z5" />
                  <InputBox label="Default GST Rate (%)" value="12" />
                  <div className="md:col-span-2 flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl text-[11px] font-medium text-zinc-500 italic">
                    <Info size={14} /> Tax will be automatically added to the base price during checkout.
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <SectionHeader title="Shipping Logistics" desc="Set the thresholds for delivery charges." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputBox label="Standard Shipping Fee (₹)" value="650" />
                  <InputBox label="Free Shipping Threshold (₹)" value="25000" />
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-3 block">Estimated Fulfillment Time</label>
                    <select className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm outline-none transition-all">
                      <option>3 - 5 Business Days</option>
                      <option>7 - 10 Business Days (Custom Art)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <SectionHeader title="Notification Channels" desc="Configure order alerts and email dispatch rules." />
                <div className="space-y-4">
                  <ToggleSwitch 
                    label="Customer Order Confirmation" 
                    desc="Send automated email receipts immediately after a purchase." 
                    checked={notifications.orderConfirmation}
                    onChange={() => setNotifications(prev => ({ ...prev, orderConfirmation: !prev.orderConfirmation }))}
                  />
                  <ToggleSwitch 
                    label="Admin New Order Alert" 
                    desc="Receive instant email triggers when a new masterpiece is acquired." 
                    checked={notifications.newOrderAdmin}
                    onChange={() => setNotifications(prev => ({ ...prev, newOrderAdmin: !prev.newOrderAdmin }))}
                  />
                  <ToggleSwitch 
                    label="Customer Shipping Updates" 
                    desc="Ping customers automatically when tracking numbers are added to manifests." 
                    checked={notifications.shippingUpdates}
                    onChange={() => setNotifications(prev => ({ ...prev, shippingUpdates: !prev.shippingUpdates }))}
                  />
                  <ToggleSwitch 
                    label="Low Stock Alerts" 
                    desc="Email warnings to inventory team when artwork availability falls below 3 units." 
                    checked={notifications.lowStockAlerts}
                    onChange={() => setNotifications(prev => ({ ...prev, lowStockAlerts: !prev.lowStockAlerts }))}
                  />
                  <ToggleSwitch 
                    label="Marketing Newsletters" 
                    desc="Send seasonal updates and festive offers to subscribers." 
                    checked={notifications.marketingEmails}
                    onChange={() => setNotifications(prev => ({ ...prev, marketingEmails: !prev.marketingEmails }))}
                  />
                </div>
              </div>
            )}

            {activeTab === "legal" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <SectionHeader title="Policies" desc="Manage the legal fine print for your footer." />
                <div className="space-y-6">
                  <PolicyEditor 
                    label="Refund & Return Policy" 
                    content={policies["Refund & Return Policy"]}
                    onEdit={() => handleOpenPolicyEditor("Refund & Return Policy")}
                  />
                  <PolicyEditor 
                    label="Shipping Policy" 
                    content={policies["Shipping Policy"]}
                    onEdit={() => handleOpenPolicyEditor("Shipping Policy")}
                  />
                  <PolicyEditor 
                    label="Terms of Service" 
                    content={policies["Terms of Service"]}
                    onEdit={() => handleOpenPolicyEditor("Terms of Service")}
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* --- Rich Policy Modal Editor --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-zinc-200/60 w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="px-8 py-6 flex items-center justify-between border-b border-zinc-100 bg-zinc-50">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-wide">Edit Policy Document</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">{editingPolicyName}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-2 hover:bg-zinc-200 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} className="text-zinc-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Document Content</label>
                <textarea 
                  className="w-full p-5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 h-64 leading-relaxed transition-all text-zinc-800"
                  value={tempPolicyText}
                  onChange={(e) => setTempPolicyText(e.target.value)}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 border border-zinc-200 text-zinc-700 font-semibold text-xs rounded-xl hover:bg-zinc-100 transition-all uppercase tracking-widest cursor-pointer"
              >
                Discard
              </button>
              <button 
                onClick={handleSavePolicy}
                className="px-6 py-3 bg-zinc-900 text-white font-semibold text-xs rounded-xl hover:bg-black transition-all uppercase tracking-widest cursor-pointer shadow-lg"
              >
                Confirm Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-Components ---

const TabNav = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
      active ? "bg-zinc-900 text-white shadow-lg translate-x-2" : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
    }`}
  >
    {icon} {label}
  </button>
);

const SectionHeader = ({ title, desc }) => (
  <div className="border-b border-zinc-100 pb-6 mb-6">
    <h3 className="text-xl font-semibold text-zinc-900">{title}</h3>
    <p className="text-xs text-zinc-400 mt-1 font-medium italic">{desc}</p>
  </div>
);

const InputBox = ({ label, value, placeholder, disabled }) => (
  <div>
    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-3 block">{label}</label>
    <input 
      disabled={disabled}
      className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-zinc-900 transition-all disabled:opacity-50"
      defaultValue={value}
      placeholder={placeholder}
    />
  </div>
);

const ToggleSwitch = ({ label, desc, checked, onChange }) => (
  <div className="flex items-center justify-between p-5 bg-zinc-50 border border-zinc-100 rounded-2xl">
    <div className="pr-4">
      <p className="text-sm font-semibold text-zinc-800">{label}</p>
      <p className="text-xs text-zinc-400 font-medium mt-0.5 leading-relaxed">{desc}</p>
    </div>
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full p-1 transition-all flex items-center cursor-pointer shrink-0 ${
        checked ? "bg-amber-500 justify-end" : "bg-zinc-200 justify-start"
      }`}
    >
      <span className="w-4 h-4 bg-white rounded-full shadow-sm" />
    </button>
  </div>
);

const PolicyEditor = ({ label, content, onEdit }) => (
  <div>
    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-3 block">{label}</label>
    <div className="p-5 bg-zinc-50 border border-zinc-100 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="max-w-xl">
        <p className="text-xs text-zinc-500 leading-relaxed font-medium line-clamp-1 italic">{content}</p>
      </div>
      <button 
        onClick={onEdit}
        className="text-[10px] font-bold text-zinc-900 hover:text-amber-600 underline underline-offset-4 uppercase tracking-widest shrink-0 cursor-pointer text-left"
      >
        Edit Content
      </button>
    </div>
  </div>
);

export default SettingsPage;
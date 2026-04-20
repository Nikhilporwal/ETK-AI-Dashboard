"use client";

import { useGlobalContext } from "@/context/JobContext";
import { User, CreditCard, Bell, Users, Download, ArrowLeft } from "lucide-react";

export default function AccountSettings({
  activeTab = "billing",
}: {
  activeTab?: string;
}) {
  const { openModal } = useGlobalContext();

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "people", label: "People", icon: Users },
  ];

  const handleTabClick = (tabId: string) => {
    openModal(<AccountSettings activeTab={tabId} />, "Account", true);
  };

  return (
    <div className="flex bg-white min-h-[550px] w-full">
      {/* Sidebar */}
      <div className="w-[240px] border-r border-[#F1F5F9] bg-[#F8FAFC]/50 p-4 space-y-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 relative group 
                ${isActive
                  ? "text-[#203E93] bg-[#EFF6FF] font-semibold"
                  : "text-slate-500 hover:bg-slate-100/80"
                }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#06B6D4] rounded-r-full" />
              )}
              <tab.icon
                className={`w-4.5 h-4.5 ${isActive
                  ? "text-[#06B6D4]"
                  : "text-slate-400 group-hover:text-slate-600"
                  }`}
              />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white overflow-hidden">
        <div className="h-full p-8 overflow-y-auto">
          {activeTab === "billing" && <BillingContent />}
          {activeTab === "profile" && <ProfileContent />}
          {(activeTab === "notifications" || activeTab === "people") && (
            <PlaceholderContent title={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
}

function BillingContent() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both">
      {/* Subscription Card */}
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-[#1E293B]">
              Enterprise Plan
            </h2>
            <div>
              <span className="bg-[#E0F2FE] text-[#0369A1] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-tight">
                Billed yearly
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-extrabold text-[#1E293B]">
                $699
              </span>
              <span className="text-[#64748B] font-semibold ml-1">/year</span>
            </div>
            <p className="text-sm text-[#94A3B8] font-medium text-slate-500">
              Next renewal: 20th Dec 2025
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm">
            {/* Mastercard Mock Logo */}
            <div className="w-12 h-8 bg-[#1E293B] rounded-lg flex items-center justify-center relative overflow-hidden flex-shrink-0">
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90" />
                <div className="w-5 h-5 rounded-full bg-[#F79E1B] opacity-90" />
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-[#1E293B]">
                Card ending in <span className="font-extrabold">0289</span>
              </p>
              <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">
                Expiry 11/27
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button className="flex-1 h-11 bg-[#EFF6FF] text-[#203E93] text-sm font-bold rounded-xl border border-[#203E93]/10 hover:bg-[#DBEAFE] transition-all duration-200">
            Manage plan
          </button>
          <button className="flex-1 h-11 bg-white text-[#203E93] text-sm font-bold rounded-xl border border-[#E2E8F0] hover:border-[#203E93]/20 transition-all duration-200 shadow-sm hover:translate-y-[-1px]">
            Change card
          </button>
        </div>
      </div>

      <div className="h-px bg-[#F1F5F9]" />

      {/* Billing History */}
      <div className="space-y-5">
        <h3 className="text-lg font-bold text-[#1E293B]">Billing history</h3>
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[#94A3B8] border-b border-[#F8FAFC]">
                <th className="pb-3 text-xs font-bold uppercase tracking-wider">
                  Invoice
                </th>
                <th className="pb-3 text-xs font-bold uppercase tracking-wider text-center">
                  Amount
                </th>
                <th className="pb-3 text-xs font-bold uppercase tracking-wider text-center">
                  Date
                </th>
                <th className="pb-3 text-xs font-bold uppercase tracking-wider">
                  Status
                </th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8FAFC]">
              <HistoryRow
                invoice="Invoice #5943"
                amount="$699"
                date="12/06/2025"
                status="Successful"
              />
              <HistoryRow
                invoice="Invoice #5943"
                amount="$699"
                date="12/06/2025"
                status="Pending"
              />
              <HistoryRow
                invoice="Invoice #5943"
                amount="$699"
                date="12/06/2025"
                status="Successful"
              />
              <HistoryRow
                invoice="Invoice #5943"
                amount="$699"
                date="12/06/2025"
                status="Successful"
              />
              <HistoryRow
                invoice="Invoice #5943"
                amount="$699"
                date="12/06/2025"
                status="Failed"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function HistoryRow({
  invoice,
  amount,
  date,
  status,
}: {
  invoice: string;
  amount: string;
  date: string;
  status: "Successful" | "Pending" | "Failed";
}) {
  const statusConfig = {
    Successful: { dot: "bg-emerald-500", text: "text-slate-600" },
    Pending: { dot: "bg-amber-400", text: "text-slate-600" },
    Failed: { dot: "bg-rose-500", text: "text-slate-600" },
  };

  return (
    <tr className="group transition-colors hover:bg-[#F8FAFC]/50">
      <td className="py-4.5 py-4 text-sm font-semibold text-[#1E293B]">
        {invoice}
      </td>
      <td className="py-4 text-sm text-[#475569] text-center font-medium">
        {amount}
      </td>
      <td className="py-4 text-sm text-[#475569] text-center font-medium">
        {date}
      </td>
      <td className="py-4">
        <div className="flex items-center space-x-2.5">
          <div
            className={`w-2 h-2 rounded-full ${statusConfig[status].dot} shadow-[0_0_8px_rgba(0,0,0,0.05)]`}
          />
          <span className={`text-[13px] font-medium ${statusConfig[status].text}`}>
            {status}
          </span>
        </div>
      </td>
      <td className="py-4 text-right">
        <button className="inline-flex items-center space-x-2 text-[#203E93] text-sm font-bold hover:text-[#06B6D4] transition-colors group/btn">
          <div className="p-1.5 rounded-lg bg-[#EFF6FF] group-hover/btn:bg-[#E0F2FE]">
            <Download className="w-4 h-4" />
          </div>
          <span>Download</span>
        </button>
      </td>
    </tr>
  );
}

function ProfileContent() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[#1E293B]">Profile Settings</h2>
        <p className="text-slate-500">Manage your account information</p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Display Name</label>
          <input
            type="text"
            defaultValue="Nikhil Porwal"
            className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#203E93]/20 focus:border-[#203E93] transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Email Address</label>
          <input
            type="email"
            defaultValue="nikhil@example.com"
            disabled
            className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
          />
        </div>
      </div>
      <button className="h-11 px-8 bg-[#203E93] text-white text-sm font-bold rounded-xl hover:bg-[#1e3271] transition-all shadow-md shadow-[#203E93]/20 active:scale-95">
        Save Changes
      </button>
    </div>
  );
}

function PlaceholderContent({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] space-y-4 animate-in zoom-in-95 duration-500">
      <div className="p-6 bg-[#F8FAFC] rounded-full">
        {title === "notifications" ? (
          <Bell className="w-12 h-12 text-[#94A3B8]" />
        ) : (
          <Users className="w-12 h-12 text-[#94A3B8]" />
        )}
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] capitalize">{title}</h3>
        <p className="text-slate-500">This section is coming soon...</p>
      </div>
    </div>
  );
}

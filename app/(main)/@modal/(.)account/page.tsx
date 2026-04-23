"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, User, Bell, Users, Pencil, Trash2 } from "lucide-react";
import clsx from "clsx";

export default function AccountModal() {
    const router = useRouter();
    const params = useSearchParams();

    const tab = params.get("tab") || "profile";

    const setTab = (value: string) => {
        router.push(`?tab=${value}`);
    };

    const closeModal = () => router.back();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* BACKDROP */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={closeModal}
            />

            {/* MODAL */}
            <div className="relative w-[980px] h-[640px] bg-white rounded-2xl shadow-2xl flex overflow-hidden border">

                {/* ================= SIDEBAR ================= */}
                <div className="w-[260px] bg-gray-50 border-r flex flex-col">

                    {/* HEADER */}
                    <div className="p-5 border-b flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-gray-800">
                            Account
                        </h2>
                    </div>

                    {/* NAV */}
                    <div className="p-3 space-y-1">

                        <NavItem
                            icon={<User size={16} />}
                            label="Profile"
                            active={tab === "profile"}
                            onClick={() => setTab("profile")}
                        />

                        <NavItem
                            icon={<CreditCard size={16} />}
                            label="Billing"
                            active={tab === "billing"}
                            onClick={() => setTab("billing")}
                        />

                        <NavItem
                            icon={<Bell size={16} />}
                            label="Notifications"
                            active={tab === "notifications"}
                            onClick={() => setTab("notifications")}
                        />

                        <NavItem
                            icon={<Users size={16} />}
                            label="People"
                            active={tab === "people"}
                            onClick={() => setTab("people")}
                        />

                    </div>
                </div>

                {/* ================= CONTENT ================= */}
                <div className="flex-1 p-6 overflow-y-auto">

                    {tab === "billing" && <BillingTab />}
                    {tab === "profile" && <ProfileTab />}
                    {tab === "notifications" && <NotificationsTab />}

                </div>

            </div>
        </div>
    );
}

/* ================= NAV ITEM ================= */
function NavItem({ icon, label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition",
                active
                    ? "bg-blue-600 shadow"
                    : "text-gray-600 hover:bg-gray-200"
            )}
        >
            {icon}
            {label}
        </button>
    );
}

function BillingTab() {
    return (
        <div className="space-y-6">

            {/* PLAN */}
            <div className="p-5 border rounded-xl bg-white">
                <h3 className="text-lg font-semibold">Enterprise Plan</h3>
                <p className="text-sm text-gray-500">Billed yearly</p>

                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold">$699 / year</p>
                        <p className="text-xs text-gray-500">
                            Next renewal: 20th Dec 2025
                        </p>
                    </div>

                    <div className="text-sm text-right">
                        Card ending in <b>0289</b>
                    </div>
                </div>

                <div className="mt-4 flex gap-3">
                    <button className="px-4 py-2 rounded-lg border hover:bg-gray-50">
                        Manage plan
                    </button>
                    <button className="px-4 py-2 rounded-lg border hover:bg-gray-50">
                        Change card
                    </button>
                </div>
            </div>

            {/* TABLE */}
            <div className="border rounded-xl overflow-hidden">
                <div className="p-4 font-semibold border-b">
                    Billing history
                </div>

                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600 ">
                        <tr>
                            <th className="p-3 text-left">Invoice</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th className="text-center pr-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[1, 2, 3, 4].map((i) => (
                            <tr key={i} className="border-t hover:bg-gray-50">
                                <td className="p-3">#5943</td>
                                <td>$699</td>
                                <td>12/06/2025</td>
                                <td className="text-green-600 font-medium p-3">
                                    Successful
                                </td>
                                <td className="text-right p-3">
                                    <button className="text-blue-600 hover:underline">
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

function ProfileTab() {
    return (
        <div className="space-y-3">

            {/* ================= AVATAR ================= */}
            <div className="border rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-4 text-gray-700">
                    Avatar
                </h3>

                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500" />

                    <div>
                        <button className="text-blue-600 text-sm font-medium hover:underline">
                            Upload new image
                        </button>
                        <p className="text-xs text-gray-500 mt-1">
                            At least 800x800 px recommended. JPG or PNG allowed.
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= PERSONAL INFO ================= */}
            <Section
                title="Personal information"
                data={[
                    { label: "First name", value: "Ademola" },
                    { label: "Last name", value: "Paylor" },
                    { label: "Email address", value: "ademola.paylor@etk.global" },
                    { label: "Role", value: "Venture capitalist" },
                ]}
            />

            {/* ================= CONTACT INFO ================= */}
            <Section
                title="Contact information"
                data={[
                    { label: "First name", value: "Ademola" },
                    { label: "Last name", value: "Paylor" },
                    { label: "Email address", value: "ademola.paylor@etk.global" },
                    { label: "Role", value: "Venture capitalist" },
                ]}
            />

            {/* ================= DELETE ================= */}
            <div className="border-t pt-4">
                <button className="text-red-500 text-sm font-medium hover:text-red-700 flex items-center gap-2 transition-colors">
                    <Trash2 size={14} />
                    Delete account
                </button>
            </div>

        </div>
    );
}

function Section({
    title,
    data,
}: {
    title: string;
    data: { label: string; value: string }[];
}) {
    return (
        <div className="border rounded-xl p-5 space-y-4">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">
                    {title}
                </h3>

                <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                    <Pencil size={13} />
                    Edit
                </button>
            </div>

            {/* Data */}
            <div className="grid grid-cols-2 text-sm">
                {data.map((item, i) => (
                    <div key={i} className="flex justify-between">
                        <span className="text-gray-500">{item.label}</span>
                        <span className="text-gray-800 font-medium text-right">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>

        </div>
    );
}

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
    return (
        <button
            onClick={onToggle}
            className={clsx(
                "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",
                enabled ? "bg-blue-600" : "bg-gray-200"
            )}
        >
            <span
                className={clsx(
                    "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200",
                    enabled ? "translate-x-4" : "translate-x-0"
                )}
            />
        </button>
    );
}

function NotificationsTab() {
    const [states, setStates] = React.useState({
        emailUpdates: true,
        productNews: false,
        securityAlerts: true,
        weeklyDigest: true,
        teamActivity: false,
        mentions: true,
    });

    const toggle = (key: keyof typeof states) =>
        setStates((prev) => ({ ...prev, [key]: !prev[key] }));

    const groups = [
        {
            title: "Email notifications",
            items: [
                { key: "emailUpdates", label: "Account updates", desc: "Receive emails about your account activity and settings changes." },
                { key: "productNews", label: "Product news & features", desc: "Hear about new features, tips, and product announcements." },
                { key: "securityAlerts", label: "Security alerts", desc: "Get notified immediately about suspicious activity or sign-ins." },
            ],
        },
        {
            title: "In-app notifications",
            items: [
                { key: "weeklyDigest", label: "Weekly digest", desc: "A summary of your activity and insights every Monday morning." },
                { key: "teamActivity", label: "Team activity", desc: "Notifications when teammates take actions on shared resources." },
                { key: "mentions", label: "Mentions & comments", desc: "Get notified when someone mentions you or replies to a comment." },
            ],
        },
    ] as const;

    return (
        <div className="space-y-3">
            {groups.map((group) => (
                <div key={group.title} className="border rounded-xl overflow-hidden p-3">
                    <div className="px-5 py-1 bg-gray-50 border-b">
                        <h3 className="text-sm font-semibold text-gray-700">{group.title}</h3>
                    </div>
                    <div className="divide-y">
                        {group.items.map((item) => (
                            <div key={item.key} className="flex items-center justify-between px-5 py-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{item.label}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                                </div>
                                <Toggle
                                    enabled={states[item.key]}
                                    onToggle={() => toggle(item.key)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
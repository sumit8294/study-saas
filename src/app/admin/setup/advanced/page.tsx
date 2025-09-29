"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import SetupSettingsSidebar from "@/components/admin/SetupSettingsSidebar";

export default function PaymentSettingsPage() {
    const [formData, setFormData] = useState({
        manualEnabled: false,
        manualNote: "",
        stripeEnabled: false,
        stripeSecret: "",
        paypalEnabled: false,
        paypalMode: "sandbox",
        paypalClientId: "",
        paypalClientSecret: "",
        paystackEnabled: false,
        merchantEmail: "",
        paystackPublicKey: "",
        paystackSecretKey: "",
        razorpayEnabled: false,
        razorpayKeyId: "",
        razorpaySecretKey: "",
        liveCurrencyEnabled: false,
        exchangeApiKey: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SetupSettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 ml-0 lg:ml-6 mt-6 lg:mt-0 mb-6 bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">
                        Payment Methods
                    </h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition-all">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section Component */}
                    {[
                        {
                            title: "Manual",
                            fields: (
                                <>
                                    <div className="flex items-center gap-3 mb-3">
                                        <input
                                            type="checkbox"
                                            name="manualEnabled"
                                            checked={formData.manualEnabled}
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-indigo-600"
                                        />
                                        <label className="text-sm text-gray-300">
                                            Enable
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-2">
                                            Manual Payment Note{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <textarea
                                            name="manualNote"
                                            value={formData.manualNote}
                                            onChange={handleChange}
                                            placeholder="Please send your payment to this bank number."
                                            className="w-full px-3 py-2 bg-[#111827] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                                            rows={3}
                                        />
                                    </div>
                                </>
                            ),
                        },
                        {
                            title: "Stripe",
                            fields: (
                                <>
                                    <div className="flex items-center gap-3 mb-3">
                                        <input
                                            type="checkbox"
                                            name="stripeEnabled"
                                            checked={formData.stripeEnabled}
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-indigo-600"
                                        />
                                        <label className="text-sm text-gray-300">
                                            Enable
                                        </label>
                                    </div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Stripe Secret Key{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="stripeSecret"
                                        value={formData.stripeSecret}
                                        onChange={handleChange}
                                        placeholder="Stripe Secret Key"
                                        className="w-full px-3 py-2 bg-[#111827] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </>
                            ),
                        },
                        {
                            title: "PayPal",
                            fields: (
                                <>
                                    <div className="flex items-center gap-3 mb-3">
                                        <input
                                            type="checkbox"
                                            name="paypalEnabled"
                                            checked={formData.paypalEnabled}
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-indigo-600"
                                        />
                                        <label className="text-sm text-gray-300">
                                            Enable
                                        </label>
                                    </div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        PayPal Mode{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="paypalMode"
                                        value={formData.paypalMode}
                                        onChange={handleChange}
                                        className="w-full mb-4 px-3 py-2 bg-[#111827] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    >
                                        <option value="sandbox">Sandbox</option>
                                        <option value="live">Live</option>
                                    </select>

                                    <label className="block text-sm text-gray-300 mb-2">
                                        PayPal Client ID{" "}
                                        <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="paypalClientId"
                                        value={formData.paypalClientId}
                                        onChange={handleChange}
                                        placeholder="PayPal Client ID"
                                        className="w-full mb-3 px-3 py-2 bg-[#111827] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />

                                    <label className="block text-sm text-gray-300 mb-2">
                                        PayPal Client Secret{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="paypalClientSecret"
                                        value={formData.paypalClientSecret}
                                        onChange={handleChange}
                                        placeholder="PayPal Client Secret"
                                        className="w-full px-3 py-2 bg-[#111827] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </>
                            ),
                        },
                        {
                            title: "Paystack",
                            fields: (
                                <>
                                    <div className="flex items-center gap-3 mb-3">
                                        <input
                                            type="checkbox"
                                            name="paystackEnabled"
                                            checked={formData.paystackEnabled}
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-indigo-600"
                                        />
                                        <label className="text-sm text-gray-300">
                                            Enable
                                        </label>
                                    </div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Merchant Email{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="merchantEmail"
                                        value={formData.merchantEmail}
                                        onChange={handleChange}
                                        placeholder="Merchant Email"
                                        className="w-full mb-3 px-3 py-2 bg-[#111827] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />

                                    <label className="block text-sm text-gray-300 mb-2">
                                        Paystack Public Key{" "}
                                        <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="paystackPublicKey"
                                        value={formData.paystackPublicKey}
                                        onChange={handleChange}
                                        placeholder="Paystack Public Key"
                                        className="w-full mb-3 px-3 py-2 bg-[#111827] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />

                                    <label className="block text-sm text-gray-300 mb-2">
                                        Paystack Secret Key{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="paystackSecretKey"
                                        value={formData.paystackSecretKey}
                                        onChange={handleChange}
                                        placeholder="Paystack Secret Key"
                                        className="w-full px-3 py-2 bg-[#111827] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </>
                            ),
                        },
                        {
                            title: "Razorpay",
                            fields: (
                                <>
                                    <div className="flex items-center gap-3 mb-3">
                                        <input
                                            type="checkbox"
                                            name="razorpayEnabled"
                                            checked={formData.razorpayEnabled}
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-indigo-600"
                                        />
                                        <label className="text-sm text-gray-300">
                                            Enable
                                        </label>
                                    </div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Razorpay Key ID{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="razorpayKeyId"
                                        value={formData.razorpayKeyId}
                                        onChange={handleChange}
                                        placeholder="Razorpay Key ID"
                                        className="w-full mb-3 px-3 py-2 bg-[#111827] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Razorpay Secret Key{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="razorpaySecretKey"
                                        value={formData.razorpaySecretKey}
                                        onChange={handleChange}
                                        placeholder="Razorpay Secret Key"
                                        className="w-full px-3 py-2 bg-[#111827] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </>
                            ),
                        },
                        {
                            title: "Live Currency Exchange",
                            fields: (
                                <>
                                    <div className="flex items-center gap-3 mb-3">
                                        <input
                                            type="checkbox"
                                            name="liveCurrencyEnabled"
                                            checked={
                                                formData.liveCurrencyEnabled
                                            }
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-indigo-600"
                                        />
                                        <label className="text-sm text-gray-300">
                                            Enable
                                        </label>
                                    </div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Exchange API Key{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="exchangeApiKey"
                                        value={formData.exchangeApiKey}
                                        onChange={handleChange}
                                        placeholder="Exchange API Key"
                                        className="w-full px-3 py-2 bg-[#111827] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">
                                        Get your API Key on{" "}
                                        <a
                                            href="https://exchangerate.host"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-400 underline hover:text-indigo-300"
                                        >
                                            Exchangerate
                                        </a>
                                    </p>
                                </>
                            ),
                        },
                    ].map((section, index) => (
                        <div
                            key={index}
                            className="bg-[#111827] border border-gray-700 rounded-lg p-4 shadow-md"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4">
                                {section.title}
                            </h3>
                            {section.fields}
                        </div>
                    ))}

                    {/* Save Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

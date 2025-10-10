"use client";

import { useState, useEffect } from "react";
import {
    ArrowLeft,
    Save,
    X,
    CreditCard,
    DollarSign,
    Building,
    Zap,
    Globe,
    Wallet,
} from "lucide-react";
import SetupSettingsSidebar from "@/components/admin/SetupSettingsSidebar";
import { useRouter } from "next/navigation";

interface PaymentConfiguration {
    id?: string;
    manualPayment?: {
        isActive: boolean;
        note: string;
    };
    stripe?: {
        isActive: boolean;
        secret: string;
    };
    paypal?: {
        isActive: boolean;
        mode: string;
        clientId: string;
        clientSecret: string;
    };
    paystack?: {
        isActive: boolean;
        merchantEmail: string;
        publicKey: string;
        secretKey: string;
    };
    razorpay?: {
        isActive: boolean;
        keyId: string;
        keySecret: string;
    };
    currencyExchange?: {
        isActive: boolean;
        apiKey: string;
    };
}

export default function PaymentSettingsPage() {
    const [formData, setFormData] = useState({
        // Manual Payment
        manualEnabled: false,
        manualNote: "",

        // Stripe
        stripeEnabled: false,
        stripeSecret: "",

        // PayPal
        paypalEnabled: false,
        paypalMode: "sandbox",
        paypalClientId: "",
        paypalClientSecret: "",

        // Paystack
        paystackEnabled: false,
        merchantEmail: "",
        paystackPublicKey: "",
        paystackSecretKey: "",

        // Razorpay
        razorpayEnabled: false,
        razorpayKeyId: "",
        razorpaySecretKey: "",

        // Currency Exchange
        liveCurrencyEnabled: false,
        exchangeApiKey: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [configId, setConfigId] = useState<string>("");

    // Toast states
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");

    const router = useRouter();

    // Fetch payment configuration
    useEffect(() => {
        fetchPaymentConfiguration();
    }, []);

    // Auto-hide toasts after 5 seconds
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess("");
                setError("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    const showToast = (message: string, type: "success" | "error") => {
        if (type === "success") {
            setSuccess(message);
            setError("");
        } else {
            setError(message);
            setSuccess("");
        }
    };

    const fetchPaymentConfiguration = async () => {
        try {
            const response = await fetch("/api/setup/payment-configuration");
            const data: PaymentConfiguration = await response.json();
            console.log(data);
            if (response.ok) {
                setConfigId(data.id || "");

                // Set form data from the JSON structure
                setFormData({
                    // Manual Payment
                    manualEnabled: data.manualPayment?.isActive || false,
                    manualNote: data.manualPayment?.note || "",

                    // Stripe
                    stripeEnabled: data.stripe?.isActive || false,
                    stripeSecret: data.stripe?.secret || "",

                    // PayPal
                    paypalEnabled: data.paypal?.isActive || false,
                    paypalMode: data.paypal?.mode || "sandbox",
                    paypalClientId: data.paypal?.clientId || "",
                    paypalClientSecret: data.paypal?.clientSecret || "",

                    // Paystack
                    paystackEnabled: data.paystack?.isActive || false,
                    merchantEmail: data.paystack?.merchantEmail || "",
                    paystackPublicKey: data.paystack?.publicKey || "",
                    paystackSecretKey: data.paystack?.secretKey || "",

                    // Razorpay
                    razorpayEnabled: data.razorpay?.isActive || false,
                    razorpayKeyId: data.razorpay?.keyId || "",
                    razorpaySecretKey: data.razorpay?.keySecret || "",

                    // Currency Exchange
                    liveCurrencyEnabled:
                        data.currencyExchange?.isActive || false,
                    exchangeApiKey: data.currencyExchange?.apiKey || "",
                });
            } else {
                showToast("Failed to load payment configuration", "error");
            }
        } catch (error) {
            console.error("Error fetching payment configuration:", error);
            showToast("Failed to load payment configuration", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : value,
        });
    };

    // Separate handler for toggle switches
    const handleToggle = (name: string, checked: boolean) => {
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const submitData = {
                id: configId,
                ...formData,
            };

            const response = await fetch("/api/setup/payment-configuration", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitData),
            });

            if (response.ok) {
                const updatedConfig = await response.json();
                setConfigId(updatedConfig.id);
                showToast(
                    "Payment configuration saved successfully!",
                    "success"
                );
            } else {
                const errorData = await response.json();
                showToast(
                    errorData.error || "Failed to save payment configuration",
                    "error"
                );
            }
        } catch (error) {
            console.error("Error saving payment configuration:", error);
            showToast("Failed to save payment configuration", "error");
        } finally {
            setSaving(false);
        }
    };

    const paymentSections = [
        {
            title: "Manual Payment",
            icon: <Wallet className="w-5 h-5" />,
            description: "Bank transfers, cash payments, etc.",
            fields: (
                <>
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-800/50 rounded-lg">
                        <div>
                            <label className="text-sm font-medium text-gray-200">
                                Enable Manual Payment
                            </label>
                            <p className="text-xs text-gray-400 mt-1">
                                Allow customers to pay via bank transfer or
                                other manual methods
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                handleToggle(
                                    "manualEnabled",
                                    !formData.manualEnabled
                                )
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                formData.manualEnabled
                                    ? "bg-green-600"
                                    : "bg-gray-700"
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    formData.manualEnabled
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                }`}
                            />
                        </button>
                    </div>

                    {formData.manualEnabled && (
                        <div className="space-y-3 mt-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                            <label className="block text-sm font-medium text-gray-200">
                                Payment Instructions{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="manualNote"
                                value={formData.manualNote}
                                onChange={handleChange}
                                placeholder="Please provide bank account details or payment instructions..."
                                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                                rows={4}
                            />
                            <p className="text-xs text-gray-400">
                                These instructions will be shown to customers
                                when they select manual payment.
                            </p>
                        </div>
                    )}
                </>
            ),
        },
        {
            title: "Stripe",
            icon: <CreditCard className="w-5 h-5" />,
            description: "Credit card payments via Stripe",
            fields: (
                <>
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-800/50 rounded-lg">
                        <div>
                            <label className="text-sm font-medium text-gray-200">
                                Enable Stripe
                            </label>
                            <p className="text-xs text-gray-400 mt-1">
                                Accept credit card payments worldwide
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                handleToggle(
                                    "stripeEnabled",
                                    !formData.stripeEnabled
                                )
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                formData.stripeEnabled
                                    ? "bg-green-600"
                                    : "bg-gray-700"
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    formData.stripeEnabled
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                }`}
                            />
                        </button>
                    </div>

                    {formData.stripeEnabled && (
                        <div className="space-y-3 mt-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                            <label className="block text-sm font-medium text-gray-200">
                                Secret Key{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="stripeSecret"
                                value={formData.stripeSecret}
                                onChange={handleChange}
                                placeholder="sk_live_..."
                                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                            <p className="text-xs text-gray-400">
                                Find your keys in the{" "}
                                <a
                                    href="https://dashboard.stripe.com/apikeys"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-400 hover:text-indigo-300 underline"
                                >
                                    Stripe Dashboard
                                </a>
                            </p>
                        </div>
                    )}
                </>
            ),
        },
        {
            title: "PayPal",
            icon: <DollarSign className="w-5 h-5" />,
            description: "PayPal and credit card payments",
            fields: (
                <>
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-800/50 rounded-lg">
                        <div>
                            <label className="text-sm font-medium text-gray-200">
                                Enable PayPal
                            </label>
                            <p className="text-xs text-gray-400 mt-1">
                                Accept PayPal and credit card payments
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                handleToggle(
                                    "paypalEnabled",
                                    !formData.paypalEnabled
                                )
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                formData.paypalEnabled
                                    ? "bg-green-600"
                                    : "bg-gray-700"
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    formData.paypalEnabled
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                }`}
                            />
                        </button>
                    </div>

                    {formData.paypalEnabled && (
                        <div className="space-y-4 mt-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Environment{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="paypalMode"
                                    value={formData.paypalMode}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                >
                                    <option value="sandbox">
                                        Sandbox (Testing)
                                    </option>
                                    <option value="live">
                                        Live (Production)
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Client ID{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="paypalClientId"
                                    value={formData.paypalClientId}
                                    onChange={handleChange}
                                    placeholder="PayPal Client ID"
                                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Client Secret{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="paypalClientSecret"
                                    value={formData.paypalClientSecret}
                                    onChange={handleChange}
                                    placeholder="PayPal Client Secret"
                                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                />
                            </div>
                        </div>
                    )}
                </>
            ),
        },
        {
            title: "Paystack",
            icon: <Building className="w-5 h-5" />,
            description: "Payments for Africa",
            fields: (
                <>
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-800/50 rounded-lg">
                        <div>
                            <label className="text-sm font-medium text-gray-200">
                                Enable Paystack
                            </label>
                            <p className="text-xs text-gray-400 mt-1">
                                Accept payments across Africa
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                handleToggle(
                                    "paystackEnabled",
                                    !formData.paystackEnabled
                                )
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                formData.paystackEnabled
                                    ? "bg-green-600"
                                    : "bg-gray-700"
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    formData.paystackEnabled
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                }`}
                            />
                        </button>
                    </div>

                    {formData.paystackEnabled && (
                        <div className="space-y-4 mt-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Merchant Email{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="merchantEmail"
                                    value={formData.merchantEmail}
                                    onChange={handleChange}
                                    placeholder="merchant@example.com"
                                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Public Key{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="paystackPublicKey"
                                    value={formData.paystackPublicKey}
                                    onChange={handleChange}
                                    placeholder="Paystack Public Key"
                                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Secret Key{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="paystackSecretKey"
                                    value={formData.paystackSecretKey}
                                    onChange={handleChange}
                                    placeholder="Paystack Secret Key"
                                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                />
                            </div>
                        </div>
                    )}
                </>
            ),
        },
        {
            title: "Razorpay",
            icon: <Zap className="w-5 h-5" />,
            description: "Payments for India",
            fields: (
                <>
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-800/50 rounded-lg">
                        <div>
                            <label className="text-sm font-medium text-gray-200">
                                Enable Razorpay
                            </label>
                            <p className="text-xs text-gray-400 mt-1">
                                Accept payments in India
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                handleToggle(
                                    "razorpayEnabled",
                                    !formData.razorpayEnabled
                                )
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                formData.razorpayEnabled
                                    ? "bg-green-600"
                                    : "bg-gray-700"
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    formData.razorpayEnabled
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                }`}
                            />
                        </button>
                    </div>

                    {formData.razorpayEnabled && (
                        <div className="space-y-4 mt-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Key ID{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="razorpayKeyId"
                                    value={formData.razorpayKeyId}
                                    onChange={handleChange}
                                    placeholder="Razorpay Key ID"
                                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Secret Key{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="razorpaySecretKey"
                                    value={formData.razorpaySecretKey}
                                    onChange={handleChange}
                                    placeholder="Razorpay Secret Key"
                                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                />
                            </div>
                        </div>
                    )}
                </>
            ),
        },
        {
            title: "Live Currency Exchange",
            icon: <Globe className="w-5 h-5" />,
            description: "Real-time exchange rates",
            fields: (
                <>
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-800/50 rounded-lg">
                        <div>
                            <label className="text-sm font-medium text-gray-200">
                                Enable Live Rates
                            </label>
                            <p className="text-xs text-gray-400 mt-1">
                                Get real-time currency exchange rates
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                handleToggle(
                                    "liveCurrencyEnabled",
                                    !formData.liveCurrencyEnabled
                                )
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                formData.liveCurrencyEnabled
                                    ? "bg-green-600"
                                    : "bg-gray-700"
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    formData.liveCurrencyEnabled
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                }`}
                            />
                        </button>
                    </div>

                    {formData.liveCurrencyEnabled && (
                        <div className="space-y-3 mt-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                            <label className="block text-sm font-medium text-gray-200">
                                API Key <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="exchangeApiKey"
                                value={formData.exchangeApiKey}
                                onChange={handleChange}
                                placeholder="Exchange API Key"
                                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                            <p className="text-xs text-gray-400">
                                Get your API Key from{" "}
                                <a
                                    href="https://exchangerate.host"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-400 hover:text-indigo-300 underline"
                                >
                                    Exchangerate.host
                                </a>
                            </p>
                        </div>
                    )}
                </>
            ),
        },
    ];

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[#0f172a]">
                <SetupSettingsSidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-white">
                        Loading payment configuration...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SetupSettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 ml-0 lg:ml-6 mt-6 lg:mt-0 mb-6 bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                {/* Toast Notifications */}
                {success && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg flex justify-between items-center">
                        <p className="text-green-400 text-sm">{success}</p>
                        <button
                            onClick={() => setSuccess("")}
                            className="text-green-400 hover:text-green-300"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg flex justify-between items-center">
                        <p className="text-red-400 text-sm">{error}</p>
                        <button
                            onClick={() => setError("")}
                            className="text-red-400 hover:text-red-300"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Payment Methods
                        </h2>
                        <p className="text-gray-400 mt-1">
                            Configure your payment gateway settings
                        </p>
                    </div>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {paymentSections.map((section, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-600/20 rounded-lg text-indigo-400">
                                    {section.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        {section.title}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        {section.description}
                                    </p>
                                </div>
                            </div>
                            {section.fields}
                        </div>
                    ))}

                    {/* Save Button */}
                    <div className="pt-6 border-t border-gray-700">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all disabled:opacity-50 font-medium"
                        >
                            <Save className="w-5 h-5" />
                            {saving ? "Saving Changes..." : "Save All Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

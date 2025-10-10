"use client";

import { useState } from "react";
import { Send, RotateCcw, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

interface FormData {
    subject: string;
    sentTo: "ALL_SUBSCRIBERS" | "TENANTS" | "ACTIVE_SUBSCRIBERS";
    greeting: string;
    body: string;
    scheduledAt: string;
}

export default function SendMailForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        subject: "",
        sentTo: "ALL_SUBSCRIBERS",
        greeting: "",
        body: "",
        scheduledAt: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReset = () => {
        setFormData({
            subject: "",
            sentTo: "ALL_SUBSCRIBERS",
            greeting: "",
            body: "",
            scheduledAt: "",
        });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // const response = await fetch("/api/newsletter-campaigns", { // NOTE :- If needed this API can be use for tracking and analytics for your newsletter campaigns, tech_campaign_recipients table will store status of each users in seperate row
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(formData),
            // });

            // if (!response.ok) {
            //     const errorData = await response.json();
            //     throw new Error(errorData.error || "Failed to create campaign");
            // }

            // const campaign = await response.json();

            // Show success message and redirect
            // alert(`Campaign "${campaign.subject}" created successfully!`);
            alert(`Created successfully!`);

            // router.push("/admin/newsletters");
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error creating campaign:", err);
        } finally {
            setLoading(false);
        }
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        // Add 1 hour as minimum schedule time
        now.setHours(now.getHours() + 1);
        return now.toISOString().slice(0, 16);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-white">
                    Create Newsletter Campaign
                </h1>
                <p className="text-gray-400 text-sm">
                    Compose and schedule email campaigns to subscribers or
                    tenants.
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-[#111827] p-6 rounded-lg border border-gray-700 space-y-5 shadow-lg"
            >
                {/* Subject */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Enter campaign subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        disabled={loading}
                    />
                </div>

                {/* Sent To */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Audience <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="sentTo"
                        value={formData.sentTo}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        disabled={loading}
                    >
                        <option value="ALL_SUBSCRIBERS">All Subscribers</option>
                        <option value="ACTIVE_SUBSCRIBERS">
                            Active Subscribers Only
                        </option>
                        <option value="TENANTS">All Tenants</option>
                    </select>
                    <p className="text-gray-400 text-xs mt-1">
                        {formData.sentTo === "ALL_SUBSCRIBERS" &&
                            "All subscribers including inactive ones"}
                        {formData.sentTo === "ACTIVE_SUBSCRIBERS" &&
                            "Only active subscribers"}
                        {formData.sentTo === "TENANTS" && "All tenant accounts"}
                    </p>
                </div>

                {/* Schedule Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Schedule Campaign (Optional)
                    </label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="datetime-local"
                            name="scheduledAt"
                            value={formData.scheduledAt}
                            onChange={handleChange}
                            min={getCurrentDateTime()}
                            className="w-full pl-10 pr-4 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={loading}
                        />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">
                        Leave empty to save as draft and send immediately
                    </p>
                </div>

                {/* Greeting */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Greeting <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="greeting"
                        placeholder="e.g., Hello Subscribers, Dear Customers"
                        value={formData.greeting}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        disabled={loading}
                    />
                </div>

                {/* Body */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="body"
                        placeholder="Write your email content here... You can use basic HTML tags for formatting."
                        rows={10}
                        value={formData.body}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#1F2937] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-vertical"
                        required
                        disabled={loading}
                    ></textarea>
                    <p className="text-gray-400 text-xs mt-1">
                        Supports basic HTML formatting. Keep it engaging and
                        concise.
                    </p>
                </div>

                {/* Campaign Preview */}
                {formData.subject && formData.body && (
                    <div className="p-4 bg-[#1F2937] rounded-lg border border-gray-600">
                        <h3 className="text-sm font-medium text-gray-300 mb-2">
                            Preview
                        </h3>
                        <div className="bg-white p-4 rounded text-gray-800 text-sm">
                            <div className="border-b border-gray-200 pb-2 mb-3">
                                <strong>Subject:</strong> {formData.subject}
                            </div>
                            <div className="mb-2">
                                <strong>{formData.greeting},</strong>
                            </div>
                            <div className="whitespace-pre-wrap">
                                {formData.body.length > 200
                                    ? `${formData.body.substring(0, 200)}...`
                                    : formData.body}
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                            {formData.scheduledAt
                                ? "Schedule Campaign"
                                : "Create Campaign"}
                        </button>

                        <button
                            type="button"
                            onClick={handleReset}
                            disabled={loading}
                            className="flex items-center gap-2 px-5 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset
                        </button>
                    </div>

                    <div className="text-sm text-gray-400">
                        {formData.scheduledAt ? (
                            <span>
                                Scheduled for:{" "}
                                {new Date(
                                    formData.scheduledAt
                                ).toLocaleString()}
                            </span>
                        ) : (
                            <span>Will be saved as draft</span>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

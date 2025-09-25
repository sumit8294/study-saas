"use client";
import { MessageCircle, UserPlus } from "lucide-react";

export default function TopBar({ show }: { show: boolean }) {
    return (
        <div
            className={`w-full bg-[#2775D9] text-white text-sm overflow-hidden transition-all duration-300 ${
                show ? " py-2" : "h-0 py-0"
            }`}
        >
            <div className="container text-base mx-auto flex items-center justify-center gap-6 py-4 px-4">
                {/* Customer Service */}
                <a href="#" className="flex items-center gap-2 hover:underline">
                    <MessageCircle className="w-4 h-4" />
                    Customer Service
                </a>

                {/* Create Account */}
                <a href="#" className="flex items-center gap-2 hover:underline">
                    <UserPlus className="w-4 h-4" />
                    Create Account
                </a>

                {/* Hire Now button */}
                <a
                    href="#"
                    className="border border-white rounded-full px-4 py-1 hover:bg-white hover:text-[#2775D9] transition"
                >
                    Hire now
                </a>
            </div>
        </div>
    );
}

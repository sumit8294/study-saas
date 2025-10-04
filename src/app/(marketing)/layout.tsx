import Header from "@/components/ui/Header";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter", // exposes it as a CSS variable
});

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className="bg-[#001e2b] text-gray-900 antialiased"
                style={{ fontFamily: "math" }}
            >
                <Header />
                <main className="bg-[#001e2b]">{children}</main>
            </body>
        </html>
    );
}

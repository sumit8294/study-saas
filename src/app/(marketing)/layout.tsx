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
        <html lang="en" className={inter.variable}>
            <body className="bg-white text-gray-900 antialiased">
                <Header />
                <main className="">{children}</main>
            </body>
        </html>
    );
}

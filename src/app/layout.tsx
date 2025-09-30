import Header from "@/components/ui/Header";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter", // exposes it as a CSS variable
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={inter.variable}
            style={{ background: "#111827" }}
        >
            <head>
                {/* Google Fonts link */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="">{children}</body>
        </html>
    );
}

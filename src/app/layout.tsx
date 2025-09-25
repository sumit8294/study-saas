import Header from "@/components/ui/Header";
import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-white text-gray-900 antialiased">
                <Header />
                <main className="pt-16">{children}</main>
            </body>
        </html>
    );
}

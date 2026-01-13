import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Easy Converter - Image Format Converter",
    description: "Convert images between JPG, PNG, WEBP, and AVIF formats instantly in your browser",
    icons: {
        icon: "/logo.png",
        apple: "/logo.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <body className="min-h-screen bg-white text-slate-800 antialiased font-sans" suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meridian Legal | Corporate & Business Law",
  description:
    "Meridian Legal provides sophisticated legal counsel to businesses navigating complex corporate, commercial, and regulatory challenges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-[#fafaf8] text-[#1a1a2e]">
        {children}
      </body>
    </html>
  );
}

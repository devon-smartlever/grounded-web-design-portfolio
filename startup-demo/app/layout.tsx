import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus AI | Intelligent Analytics Platform",
  description:
    "Transform your business with Nexus AI. Real-time analytics, predictive insights, and automated workflows powered by cutting-edge artificial intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-[#06060f] text-[#f0f0ff]">
        {children}
      </body>
    </html>
  );
}

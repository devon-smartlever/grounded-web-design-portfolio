import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grounded Web Design — Websites That Work",
  description:
    "We build high-performance, beautifully designed websites for restaurants, startups, and professional firms. Fast turnaround. Real results.",
  keywords: ["web design", "web development", "Next.js", "Tailwind", "small business websites"],
  openGraph: {
    title: "Grounded Web Design",
    description: "We build high-performance websites that win clients for you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bella Vista | Upscale Italian Dining",
  description:
    "An authentic Italian dining experience in the heart of the city. Seasonal ingredients, handcrafted pasta, and an exceptional wine selection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-[#1a1209] text-[#f5f0e8]">
        {children}
      </body>
    </html>
  );
}

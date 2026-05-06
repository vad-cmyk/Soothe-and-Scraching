import type { Metadata } from "next";
import { fraunces, dmSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: 'Soothe and Scratch — Mobile ASMR · London',
    template: '%s | Soothe and Scratch',
  },
  description: 'Mobile ASMR sessions for women in London and surrounding areas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

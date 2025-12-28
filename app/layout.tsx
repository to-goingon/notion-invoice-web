import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Optimize font loading
});

export const metadata: Metadata = {
  title: {
    default: "Notion Invoice Manager",
    template: "%s | Notion Invoice Manager",
  },
  description: "Manage and share invoices using Notion as a CMS with PDF export capabilities",
  keywords: ["invoice", "notion", "pdf", "billing", "cms"],
  authors: [{ name: "Notion Invoice Manager" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "Notion Invoice Manager",
    description: "Notion을 CMS로 활용한 인보이스 관리 시스템",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

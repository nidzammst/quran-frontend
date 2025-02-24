import type { Metadata } from "next";
import { Inter, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/ui/Header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-naskh",
});

export const metadata: Metadata = {
  title: "Al-Qur'an Web Application",
  description: "Generated by Next.JS 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${inter.variable} ${notoNaskh.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          <div className="w-full mt-4 max-sm:mt-12">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

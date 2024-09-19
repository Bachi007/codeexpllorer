import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/themeprovider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  weight: ["400"],
  subsets: ['latin'],
  variable: '--font-inter'
});
export const metadata: Metadata = {
  title: "CodeXplore"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head />
    <body className={inter.className + ' h-screen overflow-hidden'}>
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      > */}
        {children}    
      {/* </ThemeProvider> */}
    </body>
  </html>
  );
}
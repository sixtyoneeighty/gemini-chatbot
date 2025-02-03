import { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { Navbar } from "@/components/custom/navbar";
import { ThemeProvider } from "@/components/custom/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mojo.sixtyoneeightyai.com"),
  title: "sixtyoneeighty chat featuring Mojo",
  description: "sixtyoneeighty chat featuring Mojo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-center" />
            <Navbar />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

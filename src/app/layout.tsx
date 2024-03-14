import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "../styles/globals.css";
import Dropdown from "../components/dropdown";
import Navbar from "../components/navbar";
import { cn } from "@/lib/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Alfa system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <div className="flex h-full">
          <Dropdown />
          <div className="flex flex-col w-full">
            <Navbar />
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
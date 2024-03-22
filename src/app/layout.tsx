import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "../styles/globals.css";
import NextAuthSessionProvider from "@/providers/sessionProvider";

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
      <body>
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </body>
    </html>
  );
}

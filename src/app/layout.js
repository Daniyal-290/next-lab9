/*
 * FILE: src/app/layout.js
 * This is the root layout for the entire application.
 * It will render the Navbar.
 */

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lab 9 - Bahria University",
  description: "SEL-310 Web Engineering Lab 9",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*
          This Navbar will be an async Server Component,
          so it can fetch the session on its own.
        */}
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
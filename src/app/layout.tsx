"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "../assets/style.css";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import Provider from "./_trpc/provider";
import Header from "@/Components/Header";
import UserContextProvider from "./context/UserContextProvider";
import Footer from "@/Components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={(inter.className, "flex flex-col min-h-screen")}>
        <NextUIProvider>
          <Provider>
            <UserContextProvider>
              <Header />
              {children}
              <Footer />
            </UserContextProvider>
          </Provider>
          <Toaster />
        </NextUIProvider>
      </body>
    </html>
  );
}

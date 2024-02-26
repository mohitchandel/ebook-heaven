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
import NProgress from "nprogress";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();

  useEffect(() => {
    // Setting up the loading progress bar
    NProgress.start();
    setTimeout(() => {
      NProgress.done();
    }, 3000);
  }, [pathName]);

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

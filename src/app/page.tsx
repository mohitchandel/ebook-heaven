import type { Metadata } from "next";
import Header from "@/components/Header";
import EbookGrid from "@/components/Ebooks/EbookGrid";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "E-Book Heaven",
  description: "Welcome to E-Book Heaven",
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Hero />
        <EbookGrid />
      </main>
      <Footer />
    </>
  );
}

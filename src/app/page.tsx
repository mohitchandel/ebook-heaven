import type { Metadata } from "next";
import Header from "@/Components/Header";
import EbookGrid from "@/Components/Ebooks/EbookGrid";
import Hero from "@/Components/Hero";
import Footer from "@/Components/Footer";

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

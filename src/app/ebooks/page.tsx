import EbookGrid from "@/components/Ebooks/EbookGrid";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Ebook } from "@/types/Ebook";
import { Button } from "@nextui-org/react";

export default function Ebook() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <EbookGrid />
      </main>
      <Footer />
    </>
  );
}

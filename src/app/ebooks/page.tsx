import EbookGrid from "@/Components/Ebooks/EbookGrid";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { Ebook } from "@/types/Ebook";
import { Button } from "@nextui-org/react";
import { trpc } from "../_trpc/client";

export default function Ebook() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <EbookGrid />
      </main>
      <Footer />
    </>
  );
}

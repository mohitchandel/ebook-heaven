"use client";
import EbookGrid from "@/Components/Ebooks/EbookGrid";
import Hero from "@/Components/Hero";
import { trpc } from "./_trpc/client";

export default function Home() {
  const { data: ebooksData } = trpc.getEbooks.useQuery();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Hero />
        <div className="container px-4 md:px-6">
          <div className="text-center py-5 mb-5">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-5xl">
              Everyone is Reading
            </h2>
            <p className="text-1xl">You should too</p>
          </div>
          <EbookGrid ebooksData={ebooksData!} />
        </div>
      </main>
    </>
  );
}

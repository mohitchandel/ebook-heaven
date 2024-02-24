"use client";
import EbookGrid from "@/Components/Ebooks/EbookGrid";
import { Ebook } from "@/types/Ebook";
import { trpc } from "@/app/_trpc/client";

export default function Ebook() {
  const { data: ebooksData } = trpc.getEbooks.useQuery();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="text-center py-5 mb-5">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-5xl">
                Download any ebook you want
              </h2>
            </div>
            <EbookGrid ebooksData={ebooksData!} />
          </div>
        </section>
      </main>
    </>
  );
}

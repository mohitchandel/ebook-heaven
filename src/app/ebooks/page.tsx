"use client";
import EbookGrid from "@/Components/Ebooks/EbookGrid";
import { Ebook } from "@/types/Ebook";
import { trpc } from "@/app/_trpc/client";
import EbookSkeletonGrid from "@/Components/Skeletons/EbookSkeletonGrid";

export default function Ebook() {
  const { data: ebooksData, isFetched } = trpc.getEbooks.useQuery();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="text-center py-5 mb-5">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-5xl text-white font-Serif">
                Download any ebook you want
              </h2>
            </div>
            {isFetched ? (
              <EbookGrid ebooksData={ebooksData!} />
            ) : (
              <EbookSkeletonGrid ebooksDataLength={ebooksData?.length! || 4} />
            )}
          </div>
        </section>
      </main>
    </>
  );
}

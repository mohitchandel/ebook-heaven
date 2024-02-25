"use client";
import EbookGrid from "@/Components/Ebooks/EbookGrid";
import Hero from "@/Components/Hero";
import { trpc } from "./_trpc/client";
import EbookSkeletonGrid from "@/Components/Skeletons/EbookSkeletonGrid";

export default function Home() {
  const { data: ebooksData, isFetched } = trpc.getEbooks.useQuery();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
        <Hero />
        <div className="container px-4 md:px-6 ">
          <div className="text-center mb-5 py-10">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-5xl text-white font-Serif">
              Everyone is Reading
            </h2>
            <p className="text-1xl mt-5 text-white">You should too</p>
          </div>
          {isFetched ? (
            <EbookGrid ebooksData={ebooksData!} />
          ) : (
            <EbookSkeletonGrid ebooksDataLength={ebooksData?.length! || 4} />
          )}
        </div>
      </main>
    </>
  );
}

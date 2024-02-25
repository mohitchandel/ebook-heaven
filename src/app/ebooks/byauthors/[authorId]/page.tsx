"use client";
import EbookGrid from "@/Components/Ebooks/EbookGrid";
import EbookSkeletonGrid from "@/Components/Skeletons/EbookSkeletonGrid";
import { trpc } from "@/app/_trpc/client";
import { Skeleton } from "@nextui-org/react";

type Params = {
  params: {
    authorId: string;
  };
};

export default function AuthorEbook({ params: { authorId } }: Params) {
  const { data: ebooksData, isFetched } =
    trpc.getEbooksByAuthorId.useQuery(authorId);
  const { data: authorData } = trpc.getUserById.useQuery(authorId);
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="text-center py-5 mb-5">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-5xl">
                <Skeleton isLoaded={isFetched}>
                  Ebooks By {authorData?.name}
                </Skeleton>
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

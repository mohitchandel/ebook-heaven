"use client";
import { Ebook } from "@/types/Ebook";
import { Button, Chip, Image, Skeleton } from "@nextui-org/react";

export default function EbookSkeletonGrid({
  ebooksDataLength,
}: {
  ebooksDataLength: number;
}) {
  const lengthToArray = new Array(ebooksDataLength).fill(null);

  return (
    <div className="grid gap-6 md:gap-8 lg:gap-10 sm:grid-cols-2 xl:grid-cols-4 align-middle">
      {lengthToArray &&
        lengthToArray.map((_, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg border border-gray-100 dark:border-gray-800"
          >
            <Skeleton className="rounded-lg">
              <Image
                isZoomed
                shadow="sm"
                radius="lg"
                width="100%"
                alt="Ebook Image"
                className="w-full object-cover max-h-[300px] min-h-[299px]"
              />
            </Skeleton>
            <div className="flex-1 flex flex-col p-4 gap-2">
              <div className=" w-full">
                <Skeleton className="rounded-lg">
                  <h3 className="text-base font-bold tracking-tighter line-clamp-2"></h3>
                </Skeleton>
              </div>
              <div className=" w-full">
                <Skeleton className="rounded-lg">
                  <Chip className="bg-green text-[#fff]"></Chip>
                </Skeleton>
              </div>
              <Skeleton className="rounded-lg">
                <p className="text-sm text-gray-500 line-clamp-3 dark:text-gray-400"></p>
              </Skeleton>
              <Skeleton className="rounded-lg">
                <p></p>
              </Skeleton>
              <Skeleton className="rounded-lg">
                <Button className="bg-neon" variant="solid"></Button>
              </Skeleton>
            </div>
          </div>
        ))}
    </div>
  );
}

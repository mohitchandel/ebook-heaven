import Link from "next/link";
import { Button, Chip, Image } from "@nextui-org/react";
import { Ebook } from "@/types/Ebook";

export default function EbookGrid({ ebooksData }: { ebooksData: Ebook[] }) {
  return (
    <div className="grid gap-6 md:gap-8 lg:gap-10 sm:grid-cols-2 xl:grid-cols-4 align-middle">
      {ebooksData &&
        ebooksData.map((book, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg border border-gray-100 bg-white"
          >
            <Image
              isZoomed
              shadow="sm"
              radius="lg"
              width="100%"
              alt="Ebook Image"
              className="w-full object-cover max-h-[300px] min-h-[299px]"
              src={book.thumbnail}
            />
            <div className="flex-1 flex flex-col p-4 gap-2">
              <div className=" w-full">
                <h3 className="text-base font-bold tracking-tighter line-clamp-2">
                  {book.title}
                </h3>
              </div>
              <div className=" w-full">
                <Chip className="bg-black text-white">
                  <Link href={"/authors/" + book.author_id}>
                    {book.author_name}
                  </Link>
                </Chip>
              </div>
              <p className="text-sm text-gray-500 line-clamp-3 dark:text-gray-400">
                {book.description}
              </p>
              <p>
                {book?.uploadet_at
                  ? new Date(book?.uploadet_at).toLocaleDateString()
                  : ""}
              </p>
              <Button
                href={"/ebooks/" + book.id}
                as={Link}
                className="bg-black text-white hover:bg-neon hover:text-black"
                variant="solid"
              >
                View Book
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}

import Link from "next/link";
import { Button, Chip, Image } from "@nextui-org/react";
import { Ebook } from "@/types/Ebook";

export default function EbookGrid({ ebooksData }: { ebooksData: Ebook[] }) {
  return (
    <div className="grid gap-6 md:gap-8 lg:gap-10 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
      {ebooksData &&
        ebooksData.map((book, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-100 bg-white overflow-hidden"
          >
            <Image
              isZoomed
              shadow="sm"
              radius="lg"
              width="100%"
              alt="Ebook Image"
              className="object-cover h-64"
              src={book.thumbnail}
            />
            <div
              className="p-4 flex flex-col justify-between"
              style={{ minHeight: "300px" }}
            >
              <div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3 mb-2">
                  {book.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <Chip className="bg-black text-white">
                  <Link href={"/authors/" + book.author_id}>
                    {book.author_name}
                  </Link>
                </Chip>
                <p className="text-xs text-gray-400">
                  {book.uploadet_at
                    ? new Date(book.uploadet_at).toLocaleDateString()
                    : ""}
                </p>
              </div>
              <Button
                href={"/ebooks/" + book.id}
                as={Link}
                className="mt-4 bg-black text-white hover:bg-neon hover:text-black"
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

import Link from "next/link";
import Image from "next/image";
import { Button, Chip } from "@nextui-org/react";

export default function EbookGrid() {
  const ebooks = [
    {
      title: "Book one",
      description: "Description",
      thumbnail: "/images/cover.png",
      author: "Mohit",
    },
    {
      title: "Book two",
      description: "Description",
      thumbnail: "/images/cover.png",
      author: "Mohit",
    },
    {
      title: "Book three",
      description: "Description",
      thumbnail: "/images/cover.png",
      author: "Mohit",
    },
    {
      title: "Book four",
      description: "Description",
      thumbnail: "/images/cover.png",
      author: "Mohit",
    },
    {
      title: "Book five",
      description: "Description",
      thumbnail: "/images/cover.png",
      author: "Mohit",
    },
    {
      title: "Book six",
      description: "Description",
      thumbnail: "/images/cover.png",
      author: "Mohit",
    },
  ];

  return (
    <section className="w-full">
      <div className="container px-4 md:px-6">
        <div className="text-center py-5 mb-5">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-5xl">
            Everyone is Reading
          </h2>
          <p className="text-1xl">This is description</p>
        </div>
        <div className="grid gap-6 md:gap-8 lg:gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {ebooks.map((book, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg border border-gray-100 dark:border-gray-800"
            >
              <img
                alt="Product image"
                className="aspect-[16/10] object-cover object-center rounded-t-lg"
                height="250"
                src={book.thumbnail}
                width="400"
              />
              <div className="flex-1 flex flex-col p-4 gap-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-base font-bold tracking-tighter line-clamp-2">
                      {book.title}
                    </h3>
                  </div>
                  <div className="text-end">
                    <Chip className="bg-green text-[#fff]">{book.author}</Chip>
                  </div>
                </div>
                <p className="text-sm text-gray-500 line-clamp-3 dark:text-gray-400">
                  {book.description}
                </p>

                <Button
                  href="https://github.com/nextui-org/nextui"
                  as={Link}
                  className="bg-neon"
                  variant="solid"
                >
                  View Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

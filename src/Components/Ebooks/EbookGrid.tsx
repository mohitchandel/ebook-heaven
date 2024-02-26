import Link from "next/link";
import { Button, Chip, Image } from "@nextui-org/react";
import { Ebook } from "@/types/Ebook";

export default function EbookGrid({ ebooksData }: { ebooksData: Ebook[] }) {
  return (
    <>
      <div className="flex flex-wrap justify-center mt-10">
        {ebooksData &&
          ebooksData.map((book, index) => (
            <div key={index} className="p-4 max-w-sm">
              <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <h2 className="text-white dark:text-white text-2lg font-medium">
                    {book.title}
                  </h2>
                </div>
                <div className="flex items-center mb-3">
                  <Image
                    className="h-80 w-72 object-cover rounded-t-xl"
                    src={book.thumbnail}
                  />
                </div>
                <div className="flex items-center mb-3">
                  <h2 className="text-white dark:text-white text-lg font-medium">
                    By {book.author_name}
                  </h2>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <p className="leading-relaxed text-base text-white dark:text-gray-300 line-clamp-3">
                    {book.description}
                  </p>
                  <Link
                    href={`/ebooks/${book.id}`}
                    className="mt-3 text-black dark:text-white hover:text-blue-600 inline-flex items-center"
                  >
                    View Book
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

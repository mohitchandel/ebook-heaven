"use client";
import { trpc } from "@/app/_trpc/client";
import UserContext from "@/app/context/UserContext";
import { Ebook } from "@/types/Ebook";
import { Button, Link } from "@nextui-org/react";
import { useContext } from "react";

type Params = {
  params: {
    ebookId: string;
  };
};

export default function Ebook({ params: { ebookId } }: Params) {
  const { userId } = useContext(UserContext);
  const { data: ebook } = trpc.getEbookById.useQuery(ebookId);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="my-20 py-20 max-w-4xl mx-auto p-4 bg-white flex gap-8 h-max	">
          <div className="flex flex-col gap-4">
            <div className="w-96 h-96 bg-gray-200">
              <img
                alt="Main product"
                className="w-full h-full object-cover"
                height="384"
                src={ebook?.thumbnail}
                style={{
                  aspectRatio: "384/384",
                  objectFit: "cover",
                }}
                width="384"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">{ebook?.author_name}</h1>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-bold text-red-600">
                {ebook?.title}
              </span>
            </div>
            <h4 className="text-xl font-bold">
              {ebook?.uploadet_at
                ? new Date(ebook?.uploadet_at).toLocaleDateString()
                : ""}
            </h4>
            <div>
              <p className="text-gray-700">{ebook?.description}</p>
            </div>
            <div>
              {userId ? (
                <Button
                  className="btn bg-neon rounded-lg px-5 py-3"
                  as={Link}
                  href={ebook?.ebook_file}
                  download
                >
                  Download
                </Button>
              ) : (
                <Button disabled className="btn bg-danger rounded-lg px-5 py-3">
                  Login To Download
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

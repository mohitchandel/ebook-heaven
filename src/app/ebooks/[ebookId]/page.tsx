"use client";
import { trpc } from "@/app/_trpc/client";
import UserContext from "@/app/context/UserContext";
import { Ebook } from "@/types/Ebook";
import { Button, Card, CardFooter, Link, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";

/**
 * Type `Params` defines an object with a `params` property containing an `ebookId`.
 */
type Params = {
  params: {
    ebookId: string;
  };
};

export default function Ebook({ params: { ebookId } }: Params) {
  const { userId } = useContext(UserContext);
  const router = useRouter();
  const { data: ebook, isFetched } = trpc.getEbookById.useQuery(ebookId);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-black">
        <div className="my-5 max-w-4xl mx-auto rounded-xl   flex  h-max	">
          <div className="flex flex-col gap-4 h-50">
            <Card className="w-full p-6 bg-black" radius="lg">
              <Skeleton isLoaded={isFetched} className="rounded-lg">
                <div className="mx-auto h-[300px] w-[200px] rounded-lg">
                  {/* Ebook Image */}
                  <img
                    alt="Main product"
                    className="w-full h-full"
                    height="200"
                    src={ebook!?.thumbnail}
                    width="100"
                  />
                </div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton isLoaded={isFetched} className="rounded-lg">
                  <div className=" w-full rounded-lg">
                    <h1 className="text-2xl text-white font-bold">
                      By {ebook?.author_name}
                    </h1>
                  </div>
                </Skeleton>
                <Skeleton isLoaded={isFetched} className=" rounded-lg">
                  <div className=" w-full rounded-lg ">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-neon">
                        {ebook?.title}
                      </span>
                    </div>
                  </div>
                </Skeleton>
                <Skeleton isLoaded={isFetched} className="rounded-lg">
                  <div className="w-full rounded-lg ">
                    <h4 className="text-xl font-bold text-white">
                      {ebook?.uploadet_at
                        ? new Date(ebook?.uploadet_at).toLocaleDateString()
                        : ""}
                    </h4>
                  </div>
                </Skeleton>
                <Skeleton isLoaded={isFetched} className="rounded-lg">
                  <div className="w-full rounded-lg  ">
                    <p className="text-white">{ebook?.description}</p>
                  </div>
                </Skeleton>
              </div>
              <CardFooter>
                {userId ? (
                  <Button
                    className="btn bg-neon rounded-lg mx-auto"
                    as={Link}
                    href={ebook?.ebook_file}
                    download
                  >
                    Download
                  </Button>
                ) : (
                  <Button
                    onClick={() => router.push("/login")}
                    className="btn bg-danger rounded-lg mx-auto"
                  >
                    Login To Download
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

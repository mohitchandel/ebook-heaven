import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="h-95 mb-20 w-full py-12 lg:py-24 xl:py-32">
      <div className="container px-4 md:px-6 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Welcome To E-Book Heaven
            </h1>
            <p className="py-5 max-w-[600px] text-gray-500 md:text-xl/none dark:text-gray-400">
              Beautifully designed components that you can copy and paste into
              your apps. Accessible. Customizable. Open Source.
            </p>
          </div>
          <Button
            href="https://github.com/nextui-org/nextui"
            as={Link}
            className="bg-neon"
            variant="solid"
          >
            Button Link
          </Button>
        </div>
      </div>
    </section>
  );
}

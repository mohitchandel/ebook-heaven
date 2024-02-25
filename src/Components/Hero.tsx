import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="h-full w-full py-12 lg:py-24 xl:py-32">
      <div className="container px-4 md:px-6 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-white tracking-tighter sm:text-5xl font-Serif">
              Welcome To E-Book Heaven
            </h1>
            <p className="py-5 max-w-[600px] text-white md:text-xl/none ">
              We work with several authors to streamline project plans that
              don’t just deliver on ebook perfection, but also delivers on time.
            </p>
          </div>
          <Link className="text-neon underline" href="/ebooks">
            View All Books
          </Link>
        </div>
      </div>
    </section>
  );
}

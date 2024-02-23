import EbookSingle from "@/Components/Ebooks/EbookSingle";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { Ebook } from "@/types/Ebook";
import { Button } from "@nextui-org/react";

export default function Ebook() {
  const demoEbook: Ebook = {
    title: "Demo Ebook",
    author: "Demo author",
    thumbnail: "/images/cover.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  };

  return (
    <>
      <main>
        <EbookSingle ebook={demoEbook} />
      </main>
      <Footer />
    </>
  );
}

import { Ebook } from "@/types/Ebook";
import { Button } from "@nextui-org/react";

export default function EbookSingle({ ebook }: { ebook: Ebook }) {
  return (
    <div className="my-20 py-20 max-w-4xl mx-auto my-8 p-4 bg-white flex gap-8 h-max	">
      <div className="flex flex-col gap-4">
        <div className="w-96 h-96 bg-gray-200">
          <img
            alt="Main product"
            className="w-full h-full object-cover"
            height="384"
            src={ebook.thumbnail}
            style={{
              aspectRatio: "384/384",
              objectFit: "cover",
            }}
            width="384"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">{ebook.author}</h1>
        <div className="flex items-baseline space-x-2">
          <span className="text-5xl font-bold text-red-600">{ebook.title}</span>
        </div>
        <div>
          <p className="text-gray-700">{ebook.description}</p>
        </div>
        <div>
          <Button>Download</Button>
        </div>
      </div>
    </div>
  );
}

"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { createClient } from "@/utils/supabase/client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";

export default function ListBookPage() {
  const supabse = createClient();
  const handleListBook = async (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    const description = e.target[1].value;
    const pdf = e.target[2].value;
    const thumbnail = e.target[3].value;

    const { data: pdfUpload, error: pdfError } = await supabse.storage
      .from("images")
      .upload("public/" + pdf.name, pdf as File);

    const { data: imgUpload, error: imgError } = await supabse.storage
      .from("images")
      .upload("public/" + thumbnail.name, thumbnail as File);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-[85vh] max-h-[100vh]">
        <div className="w-full max-w-screen-lg md:w-3/5">
          <Card className="mx-auto max-w-sm h-full">
            <CardHeader className="justify-center">
              <div className="text-center">
                <p className="text-md">Register</p>
                <p className="text-small text-default-500">
                  Enter your details below to register
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <form onSubmit={handleListBook}>
                <div className="space-y-2 my-3">
                  <Input
                    // isRequired
                    label="Book Title"
                    id="title"
                    name="title"
                    required
                    type="text"
                  />
                </div>
                <div className="space-y-2 my-3">
                  <Textarea
                    // isRequired
                    label="Description"
                    placeholder="Enter your book description"
                    className=""
                  />
                </div>
                <div className="space-y-2 my-3">
                  <label className="text-sm mb-0">Ebook (PDF Only)</label>
                  <Input
                    // isRequired
                    id="ebook"
                    accept="application/pdf"
                    type="file"
                  />
                </div>
                <div className="space-y-2 my-3">
                  <label className="text-sm mb-0">Thumbnail</label>
                  <Input
                    // isRequired
                    id="thumbnail"
                    accept="image/*"
                    type="file"
                  />
                </div>
                <div className="space-y-2 my-3">
                  <Button type="submit" className="w-full bg-neon">
                    List Book
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}

"use client";
import { createClient } from "@/utils/supabase/client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { trpc } from "../_trpc/client";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useRouter } from "next/navigation";

const IMAGE_BUCKET =
  "https://rzxplxrngallpbwhapso.supabase.co/storage/v1/object/public/image/";

const BOOK_BUCKET =
  "https://rzxplxrngallpbwhapso.supabase.co/storage/v1/object/public/books/";

export default function ListBookPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [bookPdf, setBookPdf] = useState<File | null>();
  const [thumbnail, setThumbnail] = useState<File | null>();
  const router = useRouter();
  const currentTimestamp = +new Date();
  const supabse = createClient();

  const { userId } = useContext(UserContext);
  const { data: userData } = trpc.getUserById.useQuery(userId);

  const listBookMutation = trpc.createEbooks.useMutation({
    onError(error) {
      console.error("Error:", error);
      setIsLoading(false);
    },
    onSuccess(data) {
      console.log(data);
      setIsLoading(false);
    },
  });

  const handleListBook = async () => {
    if (!userData) {
      return;
    }
    if (!title || !description || !bookPdf || !thumbnail) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      setIsLoading(true);
      const { data: pdfUpload, error: pdfError } = await supabse.storage
        .from("books")
        .upload("public/" + currentTimestamp, bookPdf as File);
      const { data: imgUpload, error: imgError } = await supabse.storage
        .from("image")
        .upload("public/" + currentTimestamp, thumbnail as File);
      if (pdfError || imgError) {
        toast.error("Failed to upload files");
        setIsLoading(false);
        return;
      }
      listBookMutation.mutate({
        title,
        description,
        author_id: userId,
        author_name: userData?.name,
        ebook_file: BOOK_BUCKET + pdfUpload?.path,
        thumbnail: IMAGE_BUCKET + imgUpload?.path,
      });
      toast.success("Book Uploaded!");
      router.replace("/ebooks");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error("Failed to create book");
      console.error(err);
    }
  };

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBookPdf(e.target.files[0]);
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbnail(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (userData?.type !== "Author") {
      router.replace("/");
    }
  }, [userData]);

  return (
    <>
      <div className="flex items-center justify-center min-h-[85vh] max-h-[100vh]">
        <div className="w-full max-w-screen-lg md:w-3/5">
          <Card className="mx-auto max-w-sm h-full">
            <CardHeader className="justify-center">
              <div className="text-center">
                <p className="text-md">List Your Book</p>
                <p className="text-small text-default-500">
                  Enter the details of your book below.
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="space-y-2 my-3">
                <Input
                  isRequired
                  label="Book Title"
                  id="title"
                  name="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                />
              </div>
              <div className="space-y-2 my-3">
                <Textarea
                  isRequired
                  label="Description"
                  placeholder="Enter your book description"
                  onChange={(e) => setDescription(e.target.value)}
                  className=""
                />
              </div>
              <div className="space-y-2 my-3">
                <label className="text-sm mb-0">Ebook (PDF Only)</label>
                <Input
                  isRequired
                  id="ebook"
                  accept="application/pdf"
                  onChange={handlePDFUpload}
                  type="file"
                />
              </div>
              <div className="space-y-2 my-3">
                <label className="text-sm mb-0">Thumbnail</label>
                <Input
                  isRequired
                  id="thumbnail"
                  onChange={handleThumbnailUpload}
                  accept="image/*"
                  type="file"
                />
              </div>
              <div className="space-y-2 my-3">
                {isLoading ? (
                  <Button type="submit" className="w-full bg-neon">
                    <Spinner size="sm" />
                  </Button>
                ) : (
                  <Button
                    onPress={handleListBook}
                    type="submit"
                    className="w-full bg-neon"
                  >
                    List Book
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

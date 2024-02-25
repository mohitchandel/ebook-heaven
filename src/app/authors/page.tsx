"use client";
import { trpc } from "@/app/_trpc/client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
  Card,
} from "@nextui-org/react";
import Link from "next/link";

interface Author {
  name: string;
  type: string;
  id: string;
  user_id: string;
}

interface AuthorsTableGridProps {
  authors: Author[];
}
export default function Home() {
  const {
    data: authors,
    isFetched,
    isFetching,
  } = trpc.getAuthorsProfiles.useQuery();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between px-24 py-12 bg-black">
        <div className="container px-4 md:px-6 ">
          <div className="text-center mb-5 py-10">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-5xl text-white font-Serif">
              All the Authors
            </h2>
          </div>
          <div className="w-full">
            {isFetching && !isFetched ? (
              <div className="w-full flex items-center ">
                <div className="w-full flex flex-col gap-2">
                  <Card className="p-5">
                    <Skeleton className="h-5 my-2 rounded-lg" />
                    <Skeleton className="h-5 my-2 rounded-lg" />
                  </Card>
                </div>
              </div>
            ) : (
              <AuthorsTableGrid authors={authors!} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

const EyeIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
  >
    <path
      d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

const AuthorsTableGrid: React.FC<AuthorsTableGridProps> = ({ authors }) => {
  return (
    <Table aria-label="Authors">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>{""}</TableColumn>
      </TableHeader>

      <TableBody>
        {authors?.map((author, index) => (
          <TableRow key={index}>
            <TableCell>{author.name}</TableCell>
            <TableCell>{author.type}</TableCell>
            <TableCell>
              <Link
                className="text-neon underline"
                href={`/authors/${author.user_id}`}
              >
                <EyeIcon />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

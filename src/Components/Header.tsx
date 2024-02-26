"use client";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Skeleton,
} from "@nextui-org/react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import UserContext from "@/app/context/UserContext";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const { userId, refreshToken, setRefreshToken, setUserId } =
    useContext(UserContext);
  const {
    data: userData,
    isFetched: isUserFetched,
    isLoading: isUserLoading,
  } = trpc.getUserById.useQuery(userId || "", {
    enabled: !!userId,
  });

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      location.reload();
    }
  };

  useEffect(() => {
    const refreshSession = async () => {
      const { data } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });
      console.log(data);
    };
    refreshSession();
  }, [refreshToken]);

  useEffect(() => {
    async function checkForLS() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if ((!userId || !refreshToken) && session) {
        setRefreshToken(session.refresh_token);
        setUserId(session.user.id);
      }
    }
    checkForLS();
  }, [refreshToken, userId]);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <p className="font-bold text-neon text-2xl">Ebook Heaven</p>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto justify-between items-center`}
            id="navbar-default"
          >
            <ul className="justify-between items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/ebooks"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Ebooks
                </Link>
              </li>
              <li>
                <Link
                  href="/authors"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Authors
                </Link>
              </li>
              {userData?.type === "Author" && (
                <li>
                  <Link
                    href="/listbook"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    List Book
                  </Link>
                </li>
              )}
              {!userId ? (
                <>
                  <div className="flex items-center">
                    <button
                      onClick={() => router.push("/login")}
                      className="bg-white text-black px-4 py-2 rounded-md mr-4 hover:bg-neon hover:text-black"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => router.push("/signup")}
                      className="bg-neon text-black px-4 py-2 rounded-md hover:bg-white hover:text-black"
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              ) : (
                <DropdownUserItem
                  sessionUser={userData}
                  handleSignOut={handleSignOut}
                  isFetched={isUserFetched}
                  isLoading={isUserLoading}
                />
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

function DropdownUserItem({
  sessionUser,
  handleSignOut,
  isFetched,
  isLoading,
}: {
  sessionUser: any;
  handleSignOut: MouseEventHandler<HTMLLIElement> | undefined;
  isFetched: boolean;
  isLoading: boolean;
}) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger className="border rounded-xl cursor-pointer">
        <svg
          viewBox="0 0 24 24"
          width={"30px"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <circle cx="12" cy="6" r="4" fill="#17C964"></circle>{" "}
            <path
              opacity="0.5"
              d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
              fill="#17C964"
            ></path>{" "}
          </g>
        </svg>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">
            <Skeleton isLoaded={isFetched && !isLoading}>
              {sessionUser?.name}
            </Skeleton>
          </p>
        </DropdownItem>
        <DropdownItem key="settings">
          <Link href={"/profile"}>Profile</Link>
        </DropdownItem>
        <DropdownItem onClick={handleSignOut} key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

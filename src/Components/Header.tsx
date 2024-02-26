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
      <nav className="bg-black border-b border-neon py-4">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Navbar Brand */}
          <div>
            <p className="font-bold text-neon text-2xl">Ebook Heaven</p>
          </div>

          <div className="md:flex sm:hidden gap-8 w-100 justify-between items-center">
            <Link href="/" className="text-white whitespace-nowrap">
              Home
            </Link>
            <Link href="/ebooks" className="text-white whitespace-nowrap">
              All Books
            </Link>
            <Link href="/authors" className="text-white  whitespace-nowrap">
              Authors
            </Link>
            {userData?.type === "Author" && (
              <Link href="/listbook" className="text-white whitespace-nowrap">
                List Book
              </Link>
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
          </div>

          <div className="sm:hidden">
            <button
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Navbar Menu Content (Small Screens) */}
          {isMenuOpen && (
            <div className="sm:hidden">
              <div className="bg-black text-white mt-2 py-2 px-4">
                <Link href="/" className="w-full block">
                  Home
                </Link>
                <Link href="/ebooks" className="w-full block">
                  All Books
                </Link>
                <Link href="/authors" className="w-full block">
                  Authors
                </Link>
                {userData?.type === "Author" && (
                  <Link href="/listbook" className="w-full block">
                    List Book
                  </Link>
                )}
                {!userId ? (
                  <>
                    <Link href="/login" className="w-full block text-white">
                      Login
                    </Link>
                    <Link href="/signup" className="w-full block text-white">
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <DropdownUserItem
                    sessionUser={userData}
                    handleSignOut={handleSignOut}
                    isFetched={isUserFetched}
                    isLoading={isUserLoading}
                  />
                )}
              </div>
            </div>
          )}
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

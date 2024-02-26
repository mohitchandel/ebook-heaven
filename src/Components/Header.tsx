"use client";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  Button,
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const supabase = createClientComponentClient();

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
      <Navbar
        className="bg-black border-b  border-neon"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-neon font-League text-inherit text-2xl">
              Ebook Heaven
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link className="text-white" href={"/"}>
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white" href={"/ebooks"}>
              All Books
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white" href={"/authors"}>
              Authors
            </Link>
          </NavbarItem>
          {userData?.type === "Author" && (
            <NavbarItem>
              <Link className="text-white" href={"/listbook"}>
                List Book
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          {!userId ? (
            <>
              <NavbarItem className="hidden lg:flex">
                <Button
                  className="bg-black text-white"
                  as={Link}
                  color="primary"
                  href="/login"
                  variant="flat"
                >
                  Log In
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  className="bg-neon text-black"
                  as={Link}
                  color="primary"
                  href="/signup"
                  variant="flat"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem className="hidden lg:flex">
                <DropdownUserItem
                  sessionUser={userData}
                  handleSignOut={handleSignOut}
                  isFetched={isUserFetched}
                  isLoading={isUserLoading}
                />
              </NavbarItem>
            </>
          )}
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem>
            <Link className={"w-full"} href={"/"}>
              Home
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className={"w-full"} href={"/ebooks"}>
              All Books
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className={"w-full"} href={"/authors"}>
              Authors
            </Link>
          </NavbarMenuItem>
          {userData?.type === "Author" && (
            <NavbarMenuItem>
              <Link className={"w-full"} href={"/listbook"}>
                List Book
              </Link>
            </NavbarMenuItem>
          )}

          {!userId ? (
            <>
              <NavbarItem>Login</NavbarItem>
              <NavbarItem>SignUp</NavbarItem>
            </>
          ) : (
            <DropdownUserItem
              sessionUser={userData}
              handleSignOut={handleSignOut}
              isFetched={isUserFetched}
              isLoading={isUserLoading}
            />
          )}
        </NavbarMenu>
      </Navbar>
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

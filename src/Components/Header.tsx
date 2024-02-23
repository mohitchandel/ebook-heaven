"use client";
import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState<string>();
  const supabase = createClientComponentClient();

  const menuItems = [
    { text: "Home", link: "/" },
    { text: "All Books", link: "/ebooks" },
    { text: "List Book", link: "/listbook" },
  ];

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      location.reload();
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id);
      console.log(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const refereshSession = async () => {
      const { data, error } = await supabase.auth.refreshSession();
      return data;
    };
    refereshSession();
  }, [userId]);

  return (
    <Navbar className=" border" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold font-League text-inherit text-2xl">
            Ebook Heaven
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((items, index) => (
          <NavbarItem key={index}>
            <Link href={items.link}>{items.text}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
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
              <Button
                className="bg-black text-white"
                color="primary"
                variant="flat"
                onPress={handleSignOut}
              >
                SignOut
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                className="bg-neon text-black"
                color="primary"
                variant="flat"
              >
                Profile
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href={item.link}
            >
              {item.text}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
function async() {
  throw new Error("Function not implemented.");
}

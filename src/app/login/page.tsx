"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");

  const handelLogin = async () => {};

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-[85vh] max-h-[100vh]">
        <div className="w-full max-w-screen-lg md:w-3/5">
          <Card className="mx-auto max-w-sm h-full">
            <CardHeader className="justify-center">
              <div className="text-center">
                <p className="text-md">LogIn</p>
                <p className="text-small text-default-500">
                  Enter your email and password below
                </p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="space-y-2">
                <Input
                  label="Email"
                  id="email"
                  isRequired
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Input
                  label="Password"
                  id="password"
                  isRequired
                  required
                  type="password"
                />
              </div>
            </CardBody>
            <CardFooter>
              <Button className="w-full bg-neon">Sign in</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}

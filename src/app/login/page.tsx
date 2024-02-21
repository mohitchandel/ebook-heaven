"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { Magic } from "magic-sdk";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");

  const handelLogin = async () => {};

  return (
    <Card className="mx-auto max-w-sm">
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
            placeholder="email@example.com"
            required
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Input label="Password" id="password" required type="password" />
        </div>
      </CardBody>
      <CardFooter>
        <Button className="w-full bg-neon">Sign in</Button>
      </CardFooter>
    </Card>
  );
}

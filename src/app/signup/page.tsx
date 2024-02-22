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
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import md5 from "md5";
import { useState } from "react";
import toast from "react-hot-toast";
import { trpc } from "../_trpc/client";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  const createUser = trpc.createUser.useMutation({
    onError(error) {
      toast.error("Something went wrong");
      console.error("Error:", error);
      setIsLoading(false);
    },
    onSuccess(data) {
      toast.success("Registered");
      console.log(data);
      setIsLoading(false);
      redirect("/");
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profileType, setProfileType] = useState<string>("");

  const register = async () => {
    setIsLoading(true);

    if (!name || !email || !password || !profileType) {
      toast.error("Please provide all required information.");
      setIsLoading(false);
      return;
    }
    const encryptedPass = md5(password);
    const userData = {
      name,
      email,
      password: encryptedPass,
      type: profileType,
    };
    createUser.mutate(userData);
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
              <div className="space-y-2">
                <Input
                  isRequired
                  label="Full Name"
                  id="name"
                  name="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Input
                  label="Email"
                  isRequired
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Input
                  isRequired
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Select
                  onChange={(e) => setProfileType(e.target.value)}
                  name="type"
                  isRequired
                  label="User Type"
                >
                  <SelectItem value="Reader" key={"Reader"}>
                    Reader
                  </SelectItem>
                  <SelectItem value="Author" key={"Author"}>
                    Author
                  </SelectItem>
                </Select>
              </div>
            </CardBody>
            <CardFooter>
              <Button
                onPress={register}
                disabled={isLoading}
                type="submit"
                className="w-full bg-neon"
              >
                {isLoading ? (
                  <Spinner color="secondary" size="sm" />
                ) : (
                  "Register"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}

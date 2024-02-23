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
import { useState } from "react";
import toast from "react-hot-toast";
import { trpc } from "../_trpc/client";
import { redirect, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignUpPage() {
  const createUserProfile = trpc.createUserProfile.useMutation({
    onError(error) {
      toast.error("Something went wrong");
      console.error("Error:", error);
      setIsLoading(false);
    },
    onSuccess(data) {
      toast.success("Registered");
      console.log(data);
      setIsLoading(false);
      router.replace("/login");
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profileType, setProfileType] = useState<string>("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  /**
   * The `register` function handles user registration by signing up with email and password, creating a user profile, and displaying appropriate error messages.
   */
  const register = async () => {
    setIsLoading(true);
    if (!name || !email || !password || !profileType) {
      toast.error("Please provide all required information.");
      setIsLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}`,
        },
      });
      if (data.user) {
        const userData = {
          userId: data.user?.id,
          name,
          type: profileType,
        };
        createUserProfile.mutate(userData);
      }
      if (error) {
        toast.error(error.message);
      }
      setIsLoading(false);
    } catch (err) {
      toast.error(`Error creating account`);
      setIsLoading(false);
    }
  };

  return (
    <>
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

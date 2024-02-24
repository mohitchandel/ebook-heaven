"use client";
import Footer from "@/Components/Footer";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { setUserId, setRefreshToken } = useContext(UserContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const supabase = createClientComponentClient();
  const router = useRouter();

  /* 
    This function handles the sign-in process
  */
  const handleSignIn = async () => {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (user && !error) {
      setRefreshToken(session?.refresh_token as string);
      localStorage.setItem("sb-lc-rt", session?.refresh_token as string);
      setUserId(user?.id);
      localStorage.setItem("sb-lc-uid", user?.id);
      router.replace("/");
    }

    if (error) {
      setIsError(true);
      setErrorMessage(error.message);
      return;
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-[85vh] max-h-[100vh]">
        <div className="w-full max-w-screen-lg md:w-3/5">
          <Card className="mx-auto max-w-sm h-full">
            <CardHeader className="justify-center">
              <div className="text-center">
                <p className="text-md">LogIn</p>
                <p className="text-small text-default-500">
                  Enter your email and password below
                </p>
                {isError ? (
                  <p className="text-small text-danger">{errorMessage}</p>
                ) : (
                  ""
                )}
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="space-y-2">
                <Input
                  label="Email"
                  id="email"
                  name="email"
                  isRequired
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Input
                  label="Password"
                  id="password"
                  name="password"
                  isRequired
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>
            </CardBody>
            <CardFooter>
              <Button onPress={handleSignIn} className="w-full bg-neon">
                Sign in
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

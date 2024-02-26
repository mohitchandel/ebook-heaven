import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * This function handles a POST request to sign in a user with email and password using Supabase authentication and then redirects to the origin URL.
 * @param {Request} request - The `request` parameter in the `POST` function is of type `Request`, which represents a HTTP request received by the server. It contains information about the request.
 */
export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}

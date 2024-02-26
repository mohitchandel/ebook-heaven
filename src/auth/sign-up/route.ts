import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * This function handles a POST request to sign up a user using Supabase authentication and redirects to the origin URL upon successful signup.
 * @param {Request} request - The `request` parameter in the `POST` function is of type `Request`,which represents a HTTP request. It is used to extract information from the incoming request, such as the URL, form data, and headers.
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

  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}`,
    },
  });

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}

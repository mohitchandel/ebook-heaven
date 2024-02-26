import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * The function logs out the user and redirects them to the login page.
 * @param {Request} request - The `request` parameter in the code snippet represents the incoming HTTP request that the function is handling. It contains information such as the request URL, headers, method, and body.
 */
export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  await supabase.auth.signOut();

  return NextResponse.redirect(`${requestUrl.origin}/login`, {
    status: 301,
  });
}

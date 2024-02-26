import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server";

/**
 * The `handler` function processes a request by sending it to a specified endpoint.
 * @param {Request} req - The `req` parameter in the `handler` function is an object.
 */
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };

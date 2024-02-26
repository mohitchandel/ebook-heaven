import { createTRPCReact } from "@trpc/react-query";

import { type AppRouter } from "@/server";

/* 
Creating a TRPC React client instance using the `createTRPCReact` function 
*/
export const trpc = createTRPCReact<AppRouter>({});

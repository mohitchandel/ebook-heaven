import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import { db } from "./db";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getUsersList: publicProcedure.query(async () => {
    const users = { name: "mohit", age: 25 }; // await db.getUsers();
    return users;
  }),
  getUserById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const user = await db.user.findById(input);
    return user;
  }),
  createUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await db.user.create(input);
      return user;
    }),
});
export type AppRouter = typeof appRouter;
const server = createHTTPServer({
  router: appRouter,
});
server.listen(3000);

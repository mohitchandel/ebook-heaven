import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import { db } from "./db";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getUserById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const user = await db.profiles.findById(input);
    return user;
  }),
  createUserProfile: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
        type: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await db.profiles.create(input);
      return user;
    }),
  getEbooks: publicProcedure.query(async () => {
    const ebooks = await db.ebooks.findMany();
    return ebooks;
  }),
  createEbooks: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        author: z.string(),
        ebook_file: z.string(),
        thumbnail: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const ebook = await db.ebooks.create(input);
      return ebook;
    }),
});
export type AppRouter = typeof appRouter;
const server = createHTTPServer({
  router: appRouter,
});
server.listen(3000);

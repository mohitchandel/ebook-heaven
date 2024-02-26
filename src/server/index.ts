import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import { db } from "./db";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  // user Methods

  /* The `getAuthorsProfiles` procedure is a public query method that retrieves author profiles from the database.
   */
  getAuthorsProfiles: publicProcedure.query(async () => {
    const ebooks = await db.profiles.findAuthorType();
    return ebooks;
  }),
  /* The `getUserById` procedure is a public query method that retrieves user profile from the database.
   */
  getUserById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const user = await db.profiles.findById(input);
    return user;
  }),
  /* The `updateUserProfile` procedure is a public query method that update user profile.
   */
  updateUserProfile: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await db.profiles.update(input);
      return user;
    }),
  /* The `createUserProfile` procedure is a public query method that create user profile.
   */
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

  // Ebook Methods

  /* 
  The `getEbooks` procedure is a public query method that fetch ebooks.
   */
  getEbooks: publicProcedure.query(async () => {
    const ebooks = await db.ebooks.findMany();
    return ebooks;
  }),
  /* 
  The `getEbookById` procedure is a public query method that fetch ebook by it's id.
   */
  getEbookById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const ebook = await db.ebooks.findById(input);
    return ebook;
  }),
  /* 
  The `getEbooksByAuthorId` procedure is a public query method that fetch ebook by it's author id.
   */
  getEbooksByAuthorId: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const ebook = await db.ebooks.findByAuthorId(input);
    return ebook;
  }),
  /* 
  The `createEbooks` procedure is a public query method that create ebook.
   */
  createEbooks: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        author_id: z.string(),
        author_name: z.string(),
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

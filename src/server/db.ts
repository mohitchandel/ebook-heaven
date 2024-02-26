import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const db = {
  /**
   The `profiles` object contains several methods related to interacting with user profiles in the database using Prisma client
   */
  profiles: {
    findMany: async () => {
      const users = await prisma.profiles.findMany();
      return users;
    },
    findById: async (userId: string) => {
      const user = await prisma.profiles.findUnique({
        where: {
          user_id: userId,
        },
      });
      return user;
    },
    findAuthorType: async () => {
      const user = await prisma.profiles.findMany({
        where: {
          type: "Author",
        },
      });
      return user;
    },
    create: async (profile: { userId: string; name: string; type: string }) => {
      await prisma.profiles.create({
        data: {
          user_id: profile.userId,
          name: profile.name,
          type: profile.type,
        },
      });
    },
    update: async (profile: { userId: string; name: string }) => {
      await prisma.profiles.update({
        where: {
          user_id: profile.userId,
        },
        data: {
          name: profile.name,
        },
      });
    },
  },
  /* The `ebooks` object contains methods related to interacting with ebook data in the database using the Prisma client. */
  ebooks: {
    findMany: async () => {
      const users = await prisma.ebooks.findMany();
      return users;
    },
    findById: async (id: string) => {
      const user = await prisma.ebooks.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    },
    findByAuthorId: async (author_id: string) => {
      const user = await prisma.ebooks.findMany({
        where: {
          author_id: author_id,
        },
      });
      return user;
    },
    create: async (ebook: {
      title: string;
      description: string;
      author_id: string;
      author_name: string;
      ebook_file: string;
      thumbnail: string;
    }) => {
      await prisma.ebooks.create({
        data: {
          title: ebook.title,
          description: ebook.description,
          author_id: ebook.author_id,
          author_name: ebook.author_name,
          ebook_file: ebook.ebook_file,
          thumbnail: ebook.thumbnail,
        },
      });
    },
  },
};

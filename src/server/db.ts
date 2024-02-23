import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const db = {
  profiles: {
    findMany: async () => {
      const users = await prisma.profiles.findMany();
      return users;
    },
    findById: async (userId: string) => {
      const user = await prisma.profiles.findUnique({
        where: {
          id: userId,
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
  },
  ebooks: {
    findMany: async () => {
      const users = await prisma.ebooks.findMany();
      return users;
    },
    findById: async (userId: string) => {
      const user = await prisma.ebooks.findUnique({
        where: {
          id: userId,
        },
      });
      return user;
    },
    create: async (ebook: {
      title: string;
      description: string;
      author: string;
      ebook_file: string;
      thumbnail: string;
    }) => {
      await prisma.ebooks.create({
        data: {
          title: ebook.title,
          description: ebook.description,
          author: ebook.author,
          ebook_file: ebook.ebook_file,
          thumbnail: ebook.thumbnail,
        },
      });
    },
  },
};

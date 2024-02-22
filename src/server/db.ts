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
    create: async (profile: {
      name: string;
      email: string;
      password: string;
      type: string;
    }) => {
      await prisma.profiles.create({
        data: {
          name: profile.name,
          email: profile.email,
          password: profile.password,
          type: profile.type,
          is_verified: false,
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

import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cratePost = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
    include: {
      author: true,
      category: true,
    },
  });

  return result;
};

const getAllPost = async () => {
  const result = await prisma.post.findMany({
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

const getSinglePost = async (id: number) => {
  const result = await prisma.$queryRaw`SELECT * FROM posts WHERE id = ${id}`;

  return result;
};

export const PostService = {
  cratePost,
  getAllPost,
  getSinglePost,
};

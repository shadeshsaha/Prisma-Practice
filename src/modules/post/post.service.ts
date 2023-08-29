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

const getAllPost = async (options: any) => {
  const { sortBy, sortOrder, searchTerm } = options;
  const result = await prisma.post.findMany({
    include: {
      author: true,
      category: true,
    },
    // Ordering
    // orderBy: {
    //   // createdAt: "desc",
    //   [sortBy]: sortOrder,
    // },
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          } // jodi kono kichu input dea hoy tahole shei onujayi eta sort kore dibe
        : { createdAt: "desc" }, // r kono kichu query hishebe na pathale default vabe createdAt desc onujayi sajaye dibe

    // Filtering
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          author: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
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

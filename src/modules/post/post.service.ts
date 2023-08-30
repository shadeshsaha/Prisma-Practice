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
  const { sortBy, sortOrder, searchTerm, page, limit } = options;
  // Pagination
  const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0;
  const take = parseInt(limit) || 10;

  // Using Transaction & Roolback
  return await prisma.$transaction(async (transaction) => {
    // tx/transaction j kono ekta use kortei pari
    const result = await transaction.post.findMany({
      skip,
      take,
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

    const total = await transaction.post.count(); // post table er koto gulo data ache seta count kore dibe

    return { data: result, total };
  });
};

const getSinglePost = async (id: number) => {
  const result = await prisma.$queryRaw`SELECT * FROM posts WHERE id = ${id}`;

  return result;
};

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post> => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

const learnAggregateAndGrouping = async () => {
  // Aggregation
  // const result = await prisma.post.aggregate({
  //   _avg: {
  //     authorId: true, // Author ID er number er average dibe
  //     categoryId: true,
  //   },
  //   _count: {
  //     authorId: true,
  //   },
  //   _sum: {
  //     authorId: true,
  //   },
  // });

  // Grouping
  const result = await prisma.post.groupBy({
    by: ["title"], // ekhane multiple field dea jete pare
    // amra "aggregate" taw "group by" er vetore use korte pari
    _count: {
      title: true,
    },
  });
  return result;
};

export const PostService = {
  cratePost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
  learnAggregateAndGrouping,
};

/**
 * limit = 5
 * page = 1
 * total = 10
 * take = limit
 * skip = limit * page - limit
 *         = 5 * 1 - 5 = 0
 * 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
 */

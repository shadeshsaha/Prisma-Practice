import { PrismaClient, Profile, User } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });

  return result;
};

const insertOrUpdateProfile = async (data: Profile): Promise<Profile> => {
  const isExist = await prisma.profile.findUnique({
    where: {
      userId: data.userId,
    },
  });

  // Update bio if userid exist
  if (isExist) {
    const result = await prisma.profile.update({
      where: {
        userId: data.userId,
      },
      data: {
        bio: data.bio,
      },
    });
    return result;
  }

  // database a user exist na hole create hobe
  const result = await prisma.profile.create({
    data,
  });
  return result;
};

const getUsers = async () => {
  // const result = await prisma.user.findMany();

  const result = await prisma.user.findMany({
    // select: {
    //   email: true,
    // },

    include: {
      profile: true,
    }, // User table er sathe Profile table er connection ache. User theke direct Profile dekhar way eta populate use na kore like mongoose
  }); // Specific column/field gulo dekhte chaile segulo dekhanor jonno "SELECT" use kore avabe korte pari
  return result;
};

const getSingleUser = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
  return result;
};

export const UserService = {
  insertIntoDB,
  insertOrUpdateProfile,
  getUsers,
  getSingleUser,
};

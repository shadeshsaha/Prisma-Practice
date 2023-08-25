import { PrismaClient } from "@prisma/client";

// Create an instance of PrismaClient
const prisma = new PrismaClient();

async function main() {
  // Get All Users
  const getAllUsers = await prisma.user.findMany();
  console.log(getAllUsers);

  // create data
  const postUser = await prisma.user.create({
    data: {
      //   ekhane data schema onushare add korte hbe
      email: "Swadesh@gmail.com",
      name: "Swadesh",
    },
  });
  console.log(postUser);
}

main();

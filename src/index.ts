import { PrismaClient } from "@prisma/client";
import app from "./app";

// Create an instance of PrismaClient
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

async function main() {
  app.listen(port, () => {
    console.log(`Server running at: ${port}`);
  });
}

main();

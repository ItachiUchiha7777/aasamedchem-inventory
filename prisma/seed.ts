import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash(
    "admin123",
    10
  );

  const sellerPassword = await bcrypt.hash(
    "seller123",
    10
  );

  await prisma.user.upsert({
    where: {
      email: "admin@aasamedchem.com",
    },
    update: {},
    create: {
      name: "Admin",
      email: "admin@aasamedchem.com",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: {
      email: "seller@aasamedchem.com",
    },
    update: {},
    create: {
      name: "Seller",
      email: "seller@aasamedchem.com",
      passwordHash: sellerPassword,
      role: "SELLER",
    },
  });

  console.log(
    "Users seeded successfully"
  );
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
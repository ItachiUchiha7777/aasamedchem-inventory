import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

  if (existingUser) {
    return Response.json(
      {
        success: false,
        message: "Email already exists",
      },
      { status: 400 }
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      body.password,
      10
    );

  const user =
    await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        passwordHash:
          hashedPassword,
        role: "SELLER",
      },
    });

  return Response.json({
    success: true,
    user,
  });
}
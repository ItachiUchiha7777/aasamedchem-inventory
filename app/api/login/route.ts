import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return Response.json(
      {
        success: false,
        message: "User not found",
      },
      { status: 404 }
    );
  }

  const validPassword = await bcrypt.compare(
    body.password,
    user.passwordHash
  );

  if (!validPassword) {
    return Response.json(
      {
        success: false,
        message: "Wrong password",
      },
      { status: 401 }
    );
  }

  return Response.json({
    success: true,
    role: user.role,
    name: user.name,
  });
}
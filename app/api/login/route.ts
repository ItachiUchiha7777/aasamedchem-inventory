// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      role: user.role,
      name: user.name,
      userId: user.id,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Login failed" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PATCH(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const {
    currentPassword,
    newPassword,
    confirmPassword,
  } = await req.json();

  if (
    !currentPassword ||
    !newPassword ||
    !confirmPassword
  ) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 }
    );
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json(
      { message: "Passwords do not match." },
      { status: 400 }
    );
  }

  if (newPassword.length < 6) {
    return NextResponse.json(
      {
        message:
          "New password must be at least 6 characters.",
      },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "User not found." },
      { status: 404 }
    );
  }

  const validPassword = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!validPassword) {
    return NextResponse.json(
      { message: "Current password is incorrect." },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    10
  );

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    message: "Password updated successfully.",
  });
}
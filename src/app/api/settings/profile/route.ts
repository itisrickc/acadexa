import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { name } = await req.json();

  if (!name || !name.trim()) {
    return NextResponse.json(
      { message: "Name is required." },
      { status: 400 }
    );
  }

  const user = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: name.trim(),
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return NextResponse.json({
    message: "Profile updated successfully.",
    user,
  });
}

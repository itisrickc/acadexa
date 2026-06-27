import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const subjects = await prisma.subject.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(subjects);
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { name, color } = await req.json();

  if (!name) {
    return NextResponse.json(
      { message: "Subject name is required." },
      { status: 400 }
    );
  }

  const subject = await prisma.subject.create({
    data: {
      name,
      color: color || "#2563eb",
      userId: session.user.id,
    },
  });

  return NextResponse.json(subject);
}
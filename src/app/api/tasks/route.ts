import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const tasks = await prisma.task.findMany({
    where: {
      subject: {
        userId: session.user.id,
      },
    },
    include: {
      subject: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { title, subjectId } = await req.json();

  if (!title || !subjectId) {
    return NextResponse.json(
      {
        message: "Missing fields",
      },
      {
        status: 400,
      }
    );
  }

  const subject = await prisma.subject.findFirst({
    where: {
      id: subjectId,
      userId: session.user.id,
    },
  });

  if (!subject) {
    return NextResponse.json(
      {
        message: "Subject not found.",
      },
      {
        status: 404,
      }
    );
  }

  const task = await prisma.task.create({
    data: {
      title,
      subjectId,
    },
  });

  return NextResponse.json(task);
}
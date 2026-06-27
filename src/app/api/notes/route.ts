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

  const notes = await prisma.note.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      subject: true,
    },
    orderBy: [
      {
        pinned: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
  });

  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { title, content, subjectId } = await req.json();

  if (!title || !content || !subjectId) {
    return NextResponse.json(
      {
        message: "Title, content and subject are required.",
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

  const note = await prisma.note.create({
    data: {
      title,
      content,
      subjectId,
      userId: session.user.id,
    },
    include: {
      subject: true,
    },
  });

  return NextResponse.json(note);
}
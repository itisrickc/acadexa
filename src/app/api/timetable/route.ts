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

  const timetable = await prisma.timetable.findMany({
    where: {
      subject: {
        userId: session.user.id,
      },
    },
    include: {
      subject: true,
    },
    orderBy: [
      {
        day: "asc",
      },
      {
        startTime: "asc",
      },
    ],
  });

  return NextResponse.json(timetable);
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { day, startTime, endTime, subjectId } =
    await req.json();

  if (!day || !startTime || !endTime || !subjectId) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 }
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
      { message: "Subject not found." },
      { status: 404 }
    );
  }

  const item = await prisma.timetable.create({
    data: {
      day,
      startTime,
      endTime,
      subjectId,
    },
    include: {
      subject: true,
    },
  });

  return NextResponse.json(item);
}
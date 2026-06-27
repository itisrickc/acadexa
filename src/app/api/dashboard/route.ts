import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const USER_ID = "cmqswa82600001ctgcwm8km2v";

export async function GET() {
  const subjects = await prisma.subject.count({
    where: {
      userId: USER_ID,
    },
  });

  const totalTasks = await prisma.task.count({
    where: {
      subject: {
        userId: USER_ID,
      },
    },
  });

  const completed = await prisma.task.count({
    where: {
      completed: true,
      subject: {
        userId: USER_ID,
      },
    },
  });

  return NextResponse.json({
    subjects,
    totalTasks,
    completed,
    pending: totalTasks - completed,
  });
}
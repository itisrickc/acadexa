import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const task = await prisma.task.findFirst({
    where: {
      id,
      subject: {
        userId: session.user.id,
      },
    },
  });

  if (!task) {
    return NextResponse.json(
      { message: "Task not found" },
      { status: 404 }
    );
  }

  const updated = await prisma.task.update({
    where: { id },
    data: {
      completed: !task.completed,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const task = await prisma.task.findFirst({
    where: {
      id,
      subject: {
        userId: session.user.id,
      },
    },
  });

  if (!task) {
    return NextResponse.json(
      { message: "Task not found" },
      { status: 404 }
    );
  }

  await prisma.task.delete({
    where: { id },
  });

  return NextResponse.json({
    success: true,
  });
}
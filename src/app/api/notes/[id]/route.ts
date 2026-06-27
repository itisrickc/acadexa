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

  const note = await prisma.note.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!note) {
    return NextResponse.json(
      { message: "Note not found." },
      { status: 404 }
    );
  }

  const body = await req.json();

  const updated = await prisma.note.update({
    where: {
      id,
    },
    data: {
      title: body.title ?? note.title,
      content: body.content ?? note.content,
      pinned: body.pinned ?? note.pinned,
    },
    include: {
      subject: true,
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

  const note = await prisma.note.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!note) {
    return NextResponse.json(
      { message: "Note not found." },
      { status: 404 }
    );
  }

  await prisma.note.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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

  const timetable = await prisma.timetable.findFirst({
    where: {
      id,
      subject: {
        userId: session.user.id,
      },
    },
  });

  if (!timetable) {
    return NextResponse.json(
      { message: "Timetable entry not found." },
      { status: 404 }
    );
  }

  await prisma.timetable.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}

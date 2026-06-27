import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const message = await prisma.aIMessage.findFirst({
    where: {
      id,
      conversation: {
        userId: session.user.id,
      },
    },
  });

  if (!message) {
    return NextResponse.json(
      { error: "Message not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(message);
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const message = await prisma.aIMessage.findFirst({
    where: {
      id,
      conversation: {
        userId: session.user.id,
      },
    },
  });

  if (!message) {
    return NextResponse.json(
      { error: "Message not found" },
      { status: 404 }
    );
  }

  await prisma.aIMessage.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}
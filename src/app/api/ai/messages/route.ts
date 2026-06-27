import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const body = await req.json();

  const {
    conversationId,
    role,
    content,
  } = body;

  if (
    !conversationId ||
    !role ||
    !content
  ) {
    return NextResponse.json(
      {
        error: "Missing fields",
      },
      {
        status: 400,
      }
    );
  }

  const conversation =
    await prisma.aIConversation.findFirst({
      where: {
        id: conversationId,
        userId: session.user.id,
      },
    });

  if (!conversation) {
    return NextResponse.json(
      {
        error: "Conversation not found",
      },
      {
        status: 404,
      }
    );
  }

  const message =
    await prisma.aIMessage.create({
      data: {
        conversationId,
        role,
        content,
      },
    });

  await prisma.aIConversation.update({
    where: {
      id: conversationId,
    },
    data: {
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(message);
}
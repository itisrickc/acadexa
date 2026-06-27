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
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { id } = await params;

  const conversation =
    await prisma.aIConversation.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
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

  return NextResponse.json(conversation);
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
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

  const { id } = await params;

  const conversation =
    await prisma.aIConversation.findFirst({
      where: {
        id,
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

  await prisma.aIConversation.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}
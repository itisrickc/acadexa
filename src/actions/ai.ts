"use server";

import { prisma } from "@/lib/prisma";

export async function createConversation(userId: string) {
  return prisma.aIConversation.create({
    data: {
      userId,
      title: "New Chat",
    },
  });
}

export async function getConversations(userId: string) {
  return prisma.aIConversation.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
}

export async function saveMessage(
  conversationId: string,
  role: string,
  content: string
) {
  return prisma.aIMessage.create({
    data: {
      conversationId,
      role,
      content,
    },
  });
}

export async function updateConversationTitle(
  conversationId: string,
  title: string
) {
  return prisma.aIConversation.update({
    where: {
      id: conversationId,
    },
    data: {
      title,
    },
  });
}

export async function deleteConversation(
  conversationId: string
) {
  return prisma.aIConversation.delete({
    where: {
      id: conversationId,
    },
  });
}
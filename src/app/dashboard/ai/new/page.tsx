import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function NewAIChatPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const conversation = await prisma.aIConversation.create({
    data: {
      userId: session.user.id,
      title: "New Chat",
    },
  });

  redirect(`/dashboard/ai/${conversation.id}`);
}
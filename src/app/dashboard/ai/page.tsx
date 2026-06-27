import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function AIPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const latestConversation =
    await prisma.aIConversation.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

  if (!latestConversation) {
    redirect("/dashboard/ai/new");
  }

  redirect(`/dashboard/ai/${latestConversation.id}`);
}
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "../auth";
import { noteSchema } from "@/lib/validations/note";

export async function createNote(formData: {
  title: string;
  content: string;
  subjectId: string;
  pinned: boolean;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const data = noteSchema.parse(formData);

  await prisma.note.create({
    data: {
      ...data,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard/notes");
}

export async function getNotes() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return prisma.note.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      subject: true,
    },
    orderBy: [
      {
        pinned: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
  });
}

export async function getNote(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return prisma.note.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      subject: true,
    },
  });
}

export async function updateNote(
  id: string,
  formData: {
    title: string;
    content: string;
    subjectId: string;
    pinned: boolean;
  }
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const data = noteSchema.parse(formData);

  await prisma.note.update({
    where: {
      id,
      userId: session.user.id,
    },
    data,
  });

  revalidatePath("/dashboard/notes");
}

export async function deleteNote(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.note.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard/notes");
}

export async function togglePinned(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const note = await prisma.note.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  await prisma.note.update({
    where: {
      id,
    },
    data: {
      pinned: !note.pinned,
    },
  });

  revalidatePath("/dashboard/notes");
}
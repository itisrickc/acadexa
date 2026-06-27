import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import NoteForm from "@/components/notes/NoteForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditNotePage({ params }: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  const [note, subjects] = await Promise.all([
    prisma.note.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    }),

    prisma.subject.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
      },
    }),
  ]);

  if (!note) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Note</h1>
        <p className="mt-2 text-gray-500">
          Update your study note.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <NoteForm
          subjects={subjects}
          note={{
            id: note.id,
            title: note.title,
            content: note.content,
            pinned: note.pinned,
            subjectId: note.subjectId,
          }}
        />
      </div>
    </div>
  );
}
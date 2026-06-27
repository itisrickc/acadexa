import { prisma } from "@/lib/prisma";
import NoteForm from "@/components/notes/NoteForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function NewNotePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const subjects = await prisma.subject.findMany({
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
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Note</h1>
        <p className="mt-2 text-gray-500">
          Create a new study note and organize it by subject.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <NoteForm subjects={subjects} />
      </div>
    </div>
  );
}
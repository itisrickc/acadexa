import Link from "next/link";

import { getNotes } from "@/actions/note";
import NoteSearch from "@/components/notes/NoteSearch";

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notes</h1>
          <p className="mt-1 text-gray-500">
            Organize your study notes subject-wise.
          </p>
        </div>

        <Link
          href="/dashboard/notes/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          + New Note
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-white p-12 text-center shadow-sm">
          <h2 className="text-xl font-semibold">
            No Notes Yet
          </h2>

          <p className="mt-2 text-gray-500">
            Start by creating your first study note.
          </p>

          <Link
            href="/dashboard/notes/new"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Create First Note
          </Link>
        </div>
      ) : (
        <NoteSearch notes={notes} />
      )}
    </div>
  );
}
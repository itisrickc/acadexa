"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createNote, updateNote } from "@/actions/note";

type Subject = {
  id: string;
  name: string;
};

type Note = {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  subjectId: string;
};

type NoteFormProps = {
  subjects: Subject[];
  note?: Note;
};

export default function NoteForm({
  subjects,
  note,
}: NoteFormProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [subjectId, setSubjectId] = useState(
    note?.subjectId ?? ""
  );
  const [pinned, setPinned] = useState(
    note?.pinned ?? false
  );

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    startTransition(async () => {
      if (note) {
        await updateNote(note.id, {
          title,
          content,
          subjectId,
          pinned,
        });
      } else {
        await createNote({
          title,
          content,
          subjectId,
          pinned,
        });
      }

      router.push("/dashboard/notes");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-white p-6 shadow"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Title
        </label>

        <input
          className="w-full rounded-lg border p-3 outline-none focus:ring-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Subject
        </label>

        <select
          className="w-full rounded-lg border p-3"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          required
        >
          <option value="">Select Subject</option>

          {subjects.map((subject) => (
            <option
              key={subject.id}
              value={subject.id}
            >
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Content
        </label>

        <textarea
          rows={10}
          className="w-full rounded-lg border p-3 outline-none focus:ring-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your notes..."
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="pinned"
          type="checkbox"
          checked={pinned}
          onChange={(e) => setPinned(e.target.checked)}
        />

        <label htmlFor="pinned">
          Pin this note
        </label>
      </div>

      <button
        disabled={isPending}
        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending
          ? "Saving..."
          : note
          ? "Update Note"
          : "Create Note"}
      </button>
    </form>
  );
}
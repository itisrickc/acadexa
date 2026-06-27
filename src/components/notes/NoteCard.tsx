"use client";

import Link from "next/link";
import { useTransition } from "react";

import { deleteNote, togglePinned } from "@/actions/note";

type NoteCardProps = {
  note: {
    id: string;
    title: string;
    content: string;
    pinned: boolean;
    updatedAt: Date | string;
    subject: {
      id: string;
      name: string;
    };
  };
};

export default function NoteCard({
  note,
}: NoteCardProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex h-full flex-col rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            {note.subject.name}
          </span>

          <h2 className="mt-3 text-xl font-semibold">
            {note.title}
          </h2>
        </div>

        <button
          type="button"
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              await togglePinned(note.id);
            })
          }
          className={`rounded-lg p-2 transition ${
            note.pinned
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-500 hover:bg-yellow-100 hover:text-yellow-700"
          }`}
        >
          {note.pinned ? "📌" : "📍"}
        </button>
      </div>

      <p className="line-clamp-6 flex-1 whitespace-pre-wrap text-sm text-gray-600">
        {note.content}
      </p>

      <div className="mt-6 border-t pt-4">
        <p className="text-xs text-gray-400">
          Updated{" "}
          {new Date(note.updatedAt).toLocaleDateString()}
        </p>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/dashboard/notes/${note.id}/edit`}
            className="flex-1 rounded-lg border px-4 py-2 text-center text-sm font-medium transition hover:bg-gray-100"
          >
            Edit
          </Link>

          <button
            type="button"
            disabled={isPending}
            onClick={() => {
              const ok = window.confirm(
                "Delete this note?"
              );

              if (!ok) return;

              startTransition(async () => {
                await deleteNote(note.id);
              });
            }}
            className="flex-1 rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
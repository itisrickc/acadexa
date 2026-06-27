"use client";

import { useMemo, useState } from "react";

import NoteCard from "./NoteCard";

type Note = {
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

type NoteSearchProps = {
  notes: Note[];
};

export default function NoteSearch({
  notes,
}: NoteSearchProps) {
  const [query, setQuery] = useState("");

  const filteredNotes = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return notes;

    return notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(search) ||
        note.content.toLowerCase().includes(search) ||
        note.subject.name.toLowerCase().includes(search)
      );
    });
  }, [notes, query]);

  return (
    <div className="space-y-6">
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, subject or content..."
          className="w-full rounded-xl border bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredNotes.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-white p-10 text-center">
          <h2 className="text-lg font-semibold">
            No matching notes found
          </h2>

          <p className="mt-2 text-gray-500">
            Try searching with different keywords.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
            />
          ))}
        </div>
      )}
    </div>
  );
}
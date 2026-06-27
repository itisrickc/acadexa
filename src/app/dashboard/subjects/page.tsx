"use client";

import { useEffect, useState } from "react";

type Subject = {
  id: string;
  name: string;
  color: string;
};

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#2563eb");

  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadSubjects() {
    const res = await fetch("/api/subjects");
    const data = await res.json();
    setSubjects(data);
  }

  useEffect(() => {
    loadSubjects();
  }, []);

  async function saveSubject(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Enter subject name.");
      return;
    }

    const url = editingId
      ? `/api/subjects/${editingId}`
      : "/api/subjects";

    const method = editingId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        color,
      }),
    });

    if (!res.ok) {
      alert("Operation failed.");
      return;
    }

    setName("");
    setColor("#2563eb");
    setEditingId(null);

    loadSubjects();
  }

  function editSubject(subject: Subject) {
    setEditingId(subject.id);
    setName(subject.name);
    setColor(subject.color);
  }

  async function deleteSubject(id: string) {
    const ok = confirm("Delete this subject?");

    if (!ok) return;

    await fetch(`/api/subjects/${id}`, {
      method: "DELETE",
    });

    loadSubjects();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Subjects</h1>

      <form
        onSubmit={saveSubject}
        className="flex gap-4"
      >
        <input
          className="flex-1 rounded-lg border px-3 py-2"
          placeholder="Subject Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <button
          className="rounded-lg bg-blue-600 px-5 text-white"
        >
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setName("");
              setColor("#2563eb");
            }}
            className="rounded-lg bg-gray-500 px-5 text-white"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="grid gap-4">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-5 w-5 rounded-full"
                style={{
                  background: subject.color,
                }}
              />

              <span className="font-medium">
                {subject.name}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editSubject(subject)}
                className="rounded bg-yellow-500 px-4 py-2 text-white"
              >
                Edit
              </button>

              <button
                onClick={() => deleteSubject(subject.id)}
                className="rounded bg-red-600 px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
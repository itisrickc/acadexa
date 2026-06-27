"use client";

import { useEffect, useState } from "react";

type Subject = {
  id: string;
  name: string;
};

type Timetable = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: Subject;
};

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function TimetablePage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [items, setItems] = useState<Timetable[]>([]);

  const [day, setDay] = useState("Monday");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [subjectId, setSubjectId] = useState("");

  async function loadData() {
    const s = await fetch("/api/subjects");
    const t = await fetch("/api/timetable");

    setSubjects(await s.json());
    setItems(await t.json());
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addEntry(e: React.FormEvent) {
    e.preventDefault();

    if (!subjectId || !startTime || !endTime) {
      alert("Fill all fields.");
      return;
    }

    await fetch("/api/timetable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day,
        startTime,
        endTime,
        subjectId,
      }),
    });

    setStartTime("");
    setEndTime("");
    setSubjectId("");

    loadData();
  }

  async function deleteEntry(id: string) {
    if (!confirm("Delete this timetable entry?")) return;

    await fetch(`/api/timetable/${id}`, {
      method: "DELETE",
    });

    loadData();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Weekly Timetable</h1>

      <form
        onSubmit={addEntry}
        className="grid grid-cols-1 gap-4 rounded-xl border p-6 md:grid-cols-5"
      >
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="rounded-lg border p-2"
        >
          {DAYS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="rounded-lg border p-2"
        />

        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="rounded-lg border p-2"
        />

        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="rounded-lg border p-2"
        >
          <option value="">Select Subject</option>

          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>

        <button className="rounded-lg bg-blue-600 text-white">
          Add
        </button>
      </form>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div>
              <h2 className="font-semibold">
                {item.subject.name}
              </h2>

              <p className="text-gray-500">
                {item.day} • {item.startTime} - {item.endTime}
              </p>
            </div>

            <button
              onClick={() => deleteEntry(item.id)}
              className="rounded bg-red-600 px-4 py-2 text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
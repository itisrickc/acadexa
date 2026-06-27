"use client";

import { useEffect, useState } from "react";

type Subject = {
  id: string;
  name: string;
};

type Task = {
  id: string;
  title: string;
  completed: boolean;
  subject: Subject;
};

export default function TasksPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");

  async function loadData() {
    const s = await fetch("/api/subjects");
    const t = await fetch("/api/tasks");

    setSubjects(await s.json());
    setTasks(await t.json());
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addTask() {
    if (!title || !subjectId) {
      alert("Please enter task title and select a subject.");
      return;
    }

    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        subjectId,
      }),
    });

    setTitle("");
    setSubjectId("");
    loadData();
  }

  async function toggleTask(id: string) {
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
    });

    loadData();
  }

  async function deleteTask(id: string) {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    loadData();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Tasks</h1>

      <div className="flex gap-3">
        <input
          className="flex-1 rounded-lg border p-2"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="rounded-lg border p-2"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
        >
          <option value="">Select Subject</option>

          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>

        <button
          onClick={addTask}
          className="rounded-lg bg-blue-600 px-6 text-white"
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <h2
                  className={`font-semibold ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </h2>

                <p className="text-gray-500">{task.subject.name}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`rounded-lg px-4 py-2 text-white ${
                    task.completed
                      ? "bg-green-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
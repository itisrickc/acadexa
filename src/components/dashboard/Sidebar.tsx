"use client";

import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "🏠",
  },
  {
    title: "Subjects",
    href: "/dashboard/subjects",
    icon: "📚",
  },
  {
    title: "Timetable",
    href: "/dashboard/timetable",
    icon: "📅",
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: "✅",
  },
  {
    title: "Notes",
    href: "/dashboard/notes",
    icon: "📝",
  },
  {
    title: "Progress",
    href: "/dashboard/progress",
    icon: "📈",
  },
 {
  title: "ACADEXA AI",
  href: "/dashboard/ai",
  icon: "🤖",
},
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white h-screen shadow-xl p-6">

      <h1 className="text-3xl font-extrabold text-blue-600 mb-10">
        ACADEXA
      </h1>

      <div className="space-y-3">

        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition"
          >
            <span className="text-2xl">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.title}
            </span>
          </Link>
        ))}

      </div>

    </aside>
  );
}
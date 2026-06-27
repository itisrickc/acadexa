import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

 const [
  totalSubjects,
  totalTasks,
  completedTasks,
  totalNotes,
  pinnedNotes,
] = await Promise.all([
  prisma.subject.count({
    where: {
      userId,
    },
  }),

  prisma.task.count({
    where: {
      subject: {
        userId,
      },
    },
  }),

  prisma.task.count({
    where: {
      completed: true,
      subject: {
        userId,
      },
    },
  }),

  prisma.note.count({
    where: {
      userId,
    },
  }),

  prisma.note.count({
    where: {
      userId,
      pinned: true,
    },
  }),
]);
  const cards = [
    {
      title: "Subjects",
      value: totalSubjects,
      color: "bg-blue-500",
    },
    {
      title: "Tasks",
      value: totalTasks,
      color: "bg-green-500",
    },
    {
      title: "Completed",
      value: completedTasks,
      color: "bg-emerald-500",
    },
    {
      title: "Notes",
      value: totalNotes,
      color: "bg-purple-500",
    },
    {
      title: "Pinned Notes",
      value: pinnedNotes,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {session.user.name}
        </h1>

        <p className="mt-2 text-gray-500">
          Here's an overview of your academic progress.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <div
              className={`mb-4 h-3 w-16 rounded-full ${card.color}`}
            />

            <h2 className="text-sm text-gray-500">
              {card.title}
            </h2>

            <p className="mt-2 text-3xl font-bold">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
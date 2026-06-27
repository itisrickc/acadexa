"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const items = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Subjects", href: "/dashboard/subjects" },
  { name: "Tasks", href: "/dashboard/tasks" },
  { name: "Timetable", href: "/dashboard/timetable" },
  { name: "Notes", href: "/dashboard/notes" },
  { name: "Question Papers", href: "/dashboard/papers" },
  { name: "Submissions", href: "/dashboard/submissions" },
  { name: "Progress", href: "/dashboard/progress" },
  { name: "AI Planner", href: "/dashboard/ai" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-7 w-7" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72">

        <h1 className="text-2xl font-bold text-blue-600 mb-8">
          ACADEXA
        </h1>

        <div className="space-y-2">

          {items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-lg px-4 py-3 hover:bg-slate-100"
            >
              {item.name}
            </Link>
          ))}

        </div>

      </SheetContent>
    </Sheet>
  );
}
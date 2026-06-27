"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BookOpen,
  Calendar,
  CheckSquare,
  FileText,
  Home,
  LineChart,
  Settings,
  Sparkles,
  Upload,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Subjects",
    url: "/dashboard/subjects",
    icon: BookOpen,
  },
  {
    title: "Tasks",
    url: "/dashboard/tasks",
    icon: CheckSquare,
  },
  {
    title: "Timetable",
    url: "/dashboard/timetable",
    icon: Calendar,
  },
  {
    title: "Notes",
    url: "/dashboard/notes",
    icon: FileText,
  },
  {
    title: "Question Papers",
    url: "/dashboard/papers",
    icon: FileText,
  },
  {
    title: "Submissions",
    url: "/dashboard/submissions",
    icon: Upload,
  },
  {
    title: "Progress",
    url: "/dashboard/progress",
    icon: LineChart,
  },
  {
    title: "AI Planner",
    url: "/dashboard/ai",
    icon: Sparkles,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>

        <SidebarGroup>

          <SidebarGroupLabel className="text-xl font-bold py-6">
            🎓 ACADEXA
          </SidebarGroupLabel>

          <SidebarGroupContent>

            <SidebarMenu>

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>

                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
}
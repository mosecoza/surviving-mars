"use client";
import Header from "@/app/components/Header";
import { useUsersStore } from "@/app/store/useUsers";
import { useEffect } from "react";
import { useTasksStore } from "@/app/store/useTasks";
import TaskCard from "@/app/components/TaskCard";
import Image from "next/image";
import MarsHeroISection from "./components/MarsHeroSection";
import { SidePanel } from "./components/SidePanel";

export default function Home() {
  const { getUsers, getCurrentUser } = useUsersStore();
  const { tasks } = useTasksStore();

  useEffect(() => {
    getCurrentUser();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <Header />
      <SidePanel />
      <main className="p-4 md:ml-64 h-auto pt-20">
        <MarsHeroISection />

        {tasks.length ? tasks.map((task) => <TaskCard key={task.id} task={task} />) : <TaskCard />}
      </main>
    </div>
  );
}

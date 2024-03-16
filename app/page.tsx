"use client";
import Header from "@/app/components/Header";
import { useUsersStore } from "@/app/store/users";
import { useEffect } from "react";
import { useTasksStore } from "@/app/store/useTasks";
import TaskCard from "@/app/components/TaskCard";

export default function Home() {
  const { getUsers, getCurrentUser } = useUsersStore();
  const { tasks } = useTasksStore();
  
  useEffect(() => {
    getCurrentUser();
    getUsers();
  }, []);

  return (
    <main className="flex max-h-screen overflow-y-scroll flex-col items-center justify-between px-24 md:px-12 sm:px-0">
      <Header />
      <div className="mb-32 flex flex-col text-center lg:max-w-5xl lg:mb-0 lg:text-left lg:w-3/4 sm:w-11/12 md:w-2/3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task}/>
        ))}
      </div>
    </main>
  );
}

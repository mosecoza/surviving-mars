import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";
import { Task } from "../interfaces/Task";

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
  deleteAllTasks: () => void;
}

type MyPersist = (config: StateCreator<TaskStore>, options: PersistOptions<TaskStore>) => StateCreator<TaskStore>;

export const useTasksStore = create<TaskStore, []>(
  (persist as MyPersist)(
    (set, get): TaskStore => ({
      tasks: [] as Task[],
      addTask: (task: Task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (updatedTask: Task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
        })),
      deleteTask: (taskId: string) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== taskId) })),
      deleteAllTasks: () => set((state) => ({ tasks: [] })),
    }),
    {
      name: "MarsTasks",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

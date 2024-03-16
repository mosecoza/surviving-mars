import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';
import { Task } from '@/app/interfaces/Task';

interface TaskStore {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (updatedTask: Task) => void;
    deleteTask: (taskId: string) => void;
}

type MyPersist = (
    config: StateCreator<TaskStore>,
    options: PersistOptions<TaskStore>
) => StateCreator<TaskStore>;

export const useTasksStore = create<TaskStore, []>(
    (persist as MyPersist)(
        (set, get): TaskStore => ({
            tasks: [] as Task[], // Initial state with empty task list
            addTask: (task: Task) => set((state) => ({ tasks: [...state.tasks, task] })),
            updateTask: (updatedTask: Task) =>
                set((state) => ({
                    tasks: state.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
                })),
            deleteTask: (taskId: string) =>
                set((state) => ({ tasks: state.tasks.filter((t) => t.id !== taskId) })),
        }),
        {
            name: 'MarsTasks', // Key for storing tasks in localStorage
            storage: createJSONStorage(() => localStorage) // Use the persisted storage instance
        }
    )
);

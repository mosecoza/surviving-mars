import React, { useEffect } from "react";
import { useUsersStore } from "../store/useUsers";
import { useTasksStore } from "../store/useTasks";

export const SidePanel = () => {
  const { currentUser } = useUsersStore();
  const { tasks, deleteAllTasks } = useTasksStore();

  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <ul className="space-y-2">
          <li className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center flex-between p-2 text-bold font-medium text-gray-900 rounded-lg dark:text-white group">
              <span data-testid="currentUser" className="ml-3">
                {currentUser?.name}
              </span>
            </div>
          </li>
          <li className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center flex-between p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white group">
              <span className="flex-1 ml-3 text-left whitespace-nowrap">Tasks</span>
              <span
                data-testid="numberOfTasks"
                className="bg-orange-100 text-orange-800 text-xs font-lg me-2 px-2.5 py-0.5 rounded-full dark:bg-orange-900 dark:text-orange-300"
              >
                {tasks.length}
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20">
        <button
          onClick={deleteAllTasks}
          className=" w-full  hover:text-white hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 rounded-lg text-red-700 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          disabled={!tasks.length}
          type="button"
        >
          Delete All
        </button>
      </div>
    </aside>
  );
};

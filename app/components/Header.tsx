"use client";
import React, { useState } from "react";
import AddTaskModal from "./modals/add-task-modal";

/*
At the top of the page, there should be a coloured header bar containing a witty title
which maintains it's position as you scroll through the application.
*/

const Header = () => {
  const handleAddTaskForm = () => setOpen(true);
  const [open, setOpen] = useState(false);
  return (
    <header className="flex justify-between items-center z-50 top-0 left-0 w-full p-4 sticky bg-slate-950 dark:bg-orange-300">
      {open && <AddTaskModal open={open} onClose={setOpen} />}
      <h1 className="text-orange-300 dark:text-slate-950 font-bold text-xl">
        Surviving Mars: One Organized Task at a Time
      </h1>
      <button
        onClick={handleAddTaskForm}
        className="p-2 rounded-md text-orange-50 flex dark:text-slate-800 hover:bg-orange-200"
        type="button"
      >
        <svg
          className="w-6 h-6 text-orange-300 dark:text-slate-800 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14m-7 7V5"
          />
        </svg>
        <span>Add Task</span>
      </button>
    </header>
  );
};

export default Header;

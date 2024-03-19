"use client";
import React, { useState } from "react";
import AddTaskModal from "@/app/components/modals/AddTaskModal";
import useDisclosure from "@/app/hooks/useDisclosure";

/*
At the top of the page, there should be a coloured header bar containing a witty title
which maintains it's position as you scroll through the application.
*/

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <header className="flex justify-between items-center z-50 top-0 left-0 w-full p-4 sticky bg-[#FF9119]   px-5 py-2.5">
        {isOpen && <AddTaskModal open={isOpen} onClose={onClose} />}
        <h1 className="text-slate-950 font-extrabold text-xl">Surviving Mars: One Organized Task at a Time</h1>
        <button
          data-testid="mainAddBtn"
          onClick={onOpen}
          className="flex flex-row text-slate-900 hover:text-white border border-slate-900 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-700 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  font-bold"
          type="button"
        >
          <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
          </svg>
          Add Task
        </button>
      </header>
    </nav>
  );
};

export default Header;

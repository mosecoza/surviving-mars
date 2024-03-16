import React from "react";
import { Task } from "../interfaces/Task";
import { useTasksStore } from "../store/useTasks";
import { useUsersStore } from "../store/users";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const { deleteTask } = useTasksStore();
  const {getUserById} = useUsersStore()
  return (
    <div
      key={task.id}
      className=" my-4 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-gray-300 hover:dark:bg-neutral-800/30"
    >
      <div className="flex items-center justify-between lg:flex-row sm:flex-col xs:flex-col mb-4 ">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white capitalize">
          {task.title}
        </h5>
        <p className="text-sm font-light ">
          Assigned to: <b>{getUserById(task.assignedTo)?.name??"User not found"}</b>
        </p>
      </div>
      <p className={`m-0 text-sm opacity-50 capitalize line-clamp-2`}>{task.description}</p>
      <div className="flex items-center justify-between   border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
        <p className="text-sm font-light">
          By: <b>{getUserById(task.createdBy)?.name??"User not found"}</b>
        </p>
        <div className="flex items-center justify-between">
          <button
            onClick={() => deleteTask(task.id)}
            className={`m-0 max-w-[30ch] text-sm opacity-50 mr-2 hover:underline text-red-600`}
          >
            Delete
          </button>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View
          </a>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
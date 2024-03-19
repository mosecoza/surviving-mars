import React from "react";
import { Task } from "@/app/interfaces/Task";
import useDisclosure from "@/app/hooks/useDisclosure";
import { useTasksStore } from "@/app/store/useTasks";
import { useUsersStore } from "@/app/store/useUsers";
import AlertModal from "@/app/components/modals/AlertModal";
import { CardButton } from "./CardButton";
import AddTaskModal from "./modals/AddTaskModal";

interface Props {
  task?: Task;
}

const TaskCard = ({ task }: Props) => {
  const { isOpen: isOpenDeleteAlert, onOpen: onOpenDeleteAlert, onClose: onCloseDeleteAlert } = useDisclosure();

  const { isOpen: isOpenUpdateModal, onOpen: onOpenUpdateModal, onClose: onCloseUpdateModal } = useDisclosure();
  const { isOpen: isOpenViewModal, onOpen: onOpenViewModal, onClose: onCloseViewModal } = useDisclosure();

  const { deleteTask } = useTasksStore();
  const { getUserById } = useUsersStore();

  const handleDeleteTask = () => {
    deleteTask(task?.id ?? "");
    onCloseDeleteAlert();
  };

  return (
    <>
      {task ? (
        <div
          key={task.id}
          className=" my-4 group rounded-lg border  px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-gray-300 hover:dark:bg-neutral-800/30"
        >
          {isOpenDeleteAlert && (
            <AlertModal
              isOpen={isOpenDeleteAlert}
              message={`Are you sure you want to delete this task?`}
              onClose={onCloseDeleteAlert}
              handleContinue={handleDeleteTask}
            />
          )}
          {isOpenUpdateModal && <AddTaskModal currentTask={task} open={isOpenUpdateModal} onClose={onCloseUpdateModal} />}
          <div className="flex items-center justify-between lg:flex-row sm:flex-col xs:flex-col mb-4 ">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white capitalize">{task.title}</h5>
            <p className="text-sm font-light ">
              Assigned to: <b>{getUserById(task.assignedTo)?.name ?? "User not found"}</b>
            </p>
          </div>
          <p className={`m-0 text-sm opacity-50 capitalize line-clamp-2`}>{task.description}</p>
          <div className="flex items-center justify-between   border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
            <p className="text-sm font-light">
              By: <b>{getUserById(task.createdBy)?.name ?? "User not found"}</b>
            </p>
            <div className="flex items-center justify-between">
              <CardButton variant="primary" title="View" handleClick={onOpenViewModal} />
              <CardButton variant="warning" title="Update" handleClick={onOpenUpdateModal} />
              <CardButton variant="danger" title="Delete" handleClick={onOpenDeleteAlert} />
            </div>
          </div>
        </div>
      ) : (
        <div className=" my-4 group rounded-lg border-2 border-dashed  px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 border-gray-50 dark:border-gray-800 hover:dark:bg-neutral-800/30">
          {isOpenUpdateModal && <AddTaskModal open={isOpenUpdateModal} onClose={onCloseUpdateModal} />}
          <div className="mb-4 ">
            <div className="h-4 bg-gray-300  dark:bg-gray-800 w-full"></div>
          </div>
          <div className="flex items-center justify-center h-24 w-full ">
            <button
              onClick={onOpenUpdateModal}
              className="flex flex-row text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900"
              type="button"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
              </svg>
              Add Task
            </button>
          </div>
          <div className=" border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-800 w-full"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;

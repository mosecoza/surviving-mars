import React, { useEffect } from "react";
import { Task } from "@/app/interfaces/Task";
import useDisclosure from "@/app/hooks/useDisclosure";
import { useTasksStore } from "@/app/store/useTasks";
import { useUsersStore } from "@/app/store/users";
import AlertModal from "@/app/components/modals/AlertModal";
import { CardButton } from "./CardButton";
import AddTaskModal from "./modals/AddTaskModal";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const {
    isOpen: isOpenDeleteAlert,
    onOpen: onOpenDeleteAlert,
    onClose: onCloseDeleteAlert,
  } = useDisclosure();

  const {
    isOpen: isOpenUpdateModal,
    onOpen: onOpenUpdateModal,
    onClose: onCloseUpdateModal,
  } = useDisclosure();
  const {
    isOpen: isOpenViewModal,
    onOpen: onOpenViewModal,
    onClose: onCloseViewModal,
  } = useDisclosure();

  const { deleteTask } = useTasksStore();
  const { getUserById } = useUsersStore();

  const handleDeleteTask = () => {
    deleteTask(task.id);
    onCloseDeleteAlert();
  };

  return (
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
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white capitalize">
          {task.title}
        </h5>
        <p className="text-sm font-light ">
          Assigned to:{" "}
          <b>{getUserById(task.assignedTo)?.name ?? "User not found"}</b>
        </p>
      </div>
      <p className={`m-0 text-sm opacity-50 capitalize line-clamp-2`}>
        {task.description}
      </p>
      <div className="flex items-center justify-between   border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
        <p className="text-sm font-light">
          By: <b>{getUserById(task.createdBy)?.name ?? "User not found"}</b>
        </p>
        <div className="flex items-center justify-between">
          <CardButton variant="primary" title="View" handleClick={onOpenViewModal} />
          <CardButton variant="warning" title="Update" handleClick={onOpenUpdateModal} />
          <CardButton
            variant="danger"
            title="Delete"
            handleClick={onOpenDeleteAlert}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

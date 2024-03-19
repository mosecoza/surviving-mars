import { Task } from "@/app/interfaces/Task";
import { useTasksStore } from "../../store/useTasks";
import { useUsersStore } from "../../store/useUsers";
import { generateTaskId } from "../../utils/generateTaskId";
import React, { ChangeEvent, FormEvent, useState } from "react";
interface Props {
  open: boolean;
  onClose: () => void;
  currentTask?: Task;
}

const AddTaskModal = ({ open = false, currentTask, onClose }: Props) => {
  const { users, currentUser } = useUsersStore();
  const { addTask, updateTask } = useTasksStore();
  const [saveError, setSaveError] = useState(false);
  const [task, setTask] = useState<Task>(
    currentTask ?? {
      id: generateTaskId(),
      createdBy: currentUser?.id ?? 0,
      description: "",
      assignedTo: 0,
      title: "",
    }
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    const { value, id } = e.target;
    setTask((state) => ({
      ...state,
      [id]: id == "assignedTo" ? Number(value) ?? 0 : value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!task.createdBy) {
      setSaveError(true);
      return;
    } else {
      currentTask ? updateTask(task) : addTask({ ...task, id: generateTaskId() });
      onClose();
    }
  };

  return (
    <div
      aria-roledescription="dialog"
      role="dialog"
      id="defaultModal"
      data-testid="addTaskModal"
      tabIndex={-1}
      aria-hidden={!open}
      className={`${
        open ? "block" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white sen">{`${currentTask ? "Update Task" : "Add New Task"}`}</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
              onClick={onClose}
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4 ">
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </label>
                <input
                  value={task?.title}
                  onChange={handleChange}
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Title of the task"
                  required
                />
              </div>
              <div className="my-4">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write task description here"
                  value={task?.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="assign" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Assign
                </label>
                <select
                  value={task?.assignedTo}
                  onChange={handleChange}
                  id="assignedTo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {saveError && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                We were not able to save this task, please reload the page and try again in a few minutes
              </div>
            )}

            <button
              type="submit"
              className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Save new task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;

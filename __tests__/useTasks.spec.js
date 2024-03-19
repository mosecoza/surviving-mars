import { useTasksStore } from "../app/store/useTasks";
import { renderHook } from "@testing-library/react";

const { act } = require("@testing-library/react");

describe("useTasksStore can mock users", () => {
  test("initial state has empty tasks array", () => {
    const { result } = renderHook(() => useTasksStore());

    expect(result.current.tasks).toEqual([]); // Empty tasks array initially
  });

  test("addTask adds a new task to the store", async () => {
    const { result } = renderHook(() => useTasksStore());

    const newTask = { id: "1", title: "Fix the spaceship" };
    await act(async () => await result.current.addTask(newTask));

    expect(result.current.tasks).toEqual([newTask]); // Task should be added
  });

  test("updateTask updates an existing task", async () => {
    const { result } = renderHook(() => useTasksStore());

    const initialTask = { id: "1", title: "Fix the spaceship" };
    const updatedTask = { ...initialTask, title: "Gather resources" };

    result.current.tasks = [initialTask]; // Set initial state (optional for isolation)
    await act(async () => await result.current.updateTask(updatedTask));

    expect(result.current.tasks[0]).toEqual(updatedTask); // Updated task should be reflected
  });

  test("deleteTask removes a task by ID", async () => {
    const { result } = renderHook(() => useTasksStore());

    const tasks = [
      { id: "1", title: "Task 1" },
      { id: "2", title: "Task 2" },
    ];

    result.current.tasks = tasks; // Set initial state with multiple tasks

    const taskIdToDelete = "1";
    await act(async () => await result.current.deleteTask(taskIdToDelete));

    expect(result.current.tasks).toEqual([tasks[1]]); // Task with deleted ID should be gone
  });

  test("deleteAllTasks removes all tasks", async () => {
    const { result } = renderHook(() => useTasksStore());

    const tasks = [
      { id: "1", title: "Task 1" },
      { id: "2", title: "Task 2" },
    ];

    result.current.tasks = tasks; // Set initial state with multiple tasks
    await act(async () => await result.current.deleteAllTasks());

    expect(result.current.tasks).toEqual([]); // All tasks should be removed
  });
});

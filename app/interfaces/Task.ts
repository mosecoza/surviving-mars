
/*
These tasks should be stored in the application, and contain a title, a description
the name of the user who created the task, and the name of the person to whom the task is assigned.
*/

export interface Task {
    id: string; // Unique identifier for the task
    title: string;
    description: string;
    createdBy: number;
    assignedTo: number;
  }
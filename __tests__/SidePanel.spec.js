import React from 'react';
import { render, screen } from '@testing-library/react';
import { SidePanel } from '../app/components/SidePanel';
import { beforeEach, describe } from 'node:test';

describe("side panel test items ", () => {
  const mockCurrentUser = { name: 'John Doe' };
  const mockTasks = [{ id: 1 }, { id: 2 }];


// mocking state integration on components will require the use of context api
  test('renders side panel with username', async () => {


    render(<SidePanel  />);


    const usernameElement = screen.getByTestId("currentUser");

    expect(usernameElement.innerHTML).toBe(mockCurrentUser.name);
  });

  test('renders number of tasks', () => {
    render(<SidePanel />);

    const tasksCount = screen.getByTestId("numberOfTasks");

    expect(tasksCount.innerHTML).toBe(mockTasks.length.toString());
  });
})

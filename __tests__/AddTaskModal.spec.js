import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddTaskModal from '../app/components/modals/AddTaskModal';
// import { useTasksStore } from "../app/store/useTasks";
// import { renderHook } from "@testing-library/react";

test('renders modal closed initially', () => {
    render(<AddTaskModal open={false} onClose={() => {}} />);
  
    const modal = screen.getByRole('dialog', { hidden: true }); 
    expect(modal).toBeDefined(); 
    expect(modal.className).toContain("hidden");
    expect(modal.className).not.toContain("block"); 
  });
  
  test('opens modal when isOpen prop is true', () => {
    render(<AddTaskModal open={true} onClose={() => {}} />);
  
    const modal = screen.getByRole('dialog');
  
    expect(modal).toBeDefined();
    expect(modal.className).toContain("block"); 
    expect(modal.className).toMatchSnapshot("block overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"); 
  });

  test('fills task title and description', () => {
    render(<AddTaskModal open={true} onClose={() => {}} users={[]} />);
  
    const titleInput = screen.getByLabelText('Title');
    const descriptionInput = screen.getByLabelText('Description');
  
    fireEvent.change(titleInput, { target: { value: 'New Task Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'This is a new task description' } });
  
    expect(screen.getByDisplayValue('New Task Title')).toBeDefined();
    expect(screen.getByDisplayValue('This is a new task description')).toBeDefined();
  });
  
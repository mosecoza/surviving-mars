import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardButton } from '../app/components/CardButton';


test('renders button with correct text and class based on variant', async () => {
    const {getByTestId} = render(<CardButton title="Click me" variant="warning" />);
     
    const button = await getByTestId('btn-warning'); 

    expect(button).toBeDefined(); 
    expect(button.innerHTML).toBe('Click me'); 
    expect(button.className).toBe('text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2 dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900'); 
  });

  test('calls handleClick prop on button click', () => {
    const mockHandleClick = jest.fn();
  
    const { getByTestId } = render(<CardButton title="Click me" handleClick={mockHandleClick} />);
  
    const button = getByTestId('btn-primary'); 
  
    fireEvent.click(button);
  
    expect(mockHandleClick).toHaveBeenCalledTimes(1); 
  });
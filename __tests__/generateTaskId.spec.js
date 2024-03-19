import { generateTaskId } from '../app/utils/generateTaskId';

test('generateTaskId returns a string', () => {
  const taskId = generateTaskId();

  expect(typeof taskId).toBe('string'); 
});

/*
test('generated task ID has a specific length', () => {
  const taskId = generateTaskId();

  expect(taskId.length).toBe(13); 
});
*/

test('generated task ID contains alphanumeric characters', () => {
  const taskId = generateTaskId();

  const regex = /^[a-z0-9]+$/; 

  expect(regex.test(taskId)).toBe(true); 
});
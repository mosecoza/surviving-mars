import '@testing-library/jest-dom';
import { useUsersStore } from '../app/store/useUsers';
import { act, renderHook } from '@testing-library/react';
import mockUsers from '../app/constants/users.mock.json';

describe("useUsersStore can mock users", () => {

    test('getUsers fetches users and updates store', async () => {
        const { result } = renderHook(() => useUsersStore());

        expect(result.current.users).toEqual([]); 

        await act(async () => {
            await result.current.getUsers() 
        });
        expect(result.current.users).toEqual(mockUsers); 
    });

    test('getCurrentUser sets a random user', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useUsersStore());

        expect(result.current.currentUser).toBeNull(); 

        await act(async () => await result.current.getCurrentUser());
        
        expect(result.current.currentUser).not.toBeNull(); 
        expect(result.current.currentUser.id).toBeGreaterThanOrEqual(1); 
    });

    test('getUserById returns the correct user', async () => {
        const { result } = renderHook(() => useUsersStore());

        await act(async () => {
            const user = await result.current.getUserById(1);

            expect(user).toEqual(mockUsers[0]); 
        });
    });
});
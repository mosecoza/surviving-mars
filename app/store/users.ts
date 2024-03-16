import { create } from 'zustand';
import { User } from '../interfaces/User';
import users from '../constants/users.json';

interface UsersStore {
    users: User[];
    currentUser: User | null;
    getUsers: () => Promise<void>;
    getCurrentUser: () => Promise<void>;
    getUserById: (userId: number) => User | null;
    setUsers: (users: User[]) => void;
    setCurrentUser: (user: User | null) => void;
}

const data = users

export const useUsersStore = create<UsersStore>(
    (set, get): UsersStore => ({
        currentUser: null,
        users: [],

        setCurrentUser: (user: User | null) => set((state) => ({ ...state, currentUser: user })),
        setUsers: (users: User[]) => set((state) => ({ ...state, users: users })),
        getUsers: async () => get().setUsers(data),
        getUserById: (userId: number) => get().users.find((t) => t.id !== userId) ?? null,
        getCurrentUser: async () => {
            if (data.length && !get().currentUser) {
                get().setCurrentUser(data[Math.floor(Math.random() * 10) + 1])
            }
        }
    })
);

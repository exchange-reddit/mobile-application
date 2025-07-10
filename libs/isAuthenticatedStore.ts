import { create } from 'zustand';

export const useIsAuthenticated = create((set) => ({
    isAuthenticated: false,
    updateIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
}));

import { create } from 'zustand';

// 1. Define the shape of the registration state
interface RegistrationState {
    username: string;
    lastName: string;
    firstName: string;
    nationality: string;
    dateOfBirth: string; // Storing as string (e.g., "YYYY-MM-DD"). Consider 'Date' type if more complex date handling is needed.
    preferredLanguage: string;
    gender: string;
    homeUniversityEmail: string;
    exchangeUniversityEmail: string;
    password: string;
}

// 2. Define the actions that can be performed on the state
interface RegistrationActions {
    setUsername: (username: string) => void;
    setLastName: (lastName: string) => void;
    setFirstName: (firstName: string) => void;
    setNationality: (nationality: string) => void;
    setDateOfBirth: (dateOfBirth: string) => void;
    setPreferredLanguage: (preferredLanguage: string) => void;
    setGender: (gender: string) => void;
    setHomeUniversityEmail: (email: string) => void;
    setExchangeUniversityEmail: (email: string) => void;
    setPassword: (password: string) => void;
    reset: () => void; // Function to reset all fields to their initial state
}

// 3. Combine state and actions into a single type for the store
type RegistrationStore = RegistrationState & RegistrationActions;

// 4. Initial state for the registration data, conforming to RegistrationState
const initialState: RegistrationState = {
    username: 'Brandon',
    lastName: '',
    firstName: '',
    nationality: '',
    dateOfBirth: '',
    preferredLanguage: '',
    gender: '',
    homeUniversityEmail: '',
    exchangeUniversityEmail: '',
    password: '',
};

/**
 * Zustand store hook for managing user registration data.
 *
 * This hook provides state variables and setter functions for all
 * user registration fields, as well as a reset function to clear the form.
 * It is fully typed with TypeScript for better development experience.
 */
export const useRegistrationStore = create<RegistrationStore>((set) => ({
    ...initialState, // Initialize the store with the defined initial state

    // Setter functions for each individual field
    setUsername: (username) => set({ username }),
    setLastName: (lastName) => set({ lastName }),
    setFirstName: (firstName) => set({ firstName }),
    setNationality: (nationality) => set({ nationality }),
    setDateOfBirth: (dateOfBirth) => set({ dateOfBirth }),
    setPreferredLanguage: (preferredLanguage) => set({ preferredLanguage }),
    setGender: (gender) => set({ gender }),
    setHomeUniversityEmail: (homeUniversityEmail) =>
        set({ homeUniversityEmail }),
    setExchangeUniversityEmail: (exchangeUniversityEmail) =>
        set({ exchangeUniversityEmail }),
    setPassword: (password) => set({ password }),

    // Reset all fields to their initial empty state
    reset: () => set(initialState),
}));

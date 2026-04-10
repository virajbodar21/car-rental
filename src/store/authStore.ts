import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string): Promise<boolean> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simple demo authentication
        if (password === 'password') {
          // Find user by email (in real app, this would be an API call)
          const users = [
            {
              id: '1',
              name: 'John Doe',
              email: 'john@example.com',
              phone: '+1234567890',
              role: 'user' as const,
              createdAt: new Date('2023-01-15')
            },
            {
              id: '2',
              name: 'Admin User',
              email: 'admin@carrental.com',
              phone: '+1234567891',
              role: 'admin' as const,
              createdAt: new Date('2023-01-01')
            }
          ];

          const foundUser = users.find(u => u.email === email);
          if (foundUser) {
            set({ user: foundUser, isAuthenticated: true });
            return true;
          }
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      register: async (name: string, email: string, phone: string, _password: string): Promise<boolean> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In a real app, this would create a new user
        const newUser: User = {
          id: Date.now().toString(),
          name,
          email,
          phone,
          role: 'user',
          createdAt: new Date()
        };

        set({ user: newUser, isAuthenticated: true });
        return true;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
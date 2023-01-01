import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

interface User {
  name: string;
  email: string;
  avatar: string;
  date?: Date;
}

const authStore = (set: any) => ({
  userProfile: null,

  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;

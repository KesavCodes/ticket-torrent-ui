import { create } from "zustand";
import { fetchMyDetails } from "../utils/https";

interface AuthStore {
  user: string | null;
  login: (id: string) => void;
  logout: () => void;
  validate: () => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  let userTt = localStorage.getItem("userTt");
  if (userTt) userTt = JSON.parse(userTt);

  return {
    user: userTt,
    login: (id: string) => {
      if (!id) return;
      localStorage.setItem("userTt", JSON.stringify(id));
      set({ user: id });
    },
    logout: () => {
      localStorage.removeItem("userTt");
      set({ user: null });
    },
    validate: async () => {
      try {
        await fetchMyDetails({});
      } catch (err) {
        console.log(err);
        set({ user: null });
      }
    },
  };
});

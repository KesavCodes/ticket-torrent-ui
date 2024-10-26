import { create } from "zustand";

interface AuthStore {
  user: string | null;
  login: (id: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  let userTt = localStorage.getItem("userTt");
  console.log("userTt:" + userTt);
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
  };
});

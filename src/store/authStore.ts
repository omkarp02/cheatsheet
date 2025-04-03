import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface AuthState {
  token: string | null;
}

export interface AuthAction {
  setToken: (token: string) => void;
  handleLogout: () => void;
}

interface AuthStore extends AuthState {
  actions: AuthAction;
}

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      immer((set) => ({
        token: null,
        actions: {
          setToken: (token: string) => {
            set({ token });
          },
          handleLogout: () => {
            set({ token: "" });
          },
        },
      })),
      {
        name: "auth",
      }
    )
  )
);

let persistedToken: string | null = null;
export const getTokenFromAuthStore = () => {
  if (!persistedToken) {
    const { token } = useAuthStore.getState();
    persistedToken = token;
    return token;
  } else {
    return persistedToken;
  }
};

export const useToken = () => useAuthStore((state) => state.token);
export const useAuthActions = () => useAuthStore((state) => state.actions);

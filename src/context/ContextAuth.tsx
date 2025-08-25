"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UseAuth, User } from "../types/types";
import { obj_user } from "../utils/user";
import { get_user } from "@/services/get_user";

const ContextAuth = createContext<UseAuth | null>(null);

export const useAuth = (): UseAuth => {
  const context = useContext(ContextAuth);
  if (!context) throw new Error("context auth problem");
  return context;
};

export default function ProviderAuth({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(obj_user);

  useEffect(() => {
    const getSession = async () => {
      const data = await get_user();
      const user = data?.session?.user;

      if (user) {
        setUser({
          user_id: user.id,
          email: user.user_metadata.email,
          picture: user.user_metadata.avatar_url,
          name: user.user_metadata.full_name,
        });
      } else {
        console.log("No hay sesión activa");
      }
    };
    getSession();
  }, []);

  return (
    <ContextAuth.Provider value={{ user }}>{children}</ContextAuth.Provider>
  );
}

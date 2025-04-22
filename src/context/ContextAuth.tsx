"use client"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UseAuth, User } from "../types/types";
import { supabase } from "../supabase/supabase";
import { obj_user } from "../utils/user";

const ContextAuth = createContext<UseAuth | null>(null);

export const useAuth = (): UseAuth => {
  const context = useContext(ContextAuth);
  if (!context) throw new Error("context auth problem");
  return context;
};

export default function ProviderAuth({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(obj_user);

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://cms-your-blog.vercel.app",
      },
    });

    if (error) {
      console.error("Error al iniciar sesión", error.message);
    }
    console.log(data);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error al cerrar sesión", error.message);
    setUser(obj_user);
  };

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error al obtener la sesión", error.message);
        return;
      }

      const user = data.session?.user;

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
    <ContextAuth.Provider value={{ user, login, logout }}>
      {children}
    </ContextAuth.Provider>
  );
}

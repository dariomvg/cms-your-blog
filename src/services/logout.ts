import { supabase } from "@/supabase/supabase";

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Error al cerrar sesión", error.message);
};

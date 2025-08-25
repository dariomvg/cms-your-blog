import { supabase } from "@/supabase/supabase";

export const get_user = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error al obtener la sesión", error.message);
    return;
  }
  return data;
};

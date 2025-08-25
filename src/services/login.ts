import { supabase } from "@/supabase/supabase";
import { url_app } from "@/utils/options";

export const login = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: url_app,
    },
  });
  console.log(data)
  if (error) {
    console.error("Error al iniciar sesión", error.message);
  }
  return data;
};

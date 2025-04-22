import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "../utils/options";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

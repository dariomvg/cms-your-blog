import { supabase } from "@/supabase/supabase";

export const get_post_api = async (user_id: string, id: string) => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", user_id)
    .eq("is_public", true)
    .eq("id", id);

  if (error) {
    console.log(error);
  }

  return posts;
};

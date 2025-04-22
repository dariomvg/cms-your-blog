import { supabase } from "@/supabase/supabase";

export const get_posts = async (userId: string) => {
  let { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.log(error);
  }

  return posts;
};

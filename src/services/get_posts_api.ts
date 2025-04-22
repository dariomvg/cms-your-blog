import { supabase } from "@/supabase/supabase";

export const get_posts_api = async (id: string) => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", id)
  .eq("is_public", true);

  if (error) {
    console.log(error);
  }

  return posts;
};

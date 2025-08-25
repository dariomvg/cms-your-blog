import { supabase } from "@/supabase/supabase";
import { Post } from "@/types/types";

export const update_post = async (post: Post) => {
  const { data, error } = await supabase
    .from("posts")
    .update(post)
    .eq("id", post.id)
    .select();
    if (error) console.log(error);
  return data;
};

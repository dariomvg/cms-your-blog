import { supabase } from "@/supabase/supabase";

export const get_posts = async () => {
  let { data: posts, error } = await supabase
    .from("posts")
    .select("*")
  if (error) {
    console.log(error);
  }

  return posts;
};

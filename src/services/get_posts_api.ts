import { supabase } from "@/supabase/supabase";

export const get_posts_api = async (id: string) => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .match({ is_public: true, user_id: id });

  if (error) {
    console.log(error);
  }

  return posts;
};

import { supabase } from "@/supabase/supabase";

export const get_post = async (id: number) => {
  let { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id);

  if (error) console.log(error);
  return post;
};

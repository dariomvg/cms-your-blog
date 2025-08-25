import { supabase } from "@/supabase/supabase";
import { Post } from "@/types/types";

export const get_post = async (id: number): Promise<Post | null> => {
  let { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id);

  if (error) console.log(error);
  return post !== null ? post[0] : null;
};

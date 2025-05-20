import { supabase } from "@/supabase/supabase";

export const upload_post = async (post: {
  title: string;
  user_id: string
  description: string;
  keyboards: string;
  is_public: boolean;
  content: string;
  created_at: string;
}) => {
  console.log(post)
  const { data, error } = await supabase.from("posts").insert([post]).select();
  if (error) console.log(error);
  return data;
};

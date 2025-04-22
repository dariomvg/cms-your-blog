import { supabase } from "@/supabase/supabase";

export const delete_post = async (id: number) => {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) console.log(error);

  return {ok: true, message: "Deleted successful"};
};

export const supabaseUrl = "https://qfrudnubgrnnvqhlhbqb.supabase.co";
if (!process.env.NEXT_PUBLIC_DATABASE_KEY) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_DATABASE_KEY");
}
export const supabaseKey = process.env.NEXT_PUBLIC_DATABASE_KEY;
export const url_app =
  process.env.NEXT_PUBLIC_URL_APP ?? "http://localhost:3000";

export const api_all_posts = `${url_app}/api/public/posts/your_user_id`;
export const api_unique_post = `${url_app}/api/public/post?id=id-post&user_id=user-id`;


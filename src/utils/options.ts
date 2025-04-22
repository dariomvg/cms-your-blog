export const supabaseUrl = "https://qfrudnubgrnnvqhlhbqb.supabase.co";
if (!process.env.NEXT_PUBLIC_DATABASE_KEY) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_DATABASE_KEY");
}
export const supabaseKey = process.env.NEXT_PUBLIC_DATABASE_KEY;
export const urlApp = process.env.PORT ?? "http://localhost:5173"
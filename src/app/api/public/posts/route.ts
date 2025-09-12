// domain/api/public/posts?user_id=""

import { get_posts_api } from "@/services/get_posts_api";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");

  try {
    if (!userId) {
      return NextResponse.json(
        { error: "Missing user_id" },
        { status: 400, headers: corsHeaders }
      );
    }

    const posts = await get_posts_api(userId);

    return NextResponse.json(posts, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500, headers: corsHeaders }
    );
  }
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// domain/api/public/posts?user_id=""

import { get_posts_api } from "@/services/get_posts_api";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");

  try {
    if(!userId) return;
    const posts = await get_posts_api(userId);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

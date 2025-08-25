// domain/api/public/posts/user-id

import { get_posts_api } from "@/services/get_posts_api";
import { NextResponse } from "next/server";

interface Params {
  userId : string
}

export async function GET(
  req: Request,
   context: { params: Params }
) {
  const { userId } = context.params;

  try {
    const posts = await get_posts_api(userId);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

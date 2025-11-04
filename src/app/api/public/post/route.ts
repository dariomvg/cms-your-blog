// domain/api/public/post?id=postID&user_id=userID

import { get_post_api } from "@/services/get_post_api";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const userId = searchParams.get("user_id");

  try {
    if (!userId || !id) {
      return NextResponse.json(
        { message: "No se encontró id user y id post" },
        { status: 400, headers: corsHeaders }
      );
    }

    const post = await get_post_api(userId, id);

    return NextResponse.json(post, { headers: corsHeaders });
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


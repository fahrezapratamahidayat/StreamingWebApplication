import { addMyList } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const req = await request.json();
  const result = await addMyList(req.id, req.watchlistItem);
  try {
    return NextResponse.json({
      status: result.status,
      message: result.message,
    });
  } catch (error) {
    return NextResponse.json({ error: "test" }, { status: 500 });
  }
}

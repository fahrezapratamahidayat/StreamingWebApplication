import { AddWatchList } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
if (key === process.env.NEXT_PUBLIC_API_KEY) {
    try {
      const req = await request.json();
      const result = await AddWatchList(req.email, req.watchlistItem);
      return NextResponse.json(
        { status: result.status, message: result.message },
        { status: result.statusCode }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

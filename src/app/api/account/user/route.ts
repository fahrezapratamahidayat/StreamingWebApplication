import { AddWatchList, GetDataUSer } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const key = searchParams.get("key");

  if (email && key === process.env.NEXT_PUBLIC_API_KEY) {
    try {
      const result = await GetDataUSer(email);
      return NextResponse.json(
        { status: result.status, message: result.message, user: result.user },
        { status: result.statusCode }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { status: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
}

import { AddWatchList, getUserId } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    try {
      const result = await getUserId(id);
      return NextResponse.json(
        { status: result.status, message: result.message, user: result.user },
        { status: result.status }
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

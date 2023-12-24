import { AddWatchList, GetDataUSer } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (email) {
    const result = await GetDataUSer(email);
    return NextResponse.json(
      { status: result.status, message: result.message, user: result.user },
      { status: result.statusCode }
    );
  } else {
    return NextResponse.json(
      { status: false, message: "Email not found" },
      { status: 404 }
    );
  }
}

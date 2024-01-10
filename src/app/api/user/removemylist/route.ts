import { RemoveMyList } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const req =  await request.json();
    try {
        const result = await RemoveMyList(req.id, req.watchlistItem);
        return NextResponse.json({
          status: result.status,
          message: result.message,
        });
      } catch (error) {
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
}
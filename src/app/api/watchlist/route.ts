import { AddWatchList } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

// api/watchlist.ts

export async function POST(request: NextRequest) {
    try {
      const req = await request.json();
      const result = await AddWatchList(req.email, req.id);
      return NextResponse.json({status: result.status, message: result.message}, {status: result.statusCode});
    } catch (error) {
      console.error('Error in POST /api/watchlist:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  
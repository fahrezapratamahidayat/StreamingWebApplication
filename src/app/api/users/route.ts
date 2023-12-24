import { GetAllUsers } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const products = await GetAllUsers();
    return NextResponse.json({
      status: 200,
      message: "good Request",
      data: products,
    });
}
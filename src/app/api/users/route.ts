import { GetAllUsers } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const key = searchParams.get('key')
  if(key === process.env.NEXT_SECRET_KEY){
    const users = await GetAllUsers();
    return NextResponse.json({
      status: 200,
      message: "good Request",
      data: users,
    });
  }else{
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    });
  }
}
import { LoginUsers } from "@/lib/firebase/services";
import { NextResponse,NextRequest } from "next/server";

export async function POST(request:NextRequest){
    const req = await request.json();
    const result = await LoginUsers(req);
    return NextResponse.json({
        status: result?.status,
        statusCode: result?.statusCode,
        message: result?.message,
    });
}
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === `/tv/genre` ||
    request.nextUrl.pathname === `/movie/genre`
  ) {
    if (request.nextUrl.pathname.startsWith("/tv")) {
      return NextResponse.redirect(new URL(`/tv`, request.url));
    } else if (request.nextUrl.pathname.startsWith("/movies")) {
      return NextResponse.redirect(new URL(`/movies`, request.url));
    } else {
      return NextResponse.redirect(new URL(`/`, request.url));
    }
  }
}

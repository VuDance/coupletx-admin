import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname !== "/sign-in" &&
    request.nextUrl.pathname !== "/sign-up" &&
    !request.cookies.get("next-auth.session-token")
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/sign-in", "/categories", "/blogs/:path*"],
};

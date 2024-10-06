import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if ((pathname === "/login" || pathname === "/register") && request.cookies.has("userAuth"))
    return NextResponse.redirect(new URL("/", request.url));

  if ((pathname === "/" || pathname === "/accounts") && !request.cookies.has("userAuth"))
    return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/accounts", "/login", "/register"]
};

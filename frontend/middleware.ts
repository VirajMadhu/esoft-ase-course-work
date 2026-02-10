import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/my-orders", "/my-account", "/checkout"];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("auth_token")?.value;
    const { pathname } = request.nextUrl;

    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            const url = new URL("/login", request.url);
            url.searchParams.set("from", pathname);
            return NextResponse.redirect(url);
        }
    }

    if (pathname === "/login" && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/my-orders/:path*", "/my-account/:path*", "/checkout/:path*", "/login"],
};

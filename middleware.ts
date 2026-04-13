import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    let token = request.cookies.get("token")?.value;

    if (!token) {
        const authHeader = request.headers.get("authorization");
        if (authHeader?.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }
    }

    if (!token) {
        if (pathname.startsWith("/dashboard")) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET!)
        );

        const role = payload.role as string;

        if (
            (role === "admin" || role === "barber") &&
            pathname === "/"
        ) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        return NextResponse.next();

    } catch {
        return NextResponse.next(); // 👈 clave
    }
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

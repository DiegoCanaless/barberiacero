import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    // 👇 Intenta obtener token de la cookie
    let token = request.cookies.get("token")?.value;

    // 👇 Si no hay cookie, intenta obtener del header Authorization
    if (!token) {
        const authHeader = request.headers.get("authorization");
        if (authHeader?.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }
    }

    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    try {
        await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET!)
        );

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
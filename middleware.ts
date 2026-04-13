import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    let token = request.cookies.get("token")?.value;

    if (!token) {
        const authHeader = request.headers.get("authorization");
        if (authHeader?.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }
    }

    // 🟡 SI NO HAY TOKEN
    if (!token) {
        // Solo bloquea dashboard
        if (request.nextUrl.pathname.startsWith("/dashboard")) {
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

        // 🔴 BLOQUEAR LANDING PARA ADMIN/BARBER
        if (
            (role === "admin" || role === "barber") &&
            request.nextUrl.pathname === "/"
        ) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        return NextResponse.next();

    } catch {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

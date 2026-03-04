import Navbar from "@/components/layout/Navbar";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const token = (await cookies()).get("token")?.value;

    if (!token) redirect("/");

    try {
        await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET!)
        );
    } catch {
        redirect("/");
    }
    return (
        <>
            <Navbar forceDark />
            <main className="min-h-screen pt-20">
                {children}
            </main>
        </>
    );
}
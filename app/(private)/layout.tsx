
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "../globals.css";

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
            <main className="pt-24 min-h-screen">

                {children}
            </main>
        </>
    );
}
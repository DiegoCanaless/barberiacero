export const dynamic = "force-dynamic";

import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import Service from "@/components/sections/Service";
import History from "@/components/sections/History";
import Location from "@/components/sections/Location";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

export default async function HomePage() {

  const token = (await cookies()).get("token")?.value;

  if(token){
    try{
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!))

      const role = payload.role as string;

      if (role === "admin"  || role === "barber"){
        redirect("/dashboard")
      }

    } catch {

    }
  }

  return (
    <main className="transition-colors">
      <Hero/>
      <Service/>
      <Gallery/>
      <History/>
      <Location/>
    </main>
  );
}

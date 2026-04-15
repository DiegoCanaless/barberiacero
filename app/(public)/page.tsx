export const dynamic = "force-dynamic";

import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import Service from "@/components/sections/Service";
import History from "@/components/sections/History";
import Location from "@/components/sections/Location";
import RedirectIfLogged from "@/components/auth/RedirectIfLogged";

export default function HomePage() {
  return (
    <main className="transition-colors">

      <RedirectIfLogged />

      <Hero />
      <Service />
      <Gallery />
      <History />
      <Location />
    </main>
  );
}


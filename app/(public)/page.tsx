import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import Service from "@/components/sections/Service";
import History from "@/components/sections/History";
import Location from "@/components/sections/Location";

export default function HomePage() {
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

import Card from "@/components/Card";
import Carousal2 from "@/components/Carousal2";
import FAQs from "@/components/homepage/FAQs";
import Founded from "@/components/homepage/Founded";
import Hero from "@/components/homepage/Hero";
import Members from "@/components/homepage/Members";
import Home3rdSection from "@/containers/Home3rdSection";

export default function Page() {
  return (
    <main className="flex-grow">
      <Carousal2 />
      <Hero />
      <Founded />
      <Members />
      <Card />
      <FAQs />
      <Home3rdSection />
    </main>
  );
}

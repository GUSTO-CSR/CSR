import Card from "@/components/Card";
import Carousal from "@/components/Carousal";
import Carousal2 from "@/components/Carousal2";
import Home3rdSection from "@/containers/Home3rdSection";

export default function Page() {
  return (
    <main className="flex-grow">
      {/* <Carousal /> */}
      <Carousal2 />
      <Card />
      <Home3rdSection />
    </main>
  );
}

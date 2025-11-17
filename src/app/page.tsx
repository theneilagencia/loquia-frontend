import Hero from "./components/Hero";
import Era from "./components/Era";
import Plans from "./components/Plans";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Era />
      <Plans />
    </main>
  );
}

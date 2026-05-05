import { Fitur } from "./components/kudamas/fitur";
import { Harga } from "./components/kudamas/harga";
import { Hero } from "./components/kudamas/hero";
import { Navbar } from "./components/kudamas/navbar";
import { PainPoints } from "./components/kudamas/pain-points";
import { Penutup } from "./components/kudamas/penutup";
import { Proses } from "./components/kudamas/proses";
import { Solusi } from "./components/kudamas/solusi";

export default function KudamasPitch() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Solusi />
        <Fitur />
        <Proses />
        <Harga />
        <Penutup />
      </main>
    </>
  );
}

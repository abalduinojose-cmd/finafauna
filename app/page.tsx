import Avaliacoes from "@/components/sections/Avaliacoes";
import BanhoTosa from "@/components/sections/BanhoTosa";
import Categorias from "@/components/sections/Categorias";
import Delivery from "@/components/sections/Delivery";
import Hero from "@/components/sections/Hero";
import Instagram from "@/components/sections/Instagram";
import Marcas from "@/components/sections/Marcas";
import Sobre from "@/components/sections/Sobre";
import Unidades from "@/components/sections/Unidades";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marcas />
      <Categorias />
      <Delivery />
      <Sobre />
      <BanhoTosa />
      <Instagram />
      <Avaliacoes />
      <Unidades />
    </main>
  );
}

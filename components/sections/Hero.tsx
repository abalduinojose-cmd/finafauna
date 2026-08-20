import Image from "next/image";
import { ArrowDown, PawPrint, Scissors, Store, Truck, Wheat } from "lucide-react";
import HeroVideo from "@/components/sections/HeroVideo";
import Button from "@/components/ui/Button";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import { WhatsAppIcon } from "@/components/ui/icons";

// Estilo "stat": destaque grande em gradiente + rótulo pequeno embaixo,
// um por vez no rotador.
const BENEFICIOS = [
  { icone: Truck, destaque: "Entrega em casa", rotulo: "na região, combinada no WhatsApp" },
  { icone: Wheat, destaque: "Ração no KG", rotulo: "delivery a granel, na medida certa" },
  { icone: Store, destaque: "2 lojas", rotulo: "Posse e Pedro do Rio" },
  { icone: Scissors, destaque: "Tia Jessica", rotulo: "banho e tosa com hora marcada" },
];

// Hero de vídeo em destaque (padrão Cabana Afrodite/Quesia): o vídeo ocupa a
// tela inteira, o conteúdo desce para a base e o véu escurece só onde o
// texto pisa, deixando a cena aparecer.
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-noite"
    >
      {/* vídeo em destaque: o pôster já vem no HTML (nada de fundo verde na
          chegada) e o vídeo entra por cima; contraste leve só na base */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/videos/hero-palmeiras-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover lg:hidden"
        />
        <Image
          src="/videos/hero-fachada-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover lg:block"
        />
        <div className="absolute inset-0">
          <HeroVideo />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-noite/85 via-noite/40 to-transparent" />
      </div>
      <div className="paw-texture absolute inset-0 opacity-[0.02]" aria-hidden />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-4 pb-10 pt-32 sm:px-6 sm:pb-14">
        <h1 className="sobe max-w-4xl text-balance font-display font-bold leading-[1.04] text-white [text-shadow:0_2px_30px_rgba(0,26,17,0.75),0_1px_3px_rgba(0,0,0,0.5)]">
          <span className="block text-[clamp(2.1rem,5.6vw,4.4rem)] font-semibold">
            Tudo para tornar
          </span>
          <span className="block text-[clamp(2.4rem,7.4vw,5.6rem)]">
            a vida do seu pet
          </span>
          <span className="block text-[clamp(2.4rem,7.4vw,5.6rem)] text-laranja [text-shadow:0_0_36px_rgba(232,82,30,0.55),0_2px_20px_rgba(0,0,0,0.5)]">
            mais feliz.
          </span>
        </h1>

        <p
          className="sobe mt-5 max-w-[46ch] text-pretty text-[0.95rem] font-medium leading-relaxed text-white [text-shadow:0_2px_18px_rgba(0,26,17,0.8)] sm:mt-6 sm:text-base"
          style={{ animationDelay: "120ms" }}
        >
          Ração, acessórios, medicamentos e banho e tosa, com atendimento de
          bairro e entrega na porta. Você chama no WhatsApp, a gente cuida do
          resto.
        </p>

        <div
          className="sobe mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center"
          style={{ animationDelay: "220ms" }}
        >
          {/* O botão "mais pet": pílula gorda com a patinha que balança */}
          <WhatsAppCta contexto="delivery" size="lg" className="group">
            <WhatsAppIcon className="size-5" />
            Pedir no WhatsApp
            <PawPrint className="balanca-hover size-5 fill-white/25" aria-hidden />
          </WhatsAppCta>
          <Button href="#unidades" variant="outline-light" size="lg" className="group">
            Conhecer as lojas
            <ArrowDown
              className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden
            />
          </Button>
        </div>
      </div>

      {/* Vantagens em rotador vertical: faixa sólida no verde da marca */}
      <div
        className="sobe relative border-t border-white/10 bg-floresta"
        style={{ animationDelay: "320ms" }}
      >
        <p className="sr-only">
          Entrega em casa na região, delivery de ração no KG, duas lojas em
          Petrópolis e banho e tosa com a Tia Jessica.
        </p>
        <div className="py-4">
          <div className="h-16 overflow-hidden" aria-hidden="true">
            <div className="gira-beneficios">
              {[...BENEFICIOS, BENEFICIOS[0]].map((b, i) => (
                <span
                  key={`${b.destaque}-${i}`}
                  className="flex h-16 flex-col items-center justify-center gap-1 px-6 text-center"
                >
                  <span className="flex items-center gap-2.5">
                    <b.icone className="size-5 shrink-0 text-laranja" aria-hidden />
                    <span className="bg-gradient-to-r from-laranja to-caramelo bg-clip-text font-display text-xl font-bold leading-none text-transparent sm:text-2xl">
                      {b.destaque}
                    </span>
                    {/* espelho do ícone: o texto fica centrado de verdade */}
                    <span className="size-5 shrink-0" aria-hidden />
                  </span>
                  <span className="text-center font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/70">
                    {b.rotulo}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

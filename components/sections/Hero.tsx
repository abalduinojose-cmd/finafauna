import { ArrowDown, PawPrint, Scissors, Store, Truck, Wheat } from "lucide-react";
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

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[78svh] flex-col overflow-hidden bg-gradient-to-b from-floresta to-noite"
    >
      <div className="paw-texture absolute inset-0 opacity-[0.025]" aria-hidden />
      <div
        className="absolute -right-40 -top-40 size-[34rem] rounded-full bg-caramelo/10 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-24">
        <h1 className="sobe max-w-4xl text-balance font-display font-bold leading-[1.06] text-white">
          <span className="block text-[clamp(1.7rem,4.6vw,3.4rem)] font-medium text-white/80">
            Tudo para tornar
          </span>
          <span className="block text-[clamp(2.1rem,6vw,4.4rem)]">
            a vida do seu pet
          </span>
          <span className="block text-[clamp(2.1rem,6vw,4.4rem)] text-laranja">
            mais feliz.
          </span>
        </h1>

        <p
          className="sobe mt-5 max-w-[46ch] text-pretty text-base leading-relaxed text-white/75 sm:mt-7 sm:text-lg"
          style={{ animationDelay: "120ms" }}
        >
          Ração, acessórios, medicamentos e banho e tosa, com atendimento de
          bairro e entrega na porta. Você chama no WhatsApp, a gente cuida do
          resto.
        </p>

        <div
          className="sobe mt-7 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center"
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

      {/* Vantagens em rotador vertical: um destaque por vez, estilo stat */}
      <div className="sobe relative border-t border-white/10 bg-noite/50" style={{ animationDelay: "320ms" }}>
        <p className="sr-only">
          Entrega em casa na região, delivery de ração no KG, duas lojas em
          Petrópolis e banho e tosa com a Tia Jessica.
        </p>
        <div className="pb-12 pt-5">
          <div className="h-16 overflow-hidden" aria-hidden="true">
            <div className="gira-beneficios">
              {[...BENEFICIOS, BENEFICIOS[0]].map((b, i) => (
                <span
                  key={`${b.destaque}-${i}`}
                  className="flex h-16 flex-col items-center justify-center gap-1"
                >
                  <span className="flex items-center gap-2.5">
                    <b.icone className="size-5 shrink-0 text-laranja" aria-hidden />
                    <span className="bg-gradient-to-r from-laranja to-caramelo bg-clip-text font-display text-xl font-bold leading-none text-transparent sm:text-2xl">
                      {b.destaque}
                    </span>
                  </span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/65">
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

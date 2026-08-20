import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const PILARES = [
  {
    numero: "01",
    titulo: "Variedade de verdade",
    texto: "Rações a granel e fechadas, petiscos, acessórios, medicamentos e uma variedade de produtos para pássaros, do pet de casa ao criador passarinheiro.",
  },
  {
    numero: "02",
    titulo: "Atendimento que conhece o seu pet",
    texto: "Gente que chama o cliente pelo nome do bicho e ajuda a escolher o que faz sentido, sem empurrar nada.",
  },
  {
    numero: "03",
    titulo: "Do lado de casa",
    texto: "Uma loja na Posse, outra em Pedro do Rio. Você resolve tudo sem atravessar a cidade.",
  },
];

// Só afirmações que o site sustenta: lojas, dias abertos, granel e Instagram.
const SELOS = [
  { destaque: "2", rotulo: "lojas em Petrópolis" },
  { destaque: "7", rotulo: "dias por semana abertas" },
  { destaque: "10 mil+", rotulo: "seguidores no Instagram" },
  { destaque: "granel", rotulo: "ração na medida certa" },
];

export default function Sobre() {
  return (
    <section
      id="sobre"
      className="relative z-[2] -mt-6 rounded-t-[28px] bg-creme py-12 sm:py-16"
      aria-labelledby="sobre-titulo"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Sobre nós"
              id="sobre-titulo"
              titulo="Um pet shop de bairro, do jeito que o bairro gosta"
              descricao="A Fina Fauna nasceu em 2020 e virou aquela loja que conhece os pets da região: produto bom, preço justo e atendimento próximo, de quem realmente entende de bicho."
            />
          </Reveal>

          <Reveal atraso={0.1} className="relative">
            <div
              aria-hidden
              className="absolute -right-4 -top-4 h-full w-full rounded-[--radius-bloco] bg-caramelo/15"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[--radius-bloco]">
              <Image
                src="/img/equipe.jpg"
                alt="Três atendentes da Fina Fauna sorrindo de uniforme verde na porta da loja"
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
              />
            </div>
            <p className="absolute bottom-4 left-4 rounded-full bg-petroleo/85 px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
              a equipe, na porta da loja
            </p>
          </Reveal>
        </div>

        {/* Pilares em blocos: o que sustenta a loja */}
        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-3">
          {PILARES.map((p, i) => (
            <Reveal key={p.numero} atraso={i * 0.08}>
              <article className="group h-full rounded-[--radius-bloco] border border-petroleo/8 bg-white p-6 shadow-[0_16px_40px_-30px_rgba(0,77,51,0.4)] transition-transform duration-200 hover:-translate-y-1">
                <p className="flex items-center gap-3 font-mono text-sm font-medium text-queimado">
                  {p.numero}
                  <span aria-hidden className="fio-guia h-px w-8 opacity-60 transition-all duration-200 group-hover:w-12" />
                </p>
                <h3 className="mt-4 font-display text-base font-semibold leading-snug text-petroleo sm:text-lg">
                  {p.titulo}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/65">{p.texto}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Selos: números que a própria página sustenta */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-4">
          {SELOS.map((selo, i) => (
            <Reveal key={selo.rotulo} atraso={i * 0.06}>
              <div className="group flex h-full flex-col items-center rounded-[18px] border border-petroleo/8 bg-white px-3 py-7 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_-26px_rgba(0,77,51,0.5)]">
                <span className="bg-gradient-to-br from-floresta to-laranja bg-clip-text font-display text-[clamp(1.8rem,4.2vw,2.6rem)] font-bold leading-none text-transparent">
                  {selo.destaque}
                </span>
                <span aria-hidden className="fio-guia mt-4 h-px w-8 text-caramelo/70 transition-all duration-200 group-hover:w-14" />
                <span className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink/60">
                  {selo.rotulo}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

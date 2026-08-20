import Image from "next/image";
import {
  Brush,
  Ear,
  Heart,
  Scissors,
  Shield,
  ShowerHead,
  Sparkles,
} from "lucide-react";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import { WhatsAppIcon } from "@/components/ui/icons";

// Serviços e textos reais da Tia Jessica (fonte: projeto Jessica Groomer).
const SERVICOS = [
  {
    icone: ShowerHead,
    nome: "Banho e hidratação",
    texto: "Produtos de qualidade e hidratação que deixa o pelo macio e cheiroso por dias.",
  },
  {
    icone: Shield,
    nome: "Tosa higiênica",
    texto: "Aparo das áreas íntimas, patinhas e barriga para mais conforto no dia a dia.",
  },
  {
    icone: Scissors,
    nome: "Tosa na tesoura",
    texto: "Acabamento artesanal fio a fio, respeitando o corpo e o estilo de cada pet.",
  },
  {
    icone: Sparkles,
    nome: "Penteados e estilização",
    texto: "Penteados, lacinhos e finalizações que transformam o visual do seu pet.",
    especialidade: true,
  },
  {
    icone: Ear,
    nome: "Unhas e ouvidos",
    texto: "Cuidados essenciais feitos com calma e técnica, sem estresse para o pet.",
  },
  {
    icone: Brush,
    nome: "Desembolo",
    texto: "Remoção cuidadosa de nós e pelos embolados, devolvendo o conforto da pelagem.",
  },
];

const CREDENCIAIS = [
  "10 anos no mercado pet",
  "Formada em banho e tosa",
  "Especialista em penteados",
];

// Fotos reais do trabalho da Jessica (vindas do projeto Jessica Groomer).
const GALERIA = [
  {
    src: "/img/tosa-1.jpg",
    alt: "Jessica abraçada com um cão de gravata do Super-Homem, recém-saído do banho",
    legenda: "Gravata do Super-Homem",
  },
  {
    src: "/img/tosa-2.jpg",
    alt: "Golden Retriever com coroa e gravatinha ao lado da Jessica no estúdio",
    legenda: "Coroa de rei",
  },
  {
    src: "/img/tosa-3.jpg",
    alt: "Gato de gravatinha do Garfield após o banho, olhando para a câmera",
    legenda: "Gatos também!",
  },
  {
    src: "/img/tosa-4.jpg",
    alt: "Jessica segurando um cão felpudo cinza no colo depois do banho",
    legenda: "Pronto para casa",
  },
  {
    src: "/img/pet-cliente.jpg",
    alt: "Cachorro sorrindo de língua de fora depois do banho, na loja da Fina Fauna",
    legenda: "Sorriso de cliente",
  },
];

export default function BanhoTosa() {
  return (
    <section
      id="banho-e-tosa"
      className="relative z-[3] -mt-6 overflow-hidden rounded-t-[28px] bg-petroleo py-12 sm:py-16"
      aria-labelledby="banho-titulo"
    >
      <div
        className="absolute -left-40 top-1/3 size-[30rem] rounded-full bg-caramelo/10 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 sm:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <Reveal>
              <SectionHeading
                tom="escuro"
                eyebrow="Banho e tosa"
                id="banho-titulo"
                titulo="Banho e tosa com a Tia Jessica"
                descricao="Tosadora especialista em penteados pet: seu bicho volta cheiroso, bonito e tranquilo, do banho ao lacinho."
              />
              <ul className="mt-6 flex flex-wrap gap-2">
                {CREDENCIAIS.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/75"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Serviços com as descrições reais, em grade */}
            <div className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {SERVICOS.map((s, i) => (
                <Reveal key={s.nome} atraso={i * 0.05}>
                  <div
                    className={`-m-2.5 flex gap-4 rounded-2xl p-2.5 transition-colors duration-200 hover:bg-white/[0.06] ${
                      s.especialidade ? "bg-white/[0.05] ring-1 ring-laranja/40" : ""
                    }`}
                  >
                    <span
                      className={`flex size-11 shrink-0 items-center justify-center rounded-[12px] ${
                        s.especialidade ? "bg-laranja text-white" : "bg-white/10 text-caramelo"
                      }`}
                    >
                      <s.icone className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white sm:text-[0.95rem]">
                        {s.nome}
                        {s.especialidade && (
                          <span className="rounded-full bg-laranja px-2 py-0.5 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-white">
                            especialidade
                          </span>
                        )}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-white/60 sm:text-[0.8rem]">
                        {s.texto}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal atraso={0.1}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppCta contexto="tosa" size="lg" className="group">
                  <WhatsAppIcon className="size-5" />
                  Agendar banho e tosa
                </WhatsAppCta>
                <p className="text-sm text-white/70">
                  Agenda por ordem de horário. Garanta o do seu pet.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Foto real da profissional (do projeto Jessica Groomer) */}
          <Reveal atraso={0.12} className="relative lg:sticky lg:top-28">
            <div
              aria-hidden
              className="absolute -left-4 -top-4 h-full w-full rounded-[--radius-bloco] bg-white/5"
            />
            <div className="relative aspect-[3/4] overflow-hidden rounded-[--radius-bloco]">
              <Image
                src="/img/tia-jessica.jpg"
                alt="Jessica sorrindo com um Yorkshire recém-tosado no colo, dentro do estúdio de banho e tosa"
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 460px, 90vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-petroleo/90 to-transparent"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center gap-4 sm:inset-x-5 sm:bottom-5">
                <span className="min-w-0">
                  <span className="block font-display text-base font-semibold text-white">
                    Tia Jessica
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-white/80">
                    Tosadora especialista em penteados pet ·{" "}
                    <a
                      href="https://www.instagram.com/jesgroomer/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-caramelo hover:underline"
                    >
                      @jesgroomer
                    </a>
                  </span>
                </span>
                <Heart className="ml-auto size-5 shrink-0 fill-laranja text-laranja" aria-hidden />
              </div>
            </div>
            <blockquote className="mt-6 flex gap-4">
              <span aria-hidden className="fio-guia-v w-px shrink-0 self-stretch text-caramelo/60" />
              <p className="text-pretty text-sm leading-relaxed text-white/75 sm:text-base">
                “Ajudo a manter o pelo do seu pet bem cuidado e tratado!”
                <span className="mt-2 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/45">
                  <Image
                    src="/img/logo-marca.png"
                    alt=""
                    width={36}
                    height={36}
                    className="size-4.5 rounded-full"
                  />
                  Jessica · banho e tosa na Fina Fauna
                </span>
              </p>
            </blockquote>
          </Reveal>
        </div>

        {/* Galeria com fotos reais dos banhos e tosas da Jessica */}
        <div className="mt-14 sm:mt-16">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <Kicker tom="escuro">Trabalhos da Tia Jessica</Kicker>
              <a
                href="https://www.instagram.com/jesgroomer/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.68rem] lowercase tracking-wide text-white/60 transition-colors hover:text-caramelo"
              >
                ver mais no instagram
              </a>
            </div>
          </Reveal>
          <div className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:gap-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
            {GALERIA.map((foto, i) => (
              <Reveal key={foto.src} atraso={i * 0.06} className="w-[62vw] shrink-0 snap-center sm:w-[38vw] lg:w-auto">
                <figure className="group relative aspect-[3/4] overflow-hidden rounded-[--radius-bloco]">
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 230px, 62vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noite/85 to-transparent px-4 pb-3.5 pt-10 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/90 lg:opacity-0 lg:transition-opacity lg:duration-200 lg:group-hover:opacity-100">
                    {foto.legenda}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/45 lg:hidden">
            arraste para ver os banhos
          </p>
        </div>
      </div>
    </section>
  );
}

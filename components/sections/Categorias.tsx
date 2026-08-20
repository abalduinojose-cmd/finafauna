"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Bird,
  Bone,
  Cookie,
  Dog,
  Pill,
  Scissors,
  SprayCan,
  Wheat,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useWhatsApp } from "@/components/ui/WhatsAppModal";

// Sem catálogo online: cada quadrado abre a conversa no WhatsApp já com o
// assunto certo na mensagem. Banho e tosa leva à seção da Tia Jessica.
const CATEGORIAS = [
  {
    icone: Bone,
    nome: "Rações",
    detalhe: "secas e úmidas",
    mensagem: "Olá! Vim pelo site e quero ver opções de rações para o meu pet 🐾",
  },
  {
    icone: Wheat,
    nome: "Ração a granel",
    detalhe: "no KG, na medida",
    mensagem: "Olá! Vim pelo site e quero ver opções de ração a granel 🐾",
  },
  {
    icone: Bird,
    nome: "Pássaros",
    detalhe: "variedade para passarinheiros",
    mensagem: "Olá! Vim pelo site e quero ver a variedade de produtos para pássaros 🐦",
  },
  {
    icone: Cookie,
    nome: "Petiscos",
    detalhe: "bifinhos e ossinhos",
    mensagem: "Olá! Vim pelo site e quero ver opções de petiscos para o meu pet 🐾",
  },
  {
    icone: Pill,
    nome: "Medicamentos",
    detalhe: "antipulgas e vermífugos",
    mensagem: "Olá! Vim pelo site e quero ver opções de medicamentos para o meu pet 🐾",
  },
  {
    icone: Dog,
    nome: "Acessórios",
    detalhe: "coleiras e brinquedos",
    mensagem: "Olá! Vim pelo site e quero ver opções de acessórios para o meu pet 🐾",
  },
  {
    icone: SprayCan,
    nome: "Higiene e areia",
    detalhe: "banho, tapetes e areia",
    mensagem: "Olá! Vim pelo site e quero ver opções de produtos de higiene e areia 🐾",
  },
] as const;

// Dois tons de verde do projeto alternando entre os quadrados
const TONS = [
  "bg-gradient-to-br from-floresta to-petroleo",
  "bg-gradient-to-br from-petroleo to-noite",
];

export default function Categorias() {
  const { openWhatsApp } = useWhatsApp();
  return (
    <section className="bg-white py-10 sm:py-16" aria-labelledby="categorias-titulo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          align="center"
          eyebrow="O que seu pet precisa?"
          id="categorias-titulo"
          titulo="Escolha por onde começar"
          descricao="Toque no que procura: a conversa abre no WhatsApp já com o assunto certo, e a gente separa tudo para você."
        />

        {/* Quadrados verdes de pontas arredondadas: ícone grande, nome na base
            e a patinha de luz no canto. Grade direta, sem trilho. */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4 sm:gap-4">
          {CATEGORIAS.map((cat, i) => (
            <Reveal key={cat.nome} atraso={i * 0.05}>
              <button
                type="button"
                onClick={() => openWhatsApp("delivery", cat.mensagem)}
                className={`group relative flex aspect-square w-full flex-col justify-between overflow-hidden rounded-[22px] p-4 text-left transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-24px_rgba(0,77,51,0.7)] sm:p-5 ${TONS[i % 2]}`}
              >
                {/* bolha de luz decorativa no canto */}
                <span
                  aria-hidden
                  className="absolute -bottom-10 -right-8 size-32 rounded-full bg-white/[0.07] transition-transform duration-300 group-hover:scale-125"
                />
                <ArrowUpRight
                  className="absolute right-4 top-4 size-4 text-white/30 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-laranja"
                  aria-hidden
                />
                <cat.icone
                  className="size-8 text-white transition-transform duration-200 group-hover:scale-110 sm:size-9"
                  aria-hidden
                />
                <span className="relative">
                  <span className="block font-display text-sm font-bold leading-snug text-white sm:text-base">
                    {cat.nome}
                  </span>
                  <span className="mt-0.5 block text-[0.62rem] leading-snug text-white/65 sm:text-[0.68rem]">
                    {cat.detalhe}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}

          {/* Banho e tosa: o quadrado laranja de destaque, leva à Tia Jessica */}
          <Reveal atraso={0.35}>
            <Link
              href="#banho-e-tosa"
              className="group relative flex aspect-square w-full flex-col justify-between overflow-hidden rounded-[22px] bg-gradient-to-br from-laranja to-queimado p-4 text-left transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-24px_rgba(184,62,20,0.7)] sm:p-5"
            >
              <span
                aria-hidden
                className="absolute -bottom-10 -right-8 size-32 rounded-full bg-white/[0.09] transition-transform duration-300 group-hover:scale-125"
              />
              <ArrowUpRight
                className="absolute right-4 top-4 size-4 text-white/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white"
                aria-hidden
              />
              <Scissors
                className="size-8 text-white transition-transform duration-200 group-hover:scale-110 sm:size-9"
                aria-hidden
              />
              <span className="relative">
                <span className="block font-display text-sm font-bold leading-snug text-white sm:text-base">
                  Banho e tosa
                </span>
                <span className="mt-0.5 block text-[0.62rem] leading-snug text-white/75 sm:text-[0.68rem]">
                  com a Tia Jessica
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

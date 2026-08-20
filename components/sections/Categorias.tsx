"use client";

import Link from "next/link";
import {
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

// Sem catálogo online: cada categoria abre a conversa no WhatsApp já com o
// assunto certo na mensagem. Banho e tosa leva à seção da Tia Jessica.
const CATEGORIAS = [
  {
    icone: Bone,
    nome: "Rações",
    detalhe: "secas e úmidas",
    cor: "text-laranja",
    mensagem: "Olá! Vim pelo site e quero ver opções de rações para o meu pet 🐾",
  },
  {
    icone: Wheat,
    nome: "Ração a granel",
    detalhe: "no KG, na medida",
    cor: "text-floresta",
    mensagem: "Olá! Vim pelo site e quero ver opções de ração a granel 🐾",
  },
  {
    icone: Bird,
    nome: "Pássaros",
    detalhe: "variedade para passarinheiros",
    cor: "text-laranja",
    mensagem: "Olá! Vim pelo site e quero ver a variedade de produtos para pássaros 🐦",
  },
  {
    icone: Cookie,
    nome: "Petiscos",
    detalhe: "bifinhos e ossinhos",
    cor: "text-caramelo",
    mensagem: "Olá! Vim pelo site e quero ver opções de petiscos para o meu pet 🐾",
  },
  {
    icone: Pill,
    nome: "Medicamentos",
    detalhe: "antipulgas e vermífugos",
    cor: "text-floresta",
    mensagem: "Olá! Vim pelo site e quero ver opções de medicamentos para o meu pet 🐾",
  },
  {
    icone: Dog,
    nome: "Acessórios",
    detalhe: "coleiras e brinquedos",
    cor: "text-laranja",
    mensagem: "Olá! Vim pelo site e quero ver opções de acessórios para o meu pet 🐾",
  },
  {
    icone: SprayCan,
    nome: "Higiene e areia",
    detalhe: "banho, tapetes e areia",
    cor: "text-caramelo",
    mensagem: "Olá! Vim pelo site e quero ver opções de produtos de higiene e areia 🐾",
  },
] as const;

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

        {/* Círculos de categoria: trilho no celular, fileira única no desktop */}
        <div className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 pt-2 sm:gap-3 lg:mx-0 lg:mt-12 lg:grid lg:grid-cols-8 lg:overflow-visible lg:px-0 lg:pb-0">
          {CATEGORIAS.map((cat, i) => (
            <Reveal
              key={cat.nome}
              atraso={i * 0.04}
              className="w-[6.6rem] shrink-0 snap-start sm:w-28 lg:w-auto"
            >
              <button
                type="button"
                onClick={() => openWhatsApp("delivery", cat.mensagem)}
                className="group flex w-full flex-col items-center gap-3 text-center"
              >
                <span className="relative flex size-20 items-center justify-center rounded-full bg-white shadow-[0_16px_34px_-22px_rgba(0,41,27,0.45)] ring-1 ring-petroleo/8 transition-all duration-200 group-hover:-translate-y-1.5 group-hover:bg-laranja group-hover:ring-laranja group-hover:shadow-[0_18px_32px_-16px_rgba(184,62,20,0.55)] sm:size-24">
                  {/* halo pontilhado do fio da guia, acende no hover */}
                  <span
                    aria-hidden
                    className="absolute -inset-2 rounded-full border border-dashed border-transparent transition-colors duration-300 group-hover:border-laranja/45"
                  />
                  <cat.icone
                    className={`size-8 transition-all duration-200 group-hover:scale-110 group-hover:text-white sm:size-9 ${cat.cor}`}
                    aria-hidden
                  />
                </span>
                <span>
                  <span className="block text-[0.8rem] font-bold leading-snug text-petroleo sm:text-sm">
                    {cat.nome}
                  </span>
                  <span className="mt-0.5 block text-[0.62rem] leading-snug text-ink/50 sm:text-[0.65rem]">
                    {cat.detalhe}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}

          {/* Banho e tosa: o círculo escuro de destaque, leva à seção da Tia Jessica */}
          <Reveal atraso={0.3} className="w-[6.6rem] shrink-0 snap-start sm:w-28 lg:w-auto">
            <Link
              href="#banho-e-tosa"
              className="group flex w-full flex-col items-center gap-3 text-center"
            >
              <span className="relative flex size-20 items-center justify-center rounded-full bg-petroleo shadow-[0_16px_34px_-22px_rgba(0,41,27,0.6)] transition-all duration-200 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_32px_-16px_rgba(0,77,51,0.7)] sm:size-24">
                <span
                  aria-hidden
                  className="absolute -inset-2 rounded-full border border-dashed border-transparent transition-colors duration-300 group-hover:border-caramelo/60"
                />
                <Scissors
                  className="size-8 text-caramelo transition-transform duration-200 group-hover:scale-110 sm:size-9"
                  aria-hidden
                />
              </span>
              <span>
                <span className="block text-[0.8rem] font-bold leading-snug text-petroleo sm:text-sm">
                  Banho e tosa
                </span>
                <span className="mt-0.5 block text-[0.62rem] leading-snug text-ink/50 sm:text-[0.65rem]">
                  com a Tia Jessica
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
        <p className="mt-2 text-center font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink/40 lg:hidden">
          arraste para o lado
        </p>
      </div>
    </section>
  );
}

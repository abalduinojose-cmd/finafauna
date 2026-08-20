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

        {/* Cápsulas de categoria: ícone, assunto e a seta que convida ao toque.
            Trilho no celular, grade de duas fileiras no desktop. */}
        <div className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 pt-1 sm:gap-4 lg:mx-0 lg:mt-12 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {CATEGORIAS.map((cat, i) => (
            <Reveal
              key={cat.nome}
              atraso={i * 0.04}
              className="w-[16rem] shrink-0 snap-start lg:w-auto"
            >
              <button
                type="button"
                onClick={() => openWhatsApp("delivery", cat.mensagem)}
                className="group flex w-full items-center gap-3.5 rounded-full border border-petroleo/8 bg-creme/70 py-2.5 pl-2.5 pr-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-laranja/40 hover:bg-white hover:shadow-[0_16px_32px_-22px_rgba(184,62,20,0.5)]"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_16px_-10px_rgba(0,41,27,0.5)] ring-1 ring-petroleo/8 transition-transform duration-200 group-hover:scale-105">
                  <cat.icone className={`size-5 ${cat.cor}`} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold leading-snug text-petroleo">
                    {cat.nome}
                  </span>
                  <span className="block truncate text-[0.65rem] leading-snug text-ink/50">
                    {cat.detalhe}
                  </span>
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-petroleo/25 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-laranja"
                  aria-hidden
                />
              </button>
            </Reveal>
          ))}

          {/* Banho e tosa: a cápsula escura de destaque, leva à Tia Jessica */}
          <Reveal atraso={0.3} className="w-[16rem] shrink-0 snap-start lg:w-auto">
            <Link
              href="#banho-e-tosa"
              className="group flex w-full items-center gap-3.5 rounded-full bg-petroleo py-2.5 pl-2.5 pr-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-22px_rgba(0,77,51,0.8)]"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-transform duration-200 group-hover:scale-105">
                <Scissors className="size-5 text-caramelo" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold leading-snug text-white">
                  Banho e tosa
                </span>
                <span className="block truncate text-[0.65rem] leading-snug text-white/60">
                  com a Tia Jessica
                </span>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-white/35 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-caramelo"
                aria-hidden
              />
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

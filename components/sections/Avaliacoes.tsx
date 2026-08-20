"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Stars from "@/components/ui/Stars";
import { GoogleIcon } from "@/components/ui/icons";
import { LOJAS } from "@/data/lojas";
import dadosReviews from "@/data/reviews.json";

type Review = {
  autor: string;
  avatar: string;
  nota: number;
  texto: string;
  quando: string;
  url: string;
};

type DadosLoja = { rating: number; total: number; reviews: Review[] };

// Fallback: se o reviews.json não tiver sido gerado, a seção simplesmente não
// renderiza (sem erro de build).
const DADOS: Record<string, DadosLoja> = (dadosReviews?.lojas ?? {}) as Record<string, DadosLoja>;

function CardAvaliacao({ review }: { review: Review }) {
  const [expandido, setExpandido] = useState(false);
  const longo = review.texto.length > 180;
  return (
    <article className="relative flex w-[78vw] max-w-sm shrink-0 snap-center flex-col rounded-[--radius-bloco] border border-petroleo/10 bg-white p-6 shadow-[0_14px_35px_-24px_rgba(0,77,51,0.35)] md:w-96 md:snap-start">
      <a
        href={review.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver a avaliação de ${review.autor} no Google`}
        className="absolute right-5 top-5 opacity-60 transition-opacity hover:opacity-100"
      >
        <GoogleIcon className="size-5" />
      </a>
      <header className="flex items-center gap-3 pr-8">
        <Image
          src={review.avatar}
          alt={`Foto de perfil de ${review.autor}`}
          width={48}
          height={48}
          loading="lazy"
          className="size-12 rounded-full object-cover"
          draggable={false}
        />
        <div className="min-w-0">
          <h3 className="truncate font-display text-sm font-semibold text-petroleo">
            {review.autor}
          </h3>
          <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink/50">
            {review.quando}
          </p>
        </div>
      </header>
      <Stars className="mt-4 size-4" />
      <span className="sr-only">{review.nota} de 5 estrelas</span>
      <p className={`mt-3 text-sm leading-relaxed text-ink/75 ${expandido ? "" : "line-clamp-5"}`}>
        {review.texto}
      </p>
      {longo && (
        <button
          type="button"
          onClick={() => setExpandido((v) => !v)}
          className="mt-2 self-start text-sm font-semibold text-queimado hover:text-laranja"
        >
          {expandido ? "ler menos" : "ler mais"}
        </button>
      )}
    </article>
  );
}

export default function Avaliacoes() {
  const [lojaAtiva, setLojaAtiva] = useState<(typeof LOJAS)[number]["id"]>("posse");
  const [progresso, setProgresso] = useState(0);
  const trilhoRef = useRef<HTMLDivElement>(null);
  // estado do arrasto com mouse (no toque o scroll nativo resolve)
  const arrasto = useRef({ ativo: false, moveu: false, x: 0, scroll: 0 });

  const dados = DADOS[lojaAtiva];
  const loja = LOJAS.find((l) => l.id === lojaAtiva)!;
  const temAlgumaReview = LOJAS.some((l) => (DADOS[l.id]?.reviews?.length ?? 0) > 0);

  // Barra de progresso sincronizada com o scroll (rAF, sem listener pesado)
  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    trilho.scrollTo({ left: 0 });
    let raf = 0;
    const atualizar = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const maximo = trilho.scrollWidth - trilho.clientWidth;
        setProgresso(maximo > 0 ? Math.min(1, Math.max(0, trilho.scrollLeft / maximo)) : 0);
      });
    };
    atualizar();
    trilho.addEventListener("scroll", atualizar, { passive: true });
    return () => {
      trilho.removeEventListener("scroll", atualizar);
      cancelAnimationFrame(raf);
    };
  }, [lojaAtiva]);

  const rolar = useCallback((direcao: 1 | -1) => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const card = trilho.querySelector("article");
    const largura = card ? card.getBoundingClientRect().width + 16 : 400;
    trilho.scrollBy({ left: direcao * largura, behavior: "smooth" });
  }, []);

  if (!temAlgumaReview) return null;

  return (
    <section
      id="avaliacoes"
      className="relative z-[5] -mt-6 rounded-t-[28px] bg-white py-12 sm:py-16"
      aria-labelledby="avaliacoes-titulo"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Cabeçalho: título à esquerda, nota e abas à direita */}
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            eyebrow="Avaliações"
            id="avaliacoes-titulo"
            titulo="Quem compra aqui, recomenda"
            descricao="Avaliações reais de clientes das duas unidades, direto do Google."
          />
          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex items-center gap-3">
              <GoogleIcon className="size-8" />
              <p className="flex items-baseline gap-2 font-display text-3xl font-bold leading-none text-petroleo">
                {dados.rating.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}
                <Stars className="size-4" />
              </p>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink/55">
                {dados.total} avaliações
                <br />
                {loja.bairro}
              </p>
            </div>
            <div className="flex rounded-full bg-creme p-1.5" role="tablist" aria-label="Unidade das avaliações">
              {LOJAS.map((l) => (
                <button
                  key={l.id}
                  role="tab"
                  aria-selected={lojaAtiva === l.id}
                  onClick={() => setLojaAtiva(l.id)}
                  className={`rounded-full px-5 py-2.5 font-display text-sm font-semibold transition-colors ${
                    lojaAtiva === l.id
                      ? "bg-petroleo text-white shadow"
                      : "text-petroleo/70 hover:text-petroleo"
                  }`}
                >
                  {l.bairro}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trilho arrastável: toque nativo no mobile, arrasto de mouse no desktop */}
        <div className="relative mt-8 sm:mt-10">
          <div
            ref={trilhoRef}
            role="region"
            aria-roledescription="carrossel"
            aria-label={`Avaliações da unidade ${loja.bairro}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                rolar(1);
              }
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                rolar(-1);
              }
            }}
            onPointerDown={(e) => {
              if (e.pointerType !== "mouse" || !trilhoRef.current) return;
              arrasto.current = {
                ativo: true,
                moveu: false,
                x: e.clientX,
                scroll: trilhoRef.current.scrollLeft,
              };
              trilhoRef.current.style.scrollSnapType = "none";
            }}
            onPointerMove={(e) => {
              const trilho = trilhoRef.current;
              if (!arrasto.current.ativo || !trilho) return;
              const dx = e.clientX - arrasto.current.x;
              if (Math.abs(dx) > 5) arrasto.current.moveu = true;
              trilho.scrollLeft = arrasto.current.scroll - dx;
            }}
            onPointerUp={() => {
              const trilho = trilhoRef.current;
              arrasto.current.ativo = false;
              if (trilho) trilho.style.scrollSnapType = "";
            }}
            onPointerLeave={() => {
              const trilho = trilhoRef.current;
              arrasto.current.ativo = false;
              if (trilho) trilho.style.scrollSnapType = "";
            }}
            onClickCapture={(e) => {
              // um arrasto não pode disparar o clique de um link do card
              if (arrasto.current.moveu) {
                e.preventDefault();
                e.stopPropagation();
                arrasto.current.moveu = false;
              }
            }}
            className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto px-1 py-2 [overscroll-behavior-x:contain] active:cursor-grabbing"
          >
            {dados.reviews.map((r) => (
              <CardAvaliacao key={`${lojaAtiva}-${r.autor}`} review={r} />
            ))}
          </div>

          {/* Máscaras de gradiente indicando que há mais conteúdo */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent"
            aria-hidden
          />
        </div>

        {/* Controles: dica de arrasto, progresso e setas */}
        <div className="mt-6 flex items-center gap-5">
          <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/50 md:hidden">
            arraste para o lado
            <MoveRight className="size-3.5" aria-hidden />
          </p>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-petroleo/10" aria-hidden>
            <div
              className="h-full rounded-full bg-laranja transition-[width] duration-150"
              style={{ width: `${Math.max(8, progresso * 100)}%` }}
            />
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => rolar(-1)}
              aria-label="Avaliação anterior"
              className="flex size-11 items-center justify-center rounded-full border border-petroleo/15 text-petroleo transition-colors hover:border-laranja hover:bg-laranja hover:text-white"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => rolar(1)}
              aria-label="Próxima avaliação"
              className="flex size-11 items-center justify-center rounded-full border border-petroleo/15 text-petroleo transition-colors hover:border-laranja hover:bg-laranja hover:text-white"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        {/* CTA para os perfis no Google */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {LOJAS.map((l) => (
            <a
              key={l.id}
              href={l.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-petroleo/15 px-6 py-3 font-display text-sm font-semibold text-petroleo transition-colors hover:border-petroleo hover:bg-petroleo hover:text-white sm:w-auto"
            >
              <GoogleIcon className="size-4" />
              Ver avaliações · {l.bairro}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

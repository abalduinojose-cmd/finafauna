"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { InstagramIcon } from "@/components/ui/icons";
import { INSTAGRAM_URL } from "@/data/lojas";
import { midia } from "@/lib/site";

// Reels reais do @finafaunaracoes, comprimidos para o site (public/videos/).
// <video> não passa pelo next/image, então o midia() põe o basePath do Pages.
const REELS = [
  { src: midia("/videos/reel-1.mp4"), poster: midia("/videos/reel-1-poster.jpg") },
  { src: midia("/videos/reel-2.mp4"), poster: midia("/videos/reel-2-poster.jpg") },
  { src: midia("/videos/reel-3.mp4"), poster: midia("/videos/reel-3-poster.jpg") },
];

function Reel({ src, poster, indice }: { src: string; poster: string; indice: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);

  const alternar = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      // pausa qualquer outro reel que esteja tocando
      document.querySelectorAll<HTMLVideoElement>("#instagram video").forEach((v) => {
        if (v !== video) v.pause();
      });
      void video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="relative w-[72vw] max-w-[300px] shrink-0 snap-center overflow-hidden rounded-[--radius-bloco] bg-noite shadow-[0_20px_50px_-30px_rgba(0,77,51,0.5)] lg:w-auto lg:max-w-none">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        loop
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
        className="aspect-[9/16] w-full object-cover"
      />
      <button
        type="button"
        onClick={alternar}
        aria-label={
          tocando ? `Pausar vídeo ${indice + 1} do Instagram` : `Reproduzir vídeo ${indice + 1} do Instagram`
        }
        className="group absolute inset-0 flex items-center justify-center"
      >
        <span
          className={`flex size-14 items-center justify-center rounded-full bg-white/90 text-petroleo shadow-lg backdrop-blur-sm transition-all duration-200 ${
            tocando ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" : "opacity-100"
          }`}
        >
          {tocando ? (
            <Pause className="size-6 fill-current" aria-hidden />
          ) : (
            <Play className="ml-0.5 size-6 fill-current" aria-hidden />
          )}
        </span>
      </button>
      <p className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-noite/60 px-3 py-1.5 font-mono text-[0.6rem] text-white/90 backdrop-blur-sm">
        <InstagramIcon className="size-3" />
        @finafaunaracoes
      </p>
    </div>
  );
}

export default function Instagram() {
  return (
    <section
      id="instagram"
      className="relative z-[4] -mt-6 rounded-t-[28px] bg-creme py-12 sm:py-16"
      aria-labelledby="instagram-titulo"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="No Instagram"
            id="instagram-titulo"
            titulo="A vida das lojas, em vídeo"
            descricao="Um pedaço do dia a dia da Fina Fauna, direto do nosso perfil."
          />
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-petroleo/15 px-5 py-3 font-display text-sm font-semibold text-petroleo transition-colors hover:border-petroleo hover:bg-petroleo hover:text-white"
          >
            <InstagramIcon className="size-4" />
            Seguir @finafaunaracoes
          </a>
        </div>

        {/* Mobile: trilho com swipe · Desktop: três colunas */}
        <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 py-2 [overscroll-behavior-x:contain] lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible">
          {REELS.map((reel, i) => (
            <Reel key={reel.src} src={reel.src} poster={reel.poster} indice={i} />
          ))}
        </div>
        <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink/45 lg:hidden">
          arraste para ver os três
        </p>
      </div>
    </section>
  );
}

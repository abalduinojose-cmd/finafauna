"use client";

import { useEffect, useRef, useState } from "react";
import { midia } from "@/lib/site";

// Vídeos ambiente do hero (arquivos do cliente): palmeiras ao vento no
// celular, fachada com palmeiras no desktop. Só renderiza depois de montar,
// assim cada tela baixa um único arquivo — o gradiente por trás segura o
// visual até o vídeo chegar (e vira o fallback se ele não tocar).
const VIDEOS = {
  mobile: { src: "/videos/hero-palmeiras.mp4", poster: "/videos/hero-palmeiras-poster.jpg" },
  desktop: { src: "/videos/hero-fachada.mp4", poster: "/videos/hero-fachada-poster.jpg" },
} as const;

export default function HeroVideo() {
  const [tela, setTela] = useState<keyof typeof VIDEOS | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const atualiza = () => setTela(mq.matches ? "desktop" : "mobile");
    atualiza();
    mq.addEventListener("change", atualiza);
    return () => mq.removeEventListener("change", atualiza);
  }, []);

  // O navegador pausa vídeo de aba/painel oculto e nem sempre retoma:
  // insiste no play ao montar e ao voltar a ficar visível.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tocar = () => {
      v.play().catch(() => {});
    };
    tocar();
    v.addEventListener("canplay", tocar);
    document.addEventListener("visibilitychange", tocar);
    return () => {
      v.removeEventListener("canplay", tocar);
      document.removeEventListener("visibilitychange", tocar);
    };
  }, [tela]);

  if (!tela) return null;
  const video = VIDEOS[tela];
  return (
    <video
      ref={videoRef}
      key={tela}
      src={midia(video.src)}
      poster={midia(video.poster)}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="size-full object-cover"
    />
  );
}

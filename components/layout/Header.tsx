"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { useWhatsApp } from "@/components/ui/WhatsAppModal";
import { FACEBOOK_URL, INSTAGRAM_URL } from "@/data/lojas";

const LINKS = [
  { href: "#delivery", label: "Delivery" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#banho-e-tosa", label: "Banho e tosa" },
  { href: "#instagram", label: "Instagram" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#unidades", label: "Unidades" },
];

function FacebookIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073C24 5.406 18.627 0 12 0S0 5.406 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.026 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  );
}

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  // transição estilo Cabana Afrodite: transparente sobre o vídeo do hero,
  // ganha o verde da marca depois de rolar (a logo não muda de cor)
  const [rolado, setRolado] = useState(false);

  const { openWhatsApp } = useWhatsApp();

  useEffect(() => {
    const aoRolar = () => setRolado(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // trava o scroll do body enquanto o drawer mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  const solido = rolado || menuAberto;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Barra da marca */}
      <div
        className={`transition-colors duration-500 ${
          solido ? "bg-floresta shadow-[0_10px_30px_-18px_rgba(0,41,27,0.6)]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6">
          <Link href="#inicio" aria-label="Fina Fauna Rações, voltar ao início">
            <Logo />
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Fina Fauna Rações"
              className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-laranja hover:bg-laranja"
            >
              <InstagramIcon className="size-4" />
            </a>
            <WhatsAppCta contexto="delivery" size="md">
              <WhatsAppIcon className="size-4" />
              Peça no WhatsApp
            </WhatsAppCta>
          </div>

          <button
            type="button"
            onClick={() => setMenuAberto(true)}
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
            className="flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <Menu className="size-6" aria-hidden />
          </button>
        </div>
      </div>

      {/* Fileira de links clara, como a barra de categorias da referência */}
      <nav
        aria-label="Navegação principal"
        className={`hidden border-b transition-colors duration-500 lg:block ${
          solido ? "border-petroleo/10 bg-white/95 backdrop-blur" : "border-transparent bg-transparent"
        }`}
      >
        <ul className="mx-auto flex max-w-6xl items-center justify-center gap-1 px-6">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`block px-4 py-3 font-mono text-[0.8rem] tracking-wide transition-colors duration-300 ${
                  solido ? "text-petroleo/80 hover:text-laranja" : "text-white/85 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Drawer mobile: tela cheia com links entrando em cascata */}
      <AnimatePresence>
        {menuAberto && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-gradient-to-b from-floresta to-noite lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="paw-texture absolute inset-0 opacity-[0.025]" aria-hidden />
            <div className="relative flex h-16 items-center justify-between px-4 pt-2 sm:h-20 sm:px-6">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuAberto(false)}
                aria-label="Fechar menu"
                className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <nav aria-label="Navegação principal (menu)" className="relative flex flex-1 flex-col justify-center px-8">
              <ul className="space-y-1">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease: "easeOut" }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setMenuAberto(false)}
                      className="group flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl font-bold text-white transition-colors hover:bg-white/10"
                    >
                      {l.label}
                      <ArrowUpRight
                        className="size-5 text-white/30 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-caramelo"
                        aria-hidden
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="relative flex items-center gap-3 px-8 pb-10"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.35, ease: "easeOut" }}
            >
              <button
                type="button"
                onClick={() => {
                  setMenuAberto(false);
                  openWhatsApp("delivery");
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-laranja px-6 py-4 font-display text-lg font-semibold text-white shadow-[0_10px_30px_-10px_rgba(184,62,20,0.45)] transition-colors hover:bg-queimado"
              >
                <WhatsAppIcon className="size-5" />
                Peça no WhatsApp
              </button>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Fina Fauna Rações"
                className="flex size-13 shrink-0 items-center justify-center rounded-full border border-white/20 text-white sm:size-14"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Fina Fauna Rações"
                className="flex size-13 shrink-0 items-center justify-center rounded-full border border-white/20 text-white sm:size-14"
              >
                <FacebookIcon className="size-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

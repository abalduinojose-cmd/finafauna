"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useWhatsApp } from "./WhatsAppModal";
import { WhatsAppIcon } from "./icons";

// Botão flutuante que aparece depois de 400px de scroll e abre o modal de unidade.
export default function WhatsAppFab() {
  const [visivel, setVisivel] = useState(false);
  const { openWhatsApp } = useWhatsApp();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setVisivel(window.scrollY > 400));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.button
          type="button"
          onClick={() => openWhatsApp("geral")}
          aria-label="Falar com a Fina Fauna no WhatsApp"
          className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(4,77,61,0.55)] transition-colors hover:bg-[#1DA851] sm:bottom-7 sm:right-7"
          initial={{ opacity: 0, scale: 0.5, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 16 }}
          transition={{ type: "spring", stiffness: 360, damping: 26 }}
        >
          <WhatsAppIcon className="size-7" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

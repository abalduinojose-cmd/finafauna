"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { MapPin, X } from "lucide-react";
import { LOJAS } from "@/data/lojas";
import { linkWhatsApp, MENSAGENS, type ContextoWhatsApp } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

type WhatsAppContextValue = {
  // mensagem opcional substitui a mensagem padrão do contexto
  // (usada pelo montador de pedido do delivery)
  openWhatsApp: (contexto: ContextoWhatsApp, mensagem?: string) => void;
};

const WhatsAppContext = createContext<WhatsAppContextValue | null>(null);

export function useWhatsApp() {
  const ctx = useContext(WhatsAppContext);
  if (!ctx) throw new Error("useWhatsApp precisa estar dentro de <WhatsAppProvider>");
  return ctx;
}

const TITULOS: Record<ContextoWhatsApp, string> = {
  delivery: "De qual unidade você quer receber?",
  tosa: "Em qual unidade você quer agendar?",
  geral: "Qual unidade você quer chamar?",
};

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [pedido, setPedido] = useState<{ contexto: ContextoWhatsApp; mensagem?: string } | null>(
    null,
  );
  const contexto = pedido?.contexto ?? null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const gatilhoRef = useRef<HTMLElement | null>(null);

  const openWhatsApp = useCallback((ctx: ContextoWhatsApp, mensagem?: string) => {
    gatilhoRef.current = (document.activeElement as HTMLElement) ?? null;
    setPedido({ contexto: ctx, mensagem });
  }, []);

  const fechar = useCallback(() => {
    setPedido(null);
    gatilhoRef.current?.focus();
  }, []);

  // Esc fecha + trap de foco dentro do dialog
  useEffect(() => {
    if (!contexto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        fechar();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focaveis = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focaveis.length === 0) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    // trava o scroll do fundo enquanto o modal está aberto
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // foco inicial no primeiro card
    requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>("a[href]")
        ?.focus();
    });
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflowAnterior;
    };
  }, [contexto, fechar]);

  return (
    <WhatsAppContext.Provider value={{ openWhatsApp }}>
      {/* reducedMotion="user" desliga deslocamentos/escala do Motion em todo o
          site para quem tem "reduzir movimento" ativo — sobra só o fade. */}
      <MotionConfig reducedMotion="user">
      {children}
      <AnimatePresence>
        {contexto && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
            <motion.button
              type="button"
              aria-label="Fechar"
              className="absolute inset-0 cursor-default bg-petroleo/50 backdrop-blur-sm"
              onClick={fechar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="whatsapp-modal-titulo"
              className="relative w-full max-w-lg rounded-t-3xl bg-white p-6 pb-8 shadow-2xl sm:rounded-3xl sm:p-8"
              initial={{ opacity: 0, y: 64 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 64 }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
            >
              {/* alça do bottom sheet, só no mobile */}
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-petroleo/15 sm:hidden" aria-hidden />
              <button
                type="button"
                onClick={fechar}
                aria-label="Fechar janela de escolha de unidade"
                className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full text-petroleo/60 transition-colors hover:bg-creme hover:text-petroleo"
              >
                <X className="size-5" aria-hidden />
              </button>

              <h2
                id="whatsapp-modal-titulo"
                className="pr-10 font-display text-xl font-extrabold text-petroleo sm:text-2xl"
              >
                {TITULOS[contexto]}
              </h2>
              <p className="mt-1 text-sm text-ink/65">
                São duas lojas em Petrópolis. Escolha a mais perto de você 🐾
              </p>

              <div className="mt-6 grid gap-3">
                {LOJAS.map((loja) => (
                  <a
                    key={loja.id}
                    href={linkWhatsApp(loja.whatsapp, pedido?.mensagem ?? MENSAGENS[contexto])}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={fechar}
                    className={`group flex items-center gap-4 rounded-2xl border-2 p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                      loja.id === "posse"
                        ? "border-laranja/25 hover:border-laranja hover:shadow-laranja/10"
                        : "border-caramelo/30 hover:border-caramelo hover:shadow-caramelo/10"
                    }`}
                  >
                    <span
                      className={`flex size-12 shrink-0 items-center justify-center rounded-full text-white ${
                        loja.id === "posse" ? "bg-laranja" : "bg-caramelo"
                      }`}
                    >
                      <WhatsAppIcon className="size-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-bold text-petroleo">
                        {loja.bairro}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-sm text-ink/65">
                        <MapPin className="size-3.5 shrink-0" aria-hidden />
                        {loja.bairro}, Petrópolis · {loja.telefone}
                      </span>
                    </span>
                    <span
                      className={`hidden rounded-full px-3 py-1.5 text-xs font-bold text-white sm:block ${
                        loja.id === "posse" ? "bg-laranja group-hover:bg-queimado" : "bg-caramelo"
                      }`}
                    >
                      Chamar
                    </span>
                  </a>
                ))}
              </div>

              <p className="mt-5 text-center text-xs text-ink/65">
                Abre uma conversa no WhatsApp em nova aba, com a mensagem pronta.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </MotionConfig>
    </WhatsAppContext.Provider>
  );
}

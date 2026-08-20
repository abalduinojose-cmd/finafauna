"use client";

import type { ReactNode } from "react";
import { buttonClasses, type ButtonVariant } from "./Button";
import { useWhatsApp } from "./WhatsAppModal";
import type { ContextoWhatsApp } from "@/lib/whatsapp";

type Props = {
  contexto: ContextoWhatsApp;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  className?: string;
  ariaLabel?: string;
};

// Botão que abre o modal de escolha de unidade. É o único jeito de um CTA
// genérico chegar ao WhatsApp — nunca linkar direto para um número fora da
// seção Unidades.
export default function WhatsAppCta({
  contexto,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ariaLabel,
}: Props) {
  const { openWhatsApp } = useWhatsApp();
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => openWhatsApp(contexto)}
      className={buttonClasses(variant, size, className)}
    >
      {children}
    </button>
  );
}

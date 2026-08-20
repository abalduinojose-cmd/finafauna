import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "outline-light"
  | "outline-dark"
  | "whatsapp"
  | "hero-primary"
  | "hero-glass";
type Size = "md" | "lg";

// Estilos compartilhados também pelos CTAs client (WhatsAppCta) — manter aqui a
// única definição visual de botão do site.
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: Size = "md",
  extra = "",
) {
  // Ações em pílula com a display arredondada: o botão "mais pet" do site.
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-all duration-200 active:scale-[0.98] select-none";
  const sizes: Record<Size, string> = {
    md: "px-6 py-3 text-sm sm:text-base",
    lg: "px-8 py-4 text-base sm:text-lg",
  };
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-laranja text-white shadow-[0_10px_30px_-10px_rgba(184,62,20,0.45)] hover:bg-queimado hover:shadow-[0_14px_34px_-10px_rgba(184,62,20,0.6)]",
    "outline-light":
      "border-2 border-white/70 text-white hover:bg-white hover:text-petroleo",
    "outline-dark":
      "border-2 border-petroleo/25 text-petroleo hover:border-petroleo hover:bg-petroleo hover:text-white",
    whatsapp:
      "bg-[#25D366] text-white shadow-[0_10px_30px_-10px_rgba(4,77,61,0.5)] hover:bg-[#1DA851]",
    // Botões do hero sobre o vídeo: laranja com brilho interno e vidro fosco
    "hero-primary":
      "bg-gradient-to-b from-laranja to-queimado text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_16px_36px_-14px_rgba(184,62,20,0.75)] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_20px_42px_-14px_rgba(184,62,20,0.85)]",
    "hero-glass":
      "border border-white/30 bg-white/10 text-white backdrop-blur-md shadow-[0_12px_30px_-18px_rgba(0,26,17,0.7)] hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/20",
  };
  return `${base} ${sizes[size]} ${variants[variant]} ${extra}`;
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export default function Button(props: AnchorProps | NativeButtonProps) {
  const { variant = "primary", size = "md", className = "", children, ...rest } = props;
  const classes = buttonClasses(variant, size, className);

  if ("href" in props && props.href) {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorRest} href={props.href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
      {children}
    </button>
  );
}

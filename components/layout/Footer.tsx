import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { FACEBOOK_URL, INSTAGRAM_URL, LOJAS } from "@/data/lojas";
import { linkWhatsApp, MENSAGENS } from "@/lib/whatsapp";

const NAV = [
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

export default function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer className="relative z-[7] -mt-6 overflow-hidden rounded-t-[28px] bg-floresta text-white">
      <div className="paw-texture absolute inset-0 opacity-[0.015]" aria-hidden />

      {/* Chamada final: a última chance de conversa antes do fim da página */}
      <div className="relative mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="flex flex-col items-start justify-between gap-5 border-b border-white/12 pb-10 sm:flex-row sm:items-center">
          <h2 className="max-w-md text-balance font-display text-[clamp(1.4rem,3.4vw,2.1rem)] font-bold leading-[1.15] text-white">
            Bora deixar seu pet <span className="text-caramelo">mais feliz?</span>
          </h2>
          <WhatsAppCta contexto="geral" size="lg" className="shrink-0">
            <WhatsAppIcon className="size-5" />
            Chamar no WhatsApp
          </WhatsAppCta>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:gap-10">
          <div>
            <Image
              src="/img/logo-script.png"
              alt="Fina Fauna"
              width={1200}
              height={140}
              className="h-7 w-auto sm:h-8"
            />
            <p className="mt-3 flex items-center gap-4 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-caramelo">
              <span aria-hidden className="fio-guia h-px w-10 shrink-0 opacity-80" />
              rações · Petrópolis/RJ
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/50">
              Navegue
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-mono text-sm text-white/75 transition-colors hover:text-caramelo"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/50">
              Unidades
            </h3>
            <ul className="mt-4 space-y-4">
              {LOJAS.map((loja) => (
                <li key={loja.id} className="flex items-center gap-3">
                  <p className="w-24 font-display text-sm font-semibold">{loja.bairro}</p>
                  <a
                    href={loja.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Como chegar na unidade ${loja.bairro}`}
                    className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-caramelo hover:bg-caramelo hover:text-petroleo"
                  >
                    <MapPin className="size-4" aria-hidden />
                  </a>
                  <a
                    href={linkWhatsApp(loja.whatsapp, MENSAGENS.geral)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp da unidade ${loja.bairro}`}
                    className="flex size-10 items-center justify-center rounded-full bg-[#25D366] text-white transition-colors hover:bg-[#1DA851]"
                  >
                    <WhatsAppIcon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/50">
              Siga
            </h3>
            <div className="mt-4 flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Fina Fauna Rações"
                className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-laranja hover:bg-laranja"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Fina Fauna Rações"
                className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-laranja hover:bg-laranja"
              >
                <FacebookIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <span aria-hidden className="fio-guia h-px w-full max-w-xs text-white/30" />
          <p className="text-center font-mono text-[0.65rem] tracking-wide text-white/55">
            © {ano} Fina Fauna Rações · Petrópolis/RJ · Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}

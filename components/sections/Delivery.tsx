import Image from "next/image";
import { AlarmClock, CheckCheck, Home, MapPin, PackageCheck, Wheat } from "lucide-react";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import { WhatsAppIcon } from "@/components/ui/icons";
import { HORARIOS_DELIVERY, LOJAS } from "@/data/lojas";

// A rota do pedido, agora em três passos de verdade, ligados pelo fio da guia.
const PASSOS = [
  {
    numero: "01",
    icone: WhatsAppIcon,
    titulo: "Você pede",
    texto: "Chama a loja no WhatsApp e diz o que o seu pet precisa, sem app e sem cadastro.",
  },
  {
    numero: "02",
    icone: PackageCheck,
    titulo: "A gente separa",
    texto: "Pesamos a ração, conferimos tudo e deixamos o pedido pronto na hora.",
  },
  {
    numero: "03",
    icone: Home,
    titulo: "Chega na sua porta",
    texto: "Combinamos a entrega com você e levamos na Posse, em Pedro do Rio e região.",
  },
];

export default function Delivery() {
  // Enquanto o cliente não informa o horário específico de entrega,
  // mostramos o horário de funcionamento das lojas (ver TODO em data/lojas.ts).
  const horarios =
    HORARIOS_DELIVERY ?? `${LOJAS[0].horarioSemana} · ${LOJAS[0].horarioDomingo}`;

  return (
    <section id="delivery" className="bg-white py-10 sm:py-16" aria-labelledby="delivery-titulo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-creme px-5 py-9 sm:px-10 sm:py-14 lg:px-14">
          <div
            className="absolute -left-32 -top-32 size-[24rem] rounded-full bg-laranja/10 blur-[100px]"
            aria-hidden
          />
          <div className="relative grid items-center gap-9 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Reveal>
                <Kicker tom="laranja">Delivery</Kicker>
                <h2
                  id="delivery-titulo"
                  className="mt-5 text-balance font-display text-[clamp(1.7rem,4.4vw,2.8rem)] font-bold leading-[1.1] text-petroleo"
                >
                  Chamou no WhatsApp,{" "}
                  <span className="text-laranja">chegou na sua porta.</span>
                </h2>
                <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-ink/70 sm:text-lg">
                  Sem aplicativo, sem cadastro e sem carrinho: você fala com
                  quem te atende na loja, pede o que o seu pet precisa e a
                  gente leva até você.
                </p>
              </Reveal>

              <Reveal atraso={0.08}>
                <ol className="mt-8">
                  {PASSOS.map((p, i) => (
                    <li key={p.numero} className="flex gap-4">
                      <span className="flex flex-col items-center" aria-hidden>
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-laranja shadow-[0_10px_24px_-14px_rgba(0,41,27,0.45)] ring-1 ring-petroleo/10">
                          <p.icone className="size-5" />
                        </span>
                        {i < PASSOS.length - 1 && (
                          <span className="fio-guia-v my-1.5 w-px flex-1 text-petroleo/30" />
                        )}
                      </span>
                      <div className={i < PASSOS.length - 1 ? "pb-6" : ""}>
                        <p className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.16em] text-queimado">
                          passo {p.numero}
                        </p>
                        <h3 className="mt-0.5 font-display text-base font-bold text-petroleo sm:text-lg">
                          {p.titulo}
                        </h3>
                        <p className="mt-1 max-w-[40ch] text-sm leading-relaxed text-ink/65">
                          {p.texto}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <WhatsAppCta contexto="delivery" size="lg" className="group w-full sm:w-auto">
                    <WhatsAppIcon className="size-5" />
                    Pedir no WhatsApp
                  </WhatsAppCta>
                </div>

                <p className="mt-6 flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-floresta px-4 py-2 text-xs font-semibold text-white">
                    <Wheat className="size-3.5" aria-hidden />
                    Delivery de ração no KG
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-petroleo/15 px-4 py-2 text-xs font-medium text-ink/70">
                    <AlarmClock className="size-3.5 text-laranja" aria-hidden />
                    {horarios}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-petroleo/15 px-4 py-2 text-xs font-medium text-ink/70">
                    <MapPin className="size-3.5 text-caramelo" aria-hidden />
                    Posse, Pedro do Rio e região
                  </span>
                </p>
              </Reveal>
            </div>

            {/* A van de entregas na porta da loja, com o recado que o cliente recebe */}
            <Reveal atraso={0.12} className="relative">
              <div
                aria-hidden
                className="absolute -right-4 -top-4 h-full w-full rounded-[--radius-bloco] bg-floresta/10"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[--radius-bloco]">
                {/* TODO: trocar pela foto da van quando o cliente salvar o
                    arquivo em fina-fauna/fotos/ (não existe em fonte pública) */}
                <Image
                  src="/img/granel.jpg"
                  alt="Fileira de dispensers de ração a granel dentro da loja da Fina Fauna"
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 460px, 90vw"
                  className="object-cover"
                />
              </div>

              {/* Selo giratório: o destaque do granel no KG */}
              <div className="absolute -right-3 -top-4 size-24 sm:-right-5 sm:-top-6 sm:size-28" aria-hidden>
                <svg viewBox="0 0 100 100" className="gira-lento size-full drop-shadow-[0_10px_20px_rgba(184,62,20,0.45)]">
                  <defs>
                    <path id="circulo-kg" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                  </defs>
                  <circle cx="50" cy="50" r="48" className="fill-laranja" />
                  <text className="fill-white font-mono" style={{ fontSize: "8.4px", letterSpacing: "1.6px" }}>
                    <textPath href="#circulo-kg">RAÇÃO NO KG • DELIVERY • RAÇÃO NO KG •</textPath>
                  </text>
                </svg>
                <Wheat className="absolute inset-0 m-auto size-7 text-white" />
              </div>
              {/* Recado da loja: cartão de conversa flutuante sobre a foto */}
              <figure className="absolute -left-2 bottom-6 w-[min(268px,86%)] rounded-2xl border border-white/40 bg-white/85 p-3.5 shadow-[0_18px_45px_-18px_rgba(0,41,27,0.6)] backdrop-blur-md sm:-left-5 sm:bottom-8">
                <figcaption className="flex items-center gap-2">
                  <Image
                    src="/img/logo-marca.png"
                    alt=""
                    width={56}
                    height={56}
                    className="size-7 shrink-0 rounded-full"
                  />
                  <span className="font-display text-xs font-semibold text-petroleo">
                    Fina Fauna
                  </span>
                  <span className="ml-auto font-mono text-[0.58rem] uppercase tracking-[0.1em] text-ink/45">
                    agora
                  </span>
                </figcaption>
                <p className="mt-2 text-sm leading-relaxed text-ink/85">
                  Anotado! Já separamos tudo e combinamos a entrega com você 🛵
                </p>
                <p className="mt-1.5 flex justify-end" aria-hidden>
                  <CheckCheck className="size-4 text-[#25D366]" />
                </p>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Clock, MapPin, Navigation, Phone, Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/icons";
import { LOJAS } from "@/data/lojas";
import { linkWhatsApp, MENSAGENS } from "@/lib/whatsapp";

export default function Unidades() {
  return (
    <section
      id="unidades"
      className="relative z-[6] -mt-6 rounded-t-[28px] bg-creme py-12 sm:py-16"
      aria-labelledby="unidades-titulo"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Onde estamos"
            id="unidades-titulo"
            titulo="Duas casas, o mesmo cuidado"
            descricao="Passa na loja ou chama direto no WhatsApp da unidade mais perto de você."
          />
        </Reveal>

        <div className="mt-8 grid gap-6 sm:mt-12 lg:grid-cols-2">
          {LOJAS.map((loja, i) => {
            const laranja = loja.id === "posse";
            return (
              <Reveal key={loja.id} atraso={i * 0.08}>
                <article className="overflow-hidden rounded-[--radius-bloco] border border-petroleo/10 bg-white p-2 shadow-[0_20px_45px_-30px_rgba(0,77,51,0.4)]">
                  {/* Fachada real da loja (foto do perfil dela no Google) */}
                  <div className="relative h-48 w-full overflow-hidden rounded-[14px]">
                    <Image
                      src={laranja ? "/img/loja-posse.jpg" : "/img/loja-pedro.jpg"}
                      alt={
                        laranja
                          ? "Fachada da Fina Fauna da Posse, com o letreiro e a loja aberta"
                          : "Entrada da Fina Fauna de Pedro do Rio, com o letreiro branco sobre a fachada verde"
                      }
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 560px, 92vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="flex items-center gap-2.5 font-display text-xl font-bold text-petroleo sm:text-2xl">
                        <span
                          aria-hidden
                          className={`size-2.5 rounded-full ${laranja ? "bg-laranja" : "bg-caramelo"}`}
                        />
                        {loja.bairro}
                      </h3>
                      <p className="flex items-center gap-1.5 rounded-full bg-creme px-3 py-1.5 font-mono text-xs font-medium text-petroleo">
                        <Star className="size-3.5 fill-laranja text-laranja" aria-hidden />
                        {loja.nota.toLocaleString("pt-BR", { minimumFractionDigits: 1 })} ·{" "}
                        {loja.totalAvaliacoes} avaliações
                      </p>
                    </div>

                    <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-ink/70">
                      <MapPin
                        className={`mt-0.5 size-4.5 shrink-0 ${laranja ? "text-laranja" : "text-caramelo"}`}
                        aria-hidden
                      />
                      <span>
                        {loja.endereco} · CEP {loja.cep}
                      </span>
                    </p>
                    <p className="mt-2.5 flex items-center gap-2.5 text-sm text-ink/70">
                      <Phone
                        className={`size-4.5 shrink-0 ${laranja ? "text-laranja" : "text-caramelo"}`}
                        aria-hidden
                      />
                      <a className="font-medium hover:underline" href={`tel:+${loja.whatsapp}`}>
                        {loja.telefone}
                      </a>
                      {loja.telefoneFixo && (
                        <a
                          className="text-ink/55 hover:underline"
                          href={`tel:+55${loja.telefoneFixo.replace(/\D/g, "")}`}
                        >
                          · {loja.telefoneFixo}
                        </a>
                      )}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-petroleo/12 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink/65">
                        <Clock className="size-3.5" aria-hidden />
                        {loja.horarioSemana}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-petroleo/12 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink/65">
                        {loja.horarioDomingo}
                      </span>
                    </div>

                    <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                      {/* Card específico da loja: aqui o WhatsApp vai DIRETO, sem modal */}
                      <a
                        href={linkWhatsApp(loja.whatsapp, MENSAGENS.geral)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-display text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(0,77,51,0.5)] transition-colors hover:bg-[#1DA851]"
                      >
                        <WhatsAppIcon className="size-4.5" />
                        Chamar a loja
                      </a>
                      <a
                        href={loja.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-petroleo/20 px-6 py-3.5 font-display text-sm font-semibold text-petroleo transition-colors hover:border-petroleo hover:bg-petroleo hover:text-white"
                      >
                        <Navigation className="size-4" aria-hidden />
                        Como chegar
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

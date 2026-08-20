import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { MARCAS } from "@/data/marcas";

type MarcaResolvida = (typeof MARCAS)[number] & { temLogo: boolean };

function Cartao({ marca, indice }: { marca: MarcaResolvida; indice: number }) {
  return (
    <div
      className={`flex h-28 w-56 shrink-0 items-center justify-center rounded-[22px] bg-creme/70 px-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_22px_45px_-24px_rgba(0,102,68,0.4)] sm:h-32 sm:w-64 ${
        indice % 2 === 1 ? "translate-y-2" : ""
      }`}
    >
      {marca.temLogo ? (
        // Todos os logos foram normalizados no mesmo canvas 440x176,
        // então uma altura única deixa todos no mesmo tamanho percebido.
        <Image
          src={`/marcas/${marca.arquivo}`}
          alt=""
          width={440}
          height={176}
          loading="lazy"
          className="h-[4.8rem] w-auto sm:h-[5.6rem]"
        />
      ) : (
        <span className="text-center font-display text-base font-bold leading-tight text-petroleo/75 sm:text-lg">
          {marca.nome}
        </span>
      )}
    </div>
  );
}

// Faixa "Marcas queridinhas": letreiro único em loop contínuo, no desktop e
// no mobile, para todo mundo ver todas as marcas passando. O hover pausa.
// Server Component: verifica em build/render se o logo existe em public/marcas/.
export default function Marcas() {
  if (MARCAS.length === 0) return null;
  const comLogo: MarcaResolvida[] = MARCAS.map((marca) => ({
    ...marca,
    temLogo: existsSync(join(process.cwd(), "public", "marcas", marca.arquivo)),
  }));

  return (
    <section
      className="relative z-[1] -mt-6 rounded-t-[28px] bg-white py-10 sm:py-14"
      aria-label="Marcas vendidas nas lojas"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-[clamp(1.4rem,3vw,2rem)] font-bold text-petroleo">
          Marcas queridinhas
        </h2>
        <p className="mt-1 text-sm text-ink/60 sm:text-base">
          As preferidas dos pets daqui, sempre nas prateleiras das duas lojas.
        </p>
      </div>
      <p className="sr-only">{MARCAS.map((m) => m.nome).join(", ")}</p>

      <div className="relative mt-6 overflow-hidden pb-5 pt-2 sm:mt-8">
        <div
          className="ticker-faixa flex w-max hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {[0, 1].map((copia) => (
            <div key={copia} className="flex gap-3 pr-3 sm:gap-4 sm:pr-4">
              {comLogo.map((marca, i) => (
                <Cartao key={marca.nome} marca={marca} indice={i} />
              ))}
            </div>
          ))}
        </div>
        {/* Bordas esfumadas do letreiro */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent sm:w-16"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent sm:w-16"
          aria-hidden
        />
      </div>
    </section>
  );
}

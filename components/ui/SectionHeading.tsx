import Kicker from "./Kicker";

type Props = {
  eyebrow?: string;
  titulo: string;
  descricao?: string;
  tom?: "claro" | "escuro"; // claro = texto escuro em fundo claro
  align?: "center" | "left";
  id?: string;
};

export default function SectionHeading({
  eyebrow,
  titulo,
  descricao,
  tom = "claro",
  align = "left",
  id,
}: Props) {
  const escuro = tom === "escuro";
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className="mb-5">
          <Kicker tom={escuro ? "escuro" : "laranja"} align={align}>
            {eyebrow}
          </Kicker>
        </div>
      )}
      <h2
        id={id}
        className={`text-balance font-display text-[clamp(1.6rem,4.2vw,2.6rem)] font-bold leading-[1.12] ${
          escuro ? "text-white" : "text-petroleo"
        }`}
      >
        {titulo}
      </h2>
      {descricao && (
        <p className={`mt-5 max-w-[52ch] text-base leading-relaxed sm:text-lg ${escuro ? "text-white/75" : "text-ink/70"} ${align === "center" ? "mx-auto" : ""}`}>
          {descricao}
        </p>
      )}
    </div>
  );
}

// Kicker padrão do site: o fio da guia + rótulo em mono caps.
// É o único lugar (junto com os passos do delivery e separadores) onde o
// fio tracejado aparece.
export default function Kicker({
  children,
  tom = "claro",
  align = "left",
}: {
  children: React.ReactNode;
  tom?: "claro" | "escuro" | "laranja";
  align?: "left" | "center";
}) {
  const cores = {
    claro: "text-petroleo/70",
    escuro: "text-caramelo",
    laranja: "text-queimado",
  }[tom];
  return (
    <p
      className={`flex items-center gap-4 font-mono text-[0.72rem] font-medium uppercase tracking-[0.22em] ${cores} ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span aria-hidden className="fio-guia h-px w-12 shrink-0 opacity-70" />
      {children}
    </p>
  );
}

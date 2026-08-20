// Kicker padrão do site: rótulo em mono caps, sem o fio tracejado
// (o cliente pediu para tirar todos os traços que parecem travessão).
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
      {children}
    </p>
  );
}

import Image from "next/image";

// Logomarca oficial da Fina Fauna: emblema circular + assinatura em script,
// dos arquivos enviados pela loja (logo-marca.png e logo-script.png).
export default function Logo({ tamanho = "md" }: { tamanho?: "md" | "lg" }) {
  const lg = tamanho === "lg";
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/img/logo-marca.png"
        alt=""
        width={96}
        height={96}
        className={`${lg ? "size-12" : "size-10"} rounded-full shadow-[0_4px_14px_-4px_rgba(0,0,0,0.35)]`}
      />
      <Image
        src="/img/logo-script.png"
        alt="Fina Fauna Rações"
        width={1200}
        height={140}
        className={`w-auto ${lg ? "h-6" : "h-5"}`}
      />
    </span>
  );
}

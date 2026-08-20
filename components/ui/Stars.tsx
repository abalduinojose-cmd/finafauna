import { Star } from "lucide-react";

// Fileira de estrelas preenchidas (avaliações são todas 5★; para notas médias
// como 4,9 exibimos 5 estrelas cheias, como o próprio Google faz no painel).
export default function Stars({
  quantidade = 5,
  className = "size-4",
  cor = "text-laranja",
}: {
  quantidade?: number;
  className?: string;
  cor?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${cor}`} aria-hidden="true">
      {Array.from({ length: quantidade }).map((_, i) => (
        <Star key={i} className={`${className} fill-current`} />
      ))}
    </span>
  );
}

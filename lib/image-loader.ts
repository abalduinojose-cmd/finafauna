// Loader do next/image no export estático (GitHub Pages): sem otimizador,
// devolve o arquivo original com o basePath na frente.
export default function imageLoader({ src }: { src: string }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}

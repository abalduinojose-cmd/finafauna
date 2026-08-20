import type { NextConfig } from "next";

// Build da prévia (npm run build:pages): export estático para o GitHub Pages,
// servido em /finafauna → precisa de basePath e de loader próprio de imagem,
// porque o next/image sem otimizador NÃO aplica o basePath sozinho.
const exportPages = process.env.PAGES_EXPORT === "1";

const nextConfig: NextConfig = {
  // pedido do cliente: sem o badge de dev tools do Next no canto da tela
  devIndicators: false,
  ...(exportPages
    ? {
        output: "export" as const,
        // pasta própria: o build da prévia não pode corromper o .next do
        // servidor de dev que fica rodando ao mesmo tempo
        distDir: ".next-pages",
        basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
        images: { loader: "custom" as const, loaderFile: "./lib/image-loader.ts" },
      }
    : {}),
};

export default nextConfig;

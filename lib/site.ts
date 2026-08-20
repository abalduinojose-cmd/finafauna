// URL pública atual: prévia no GitHub Pages.
// TODO: trocar pelo domínio definitivo quando o cliente registrar
// (ex.: https://finafaunaracoes.com.br) e zerar o basePath do build:pages.
export const SITE_URL = "https://abalduinojose-cmd.github.io/finafauna";

// Prefixo dos arquivos servidos fora do next/image (vídeos e posters):
// no GitHub Pages o site vive em /finafauna e caminho absoluto cru quebra.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const midia = (caminho: string) => `${BASE_PATH}${caminho}`;

export const SITE_NOME = "Fina Fauna Rações";
export const SITE_DESCRICAO =
  "Pet shop em Petrópolis com duas unidades, na Posse e em Pedro do Rio: ração para cachorro e gato, acessórios, medicamentos veterinários, banho e tosa e delivery pelo WhatsApp.";

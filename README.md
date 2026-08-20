# Fina Fauna Rações — site institucional + delivery

Landing page de conversão local do pet shop **Fina Fauna Rações** (Petrópolis/RJ),
com duas unidades: **Posse** e **Pedro do Rio**. Next.js 16 (App Router),
TypeScript, Tailwind v4 e Motion. Tudo estático, sem backend e sem checkout.

Conceito visual: **"o fio da guia"**. A linha tracejada de uma guia de passeio é
a única assinatura do site: aparece nos kickers, ligando os passos do delivery,
nos separadores do sobre e nos leaders do menu de banho e tosa. Tipografia:
Unbounded (display) + Inter (corpo) + DM Mono (kickers e microtextos).

## Rodar

```bash
npm install
npm run dev     # http://localhost:5222
npm run build   # build de produção
```

## Onde trocar cada coisa

| O que | Onde |
|---|---|
| Endereços, telefones, WhatsApp, horários, notas | [`data/lojas.ts`](data/lojas.ts) — fonte única; nada disso fica em JSX |
| **Horário de entrega do delivery** | `HORARIOS_DELIVERY` no topo de [`data/lojas.ts`](data/lojas.ts) (hoje mostra o horário das lojas como fallback) |
| Mensagens pré-preenchidas do WhatsApp | [`lib/whatsapp.ts`](lib/whatsapp.ts) |
| Avaliações do Google | [`data/reviews.json`](data/reviews.json) + fotos em [`public/avatars/`](public/avatars/) |
| Textos das seções | `components/sections/*.tsx` |
| Fotos (hero, sobre, banho e tosa) | [`public/img/`](public/img/) — trocar mantendo os nomes |
| Foto da Tia Jessica | `components/sections/BanhoTosa.tsx` (procure o `TODO`) |
| Galeria antes/depois do banho e tosa | `components/sections/BanhoTosa.tsx` (procure o `TODO`) |
| Logo | `components/ui/Logo.tsx` (hoje é tipográfica; procure o `TODO`) |
| Domínio do site (SEO/OG) | `SITE_URL` em [`lib/site.ts`](lib/site.ts) |
| Cores e fontes | `@theme` em [`app/globals.css`](app/globals.css) |

## Avaliações do Google

O site **não** chama nenhuma API em runtime: ele importa `data/reviews.json`
no build. O JSON atual foi preenchido com avaliações reais lidas nos perfis
das duas lojas no Google Maps (19/08/2026), com as fotos dos avaliadores
baixadas para `public/avatars/`.

Para atualizar via Google Places API:

```bash
# Windows (PowerShell)
$env:GOOGLE_PLACES_API_KEY = "sua-chave"
$env:PLACE_ID_POSSE = "ChIJ..."
$env:PLACE_ID_PEDRO_DO_RIO = "ChIJ..."
python scripts/fetch_reviews.py
```

O script é idempotente: se a API falhar para uma loja, o bloco existente dela
é preservado. Atenção: a Places API devolve no máximo 5 avaliações por loja —
para uma curadoria maior, edite o JSON à mão seguindo o formato existente.

## Estrutura

- `app/` — layout (fontes, metadata, JSON-LD das duas `PetStore`), página,
  `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `icon.svg`
- `components/sections/` — Hero, Delivery, Sobre, BanhoTosa, Avaliações
  (carrossel client), Unidades
- `components/ui/` — botões, modal de escolha de unidade (`WhatsAppProvider`),
  FAB, Reveal, ícones
- Todo CTA genérico de WhatsApp abre o **modal de escolha de unidade**;
  só os cards da seção Unidades (e o rodapé) linkam direto para um número.

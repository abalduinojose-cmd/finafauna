// Fonte única de verdade das duas unidades da Fina Fauna Rações.
// Nenhum telefone ou endereço pode estar hardcoded em JSX — tudo vem daqui.
// Dados conferidos no Google Maps em 19/08/2026.

// TODO: preencher com os horários reais de ENTREGA (delivery) quando o cliente
// informar. Enquanto estiver vazio, a pílula de horários da seção Delivery
// mostra o horário de funcionamento das lojas.
export const HORARIOS_DELIVERY: string | null = null;
// Exemplo depois de preenchido:
// export const HORARIOS_DELIVERY = "Entregas de segunda a sábado, das 9h às 18h";

export type Loja = {
  id: "posse" | "pedro-do-rio";
  nome: string;
  bairro: string;
  endereco: string;
  cep: string;
  telefone: string; // formato exibido
  telefoneFixo?: string; // linha fixa adicional (Posse tem fixo + celular)
  whatsapp: string; // formato E.164 sem "+": 5524988319852
  temWhatsapp: boolean;
  horarioSemana: string; // seg–sáb, como exibido
  horarioDomingo: string;
  // horários em formato 24h para o JSON-LD (openingHoursSpecification)
  horas: {
    semana: { abre: string; fecha: string };
    domingo: { abre: string; fecha: string };
  };
  nota: number;
  totalAvaliacoes: number;
  geo: { lat: number; lng: number };
  googleMapsUrl: string;
  googleReviewsUrl: string;
  googleEmbedQuery: string;
};

export const LOJAS: readonly Loja[] = [
  {
    id: "posse",
    nome: "Fina Fauna Rações Posse",
    bairro: "Posse",
    endereco: "Estr. União e Indústria, 33393 - Posse, Petrópolis - RJ",
    cep: "25770-093",
    telefone: "(24) 98831-9852",
    telefoneFixo: "(24) 2259-1728",
    whatsapp: "5524988319852",
    temWhatsapp: true,
    horarioSemana: "Seg a Sáb · 8h às 20h",
    horarioDomingo: "Dom · 8h às 13h",
    horas: {
      semana: { abre: "08:00", fecha: "20:00" },
      domingo: { abre: "08:00", fecha: "13:00" },
    },
    nota: 4.9,
    totalAvaliacoes: 25,
    geo: { lat: -22.2552452, lng: -43.0758221 },
    googleMapsUrl: "https://maps.google.com/?cid=14261102997942894283",
    googleReviewsUrl:
      "https://www.google.com/maps/place/Fina+Fauna+Ra%C3%A7%C3%B5es+Posse/@-22.2552452,-43.0758221,17z/data=!4m8!3m7!1s0x985128b06a5f6d:0xc5e99d9e39a4fecb!8m2!3d-22.2552452!4d-43.0758221!9m1!1b1!16s%2Fg%2F11y1yvlj5b",
    googleEmbedQuery: "Fina Fauna Rações Posse, Petrópolis - RJ",
  },
  {
    id: "pedro-do-rio",
    nome: "Fina Fauna Rações Pedro do Rio",
    bairro: "Pedro do Rio",
    endereco: "R. Dr. Barros Franco, 181 - Pedro do Rio, Petrópolis - RJ",
    cep: "25750-290",
    telefone: "(24) 2280-7124",
    whatsapp: "552422807124",
    temWhatsapp: true,
    horarioSemana: "Seg a Sáb · 8h às 19h",
    horarioDomingo: "Dom · 8h às 13h",
    horas: {
      semana: { abre: "08:00", fecha: "19:00" },
      domingo: { abre: "08:00", fecha: "13:00" },
    },
    nota: 5.0,
    totalAvaliacoes: 12,
    geo: { lat: -22.3340583, lng: -43.1328171 },
    googleMapsUrl: "https://maps.google.com/?cid=14713831712327167191",
    googleReviewsUrl:
      "https://www.google.com/maps/place/Fina+Fauna+Ra%C3%A7%C3%B5es+Pedro+do+Rio/@-22.3340583,-43.1328171,17z/data=!4m8!3m7!1s0x9855637c643c4f:0xcc3207fc32236cd7!8m2!3d-22.3340583!4d-43.1328171!9m1!1b1!16s%2Fg%2F11vqvqm5yq",
    googleEmbedQuery: "Fina Fauna Rações Pedro do Rio, Petrópolis - RJ",
  },
] as const;

export const INSTAGRAM_URL = "https://www.instagram.com/finafaunaracoes/";
export const FACEBOOK_URL = "https://www.facebook.com/finafaunaracoes";
export const SLOGAN = "Tudo para tornar a vida do seu Pet mais feliz";

// Nota média ponderada das duas unidades, usada na barra de credibilidade do hero.
export const NOTA_GERAL = (() => {
  const total = LOJAS.reduce((s, l) => s + l.totalAvaliacoes, 0);
  const soma = LOJAS.reduce((s, l) => s + l.nota * l.totalAvaliacoes, 0);
  return { nota: Math.round((soma / total) * 10) / 10, total };
})();

import { FACEBOOK_URL, INSTAGRAM_URL, LOJAS } from "@/data/lojas";
import { SITE_URL } from "./site";

// JSON-LD com @graph de dois nós PetStore (um por unidade), para o SEO local.
export function montarJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": LOJAS.map((loja) => ({
      "@type": "PetStore",
      "@id": `${SITE_URL}/#${loja.id}`,
      name: loja.nome,
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      telephone: `+${loja.whatsapp}`,
      address: {
        "@type": "PostalAddress",
        streetAddress:
          loja.id === "posse" ? "Estrada União e Indústria, 33393" : "Rua Dr. Barros Franco, 181",
        addressLocality: "Petrópolis",
        addressRegion: "RJ",
        postalCode: loja.cep,
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: loja.geo.lat,
        longitude: loja.geo.lng,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: loja.horas.semana.abre,
          closes: loja.horas.semana.fecha,
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: loja.horas.domingo.abre,
          closes: loja.horas.domingo.fecha,
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: loja.nota,
        reviewCount: loja.totalAvaliacoes,
        bestRating: 5,
      },
      sameAs: [INSTAGRAM_URL, FACEBOOK_URL, loja.googleMapsUrl],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Produtos e serviços",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Banho e tosa",
              description: "Banho, tosa higiênica, tosa na máquina e na tesoura, corte de unhas, limpeza de ouvidos e hidratação.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Delivery de rações e produtos pet",
              description: "Entrega em domicílio na Posse, em Pedro do Rio e região, com pedido pelo WhatsApp.",
            },
          },
        ],
      },
    })),
  };
}

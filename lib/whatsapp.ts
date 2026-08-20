export type ContextoWhatsApp = "delivery" | "tosa" | "geral";

export const MENSAGENS: Record<ContextoWhatsApp, string> = {
  delivery: "Olá! Vim pelo site e quero fazer um pedido para entrega 🐾",
  tosa: "Olá! Vim pelo site e quero agendar um banho e tosa 🛁",
  geral: "Olá! Vim pelo site da Fina Fauna e gostaria de mais informações.",
};

export const linkWhatsApp = (numero: string, msg: string) =>
  `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;

// Marcas queridinhas: a lista que o cliente confirmou (logos enviados em
// anexo) + marcas visíveis nas fotos reais das lojas.
// `arquivo` é o nome esperado do logo em public/marcas/. Assim que o arquivo
// existir lá (PNG, de preferência com fundo transparente ou branco), o cartão
// troca o nome pelo logo automaticamente, sem mexer em código.

export type Marca = {
  nome: string;
  arquivo: string; // ex.: "billy-dog.png" em public/marcas/
};

export const MARCAS: Marca[] = [
  { nome: "Billy Dog", arquivo: "billy-dog.png" },
  { nome: "Premier", arquivo: "premier.png" },
  { nome: "Fórmula Natural", arquivo: "formula-natural.png" },
  { nome: "Simparic", arquivo: "simparic.png" },
  { nome: "NexGard", arquivo: "nexgard.png" },
  { nome: "Quatree", arquivo: "quatree.png" },
  { nome: "Pedigree", arquivo: "pedigree.png" },
  { nome: "Foster", arquivo: "foster.png" },
  { nome: "Quartz", arquivo: "quartz.png" },
];

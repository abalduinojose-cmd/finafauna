#!/usr/bin/env python3
"""Baixa avaliações do Google Places e gera data/reviews.json + avatares locais.

Uso:
    set GOOGLE_PLACES_API_KEY=sua-chave        (Windows)
    export GOOGLE_PLACES_API_KEY=sua-chave     (Linux/macOS)
    python scripts/fetch_reviews.py

O script é idempotente: se a API falhar para uma loja, o bloco existente dela
em data/reviews.json é preservado. O site nunca chama a API em runtime — ele
importa o JSON gerado aqui em build time.

Observação: a Places API retorna no máximo 5 avaliações por lugar. O
reviews.json deste repositório foi preenchido manualmente com avaliações reais
lidas nos perfis do Google das duas lojas; rodar o script substitui cada bloco
pelo que a API devolver.
"""

from __future__ import annotations

import hashlib
import json
import os
import sys
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
ARQUIVO_JSON = RAIZ / "data" / "reviews.json"
PASTA_AVATARS = RAIZ / "public" / "avatars"

# place_id de cada unidade (Google Places). Para descobrir/conferir:
# https://developers.google.com/maps/documentation/places/web-service/place-id
LOJAS = {
    # TODO: conferir os place_id "ChIJ..." no painel do Google Business.
    # Os identificadores hexadecimais (FID) usados nos links do site são:
    #   posse:        0x985128b06a5f6d:0xc5e99d9e39a4fecb
    #   pedro-do-rio: 0x9855637c643c4f:0xcc3207fc32236cd7
    "posse": os.environ.get("PLACE_ID_POSSE", ""),
    "pedro-do-rio": os.environ.get("PLACE_ID_PEDRO_DO_RIO", ""),
}


def baixar_avatar(url: str) -> str | None:
    """Baixa a foto de perfil para public/avatars/ e devolve o caminho público."""
    if not url:
        return None
    nome = hashlib.sha256(url.encode()).hexdigest()[:16] + ".jpg"
    destino = PASTA_AVATARS / nome
    if not destino.exists():
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=20) as resp:
                destino.write_bytes(resp.read())
        except OSError as erro:
            print(f"  aviso: não baixou avatar ({erro})")
            return None
    return f"/avatars/{nome}"


def buscar_loja(place_id: str, chave: str) -> dict | None:
    """Busca nota, total e avaliações de um lugar na Places API (Details)."""
    parametros = urllib.parse.urlencode(
        {
            "place_id": place_id,
            "fields": "rating,user_ratings_total,reviews,url",
            "language": "pt-BR",
            "reviews_sort": "most_relevant",
            "key": chave,
        }
    )
    url = f"https://maps.googleapis.com/maps/api/place/details/json?{parametros}"
    try:
        with urllib.request.urlopen(url, timeout=30) as resp:
            corpo = json.load(resp)
    except OSError as erro:
        print(f"  erro de rede: {erro}")
        return None

    if corpo.get("status") != "OK":
        print(f"  API respondeu {corpo.get('status')}: {corpo.get('error_message', '')}")
        return None

    resultado = corpo["result"]
    reviews = []
    for r in resultado.get("reviews", []):
        avatar = baixar_avatar(r.get("profile_photo_url", ""))
        if not avatar:
            continue  # foto de perfil é obrigatória no card
        reviews.append(
            {
                "autor": r.get("author_name", ""),
                "avatar": avatar,
                "nota": r.get("rating", 5),
                "texto": (r.get("text") or "").strip(),
                "quando": r.get("relative_time_description", ""),
                "url": r.get("author_url") or resultado.get("url", ""),
            }
        )
    return {
        "rating": resultado.get("rating", 0),
        "total": resultado.get("user_ratings_total", 0),
        "reviews": reviews,
    }


def main() -> int:
    chave = os.environ.get("GOOGLE_PLACES_API_KEY")
    if not chave:
        print("Defina a variável de ambiente GOOGLE_PLACES_API_KEY.")
        return 1

    PASTA_AVATARS.mkdir(parents=True, exist_ok=True)

    # Preserva o conteúdo atual: falha da API não pode quebrar o JSON existente.
    dados = {"atualizadoEm": date.today().isoformat(), "lojas": {}}
    if ARQUIVO_JSON.exists():
        try:
            dados = json.loads(ARQUIVO_JSON.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            print("aviso: reviews.json atual está inválido, recriando do zero")
            dados = {"atualizadoEm": date.today().isoformat(), "lojas": {}}
    dados.setdefault("lojas", {})

    baixadas = 0
    for loja_id, place_id in LOJAS.items():
        print(f"[{loja_id}]")
        if not place_id:
            print("  place_id não definido (PLACE_ID_POSSE / PLACE_ID_PEDRO_DO_RIO), pulando.")
            continue
        novo = buscar_loja(place_id, chave)
        if novo is None:
            print("  mantendo os dados existentes desta loja.")
            continue
        dados["lojas"][loja_id] = novo
        baixadas += len(novo["reviews"])
        print(f"  ok: nota {novo['rating']}, {novo['total']} avaliações, {len(novo['reviews'])} com texto/foto")

    dados["atualizadoEm"] = date.today().isoformat()
    ARQUIVO_JSON.write_text(
        json.dumps(dados, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"\nResumo: {baixadas} avaliações gravadas em {ARQUIVO_JSON.relative_to(RAIZ)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

# 09: Transcribir Carta, páginas 26–50

**What to build:** Los Platos de las páginas 26 a 50 de la Carta de Kayi Sushi Barcelona (`carta/carta_page-NNNN.jpg`, solo en local y fuera de git) entran al Catálogo real, así que se pueden buscar y contar en la app.

Reglas (spec → Implementation Decisions → Catálogo; ADR 0001):
- Entra toda la comida (sushi, dimsum, platos calientes, postres…); las bebidas no entran. Las páginas sin Platos (precios, normas) se saltean.
- `numero`: el número de la Carta (por ejemplo 158). Es el id fijo.
- `nombre`: en castellano y en formato de oración, sin el sufijo "N PZ" ("BAO POLLO 2PZ" → "Bao pollo"). Se ignora el catalán.
- `piezas`: lo que dice el sufijo "N PZ"; 1 si no indica.
- `categoria`: la sección de la página (por ejemplo "Nigiri", "Dimsum").
- Se agregan al final, respetando el orden de la Carta.

**Blocked by:** 08 (Transcribir Carta, páginas 1–25)

**Status:** resolved

- [x] Cada página de 26 a 50 revisada; cada Plato de comida transcrito con número, nombre limpio, piezas y categoría
- [x] Si algo se lee mal o es ambiguo, se deja una nota al pie de este ticket en vez de inventar el dato
- [x] El test de validación del Catálogo sigue en verde (números únicos, piezas ≥ 1)
- [x] La app compila, y los Platos nuevos se pueden encontrar buscando por número y por nombre

## Comments

Ninguna página se saltó y no hay números ilegibles.

Ambigüedades:
- El orden no es monótono: después de 099 (p32) vienen 280–355 y luego 100–110 (p46–50). Se respetó el orden de las páginas.
- 092 "Fideo de arroz verduras i ous": el nombre mezcla catalán, y la descripción está copiada de 093. Se dejó el nombre tal cual.
- 284 Ternera barbacoa y 355 Vieras a la plancha: la foto muestra varias piezas pero no tienen sufijo PZ, así que piezas = 1 (regla estricta).
- 302 Langostino con sal y pimenta especial lleva "1€ EXTRA" y 105 Espaguetis de salmón es "1 máx por persona". Los dos se incluyeron.
- Erratas que se dejaron como están impresas: 095 "Espaquetis", 108 "Tatakai", 344 "Tori terikaki", 342 "Rejo", 283/302/305 "pimento/pimenta".
- Donburi aparece en dos secciones (099 y 110), con la misma categoría.

Saltos (no impresos en estas páginas): 078–079, 089–091, 094, 096–098, 106, 286, 290–301, 307, 309–339, 345, 349–350, 352, 354.

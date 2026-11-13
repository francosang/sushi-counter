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

**Status:** ready-for-agent

- [ ] Cada página de 26 a 50 revisada; cada Plato de comida transcrito con número, nombre limpio, piezas y categoría
- [ ] Si algo se lee mal o es ambiguo, se deja una nota al pie de este ticket en vez de inventar el dato
- [ ] El test de validación del Catálogo sigue en verde (números únicos, piezas ≥ 1)
- [ ] La app compila, y los Platos nuevos se pueden encontrar buscando por número y por nombre

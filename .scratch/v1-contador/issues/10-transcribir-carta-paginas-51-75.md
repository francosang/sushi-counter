# 10: Transcribir Carta, páginas 51–75

**What to build:** Los Platos de las páginas 51 a 75 de la Carta de Kayi Sushi Barcelona (`carta/carta_page-NNNN.jpg`, solo en local y fuera de git) entran al Catálogo real, así que se pueden buscar y contar en la app.

Reglas (spec → Implementation Decisions → Catálogo; ADR 0001):
- Entra toda la comida (sushi, dimsum, platos calientes, postres…); las bebidas no entran. Las páginas sin Platos (precios, normas) se saltean.
- `numero`: el número de la Carta (por ejemplo 158). Es el id fijo.
- `nombre`: en castellano y en formato de oración, sin el sufijo "N PZ" ("BAO POLLO 2PZ" → "Bao pollo"). Se ignora el catalán.
- `piezas`: lo que dice el sufijo "N PZ"; 1 si no indica.
- `categoria`: la sección de la página (por ejemplo "Nigiri", "Dimsum").
- Se agregan al final, respetando el orden de la Carta.

**Blocked by:** 09 (Transcribir Carta, páginas 26–50)

**Status:** ready-for-agent

- [ ] Cada página de 51 a 75 revisada; cada Plato de comida transcrito con número, nombre limpio, piezas y categoría
- [ ] Si algo se lee mal o es ambiguo, se deja una nota al pie de este ticket en vez de inventar el dato
- [ ] El test de validación del Catálogo sigue en verde (números únicos, piezas ≥ 1)
- [ ] La app compila, y los Platos nuevos se pueden encontrar buscando por número y por nombre

## Comments

Ninguna página se saltó y no hay números ilegibles.

Ambigüedades:
- 150/151 están impresos "G150."/"G151."; se conserva el prefijo G (decisión del usuario).
- 214 "Ura sake cocido plus": el castellano no tiene sufijo y el catalán dice "4PZ"; piezas = 4.
- 217, 225, 231 y 132 "Bolita salmon tobiko" no tienen sufijo PZ, así que piezas = 1, aunque probablemente sean más.
- El encabezado de p75 dice "Dutou", pero los Platos son uramaki (231–236). Se conservó la categoría "Dutou" como está impresa.
- La sección está impresa como "Onigri"; se corrigió a "Onigiri" (decisión del usuario).
- 131 tiene el sufijo entre paréntesis "(1PZ)"; piezas = 1.

Saltos (no impresos en estas páginas): 122–124, 127–128, 133–140, 144, 146, 148, 152, 154, 157, 159, 162, 166, 168, 171–174, 181–182, 187–189, 195–196, 200, 205–210, 212–213, 215–216, 220, 222, 226–227, 229, 232–234.

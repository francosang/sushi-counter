# 08: Transcribir Carta, páginas 1–25

**What to build:** Los Platos de las páginas 1 a 25 de la Carta de Kayi Sushi Barcelona (`carta/carta_page-NNNN.jpg`, solo en local y fuera de git) entran al Catálogo real, así que se pueden buscar y contar en la app.

Reglas (spec → Implementation Decisions → Catálogo; ADR 0001):
- Entra toda la comida (sushi, dimsum, platos calientes, postres…); las bebidas no entran. Las páginas sin Platos (precios, normas) se saltean.
- `numero`: el número de la Carta (por ejemplo 158). Es el id fijo.
- `nombre`: en castellano y en formato de oración, sin el sufijo "N PZ" ("BAO POLLO 2PZ" → "Bao pollo"). Se ignora el catalán.
- `piezas`: lo que dice el sufijo "N PZ"; 1 si no indica.
- `categoria`: la sección de la página (por ejemplo "Nigiri", "Dimsum").
- Se agregan al final, respetando el orden de la Carta.

**Blocked by:** 01 (Esqueleto desplegado con Catálogo de ejemplo)

**Status:** resolved

- [x] El Catálogo de ejemplo se reemplaza por el Catálogo real (que empieza con estas páginas)
- [x] Cada página de 1 a 25 revisada; cada Plato de comida transcrito con número, nombre limpio, piezas y categoría
- [x] Si algo se lee mal o es ambiguo, se deja una nota al pie de este ticket en vez de inventar el dato
- [x] El test de validación del Catálogo sigue en verde (números únicos, piezas ≥ 1)
- [x] La app compila, y los Platos nuevos se pueden encontrar buscando por número y por nombre

## Comments

Transcrito (páginas 08–25; 01–07 son precios, alérgenos y bebidas, se saltan).

Ambigüedades:
- p25 "Sopa de mariscos" y "Sopa agripicante": el número impreso es "X.", sin número. Se omitieron.
- p17 repite "037. Aros de gamba" con otra foto (parece un rollo de papel de arroz). Se conservó solo el 037 de p16; el de p17 quizá sea un 039/040 mal impreso.
- 038 "Gyoza frito 3U": "U" cuenta como "PZ" (decisión del usuario), piezas = 3.
- 027 "Pollo frito": la línea en catalán está mal impresa; se usó el castellano.
- Erratas que se dejaron como están impresas: 003 "Coctel de camarone", 036 "Tequenos", 056 "pimento", 028 "limon", 033 "sesamo".

Saltos en la numeración (no impresos en estas páginas): 001, 008–019, 030, 039–040, 043, 048–052, 057–060, 063–069.

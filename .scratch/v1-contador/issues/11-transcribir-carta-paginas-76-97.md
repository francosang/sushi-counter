# 11: Transcribir Carta, páginas 76–97

**What to build:** Los Platos de las páginas 76 a 97 de la Carta de Kayi Sushi Barcelona (`carta/carta_page-NNNN.jpg`, solo en local y fuera de git) entran al Catálogo real, así que se pueden buscar y contar en la app.

Reglas (spec → Implementation Decisions → Catálogo; ADR 0001):
- Entra toda la comida (sushi, dimsum, platos calientes, postres…); las bebidas no entran. Las páginas sin Platos (precios, normas) se saltean.
- `numero`: el número de la Carta (por ejemplo 158). Es el id fijo.
- `nombre`: en castellano y en formato de oración, sin el sufijo "N PZ" ("BAO POLLO 2PZ" → "Bao pollo"). Se ignora el catalán.
- `piezas`: lo que dice el sufijo "N PZ"; 1 si no indica.
- `categoria`: la sección de la página (por ejemplo "Nigiri", "Dimsum").
- Se agregan al final, respetando el orden de la Carta.

**Blocked by:** 10 (Transcribir Carta, páginas 51–75)

**Status:** resolved

- [x] Cada página de 76 a 97 revisada; cada Plato de comida transcrito con número, nombre limpio, piezas y categoría
- [x] Si algo se lee mal o es ambiguo, se deja una nota al pie de este ticket en vez de inventar el dato
- [x] El test de validación del Catálogo sigue en verde (números únicos, piezas ≥ 1)
- [x] Revisión final del Catálogo completo: sin números duplicados, y cada salto en la numeración comprobado contra la Carta (o justificado: bebida, número que no existe)
- [x] La app compila, y los Platos nuevos se pueden encontrar buscando por número y por nombre

## Comments

Páginas 76–86: Uramaki, Sashimi, Especiales y Sushi mixto. Páginas 87–97: Postres (categoría "Postres", con los códigos tal cual P1–P28, P062, P064, P065).

Ambigüedades:
- 244, 246, 400, 401 y 403 no tienen sufijo PZ (la foto muestra 4), así que piezas = 1.
- 251 Sashimi kayi: piezas = 5 (3 de salmón, 1 de atún y 1 de gamba, según la descripción). 263 Mix kayi 6: piezas = 8 (descripción "(8pz)"; el "6" es parte del nombre). 265 Mix kayi 2: piezas = 9.
- 254/256 dicen "1PIEZA"; piezas = 1.
- Erratas que se dejaron como están impresas: 239 "Ebitem", 240 "Rollo dragon".
- Postres: P18 tiene dos sufijos "2PZ", así que piezas = 4 (decisión del usuario). P28 "Profiteroles 4U": piezas = 4 (U cuenta como PZ). P25/P26 "N bolas" no es sufijo PZ, así que piezas = 1 y el nombre conserva "bolas".
- Postres: las líneas en catalán de P3, P064 y P065 tienen errores de copia; se usó el castellano. Erratas que se dejaron como están impresas: "chocolata" (P10), "Ferrore" (P13), "tención" (P17), "crocant" (P21), "Sacher" (P23, P24), "arandanos", "tiramisu", "te".

Saltos en esta parte: 242–243, 247–249, 253, 255, 257–258, 260–262, 264, 402; Postres P029–P061 y P063. No están impresos en estas páginas.

### Revisión final del Catálogo completo
- 206 Platos. Sin números duplicados (lo comprueba el test "es válido", y un test nuevo fija el tamaño en 206). Todos tienen piezas ≥ 1.
- Saltos: las páginas 01–07 son precios, alérgenos y bebidas (sin Platos). Cada página de comida se revisó, y todos los demás saltos de numeración (listados en los tickets 08–11) son números que no aparecen impresos en ninguna página de la Carta. Únicas excepciones: dos sopas de p25 impresas sin número ("X."), que se omitieron, y un segundo "037" en p17, que se descartó por duplicado (ver ticket 08). Puede que esos tres Platos sean números del hueco 039–040 o 063–069, pero la Carta no lo permite confirmar.

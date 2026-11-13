# 02: Contar Platos

**What to build:** Tocás la tarjeta de un Plato y se suma a tu Consumo: el total de Piezas, grande y fijo arriba, sube las Piezas que trae ese Plato. La tarjeta queda resaltada con su "×N" y un − pequeño, que resta un Plato entero. Si recargás la página, la cuenta sigue ahí.

Acá nace el **núcleo de lógica** de la spec: un módulo independiente de React, que recibe el Catálogo, un almacenamiento y un reloj inyectables. Este ticket implementa `tomar(numero)`, `devolver(numero)` y `consumo()`, más el modelo guardado y versionado (Visita activa con inicio, última actividad y un mapa número de Plato → veces). Las Piezas no se guardan: se calculan con el Catálogo.

Ver la spec: historias 12–21, 34, 47 y 49; Implementation Decisions → Núcleo de lógica y Modelo persistido.

**Blocked by:** 01 (Esqueleto desplegado con Catálogo de ejemplo)

**Status:** resolved

- [x] Tests (Vitest, escritos primero con `/tdd`) que pasan solo por la interfaz pública del núcleo, con almacenamiento en memoria y reloj controlable
- [x] Tomar dos veces un Plato de 8 Piezas da un total de 16; un Plato de 1 Pieza suma 1
- [x] `devolver` resta un Plato entero; devolver un Plato no tomado no hace nada y nunca baja de cero
- [x] Un núcleo nuevo, creado con el mismo almacenamiento, conserva el Consumo
- [x] Un número de Plato guardado que ya no está en el Catálogo se ignora en el total sin errores
- [x] El formato guardado lleva número de versión
- [x] En la UI, tocar la tarjeta suma con respuesta visual inmediata; la tarjeta tomada se ve resaltada con "×N"
- [x] El − aparece solo si el contador es mayor que 0, y tocarlo no cuenta como tocar la tarjeta
- [x] El total de Piezas, grande, queda fijo arriba
- [x] Las tarjetas no se reordenan al contar

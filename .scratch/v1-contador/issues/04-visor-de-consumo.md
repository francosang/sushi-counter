# 04: Visor de Consumo

**What to build:** Tocás el total de Piezas y se abre el detalle de tu Consumo: cada Plato tomado con su "×N" y las Piezas que suma, ordenados de más a menos Piezas. Si todavía no tomaste nada, lo dice. Con un toque volvés a la lista.

Ver la spec: historias 22–26; Implementation Decisions → `consumo()` (líneas del detalle) y UI → Detalle de Consumo.

**Blocked by:** 02 (Contar Platos)

**Status:** resolved

- [x] Tests del núcleo: las líneas del detalle de `consumo()` vienen ordenadas por Piezas, de más a menos, cada una con veces y Piezas
- [x] Tocar el total abre el detalle; un toque vuelve a la lista
- [x] El detalle muestra el total y cada Plato tomado con "×N" y sus Piezas
- [x] Sin Consumo se muestra un mensaje de vacío
- [x] El detalle deja lugar para los botones "Compartir" (06) y "Terminar visita" (05)

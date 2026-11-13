# 01: Esqueleto desplegado con Catálogo de ejemplo

**What to build:** Abrís la URL de GitHub Pages en el celular y ves la lista de Platos de un Catálogo de ejemplo, agrupada por categoría y en el orden de la Carta, en una pantalla pensada para móvil. El proyecto queda montado (Vite + React + TypeScript + Vitest) y cada push a `main` se despliega solo. El Catálogo de ejemplo (unos 10 Platos de 2–3 categorías, tomados de páginas reales de `carta/`) ya tiene el formato final de la spec: `numero`, `nombre`, `piezas` y `categoria`.

Ver la spec: `.scratch/v1-contador/spec.md` (Implementation Decisions → Stack, Catálogo).

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Proyecto Vite + React + TypeScript con Vitest funcionando (`test` y `build` en verde)
- [ ] Catálogo de ejemplo como archivo de datos separado del código, con el formato de la spec
- [ ] Un test valida cualquier Catálogo: números únicos, `piezas` entero ≥ 1, nombre y categoría no vacíos
- [ ] La pantalla muestra cada Plato con número, nombre y piezas, agrupado por categoría y en el orden de la Carta
- [ ] Interfaz en español, legible en un celular (viewport móvil, zonas de toque grandes)
- [ ] Antes de crearlo, se confirma con el usuario el repo público `sushi-counter` en GitHub; `base` configurado para `/sushi-counter/`
- [ ] Una GitHub Action construye y publica en GitHub Pages en cada push a `main`; la URL carga en un celular

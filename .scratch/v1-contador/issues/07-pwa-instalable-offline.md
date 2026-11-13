# 07: PWA instalable y offline

**What to build:** Desde el navegador del celular podés "Agregar a pantalla de inicio" y la app abre como una app más, con su ícono. En modo avión, la app carga y funciona entera, con el Catálogo incluido y la cuenta guardada en el celular.

Ver la spec: historias 43–44; Implementation Decisions → PWA.

**Blocked by:** 01 (Esqueleto desplegado con Catálogo de ejemplo)

**Status:** ready-for-agent

- [ ] Manifest con nombre, colores e íconos; se puede instalar en Android (Chrome) e iOS (Safari)
- [ ] Un service worker precachea la app y el Catálogo, y funciona con el base path `/sushi-counter/`
- [ ] Prueba manual en el celular: después de una primera visita con conexión, en modo avión la app abre y se puede contar
- [ ] Al publicar una versión nueva, la app se actualiza sin quedar trabada en la anterior

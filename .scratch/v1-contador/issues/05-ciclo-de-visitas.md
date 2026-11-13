# 05: Ciclo de Visitas

**What to build:** Cada ida al buffet es una Visita. Empieza sola con el primer toque. En el detalle, "Terminar visita" pide confirmación, guarda la Visita en el historial del celular y deja el total en cero. Si abrís la app más de 6 horas después de tu última actividad, te pregunta: "¿Seguís en la misma visita o empezás una nueva?".

El núcleo suma `terminarVisita()` y `necesitaConfirmarVisita()`.

Ver la spec: historias 27–33; Implementation Decisions → `terminarVisita()`, `necesitaConfirmarVisita()` y Modelo persistido.

**Blocked by:** 04 (Visor de Consumo)

**Status:** ready-for-agent

- [ ] Tests del núcleo (reloj controlable): el primer `tomar` crea la Visita activa
- [ ] Tests: después de `terminarVisita()`, el total es 0 y el historial guardado tiene una Visita con su fecha de fin
- [ ] Tests: `necesitaConfirmarVisita()` es verdadero a las 7 horas de la última actividad y falso a las 5; sin Visita activa, es falso
- [ ] Tests: `tomar` y `devolver` registran actividad
- [ ] "Terminar visita" en el detalle, con diálogo de confirmación
- [ ] Al abrir la app, si hace falta confirmar, aparece el diálogo. "Seguir" mantiene el Consumo y registra actividad; "Nueva" termina la Visita anterior
- [ ] El historial se guarda pero no tiene pantalla (fuera de alcance)

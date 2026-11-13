# 03: Buscar Platos

**What to build:** Al abrir la app, el buscador fijo arriba ya tiene el foco. Escribís "salm", "SALMON", "nigiri" o "158" y la lista se filtra en cada letra. Al buscar un número, la coincidencia exacta aparece primera. Después de tocar un Plato, el buscador se limpia para buscar el siguiente.

El núcleo suma `buscar(texto)`.

Ver la spec: historias 1–10 y 11b; Implementation Decisions → `buscar(texto)`.

**Blocked by:** 02 (Contar Platos)

**Status:** resolved

- [x] Tests del núcleo (con `/tdd`): no importan tildes ni mayúsculas ("salmon" encuentra "Salmón")
- [x] Tests: busca pedazos de palabra en el nombre y en la categoría ("nigiri" devuelve toda la categoría Nigiri)
- [x] Tests: un texto numérico encuentra por número, con la coincidencia exacta primera y sin importar ceros a la izquierda ("45" encuentra el 045)
- [x] Tests: un texto vacío devuelve todo en el orden de la Carta; los resultados conservan ese orden (salvo el número exacto, que va primero)
- [x] El buscador queda fijo arriba, con foco al abrir la app y botón para borrar
- [x] La lista se filtra en cada letra, sin botón de "buscar"
- [x] Sin resultados se muestra "No hay platos con «texto»"
- [x] Tocar un Plato limpia el buscador

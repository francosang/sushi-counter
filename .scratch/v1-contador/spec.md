# Spec: Sushi Counter v1 (Kayi Sushi Barcelona)

Status: ready-for-agent

## Problem Statement

Cuando vamos con amigos al buffet de Kayi Sushi Barcelona competimos por quién come más Piezas, pero llevar la cuenta de memoria o en una nota del celular es un lío. Los Platos traen cantidades distintas de Piezas, nos olvidamos de qué tomamos, la nota no suma sola y al final nadie se cree el número del otro. Además, en la mesa estás con los palillos en una mano y con mala señal, así que cualquier cosa que lleve más de un toque o necesite internet no se usa.

## Solution

Una app web para el celular, instalable y que funciona sin conexión, con el Catálogo de la Carta de Kayi Sushi Barcelona ya cargado. Abrís la app, escribís un pedazo del nombre ("salm"), tocás el Plato y listo: se suman las Piezas que trae ese Plato. Un total grande de Piezas está siempre a la vista. Al tocarlo ves el detalle de tu Consumo y podés compartir un resumen en texto con tus amigos (por ejemplo, por WhatsApp) para comparar. Cada ida al buffet es una Visita que empieza sola y que terminás cuando te vas. La v1 es anónima y guarda todo en el propio celular.

## User Stories

### Encontrar Platos

1. Como comensal, quiero que el buscador tenga el foco al abrir la app, para empezar a escribir sin tocar nada antes.
2. Como comensal, quiero que el buscador quede fijo arriba mientras me desplazo por la lista, para poder buscar en cualquier momento.
3. Como comensal, quiero que la lista se filtre en cada letra que escribo, para ver resultados sin apretar "buscar".
4. Como comensal, quiero encontrar "Salmón" escribiendo "salmon" o "SALM", para no preocuparme por tildes ni mayúsculas.
5. Como comensal, quiero encontrar Platos escribiendo solo un pedazo de una palabra, para escribir lo mínimo.
6. Como comensal, quiero que escribir "nigiri" me muestre todos los Platos de la categoría Nigiris, para ver un tipo de Plato entero.
7. Como comensal, quiero ver un mensaje claro cuando la búsqueda no encuentra nada ("No hay platos con «xyz»"), para saber que no es un error de la app.
8. Como comensal, quiero poder borrar la búsqueda con un toque, para volver a la lista completa.
9. Como comensal, quiero que sin búsqueda la lista siga el orden de la Carta, agrupada por categoría, para orientarme como con la Carta física.
10. Como comensal, quiero que los Platos no cambien de lugar mientras toco, para no tocar el Plato equivocado.
11. Como comensal, quiero ver en cada tarjeta el número, el nombre del Plato y cuántas Piezas trae, para saber cuánto suma antes de tocar.
11b. Como comensal, quiero encontrar un Plato escribiendo su número de la Carta ("158"), y que la coincidencia exacta aparezca primera, para pedir y contar con el mismo número que uso con el camarero.

### Contar

12. Como comensal, quiero que tocar la tarjeta de un Plato lo sume a mi Consumo, para registrarlo con un solo toque.
13. Como comensal, quiero que tocar un Plato que trae 8 Piezas sume 8 a mi total, para que el conteo refleje lo que de verdad comí.
14. Como comensal, quiero que un Plato sin cantidad indicada en la Carta sume 1 Pieza, para no tener que pensarlo.
15. Como comensal, quiero que el buscador se limpie después de tocar un Plato, para buscar el siguiente sin borrar a mano.
16. Como comensal, quiero ver en la tarjeta de un Plato ya tomado su "×N" y que se vea resaltada, para saber de un vistazo qué y cuánto tomé.
17. Como comensal, quiero un botón − en las tarjetas de los Platos que ya tomé, para corregir un toque equivocado.
18. Como comensal, quiero que el − reste un Plato entero (las mismas Piezas que sumó), para que sumar y restar sean simétricos.
19. Como comensal, quiero que el − no aparezca en los Platos que no tomé, para no ensuciar la lista ni bajar de cero.
20. Como comensal, quiero que el toque se sienta inmediato (respuesta visual al instante), para confiar en que se registró.
21. Como comensal, quiero un total de Piezas grande y siempre visible, para saber cuánto llevo sin cambiar de pantalla.

### Visor de Consumo

22. Como comensal, quiero tocar el total para abrir el detalle de mi Consumo, para ver qué comí.
23. Como comensal, quiero ver en el detalle cada Plato tomado con su "×N" y las Piezas que suma, para entender de dónde sale el total.
24. Como comensal, quiero que el detalle se ordene por más Piezas primero, para ver mis "favoritos" arriba.
25. Como comensal, quiero ver en el detalle un mensaje cuando todavía no tomé nada, para entender por qué está vacío.
26. Como comensal, quiero volver del detalle a la lista con un toque, para seguir contando.

### Visitas

27. Como comensal, quiero que la Visita empiece sola con el primer Plato que tomo, para no tener que "crear" nada.
28. Como comensal, quiero un botón "Terminar visita" en el detalle, para cerrar la comida cuando me voy.
29. Como comensal, quiero que "Terminar visita" pida confirmación, para no perder la cuenta por un toque accidental.
30. Como comensal, quiero que al terminar una Visita el total vuelva a cero, para que la próxima vez empiece de nuevo.
31. Como comensal, quiero que mis Visitas terminadas se guarden en el celular, para tener el historial cuando exista una pantalla para verlo.
32. Como comensal, quiero que si abro la app más de 6 horas después de mi última actividad me pregunte si sigo en la misma Visita o empiezo una nueva, para no arrastrar sin querer la cuenta de la vez anterior.
33. Como comensal, quiero que si elijo "seguir" se mantenga mi Consumo, para los casos en que la Visita realmente sigue.
34. Como comensal, quiero que si cierro la app o se recarga la página mi Consumo siga ahí, para no perder la cuenta en plena comida.

### Compartir

35. Como comensal, quiero un botón "Compartir" en el detalle, para mandar mi resultado a mis amigos.
36. Como comensal, quiero que "Compartir" abra el menú nativo de compartir del celular, para mandarlo por WhatsApp o donde quiera.
37. Como comensal, quiero que si el celular no tiene menú de compartir el texto se copie al portapapeles y me avise, para poder pegarlo a mano.
38. Como comensal, quiero que el texto compartido diga cuántas Piezas llevo, en Kayi Sushi Barcelona, y mis Platos principales, para que mis amigos vean el resultado sin abrir nada.
39. Como comensal, quiero que la primera vez que comparto me pregunte un Apodo opcional, para que en el grupo se sepa quién es.
40. Como comensal, quiero poder saltear el Apodo, para seguir siendo anónimo si prefiero.
41. Como comensal, quiero que mi Apodo se recuerde para las próximas veces, para no escribirlo de nuevo.
42. Como comensal, quiero poder cambiar mi Apodo, para corregirlo si me equivoqué.

### App en el celular

43. Como comensal, quiero poder agregar la app a la pantalla de inicio, para abrirla como una app más.
44. Como comensal, quiero que la app cargue y funcione sin conexión, para usarla en el restaurante aunque no haya señal.
45. Como comensal, quiero que la app esté pensada para usarse con una mano en un celular, con zonas de toque grandes, para manejarla con los palillos en la otra mano.
46. Como comensal, quiero que la app esté en español, para entenderla sin esfuerzo.

### Mantenimiento

47. Como desarrollador, quiero que cada Plato tenga un id fijo que no se reutiliza, para corregir nombres o Piezas del Catálogo sin romper las Visitas guardadas.
48. Como desarrollador, quiero que el Catálogo sea un archivo de datos separado del código, para actualizarlo cuando cambie la Carta.
49. Como desarrollador, quiero que el total de Piezas se calcule a partir del Catálogo actual, para que una corrección de Piezas se refleje en los totales.
50. Como desarrollador, quiero que cada push a `main` despliegue la app en GitHub Pages, para publicar sin pasos manuales.

## Implementation Decisions

- **Stack**: Vite + React + TypeScript, desplegado como sitio estático en GitHub Pages (repo público `sushi-counter`, base path `/sushi-counter/`), con una GitHub Action que construye y publica en cada push a `main`.
- **PWA**: manifest y service worker (vía el plugin PWA de Vite) que precachean la app y el Catálogo, para que se pueda instalar y funcione 100% offline.
- **Catálogo** (ADR 0001): se transcribe de fotos de la Carta durante el desarrollo y se publica como datos estáticos dentro de la app. No se escanea dentro de la app. Las fotos de la Carta (`carta/`, 97 páginas) son solo fuente local: quedan en `.gitignore` y no se publican. Entra **toda la comida** de la Carta (sushi, dimsum, platos calientes, postres…) y quedan fuera las bebidas. Cada Plato tiene:
  - `numero`: el número del Plato en la Carta (por ejemplo `158`). Es también su identificador fijo: único, y no se reutiliza ni se cambia.
  - `nombre`: en castellano y en formato de oración, sin la cantidad de piezas que la Carta pega al nombre ("BAO POLLO 2PZ" → "Bao pollo"). El nombre en catalán se ignora.
  - `piezas`: entero ≥ 1, tomado del sufijo "N PZ" de la Carta; vale 1 si la Carta no indica cantidad.
  - `categoria`: la sección de la Carta (por ejemplo "Nigiri", "Dimsum").
  - El orden del archivo es el orden de la Carta.
- **Núcleo de lógica** (un único módulo profundo, independiente de React). Se construye con tres dependencias inyectables: el Catálogo, un almacenamiento (interfaz mínima de get/set de strings; en producción, el almacenamiento del navegador) y un reloj (una función que devuelve "ahora"). Interfaz:
  - `buscar(texto)`: devuelve los Platos que coinciden, en el orden de la Carta. Busca subcadenas en el nombre y la categoría, sin distinguir mayúsculas y quitando tildes y diacríticos de ambos lados. Si el texto es un número, también busca por `numero` y pone primero la coincidencia exacta (con o sin ceros a la izquierda: "45" encuentra el 045). Un texto vacío devuelve todo.
  - `tomar(numero)`: suma un Plato al Consumo de la Visita activa y crea la Visita si no hay ninguna. Registra la actividad con el reloj.
  - `devolver(numero)`: resta un Plato. Si ese Plato no se había tomado, no hace nada. Registra la actividad.
  - `consumo()`: devuelve cuántas veces se tomó cada Plato, el total de Piezas (veces × Piezas del Catálogo actual) y las líneas del detalle ordenadas por Piezas, de más a menos.
  - `terminarVisita()`: pasa la Visita activa al historial con su fecha de fin. Después de esto, el Consumo queda vacío.
  - `necesitaConfirmarVisita()`: devuelve verdadero si hay una Visita activa y la última actividad fue hace más de 6 horas según el reloj. La UI muestra entonces "¿Seguís en la misma visita o empezás una nueva?". "Seguir" registra actividad; "Nueva" llama a `terminarVisita()`.
  - `textoParaCompartir(apodo?)`: genera el texto del resumen, con el total de Piezas, "Kayi Sushi Barcelona" y los Platos principales. Si hay Apodo, lo incluye.
  - Apodo: leer y guardar el Apodo opcional.
- **Modelo persistido**: se guardan la Visita activa (inicio, última actividad y un mapa número de Plato → veces), las Visitas terminadas (con las mismas veces más la fecha de fin) y el Apodo. Las Piezas **no** se guardan: siempre se calculan con el Catálogo. Se versiona el formato guardado para poder migrarlo cuando llegue Firestore. Si al leer aparece un número de Plato que ya no está en el Catálogo, se ignora en el total sin romper nada.
- **Visitas sin pantalla de inicio**: la Visita se crea sola con el primer `tomar`.
- **UI** (capa fina sobre el núcleo):
  - **Pantalla principal**: arriba, fijos, el buscador (con foco al abrir y con botón para borrar) y el total de Piezas en grande, que al tocarlo abre el detalle. Debajo, la lista de tarjetas agrupada por categoría. Al tocar una tarjeta se llama a `tomar` y se limpia el buscador. Las tarjetas ya tomadas se ven resaltadas, con su "×N" y un botón − pequeño. Tocar el − no cuenta como tocar la tarjeta. Las tarjetas no se reordenan por Consumo.
  - **Detalle de Consumo**: el total, las líneas ordenadas por Piezas, "Compartir" y "Terminar visita" (con confirmación). Si no hay Consumo, se muestra un mensaje de vacío.
  - **Compartir**: se usa la Web Share API si está disponible; si no, se copia al portapapeles y se muestra un aviso. La primera vez que compartís se pide el Apodo, opcional y salteable, y se puede editar después.
  - Al abrir la app, si `necesitaConfirmarVisita()` es verdadero, se muestra el diálogo antes de seguir.
- **Competencia** (ADR 0002): no hay backend. Cada celular es una persona, y la competencia se hace fuera de la app, compartiendo el texto.

## Testing Decisions

- **Un solo punto de prueba: el núcleo de lógica.** Los tests usan exclusivamente su interfaz pública, con un Catálogo de prueba, un almacenamiento en memoria y un reloj controlable. No se prueba nada interno.
- Un buen test describe un comportamiento observable. Ejemplos:
  - "Tomar dos veces un Plato de 8 Piezas da un total de 16."
  - "Un núcleo nuevo con el mismo almacenamiento conserva el Consumo."
  - "Si el reloj avanza 7 horas, `necesitaConfirmarVisita()` es verdadero; con 5 horas, no."
  - "`buscar('salmon')` encuentra 'Nigiri de Salmón'."
  - "Después de `terminarVisita()`, el total es 0 y el historial tiene una Visita."
- **Cobertura esperada**: búsqueda (tildes, mayúsculas, subcadenas, categoría, número exacto primero, ceros a la izquierda, vacío, sin resultados), tomar y devolver (Piezas por Plato, no bajar de cero, devolver un Plato no tomado), persistencia entre instancias, ciclo de la Visita (creación con el primer toque, terminar, regla de las 6 horas), orden del detalle, texto compartido (con y sin Apodo, sin Consumo) y tolerancia a un número de Plato desconocido.
- **Herramienta**: Vitest, escribiendo los tests primero con `/tdd`.
- **Sin tests automáticos**: componentes React, service worker y deploy. La UI se valida a mano en un celular.
- **Antecedentes**: no hay; el repo está vacío. Estos tests son el primer caso y sirven de referencia.

## Out of Scope

- Firebase: login con Google, Firestore, sincronización entre dispositivos y rankings dentro de la app (previstos para más adelante, ADR 0002).
- Varios restaurantes o un selector de restaurante.
- Escanear la Carta dentro de la app (OCR o IA) (ADR 0001).
- Varios comensales en un mismo celular.
- Una pantalla de historial de Visitas (los datos se guardan, pero no se muestran).
- Restar de a Piezas sueltas o registrar "medio Plato".
- Fotos de los Platos.
- Compartir como imagen.
- Internacionalización (la app va solo en español).
- Tests end-to-end o de componentes.

## Further Notes

- **Catálogo**: las fotos de la Carta ya están en `carta/` (local, fuera de git). Transcribir 97 páginas es un trabajo propio; se puede avanzar en paralelo con un Catálogo de ejemplo que tenga el mismo formato.
- Vocabulario: ver `GLOSSARY.md` (Pieza, Plato, Carta, Catálogo, Visita, Consumo, Apodo).
- Decisiones: `docs/adr/0001-catalogo-estatico-transcrito-en-desarrollo.md` y `docs/adr/0002-v1-local-y-anonima.md`.
- El formato guardado versionado y los ids fijos de los Platos preparan la futura migración a Firestore, sin implementarla.

# 06: Compartir con Apodo

**What to build:** En el detalle tocás "Compartir" y se abre el menú de compartir del celular con un texto del estilo "🍣 Franco lleva 47 piezas en Kayi Sushi Barcelona — top: Nigiri salmón ×6…", listo para WhatsApp. Si el celular no tiene ese menú, el texto se copia al portapapeles y te avisa. La primera vez te pide un Apodo opcional, que podés saltear; se recuerda y lo podés cambiar.

El núcleo suma `textoParaCompartir(apodo?)`, y la lectura y el guardado del Apodo.

Ver la spec: historias 35–42; Implementation Decisions → `textoParaCompartir` y UI → Compartir.

**Blocked by:** 04 (Visor de Consumo)

**Status:** ready-for-agent

- [x] Tests del núcleo: el texto incluye el total de Piezas, "Kayi Sushi Barcelona" y los Platos principales
- [x] Tests: con Apodo lo incluye; sin Apodo usa un texto genérico; sin Consumo genera un texto coherente
- [x] Tests: el Apodo se guarda y persiste entre instancias del núcleo
- [x] "Compartir" usa la Web Share API si está disponible; si no, copia al portapapeles y muestra un aviso
- [x] La primera vez se pide el Apodo (opcional, se puede saltear); después se puede editar

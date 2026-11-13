# Sushi Counter

App web para móviles para llevar la cuenta de cuántas piezas de sushi comés en un buffet y competir con amigos.

## Language

**Pieza**:
Un bocado individual de sushi. La unidad con la que se compite.
_Avoid_: unidad, sushi

**Plato**:
Una entrada de comida del Catálogo, tal como aparece en la Carta: tiene su número de la Carta, un nombre y la cantidad de Piezas que trae (1 si la Carta no lo indica). Puede ser sushi o no (un bao también es un Plato); las bebidas no son Platos.
_Avoid_: item, producto, ración

**Carta**:
El menú físico del restaurante, de donde sale el Catálogo.
_Avoid_: menú

**Catálogo**:
La lista de todos los Platos disponibles en la app, transcrita de la Carta.
_Avoid_: menú, carta (cuando se habla de la app)

**Visita**:
Una ocasión concreta de ir al buffet, con fecha, en la que se cuentan las Piezas desde cero.
_Avoid_: sesión, comida, partida

**Consumo**:
Lo que llevás comido en una Visita: cuántas veces tomaste cada Plato y el total de Piezas que eso suma.
_Avoid_: pedido, orden

**Apodo**:
El nombre opcional con el que te identificás en lo que compartís con tus amigos.
_Avoid_: usuario, nombre de usuario, perfil

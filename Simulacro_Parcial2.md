# Simulacro — Parcial II ARC115

**Instrucciones:** resuélvelo **a mano, sin apuntes y con cronómetro (100 min)**. Deja constancia de todas las operaciones. Cuando termines, revisa con [Simulacro_Solucion.md](Simulacro_Solucion.md).
El formato imita los parciales 2019–2025: selección múltiple, V/F, preguntas cortas y problemas. Los números son **nuevos**.

---

## PARTE I (10 %) — Subraye la respuesta correcta

1. La memoria cuyo borrado se realiza mediante **luz ultravioleta** es:
   a) PROM b) EEPROM c) EPROM d) Flash
2. El registro que contiene la **dirección** de la palabra que se va a leer o escribir es:
   a) MBR b) MAR c) IR d) PC
3. La política que determina **cuándo y qué** información se envía de la MP a la MCa es la de:
   a) Ubicación b) Reemplazo c) Extracción d) Actualización
4. El mecanismo de traducción que mantiene una pequeña tabla asociativa con las páginas más activas (TLB) es:
   a) Directa b) Asociativa c) Mixta d) Segmentada
5. Las **unidades de disco** son un ejemplo de acceso:
   a) Secuencial b) Directo c) Aleatorio d) Asociativo

## PARTE II (30 %) — Conteste V o F y justifique

1. Conforme se desciende en la jerarquía de memoria, aumenta el costo por bit.
2. En la correspondencia directa no tiene sentido aplicar una política de reemplazo LRU.
3. En la transferencia secuencial, los datos y la dirección entran por una línea única.
4. La segmentación es invisible para el programador, al igual que la paginación.
5. La memoria Flash borra la información a nivel de byte.
6. En la escritura aplazada se activa un *dirty bit* que indica si el bloque debe actualizarse en MP al ser reemplazado.
7. En la traducción directa de la MV paginada, la tabla de páginas tiene una entrada por cada marco de la MP.
8. El desplazamiento de una dirección virtual es el mismo que el de su dirección física.
9. La política FIFO nunca presenta más fallos al aumentar el número de marcos.
10. La hiperpaginación se soluciona aumentando la cantidad de procesos en memoria.

## PARTE III (15 %) — Conteste brevemente

1. Explique las políticas de actualización de la MCa (inmediata y aplazada) y las dos formas de actuar ante un fallo de escritura.
2. Explique las tres alternativas de traducción en la memoria virtual paginada.
3. ¿Qué problema generan las particiones de tamaño variable y cómo se soluciona?

## PROBLEMAS (45 %)

**P1 (7 %)** Una caché asociativa por conjuntos de **4 vías** tiene bloques de **8 palabras** y una capacidad de **8K palabras**. La MP tiene **256K palabras** de 16 bits y se direcciona por palabra.
a) Encuentre el formato de dirección para correspondencia **directa**, **asociativa** y **por conjuntos**.
b) ¿En qué conjunto se ubica la dirección **2A5C7₁₆** y con qué etiqueta?

**P2 (5 %)** MP de **2¹⁶ bytes** direccionable por byte, bloques de **16 bytes**, caché de **64 líneas** con correspondencia **directa**. Indique cómo se divide la dirección y en qué línea se almacenan las direcciones **3A7F₁₆** y **9C45₁₆**.

**P3 (8 %)** Con **3 marcos**, resuelva la secuencia **7 0 1 2 0 3 0 4 2 3 0 3 2** usando **FIFO**, **LRU** y **LFU**. Indique cuándo y qué bloque se sustituye y compare los resultados.

**P4 (6 %)** Un computador de **24 bits** tiene memoria virtual paginada con páginas de **4 KB** y **1 MB** de memoria física.
a) Formato de la dirección virtual y física.
b) Número máximo de entradas de la tabla de páginas y número de marcos.
c) Si la página 2 está en el marco 5 y la página 3 no está presente, traduzca las direcciones lógicas **9000** y **13000**.
d) ¿Puede la dirección lógica 9000 traducirse a la física **25384**? ¿Y a **25000**? Justifique.

**P5 (6 %)** Un sistema de MV segmentada usa DV de **12 bits**: los **2 bits** más significativos son el segmento y el resto el desplazamiento.

| Segmento | Base | Longitud |
|---|---|---|
| 0 | 1A0 | 2F0 |
| 1 | 7C4 | 0A0 |
| 2 | 400 | 3FF |
| 3 | B00 | 150 |

Calcule la dirección física de: **2F0, 4B6, 8A0, D2F, C80** (indique si hay fallo).

**P6 (6 %)** Un sistema de MV **segmentada/paginada** tiene DV de **24 bits**: segmento 8 bits, página 4 bits y desplazamiento 12 bits. El registro de inicio de la TS contiene **2000₁₆**. Contenido de memoria:

| Dirección | Contenido |
|---|---|
| 2005 (TS) | 3100 |
| 3102 (TP) | 1B |
| 3107 (TP) | 4C |
| 3108 (TP) | 9E |

a) Calcule la DF de la DV **057A3C₁₆**.
b) Si la DF es **1BA3C₁₆** (mismo segmento), ¿cuál era la DV?

**P7 (4 %)** Sistema jerárquico: MCa con t = 5 ns y h = 0,92; MP con t = 40 ns y h = 0,9999; disco con t = 5 ms y h = 1. Calcule el tiempo medio de acceso y analice el resultado.

**P8 (3 %)** a) Resuelva con el algoritmo de **Booth: 6 × (−4)**. b) Resuelva la **división −13 ÷ 4** (con restauración y ajuste de signos).

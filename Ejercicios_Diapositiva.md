# Ejercicios de la diapositiva MEMORIA (MEMORIAInterna.pdf)

Todos los ejercicios y ejemplos del **último PDF que subió el ingeniero**, en el orden de la diapositiva («diap. N» = página del PDF). Están aquí el enunciado y la solución paso a paso. En modo práctica, intenta resolverlos en papel antes de voltear la tarjeta.
Para el procedimiento general de cada tipo, ve a [Algoritmos paso a paso](Algoritmos/00_INDICE.md).

> ⭐ = de los últimos que se vieron en clase (diap. 80–94); son los más probables en el parcial.

---

## Caché: políticas de ubicación

### E1 (diap. 38–47) Correspondencia MP 1 MB ↔ MCa 1 KB
Establezca la correspondencia entre una **MP de 1 Mbyte** y una **MCa de 1 Kbyte** en un sistema con **bloques de 8 bytes**: formato de dirección para correspondencia **directa**, **asociativa** y **asociativa por conjuntos de 2 bloques**.

<!--opciones
*a) Directa 10|7|3; asociativa 17|3; conjuntos 11|6|3
b) Directa 7|10|3; asociativa 17|3; conjuntos 6|11|3
c) Directa 10|7|3; asociativa 20|3; conjuntos 12|5|3
d) Directa 9|8|3; asociativa 17|3; conjuntos 11|6|3
-->

<details><summary>Solución</summary>

1. Dirección física: 1 MB = 2²⁰ → **20 bits**
2. Bloque: 8 B = 2³ → **3 bits** de palabra
3. Bloques de la MCa = 2¹⁰ / 2³ = 2⁷ = **128**; bloques de la MP = 2²⁰ / 2³ = **2¹⁷**

| Tipo | Etiqueta | Índice | Palabra |
|---|---|---|---|
| Directa | **10** | bloque de MCa **7** | **3** |
| Asociativa | **17** | — | **3** |
| Por conjuntos (2 bloques → 64 conjuntos) | **11** | conjunto **6** | **3** |

Ventajas e inconvenientes:
- **Directa:** acceso simultáneo y reemplazo trivial; más fallos si dos bloques que van a la misma línea se usan alternadamente.
- **Asociativa:** flexible, pero las comparaciones cuestan.
- **Por conjuntos:** reduce el costo de la totalmente asociativa.
</details>

### E2 (diap. 41) Lectura en correspondencia directa (figura)
En la figura, la dirección de 20 bits se divide en **Etiqueta 10 | Línea 8 | Palabra 2** (bloques de 4 bytes). Estado de la caché:

| Línea | Válido | Etiqueta | Datos |
|---|---|---|---|
| 0 | 1 | 00 | 23 45 00 23 |
| 1 | 0 | 00 | 01 2a 3b fa |
| 2 | 1 | 00 | aa f0 e9 71 |
| 3 | 0 | 3e | 20 2d 80 a3 |

MP: 00004 = 2e, 00005 = ff, 00006 = 10, 00007 = 25. ¿Qué pasa al leer **00008**, **0000A**, **00005** y **0F80E**?

<!--opciones
*a) 00008 acierto (aa); 0000A acierto (e9); 00005 fallo; 0F80E fallo (válido = 0)
b) 00008 acierto (aa); 0000A acierto (e9); 00005 acierto (ff); 0F80E acierto (80)
c) 00008 fallo; 0000A fallo; 00005 acierto (01); 0F80E fallo
d) 00008 acierto (23); 0000A acierto (00); 00005 fallo; 0F80E acierto (80)
-->

<details><summary>Solución</summary>

Pasos: dirección → binario → palabra (2 bits de menor peso), línea (8 bits siguientes), etiqueta (10 bits de mayor peso) → ir a la línea → comparar la etiqueta **y** el bit de validez.

| Dir | Etiqueta | Línea | Palabra | Resultado |
|---|---|---|---|---|
| 00008 | 000 | 2 | 0 | Válido y etiqueta igual → **acierto, dato aa** |
| 0000A | 000 | 2 | 2 | **Acierto, dato e9** |
| 00005 | 000 | 1 | 1 | Válido = 0 → **fallo**: se trae el bloque 00004–00007 (2e ff 10 25), válido = 1, se entrega **ff** |
| 0F80E | 03E | 3 | 2 | La etiqueta coincide (3e) pero **válido = 0 → fallo** |

Truco: línea = (dir div 4) mod 256; etiqueta = dir div 1024.
</details>

### E3 (diap. 44) Lectura en correspondencia asociativa (figura)
Dirección de 20 bits = **Etiqueta 18 | Palabra 2**. Estado de la caché:

| Línea | Válido | Etiqueta | Datos |
|---|---|---|---|
| 0 | 0 | 002e0 | 01 2a 3b fa |
| 1 | 1 | 00002 | aa f0 e9 71 |
| 2 | 1 | 00000 | 23 45 00 23 |
| 3 | 0 | 3eaa0 | 20 2d 80 a3 |

¿Qué pasa al leer **00008**, **00001**, **0000B**, **00004** y **00B81**?

<!--opciones
*a) 00008 aa; 00001 45; 0000B 71; 00004 fallo; 00B81 fallo (válido = 0)
b) 00008 23; 00001 45; 0000B 23; 00004 2e; 00B81 2a
c) 00008 aa; 00001 23; 0000B e9; 00004 fallo; 00B81 2a
d) Todas son fallos porque la caché es asociativa
-->

<details><summary>Solución</summary>

Etiqueta = dir div 4 (quitar los 2 bits de menor peso); se compara con **todas** las líneas a la vez.

| Dir | Etiqueta | Palabra | Resultado |
|---|---|---|---|
| 00008 | 00002 | 0 | Línea 1 válida → **acierto, aa** |
| 00001 | 00000 | 1 | Línea 2 → **acierto, 45** |
| 0000B | 00002 | 3 | Línea 1 → **acierto, 71** |
| 00004 | 00001 | 0 | Ninguna línea la tiene → **fallo**; se trae el bloque 00004–00007 a una línea **inválida** (0 o 3) |
| 00B81 | 002E0 | 1 | Coincide con la línea 0, pero **válido = 0 → fallo** |
</details>

### E4 (diap. 59) Formato por conjuntos
Una caché asociativa por conjuntos tiene **64 líneas** en conjuntos de **4 líneas**. La MP tiene **4K bloques de 128 palabras**. Muestre el formato de dirección de la MP y de la MCa.

<!--opciones
*a) Etiqueta 8 | Conjunto 4 | Palabra 7 (19 bits)
b) Etiqueta 6 | Conjunto 6 | Palabra 7 (19 bits)
c) Etiqueta 10 | Conjunto 4 | Palabra 7 (21 bits)
d) Etiqueta 8 | Conjunto 4 | Palabra 12 (24 bits)
-->

<details><summary>Solución</summary>

1. Palabra: 128 = 2⁷ → **7 bits**
2. Bloques de la MP: 4K = 2¹² → dirección = 12 + 7 = **19 bits**
3. Conjuntos = 64 / 4 = 16 = 2⁴ → **4 bits**
4. Etiqueta = 19 − 4 − 7 = **8 bits**

| Etiqueta | Conjunto | Palabra |
|---|---|---|
| 8 | 4 | 7 |
</details>

---

## Caché: reemplazo, escritura y tiempos

### E5 (diap. 51) FIFO y LRU con 3 marcos
Determine **cuándo y qué bloque se sustituye** de la MCa con FIFO y LRU si hay **3 marcos** y la secuencia **2 4 2 5 1 4 3 1 6 5 1**.

<!--opciones
*a) FIFO 8 fallos; LRU 8 fallos
b) FIFO 6 fallos; LRU 7 fallos
c) FIFO 9 fallos; LRU 7 fallos
d) FIFO 8 fallos; LRU 6 fallos
-->

<details><summary>Solución</summary>

**FIFO — 8 fallos** (sale el que entró primero)

| Ref | 2 | 4 | 2 | 5 | 1 | 4 | 3 | 1 | 6 | 5 | 1 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 2 | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 1 | 5 | 5 |
| M2 |  | 4 | 4 | 4 | 4 | 4 | 3 | 3 | 3 | 3 | 1 |
| M3 |  |  |  | 5 | 5 | 5 | 5 | 5 | 6 | 6 | 6 |
| | F | F | A | F | R(2) | A | R(4) | A | R(5) | R(1) | R(3) |

**LRU — 8 fallos** (sale el que lleva más tiempo sin usarse)

| Ref | 2 | 4 | 2 | 5 | 1 | 4 | 3 | 1 | 6 | 5 | 1 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 2 | 2 | 2 | 2 | 2 | 4 | 4 | 4 | 6 | 6 | 6 |
| M2 |  | 4 | 4 | 4 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| M3 |  |  |  | 5 | 5 | 5 | 3 | 3 | 3 | 5 | 5 |
| | F | F | A | F | R(4) | R(2) | R(5) | A | R(4) | R(3) | A |

(F = fallo con marco libre · R(x) = fallo que sustituye a x · A = acierto. La óptima daría 6 fallos.)
</details>

### E6 (diap. 52) LFU
Además de la aleatoria, FIFO y LRU está la **LFU**, que sustituye el bloque que haya sido referenciado en **menos ocasiones**. Resuelva el ejercicio anterior (3 marcos, 2 4 2 5 1 4 3 1 6 5 1) con LFU.

<!--opciones
*a) 10 fallos; el bloque 2 nunca sale
b) 6 fallos; el bloque 1 nunca sale
c) 8 fallos; igual que FIFO
d) 11 fallos; todos son fallos
-->

<details><summary>Solución</summary>

Se lleva un contador de usos por bloque; en caso de empate sale el más antiguo, y el contador se reinicia al salir. **10 fallos:**

| Ref | 2 | 4 | 2 | 5 | 1 | 4 | 3 | 1 | 6 | 5 | 1 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 |
| M2 |  | 4 | 4 | 4 | 1 | 1 | 3 | 3 | 6 | 6 | 1 |
| M3 |  |  |  | 5 | 5 | 4 | 4 | 1 | 1 | 5 | 5 |
| | F | F | A | F | R(4) | R(5) | R(1) | R(4) | R(3) | R(1) | R(6) |

El 2 tiene 2 usos y nunca sale; los demás tienen 1 uso cada vez que entran, así que se van turnando. Aquí LFU es la peor.
⚠️ Si tu docente desempata de otra forma (por ejemplo, con LRU), algunas columnas cambian.
</details>

### E7 (diap. 53–55) Escritura con y sin asignación
Explique qué ocurre en un **fallo de escritura** con **asignación de escritura** y **sin asignación de escritura**, y con qué política de actualización se suele asociar cada una.

<!--opciones
*a) Con asignación: traer el bloque a MCa y escribir ahí (aplazada); sin asignación: escribir solo en MP (inmediata)
b) Con asignación: escribir solo en MP; sin asignación: traer el bloque
c) Ambas escriben solo en la caché
d) Ambas ignoran la escritura hasta el siguiente acierto
-->

<details><summary>Solución</summary>

- **Con asignación/ubicación** (*write allocate*), asociada a la **escritura aplazada**: el bloque que produjo el fallo se lleva de la MP a la MCa y luego se escribe en la MCa.
- **Sin asignación/ubicación** (*write no allocate*), asociada a la **escritura inmediata**: se escribe únicamente en la MP.

Ventajas e inconvenientes:
- **Inmediata:** muy sencilla y asegura la consistencia, pero genera mucho tráfico y el procesador espera (se resuelve con un *buffer* de escritura).
- **Aplazada:** menos tráfico y escrituras a la velocidad de la MCa, pero el diseño es más complejo por el *dirty bit*.
- Ante fallos transitorios de hardware es preferible la **inmediata**.
</details>

### E8 (diap. 56) Tiempo medio con 2 niveles
Determine el tiempo medio de acceso de un sistema con una **MCa de 10 ns** y una **MP de 60 ns**, con probabilidad de acierto de la caché del **70 %**.

<!--opciones
*a) 28 ns
b) 49 ns
c) 25 ns
d) 70 ns
-->

<details><summary>Solución</summary>

`Tacc = h·tc + (1 − h)·(tc + tp)`

`Tacc = 0,70·10 + 0,30·(10 + 60) = 7 + 21 = ` **28 ns**
</details>

### E9 (diap. 57) Tiempo y costo con 3 niveles
| | t acc | Tamaño | Costo | h |
|---|---|---|---|---|
| MCa | 5 ns | 512 kB | $50/MB | 0,95 |
| MP | 50 ns | 128 MB | $0,40/MB | 0,99999995 |
| Disco magnético | 10 ns | 20 GB | $0,01/MB | 1,00 |

a) Tiempo medio de acceso. b) Costo medio. c) Analice los resultados.

<!--opciones
*a) ≈ 7,5 ns y ≈ 0,0136 $/MB
b) ≈ 65 ns y ≈ 50,4 $/MB
c) ≈ 7,5 ns y ≈ 16,8 $/MB
d) ≈ 55 ns y ≈ 0,01 $/MB
-->

<details><summary>Solución</summary>

a) `Tacc = Σ (1 − h(L_{i−1}))·t_i` con h(L0) = 0:
`Tacc = 1·5 + (1 − 0,95)·50 + (1 − 0,99999995)·10 = 5 + 2,5 + 0,0000005 = ` **7,5000005 ns**

b) Todo en MB: 512 kB = 0,5 MB; 20 GB = 20 480 MB.
`Costo medio = (0,5·50 + 128·0,40 + 20480·0,01) / (0,5 + 128 + 20480) = 281 / 20608,5 ≈ ` **0,0136 $/MB**

c) El sistema funciona casi a la **velocidad de la caché** (7,5 ≈ 5 ns) con el **costo casi del disco** (≈ 0,01 $/MB). Ese es el objetivo de la jerarquía de memoria, y es posible gracias a la localidad.
</details>

### E10 (diap. 58) Directo vs asociativo con LRU
MP de **1 KB**, MCa de **4 marcos de 1 byte**, sustitución **LRU**. Accesos: **1, 4, 8, 5, 20, 17, 19, 56, 9, 11, 4, 42**. Muestre la evolución de la MCa con el método **directo** y el **asociativo**.

<!--opciones
*a) Directo: 12 fallos (no aplica LRU); asociativo LRU: 12 fallos
b) Directo: 8 fallos; asociativo LRU: 4 fallos
c) Directo: 12 fallos; asociativo LRU: 11 fallos (el 4 acierta)
d) Directo: 10 fallos; asociativo LRU: 12 fallos
-->

<details><summary>Solución</summary>

Bloque = dirección (bloques de 1 byte). **Directo:** marco = bloque mod 4.

| Dir | 1 | 4 | 8 | 5 | 20 | 17 | 19 | 56 | 9 | 11 | 4 | 42 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| marco | 1 | 0 | 0 | 1 | 0 | 1 | 3 | 0 | 1 | 3 | 0 | 2 |

**Directo — 12 fallos**

| Ref | 1 | 4 | 8 | 5 | 20 | 17 | 19 | 56 | 9 | 11 | 4 | 42 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| M0 |  | 4 | 8 | 8 | 20 | 20 | 20 | 56 | 56 | 56 | 4 | 4 |
| M1 | 1 | 1 | 1 | 5 | 5 | 17 | 17 | 17 | 9 | 9 | 9 | 9 |
| M2 |  |  |  |  |  |  |  |  |  |  |  | 42 |
| M3 |  |  |  |  |  |  | 19 | 19 | 19 | 11 | 11 | 11 |

En el método directo **no se puede aplicar LRU**: cada bloque tiene un único marco posible.

**Asociativo con LRU — 12 fallos**

| Ref | 1 | 4 | 8 | 5 | 20 | 17 | 19 | 56 | 9 | 11 | 4 | 42 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 1 | 1 | 1 | 1 | 20 | 20 | 20 | 20 | 9 | 9 | 9 | 9 |
| M2 |  | 4 | 4 | 4 | 4 | 17 | 17 | 17 | 17 | 11 | 11 | 11 |
| M3 |  |  | 8 | 8 | 8 | 8 | 19 | 19 | 19 | 19 | 4 | 4 |
| M4 |  |  |  | 5 | 5 | 5 | 5 | 56 | 56 | 56 | 56 | 42 |
| | F | F | F | F | R(1) | R(4) | R(8) | R(5) | R(20) | R(17) | R(19) | R(56) |
</details>

---

## Memoria virtual

### E11 ⭐ (diap. 80–81) Diseño de un sistema paginado
Diseñe un sistema paginado de MV: espacio virtual de **64K**, espacio de direcciones físicas de **8K**, página de **512 palabras**, traducción **directa**.

<!--opciones
*a) DV 7|9 (16 bits), DF 4|9 (13 bits); 128 páginas y 16 marcos
b) DV 9|7 (16 bits), DF 4|9 (13 bits); 512 páginas y 16 marcos
c) DV 7|9 (16 bits), DF 3|10 (13 bits); 128 páginas y 8 marcos
d) DV 6|10 (16 bits), DF 3|10 (13 bits); 64 páginas y 8 marcos
-->

<details><summary>Solución</summary>

1. 64K = 2¹⁶ → DV de **16 bits**; 8K = 2¹³ → DF de **13 bits**
2. Desplazamiento = log2(512) = **9 bits**
3. Páginas en MV = 64·1024 / 512 = **128** → **7 bits**
4. Marcos en MF = 8·1024 / 512 = **16** → **4 bits**
5. Traducción directa → TP de **128 entradas** (una por página), apuntada por un registro base

```
DV (16): | Página 7 | Desplazamiento 9 |
DF (13): | Marco 4  | Desplazamiento 9 |
```
</details>

### E12 ⭐ (diap. 83–84) MV segmentada
Un sistema de MV segmentada usa DV de **12 bits**: los **3 bits** más significativos son el segmento y el resto el desplazamiento.

| Segmento | Base | Longitud |
|---|---|---|
| 0 | 0d1 | 258 |
| 1 | 8fc | 00e |
| 2 | 05a | 064 |
| 3 | 52f | 244 |

Calcule la dirección física de: **1FE, 21A, 30B, 590, 790**.

<!--opciones
*a) 1FE→2CF; 21A fallo; 30B fallo; 590 fallo; 790→6BF
b) 1FE→2CF; 21A→274; 30B fallo; 590→5EA; 790→6BF
c) 1FE fallo; 21A→916; 30B→A07; 590 fallo; 790→6BF
d) Todas son fallo
-->

<details><summary>Solución</summary>

Pasos: hex → 12 bits → separar `sss | ddddddddd` → comprobar `desplazamiento < longitud` → `DF = base + desplazamiento`.

| DV | Binario | Seg | Desplazamiento | Comprobación | DF |
|---|---|---|---|---|---|
| 1FE | `000 111111110` | 0 | 1FE | 1FE < 258 ✔ | 0D1 + 1FE = **2CF** |
| 21A | `001 000011010` | 1 | 01A | 01A ≥ 00E ✘ | **fallo** |
| 30B | `001 100001011` | 1 | 10B | 10B ≥ 00E ✘ | **fallo** |
| 590 | `010 110010000` | 2 | 190 | 190 ≥ 064 ✘ | **fallo** |
| 790 | `011 110010000` | 3 | 190 | 190 < 244 ✔ | 52F + 190 = **6BF** |

⚠️ 21A **no** es el segmento 2: en binario sus 3 primeros bits son 001 = segmento 1.
</details>

### E13 ⭐ (diap. 86–87) MV segmentada/paginada
DV de **32 bits**: segmento **12 bits**, página **1 byte**, desplazamiento **12 bits**. Supuestos:
- La DF es **FA10F₁₆**
- El registro de inicio de la TS contiene **10000₁₆**
- La dirección **1001B₁₆** de la TS contiene **100F2₁₆**
- En la TP: 1011B → 15, **1011C → FA**, 1011D → AF

Determine la dirección (virtual) que corresponde.

<!--opciones
*a) DV = 01B | 2A | 10F
b) DV = 01B | 1C | 10F
c) DV = 1001B | FA | 10F
d) DV = 0FA | 2A | 10F
-->

<details><summary>Solución</summary>

1. DF = FA10F → **marco FA**, **desplazamiento 10F** (12 bits)
2. FA está en la entrada **1011C** de la TP
3. Base de la TP = contenido de la TS = **100F2** → página = 1011C − 100F2 = **2A**
4. Segmento = 1001B − 10000 = **01B**
5. **DV = 01B | 2A | 10F = 01B2A10F₁₆**

Comprobación hacia adelante: 10000 + 01B = 1001B → 100F2; 100F2 + 2A = 1011C → FA; DF = FA ‖ 10F = **FA10F** ✔
</details>

### E14 ⭐ (diap. 88–91) Computador de 20 bits
Computador de **20 bits** con MV paginada, páginas de **1 KB** y **256 KB** de memoria física.
a) Formato de la dirección virtual. b) Número máximo de entradas de la TP (de un nivel). c) Marcos de la MP. d) Campos de una entrada de la TP y para qué sirve cada uno.

<!--opciones
*a) Página 10 | desplazamiento 10; 1024 entradas; 256 marcos; presencia, modificado, validez, permisos, marco
b) Página 10 | desplazamiento 10; 256 entradas; 1024 marcos; solo el marco
c) Página 8 | desplazamiento 12; 1024 entradas; 256 marcos; etiqueta y conjunto
d) Página 12 | desplazamiento 8; 4096 entradas; 64 marcos; base y longitud
-->

<details><summary>Solución</summary>

a) 1 KB = 2¹⁰ → **10 bits** de desplazamiento; 20 − 10 = **10 bits** de página (los 10 superiores son la página y los 10 inferiores el desplazamiento)
b) 2¹⁰ = **1024 entradas**
c) 256 KB / 1 KB = **256 marcos**
d) Campos de una entrada:
- **Bit de presencia:** ¿está en MP?
- **Bit de modificado:** hay que escribir la página en disco al reemplazarla
- **Bit de validez:** la entrada es válida
- **Bits de permisos:** lectura, escritura, ejecución
- **Nº de marco**
</details>

### E15 ⭐ (diap. 92) Caché con MP entrelazada y código C
PC con micro de **8 bits**, MP de **4 GB** entrelazada simple con **16 módulos** (32 ns), MC de **dos módulos independientes** (instrucciones y datos) de **64 KB** cada una, 4 ns, bloques de **16 B**, **asociativa por conjuntos de 2 bloques**, **actualización inmediata** y **FIFO**. Se ejecuta:
```c
while (i < n) { Total = Total + precio[i] * cantidad[i]; i = i + 1; }
```
Con la memoria vacía:
a) Indique la correspondencia entre una dirección de MP y una de MC.
b) Indique los primeros 3 accesos a datos, si i, n y Total están en registros inicializados a cero, y los vectores precio y cantidad se almacenan desde las direcciones **80018** y **70018**.

<!--opciones
*a) Etiqueta 17 | Conjunto 11 | Palabra 4; fallo, fallo, acierto
b) Etiqueta 16 | Conjunto 12 | Palabra 4; fallo, fallo, fallo
c) Etiqueta 17 | Conjunto 11 | Palabra 4; fallo, acierto, acierto
d) Etiqueta 20 | Línea 8 | Palabra 4; acierto, fallo, acierto
-->

<details><summary>Solución</summary>

a)
1. 4 GB = 2³² → **32 bits**
2. Palabra en el bloque: 16 B → **4 bits**
3. Bloques de cada MC = 64 KB / 16 B = 4096; conjuntos = 4096 / 2 = **2048 → 11 bits**
4. Etiqueta = 32 − 11 − 4 = **17 bits** → **`17 | 11 | 4`**
5. Entrelazado de 16 módulos: los 4 bits de menor peso eligen el módulo, así que un bloque de 16 B se lee **en un solo acceso de 32 ns**.

b) Como i, n y Total están en registros, solo se accede a los vectores. Supuesto: direcciones en hex y elementos de 4 B.

| # | Acceso | Dir | Etiqueta | Conjunto | Palabra | Resultado |
|---|---|---|---|---|---|---|
| 1 | precio[0] | 80018 | 10₁₆ | 1 | 8 | **Fallo** → bloque 80010–8001F a la vía 0 del conjunto 1 |
| 2 | cantidad[0] | 70018 | E₁₆ | 1 | 8 | **Fallo** → bloque 70010–7001F a la vía 1 del conjunto 1 |
| 3 | precio[1] | 8001C | 10₁₆ | 1 | C | **Acierto** (mismo bloque) |

Con 2 vías, los dos vectores comparten el conjunto 1 sin expulsarse.
</details>

### E16 ⭐ (diap. 93) MV paginada + MC
Página de **16 KB** (palabras de 1 B); MV de **1 MB** asociativa con LRU; MP de **64 KB**; MC de **256 B** asociativa por conjuntos, bloques de **64 B**, **2 bloques por conjunto**, LRU.
a) Indique el formato de la DV y la DF y calcule el número de páginas de la MV y de la MP, así como el número de bloques de la MP y de la MC.

<!--opciones
*a) DV 6|14; DF 2|14; 64 páginas y 4 marcos; 1024 bloques en MP y 4 en MC
b) DV 14|6; DF 14|2; 16 páginas y 4 marcos; 256 bloques en MP y 2 en MC
c) DV 6|14; DF 4|12; 64 páginas y 16 marcos; 1024 bloques en MP y 8 en MC
d) DV 4|16; DF 2|14; 16 páginas y 4 marcos; 64 bloques en MP y 4 en MC
-->

<details><summary>Solución</summary>

1. DV: 1 MB = 2²⁰ → 20 bits; desplazamiento = log2(16K) = **14**; página = **6 bits** → **64 páginas** en MV
2. DF: 64 KB = 2¹⁶ → 16 bits; marco = 16 − 14 = **2 bits** → **4 páginas (marcos)** en MP
3. Bloques de la MP = 64 KB / 64 B = **1024**; bloques de la MC = 256 / 64 = **4** → **2 conjuntos**
4. DF vista por la MC: palabra 6, conjunto 1, etiqueta 16 − 1 − 6 = **9**

```
DV (20):  | Página 6   | Desplazamiento 14 |
DF (16):  | Marco 2    | Desplazamiento 14 |
DF en MC: | Etiqueta 9 | Conjunto 1 | Palabra 6 |
```
Si piden tiempos: acierto → Tc; fallo en MC → Tb + Tc; fallo de página → Tp + Tb + Tc.
</details>

### E17 ⭐ (diap. 94) ¿Se puede traducir?
Un proceso emite la dirección lógica **2453** con paginación de páginas de **1024 palabras**. a) ¿Es posible que se traduzca en la dirección física **9322**?

<!--opciones
*a) No: desplazamientos 405 y 106 no coinciden
b) Sí: ambas están en memoria
c) Sí: 9322 es múltiplo de 1024
d) No: 2453 es mayor que 1024
-->

<details><summary>Solución</summary>

1. Desplazamiento lógico = 2453 mod 1024 = **405** (página 2)
2. Desplazamiento físico = 9322 mod 1024 = **106** (marco 9)
3. 405 ≠ 106 → **NO es posible**: al traducir, el desplazamiento no cambia, solo cambia la página por el marco.

(Con el marco 9, la DF válida sería 9·1024 + 405 = 9621.)
</details>

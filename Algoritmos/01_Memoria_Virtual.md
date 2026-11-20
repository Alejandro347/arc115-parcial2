# 01 · Memoria virtual ⭐⭐⭐ (los últimos ejercicios de la diapositiva)

## Algoritmo A — Formato de DV y DF en memoria virtual paginada

**Datos típicos:** espacio virtual (o bits del computador), memoria física y tamaño de página.

1. **Pasar todo a potencias de 2** en la misma unidad (palabras o bytes).
   1K = 2^10, 1M = 2^20, 1G = 2^30, 512 = 2^9, 16K = 2^14.
2. **Desplazamiento** `d = log2(tamaño de página)`. Es el mismo en la DV y en la DF.
3. **Bits de la DV** `= log2(espacio virtual)` (o el dato «computador de n bits»).
4. **Bits de página** `p = bits DV − d`. **Nº de páginas** `= 2^p = espacio virtual / tamaño de página`.
5. **Bits de la DF** `= log2(memoria física)`.
6. **Bits de marco** `m = bits DF − d`. **Nº de marcos** `= 2^m = memoria física / tamaño de página`.
7. **Tabla de páginas** (traducción directa): **una entrada por página** (2^p entradas).
   Cada entrada: bit de presencia/validez, bit de modificado, bits de permisos y nº de marco (m bits) o dirección en disco.
8. Dibujar:
```
DV: | Nº página (p) | Desplazamiento (d) |
DF: | Nº marco (m)  | Desplazamiento (d) |
```

### Ejemplo — diap. 80–81 (salió en clase)
Espacio virtual 64K, espacio físico 8K, página de 512 palabras, traducción directa.
1. 64K = 2^16 · 8K = 2^13 · 512 = 2^9
2. d = **9 bits**
3. DV = **16 bits** → p = 16 − 9 = **7 bits** → **128 páginas** (64·1024/512)
4. DF = **13 bits** → m = 13 − 9 = **4 bits** → **16 marcos** (8·1024/512)
5. TP directa = **128 entradas**
```
DV (16): | Página 7 | Desplazamiento 9 |
DF (13): | Marco 4  | Desplazamiento 9 |
```

### Ejemplo — diap. 88–91 = Parcial 2025 (Q59 de las flashcards) ⭐
Computador de 20 bits, páginas de 1 KB, memoria física de 256 KB.
- a) d = log2(1K) = **10 bits**; página = 20 − 10 = **10 bits** → `| Página 10 | Desplazamiento 10 |`
- b) Entradas de la TP = nº máximo de páginas = 2^10 = **1024**
- c) Marcos = 256 KB / 1 KB = **256** (2^8; la DF tiene 8 + 10 = 18 bits)
- d) Campos de una entrada de la TP:
  - **Bit de presencia:** ¿la página está en MP? Si es 0 → fallo de página.
  - **Bit de modificado (dirty):** si es 1, la página se escribe en disco al reemplazarla.
  - **Bit de validez:** la entrada pertenece al espacio del proceso.
  - **Bits de permisos:** lectura, escritura, ejecución.
  - **Nº de marco:** dónde está la página en MP.

### Ejemplo — Parcial 2019b / 2025 (Q58) 🔁
Espacio virtual 32K, MP 8K, página 2K, bus de memoria secundaria de 24 bits.
- d = 11 · DV = 15 → página = **4** (16 páginas) · DF = 13 → marco = **2** (4 marcos)
- Los 24 bits del bus secundario indican cuánto ocupa en la TP la dirección de disco de una página no presente (24 bits, o 24 − 11 = 13 bits si se guarda el nº de bloque).

---

## Algoritmo B — Traducir una dirección lógica decimal (paginación) — diap. 94 ⭐ (el último ejercicio)

1. `página = DL div tamaño de página`; `desplazamiento = DL mod tamaño de página`
2. Buscar en la TP el marco de esa página.
3. `DF = marco × tamaño de página + desplazamiento`
4. **Prueba de validez:** una DF puede venir de una DL **solo si** `DF mod tamaño de página == DL mod tamaño de página` (el desplazamiento no cambia al traducir).

### Ejemplo — diap. 94
DL = 2453, páginas de 1024 palabras. ¿Puede traducirse a DF = 9322?
- 2453 = 2·1024 + **405** → página 2, desplazamiento 405
- 9322 = 9·1024 + **106** → marco 9, desplazamiento 106
- 405 ≠ 106 → **NO es posible.**
- (Las DF válidas serían de la forma `marco·1024 + 405`; por ejemplo, con marco 9 → 9621.)

### Variante (refuerzo, ejercicio_memoria_virtual.pdf)
Página de 512, TP: pág 1 → marco 3, pág 4 → 0, pág 5 → 2, pág 9 → 1; el resto no está presente.
- DL 1628 = 3·512 + 92 → página 3 → **no presente → fallo de página**
- DL 851 = 1·512 + 339 → marco 3 → DF = 3·512 + 339 = **1875**
- DL 2700 = 5·512 + 140 → marco 2 → DF = **1164**
- DL 2432 = 4·512 + 384 → marco 0 → DF = **384**

---

## Algoritmo C — Memoria virtual SEGMENTADA (DV en hexadecimal) — diap. 83–84

1. Pasar la DV a **binario** con el número de bits indicado.
2. Separar: los **s bits más significativos** = nº de segmento; el resto = desplazamiento.
3. Buscar el segmento en la tabla: **base** y **longitud**.
4. **Verificar:** si `desplazamiento < longitud` → válido. Si no → **fallo/violación de segmento** (no se puede traducir).
   En clase lo comprobaron también así: `base + desplazamiento` vs `base + longitud`.
5. `DF = base + desplazamiento` (suma en hexadecimal).

### Ejemplo — diap. 83–84 (resuelto en clase)
DV de 12 bits: 3 bits de segmento + 9 bits de desplazamiento.

| Seg | Base | Longitud |
|---|---|---|
| 0 | 0D1 | 258 |
| 1 | 8FC | 00E |
| 2 | 05A | 064 |
| 3 | 52F | 244 |

| DV | Binario `sss ddddddddd` | Seg | Desplazamiento | ¿Desp < long? | DF |
|---|---|---|---|---|---|
| 1FE | `000 111111110` | 0 | 1FE | 1FE < 258 ✔ | 0D1 + 1FE = **2CF** |
| 21A | `001 000011010` | 1 | 01A | 01A ≥ 00E ✘ | **fallo** (8FC + 01A = 916 > 90A) |
| 30B | `001 100001011` | 1 | 10B | 10B ≥ 00E ✘ | **fallo** |
| 590 | `010 110010000` | 2 | 190 | 190 ≥ 064 ✘ | **fallo** |
| 790 | `011 110010000` | 3 | 190 | 190 < 244 ✔ | 52F + 190 = **6BF** |

> ⚠️ Trampa: «21A» parece segmento 2, pero al separar en binario (3 bits) es el **segmento 1**. Siempre pasa a binario.

### Ejemplo — Parcial 2019a (Q69)
Segmento 0: base 229, longitud 609; DV (0, 440) → 440 < 609 ✔ → DF = 229 + 440 = **669**.

---

## Algoritmo D — Memoria virtual SEGMENTADA/PAGINADA — diap. 85–87 ⭐ («examen hasta aquí»)

DV = `| Segmento (s) | Página (p) | Desplazamiento (d) |`, DF = `| Marco | Desplazamiento |`

**Hacia adelante (DV → DF):**
1. Partir la DV (hex → binario) en segmento, página y desplazamiento según los bits dados.
2. **Dirección de la entrada en la TS** = registro base de la TS + nº de segmento.
3. **Contenido** de esa dirección = **base de la TP** de ese segmento.
4. **Dirección de la entrada en la TP** = base de la TP + nº de página.
5. **Contenido** de esa dirección = **nº de marco**.
6. **DF = marco ‖ desplazamiento** (concatenar; el desplazamiento no cambia).

**Hacia atrás (DF → DV), como se resolvió en clase:**
1. Partir la DF: los últimos *d* bits = desplazamiento; el resto = marco.
2. Buscar en la TP **qué dirección contiene ese marco** → dirección de la entrada en la TP.
3. `página = dirección de la entrada en la TP − base de la TP` (la base es el contenido de la entrada de la TS).
4. `segmento = dirección de la entrada en la TS − registro base de la TS`.
5. DV = segmento ‖ página ‖ desplazamiento.

### Ejemplo — diap. 86–87 (resuelto en clase)
DV de 32 bits: segmento 12, página 8 (1 byte), desplazamiento 12. DF = FA10F₁₆; registro de inicio de la TS = 10000₁₆; M[1001B] = 100F2 (en la TS); TP: M[1011B] = 15, **M[1011C] = FA**, M[1011D] = AF.
1. DF = FA10F → **marco = FA**, **desplazamiento = 10F** (12 bits = 3 dígitos hex)
2. El marco FA está en la dirección **1011C** de la TP
3. Base de la TP (contenido de la TS en 1001B) = **100F2** → página = 1011C − 100F2 = **2A**
4. Entrada de la TS = 1001B → segmento = 1001B − 10000 = **01B**
5. **DV = 01B | 2A | 10F = 01B2A10F₁₆**

Comprobación hacia adelante: 10000 + 01B = 1001B → 100F2; 100F2 + 2A = 1011C → FA; DF = FA ‖ 10F = **FA10F** ✔

> Truco hex: para sumar o restar, alinea los dígitos a la derecha. 100F2 + 2A: F2 + 2A = 11C → 1011C.

---

## Algoritmo E — Formatos combinados MV + caché — diap. 93 ⭐ (penúltimo)

Página de 16 KB (palabra = 1 B); MV de 1 MB (asociativa, LRU); MP de 64 KB; MC de 256 B asociativa por conjuntos, bloques de 64 B, 2 bloques por conjunto, LRU.

**Pasos:**
1. **DV:** 1 MB = 2^20 → 20 bits. Desplazamiento = log2(16K) = 14. Página = 20 − 14 = **6 bits** → **64 páginas** en MV.
2. **DF:** 64 KB = 2^16 → 16 bits. Marco = 16 − 14 = **2 bits** → **4 marcos** (páginas) en MP.
3. **Bloques en MP** = 64 KB / 64 B = **1024**.
4. **Bloques en MC** = 256 B / 64 B = **4**; conjuntos = 4 / 2 = **2** → 1 bit.
5. **DF vista por la caché:** palabra = log2(64) = 6; conjunto = 1; etiqueta = 16 − 1 − 6 = **9**.
```
DV (20): | Página 6 | Desplazamiento 14 |
DF (16): | Marco 2  | Desplazamiento 14 |
DF caché:| Etiqueta 9 | Conjunto 1 | Palabra 6 |
```
**Si piden tiempos (Tc, Tm, Tb, Tp)**, razona por casos:
- Acierto en caché → **Tc**
- Fallo en caché, página en MP → **Tb + Tc** (traer el bloque y leer)
- Fallo de página → **Tp + Tb + Tc** (traer la página del disco, luego el bloque, luego leer)
- Tiempo medio = suma de cada caso × su probabilidad.

---

## Algoritmo F — Caché con MP entrelazada y código (C/Java) — diap. 92 = Parcial 2025 ⭐

Micro de 8 bits (palabra = 1 B); MP de 4 GB entrelazada simple con 16 módulos, 32 ns; dos MC independientes (instrucciones/datos) de 64 KB, 4 ns, bloques de 16 B, asociativa por conjuntos de 2 bloques, write-through y FIFO.
```c
while (i < n) { Total = Total + precio[i] * cantidad[i]; i = i + 1; }
```
**a) Correspondencia entre dirección de MP y MC**
1. MP: 4 GB = 2^32 → **32 bits**
2. Palabra en el bloque: 16 B = 2^4 → **4 bits**
3. Bloques de la MC = 64 KB / 16 B = 4096; conjuntos = 4096 / 2 = **2048 = 2^11 → 11 bits**
4. Etiqueta = 32 − 11 − 4 = **17 bits**
```
| Etiqueta 17 | Conjunto 11 | Palabra 4 |
```
5. **Entrelazado:** 16 módulos → los **4 bits de menor peso** eligen el módulo. Como el bloque mide 16 B = 16 módulos × 1 B, un bloque entero se lee **en paralelo en un solo acceso de 32 ns**.

**b) Primeros 3 accesos a datos** (i, n y Total están en registros, así que solo se accede a los vectores). Supuesto: precio desde 80018₁₆ y cantidad desde 70018₁₆, elementos de 4 B.

| # | Acceso | Dirección | Etiqueta (addr ≫ 15) | Conjunto ((addr ≫ 4) mod 2048) | Palabra (addr mod 16) | Resultado |
|---|---|---|---|---|---|---|
| 1 | precio[0] | 80018 | 10₁₆ | 1 | 8 | **Fallo** (caché vacía): se trae el bloque 80010–8001F a la vía 0 del conjunto 1 |
| 2 | cantidad[0] | 70018 | E₁₆ | 1 | 8 | **Fallo**: se trae el bloque 70010–7001F a la vía 1 del conjunto 1 |
| 3 | precio[1] | 8001C | 10₁₆ | 1 | C | **Acierto** (mismo bloque que precio[0]) |

- Truco: conjunto = dígitos hex sin el último (bloque = 8001) → 8001 mod 2048 (800 hex) = 1.
- Si los elementos fueran de 1 B (micro de 8 bits), precio[1] = 80019: mismo bloque → acierto igual.
- Como es asociativa de 2 vías, los dos vectores caen en el mismo conjunto **sin expulsarse**. En correspondencia directa chocarían (fallos de conflicto).
- Escrituras: Total e i están en registros, así que no hay escrituras a memoria. Si hubiera, por ser write-through irían a MC y MP.
- Localidad: espacial en los vectores (1 fallo cada 16 B), temporal en las instrucciones del bucle (MC de instrucciones).

---

## Algoritmo G — ¿Cabe el programa en memoria? (Parcial 2019a, Q70)

1. `marcos = memoria física / tamaño de página`
2. Por cada sección (código, datos, pila): `páginas = ⌈tamaño / tamaño de página⌉` (redondeo **hacia arriba**)
3. Sumar las páginas y comparar con los marcos.
4. Comentar la fragmentación interna: con páginas más pequeñas se desperdicia menos.

Ejemplo: 64 KB / 4 KB = 16 marcos; código 32768 → 8; datos 16386 → **5**; pila 15870 → 4; total **17 > 16 → no cabe**. Con páginas de 512 B: 64 + 33 + 31 = 128 = 128 marcos → **sí cabe**. El tamaño de página influye.

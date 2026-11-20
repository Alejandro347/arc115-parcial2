# 02 · Caché: políticas de ubicación (correspondencia) ⭐⭐⭐

## Algoritmo A — Formato de dirección para las 3 correspondencias

**Datos:** tamaño de MP, tamaño de MCa, tamaño de bloque (palabras × bits por palabra) y, si es por conjuntos, las vías (bloques por conjunto).

1. **Unidad direccionable:** ¿la memoria se direcciona por byte o por palabra? Usa esa unidad en todo.
2. **Bits de dirección** `n = log2(tamaño de MP en unidades)`.
3. **Bits de palabra** `w = log2(unidades por bloque)`.
4. **Líneas de MCa** `L = tamaño de MCa / tamaño de bloque` (en la misma unidad; si te dan bits, divide bits entre bits).
5. Según el tipo:

| Tipo | Campos | Cálculo |
|---|---|---|
| **Directa** | `Etiqueta \| Línea \| Palabra` | línea = log2(L); etiqueta = n − línea − w (= log2(MP / MCa)) |
| **Asociativa** | `Etiqueta \| Palabra` | etiqueta = n − w (= log2 del nº de bloques de MP) |
| **Por conjuntos (k vías)** | `Etiqueta \| Conjunto \| Palabra` | conjuntos C = L / k; conjunto = log2(C); etiqueta = n − conjunto − w |

6. **Comprobar:** etiqueta + índice + palabra = n.

### Ejemplo base — diap. 38–47 (MP 1 MB, MCa 1 KB, bloques de 8 B)
- n = log2(2^20) = **20**; w = log2(8) = **3**; L = 2^10 / 2^3 = **128 líneas** (7 bits); bloques de MP = 2^20 / 2^3 = 2^17
- **Directa:** `10 | 7 | 3`
- **Asociativa:** `17 | 3`
- **Por conjuntos de 2 bloques** (diap. 46): C = 128 / 2 = 64 → 6 bits → `11 | 6 | 3`

### Ejemplo — diap. 59 (resuelto en clase)
Caché por conjuntos de 64 líneas en conjuntos de 4 líneas; MP de 4K bloques de 128 palabras.
- w = log2(128) = **7**; bloques de MP = 4K = 2^12 → n = 12 + 7 = **19**
- C = 64 / 4 = 16 → **4 bits**; etiqueta = 19 − 4 − 7 = **8**
- **`8 | 4 | 7`**

### Ejemplo — Parciales 2019b / 2025 / 2025 🔁🔁 (Q57)
Bloque de 4 palabras de 16 bits, conjuntos de 2, caché de 4096 palabras de 16 bits, MP de 64K × 32.
- n = log2(64K) = **16**; w = log2(4) = **2**
- Línea = 4 × 16 = 64 bits; conjunto = 2 × 64 = 128 bits; caché = 4096 × 16 = 65 536 bits
- C = 65 536 / 128 = **512 → 9 bits**; etiqueta = 16 − 9 − 2 = **5** → **`5 | 9 | 2`**

### Ejemplo — Parcial 2022 (Q61): solo contar conjuntos
16 KB / 128 B = 128 líneas → 2 vías: **64**, 4 vías: **32**, 8 vías: **16** conjuntos.

### Ejemplo — refuerzo (José Garzía)
16 conjuntos, bloques de 8 palabras, caché de 2048 palabras, MP de 1024K palabras.
n = 20; w = 3; conjunto = 4; etiqueta = 13 → `13 | 4 | 3` (2048 / 8 = 256 líneas, 16 vías por conjunto).

---

## Algoritmo B — ¿En qué línea/conjunto cae una dirección? (Parcial 2020, Q60)

1. Calcular el formato (Algoritmo A).
2. Pasar la dirección **hex → binario** (4 bits por dígito) con exactamente *n* bits.
3. Cortar de **derecha a izquierda**: primero la palabra (w bits), luego la línea o conjunto, y lo que sobra es la etiqueta.
4. Pasar cada campo a decimal o hex.
   - Alternativa aritmética: `bloque = dir div tamaño de bloque`; `línea = bloque mod L`; `etiqueta = bloque div L`.

### Ejemplo — Parcial 2020: MP de 2^16 B, bloque de 8 B, 32 líneas, directa → `8 | 5 | 3`
| Dir | Binario | Etiqueta | Línea | Byte |
|---|---|---|---|---|
| 111B | `00010001 00011 011` | 11₁₆ | **3** | 3 |
| C334 | `11000011 00110 100` | C3₁₆ | **6** | 4 |

### Ejemplo — dirección 12345₁₆ con la configuración de la diap. 38 (20 bits)
Binario: `0001 0010 0011 0100 0101`
- Directa `10|7|3`: etiqueta = 0001001000 = **048₁₆**, línea = 1101000 = **104**, palabra = 101 = **5**
- Asociativa `17|3`: etiqueta = **2468₁₆**, palabra 5
- Conjuntos `11|6|3`: etiqueta = **091₁₆**, conjunto = 101000 = **40**, palabra 5

### Ejemplo — refuerzo tgr-5
4 MB en líneas de 512 B, 16 conjuntos × 4 vías → `9 | 4 | 9`. Dirección `101000011 0010 011000000` → conjunto `0010` = **2**.

---

## Algoritmo C — Cómo funciona una lectura en caché (para explicar paso a paso)

1. La CPU pone la dirección en el bus; el controlador la separa en sus campos.
2. **Ubicación:** con línea o conjunto se va directo a la línea o conjunto (en asociativa se compara con todas).
3. **Identificación:** se compara la etiqueta y el **bit de validez** (en conjuntos, un comparador por vía + AND + OR = *hit*).
4. **Acierto** → la palabra pasa a la CPU.
5. **Fallo** → se lee el bloque de la MP (**extracción por demanda**), se coloca y, si no hay sitio, se aplica la **política de reemplazo** (directa: trivial, sin elección).
6. **Escritura:** se aplica la política de actualización:
   - **Inmediata (write-through):** se escribe en MCa y MP a la vez. Simple y consistente, pero con mucho tráfico (se mitiga con un *buffer* de escritura).
   - **Aplazada (write-back):** solo en MCa; el *dirty bit* marca el bloque y se escribe en la MP al reemplazarlo. Menos tráfico, pero más compleja.
   - Fallo de escritura: **con asignación (write-allocate)**: se trae el bloque y se escribe en la MCa (va con *write-back*). **Sin asignación (no-write-allocate)**: se escribe solo en la MP (va con *write-through*). (diap. 53–55)

**Ventajas e inconvenientes** (diap. 40–47):
- Directa: acceso simultáneo y reemplazo trivial, pero más fallos si dos bloques que van a la misma línea se usan de forma alterna.
- Asociativa: flexible, permite muchos algoritmos de reemplazo, pero las comparaciones cuestan.
- Por conjuntos: el término medio; reduce el costo de la asociativa total.

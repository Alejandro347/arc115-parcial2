# Solucionario — Simulacro tipo 2025

Para corregir el [Simulacro tipo 2025](Simulacro_2025.md). Al final de cada respuesta se indica la tarjeta o la diapositiva que repasar si fallaste.

## PARTE I

1. **c) Celda.** La celda es la unidad más pequeña direccionable; un byte es una celda de 8 bits y la palabra es la unidad natural de organización (diap. 10 · tarjeta T7).
2. **c) Subrutinas.** La localidad temporal se da en bucles y subrutinas; tablas y matrices son localidad espacial (diap. 33 · Q2, T23).
3. **b) Ciclo de memoria.** El tiempo de acceso es solo la lectura o escritura; el ciclo de memoria le suma el tiempo extra antes del siguiente acceso (diap. 20 · Q15, T12).

## Segunda parte

| # | Resp. | Justificación |
|---|---|---|
| 1 | **V** | Gracias a la localidad temporal y espacial, la caché acierta casi siempre (Q20). |
| 2 | **V** | Diap. 3: la memoria externa son los periféricos, a los que la CPU accede vía controladores de E/S (T3). |
| 3 | **F** | Al descender, el costo por bit **disminuye** y aumentan la capacidad y el tiempo de acceso (T1). |
| 4 | **F** | Ambas necesitan **12 bits**: el número de celdas no depende de los bits por celda (diap. 8 · T6, Q28). |
| 5 | **F** | Motorola es **big endian**; little endian es Intel (diap. 11 · T8). |
| 6 | **F** | Las particiones fijas **desperdician** memoria (fragmentación interna); por eso surgen las variables (T30). |
| 7 | **V** | Es la definición de acceso aleatorio (diap. 18 · T11). |

## Tercera parte (puntos clave)

1. **PC:** dirección de la siguiente instrucción. **MAR:** dirección que se lee o escribe. **MBR:** dato leído o por escribir. **IR:** instrucción que se ejecuta.
   Captación: `MAR ← PC` → `MBR ← M[MAR]` → `IR ← MBR` → `PC ← PC + 1`; después se decodifica y ejecuta (Q38, T20).
2. Elige tres (Q44, T11):
   - **Secuencial:** se recorre en orden lineal (cintas).
   - **Directo:** dirección única según la ubicación física + búsqueda secuencial (discos).
   - **Aleatorio:** cada posición tiene su mecanismo de direccionamiento y tiempo constante (memoria principal).
   - **Asociativo:** se busca por parte del contenido (caché).
3. Porque la cantidad de direcciones depende solo de los **bits de la dirección** (2^m celdas). El tamaño de la celda solo cambia cuántos bits guarda cada una. Ejemplo: 2¹² celdas de 8 bits y 2¹² celdas de 32 bits necesitan las dos 12 bits de dirección (T6).
4. Las cuatro políticas (T24, T26, T27, Q55):
   - **Ubicación:** dónde va cada bloque (directa, asociativa o por conjuntos).
   - **Extracción:** cuándo y qué se trae de la MP (por demanda, con anticipación o selectiva).
   - **Reemplazo:** qué bloque sale (aleatoria, FIFO, LRU o LFU).
   - **Actualización:** cuándo se escribe en la MP (inmediata o aplazada).

## Problemas

### P1 — Caché asociativa por conjuntos (patrón de Q57)
1. MP: 128K = 2¹⁷ → dirección de **17 bits**
2. Palabra en el bloque: 8 palabras = 2³ → **3 bits**
3. Línea = 8 × 16 bits = 128 bits; conjunto = 4 × 128 = 512 bits; caché = 8192 × 16 = 131 072 bits
4. Conjuntos = 131 072 / 512 = **256 = 2⁸ → 8 bits** (equivalente: 8192 / 8 = 1024 líneas; 1024 / 4 = 256)
5. Etiqueta = 17 − 8 − 3 = **6 bits**

| Etiqueta | Conjunto | Palabra |
|:-:|:-:|:-:|
| **6** | **8** | **3** |

### P2 — Transformación de direcciones virtuales (patrón de Q58)
1. Dirección virtual: 64K = 2¹⁶ → **16 bits**; desplazamiento: 4K = 2¹² → **12 bits**
2. Páginas = 64K / 4K = **16 → 4 bits**
3. Dirección física: 16K = 2¹⁴ → **14 bits**; marcos = 16K / 4K = **4 → 2 bits**

```
DV (16): | Página 4 | Desplazamiento 12 |
DF (14): | Marco 2  | Desplazamiento 12 |
```
4. Tabla de páginas de **16 entradas**. Cada una lleva: bit de presencia, nº de marco (2 bits) si la página está en la MP y, si no, su dirección en memoria secundaria (**20 bits**, o 20 − 12 = **8 bits** si se guarda el nº de bloque).

### P3 — Computador de 24 bits (patrón de Q59 / diap. 88)
a) Página de 2 KB = 2¹¹ → **11 bits** de desplazamiento; página = 24 − 11 = **13 bits**. `| Página 13 | Desplazamiento 11 |`
b) Entradas = 2¹³ = **8192**
c) Marcos = 512 KB / 2 KB = **256** (2⁸; la dirección física tiene 8 + 11 = 19 bits)

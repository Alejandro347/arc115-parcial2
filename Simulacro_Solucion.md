# Solucionario — Simulacro Parcial II

Para corregir el [Simulacro_Parcial2.md](Simulacro_Parcial2.md). Los resultados de los ejercicios están verificados con un script.

## PARTE I
1. **c) EPROM** (diap. 25)
2. **b) MAR** (diap. 29)
3. **c) Extracción** (diap. 49)
4. **c) Mixta** (diap. 78)
5. **b) Directo** (diap. 17)

## PARTE II
1. **F.** Al descender, el costo por bit **disminuye** y aumentan la capacidad y el tiempo de acceso.
2. **V.** Cada bloque solo puede ir a una línea, así que no hay elección de víctima (conclusión de la diap. 58).
3. **V.** Todo (datos y dirección) entra por una línea y un circuito lógico lo selecciona.
4. **F.** La paginación es invisible, pero la **segmentación es visible** para el programador.
5. **F.** La Flash borra **por bloques**; la EEPROM borra por byte.
6. **V.** Es la escritura aplazada (*write-back*).
7. **F.** En la traducción directa hay **una entrada por cada página**. La de una entrada por marco es la traducción **asociativa**.
8. **V.** El desplazamiento nunca cambia al traducir.
9. **F.** FIFO puede presentar la **anomalía de Belady** (1 2 3 4 1 2 5 1 2 3 4 5: 3 marcos → 9 fallos, 4 marcos → 10).
10. **F.** Se soluciona **reduciendo** los procesos, aumentando la memoria o usando un mejor algoritmo de reemplazo.

## PARTE III (puntos clave)
1. **Inmediata (write-through):** se escribe a la vez en MCa y MP. Es sencilla y consistente, pero genera mucho tráfico (se usa un *buffer* de escritura).
   **Aplazada (write-back):** solo se escribe en MCa, con *dirty bit*; la MP se actualiza al reemplazar el bloque. Menos tráfico, pero más compleja.
   **Ante un fallo de escritura:** **con ubicación** (*write-allocate*, va con la aplazada): se trae el bloque a la MCa y se escribe ahí. **Sin ubicación** (*no-write-allocate*, va con la inmediata): se escribe solo en la MP.
2. **Directa:** una TP por proceso con una entrada por página; un registro base apunta a la TP. **Asociativa:** una entrada por marco, solo para las páginas que están en MP. **Mixta:** una TLB con las páginas más activas + la tabla directa.
3. **Fragmentación externa** (muchos huecos pequeños). Se soluciona con **fusión** de huecos contiguos y **compactación**.

---

## P1 — Caché
- MP: 256K = 2¹⁸ → **n = 18**; palabra: 8 = 2³ → **w = 3**
- Líneas = 8K / 8 = **1024** (2¹⁰); conjuntos = 1024 / 4 = **256** (2⁸)

| Tipo | Formato |
|---|---|
| Directa | Etiqueta **5** \| Línea **10** \| Palabra **3** |
| Asociativa | Etiqueta **15** \| Palabra **3** |
| Por conjuntos | Etiqueta **7** \| Conjunto **8** \| Palabra **3** |

b) 2A5C7₁₆ en 18 bits = `1010100 10111000 111`
- Etiqueta `1010100` = **54₁₆**; conjunto `10111000` = **184**; palabra `111` = **7**

## P2 — Directa
- Byte = 4 bits; línea = log2(64) = 6 bits; etiqueta = 16 − 6 − 4 = 6 bits → **`6 | 6 | 4`**

| Dir | Binario | Etiqueta | Línea | Byte |
|---|---|---|---|---|
| 3A7F | `001110 100111 1111` | 0E₁₆ | **39** | 15 |
| 9C45 | `100111 000100 0101` | 27₁₆ | **4** | 5 |

## P3 — Reemplazo (3 marcos)

**FIFO — 10 fallos**
| Ref | 7 | 0 | 1 | 2 | 0 | 3 | 0 | 4 | 2 | 3 | 0 | 3 | 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 7 | 7 | 7 | 2 | 2 | 2 | 2 | 4 | 4 | 4 | 0 | 0 | 0 |
| M2 |  | 0 | 0 | 0 | 0 | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 2 |
| M3 |  |  | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 3 | 3 | 3 | 3 |
| | F | F | F | R(7) | A | R(0) | R(1) | R(2) | R(3) | R(0) | R(4) | A | A |

**LRU — 9 fallos**
| Ref | 7 | 0 | 1 | 2 | 0 | 3 | 0 | 4 | 2 | 3 | 0 | 3 | 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 7 | 7 | 7 | 2 | 2 | 2 | 2 | 4 | 4 | 4 | 0 | 0 | 0 |
| M2 |  | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 3 | 3 | 3 | 3 |
| M3 |  |  | 1 | 1 | 1 | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 2 |
| | F | F | F | R(7) | A | R(1) | A | R(2) | R(3) | R(0) | R(4) | A | A |

**LFU — 8 fallos** (empate → sale la más antigua; el contador se reinicia al salir)
| Ref | 7 | 0 | 1 | 2 | 0 | 3 | 0 | 4 | 2 | 3 | 0 | 3 | 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 7 | 7 | 7 | 2 | 2 | 2 | 2 | 4 | 4 | 3 | 3 | 3 | 3 |
| M2 |  | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| M3 |  |  | 1 | 1 | 1 | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 2 |
| | F | F | F | R(7) | A | R(1) | A | R(2) | R(3) | R(4) | A | A | A |

**Comparación:** LFU 8 < LRU 9 < FIFO 10 (la óptima daría 7). La página 0 se usa mucho: LFU nunca la saca, FIFO sí la expulsa por antigua.

## P4 — Paginación
a) Desplazamiento = log2(4K) = **12**; página = 24 − 12 = **12** → `| Página 12 | Desplazamiento 12 |`. DF: 1 MB = 2²⁰ → 20 bits → `| Marco 8 | Desplazamiento 12 |`
b) Entradas de la TP = 2¹² = **4096**; marcos = 1 MB / 4 KB = **256**
c) 9000 = 2·4096 + **808** → página 2 → marco 5 → DF = 5·4096 + 808 = **21288**
   13000 = 3·4096 + 712 → página 3 **no presente → fallo de página**
d) 25384 mod 4096 = **808** = desplazamiento de 9000 → **sí es posible** (marco 6).
   25000 mod 4096 = **424** ≠ 808 → **no es posible**.

## P5 — Segmentada (2 bits de segmento + 10 de desplazamiento)
| DV | Binario `ss dddddddddd` | Seg | Desplazamiento | Comparación | DF |
|---|---|---|---|---|---|
| 2F0 | `00 1011110000` | 0 | 2F0 | 2F0 **no** < 2F0 | **Fallo** (justo en el límite) |
| 4B6 | `01 0010110110` | 1 | 0B6 | 0B6 ≥ 0A0 | **Fallo** |
| 8A0 | `10 0010100000` | 2 | 0A0 | 0A0 < 3FF | 400 + 0A0 = **4A0** |
| D2F | `11 0100101111` | 3 | 12F | 12F < 150 | B00 + 12F = **C2F** |
| C80 | `11 0010000000` | 3 | 080 | 080 < 150 | B00 + 080 = **B80** |

> Trampa: 2F0 tiene desplazamiento igual a la longitud. Las posiciones válidas van de 0 a longitud − 1, así que es **fallo**.

## P6 — Segmentada/paginada
a) DV 057A3C → segmento **05**, página **7**, desplazamiento **A3C**
1. Entrada de la TS = 2000 + 05 = **2005** → base de la TP = **3100**
2. Entrada de la TP = 3100 + 7 = **3107** → marco = **4C**
3. **DF = 4C ‖ A3C = 4CA3C₁₆**

b) DF 1BA3C → marco **1B**, desplazamiento **A3C**
1. 1B está en la dirección **3102** de la TP → página = 3102 − 3100 = **2**
2. Segmento = 2005 − 2000 = **05**
3. **DV = 05 ‖ 2 ‖ A3C = 052A3C₁₆**

## P7 — Tiempo medio (3 niveles)
5 ms = 5 000 000 ns.
`Tacc = 1·5 + (1 − 0,92)·40 + (1 − 0,9999)·5 000 000 = 5 + 3,2 + 500 = ` **508,2 ns**

**Análisis:** aunque solo 1 de cada 10 000 accesos llega al disco, este domina el tiempo medio (500 de 508 ns). Por eso h de la MP debe ser altísima (como el 0,99999995 de la diap. 57) y los fallos de página deben ser muy raros.

## P8 — Aritmética
a) Booth 6 × (−4), n = 4: M = 0110, −M = 1010, Q = 1100

| Ciclo | Operación | A | Q | Q₋₁ |
|---|---|---|---|---|
| 0 | Inicio | 0000 | 1100 | 0 |
| 1 | 00 → desplazar | 0000 | 0110 | 0 |
| 2 | 00 → desplazar | 0000 | 0011 | 0 |
| 3 | 10 → A − M | 1010 | 0011 | 0 |
|   | desplazar | 1101 | 0001 | 1 |
| 4 | 11 → desplazar | 1110 | 1000 | 1 |

A‖Q = `11101000` = **−24** ✔

b) −13 ÷ 4 → se usa |13| ÷ 4: Q = 01101, M = 00100 (n = 5)

| Ciclo | Desplazar (A, Q) | A − M | Acción |
|---|---|---|---|
| 1 | 00000, 11010 | 11100 (−) | Q₀ = 0, restaurar |
| 2 | 00001, 10100 | 11101 (−) | Q₀ = 0, restaurar |
| 3 | 00011, 01000 | 11111 (−) | Q₀ = 0, restaurar |
| 4 | 00110, 10000 | 00010 (+) | Q₀ = 1 → A = 00010, Q = 10001 |
| 5 | 00101, 00010 | 00001 (+) | Q₀ = 1 → A = 00001, Q = 00011 |

Sin signo: C = 3, R = 1. Ajuste: signo(R) = signo(D) = − → **R = −1**; signo(C) = (−)(+) = − → **C = −3**.
Comprobación: 4·(−3) + (−1) = −13 ✔

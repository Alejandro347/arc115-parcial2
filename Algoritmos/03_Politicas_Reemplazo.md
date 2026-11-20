# 03 · Políticas de reemplazo (FIFO, LRU, LFU, Óptima) ⭐⭐

## Algoritmo general (tabla de marcos)

1. Dibujar una tabla: **columnas = referencias**, **filas = marcos** (M1…Mk) + una fila de resultado.
2. Para cada referencia:
   - Si **ya está** en algún marco → **A (acierto)**; copiar la columna anterior.
   - Si **no está** y hay marco libre → **F (fallo)**; se coloca en el primer libre.
   - Si no está y no hay libre → **R(x) (fallo con reemplazo)**; se elige la víctima *x* según la política:

| Política | Víctima | Qué llevar anotado |
|---|---|---|
| **FIFO** | la que **entró primero** (más antigua en memoria) | cola de llegada (un acierto **no** la cambia) |
| **LRU** | la que lleva **más tiempo sin usarse** | tiempo del último uso (un acierto **sí** la actualiza) |
| **LFU** | la **referenciada menos veces** | contador por página; si hay empate, la más antigua (FIFO). El contador se reinicia al salir |
| **Óptima** | la que **tardará más en volver a usarse** (o no se vuelve a usar) | mirar hacia adelante en la secuencia |
| **Aleatoria** | cualquiera | — |

3. **Contar fallos** (incluidos los iniciales) y, si piden, la tasa de fallos = fallos / referencias.
4. **Conclusión:** comparar políticas; la óptima es la cota inferior.
   - FIFO puede sufrir la **anomalía de Belady** (más marcos → más fallos).
   - Si te dan **direcciones** en vez de bloques: `bloque = dirección div tamaño de bloque` (si el bloque mide 1 byte, bloque = dirección).

---

## Ejemplo — diap. 51–52 (se resolvió en clase): 3 marcos, secuencia 2 4 2 5 1 4 3 1 6 5 1

**FIFO — 8 fallos**
| Ref | 2 | 4 | 2 | 5 | 1 | 4 | 3 | 1 | 6 | 5 | 1 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 2 | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 1 | 5 | 5 |
| M2 |  | 4 | 4 | 4 | 4 | 4 | 3 | 3 | 3 | 3 | 1 |
| M3 |  |  |  | 5 | 5 | 5 | 5 | 5 | 6 | 6 | 6 |
| | F | F | A | F | R(2) | A | R(4) | A | R(5) | R(1) | R(3) |

**LRU — 8 fallos**
| Ref | 2 | 4 | 2 | 5 | 1 | 4 | 3 | 1 | 6 | 5 | 1 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 2 | 2 | 2 | 2 | 2 | 4 | 4 | 4 | 6 | 6 | 6 |
| M2 |  | 4 | 4 | 4 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| M3 |  |  |  | 5 | 5 | 5 | 3 | 3 | 3 | 5 | 5 |
| | F | F | A | F | R(4) | R(2) | R(5) | A | R(4) | R(3) | A |

Razonamiento LRU, por ejemplo al llegar el «1» (5.ª referencia): últimos usos 2→t3, 4→t2, 5→t4 → sale **4**.

**LFU — 10 fallos** (empate → sale la más antigua; el contador se reinicia al salir)
| Ref | 2 | 4 | 2 | 5 | 1 | 4 | 3 | 1 | 6 | 5 | 1 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 |
| M2 |  | 4 | 4 | 4 | 1 | 1 | 3 | 3 | 6 | 6 | 1 |
| M3 |  |  |  | 5 | 5 | 4 | 4 | 1 | 1 | 5 | 5 |
| | F | F | A | F | R(4) | R(5) | R(1) | R(4) | R(3) | R(1) | R(6) |

La página 2 (2 usos) nunca sale; las demás tienen 1 uso cada vez que entran, así que van rotando.

**Óptima — 6 fallos**
| Ref | 2 | 4 | 2 | 5 | 1 | 4 | 3 | 1 | 6 | 5 | 1 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 2 | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| M2 |  | 4 | 4 | 4 | 4 | 4 | 3 | 3 | 6 | 6 | 6 |
| M3 |  |  |  | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 |
| | F | F | A | F | R(2) | A | R(4) | A | R(3) | A | A |

> La misma secuencia con **4 marcos** salió en el Parcial 2019b: FIFO 6, LRU 7, Óptima 6 (tablas en las flashcards, Q67).

---

## Ejemplo — diap. 58 (se resolvió en clase): directo vs asociativo con LRU
MP de 1 KB, MCa de 4 marcos de 1 byte. Direcciones: 1, 4, 8, 5, 20, 17, 19, 56, 9, 11, 4, 42.

**Paso 1:** bloque = dirección (bloques de 1 byte). **Paso 2 (directo):** `marco = bloque mod 4`.

| Dir | 1 | 4 | 8 | 5 | 20 | 17 | 19 | 56 | 9 | 11 | 4 | 42 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| mod 4 | 1 | 0 | 0 | 1 | 0 | 1 | 3 | 0 | 1 | 3 | 0 | 2 |

**Directo — 12 fallos (todos)**
| Ref | 1 | 4 | 8 | 5 | 20 | 17 | 19 | 56 | 9 | 11 | 4 | 42 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| M0 |  | 4 | 8 | 8 | 20 | 20 | 20 | 56 | 56 | 56 | 4 | 4 |
| M1 | 1 | 1 | 1 | 5 | 5 | 17 | 17 | 17 | 9 | 9 | 9 | 9 |
| M2 |  |  |  |  |  |  |  |  |  |  |  | 42 |
| M3 |  |  |  |  |  |  | 19 | 19 | 19 | 11 | 11 | 11 |
| | F | F | F | F | F | F | F | F | F | F | F | F |

**Conclusión de clase:** en correspondencia directa **no se puede aplicar LRU**, porque cada bloque solo puede ir a un marco. Además, M2 queda casi sin usar mientras M0 y M1 se pisan entre sí (conflicto).

**Asociativo con LRU — 12 fallos**
| Ref | 1 | 4 | 8 | 5 | 20 | 17 | 19 | 56 | 9 | 11 | 4 | 42 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 1 | 1 | 1 | 1 | 20 | 20 | 20 | 20 | 9 | 9 | 9 | 9 |
| M2 |  | 4 | 4 | 4 | 4 | 17 | 17 | 17 | 17 | 11 | 11 | 11 |
| M3 |  |  | 8 | 8 | 8 | 8 | 19 | 19 | 19 | 19 | 4 | 4 |
| M4 |  |  |  | 5 | 5 | 5 | 5 | 56 | 56 | 56 | 56 | 42 |
| | F | F | F | F | R(1) | R(4) | R(8) | R(5) | R(20) | R(17) | R(19) | R(56) |

No hay ninguna dirección repetida dentro de una «ventana» de 4, así que tampoco hay aciertos. Cuando vuelve el 4 ya fue expulsado. Lo que se evalúa es **mostrar la evolución** de cada método.

---

## Ejemplo con páginas iniciales (Parcial 2019a, Q68)
4 marcos con {a, b} ya cargadas (en ese orden) → la cola FIFO arranca en a, b y los últimos usos LRU también. Resultado: FIFO **7** fallos, LRU **5**.

## Belady (Parcial 2020, Q66)
1 2 3 4 1 2 5 1 2 3 4 5 con FIFO: 3 marcos → **9** fallos, 4 marcos → **10** fallos.

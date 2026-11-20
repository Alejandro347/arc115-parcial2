# Algoritmos paso a paso — Parcial 2 ARC115

Fuente principal: **diapositiva de este año** `MEMORIAInterna.pdf` (el último PDF que subió el ingeniero, 94 páginas). Todos los ejercicios de ese PDF, con enunciado y solución, están en [Ejercicios de la diapositiva](../Ejercicios_Diapositiva.md). Los números «diap. N» son páginas de ese PDF.
También uso los parciales 2019–2025, los apuntes de clase (`ApuntesParcial2_18-09_04-11`) y el resumen de ecuaciones de `rod/`.

> En los apuntes, después del ejemplo de MV segmentada/paginada (diap. 86–87), dice **«examen hasta aquí ↓ parcial 2»**. Los ejercicios finales (diap. 88–94) son lo último que se vio, así que van primero.

## Orden de estudio recomendado

| # | Archivo | Ejercicios de la diapositiva | Ejercicios de parciales |
|---|---|---|---|
| 1 | [01_Memoria_Virtual.md](01_Memoria_Virtual.md) ⭐⭐⭐ | 80–81, 83–84, 86–87, **88–91, 92, 93, 94** | 2019a (segmentos, «¿cabe el programa?»), 2019b/2025 (esquema 32K/8K/2K), 2025 (20 bits), 2025 (Java/C) |
| 2 | [02_Cache_Correspondencia.md](02_Cache_Correspondencia.md) ⭐⭐⭐ | 38–50, 59, 92a | 2019b/2025 ×3 (4096 palabras), 2020 (111B/C334), 2022 (16 KB, 2/4/8 vías) |
| 3 | [03_Politicas_Reemplazo.md](03_Politicas_Reemplazo.md) ⭐⭐ | 51, 52 (LFU), 58 (directo vs asociativo LRU) | 2019a, 2019b, 2020 (Belady) |
| 4 | [04_Tiempos_y_Costos.md](04_Tiempos_y_Costos.md) ⭐⭐ | 56, 57 | refuerzos (despejar la tasa de aciertos) |
| 5 | [05_Aritmetica.md](05_Aritmetica.md) ⭐ | — | Booth 2019a/b, división 2022, bits 2022, IEEE 754 2019a |

## Fórmulas «de bolsillo»

| Qué | Fórmula |
|---|---|
| Bits de una dirección | `bits = log2(nº de unidades direccionables)` (2^10 = K, 2^20 = M, 2^30 = G) |
| Bits de palabra/desplazamiento | `log2(tamaño de bloque o de página en unidades direccionables)` |
| Líneas de caché | `tamaño de caché / tamaño de bloque` |
| Conjuntos | `líneas / vías` |
| Etiqueta | `bits de dirección − bits de índice (línea o conjunto) − bits de palabra` |
| Bloque de MP | `dirección div tamaño de bloque` |
| Línea (directa) | `bloque mod nº de líneas` |
| Conjunto | `bloque mod nº de conjuntos` |
| Páginas (MV) | `espacio virtual / tamaño de página` |
| Marcos | `memoria física / tamaño de página` |
| Página y desplazamiento | `página = DV div tamaño de página`; `desplazamiento = DV mod tamaño de página` |
| Dirección física (paginación) | `DF = marco × tamaño de página + desplazamiento` (en binario: marco ‖ desplazamiento) |
| Dirección física (segmentación) | `DF = base + desplazamiento`, solo si `desplazamiento < longitud` |
| Tiempo medio (2 niveles) | `Tacc = h·tc + (1−h)·(tc + tp)` |
| Tiempo medio (n niveles) | `Tacc = Σ (1 − h(L_{i−1}))·t_i`, con h(L0) = 0 |
| Costo medio | `Σ(costo_i · tamaño_i) / Σ tamaño_i` |

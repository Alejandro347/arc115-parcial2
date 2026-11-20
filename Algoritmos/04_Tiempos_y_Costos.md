# 04 · Tiempo medio de acceso y costo medio ⭐⭐

## Algoritmo A — Dos niveles (MCa + MP) — diap. 56

`Tacc = h·tc + (1 − h)·(tc + tp)`, donde h = tasa de aciertos de la MCa, tc = tiempo de la MCa y tp = tiempo de la MP.
(Forma equivalente: `Tacc = tc + (1 − h)·tp`.)

1. Identificar h, tc y tp (convertir el porcentaje a decimal).
2. Sustituir.
3. Interpretar: cuanto más se acerque Tacc a tc, mejor.

**Ejemplo diap. 56:** tc = 10 ns, tp = 60 ns, h = 0,70
`Tacc = 0,7·10 + 0,3·(10 + 60) = 7 + 21 = ` **28 ns**

## Algoritmo B — n niveles (MCa, MP, disco) — diap. 57

`Tacc = Σ (1 − h(L_{i−1}))·t_i`, con h(L0) = 0. Cada nivel solo se visita si fallaron todos los anteriores; las h son **tasas de acierto acumuladas** hasta ese nivel.

| Nivel | Factor | × t_i |
|---|---|---|
| MCa | (1 − 0) = 1 | × 5 ns |
| MP | (1 − h_MCa) | × 50 ns |
| Disco | (1 − h_MP) | × t_disco |

**Ejemplo diap. 57:** MCa 5 ns, 512 KB, $50/MB, h = 0,95 · MP 50 ns, 128 MB, $0,40/MB, h = 0,99999995 · Disco 10 ns (así viene en la diapositiva), 20 GB, $0,01/MB, h = 1.

a) `Tacc = 1·5 + (1 − 0,95)·50 + (1 − 0,99999995)·10 = 5 + 2,5 + 0,0000005 = ` **7,5000005 ns**

b) **Costo medio** = Σ(costo × tamaño) / Σ tamaño (todo en MB):
- 512 KB = 0,5 MB; 20 GB = 20 × 1024 = 20 480 MB
- Numerador: 0,5·50 + 128·0,40 + 20480·0,01 = 25 + 51,2 + 204,8 = **281 $**
- Denominador: 0,5 + 128 + 20480 = **20 608,5 MB**
- Costo medio = 281 / 20608,5 ≈ **0,0136 $/MB**

c) **Análisis (como se concluyó en clase):** el sistema **funciona casi a la velocidad de la caché** (7,5 ns, cerca de 5 ns) y **cuesta casi lo mismo que el disco** (0,0136 ≈ 0,01 $/MB). Ese es el objetivo de la jerarquía de memoria y es posible gracias al principio de localidad.

## Algoritmo C — Despejar la tasa de aciertos (refuerzos)

`Tm = h·tc + (1 − h)·tf` → **`h = (tf − Tm) / (tf − tc)`**, donde tf = tiempo en caso de fallo (por ejemplo, transferir el bloque + tc).

- Ejemplo: tc = 5 ns, bloque = 200 ns → tf = 205 ns, Tm = 20 ns → h = (205 − 20)/(205 − 5) = 185/200 = **0,925 (92,5 %)**
- Ejemplo: tc = 2, tf = 80, Tm = 10 → h = 70/78 = **0,897 (≈ 89,7 %)**

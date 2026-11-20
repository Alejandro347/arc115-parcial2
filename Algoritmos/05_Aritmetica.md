# 05 · Aritmética (salió en parciales anteriores) ⭐

> Según el Repaso, la **división con signo** «a pesar de que no se vio en clases, se evaluará en el parcial».

## Algoritmo A — Booth (multiplicación con signo en C2)

1. Elegir *n* bits que alcancen para ambos números con signo.
2. Cargar: `A = 0…0`, `Q = multiplicador`, `Q₋₁ = 0`, `M = multiplicando`; calcular `−M` (C2 de M).
3. Repetir **n veces**:
   - Mirar `Q₀ Q₋₁`:
     - `10` → `A = A − M` (sumar −M)
     - `01` → `A = A + M`
     - `00` / `11` → nada
   - **Desplazamiento aritmético a la derecha** de `A, Q, Q₋₁` como un solo bloque: el bit de signo de A se **copia**, el último bit de A pasa a Q y Q₀ pasa a Q₋₁.
4. El resultado está en **A‖Q** (2n bits, en C2).

**Ejemplo 11 × 5** (n = 5): M = 01011, −M = 10101, Q = 00101 → resultado `00001 10111` = **55** (tabla completa en las flashcards, Q64).
**Ejemplo (−7) × (−3)** (n = 4): M = 1001, −M = 0111, Q = 1101 → resultado `0001 0101` = **21** (Q65).

Ventajas: maneja el signo directamente; en las cadenas de 1s solo hace una resta y una suma.

## Algoritmo B — División con restauración (con signo)

1. Usar valores **absolutos**: `Q = |dividendo|`, `M = |divisor|`, `A = 0` (n bits, con un bit extra para el signo de A).
2. Repetir **n veces**:
   1. Desplazar `A,Q` una posición a la izquierda.
   2. `A = A − M`.
   3. Si `A ≥ 0` (MSB = 0) → `Q₀ = 1`. Si `A < 0` → `Q₀ = 0` y **restaurar** `A = A + M`.
3. Cociente en **Q**, residuo en **A**.
4. **Ajustar signos:** `signo(residuo) = signo(dividendo)`; `signo(cociente) = signo(dividendo) × signo(divisor)`.
5. Casos rápidos: si |divisor| > |dividendo| → C = 0, R = dividendo. Si son iguales → C = 1, R = 0.

**Ejemplo 12 ÷ (−3)** (n = 5): Q = 01100, M = 00011 → C = 00100 = 4, R = 0 → con el ajuste de signo: **C = −4, R = 0** (tabla completa en Q63).
Para practicar: 7 ÷ (−3) → |7| / |3|: C = 2, R = 1 → **C = −2, R = +1**. Comprobación: (−3)(−2) + 1 = 7 ✔.

## Algoritmo C — Bits para un entero sin signo
`n = ⌈log2(N + 1)⌉`: el menor *n* con `2ⁿ − 1 ≥ N`.
12 → **4**, 384 → **9**, 1498 → **11**.

## Algoritmo D — IEEE 754 simple (hex → decimal)
1. Hex → 32 bits.
2. Separar: **S** (1 bit) | **E** (8 bits) | **F** (23 bits).
3. Valor = `(−1)^S × 1.F × 2^(E − 127)`. Si E = 0 → desnormalizado: `0.F × 2^(−126)`.
4. 1.F = 1 + F / 2²³.

Ejemplo 84163852₁₆: S = 1, E = 00001000 = 8 → 2^(−119), 1.F ≈ 1,17359 → **≈ −1,7658 × 10⁻³⁶**.

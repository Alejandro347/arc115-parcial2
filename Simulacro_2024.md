# Simulacro tipo 2024

Copia de la **estructura exacta** del parcial de la foto `2025.jpeg` (probablemente del 2024): mismas partes, mismos porcentajes y los mismos tipos de pregunta, pero con **datos nuevos**.
Resuélvelo a mano, sin apuntes y con cronómetro (100 min). Después corrige con el [solucionario](Simulacro_2024_Solucion.md).

> Las preguntas originales de ese parcial están en las tarjetas Q3, Q5, Q6, Q19, Q21, Q22, Q24, Q26, Q27, Q28, Q38, Q43, Q45, Q46, Q57, Q58 y Q59 de [Preguntas de parciales anteriores](Flashcards_Parcial2_ARC115.md).

---

**INDICACIONES:** Conteste las siguientes preguntas y resuelva los ejercicios.

## PARTE I (15 %) — Subraye la respuesta correcta

1. Unidad más pequeña direccionable de la memoria:
   a) Palabra b) Byte c) Celda d) a, b
2. Es un ejemplo de localidad temporal:
   a) Tablas b) Matrices c) Subrutinas d) a, b
3. Es el tiempo de acceso más el tiempo adicional que se requiere antes de que pueda empezar un segundo acceso:
   a) Tiempo de acceso b) Ciclo de memoria c) Ciclo de reloj d) a, b

## Segunda parte (35 %) — Conteste F (Falso) o V (Verdadero) según corresponda

1. El principio de localidad nos permite mejorar la memoria caché. ____
2. La memoria externa es accesible al CPU por medio de los controladores de E/S. ____
3. Conforme se desciende en la jerarquía de memoria, aumenta el costo por bit. ____
4. Una memoria de 2¹² celdas de 32 bits necesita más bits de dirección que una de 2¹² celdas de 8 bits. ____
5. Motorola organiza los bits dentro de la palabra por medio de little-endian. ____
6. Las particiones de tamaño fijo eliminan el desperdicio de memoria. ____
7. En el acceso aleatorio, cualquier localidad puede ser seleccionada y accedida en forma directa. ____

## Tercera parte — Conteste las siguientes preguntas, sea breve (20 %)

1. Explique qué guardan los registros PC, IR, MAR y MBR y en qué paso del ciclo de captación interviene cada uno.
2. Explique tres métodos de acceso a memoria y dé un ejemplo de cada uno.
3. ¿Por qué el número de celdas direccionables no depende del número de bits de cada celda? Dé un ejemplo.
4. ¿Qué políticas hay que definir en un sistema con memoria caché? Explique brevemente cada una.

## Problemas — Resuelva los siguientes ejercicios y subraye las respuestas (30 %)

1. Una caché asociativa por conjuntos tiene un tamaño de bloque de **8 palabras de 16 bits** y un tamaño de conjunto de **4**. La caché puede contener un total de **8192 palabras de 16 bits**. El tamaño de la memoria principal que se puede transferir a la caché es de **128K × 16 bits**. Encuentre el formato de dirección correspondiente de la MCa. (10 %)
2. Diseñe un esquema de transformación de direcciones virtuales con las siguientes especificaciones: (10 %)
   - Espacio virtual direccionable = **64K palabras**
   - Tamaño de la memoria principal = **16K palabras**
   - Tamaño de las páginas = **4K palabras**
   - Bus de direcciones de la memoria secundaria = **20 bits**
3. Sea un computador de **24 bits** con memoria virtual paginada, páginas de **2 KB** y un total de memoria física de **512 KB**. Se pide, de forma razonada y breve: (10 %)
   a) ¿Cuál es el formato de la dirección virtual? Indique los campos y el número de bits de cada uno.
   b) ¿Cuál es el número máximo de entradas de la tabla de páginas (de un nivel)?
   c) ¿Cuántos marcos de página tiene la memoria principal?

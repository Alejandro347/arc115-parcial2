# Flashcards — Teoría de la diapositiva MEMORIA (2025)

Preguntas sacadas directamente de `MEMORIAInterna (1).ppt` (diapositiva de este año), en temas que **no** cubren las preguntas de parciales anteriores. Los V/F de los parciales suelen copiar frases textuales de aquí. «diap. N» = página del PDF.

---

## 1. Jerarquía, capacidad y direccionamiento

### T1 (diap. 2)
Conforme se **desciende** en la jerarquía de memoria, ¿qué pasa con el costo por bit, la capacidad, el tiempo de acceso y la frecuencia de acceso de la CPU?

<details><summary>Respuesta</summary>

- Costo por bit: **disminuye**
- Capacidad: **aumenta**
- Tiempo de acceso: **aumenta**
- Frecuencia de acceso de la CPU: **disminuye**

Relaciones clave: menor tiempo de acceso → mayor costo por bit; mayor capacidad → menor costo por bit, pero mayor tiempo de acceso.
</details>

### T2 (diap. 3)
¿Qué tres preguntas definen el diseño de una memoria?

<details><summary>Respuesta</summary>

**¿Cuánta?** (capacidad), **¿qué tan rápida?** (tiempo de acceso) y **¿qué tan cara?** (costo).
</details>

### T3 (diap. 3) ⚠️
Según la diapositiva, clasifique por **ubicación**: memoria interna, memoria de CPU y memoria externa.

<details><summary>Respuesta</summary>

- **Memoria interna = memoria principal** (así lo dice la diapositiva)
- **Memoria de CPU:** los registros
- **Memoria externa:** periféricos (discos, cintas), a los que la CPU accede **vía controladores de E/S**

⚠️ Esto cambia la respuesta del V/F del 2025 «la memoria interna es igual a la memoria principal»: según la diapositiva es **V**.
</details>

### T4 (diap. 4–5)
Ordene la jerarquía **tradicional** y la **contemporánea**.

<details><summary>Respuesta</summary>

- **Tradicional:** registros → caché → MP → disco magnético → cinta magnética
- **Contemporánea:** registros → caché → MP → **caché de disco** → disco magnético → cinta magnética / disco óptico
</details>

### T5 (diap. 6–7)
Si una memoria tiene **n celdas**, ¿cuáles son sus direcciones? ¿Cuántas celdas se direccionan con **m bits**?

<details><summary>Respuesta</summary>

Las direcciones van de **0 a n − 1** (empiezan en cero). Con *m* bits se direccionan **2^m** celdas. **Direccionamiento** = capacidad de acceder a una celda.
</details>

### T6 (diap. 8)
Una memoria de 2^12 celdas de 8 bits y otra de 2^12 celdas de 32 bits, ¿cuántos bits de dirección necesitan?

<details><summary>Respuesta</summary>

**Ambas necesitan 12 bits.** El número de celdas direccionables es **independiente** de los bits por celda.
</details>

### T7 (diap. 10)
Defina **celda**, **byte** y **palabra**.

<details><summary>Respuesta</summary>

- **Celda:** la unidad **más pequeña direccionable**
- **Byte:** celda de 8 bits
- **Palabra:** unidad natural de organización de la memoria; igual al número de bits que representan un número y al tamaño de instrucción (máquina de 16 bits → registros y palabras de 16 bits)
</details>

### T8 (diap. 11–12) ⚠️
¿Qué es **big endian** y **little endian**? Dé un ejemplo de cada uno.

<details><summary>Respuesta</summary>

Es el orden de numeración de los bits/bytes dentro de la palabra:
- **Big endian:** comienza por el **extremo mayor** → ej. **Motorola**
- **Little endian:** comienza por el **extremo menor** → ej. **Intel**

⚠️ Según la diapositiva, «Intel organiza los bits dentro de la palabra por little-endian» es **VERDADERO**, aunque la clave del parcial 2019b lo marcó F.
</details>

---

## 2. Transferencia, acceso y desempeño

### T9 (diap. 13)
¿Qué es la **unidad de transferencia** en la memoria interna y en la externa? ¿Qué tipos de transferencia hay?

<details><summary>Respuesta</summary>

- **Interna:** el número de bits de datos que entran o salen del módulo a la vez (puede ser igual a la palabra).
- **Externa:** unidades mucho más grandes que la palabra (**bloques**).
- **Tipos:** **secuencial** y **paralela**.
</details>

### T10 (diap. 14–15)
Diferencia entre **transferencia paralela** y **secuencial**.

<details><summary>Respuesta</summary>

- **Paralela:** los bits de un dato se reciben **simultáneamente**; la **dirección entra por otras líneas**.
- **Secuencial:** todo (datos **y** dirección) entra por **una sola línea** y un circuito lógico lo selecciona.
</details>

### T11 (diap. 16–19)
Relacione cada método de acceso con su ejemplo: secuencial, directo, aleatorio, asociativo.

<details><summary>Respuesta</summary>

| Método | Idea | Ejemplo |
|---|---|---|
| Secuencial | registros en secuencia lineal; el mecanismo de L/E se mueve | **cintas** |
| Directo | dirección única según la **localización física** + búsqueda secuencial | **discos** |
| Aleatorio | cada unidad tiene su mecanismo de direccionamiento **interalambrado** | **memoria principal** |
| Asociativo | aleatorio; se recupera por **parte del contenido**, no por la dirección | **caché** |
</details>

### T12 (diap. 20)
Defina **tiempo de acceso** y **tiempo de ciclo de memoria**.

<details><summary>Respuesta</summary>

- **Tiempo de acceso:** (en acceso aleatorio) el tiempo para una lectura o escritura: desde que se presenta la dirección hasta que el dato está almacenado o disponible.
- **Tiempo de ciclo:** tiempo de acceso **+ el tiempo adicional** antes de poder empezar un segundo acceso (se aplica a memoria aleatoria).
</details>

---

## 3. Memorias de semiconductor

### T13 (diap. 21)
¿Cómo se llamaba antes la memoria principal y por qué? ¿Qué tipos de semiconductor hay hoy?

<details><summary>Respuesta</summary>

Se llamaba **core**, porque era un arreglo de núcleos ferromagnéticos (*cores*). Hoy hay RAM, ROM, PROM, EPROM, EEPROM y Flash.
</details>

### T14 (diap. 22) ⚠️
Características de la **RAM**; diferencia entre estática y dinámica.

<details><summary>Respuesta</summary>

Lectura y escritura eléctrica; **volátil**.
- **Dinámica (DRAM):** datos en **capacitores** que se descargan → necesita **refresco periódico**.
- **Estática (SRAM):** datos en **flip-flops**; se mantienen mientras haya energía.

⚠️ La diapositiva tiene las definiciones **intercambiadas** (dice que la estática usa capacitores). Lo correcto es lo de arriba. Si sale literal en un V/F, pregunta al docente.
</details>

### T15 (diap. 23)
¿Qué es la **ROM** y para qué se usa?

<details><summary>Respuesta</summary>

Solo lectura y **no volátil**; los datos se graban en la **fabricación**. Usos: librerías de subrutinas muy usadas y **programas de arranque**.
</details>

### T16 (diap. 24)
¿Qué es la **PROM**?

<details><summary>Respuesta</summary>

ROM programable: no volátil, se puede escribir **una sola vez**, de forma eléctrica y con un proceso especial. Las PROM dan flexibilidad; las ROM convienen para grandes volúmenes.
</details>

### T17 (diap. 25)
¿Qué es la **EPROM**?

<details><summary>Respuesta</summary>

ROM programable y borrable: hay que **borrarla antes de escribir**; el borrado es con **luz ultravioleta**. Es más cara que la PROM, pero permite **actualizarse muchas veces**.
</details>

### T18 (diap. 26)
¿Qué es la memoria **Flash** y por qué se llama así?

<details><summary>Respuesta</summary>

El nombre viene de la **velocidad con que se reprograma**. Apareció a mediados de los 80; en costo y funcionalidad está entre EPROM y EEPROM. Borrado **eléctrico** en segundos, **por bloques** (no por byte).
</details>

### T19 (diap. 27)
Complete la tabla: categoría, borrado, escritura y volatilidad de RAM, ROM, PROM, EPROM, EEPROM y Flash.

<details><summary>Respuesta</summary>

| Tipo | Categoría | Borrado | Escritura | Volátil |
|---|---|---|---|---|
| RAM | lectura y escritura | eléctrico, por byte | eléctrica | **sí** |
| ROM | solo lectura | no posible | máscaras (fábrica) | no |
| PROM | solo lectura | no posible | eléctrica | no |
| EPROM | principalmente lectura | luz UV, chip completo | eléctrica | no |
| EEPROM | principalmente lectura | eléctrico, **por byte** | eléctrica | no |
| Flash | principalmente lectura | eléctrico, **por bloque** | eléctrica | no |
</details>

---

## 4. Registros de la CPU

### T20 (diap. 28–29)
¿Qué guardan PC, IR, MAR y MBR?

<details><summary>Respuesta</summary>

- **PC:** dirección de la **siguiente instrucción**
- **IR:** la instrucción que se va a ejecutar
- **MAR:** **dirección** de la palabra que se va a leer o escribir
- **MBR:** el **contenido** que se va a escribir o el que se leyó
</details>

### T21 (diap. 30)
Registros temporales y **banderas** más comunes.

<details><summary>Respuesta</summary>

- Temporales: **AC** (acumulador) y **MQ** (*Multiplier Quotient*; se usa en Booth y en la división).
- Banderas (solo V/F):
  - **N:** acumulador negativo
  - **Z:** acumulador en cero
  - **V:** overflow
  - **C:** hubo carry
</details>

---

## 5. Caché (conceptos)

### T22 (diap. 31)
¿Cuál es el **objetivo** de la caché y qué parámetros se optimizan en su diseño?

<details><summary>Respuesta</summary>

Objetivo: que las referencias a memoria se sirvan a una velocidad **muy cercana a la del procesador**.
Parámetros: probabilidad de acierto, tiempo de acceso efectivo, retardos por fallos y actualización de la MP en las escrituras.
Lógicamente se divide en **directorio** (etiquetas) y **bloques de datos**.
</details>

### T23 (diap. 33)
Enuncie el **principio de localidad** y sus dos tipos con ejemplos.

<details><summary>Respuesta</summary>

Las referencias del procesador (a instrucciones y datos) tienden a **agruparse en el tiempo y en el espacio**.
- **Temporal:** bucles, subrutinas
- **Espacial:** tablas, matrices
</details>

### T24 (diap. 35, 37)
¿Qué **4 políticas** hay que definir en un sistema con caché?

<details><summary>Respuesta</summary>

**Ubicación**, **extracción**, **reemplazo** y **actualización** (esta última resuelve la coherencia entre niveles).
</details>

### T25 (diap. 36)
Describa paso a paso la **organización/funcionamiento** de la caché ante una lectura.

<details><summary>Respuesta</summary>

1. La CPU lanza la dirección al bus.
2. El controlador de caché la pasa a la caché.
3. Si el dato está → **acierto**, comprobando también el **bit de validez**.
4. El dato pasa a la CPU.
5. Si hay **fallo**, la dirección se lanza a la MP.

Todo el mecanismo es **transparente** para la CPU.
</details>

### T26 (diap. 49)
¿Qué es la política de **extracción** y cuáles son sus tipos?

<details><summary>Respuesta</summary>

Determina **cuándo y qué** información se envía de la MP a la MCa. Tipos: **por demanda** (se trae el bloque cuando hay fallo), **con anticipación** (prebúsqueda) y **selectiva**.
</details>

### T27 (diap. 50)
¿Qué política de reemplazo es la más sencilla y barata? ¿Qué pasa con LRU y FIFO al aumentar los bloques candidatos?

<details><summary>Respuesta</summary>

La **aleatoria** es la más sencilla y barata. En LRU y FIFO la **complejidad y el costo aumentan** con el número de bloques entre los que hay que elegir. (El reemplazo tiene sentido con ubicación asociativa o por conjuntos; en la directa es trivial.)
</details>

### T28 (diap. 54)
Desde el punto de vista de los fallos transitorios de hardware, ¿qué política de escritura es preferible?

<details><summary>Respuesta</summary>

La **escritura inmediata** (*write-through*), porque la MP siempre tiene una copia actualizada.
</details>

---

## 6. Gestión de memoria y memoria virtual

### T29 (diap. 61)
Diferencia entre **monoprogramación** y **multiprogramación** en la gestión de memoria.

<details><summary>Respuesta</summary>

- **Mono:** la memoria se divide en **dos partes**: SO (monitor residente) + el programa en ejecución.
- **Multi:** la parte de usuario se **subdivide y se comparte** entre los procesos activos.
</details>

### T30 (diap. 62–63)
¿Cómo funcionan las **particiones fijas**? ¿Cuál es su problema?

<details><summary>Respuesta</summary>

Pueden ser de igual o de distinto tamaño; el proceso va a la **partición más pequeña que lo contenga**. Se **desperdicia memoria** (fragmentación interna) → por eso surgen las particiones variables.
</details>

### T31 (diap. 64–65)
¿Cómo funcionan las **particiones variables**? ¿Qué problema generan y cuáles son sus 2 soluciones?

<details><summary>Respuesta</summary>

Se asigna **exactamente** la memoria que el proceso necesita. Al entrar y salir procesos quedan **muchos huecos pequeños** (fragmentación externa).
Soluciones:
- **Fusión:** unir huecos contiguos.
- **Compactación:** el SO desplaza los procesos para juntar toda la memoria libre.
</details>

### T32 (diap. 67)
¿Qué es el **reposicionamiento**? Diferencia entre dirección lógica y física.

<details><summary>Respuesta</summary>

Un proceso no siempre se carga en la misma posición, así que hay que convertir sus direcciones.
- **Lógica:** posición **relativa al comienzo** del programa.
- **Física:** posición **actual** en la MP.

La conversión es automática con la **dirección base**.
</details>

### T33 (diap. 68)
Características de la **paginación**.

<details><summary>Respuesta</summary>

- La memoria se divide en **marcos** iguales y pequeños; los procesos, en **páginas** del mismo tamaño.
- Se asignan los marcos necesarios, que **no tienen que ser contiguos**.
- El SO mantiene la lista de marcos libres.
- Hay una **tabla de páginas por proceso**.
</details>

### T34 (diap. 70)
¿Qué es la **paginación por demanda** y qué pasa en un **fallo de página**?

<details><summary>Respuesta</summary>

No todas las páginas tienen que estar en memoria: cada una se trae **solo cuando se necesita**.
Fallo de página: la página no está → el SO la carga; si no hay hueco, saca una página elegida según su **historia reciente** (algoritmo de reemplazo).
</details>

### T35 (diap. 71)
**Hiperpaginación:** causa, síntomas y 3 soluciones.

<details><summary>Respuesta</summary>

- **Causa:** una memoria pequeña con demasiados procesos.
- **Síntomas:** el SO pasa la mayor parte del tiempo intercambiando páginas, casi no hay trabajo útil y la luz del disco está siempre encendida.
- **Soluciones:** un buen algoritmo de reemplazo, **reducir los procesos** en curso y **aumentar la memoria**.
</details>

### T36 (diap. 72)
**Ventajas** de la memoria virtual.

<details><summary>Respuesta</summary>

- No hace falta tener en memoria todos los procesos.
- Se intercambian solo las páginas necesarias.
- Se pueden ejecutar **procesos más grandes que toda la memoria**.
- La MP pasa a llamarse **memoria real**; el usuario percibe una memoria mucho mayor (la **virtual**).
</details>

### T37 (diap. 73)
Además de la tabla de páginas directa, ¿qué otra estructura de tabla de páginas aparece en la diapositiva?

<details><summary>Respuesta</summary>

La **tabla de páginas invertida**: el número de página pasa por una **función de dispersión (hash)** que lleva a una tabla con **una entrada por marco**; las colisiones se resuelven con una cadena.
</details>

### T38 (diap. 74)
Diferencia de **visibilidad** entre paginación y segmentación.

<details><summary>Respuesta</summary>

La **paginación es invisible** para el programador; la **segmentación es visible**: el programador asigna segmentos distintos a programas y datos.
</details>

### T39 (diap. 75)
**Ventajas** de la segmentación.

<details><summary>Respuesta</summary>

- Simplifica las **estructuras de datos que crecen**.
- Permite **modificar y recompilar programas por separado** sin volver a enlazar y cargar todo.
- Permite **compartir segmentos** entre procesos.
- Facilita la **protección**.
- Se puede combinar con la paginación.
</details>

### T40 (diap. 77–78)
Explique los 3 mecanismos de traducción de la MV paginada: **directa, asociativa y mixta**.

<details><summary>Respuesta</summary>

- **Directa:** una **TP por proceso**, con **una entrada por cada página** (¿está en MP?, ¿en qué marco?). Cada proceso tiene un **registro base** que apunta a su TP.
- **Asociativa:** reduce el tamaño de la TP; solo tiene entradas para las páginas que están en MP (**una entrada por marco**).
- **Mixta:** una tabla asociativa pequeña con las páginas más activas, la **TLB** (*Translation Lookaside Buffer*), más la tabla directa.
</details>

### T41 (diap. 82)
En MV segmentada, si la DV tiene *s* bits de segmento y *d* bits de desplazamiento, ¿cuál es el tamaño máximo de un segmento y cuántos segmentos puede tener un proceso?

<details><summary>Respuesta</summary>

Tamaño máximo de un segmento: **2^d palabras**. Número máximo de segmentos por proceso: **2^s**.
</details>

### T42 (diap. 85)
¿Cómo se divide el espacio en la MV **segmentada/paginada**?

<details><summary>Respuesta</summary>

El espacio virtual se divide en **segmentos de tamaño variable**, cada uno con un **número variable de páginas de igual tamaño**. El espacio físico se divide en **marcos** del mismo tamaño que una página.
DV = `segmento | página | desplazamiento`, DF = `marco | desplazamiento`.
</details>

### T43 (apuntes)
En la traducción de direcciones, ¿qué campo **nunca cambia** entre la DV y la DF?

<details><summary>Respuesta</summary>

El **desplazamiento**: siempre es igual en la dirección física y en la virtual, sea cual sea el método. Por eso basta comparar `DL mod tamaño de página` con `DF mod tamaño de página` para saber si una traducción es posible.
</details>

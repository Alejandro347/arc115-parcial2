# Teoría de la diapositiva

Preguntas sacadas directamente de `MEMORIAInterna.pdf` (el último PDF que subió el ingeniero), en temas que **no** cubren las preguntas de parciales anteriores. Los V/F de los parciales suelen copiar frases textuales de aquí. «diap. N» = página del PDF.

---

## 1. Jerarquía, capacidad y direccionamiento

### T1 (diap. 2)
Conforme se **desciende** en la jerarquía de memoria, ¿qué pasa con el costo por bit, la capacidad, el tiempo de acceso y la frecuencia de acceso de la CPU?

<!--opciones
*a) Costo/bit baja, capacidad sube, tiempo de acceso sube, frecuencia de acceso baja
b) Costo/bit sube, capacidad sube, tiempo de acceso baja, frecuencia sube
c) Costo/bit baja, capacidad baja, tiempo de acceso baja, frecuencia sube
d) Todo se mantiene igual en cada nivel
-->

<details><summary>Respuesta</summary>

- Costo por bit: **disminuye**
- Capacidad: **aumenta**
- Tiempo de acceso: **aumenta**
- Frecuencia de acceso de la CPU: **disminuye**

Relaciones clave: menor tiempo de acceso → mayor costo por bit; mayor capacidad → menor costo por bit, pero mayor tiempo de acceso.
</details>

### T2 (diap. 3)
¿Qué tres preguntas definen el diseño de una memoria?

<!--opciones
*a) ¿Cuánta?, ¿qué tan rápida?, ¿qué tan cara?
b) ¿Dónde?, ¿cuándo?, ¿quién la usa?
c) ¿Volátil?, ¿borrable?, ¿externa?
d) ¿Directa?, ¿asociativa?, ¿por conjuntos?
-->

<details><summary>Respuesta</summary>

**¿Cuánta?** (capacidad), **¿qué tan rápida?** (tiempo de acceso) y **¿qué tan cara?** (costo).
</details>

### T3 (diap. 3) ⚠️
Según la diapositiva, clasifique por **ubicación**: memoria interna, memoria de CPU y memoria externa.

<!--opciones
*a) Interna = memoria principal; CPU = registros; externa = periféricos vía controladores de E/S
b) Interna = registros; CPU = caché; externa = memoria principal
c) Interna = disco; CPU = MP; externa = caché
d) Interna = caché; CPU = ALU; externa = registros
-->

<details><summary>Respuesta</summary>

- **Memoria interna = memoria principal** (así lo dice la diapositiva)
- **Memoria de CPU:** los registros
- **Memoria externa:** periféricos (discos, cintas), a los que la CPU accede **vía controladores de E/S**

⚠️ Esto cambia la respuesta del V/F del 2025 «la memoria interna es igual a la memoria principal»: según la diapositiva es **V**.
</details>

### T4 (diap. 4–5)
Ordene la jerarquía **tradicional** y la **contemporánea**.

<!--opciones
*a) Contemporánea agrega la caché de disco (y disco óptico) entre MP y disco magnético
b) Contemporánea elimina la caché
c) Tradicional pone el disco antes que la MP
d) Son idénticas
-->

<details><summary>Respuesta</summary>

- **Tradicional:** registros → caché → MP → disco magnético → cinta magnética
- **Contemporánea:** registros → caché → MP → **caché de disco** → disco magnético → cinta magnética / disco óptico
</details>

### T5 (diap. 6–7)
Si una memoria tiene **n celdas**, ¿cuáles son sus direcciones? ¿Cuántas celdas se direccionan con **m bits**?

<!--opciones
*a) Direcciones de 0 a n−1; con m bits se direccionan 2^m celdas
b) Direcciones de 1 a n; con m bits se direccionan m² celdas
c) Direcciones de 0 a n; con m bits se direccionan 2m celdas
d) Direcciones de 1 a 2n; con m bits se direccionan m celdas
-->

<details><summary>Respuesta</summary>

Las direcciones van de **0 a n − 1** (empiezan en cero). Con *m* bits se direccionan **2^m** celdas. **Direccionamiento** = capacidad de acceder a una celda.
</details>

### T6 (diap. 8)
Una memoria de 2^12 celdas de 8 bits y otra de 2^12 celdas de 32 bits, ¿cuántos bits de dirección necesitan?

<!--opciones
*a) Ambas necesitan 12 bits
b) 12 y 14 bits respectivamente
c) 8 y 32 bits respectivamente
d) 20 y 44 bits respectivamente
-->

<details><summary>Respuesta</summary>

**Ambas necesitan 12 bits.** El número de celdas direccionables es **independiente** de los bits por celda.
</details>

### T7 (diap. 10)
Defina **celda**, **byte** y **palabra**.

<!--opciones
*a) Celda: mínima unidad direccionable; byte: 8 bits; palabra: unidad natural de organización
b) Celda: 8 bits; byte: unidad natural; palabra: mínima direccionable
c) Celda y palabra son siempre lo mismo que un byte
d) Celda: bloque de caché; byte: página; palabra: segmento
-->

<details><summary>Respuesta</summary>

- **Celda:** la unidad **más pequeña direccionable**
- **Byte:** celda de 8 bits
- **Palabra:** unidad natural de organización de la memoria; igual al número de bits que representan un número y al tamaño de instrucción (máquina de 16 bits → registros y palabras de 16 bits)
</details>

### T8 (diap. 11–12) ⚠️
¿Qué es **big endian** y **little endian**? Dé un ejemplo de cada uno.

<!--opciones
*a) Big endian empieza por el extremo mayor (Motorola); little endian por el menor (Intel)
b) Big endian empieza por el menor (Intel); little endian por el mayor (Motorola)
c) Ambos empiezan por el extremo mayor
d) Big endian es secuencial y little endian es paralelo
-->

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

<!--opciones
*a) Interna: bits que entran/salen del módulo a la vez; externa: bloques; tipos: secuencial y paralela
b) Interna: bloques; externa: un bit; tipos: directa y asociativa
c) Siempre igual a la palabra en ambas
d) Interna: páginas; externa: segmentos
-->

<details><summary>Respuesta</summary>

- **Interna:** el número de bits de datos que entran o salen del módulo a la vez (puede ser igual a la palabra).
- **Externa:** unidades mucho más grandes que la palabra (**bloques**).
- **Tipos:** **secuencial** y **paralela**.
</details>

### T10 (diap. 14–15)
Diferencia entre **transferencia paralela** y **secuencial**.

<!--opciones
*a) Paralela: bits simultáneos y dirección por otras líneas; secuencial: todo por una línea
b) Paralela: todo por una línea; secuencial: bits simultáneos
c) Ambas usan líneas separadas para datos y dirección
d) La secuencial no transfiere direcciones
-->

<details><summary>Respuesta</summary>

- **Paralela:** los bits de un dato se reciben **simultáneamente**; la **dirección entra por otras líneas**.
- **Secuencial:** todo (datos **y** dirección) entra por **una sola línea** y un circuito lógico lo selecciona.
</details>

### T11 (diap. 16–19)
Relacione cada método de acceso con su ejemplo: secuencial, directo, aleatorio, asociativo.

<!--opciones
*a) Secuencial: cintas; directo: discos; aleatorio: MP; asociativo: caché
b) Secuencial: discos; directo: cintas; aleatorio: caché; asociativo: MP
c) Secuencial: MP; directo: caché; aleatorio: cintas; asociativo: discos
d) Todos son ejemplos de acceso aleatorio
-->

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

<!--opciones
*a) Acceso: tiempo de una lectura/escritura; ciclo: acceso + tiempo extra antes del siguiente acceso
b) Acceso: acceso + tiempo extra; ciclo: solo la lectura
c) Son exactamente lo mismo
d) Ciclo es el período del reloj de la CPU
-->

<details><summary>Respuesta</summary>

- **Tiempo de acceso:** (en acceso aleatorio) el tiempo para una lectura o escritura: desde que se presenta la dirección hasta que el dato está almacenado o disponible.
- **Tiempo de ciclo:** tiempo de acceso **+ el tiempo adicional** antes de poder empezar un segundo acceso (se aplica a memoria aleatoria).
</details>

---

## 3. Memorias de semiconductor

### T13 (diap. 21)
¿Cómo se llamaba antes la memoria principal y por qué? ¿Qué tipos de semiconductor hay hoy?

<!--opciones
*a) Core (núcleos ferromagnéticos); hoy RAM, ROM, PROM, EPROM, EEPROM y Flash
b) Disco; hoy SSD y HDD
c) Caché; hoy L1, L2 y L3
d) Tambor; hoy cintas magnéticas
-->

<details><summary>Respuesta</summary>

Se llamaba **core**, porque era un arreglo de núcleos ferromagnéticos (*cores*). Hoy hay RAM, ROM, PROM, EPROM, EEPROM y Flash.
</details>

### T14 (diap. 22) ⚠️
Características de la **RAM**; diferencia entre estática y dinámica.

<!--opciones
*a) RAM volátil; DRAM en capacitores con refresco; SRAM en flip-flops
b) RAM no volátil; DRAM en flip-flops; SRAM en capacitores
c) RAM de solo lectura grabada en fábrica
d) RAM volátil; ambas tecnologías sin refresco
-->

<details><summary>Respuesta</summary>

Lectura y escritura eléctrica; **volátil**.
- **Dinámica (DRAM):** datos en **capacitores** que se descargan → necesita **refresco periódico**.
- **Estática (SRAM):** datos en **flip-flops**; se mantienen mientras haya energía.

⚠️ La diapositiva tiene las definiciones **intercambiadas** (dice que la estática usa capacitores). Lo correcto es lo de arriba. Si sale literal en un V/F, pregunta al docente.
</details>

### T15 (diap. 23)
¿Qué es la **ROM** y para qué se usa?

<!--opciones
*a) Solo lectura, no volátil, grabada en fabricación; arranque y subrutinas
b) Lectura/escritura volátil para programas en ejecución
c) Borrable con luz UV
d) Se escribe una sola vez por el usuario
-->

<details><summary>Respuesta</summary>

Solo lectura y **no volátil**; los datos se graban en la **fabricación**. Usos: librerías de subrutinas muy usadas y **programas de arranque**.
</details>

### T16 (diap. 24)
¿Qué es la **PROM**?

<!--opciones
*a) ROM programable una sola vez, eléctricamente, con un proceso especial
b) ROM borrable con luz UV
c) RAM volátil de alta velocidad
d) ROM borrable por byte eléctricamente
-->

<details><summary>Respuesta</summary>

ROM programable: no volátil, se puede escribir **una sola vez**, de forma eléctrica y con un proceso especial. Las PROM dan flexibilidad; las ROM convienen para grandes volúmenes.
</details>

### T17 (diap. 25)
¿Qué es la **EPROM**?

<!--opciones
*a) Se borra con luz UV antes de reescribir; permite actualizaciones múltiples
b) Se escribe una sola vez
c) Se borra eléctricamente por bloques en segundos
d) Es volátil
-->

<details><summary>Respuesta</summary>

ROM programable y borrable: hay que **borrarla antes de escribir**; el borrado es con **luz ultravioleta**. Es más cara que la PROM, pero permite **actualizarse muchas veces**.
</details>

### T18 (diap. 26)
¿Qué es la memoria **Flash** y por qué se llama así?

<!--opciones
*a) Por su velocidad de reprogramación; borrado eléctrico por bloques
b) Por usar flash de luz UV; borrado por byte
c) Por ser volátil y rápida como la SRAM
d) Porque se graba en fábrica
-->

<details><summary>Respuesta</summary>

El nombre viene de la **velocidad con que se reprograma**. Apareció a mediados de los 80; en costo y funcionalidad está entre EPROM y EEPROM. Borrado **eléctrico** en segundos, **por bloques** (no por byte).
</details>

### T19 (diap. 27)
Complete la tabla: categoría, borrado, escritura y volatilidad de RAM, ROM, PROM, EPROM, EEPROM y Flash.

<!--opciones
*a) RAM volátil (borrado por byte); las demás no volátiles; EEPROM borra por byte y Flash por bloque
b) Todas son volátiles
c) ROM y PROM se borran con luz UV
d) Flash borra por byte y EEPROM por bloque
-->

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

<!--opciones
*a) PC: siguiente instrucción; IR: instrucción actual; MAR: dirección; MBR: dato leído/escrito
b) PC: dato; IR: dirección; MAR: instrucción; MBR: siguiente instrucción
c) PC: líneas ejecutadas; IR: interrupciones; MAR: caché; MBR: bus
d) Todos guardan direcciones de memoria
-->

<details><summary>Respuesta</summary>

- **PC:** dirección de la **siguiente instrucción**
- **IR:** la instrucción que se va a ejecutar
- **MAR:** **dirección** de la palabra que se va a leer o escribir
- **MBR:** el **contenido** que se va a escribir o el que se leyó
</details>

### T21 (diap. 30)
Registros temporales y **banderas** más comunes.

<!--opciones
*a) AC y MQ; banderas N (negativo), Z (cero), V (overflow), C (carry)
b) PC e IR; banderas A, B, C, D
c) MAR y MBR; banderas de caché
d) Solo el acumulador, sin banderas
-->

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

<!--opciones
*a) Servir referencias a velocidad cercana a la del procesador; optimiza aciertos, tiempo efectivo, fallos y escrituras
b) Aumentar la capacidad de almacenamiento permanente
c) Reemplazar a la memoria principal
d) Traducir direcciones virtuales
-->

<details><summary>Respuesta</summary>

Objetivo: que las referencias a memoria se sirvan a una velocidad **muy cercana a la del procesador**.
Parámetros: probabilidad de acierto, tiempo de acceso efectivo, retardos por fallos y actualización de la MP en las escrituras.
Lógicamente se divide en **directorio** (etiquetas) y **bloques de datos**.
</details>

### T23 (diap. 33)
Enuncie el **principio de localidad** y sus dos tipos con ejemplos.

<!--opciones
*a) Las referencias se agrupan en tiempo (bucles, subrutinas) y espacio (tablas, matrices)
b) Temporal: tablas; espacial: bucles
c) Las referencias son totalmente aleatorias
d) Solo aplica a la memoria virtual
-->

<details><summary>Respuesta</summary>

Las referencias del procesador (a instrucciones y datos) tienden a **agruparse en el tiempo y en el espacio**.
- **Temporal:** bucles, subrutinas
- **Espacial:** tablas, matrices
</details>

### T24 (diap. 35, 37)
¿Qué **4 políticas** hay que definir en un sistema con caché?

<!--opciones
*a) Ubicación, extracción, reemplazo y actualización
b) Lectura, escritura, borrado y copia
c) Directa, asociativa, por conjuntos y mixta
d) FIFO, LRU, LFU y aleatoria
-->

<details><summary>Respuesta</summary>

**Ubicación**, **extracción**, **reemplazo** y **actualización** (esta última resuelve la coherencia entre niveles).
</details>

### T25 (diap. 36)
Describa paso a paso la **organización/funcionamiento** de la caché ante una lectura.

<!--opciones
*a) La CPU lanza la dirección; si está (y bit de validez) acierto y pasa a la CPU; si no, va a MP
b) La CPU siempre lee primero de la MP
c) La caché pide permiso al SO en cada acceso
d) El fallo cancela la instrucción
-->

<details><summary>Respuesta</summary>

1. La CPU lanza la dirección al bus.
2. El controlador de caché la pasa a la caché.
3. Si el dato está → **acierto**, comprobando también el **bit de validez**.
4. El dato pasa a la CPU.
5. Si hay **fallo**, la dirección se lanza a la MP.

Todo el mecanismo es **transparente** para la CPU.
</details>

### T26 (diap. 48)
¿Qué es la política de **extracción** y cuáles son sus tipos? Defina la extracción **por demanda**.

<!--opciones
*a) Cuándo y qué se envía de MP a MCa; por demanda = traer el bloque cuando hay un fallo
b) Qué bloque se saca; por demanda = sacar el más antiguo
c) Dónde se ubica un bloque; por demanda = ubicación directa
d) Cuándo se escribe en MP; por demanda = escritura inmediata
-->

<details><summary>Respuesta</summary>

Determina **cuándo y qué** información se envía de la MP a la MCa. Las más usadas son **por demanda**, **con anticipación** y **selectiva**.
**Por demanda:** se trae el bloque a la MCa en el momento en que se necesita, es decir, **cuando se produce un fallo**.
</details>

### T26b (diap. 49)
Explique la **extracción con anticipación** (sus dos variantes y sus inconvenientes) y la **extracción selectiva**.

<!--opciones
*a) Anticipada: traer el bloque i+1 (siempre o solo en fallo); selectiva: etiquetar datos que nunca van a MCa
b) Anticipada: traer el bloque i−1; selectiva: elegir el bloque al azar
c) Anticipada: escribir antes en MP; selectiva: escribir solo en MCa
d) Ambas eliminan el tráfico entre MP y MCa
-->

<details><summary>Respuesta</summary>

**Con anticipación:**
- **Anticiparse siempre** (*always prefetch*): traer a la MCa el bloque **i+1** de la MP **siempre** que se haga referencia al bloque *i*.
- **Anticiparse cuando se produce un fallo** (*prefetch on a miss*): traer el bloque **i+1** **solo si hay fallo** al referenciar el bloque *i*.
- **Inconvenientes:** aumenta inútilmente el tráfico entre MP y MCa si no se comprueba antes si el bloque ya estaba en la MCa; pueden producirse **inconsistencias**.

**Selectiva:** se **etiqueta** cierto tipo de información para que **nunca** se envíe a la MCa. Ej.: un sistema multiprocesador con memoria compartida.
</details>

### T26c (diap. 34)
¿Qué niveles de caché y elementos de la jerarquía aparecen en el esquema de la diap. 34 (aprovechar los grados de localidad)?

<!--opciones
*a) L1/L2 en el chip, TLB, cachés L2/L3 y L3/L4, MP, memoria virtual y disco
b) Solo registros y memoria principal
c) Solo discos y cintas
d) Únicamente la caché L1
-->

<details><summary>Respuesta</summary>

Dentro de la CPU: unidades I/E, banco de registros, **caché L1 en el chip**, caché L2 en el chip, **TLB** y cachés de propósito especial. Fuera: cachés L2/L3 y L3/L4, red de interconexión, memoria principal, memoria virtual, archivos de disco, CD-ROM/cinta y otros computadores. La idea es que cada nivel aproveche un grado distinto de cumplimiento del principio de localidad.
</details>

### T27 (diap. 50)
¿Qué política de reemplazo es la más sencilla y barata? ¿Qué pasa con LRU y FIFO al aumentar los bloques candidatos?

<!--opciones
*a) La aleatoria; en LRU y FIFO el costo crece con los bloques candidatos
b) LRU; FIFO y aleatoria son las más caras
c) FIFO; la complejidad no depende del número de bloques
d) LFU; las demás no se usan
-->

<details><summary>Respuesta</summary>

La **aleatoria** es la más sencilla y barata. En LRU y FIFO la **complejidad y el costo aumentan** con el número de bloques entre los que hay que elegir. (El reemplazo tiene sentido con ubicación asociativa o por conjuntos; en la directa es trivial.)
</details>

### T28 (diap. 54)
Desde el punto de vista de los fallos transitorios de hardware, ¿qué política de escritura es preferible?

<!--opciones
*a) Escritura inmediata (write-through)
b) Escritura aplazada (write-back)
c) Escritura sin caché
d) Extracción anticipada
-->

<details><summary>Respuesta</summary>

La **escritura inmediata** (*write-through*), porque la MP siempre tiene una copia actualizada.
</details>

---

## 6. Gestión de memoria y memoria virtual

### T29 (diap. 61)
Diferencia entre **monoprogramación** y **multiprogramación** en la gestión de memoria.

<!--opciones
*a) Mono: SO + un programa; multi: la parte de usuario se subdivide entre procesos
b) Mono: varios procesos; multi: uno solo
c) Ambas dividen la memoria en páginas
d) Mono no tiene sistema operativo
-->

<details><summary>Respuesta</summary>

- **Mono:** la memoria se divide en **dos partes**: SO (monitor residente) + el programa en ejecución.
- **Multi:** la parte de usuario se **subdivide y se comparte** entre los procesos activos.
</details>

### T30 (diap. 62–63)
¿Cómo funcionan las **particiones fijas**? ¿Cuál es su problema?

<!--opciones
*a) El proceso va a la partición más pequeña que lo contenga; se desperdicia memoria
b) Se asigna exactamente lo que necesita; no hay desperdicio
c) Las particiones cambian de tamaño en ejecución
d) Se resuelve con compactación
-->

<details><summary>Respuesta</summary>

Pueden ser de igual o de distinto tamaño; el proceso va a la **partición más pequeña que lo contenga**. Se **desperdicia memoria** (fragmentación interna) → por eso surgen las particiones variables.
</details>

### T31 (diap. 64–65)
¿Cómo funcionan las **particiones variables**? ¿Qué problema generan y cuáles son sus 2 soluciones?

<!--opciones
*a) Asignan lo exacto; generan huecos (fragmentación); soluciones: fusión y compactación
b) Asignan tamaños fijos; sin fragmentación
c) Generan hiperpaginación; solución: más procesos
d) Generan anomalía de Belady; solución: LRU
-->

<details><summary>Respuesta</summary>

Se asigna **exactamente** la memoria que el proceso necesita. Al entrar y salir procesos quedan **muchos huecos pequeños** (fragmentación externa).
Soluciones:
- **Fusión:** unir huecos contiguos.
- **Compactación:** el SO desplaza los procesos para juntar toda la memoria libre.
</details>

### T32 (diap. 67)
¿Qué es el **reposicionamiento**? Diferencia entre dirección lógica y física.

<!--opciones
*a) Cargar el proceso en otra posición; lógica = relativa al inicio, física = posición real
b) Mover el disco; lógica = física
c) Cambiar de caché; lógica = etiqueta
d) Reordenar instrucciones; física = relativa al inicio
-->

<details><summary>Respuesta</summary>

Un proceso no siempre se carga en la misma posición, así que hay que convertir sus direcciones.
- **Lógica:** posición **relativa al comienzo** del programa.
- **Física:** posición **actual** en la MP.

La conversión es automática con la **dirección base**.
</details>

### T33 (diap. 68)
Características de la **paginación**.

<!--opciones
*a) Marcos y páginas iguales y pequeños, no contiguos, una tabla de páginas por proceso
b) Segmentos de tamaño variable y contiguos
c) Una única tabla para todo el sistema y marcos contiguos
d) Páginas de tamaño distinto al de los marcos
-->

<details><summary>Respuesta</summary>

- La memoria se divide en **marcos** iguales y pequeños; los procesos, en **páginas** del mismo tamaño.
- Se asignan los marcos necesarios, que **no tienen que ser contiguos**.
- El SO mantiene la lista de marcos libres.
- Hay una **tabla de páginas por proceso**.
</details>

### T34 (diap. 70)
¿Qué es la **paginación por demanda** y qué pasa en un **fallo de página**?

<!--opciones
*a) Traer cada página solo cuando se necesita; en un fallo el SO la carga (y reemplaza si no hay espacio)
b) Cargar todas las páginas al inicio
c) El fallo de página termina el proceso
d) Las páginas se traen en orden alfabético
-->

<details><summary>Respuesta</summary>

No todas las páginas tienen que estar en memoria: cada una se trae **solo cuando se necesita**.
Fallo de página: la página no está → el SO la carga; si no hay hueco, saca una página elegida según su **historia reciente** (algoritmo de reemplazo).
</details>

### T35 (diap. 71)
**Hiperpaginación:** causa, síntomas y 3 soluciones.

<!--opciones
*a) Demasiados procesos en poca memoria; se reduce con mejor reemplazo, menos procesos o más memoria
b) Pocos procesos; se soluciona agregando más procesos
c) Exceso de caché; se soluciona quitando caché
d) Error de hardware del disco
-->

<details><summary>Respuesta</summary>

- **Causa:** una memoria pequeña con demasiados procesos.
- **Síntomas:** el SO pasa la mayor parte del tiempo intercambiando páginas, casi no hay trabajo útil y la luz del disco está siempre encendida.
- **Soluciones:** un buen algoritmo de reemplazo, **reducir los procesos** en curso y **aumentar la memoria**.
</details>

### T36 (diap. 72)
**Ventajas** de la memoria virtual.

<!--opciones
*a) Ejecutar procesos más grandes que la memoria; el usuario percibe una memoria mayor
b) Hace la memoria principal más rápida
c) Elimina la necesidad de disco
d) Evita los fallos de caché
-->

<details><summary>Respuesta</summary>

- No hace falta tener en memoria todos los procesos.
- Se intercambian solo las páginas necesarias.
- Se pueden ejecutar **procesos más grandes que toda la memoria**.
- La MP pasa a llamarse **memoria real**; el usuario percibe una memoria mucho mayor (la **virtual**).
</details>

### T37 (diap. 73)
Además de la tabla de páginas directa, ¿qué otra estructura de tabla de páginas aparece en la diapositiva?

<!--opciones
*a) Tabla de páginas invertida con función hash (una entrada por marco)
b) Tabla de segmentos con base y longitud
c) Directorio de caché con etiquetas
d) Lista enlazada de huecos libres
-->

<details><summary>Respuesta</summary>

La **tabla de páginas invertida**: el número de página pasa por una **función de dispersión (hash)** que lleva a una tabla con **una entrada por marco**; las colisiones se resuelven con una cadena.
</details>

### T38 (diap. 74)
Diferencia de **visibilidad** entre paginación y segmentación.

<!--opciones
*a) La paginación es invisible para el programador; la segmentación es visible
b) Ambas son invisibles
c) La paginación es visible; la segmentación invisible
d) Ambas las controla el programador
-->

<details><summary>Respuesta</summary>

La **paginación es invisible** para el programador; la **segmentación es visible**: el programador asigna segmentos distintos a programas y datos.
</details>

### T39 (diap. 75)
**Ventajas** de la segmentación.

<!--opciones
*a) Estructuras crecientes, compilar por separado, compartir segmentos y protección
b) Elimina toda fragmentación
c) Usa marcos de tamaño fijo
d) Hace invisible la memoria al programador
-->

<details><summary>Respuesta</summary>

- Simplifica las **estructuras de datos que crecen**.
- Permite **modificar y recompilar programas por separado** sin volver a enlazar y cargar todo.
- Permite **compartir segmentos** entre procesos.
- Facilita la **protección**.
- Se puede combinar con la paginación.
</details>

### T40 (diap. 77–78)
Explique los 3 mecanismos de traducción de la MV paginada: **directa, asociativa y mixta**.

<!--opciones
*a) Directa: entrada por página; asociativa: entrada por marco; mixta: TLB + tabla directa
b) Directa: entrada por marco; asociativa: entrada por página; mixta: sin tabla
c) Todas usan solo la TLB
d) Directa usa hash; asociativa usa base y límite
-->

<details><summary>Respuesta</summary>

- **Directa:** una **TP por proceso**, con **una entrada por cada página** (¿está en MP?, ¿en qué marco?). Cada proceso tiene un **registro base** que apunta a su TP.
- **Asociativa:** reduce el tamaño de la TP; solo tiene entradas para las páginas que están en MP (**una entrada por marco**).
- **Mixta:** una tabla asociativa pequeña con las páginas más activas, la **TLB** (*Translation Lookaside Buffer*), más la tabla directa.
</details>

### T41 (diap. 82)
En MV segmentada, si la DV tiene *s* bits de segmento y *d* bits de desplazamiento, ¿cuál es el tamaño máximo de un segmento y cuántos segmentos puede tener un proceso?

<!--opciones
*a) Máx. 2^d palabras por segmento y 2^s segmentos por proceso
b) Máx. 2^s palabras por segmento y 2^d segmentos
c) Máx. d palabras y s segmentos
d) Siempre 1024 palabras por segmento
-->

<details><summary>Respuesta</summary>

Tamaño máximo de un segmento: **2^d palabras**. Número máximo de segmentos por proceso: **2^s**.
</details>

### T42 (diap. 85)
¿Cómo se divide el espacio en la MV **segmentada/paginada**?

<!--opciones
*a) Segmentos variables con páginas iguales; DV = segmento | página | desplazamiento
b) Páginas variables dentro de segmentos fijos
c) Solo segmentos, sin páginas
d) DV = marco | etiqueta | palabra
-->

<details><summary>Respuesta</summary>

El espacio virtual se divide en **segmentos de tamaño variable**, cada uno con un **número variable de páginas de igual tamaño**. El espacio físico se divide en **marcos** del mismo tamaño que una página.
DV = `segmento | página | desplazamiento`, DF = `marco | desplazamiento`.
</details>

### T43 (apuntes)
En la traducción de direcciones, ¿qué campo **nunca cambia** entre la DV y la DF?

<!--opciones
*a) El desplazamiento
b) El número de página
c) El número de segmento
d) La etiqueta
-->

<details><summary>Respuesta</summary>

El **desplazamiento**: siempre es igual en la dirección física y en la virtual, sea cual sea el método. Por eso basta comparar `DL mod tamaño de página` con `DF mod tamaño de página` para saber si una traducción es posible.
</details>

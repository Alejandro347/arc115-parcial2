# Glosario

Términos y siglas que aparecen en la diapositiva *MEMORIA*, en los parciales y en este material, ordenados alfabéticamente. Las siglas llevan entre paréntesis su significado y, cuando viene del inglés, el término original. «diap. N» = página de `MEMORIAInterna.pdf`.

## A

- **AC (acumulador)**: registro temporal donde la ALU deja los resultados y toma operandos (diap. 30).
- **Acceso aleatorio**: cada unidad direccionable tiene su propio mecanismo de direccionamiento, así que cualquier posición se accede directamente y en tiempo constante. Ej.: memoria principal (diap. 18).
- **Acceso asociativo**: tipo de acceso aleatorio en el que una palabra se recupera comparando parte de su **contenido**, no su dirección. Ej.: caché, TLB (diap. 19).
- **Acceso directo**: cada bloque tiene una dirección única según su ubicación física. Se salta a la vecindad y luego se busca secuencialmente. Ej.: discos (diap. 17).
- **Acceso secuencial**: los datos se recorren en un orden lineal fijo, moviendo el mecanismo de lectura/escritura. Ej.: cintas (diap. 16).
- **Acierto** (*hit*): el dato pedido está en el nivel de memoria consultado (por ejemplo, en la caché).
- **Actualización (política de)**: decide cuándo se actualiza la MP tras una escritura en la MCa: escritura inmediata o aplazada (diap. 53).
- **Algoritmo de Booth**: método de multiplicación en complemento a dos. Según el par Q₀Q₋₁ (10 → A−M, 01 → A+M) se suma o resta y luego hay un desplazamiento aritmético a la derecha.
- **ALU** (*Arithmetic Logic Unit*, unidad aritmético-lógica): parte de la CPU que hace las operaciones aritméticas y lógicas. Incluye el desplazador, el complementador y los indicadores de estado.
- **Anomalía de Belady**: con FIFO, aumentar el número de marcos puede **aumentar** los fallos (1 2 3 4 1 2 5 1 2 3 4 5: 9 fallos con 3 marcos, 10 con 4).
- **Asignación de escritura** (*write allocate*, escritura con ubicación): ante un fallo de escritura, el bloque se trae a la MCa y luego se escribe ahí. Suele ir con la escritura aplazada (diap. 55).
- **Asociativa (correspondencia)**: cualquier bloque de la MP puede ir a cualquier línea de la MCa. Formato `Etiqueta | Palabra`.
- **Asociativa por conjuntos (correspondencia)**: la MCa se divide en C conjuntos de k líneas (vías). El bloque va a un conjunto fijo (bloque mod C) y, dentro de él, a cualquier línea. Formato `Etiqueta | Conjunto | Palabra`.

## B

- **Banderas** (*flags*): indicadores de un bit de la CPU: **N** (resultado negativo), **Z** (cero), **V** (*overflow*, desbordamiento) y **C** (*carry*, acarreo) (diap. 30).
- **Big endian**: la numeración de bits/bytes de la palabra empieza por el extremo **mayor**. Ej.: Motorola (diap. 11).
- **Bit de modificado** (*dirty bit*): indica que un bloque o página cambió y debe escribirse en el nivel inferior al ser reemplazado.
- **Bit de presencia**: en la tabla de páginas, indica si la página está en la MP. Si vale 0 → fallo de página.
- **Bit de validez**: indica que la línea de caché o la entrada de la tabla contiene datos válidos.
- **Bits de permisos**: en la tabla de páginas, indican si se permite leer, escribir o ejecutar.
- **Bloque**: unidad que se transfiere entre la MP y la MCa (varias palabras). En la MCa ocupa una línea.
- **Buffer de escritura**: memoria intermedia donde se dejan las escrituras para que el procesador no espere a la MP en la escritura inmediata.
- **Bus de datos**: líneas por las que viajan los datos. Su ancho dice cuántos bits se transfieren a la vez.
- **Bus de direcciones**: líneas que llevan la dirección. Con *n* líneas se direccionan 2ⁿ posiciones; es lo que limita el tamaño de memoria direccionable.
- **Byte**: celda de 8 bits (diap. 10).

## C

- **C2 (complemento a dos)**: representación de enteros con signo en la que negar es invertir los bits y sumar 1. Permite sumar y restar con el mismo sumador.
- **Caché de disco**: memoria intermedia entre la MP y el disco magnético en la jerarquía contemporánea (diap. 5).
- **Capacidad**: cantidad de información que guarda una memoria, en bytes o palabras.
- **Celda**: unidad **más pequeña direccionable** de la memoria. Cada una tiene un número (su dirección) que empieza en 0 (diap. 6, 10).
- **Ciclo de captación** (*fetch*): `MAR ← PC`, `MBR ← M[MAR]`, `IR ← MBR`, `PC ← PC + 1`.
- **Ciclo de ejecución**: la UC decodifica la instrucción del IR y la ejecuta.
- **Ciclo de instrucción**: captación + ejecución (más los ciclos indirecto y de interrupción cuando hacen falta).
- **Ciclo de interrupción**: si hay una interrupción pendiente, se guarda el PC y se salta a la rutina que la atiende.
- **Ciclo de memoria** (tiempo de ciclo): tiempo de acceso + el tiempo adicional que se requiere antes de poder iniciar un segundo acceso (diap. 20).
- **Compactación**: el SO desplaza los procesos en memoria para juntar todos los huecos libres en uno. Resuelve la fragmentación externa (diap. 65).
- **Conjunto**: grupo de líneas de la MCa en la correspondencia asociativa por conjuntos. Nº de conjuntos = líneas / vías.
- **Correspondencia (función de)**: ver *Ubicación (política de)*.
- **Correspondencia directa**: cada bloque de la MP solo puede ir a una línea (línea = bloque mod nº de líneas). Formato `Etiqueta | Línea | Palabra`. No admite elegir víctima, así que no aplica LRU.
- **Costo medio**: Σ(costo × tamaño) / Σ tamaño de los niveles de la jerarquía (diap. 57).
- **CPU** (*Central Processing Unit*, unidad central de procesamiento): formada por la unidad de control, la unidad de tratamiento (ALU) y los registros.

## D

- **Desplazamiento** (*offset*): parte de la dirección que indica la posición dentro de una página o segmento. **No cambia** al traducir de la dirección virtual a la física.
- **DF (dirección física)**: dirección real en la memoria principal. En paginación = marco ‖ desplazamiento.
- **Dirección**: número que identifica una celda. Con *m* bits hay 2^m direcciones (de 0 a 2^m − 1).
- **Dirección lógica**: posición relativa al comienzo del programa (diap. 67). En memoria virtual equivale a la DV.
- **Direccionamiento**: capacidad de acceder a una celda de memoria (diap. 7).
- **Directorio (de la caché)**: parte de la MCa que guarda las etiquetas y los bits de control de cada línea (diap. 31).
- **Dirty bit**: ver *Bit de modificado*.
- **DL (dirección lógica)**: ver *Dirección lógica*.
- **DMA** (*Direct Memory Access*, acceso directo a memoria): el controlador de E/S transfiere datos con la memoria sin intervención de la CPU, que solo recibe una interrupción al terminar.
- **DRAM** (*Dynamic RAM*, RAM dinámica): guarda los bits en capacitores que se descargan y necesitan **refresco** periódico. Es la tecnología de la MP. ⚠️ La diap. 22 tiene intercambiadas las definiciones de dinámica y estática.
- **DV (dirección virtual)**: dirección que genera el programa. En paginación = página ‖ desplazamiento; en segmentación = segmento ‖ desplazamiento.

## E

- **E/S (entrada/salida)**: dispositivos y módulos que comunican al computador con el exterior. La CPU accede a la memoria externa a través de sus controladores.
- **EEPROM** (*Electrically Erasable PROM*): ROM borrable eléctricamente **por byte**, de lectura principalmente.
- **Entrelazado (memoria entrelazada)**: la MP se divide en módulos (por ejemplo, 16) y los bits de menor peso eligen el módulo, de modo que palabras consecutivas se leen en paralelo.
- **EPROM** (*Erasable PROM*): ROM que se borra con **luz ultravioleta** antes de reescribirse. Permite actualizarla varias veces (diap. 25).
- **Escritura aplazada** (*write back*, post-escritura): solo se escribe en la MCa y se marca el *dirty bit*. La MP se actualiza al reemplazar el bloque. Genera menos tráfico, pero es más compleja (diap. 54).
- **Escritura inmediata** (*write through*): se escribe a la vez en la MCa y en la MP. Es sencilla y consistente, pero genera mucho tráfico (diap. 53).
- **Etiqueta** (*tag*): bits de mayor peso de la dirección que se guardan con cada línea de la MCa para saber qué bloque de la MP contiene.
- **Extracción (política de)**: decide **cuándo y qué** información se envía de la MP a la MCa (diap. 48).
- **Extracción con anticipación** (*prefetch*): traer el bloque i+1. Puede ser siempre (*always prefetch*) o solo cuando hay un fallo (*prefetch on a miss*) (diap. 49).
- **Extracción por demanda**: traer el bloque a la MCa cuando se necesita, es decir, cuando hay un fallo (diap. 48).
- **Extracción selectiva**: se etiqueta cierta información para que **nunca** vaya a la MCa. Ej.: un multiprocesador con memoria compartida (diap. 49).

## F

- **Fallo** (*miss*): el dato pedido no está en el nivel consultado y hay que traerlo del nivel inferior.
- **Fallo de página**: la página referenciada no está en la MP. El SO la carga desde el disco y, si no hay marco libre, reemplaza una (diap. 70).
- **Fallos 3C**: clasificación de los fallos de caché en **forzosos** (primer acceso a un bloque), **de capacidad** (la caché es pequeña) y **de conflicto** (varios bloques compiten por la misma línea o conjunto).
- **FIFO** (*First In, First Out*): política de reemplazo que saca el bloque o página que lleva **más tiempo en memoria**.
- **Flash**: memoria no volátil de borrado eléctrico **por bloques** y muy rápida de reprogramar. Está entre EPROM y EEPROM en costo y funcionalidad (diap. 26).
- **Fragmentación externa**: huecos libres pequeños entre particiones que no sirven a ningún proceso. Aparece con las particiones variables.
- **Fragmentación interna**: espacio desperdiciado dentro de una partición o página asignada que el proceso no usa. Aparece con las particiones fijas y con la última página.
- **Fusión**: unir huecos libres contiguos en uno más grande (diap. 65).

## G

- **Grado de multiprogramación**: número de procesos cargados en memoria al mismo tiempo.

## H

- **h (tasa de aciertos)**: fracción de accesos que encuentran el dato en un nivel. 1 − h es la tasa de fallos.
- **Hiperpaginación** (*thrashing*): el SO pasa la mayor parte del tiempo intercambiando páginas porque hay demasiados procesos para la memoria. Se reduce con un mejor reemplazo, menos procesos o más memoria (diap. 71).

## I

- **Identificación (estrategia de)**: forma de **encontrar un dato en la MCa**: comparar la etiqueta y revisar el bit de validez.
- **IEEE 754**: estándar de punto flotante. En precisión simple: signo (1 bit) | exponente (8 bits, sesgo 127) | mantisa (23 bits).
- **Intercambio** (*swapping*): mover procesos completos entre la MP y el disco. Lo decide el planificador a medio plazo.
- **Interrupción**: señal que suspende la ejecución normal para atender un evento de programa (desbordamiento, división por cero), temporizador, E/S o fallo de hardware.
- **IR** (*Instruction Register*, registro de instrucción): guarda la instrucción que se va a ejecutar (diap. 29).

## J

- **Jerarquía de memoria**: organización en niveles (registros, caché, MP, disco, cinta). Al descender baja el costo por bit, sube la capacidad, sube el tiempo de acceso y baja la frecuencia de acceso de la CPU (diap. 2–5).

## L

- **LFU** (*Least Frequently Used*; la diapositiva lo escribe «Last Frecuently used»): política de reemplazo que saca el bloque referenciado **menos veces** (diap. 52).
- **Línea**: posición de la MCa que guarda un bloque, junto con su etiqueta y sus bits de control.
- **Little endian**: la numeración de bits/bytes empieza por el extremo **menor**. Ej.: Intel (diap. 11).
- **Localidad (principio de)**: las referencias a memoria tienden a agruparse en el tiempo y en el espacio. Es lo que hace útil a la caché (diap. 33).
- **Localidad espacial**: tendencia a usar direcciones cercanas a las usadas. Ej.: tablas, matrices, vectores.
- **Localidad temporal**: tendencia a volver a usar pronto lo que se usó recientemente. Ej.: bucles, subrutinas.
- **Longitud (de segmento)**: tamaño del segmento. Un desplazamiento ≥ longitud produce un fallo o violación de segmento.
- **LRU** (*Least Recently Used*): política de reemplazo que saca el bloque que lleva **más tiempo sin usarse**.

## M

- **MAR** (*Memory Address Register*, registro de dirección de memoria): guarda la dirección de la palabra que se va a leer o escribir (diap. 29).
- **Marco (de página)** (*frame*): bloque de la memoria física del mismo tamaño que una página. Nº de marcos = MF / tamaño de página.
- **MBR** (*Memory Buffer Register*, registro de datos de memoria): guarda el dato que se va a escribir o el que se acaba de leer (diap. 29).
- **MC / MCa (memoria caché)**: memoria pequeña y rápida (SRAM) entre la CPU y la MP. Guarda copias de los bloques usados recientemente para que los accesos sean casi tan rápidos como el procesador (diap. 31).
- **Memoria externa**: periféricos de almacenamiento (discos, cintas), accesibles para la CPU vía controladores de E/S (diap. 3).
- **Memoria interna**: según la diapositiva, la memoria principal (diap. 3). En otros textos incluye también registros y caché.
- **Método de acceso**: forma de llegar a los datos: secuencial, directo, aleatorio o asociativo (diap. 16–19).
- **MF (memoria física)**: ver *MP*.
- **MMU** (*Memory Management Unit*, unidad de gestión de memoria): hardware que traduce DV → DF y genera el fallo de página.
- **Monoprogramación**: la memoria se divide en dos partes: el SO (monitor residente) y un solo programa en ejecución (diap. 61).
- **MP (memoria principal)**: memoria de acceso aleatorio (DRAM) donde residen los programas y datos en ejecución. También se llama memoria real o física.
- **MQ** (*Multiplier Quotient*, multiplicador-cociente): registro temporal usado en la multiplicación y la división (diap. 30).
- **Multiprogramación**: la parte de usuario de la memoria se subdivide y se comparte entre varios procesos activos (diap. 61).
- **MV (memoria virtual)**: esquema que permite ejecutar procesos parcialmente cargados y más grandes que la MP, usando el disco como extensión y traduciendo las DV a DF.

## O

- **Operando**: dato sobre el que actúa una instrucción. Puede estar en la MP, en un registro de la CPU, en un dispositivo de E/S o en la propia instrucción.
- **Óptima (política)**: reemplaza el bloque que **más tardará en volver a usarse**. No es implementable, pero sirve de cota inferior de fallos.

## P

- **Página**: bloque de tamaño fijo en que se divide el espacio virtual. Nº de páginas = espacio virtual / tamaño de página.
- **Paginación**: la memoria se divide en marcos y los procesos en páginas del mismo tamaño, no necesariamente contiguas, con una tabla de páginas por proceso. Es invisible para el programador (diap. 68).
- **Paginación por demanda**: cada página se trae a memoria solo cuando se necesita (diap. 70).
- **Palabra**: unidad natural de organización de la memoria, igual al tamaño de un número y de una instrucción. Una máquina de 32 bits tiene palabras de 32 bits (diap. 10).
- **Particiones fijas**: la memoria se divide en particiones de tamaño fijo y cada proceso va a la más pequeña que lo contenga. Desperdicia memoria (diap. 62).
- **Particiones variables (dinámicas)**: se asigna exactamente la memoria que pide el proceso. Generan fragmentación externa (diap. 64).
- **PC** (*Program Counter*, contador de programa): guarda la dirección de la **siguiente instrucción** que se va a ejecutar (diap. 29).
- **Planificador**: parte del SO que decide qué proceso usa la CPU (corto plazo), qué procesos se intercambian (medio plazo) y cuántos se admiten (largo plazo).
- **PROM** (*Programmable ROM*): ROM no volátil que se puede escribir **una sola vez**, eléctricamente (diap. 24).

## R

- **RAM** (*Random Access Memory*, memoria de acceso aleatorio): memoria de lectura y escritura eléctrica, **volátil**. Puede ser DRAM o SRAM (diap. 22).
- **Reemplazo (política de)**: decide qué bloque o página sale cuando no hay espacio: aleatoria, FIFO, LRU, LFU u óptima (diap. 50).
- **Registro base**: registro que apunta al inicio de una tabla (de páginas o de segmentos) o de un proceso en memoria.
- **Registros**: la memoria interna del CPU. Es la más rápida y pequeña; guarda cálculos temporales, estados e instrucciones (diap. 28).
- **Reposicionamiento**: cargar un proceso en una posición distinta de la memoria y convertir sus direcciones lógicas en físicas con la dirección base (diap. 67).
- **ROM** (*Read Only Memory*, memoria de solo lectura): no volátil, grabada en la fabricación. Se usa para el arranque y para subrutinas fijas (diap. 23).

## S

- **Segmentación**: el espacio virtual se divide en segmentos de tamaño variable (código, datos, pila…). Es visible para el programador y facilita compartir y proteger (diap. 74–75).
- **Segmentada/paginada (MV)**: segmentos de tamaño variable formados por páginas de tamaño fijo. DV = segmento | página | desplazamiento (diap. 85).
- **Signo y magnitud**: representación con signo donde el bit más significativo es el signo. Negar es solo cambiar ese bit.
- **SO (sistema operativo)**: programa que gestiona la memoria, los procesos y la E/S.
- **SRAM** (*Static RAM*, RAM estática): guarda los bits en **flip-flops**, sin refresco, mientras haya energía. Es más rápida y cara; se usa en la caché.
- **Swapping**: ver *Intercambio*.

## T

- **Tabla de páginas (TP)**: tabla con una entrada por página (en la traducción directa) que indica si la página está en la MP y en qué marco.
- **Tabla de páginas invertida**: tabla con una entrada por **marco**, a la que se llega con una función *hash* del número de página (diap. 73).
- **Tabla de segmentos (TS)**: tabla con la base y la longitud de cada segmento. En la MV segmentada/paginada apunta a la tabla de páginas de cada segmento.
- **Tacc (tiempo medio de acceso)**: `h·tc + (1 − h)·(tc + tp)` con dos niveles; `Σ (1 − h(Lᵢ₋₁))·tᵢ` con n niveles (diap. 56–57).
- **Tb, Tc, Tm, Tp**: tiempos de transferencia de un bloque de MP a MC (Tb), de acceso a la caché (Tc), de acceso a la MP (Tm) y de transferencia de una página del disco a la MP (Tp) (diap. 93).
- **Tiempo de acceso**: tiempo para hacer una lectura o escritura, desde que se presenta la dirección hasta que el dato está disponible (diap. 20).
- **TLB** (*Translation Lookaside Buffer*): pequeña tabla asociativa con las páginas más activas que acelera la traducción en el mecanismo mixto (diap. 78).
- **Traducción asociativa**: la tabla de páginas solo tiene entradas para las páginas que están en la MP (una por marco) (diap. 78).
- **Traducción directa**: una TP por proceso con una entrada por cada página, apuntada por un registro base (diap. 77).
- **Traducción mixta**: TLB con las páginas más activas + tabla directa (diap. 78).
- **Transferencia paralela**: los bits de un dato se reciben simultáneamente y la dirección entra por otras líneas (diap. 14).
- **Transferencia secuencial**: datos y dirección entran por una sola línea y un circuito lógico los selecciona (diap. 15).

## U

- **Ubicación (como característica)**: si la memoria es interna (MP), de CPU (registros) o externa (periféricos) (diap. 3).
- **Ubicación (política de)**: establece la correspondencia entre los bloques de la MP y los de la MCa: directa, asociativa o asociativa por conjuntos (diap. 38).
- **UC (unidad de control)**: parte de la CPU que interpreta las instrucciones y genera las señales de control.
- **Unidad de transferencia**: bits que entran o salen del módulo de memoria a la vez. En la memoria externa se transfieren bloques (diap. 13).
- **Unidad de tratamiento**: parte de la CPU que procesa los datos (ALU, registros); junto con la UC forma la CPU.
- **Unidad direccionable**: elemento con dirección propia (byte o palabra). Con A bits hay 2^A unidades.

## V

- **Vía** (*way*): cada línea dentro de un conjunto. Una caché «de 2 vías» tiene 2 líneas por conjunto.
- **Volátil**: memoria que pierde los datos al quitar la energía (RAM). Las ROM, PROM, EPROM, EEPROM y Flash no son volátiles.

## W

- **Write allocate / no write allocate**: con o sin asignación de escritura; ver *Asignación de escritura*.
- **Write back**: ver *Escritura aplazada*.
- **Write through**: ver *Escritura inmediata*.

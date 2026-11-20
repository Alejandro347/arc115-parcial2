# Flashcards — Parcial 2 ARC115 (preguntas de parciales anteriores)

**Fuentes:** Parcial 2a 2019, Parcial 2b 2019, Parcial II 2020 (12/12/2020), Parcial II 2022 (14/11/2022, + EP2-2022), Parcial II 2025 (dos versiones: fotos `2025.jpeg` y `repetido 2025.jpg.jpeg`).

**Cómo usarlo:** lee la pregunta, responde en voz alta o en papel y luego despliega la respuesta.
- 🔁 = la pregunta salió en **más de un parcial** (prioridad alta).
- ⚠️ = las claves de distintos años no coinciden; se indica la respuesta más defendible y por qué.

---

## Resumen de lo que más se repite

| Tema | Veces | Años |
|---|---|---|
| Formato de dirección de caché asociativa por conjuntos (4 palabras de 16 bits, 4096 palabras, 64K×32) | 4 | 2019b, 2025, 2025 |
| Esquema de traducción de direcciones virtuales (32K / 8K / 2K / 24 bits) | 3 | 2019b, 2025 |
| Algoritmo de Booth | 2 | 2019a, 2019b |
| Políticas de reemplazo (FIFO/LRU/óptimo) | 3 | 2019a, 2019b, 2020 |
| V/F «El ancho del bus de datos limita el tamaño de la memoria direccionable» | 2 | 2020, 2022 |
| V/F «La unidad de tratamiento y la unidad de control forman parte de la CPU» | 2 | 2020, 2022 |
| V/F «El principio de localidad permite mejorar la caché/MP» | 3 | 2019b, 2025, 2025 |
| V/F «Particiones fijas usan compactación» | 2 | 2019b, 2025 |
| V/F «El espacio lógico está limitado por la memoria física» | 2 | 2019b, 2025 |
| V/F «Planificación clave en sistemas multiprogramados» | 2 | 2019b, 2025 |
| V/F «Aumentar el tamaño de bloque mejora la tasa de fallos» | 2 | 2019b, 2025 |
| V/F «Intel organiza los bits por little-endian» | 2 | 2019b, 2025 |
| «Estrategia que permite encontrar un dato en la MCa» → Identificación | 3 | 2019b, 2020, 2025 |
| Ciclo de instrucción / ciclo fetch | 3 | 2019a, 2025, 2025 |
| Localidad temporal / espacial (selección múltiple) | 2 | 2019b, 2025 |

---

## 1. Selección múltiple

### Q1 🔁 (2019b, 2020, 2025)
La estrategia que me permite **encontrar un dato** en la MCa se llama:
a) Reemplazo b) Identificación c) Ubicación d) Escritura

<details><summary>Respuesta</summary>

**b) Estrategia de identificación.** Usa la **etiqueta** del bloque (y el bit de validez) para saber si el dato está en la caché.
- Ubicación (correspondencia) → **dónde** se coloca un bloque (directa, asociativa, por conjuntos).
- Reemplazo → **qué** bloque se saca (FIFO, LRU, LFU, aleatorio).
- Escritura (actualización) → **cómo** se mantiene la coherencia con la MP (escritura directa / write-back).
</details>

### Q2 🔁 (2019b)
Es un ejemplo de **localidad temporal**:
a) While (bucles) b) Vectores c) Matrices d) Código secuencial

<details><summary>Respuesta</summary>

**a) Bucles.** Localidad temporal = se vuelve a referenciar pronto lo que se usó recientemente (bucles, subrutinas, contadores).
Vectores, matrices y código secuencial son ejemplos de **localidad espacial**.
</details>

### Q3 🔁 (2025)
Es un ejemplo de **localidad espacial**:
a) Bucles b) Vectores c) Tablas d) Subrutinas

<details><summary>Respuesta</summary>

**b) Vectores** (y también **c) Tablas**): se accede a posiciones con direcciones cercanas entre sí.
Bucles y subrutinas son localidad **temporal**.
</details>

### Q4 (2019b)
Uno de los sistemas operativos que permitía que el **programador trabajara directamente con los componentes internos (hardware)** era:
a) SO monoprogramado b) SO interactivo c) SO de colas simples d) SO multiprogramado

<details><summary>Respuesta</summary>

**a) SO monoprogramado.** En los primeros sistemas (procesamiento en serie / monoprogramación) el programador interactuaba directamente con el hardware: cargaba el programa, operaba la consola, etc.
</details>

### Q5 (2025)
Capacidad de **acceder a una celda** de memoria:
a) Posicionamiento b) Direccionamiento c) Dirección de celda d) a, b, c

<details><summary>Respuesta</summary>

**b) Direccionamiento.** Cada celda tiene una dirección única; la capacidad de seleccionarla es el direccionamiento (con *A* bits de dirección se direccionan 2^A celdas).
</details>

### Q6 (2025)
Es el **tiempo que se tarda en realizar una operación de lectura o escritura**:
a) Ciclo de memoria b) Acceso aleatorio c) Ciclo de reloj d) a, b

<details><summary>Respuesta</summary>

**b) Tiempo de acceso** (la opción viene redactada como «acceso aleatorio»). En memorias de acceso aleatorio, el tiempo de acceso (latencia) es el tiempo para hacer una lectura o escritura.
El **ciclo de memoria** = tiempo de acceso + tiempo adicional antes de poder iniciar un segundo acceso, así que **no** es lo mismo.
</details>

### Q7 (2025)
Dentro del **método asociativo**, cada posición tiene su propio mecanismo de direccionamiento. ¿Qué dispositivos manejan mejor este método?
a) Memoria principal b) Memoria caché c) Buffer del HD d) Memoria virtual

<details><summary>Respuesta</summary>

**b) Memoria caché.** El acceso asociativo compara una parte de la dirección (la etiqueta) con todas las posiciones a la vez; es típico de las cachés (y de la TLB).
</details>

---

## 2. Verdadero / Falso (justificando)

### Q8 🔁 ⚠️ (2020, 2022)
«El **ancho del bus de datos** limita el tamaño de la memoria que puede ser direccionada.»

<details><summary>Respuesta</summary>

**FALSO.** El tamaño de memoria direccionable lo limita el **bus de direcciones**: con *n* líneas se direccionan 2ⁿ posiciones. El bus de datos solo determina cuántos bits se transfieren a la vez.
⚠️ La clave «resuelta» del 2020 dice V, pero la respuesta EP2-2022 y la teoría dicen F.
</details>

### Q9 🔁 ⚠️ (2020, 2022)
«La **unidad de tratamiento** y la **unidad de control** forman parte de la CPU.»

<details><summary>Respuesta</summary>

**VERDADERO.** La CPU = **unidad de control** (PC, IR, decodificador, secuenciador) + **unidad de tratamiento/proceso** (ALU, registros, acumulador, indicadores).
⚠️ La respuesta EP2-2022 dice «Falso, solo la UC», pero el examen resuelto de 2020 y la definición estándar en español (unidad de tratamiento = ALU + registros) dicen V. Defiende V y menciona los componentes.
</details>

### Q10 (2022)
«Todos los **operandos** se almacenan específicamente en la memoria principal.»

<details><summary>Respuesta</summary>

**FALSO.** Los operandos fuente y resultado pueden estar en: **memoria principal (o virtual)**, **registros de la CPU**, **dispositivos de E/S**, o en la propia instrucción (operando inmediato).
</details>

### Q11 ⚠️ (2022)
«Al **incrementar la memoria caché y la asociatividad** dentro de ella, se incrementan los aciertos entre la CPU y la MCa.»

<details><summary>Respuesta</summary>

**Verdadero en cuanto a la tasa de aciertos:** más capacidad reduce los fallos de **capacidad** y más asociatividad reduce los fallos de **conflicto**.
**Matiz para justificar:** cada vez mejora menos y **aumenta el tiempo de acierto**, el costo y la complejidad (más comparadores de etiquetas), así que no siempre mejora el rendimiento. La clase vio que el tiempo de acierto se reduce con «cachés pequeñas y simples».
⚠️ La respuesta del estudiante del 2022 marcó F. Si la marcas, justifícalo con el aumento del tiempo de acierto.
</details>

### Q12 (2020)
«Según el funcionamiento de la caché, la **estrategia de ubicación** determina dónde ubico un dato en la caché **y en la virtual**.»

<details><summary>Respuesta</summary>

**FALSO.** La estrategia de ubicación (función de correspondencia) determina dónde se coloca un bloque de la **MP en la caché**. La memoria virtual no entra ahí.
</details>

### Q13 (2020)
«Según el funcionamiento de la caché, la **estrategia de identificación** me determina cómo encontrar un dato en la caché.»

<details><summary>Respuesta</summary>

**VERDADERO.** Compara la etiqueta de la dirección con la del bloque (y revisa el bit de validez) para saber si hay acierto.
</details>

### Q14 (2020)
«El espacio de la memoria caché está dividido en **etiquetas**.»

<details><summary>Respuesta</summary>

**FALSO.** Está dividido en **líneas (bloques)**. Cada línea tiene asociada una **etiqueta** que identifica qué bloque de la MP contiene.
</details>

### Q15 (2020)
«El **tiempo de ciclo de memoria** es el tiempo de acceso más el tiempo que se requiere antes de iniciar un segundo acceso a memoria.»

<details><summary>Respuesta</summary>

**VERDADERO.** Es la definición: tiempo de acceso + tiempo adicional (recuperación de señales, regeneración en memorias destructivas) antes de un nuevo acceso. Aplica a memorias de acceso aleatorio, no a la memoria virtual.
</details>

### Q16 (2020)
«Una **interrupción** se produce únicamente cuando se genera un desbordamiento en cualquier proceso, momento en el cual se deja de ejecutar la instrucción actual.»

<details><summary>Respuesta</summary>

**FALSO.** Las interrupciones se clasifican en: **de programa** (desbordamiento, división por cero, instrucción ilegal, violación de memoria), **de temporizador**, **de E/S** y **de fallo de hardware** (falla de energía, error de paridad).
Además, la CPU **termina la instrucción actual** y atiende la interrupción en el ciclo de interrupción; no la corta a la mitad.
</details>

### Q17 (2020)
«El **contador de programa** se utiliza para conocer el número de líneas ejecutadas en un proceso.»

<details><summary>Respuesta</summary>

**FALSO.** El PC contiene la **dirección de la siguiente instrucción** que se va a captar. Se incrementa después de cada captación o se modifica con saltos.
</details>

### Q18 🔁 (2019b, 2025)
«La gestión de memoria basada en **particiones fijas** utiliza el método de **compactación** para resolver la fragmentación.»

<details><summary>Respuesta</summary>

**FALSO.** Las particiones fijas sufren fragmentación **interna**, que la compactación no resuelve. La compactación se usa con **particiones dinámicas** para eliminar la fragmentación **externa**.
</details>

### Q19 🔁 (2019b, 2025)
«Para los **sistemas multiprogramados** la planificación es la clave para su funcionamiento.»

<details><summary>Respuesta</summary>

**VERDADERO.** Con varios procesos en memoria, el SO debe decidir cuál usa la CPU (planificación a corto, medio y largo plazo) para que esté ocupada mientras otros esperan E/S.
</details>

### Q20 🔁 (2019b, 2025)
«El **principio de localidad** nos permite mejorar la **memoria caché**.»

<details><summary>Respuesta</summary>

**VERDADERO.** Gracias a la localidad temporal y espacial, guardar en caché los bloques usados recientemente (y sus vecinos) da tasas de acierto altas. Es la base de toda la jerarquía de memoria.
</details>

### Q21 (2025)
«El principio de localidad nos permite mejorar la **memoria principal**.»

<details><summary>Respuesta</summary>

**FALSO** (según el enfoque del curso): la localidad es lo que permite mejorar la **caché** y la jerarquía de memoria, es decir, que una memoria pequeña y rápida atienda la mayoría de los accesos. No hace más rápida la MP.
(En la variante del mismo año que dice «memoria caché» la respuesta es **V**; ver Q20.)
</details>

### Q22 🔁 (2019b, 2025)
«El **espacio de direcciones lógicas** está limitado por el tamaño de la memoria física.»

<details><summary>Respuesta</summary>

**FALSO.** El espacio lógico (virtual) depende del número de bits de la dirección lógica y puede ser **mayor** que la memoria física. Eso es justamente lo que permite la memoria virtual.
</details>

### Q23 🔁 (2019b, 2025)
«Cuando incrementamos el **tamaño de los bloques** dentro de la MCa, nos ayuda a mejorar la tasa de fallos si nos acercamos a la MP.»

<details><summary>Respuesta</summary>

**VERDADERO** (clave oficial). Bloques más grandes aprovechan la localidad espacial y bajan la tasa de fallos hasta cierto punto. Si el bloque crece demasiado, caben menos líneas y la tasa de fallos vuelve a subir, además de aumentar la penalización por fallo.
</details>

### Q24 🔁 ⚠️ (2019b, 2025) — corregida con la diapositiva
«**Intel** organiza los bits dentro de la palabra por medio de **little-endian**.»

<details><summary>Respuesta</summary>

**VERDADERO según la diapositiva de este año** (diap. 11: «Little endian: numeración empieza en el extremo menor (ejemplo: Intel)»; big endian → Motorola).
⚠️ La clave del 2019b lo marcó F (quizá por la distinción bits/bytes), pero la diapositiva actual dice V. Responde **V** citando el ejemplo de Intel.
</details>

### Q25 (2019b)
«La **política de extracción** determina qué información se sustituye en la MCa.»

<details><summary>Respuesta</summary>

**FALSO.** La política de extracción (*fetch*) determina **cuándo** y **qué** se trae a la caché (por demanda o anticipada/prebúsqueda). La que decide qué se sustituye es la **política de reemplazo**.
</details>

### Q26 ⚠️ (2025) — corregida con la diapositiva
«Dentro de la **ubicación** de la memoria se determina que la memoria interna es igual a la memoria principal.»

<details><summary>Respuesta</summary>

**VERDADERO según la diapositiva de este año** (diap. 3: «Ubicación – memoria interna = memoria principal; memoria CPU: registros; memoria externa: periféricos vía controladores de E/S»).
⚠️ En el libro de Stallings la memoria interna incluye registros, caché y MP, pero el curso usa la definición de la diapositiva.
</details>

### Q27 (2025)
«Cuando se diseña una memoria, el **precio** depende directamente de ella.»

<details><summary>Respuesta</summary>

**VERDADERO.** Diseñar una memoria es un compromiso entre **capacidad, velocidad (tiempo de acceso) y costo**: más rapidez = mayor costo por bit; más capacidad = menor costo por bit pero más lenta. Por eso existe la jerarquía de memoria.
</details>

### Q28 (2025)
«El **número máximo de celdas** direccionables directamente en memoria es independiente del número de bits que tiene cada celda.»

<details><summary>Respuesta</summary>

**VERDADERO.** Depende solo del número de bits de dirección: N = 2^A. El tamaño de la celda (8, 16, 32 bits) no cambia cuántas celdas se pueden direccionar.
</details>

### Q29 (2025, clave: V)
«La **memoria externa** es accesible por la CPU por medio del contenido del buffer de los dispositivos de E/S.»

<details><summary>Respuesta</summary>

**VERDADERO.** La CPU no accede directamente a la memoria externa: los datos pasan por los módulos/controladores de E/S (sus buffers) y luego a la MP.
</details>

### Q30 (2025, clave: V)
«Las memorias externas transfieren datos y direcciones de manera paralela, a través de líneas diferentes.»

<details><summary>Respuesta</summary>

**VERDADERO** según la clave del examen (líneas dedicadas para datos y direcciones).
</details>

### Q31 (2025, clave: V)
«Las **cintas** son un buen ejemplo del método **secuencial** de acceso a los datos en memoria.»

<details><summary>Respuesta</summary>

**VERDADERO.** En el acceso secuencial hay que pasar por los registros intermedios en orden lineal; el tiempo de acceso es muy variable.
</details>

### Q32 (2025, clave: V)
«Para los métodos de acceso, los registros tienen asociada una **dirección única basada en su localización física**.»

<details><summary>Respuesta</summary>

**VERDADERO.** Es el **acceso directo** (p. ej. discos): se salta a la vecindad del bloque y luego se busca secuencialmente.
</details>

### Q33 (2019a)
«La técnica de cachés de **escritura directa** presenta el inconveniente de inconsistencia si entre las escrituras en la caché y el disco se produce un fallo del sistema.»

<details><summary>Respuesta</summary>

**FALSO.** En escritura directa (*write-through*) cada escritura en caché se hace también en la memoria inferior, así que **siempre son consistentes**. El riesgo de inconsistencia ante un fallo lo tiene la **escritura diferida/post-escritura** (*write-back*): los bloques modificados (bit *dirty*) solo se escriben al ser reemplazados.
</details>

### Q34 (2019a)
«El **intercambio** es el hecho de que una tarea reemplace a otra en el estado de ejecución siguiendo el planificador a corto plazo.»

<details><summary>Respuesta</summary>

**FALSO.** Eso es el **cambio de contexto / despacho** (planificador a corto plazo). El **intercambio** (*swapping*) es mover procesos completos entre la MP y el disco; lo decide el **planificador a medio plazo**.
</details>

### Q35 (2019a)
«El controlador de E/S y la memoria intercambian datos directamente, sin intervención de la CPU; esto se da cuando se tiene una **interrupción**.»

<details><summary>Respuesta</summary>

**FALSO.** Eso es **DMA (acceso directo a memoria)**. Con E/S por interrupciones la CPU sí interviene en cada transferencia. En DMA la CPU solo recibe una interrupción **al terminar** el bloque.
</details>

### Q36 (2019a)
«El **grado de multiprogramación** corresponde al número máximo de programas que realizan las operaciones del sistema.»

<details><summary>Respuesta</summary>

**FALSO.** El grado de multiprogramación es el **número de procesos cargados en memoria al mismo tiempo**, compitiendo por la CPU. Lo controla el planificador a largo plazo.
</details>

### Q37 (2019a)
«La **memoria virtual** corresponde a un esquema de gestión de memoria que permite la ejecución de procesos parcialmente cargados en memoria.»

<details><summary>Respuesta</summary>

**VERDADERO.** Solo las páginas o segmentos necesarios están en la MP; el resto queda en disco y se trae bajo demanda (fallo de página).
</details>

---

## 3. Preguntas abiertas / teoría

### Q38 🔁 (2019a, 2025, 2025)
Explique el **ciclo de instrucción** (pasos, registros que intervienen) con un ejemplo.

<details><summary>Respuesta</summary>

**Ciclo de captación (fetch):**
1. `MAR ← PC` (dirección de la siguiente instrucción)
2. Lectura de memoria: `MBR ← M[MAR]`
3. `IR ← MBR`; `PC ← PC + 1`

**Ciclo de ejecución:** la UC decodifica el IR y ejecuta. Hay 4 tipos de acción: procesador↔memoria, procesador↔E/S, procesamiento de datos (ALU) y control (saltos que cambian el PC).

**Ciclo indirecto** (si hay direccionamiento indirecto) y **ciclo de interrupción** (si hay una interrupción pendiente: se guarda el PC y se salta a la rutina de servicio).

**Registros:** PC, IR, MAR, MBR, AC (acumulador) y PSW (indicadores).

**Ejemplo `ADD 940`:** fetch → IR = ADD 940 → MAR ← 940 → MBR ← M[940] → AC ← AC + MBR.
</details>

### Q39 (2019a)
¿En qué consiste el **ciclo FETCH**?

<details><summary>Respuesta</summary>

Es la **captación**: el PC tiene la dirección de la siguiente instrucción → se copia al MAR → se lee la memoria y la instrucción llega al MBR → se pasa al IR → se incrementa el PC. Después viene la decodificación y la ejecución.
</details>

### Q40 (2022)
**Esquematice y explique todos los componentes de la CPU** y su funcionamiento.

<details><summary>Respuesta</summary>

```
            ┌──────────── CPU ────────────┐
 Bus de ◄──►│  Unidad de Control (UC)     │  interpreta instrucciones, genera señales de control
 sistema    │   PC, IR, decodificador     │
 (datos,    │  ALU (unidad de tratamiento)│  operaciones aritméticas/lógicas, desplazador,
 dir.,      │   indicadores de estado     │  complementador
 control)   │  Registros                  │  almacenamiento rápido interno
            │   visibles: AX,BX,CX,DX...  │
            │   control/estado: PC,IR,MAR,│
            │   MBR, PSW                  │
            │  Bus interno                │  une los componentes
            └─────────────────────────────┘
```
**Tareas de la CPU:** captar instrucción → interpretar instrucción → captar datos → procesar datos → escribir datos.
</details>

### Q41 (2022)
Explique las **instrucciones** con las que trabaja el computador y la función de cada una.

<details><summary>Respuesta</summary>

1. **Procesamiento de datos:** aritméticas y lógicas (ADD, AND…), en la ALU.
2. **Almacenamiento de datos:** transferencias entre memoria y registros (LOAD/STORE).
3. **Transferencia/E/S:** mover datos entre el computador y los periféricos.
4. **Control:** cambian el flujo del programa (saltos condicionales/incondicionales, llamadas a subrutina) modificando el PC.
</details>

### Q42 (2022)
Explique los **componentes de la memoria interna** y el funcionamiento de cada uno.

<details><summary>Respuesta</summary>

- **Registros del procesador:** los más rápidos y caros, de poca capacidad; guardan operandos y direcciones de uso inmediato.
- **Memoria caché:** SRAM pequeña y rápida entre la CPU y la MP. Guarda copias de bloques de la MP usados recientemente (aprovecha la localidad).
- **Memoria principal:** DRAM, contiene los programas y datos en ejecución. Organizada en celdas con dirección. Incluye **RAM** (lectura/escritura, volátil: DRAM necesita refresco, SRAM no) y **ROM/PROM/EPROM/EEPROM/Flash** (no volátil).
</details>

### Q43 🔁 (2019b, 2025)
**Características principales de los sistemas/tipos de memoria** (explique al menos 3).

<details><summary>Respuesta</summary>

1. **Ubicación:** interna (registros, caché, MP) / externa (discos, cintas).
2. **Capacidad:** en bytes o palabras.
3. **Unidad de transferencia:** palabra, unidad direccionable (2^A = N), bloque (en memoria externa).
4. **Método de acceso:** secuencial (cinta), directo (disco), aleatorio (RAM), asociativo (caché).
5. **Prestaciones:** tiempo de acceso, tiempo de ciclo, velocidad de transferencia.
6. **Tipo físico:** semiconductor, magnética, óptica.
7. **Características físicas:** volátil/no volátil, borrable/no borrable.
8. **Organización:** disposición física de los bits en palabras.
</details>

### Q44 (2025)
Explique en qué consisten las **unidades de transferencia** y los **métodos de acceso** a memoria.

<details><summary>Respuesta</summary>

**Unidad de transferencia:** en la MP es el número de bits que se leen o escriben a la vez (puede ser igual o mayor que la palabra). En memoria externa se transfieren **bloques**. Conceptos asociados: **palabra** (unidad natural de organización) y **unidad direccionable** (2^A = N).

**Métodos de acceso:**
- *Secuencial:* recorrido lineal (cintas); tiempo muy variable.
- *Directo:* dirección única según la ubicación física, salto a la vecindad + búsqueda secuencial (discos).
- *Aleatorio:* cada posición tiene su propio mecanismo de direccionamiento; tiempo constante (RAM).
- *Asociativo:* aleatorio que compara una parte del contenido con todas las posiciones a la vez (caché, TLB).
</details>

### Q45 (2025)
¿Por qué las **celdas de memoria** tienen asociado un número de posición dentro de la memoria?

<details><summary>Respuesta</summary>

Para que cada celda se pueda **identificar de forma única (dirección)** y la CPU pueda leerla o escribirla directamente, poniendo esa dirección en el bus de direcciones (MAR). Con *A* bits de dirección se distinguen 2^A celdas.
</details>

### Q46 (2025)
Explique la **organización de la MCa**.

<details><summary>Respuesta</summary>

- La caché tiene *C* **líneas**; cada una guarda un **bloque** de *K* palabras de la MP, más una **etiqueta** y bits de control (validez, *dirty*).
- La MP se ve como 2ⁿ/K bloques; como C ≪ número de bloques, se necesita una **función de correspondencia**:
  - *Directa:* `Etiqueta | Línea | Palabra`; cada bloque va a una sola línea (línea = bloque mod C).
  - *Asociativa:* `Etiqueta | Palabra`; cualquier línea.
  - *Asociativa por conjuntos:* `Etiqueta | Conjunto | Palabra`; el bloque va a un conjunto de *k* vías.
- **Elementos de diseño:** tamaño, función de correspondencia, algoritmo de reemplazo, política de escritura, tamaño de línea y número de cachés (niveles; unificada o separada).
- **Funcionamiento:** la CPU genera una dirección → si está en caché (acierto) se entrega → si no (fallo) se trae el bloque de la MP y se entrega la palabra.
</details>

### Q47 (2020)
Explique el **comportamiento de la MCa** cuando el procesador hace distintas peticiones.

<details><summary>Respuesta</summary>

1. La CPU genera la dirección.
2. La caché la descompone (etiqueta/línea o conjunto/palabra) y compara la etiqueta (**identificación**).
3. **Acierto:** entrega la palabra a la CPU de inmediato.
4. **Fallo:** pide el bloque completo a la MP, lo coloca según la **función de correspondencia** (y si no hay sitio, aplica el **algoritmo de reemplazo**), y entrega la palabra.
5. **Escrituras:** se aplica la política de escritura (directa o post-escritura).
Gracias a la localidad, la mayoría de las peticiones son aciertos.
</details>

### Q48 (2020)
Explique el **comportamiento de la MV** cuando el procesador hace distintas peticiones.

<details><summary>Respuesta</summary>

1. La CPU genera una **dirección virtual** (nº de página + desplazamiento).
2. La MMU busca primero en la **TLB**; si no está, consulta la **tabla de páginas**.
3. Si la página está en MP (bit de presencia = 1), obtiene el **marco** y forma la dirección física = marco ‖ desplazamiento; luego se accede a caché/MP.
4. Si no está → **fallo de página**: interrupción al SO, que trae la página del disco a un marco libre (o reemplaza uno con FIFO/LRU/óptimo), actualiza la tabla y reintenta la instrucción.
Así los procesos pueden ser más grandes que la MP y ejecutarse cargados solo en parte.
</details>

### Q49 (2019a)
Con el esquema de gestión de memoria por **particiones dinámicas**, ¿qué se produce?

<details><summary>Respuesta</summary>

**Fragmentación externa:** con el tiempo quedan huecos pequeños entre particiones que no sirven para ningún proceso. Se resuelve con **compactación** (mover los procesos para juntar los huecos) y se reduce con algoritmos de colocación (primer ajuste, mejor ajuste, siguiente ajuste).
</details>

### Q50 (2019a)
¿Cuál es la **unidad más pequeña direccionable** de la memoria?

<details><summary>Respuesta</summary>

La **celda**: normalmente el **byte** (8 bits); en algunos sistemas, la palabra.
</details>

### Q51 (2019a)
¿Cuáles son las **ventajas del algoritmo de Booth**?

<details><summary>Respuesta</summary>

- Multiplica directamente números **con signo en complemento a 2**, sin corregir el signo al final.
- Ante cadenas de 1s consecutivos solo hace **una resta al inicio y una suma al final** (los demás pasos son solo desplazamientos), así que hace menos sumas/restas.
- Usa desplazamiento **aritmético** a la derecha, que conserva el signo.
</details>

### Q52 (2019a)
¿En qué consiste la **hiperpaginación** (*thrashing*)?

<details><summary>Respuesta</summary>

El sistema pasa **más tiempo intercambiando páginas entre la MP y el disco que ejecutando** procesos. Ocurre cuando hay demasiados procesos o pocos marcos por proceso: cada fallo de página saca una página que se necesitará pronto. Se evita con el modelo del conjunto de trabajo, menos multiprogramación o mejores algoritmos de reemplazo.
</details>

### Q53 (2019a)
Explique la **traducción directa en memoria virtual segmentada/paginada**.

<details><summary>Respuesta</summary>

Dirección virtual = `Nº segmento | Nº página | Desplazamiento`.
1. Registro base de la tabla de segmentos + nº de segmento → entrada de la **tabla de segmentos**, que apunta a la **tabla de páginas** de ese segmento.
2. Base de esa tabla de páginas + nº de página → entrada con el **nº de marco**.
3. Dirección física = **marco ‖ desplazamiento**.
Combina la protección/compartición lógica de la segmentación con la ausencia de fragmentación externa de la paginación.
</details>

### Q54 (2019a)
Explique los **fallos** que tiene la memoria caché.

<details><summary>Respuesta</summary>

Las **3 C**:
- **Forzosos/obligatorios** (*compulsory*): primer acceso a un bloque. Se reducen con bloques más grandes o prebúsqueda.
- **De capacidad:** la caché no puede contener todos los bloques que usa el programa. Se reducen con una caché más grande.
- **De conflicto:** en correspondencia directa o por conjuntos, varios bloques compiten por la misma línea o conjunto. Se reducen con más asociatividad.
(En multiprocesadores hay una 4.ª: **de coherencia**.)
</details>

### Q55 (2019b)
¿Cuáles son las **ventajas de las políticas de actualización** (escritura)?

<details><summary>Respuesta</summary>

- **Escritura directa (write-through):** la MP siempre está actualizada (consistencia), es fácil de implementar y es buena para DMA/E/S y multiprocesadores. Desventaja: mucho tráfico en el bus.
- **Post-escritura (write-back):** solo escribe en la MP al reemplazar un bloque modificado (bit *dirty*), así que hay **menos tráfico** y las escrituras son más rápidas. Desventaja: la MP puede quedar desactualizada.
- Ante un **fallo de escritura**: *write-allocate* (traer el bloque) o *no-write-allocate*.
</details>

### Q56 (2022)
Explique en qué caso usar **signo y magnitud** y/o **complemento a dos**:
a) Cuando es crítico que el hardware **niegue** un número de la forma más sencilla.
b) Cuando la mayoría de las operaciones son **sumas y restas**.

<details><summary>Respuesta</summary>

a) **Signo y magnitud:** negar es solo invertir el bit de signo. (En C2 hay que invertir todos los bits y sumar 1.)
b) **Complemento a dos:** suma y resta usan el mismo sumador (restar = sumar el C2), el bit de signo no se trata aparte y hay una sola representación del 0.
</details>

---

## 4. Ejercicios

### Q57 🔁🔁 (2019b, 2025, 2025: salió en los 3)
Una caché **asociativa por conjuntos** tiene bloques de **4 palabras de 16 bits** y tamaño de conjunto **2**. La caché contiene **4096 palabras de 16 bits**. La MP que se puede transferir a la caché es de **64K × 32 bits**. Encuentre el **formato de dirección** de la MCa.

<details><summary>Respuesta (solución oficial 2019b)</summary>

- Dirección de MP: 64K = 2¹⁶ → **16 bits**
- Palabra dentro del bloque: 4 palabras = 2² → **2 bits**
- Línea = 4 × 16 bits = 64 bits; conjunto = 2 líneas = 128 bits
- Caché = 4096 × 16 = 65 536 bits → conjuntos = 65 536 / 128 = 512 = 2⁹ → **9 bits**
  (equivalente: 4096 / 4 = 1024 líneas; 1024 / 2 = 512 conjuntos)
- Etiqueta = 16 − 9 − 2 = **5 bits**

| Etiqueta | Conjunto | Palabra |
|:-:|:-:|:-:|
| 5 | 9 | 2 |
</details>

### Q58 🔁 (2019b, 2025)
Diseñe un esquema de **transformación de direcciones virtuales**:
- Espacio virtual = **32K palabras**
- MP = **8K palabras**
- Páginas = **2K palabras**
- Bus de direcciones de la memoria secundaria = **24 bits**

<details><summary>Respuesta</summary>

- Dirección virtual: 32K = 2¹⁵ → **15 bits**
- Desplazamiento: 2K = 2¹¹ → **11 bits**
- Nº de páginas virtuales = 32K / 2K = 16 = 2⁴ → **4 bits** de página
- Dirección física: 8K = 2¹³ → **13 bits**
- Nº de marcos = 8K / 2K = 4 = 2² → **2 bits** de marco

```
Dir. virtual (15): | Página (4) | Desplazamiento (11) |
Dir. física  (13): | Marco (2)  | Desplazamiento (11) |
```
**Tabla de páginas:** 16 entradas (una por página). Cada entrada tiene un bit de presencia, el nº de marco (2 bits) si la página está en MP, y si no, su dirección en memoria secundaria (**24 bits**, o 24 − 11 = 13 bits si se guarda el nº de bloque de disco).
Traducción: la página indexa la tabla → presente: marco ‖ desplazamiento → no presente: fallo de página, se trae del disco con la dirección de 24 bits.
</details>

### Q59 (2025)
Computador de **20 bits** con memoria virtual paginada, páginas de **1 KB** y memoria física de **256 KB**.
a) Formato de la dirección virtual. b) Nº máximo de entradas de la tabla de páginas (un nivel). c) Nº de marcos de la MP.

<details><summary>Respuesta</summary>

a) Página de 1 KB = 2¹⁰ → desplazamiento **10 bits**; nº de página = 20 − 10 = **10 bits**.
`| Nº página (10) | Desplazamiento (10) |`
b) 2¹⁰ = **1024 entradas**.
c) 256 KB / 1 KB = **256 marcos** (2⁸ → la dirección física tiene 8 + 10 = 18 bits).
</details>

### Q60 (2020)
MP de **2¹⁶ bytes** direccionable por bytes, bloques de **8 bytes**, caché de **32 líneas** con **correspondencia directa**.
a) ¿Cómo se divide la dirección de 16 bits?
b) ¿En qué línea se almacenan los bytes de las direcciones **111B₁₆** y **C334₁₆**?

<details><summary>Respuesta</summary>

a) Palabra/byte: 8 = 2³ → **3 bits**; línea: 32 = 2⁵ → **5 bits**; etiqueta: 16 − 5 − 3 = **8 bits**.

| Etiqueta | Línea | Byte |
|:-:|:-:|:-:|
| 8 | 5 | 3 |

b)
- **111B₁₆** = `0001 0001 0001 1011` → etiqueta `00010001` (11₁₆), línea `00011` = **3**, byte `011` = 3.
- **C334₁₆** = `1100 0011 0011 0100` → etiqueta `11000011` (C3₁₆), línea `00110` = **6**, byte `100` = 4.
</details>

### Q61 (2022)
Una caché tiene **16 KB** de capacidad y líneas de **128 bytes**. ¿Cuántos conjuntos tiene si es asociativa por conjuntos de **2, 4 y 8 vías**?

<details><summary>Respuesta</summary>

Líneas = 16 × 1024 / 128 = **128 líneas**.

| Vías | Conjuntos |
|:-:|:-:|
| 2 | 128 / 2 = **64** |
| 4 | 128 / 4 = **32** |
| 8 | 128 / 8 = **16** |
</details>

### Q62 (2022)
¿Cuántos bits se necesitan para representar como **enteros binarios sin signo**: a) 12 b) 384 c) 1498? Explique.

<details><summary>Respuesta</summary>

Con *n* bits se representa de 0 a 2ⁿ − 1 → n = ⌈log₂(N + 1)⌉.
- a) **12** → 2⁴ − 1 = 15 ≥ 12 (con 3 bits solo se llega a 7) → **4 bits** (`1100`)
- b) **384** → 2⁹ − 1 = 511 ≥ 384 (con 8 bits solo 255) → **9 bits** (`110000000`)
- c) **1498** → 2¹¹ − 1 = 2047 ≥ 1498 (con 10 bits solo 1023) → **11 bits** (`10111011010`)

⚠️ Las respuestas «resueltas» que circulan (5, 10 y 12 bits) están **mal**: usan un bit de más.
</details>

### Q63 (2022)
Siendo **M = 12** y **Q = −3**, calcule el resultado de la **división** (algoritmo de división con restauración, dejando constancia).

<details><summary>Respuesta (interpretado como 12 ÷ (−3))</summary>

Procedimiento con signos: se divide con valores absolutos y luego se ajusta: **signo(R) = signo(dividendo)**, **signo(C) = signo(dividendo) × signo(divisor)**.
Dividendo 12 → Q = `01100`; divisor |−3| = 3 → M = `00011`; −M = `11101`; A = `00000` (5 bits).

| Ciclo | Paso | A | Q |
|:-:|---|:-:|:-:|
| 0 | Inicio | 00000 | 01100 |
| 1 | Desplazar | 00000 | 11000 |
|   | A−M = 11101 < 0 → Q₀=0, restaurar | 00000 | 11000 |
| 2 | Desplazar | 00001 | 10000 |
|   | A−M = 11110 < 0 → Q₀=0, restaurar | 00001 | 10000 |
| 3 | Desplazar | 00011 | 00000 |
|   | A−M = 00000 ≥ 0 → Q₀=1 | 00000 | 00001 |
| 4 | Desplazar | 00000 | 00010 |
|   | A−M < 0 → Q₀=0, restaurar | 00000 | 00010 |
| 5 | Desplazar | 00000 | 00100 |
|   | A−M < 0 → Q₀=0, restaurar | 00000 | 00100 |

Resultado sin signo: cociente = `00100` = 4, residuo = 0.
Ajuste: (+) ÷ (−) → **cociente = −4** (C2: `11100`), **residuo = 0**.
(En la notación del libro, M = divisor y Q = dividendo; leído literalmente sería −3 ÷ 12 → |divisor| > |dividendo| → C = 0, R = −3.)
</details>

### Q64 (2019a)
Algoritmo de **Booth: 11 × 5**.

<details><summary>Respuesta</summary>

5 bits: M = 11 = `01011`, −M = `10101`, Q = 5 = `00101`. Regla: Q₀Q₋₁ = 10 → A ← A − M; 01 → A ← A + M; 00/11 → nada. Luego desplazamiento aritmético a la derecha de A, Q, Q₋₁.

| Ciclo | Operación | A | Q | Q₋₁ |
|:-:|---|:-:|:-:|:-:|
| 0 | Inicio | 00000 | 00101 | 0 |
| 1 | 10 → A−M | 10101 | 00101 | 0 |
|   | Desplazar | 11010 | 10010 | 1 |
| 2 | 01 → A+M | 00101 | 10010 | 1 |
|   | Desplazar | 00010 | 11001 | 0 |
| 3 | 10 → A−M | 10111 | 11001 | 0 |
|   | Desplazar | 11011 | 11100 | 1 |
| 4 | 01 → A+M | 00110 | 11100 | 1 |
|   | Desplazar | 00011 | 01110 | 0 |
| 5 | 00 → nada, desplazar | 00001 | 10111 | 0 |

Resultado A‖Q = `0000110111` = **55** ✔
</details>

### Q65 (2019b)
Algoritmo de **Booth: (−7) × (−3)**.

<details><summary>Respuesta</summary>

4 bits: M = −7 = `1001`, −M = `0111`, Q = −3 = `1101`.

| Ciclo | Operación | A | Q | Q₋₁ |
|:-:|---|:-:|:-:|:-:|
| 0 | Inicio | 0000 | 1101 | 0 |
| 1 | 10 → A−M | 0111 | 1101 | 0 |
|   | Desplazar | 0011 | 1110 | 1 |
| 2 | 01 → A+M | 1100 | 1110 | 1 |
|   | Desplazar | 1110 | 0111 | 0 |
| 3 | 10 → A−M | 0101 | 0111 | 0 |
|   | Desplazar | 0010 | 1011 | 1 |
| 4 | 11 → nada, desplazar | 0001 | 0101 | 1 |

Resultado A‖Q = `00010101` = **21** ✔
</details>

### Q66 (2020)
Aplique **FIFO** a la secuencia **1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5** con **3 y 4 marcos**. Explique los resultados.

<details><summary>Respuesta</summary>

**3 marcos — 9 fallos**

| Ref | 1 | 2 | 3 | 4 | 1 | 2 | 5 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 1 | 1 | 1 | 4 | 4 | 4 | 5 | 5 | 5 | 5 | 5 | 5 |
| M2 |   | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 1 | 3 | 3 | 3 |
| M3 |   |   | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 2 | 4 | 4 |
| Fallo | F | F | F | F | F | F | F |   |   | F | F |   |

**4 marcos — 10 fallos**

| Ref | 1 | 2 | 3 | 4 | 1 | 2 | 5 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 1 | 1 | 1 | 1 | 1 | 1 | 5 | 5 | 5 | 5 | 4 | 4 |
| M2 |   | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 5 |
| M3 |   |   | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 2 | 2 | 2 |
| M4 |   |   |   | 4 | 4 | 4 | 4 | 4 | 4 | 3 | 3 | 3 |
| Fallo | F | F | F | F |   |   | F | F | F | F | F | F |

**Conclusión:** con más marcos hay **más** fallos (10 > 9). Es la **anomalía de Belady**, propia de FIFO (LRU y el óptimo no la presentan).
</details>

### Q67 (2019b)
Determine **cuándo y qué bloque se sustituye** con las distintas políticas de reemplazo, con **4 marcos** y la secuencia: **2 4 2 5 1 4 3 1 6 5 1**

<details><summary>Respuesta</summary>

**FIFO — 6 fallos**

| Ref | 2 | 4 | 2 | 5 | 1 | 4 | 3 | 1 | 6 | 5 | 1 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 2 | 2 | 2 | 2 | 2 | 2 | **3** | 3 | 3 | 3 | 3 |
| M2 |   | 4 | 4 | 4 | 4 | 4 | 4 | 4 | **6** | 6 | 6 |
| M3 |   |   |   | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 |
| M4 |   |   |   |   | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| Fallo | F | F |   | F | F |   | F |   | F |   |   |

Sustituciones: 3 reemplaza a 2; 6 reemplaza a 4.

**LRU — 7 fallos**

| Ref | 2 | 4 | 2 | 5 | 1 | 4 | 3 | 1 | 6 | 5 | 1 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 2 | 2 | 2 | 2 | 2 | 2 | **3** | 3 | 3 | 3 | 3 |
| M2 |   | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | **5** | 5 |
| M3 |   |   |   | 5 | 5 | 5 | 5 | 5 | **6** | 6 | 6 |
| M4 |   |   |   |   | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| Fallo | F | F |   | F | F |   | F |   | F | F |   |

Sustituciones: 3 reemplaza a 2 (el menos usado recientemente); 6 reemplaza a 5; 5 reemplaza a 4.

**Óptimo — 6 fallos**

| Ref | 2 | 4 | 2 | 5 | 1 | 4 | 3 | 1 | 6 | 5 | 1 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | 2 | 2 | 2 | 2 | 2 | 2 | **3** | 3 | **6** | 6 | 6 |
| M2 |   | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 |
| M3 |   |   |   | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 |
| M4 |   |   |   |   | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| Fallo | F | F |   | F | F |   | F |   | F |   |   |

Sustituciones: 3 reemplaza a 2 (ya no se usa); 6 reemplaza a 3 (ya no se usa; también valdría 4).
</details>

### Q68 (2019a)
Sistema paginado con **4 marcos**, referencias **{c, a, d, b, e, b, a, b, c, d}**. Inicialmente están en memoria **{a, b}** (en ese orden). Analice el contenido con **FIFO** y **LRU**.

<details><summary>Respuesta</summary>

**FIFO — 7 fallos** (cola inicial: a, b)

| Ref | c | a | d | b | e | b | a | b | c | d |
|---|---|---|---|---|---|---|---|---|---|---|
| M1 | a | a | a | a | **e** | e | e | e | e | **d** |
| M2 | b | b | b | b | b | b | **a** | a | a | a |
| M3 | c | c | c | c | c | c | c | **b** | b | b |
| M4 |   |   | d | d | d | d | d | d | **c** | c |
| Fallo | F |   | F |   | F |   | F | F | F | F |

**LRU — 5 fallos**

| Ref | c | a | d | b | e | b | a | b | c | d |
|---|---|---|---|---|---|---|---|---|---|---|
| M1 | a | a | a | a | a | a | a | a | a | a |
| M2 | b | b | b | b | b | b | b | b | b | b |
| M3 | c | c | c | c | **e** | e | e | e | e | **d** |
| M4 |   |   | d | d | d | d | d | d | **c** | c |
| Fallo | F |   | F |   | F |   |   |   | F | F |

LRU funciona mejor porque **a** y **b** se usan seguido y nunca se expulsan.
</details>

### Q69 (2019a)
En la **tabla de segmentos**, el segmento 0 tiene **base 229** y **longitud 609**. ¿A qué dirección física corresponde la dirección virtual **(0, 440)**?

<details><summary>Respuesta</summary>

Se verifica el límite: 440 < 609 ✔ (si no, sería violación de segmento → trap).
Dirección física = base + desplazamiento = 229 + 440 = **669**.
</details>

### Q70 (2019a)
Un sistema tiene **64 KB** de memoria física en marcos de **4 KB**. Un programa tiene código de **32 768 B**, datos de **16 386 B** y pila de **15 870 B**. ¿Se podrá cargar? ¿Influye el tamaño de página?

<details><summary>Respuesta</summary>

- Marcos = 64 KB / 4 KB = **16**
- Código: 32 768 / 4096 = **8** páginas
- Datos: 16 386 / 4096 = 4,0005 → **5** páginas
- Pila: 15 870 / 4096 = 3,87 → **4** páginas
- Total = **17 páginas > 16 marcos** → **NO cabe** (sin memoria virtual).

**Sí influye el tamaño de página:** el programa ocupa 65 024 B < 65 536 B; no cabe por la **fragmentación interna** (la última página de cada sección queda casi vacía). Con páginas de 512 B: 64 + 33 + 31 = 128 páginas = 128 marcos → **sí cabría**.
</details>

### Q71 (2019a)
¿Cuál es la representación decimal del punto flotante **84163852₁₆** (IEEE 754, precisión simple)?

<details><summary>Respuesta</summary>

`1000 0100 0001 0110 0011 1000 0101 0010`
- Signo = **1** (negativo)
- Exponente = `00001000` = 8 → exponente real = 8 − 127 = **−119**
- Mantisa = `001 0110 0011 1000 0101 0010` = 0x163852 = 1 456 210 → 1,f = 1 + 1 456 210 / 2²³ ≈ **1,17359**

Valor = −1,17359 × 2⁻¹¹⁹ ≈ **−1,7658 × 10⁻³⁶**
</details>

### Q72 (2025, enunciado incompleto en la foto)
PC con microprocesador de 1 B, MP de **4 GB entrelazada simple con 16 módulos** (tiempo de acceso 32 ns), MC de **dos módulos independientes** (instrucciones y datos) de **64 KB** cada una, tiempos de acceso de 4 ns, bloques de **16 B**, **asociativa por conjuntos de 2 bloques**, **actualización inmediata** (write-through) y sustitución **FIFO**. Se ejecuta:
```java
int i, cantidad; float Total, precio;
while (i < n) {
    Total = Total + precio[i] * cantidad[i];
    i = i + 1;
}
```
(Las preguntas concretas quedaron fuera de la foto. Lo que casi seguro piden:)

<details><summary>Respuesta (datos base)</summary>

- MP 4 GB = 2³² → dirección de **32 bits**. Entrelazado de 16 módulos → **4 bits** (los de menor peso de la dirección de palabra) seleccionan el módulo.
- Cada MC: 64 KB / 16 B = **4096 bloques**; 2 vías → **2048 conjuntos** = 2¹¹.
- Formato: `Etiqueta (17) | Conjunto (11) | Byte (4)` → 32 − 11 − 4 = 17.
- **Localidad en el código:** temporal en `i`, `Total`, `n` y en las instrucciones del `while` (se repiten en cada iteración); espacial en `precio[i]` y `cantidad[i]` (recorrido secuencial de vectores; cada bloque de 16 B trae 4 floats/ints, así que hay 1 fallo cada 4 iteraciones por vector).
- Con write-through, cada escritura de `Total` e `i` va también a la MP (32 ns).
</details>

---

### Tips finales (de los apuntes de Repaso)
- **División con signo**: «a pesar de que no se vio en clases, se evaluará en el parcial». Practica el algoritmo con restauración y el ajuste de signos: signo(R) = signo(D) y signo(C) = signo(D) × signo(V).
- Fórmulas clave: `2^A = N` celdas; `líneas = tamaño caché / tamaño bloque`; `conjuntos = líneas / vías`; `etiqueta = bits dir − bits índice − bits palabra`; `nº páginas = espacio virtual / tamaño página`; `marcos = MP / tamaño página`.

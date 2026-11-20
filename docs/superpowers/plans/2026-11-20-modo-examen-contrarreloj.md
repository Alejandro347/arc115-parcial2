# Modo examen, flashcards con/sin opciones y contrarreloj — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Que las preguntas se puedan responder seleccionando opciones como en un examen (en las flashcards y en un modo examen nuevo), mantener las flashcards clásicas sin opciones y añadir contrarreloj.

**Architecture:** Las opciones se escriben dentro de cada tarjeta del markdown como un comentario HTML `<!--opciones … -->` (invisible en GitHub y en la vista lista). La lógica pura (parsear opciones, barajar, armar examen, calificar, formatear tiempo) va en un módulo nuevo `assets/quiz-core.js`, que funciona en el navegador (`window.QuizCore`) y en Node (`module.exports`) para probarlo con `node --test`. `assets/app.js` usa ese módulo para: (1) el toggle «Con opciones / Sin opciones» del modo práctica, (2) la ruta nueva `#/examen` y (3) los temporizadores.

**Tech Stack:** HTML/CSS/JS sin build, marked@12.0.2 (CDN, ya en uso), Node 22 (`node --test`) solo para las pruebas, GitHub Pages.

**Spec:** el pedido del usuario en el chat (2026-11-20): «Agrégale una funcionalidad para que las preguntas de opción múltiple puedan ser seleccionadas como en un examen; las flashcards mantenlas con opciones y sin opciones; además pon una opción de contrarreloj». Las decisiones de diseño están en este plan.

## Global Constraints

- Sitio 100 % estático: sin bundler ni dependencias npm nuevas; solo se permite `marked@12.0.2` por CDN.
- Toda la interfaz va en **español**.
- `localStorage` siempre con el wrapper `store` que ya existe en `app.js` (try/catch); la página debe funcionar sin almacenamiento.
- Formato de opciones (fijo), justo después del enunciado y antes de `<details>`:
  ```
  <!--opciones
  a) texto
  *b) texto correcto
  c) texto
  d) texto
  -->
  ```
  - El `*` inicial marca la única correcta.
  - El prefijo `a) `/`b) `… es opcional y se elimina al parsear.
  - V/F se escribe con exactamente dos líneas: `Verdadero` y `Falso`.
- Mazos con opciones: `Flashcards_Parcial2_ARC115.md`, `Flashcards_Teoria_Diapositivas.md`, `Ejercicios_Diapositiva.md`. **Cada tarjeta** (h3 con `<details>`) lleva un bloque de opciones.
- Las preguntas que no son V/F llevan **4 opciones**; los distractores son errores típicos (por ejemplo, confundir ubicación con identificación, o usar un bit de más).
- Contrarreloj de práctica (por tarjeta): `Sin tiempo`, `15 s`, `30 s`, `60 s`.
- Contrarreloj de examen (total): `Sin límite`, `30 s por pregunta`, `1 min por pregunta`, `2 min por pregunta`.
- Nota del examen sobre 10, con un decimal.
- `.gitignore` es una lista blanca: cualquier archivo nuevo que se publique debe añadirse ahí.

## Review Focus

1. **Tarjeta sin bloque de opciones en modo «Con opciones»:** no debe romper; queda fuera del mazo con opciones. Prueba en Task 1 (`parseOptions` devuelve `null`) y en Task 5 (el validador de contenido exige el bloque en todas).
2. **El temporizador sigue corriendo al cambiar de tarjeta, de ruta o de modo:** el temporizador anterior debe cancelarse (si no, entrega o voltea en otra pantalla). La prueba manual está en Task 3 (paso «cambiar de ruta con el contrarreloj activo») y `createCountdown().stop()` en Task 1.
3. **Entregar el examen con preguntas sin responder:** cuentan como incorrectas y se muestran como «Sin responder»; no aparecen como correctas. Prueba en Task 1 (`gradeExam` con respuesta `undefined`).
4. **Barajar opciones pierde cuál es la correcta:** al barajar, el índice correcto debe seguir a su texto. Prueba en Task 1 (`shuffleOptions` conserva `correct`).
5. **Pedir más preguntas de las disponibles en el examen:** `buildExam` devuelve todas las disponibles, sin duplicados ni `undefined`. Prueba en Task 1.

---

## Estructura de archivos

| Archivo | Responsabilidad |
|---|---|
| Crear `assets/quiz-core.js` | Lógica pura: parseo de opciones, barajado, armado y calificación del examen, formato de tiempo, cuenta regresiva |
| Crear `tests/quiz-core.test.js` | Pruebas unitarias del núcleo (`node --test`) |
| Crear `tests/content.test.js` | Valida que cada tarjeta de los 3 mazos tenga un bloque de opciones válido |
| Modificar `assets/app.js` | `extractCards` lee las opciones; toggle con/sin opciones; contrarreloj de práctica; ruta `#/examen` |
| Modificar `assets/style.css` | Estilos de opciones (seleccionada/correcta/incorrecta), barra de tiempo, pantalla de examen |
| Modificar `index.html` | Cargar `quiz-core.js` antes de `app.js`; enlace «Modo examen» en el menú |
| Modificar los 3 `.md` de mazos | Añadir los bloques `<!--opciones … -->` |
| Modificar `.gitignore`, `README.md` | Publicar `tests/` y `docs/`; documentar los modos nuevos |

---

### Task 1: Núcleo `quiz-core.js` con pruebas

**Files:**
- Create: `assets/quiz-core.js`
- Test: `tests/quiz-core.test.js`

**Interfaces:**
- Produces (en `window.QuizCore` y `module.exports`):
  - `parseOptions(text: string) -> {options: string[], correct: number} | null`
    `text` es el contenido del comentario; devuelve `null` si no empieza con `opciones`, si hay menos de 2 opciones o si el número de `*` no es exactamente 1.
  - `shuffleOptions(q: {options, correct}, rng = Math.random) -> {options, correct}`
    Es una copia nueva; si las opciones son `['Verdadero','Falso']`, no baraja.
  - `shuffle(arr: any[], rng = Math.random) -> any[]` (copia, Fisher–Yates)
  - `buildExam(cards: Card[], count: number, rng = Math.random) -> Card[]`
    Solo toma las tarjetas con `opts`; devuelve `min(count, disponibles)` elementos distintos, ya con `shuffleOptions` aplicado en `card.opts`.
  - `gradeExam(questions: Card[], answers: (number|undefined)[]) -> {correct: number, total: number, grade: number, details: {chosen, correct, ok, blank}[]}`
    `grade` = 10·correct/total redondeado a 1 decimal; vale 0 si `total` es 0.
  - `formatTime(seconds: number) -> "mm:ss"` (los negativos se tratan como 0)
  - `createCountdown(seconds: number, onTick: (left:number)=>void, onEnd: ()=>void, clock = {setInterval, clearInterval}) -> {stop(): void}`
    Hace tick cada 1000 ms; llama a `onEnd` una sola vez; `stop()` cancela sin llamar a `onEnd`.
  - Tipo `Card` (definido aquí y usado por las tareas siguientes): `{title, section, front: Node[], back: Node[], opts: {options, correct} | null, deck: string}`

- [ ] **Step 1: Escribir las pruebas que fallan** en `tests/quiz-core.test.js` (`node:test` + `node:assert/strict`, `require('../assets/quiz-core.js')`):
  - `parseOptions("opciones\na) Reemplazo\n*b) Identificación\nc) Ubicación\nd) Escritura")` → `{options:['Reemplazo','Identificación','Ubicación','Escritura'], correct:1}`
  - `parseOptions("opciones\nVerdadero\n*Falso")` → `{options:['Verdadero','Falso'], correct:1}`
  - devuelve `null` para: `"otra cosa"`, `"opciones\n*a) x"` (1 opción), `"opciones\n*a) x\n*b) y"` (2 correctas), `"opciones\na) x\nb) y"` (ninguna correcta)
  - `shuffleOptions` con un rng que invierte el orden: el texto en `options[correct]` sigue siendo `'Identificación'`
  - `shuffleOptions` de V/F deja `['Verdadero','Falso']` igual
  - `buildExam(5 cards, 3 con opts, count=10)` → longitud 3, títulos únicos, todas con `opts`
  - `gradeExam([q correct=1, q correct=0, q correct=2], [1, undefined, 0])` → `correct 1, total 3, grade 3.3`, `details[1].blank === true`, `details[2].ok === false`
  - `gradeExam([], [])` → `grade 0`
  - `formatTime(75) === '01:15'`, `formatTime(-3) === '00:00'`
  - `createCountdown(2, …)` con un reloj falso que guarda el callback: tres ticks manuales → `onTick` recibe 1 y 0, `onEnd` se llama 1 vez; tras `stop()`, más ticks no llaman a nada

- [ ] **Step 2: Correr y ver que falla**
  Run: `node --test tests/`
  Expected: FAIL `Cannot find module '../assets/quiz-core.js'`

- [ ] **Step 3: Implementar `assets/quiz-core.js`**, envuelto en un IIFE UMD:
  `(function (root, f) { const m = f(); if (typeof module === 'object' && module.exports) module.exports = m; else root.QuizCore = m; })(this, function () { … })`.
  En `parseOptions`, recorta cada línea y quita el prefijo con `/^\*?\s*[a-dA-D]\)\s*/`, después de detectar el `*`.

- [ ] **Step 4: Correr y ver que pasa**
  Run: `node --test tests/`
  Expected: todas PASS

- [ ] **Step 5: Commit**
  ```bash
  git add assets/quiz-core.js tests/quiz-core.test.js .gitignore
  git commit -m "Núcleo de quiz: opciones, examen, calificación y cuenta regresiva"
  ```
  (Antes, añade `!/tests/` y `!/docs/` a `.gitignore`.)

---

### Task 2: Leer opciones en las tarjetas + toggle «Con opciones / Sin opciones»

**Files:**
- Modify: `assets/app.js` (`extractCards`, `practice`)
- Modify: `assets/style.css`
- Modify: `index.html` (añadir `<script src="assets/quiz-core.js"></script>` antes de `app.js`)
- Modify: `Flashcards_Parcial2_ARC115.md` (solo Q1 y Q8, como datos de prueba)

**Interfaces:**
- Consumes: `QuizCore.parseOptions`, `QuizCore.shuffleOptions`, tipo `Card` (Task 1)
- Produces:
  - `extractCards(div, deck: string) -> Card[]`: recorre `div.childNodes`; un nodo comentario (`nodeType === 8`) dentro de una tarjeta se pasa a `parseOptions` y se guarda en `card.opts`.
  - Preferencia `store` con la clave `'conOpciones'` (boolean, por defecto `true`).
  - `renderOptions(container: HTMLElement, opts, onAnswer: (index:number, ok:boolean)=>void) -> void`: botones con las clases `.opt`, `.opt.correct` y `.opt.wrong`, que se reutilizan en Task 4.

- [ ] **Step 1: Añadir bloques de opciones a Q1 (selección) y Q8 (V/F)** en `Flashcards_Parcial2_ARC115.md`, con el formato de Global Constraints.
- [ ] **Step 2: Correr `node --test tests/`.** Expected: PASS (sin regresiones).
- [ ] **Step 3: Implementar.**
  - En la modebar del modo práctica, dos botones `aria-pressed`: «🔘 Con opciones» y «🃏 Sin opciones».
  - **Con opciones:** el mazo filtra a `card.opts !== null`. La tarjeta muestra las opciones barajadas (`shuffleOptions`).
    - Al hacer clic: marca la correcta en verde y, si fallaste, la elegida en rojo; muestra la respuesta (`back`) y un botón «Siguiente →».
    - Acertar → `known.add`; fallar → `known.delete` y la tarjeta se reencola (lo mismo que hace hoy «Repasar»).
    - Teclas `1`–`4`: elegir opción; `→`: siguiente.
  - **Sin opciones:** comportamiento actual, sin cambios.
  - `extractCards` sigue ignorando las tarjetas sin `<details>`.
- [ ] **Step 4: Verificación manual en el navegador** (servir una copia con `python3 -m http.server 8765 --directory <copia>`). En `#/Flashcards_Parcial2_ARC115.md`, «Con opciones» con el filtro «Todas»:
  - el mazo muestra «Mazo: 1 de 2»;
  - elegir la correcta pone el botón verde;
  - «Sin opciones» muestra las 72.
  - En la vista lista (`?modo=lista`) **no** se ve el texto de las opciones.
- [ ] **Step 5: Commit** `git commit -am "Flashcards con opciones seleccionables y modo sin opciones"`

---

### Task 3: Contrarreloj en el modo práctica

**Files:**
- Modify: `assets/app.js` (`practice`, `route`)
- Modify: `assets/style.css` (`.timer`, `.timer.low` cuando quedan ≤5 s)

**Interfaces:**
- Consumes: `QuizCore.createCountdown`, `QuizCore.formatTime` (Task 1); `renderOptions` (Task 2)
- Produces: variable de módulo `activeTimer: {stop()} | null` en `app.js`; `route()` llama `activeTimer?.stop()` al inicio. Task 4 la reutiliza.

- [ ] **Step 1: Implementar.**
  - Un `<select>` «⏱ Sin tiempo / 15 s / 30 s / 60 s» en los controles de práctica, guardado en `store` con la clave `'tiempoTarjeta'`.
  - Cada tarjeta nueva cancela el temporizador anterior e inicia uno nuevo; muestra `mm:ss`.
  - Al llegar a 0:
    - **con opciones:** cuenta como fallo («⏰ Tiempo agotado»), marca la correcta y reencola;
    - **sin opciones:** voltea la tarjeta.
  - Responder o voltear antes de tiempo detiene el temporizador.
- [ ] **Step 2: Verificación manual.**
  - Con 15 s y sin contestar: a los 15 s aparece «⏰ Tiempo agotado» y la opción correcta en verde.
  - **Cambiar de ruta con el contrarreloj activo** (ir a «Índice y fórmulas» a los 5 s): durante los 15 s siguientes no ocurre nada en la página nueva y no hay errores en la consola.
- [ ] **Step 3: Commit** `git commit -am "Contrarreloj por tarjeta en modo práctica"`

---

### Task 4: Modo examen (`#/examen`) con contrarreloj total

**Files:**
- Modify: `assets/app.js` (nueva función `exam()`; `route()` la llama cuando `currentPath() === 'examen'`)
- Modify: `index.html` (en el menú, grupo «Práctica»: `<a href="#/examen">📝 Modo examen</a>` como primer enlace)
- Modify: `assets/style.css` (`.exam-q`, `.exam-bar` fija arriba, `.result`)

**Interfaces:**
- Consumes: `extractCards`, `renderOptions`, `activeTimer` (Tasks 2–3); `buildExam`, `gradeExam`, `createCountdown`, `formatTime` (Task 1). Carga los 3 mazos con `load(path)`.
- Produces: `exam(): HTMLElement`, con tres pantallas en el mismo contenedor: configuración → examen → resultados.

- [ ] **Step 1: Implementar.**
  - **Configuración:**
    - casillas de mazos: «Preguntas de parciales», «Teoría de la diapositiva», «Ejercicios de la diapositiva» (por defecto, las 3);
    - nº de preguntas: 10 / 20 / 30 / Todas;
    - contrarreloj: Sin límite / 30 s / 1 min / 2 min por pregunta;
    - botón «Comenzar». Si no hay mazos marcados, el botón queda deshabilitado.
  - **Examen:**
    - todas las preguntas en una página, numeradas, con las opciones como radios (sin feedback);
    - una barra fija con «Respondidas k/n», el tiempo restante y el botón «Entregar»;
    - al entregar con preguntas en blanco, `confirm('Tienes N preguntas sin responder. ¿Entregar?')`;
    - si el tiempo llega a 0, se entrega automáticamente sin preguntar.
  - **Resultados:**
    - «Nota: X/10 (c de n correctas)» y el tiempo usado;
    - por pregunta: la opción elegida en rojo o verde, la correcta en verde, «Sin responder» si quedó en blanco, y un `<details>` «Ver explicación» con el `back` de la tarjeta;
    - botones «Repetir solo las falladas» (nuevo examen con esas tarjetas) y «Nuevo examen».
- [ ] **Step 2: Verificación manual.**
  - 10 preguntas con 30 s c/u → la barra muestra `05:00`.
  - Responder 3 y entregar → confirm con «7 preguntas sin responder»; la nota coincide con el conteo de aciertos.
  - «Repetir solo las falladas» arma un examen con las falladas y las que quedaron en blanco.
  - Con un examen de 30 s por pregunta y 1 pregunta (para la prueba, temporalmente con count = 1), la entrega automática ocurre a los 30 s.
- [ ] **Step 3: Commit** `git commit -am "Modo examen con selección de opciones, nota y contrarreloj"`

---

### Task 5: Opciones para todas las tarjetas + validador de contenido

**Files:**
- Test: `tests/content.test.js`
- Modify: `Flashcards_Parcial2_ARC115.md` (72 tarjetas), `Flashcards_Teoria_Diapositivas.md` (45), `Ejercicios_Diapositiva.md` (17)

**Interfaces:**
- Consumes: `QuizCore.parseOptions` (Task 1)

- [ ] **Step 1: Escribir la prueba que falla** `tests/content.test.js`, que para cada uno de los 3 archivos:
  - parte el markdown por `^### `;
  - toma solo las secciones que contienen `<details>`;
  - exige que cada una tenga un `<!--opciones … -->` antes de `<details>` y que `parseOptions` no devuelva `null`;
  - exige 4 opciones cuando no es V/F.

  Valores esperados: Parcial **72**, Teoría **45**, Ejercicios **17** tarjetas con opciones. El mensaje de error debe nombrar el título de la tarjeta que falla.
- [ ] **Step 2: Correr y ver que falla**
  Run: `node --test tests/content.test.js`
  Expected: FAIL nombrando la primera tarjeta sin opciones (por ejemplo, «Q2 …»).
- [ ] **Step 3: Escribir los bloques de opciones.**
  - V/F (Q8–Q37): `Verdadero`/`Falso` con la correcta **según la respuesta ya escrita en la tarjeta** (incluidas las ⚠️ corregidas: Q24 = V, Q26 = V).
  - Selección (Q1–Q7): las opciones del examen original.
  - Preguntas abiertas y ejercicios: 4 opciones cortas (≤ 120 caracteres). La correcta resume la respuesta de la tarjeta; los distractores son errores típicos. Para los ejercicios numéricos, la correcta es el resultado final (por ejemplo, `5 | 9 | 2`) y los distractores, resultados de errores comunes (un bit de más, confundir líneas con conjuntos, no aplicar el ajuste de signo).
- [ ] **Step 4: Correr y ver que pasa**
  Run: `node --test tests/`
  Expected: todas PASS (núcleo + contenido)
- [ ] **Step 5: Commit** `git commit -am "Opciones para todas las tarjetas y validador de contenido"`

---

### Task 6: Documentación, publicación y verificación en vivo

**Files:**
- Modify: `README.md` (sección «Cómo usarla»: modo con/sin opciones, contrarreloj, modo examen y sus atajos)
- Modify: `.gitignore` (ya trae `tests/` y `docs/` desde Task 1; verificar)

- [ ] **Step 1: Correr `node --test tests/` y `node --check assets/app.js assets/quiz-core.js`.** Expected: PASS y sin salida.
- [ ] **Step 2: Comprobar que no se publican datos personales:** `git grep` con los nombres de los estudiantes que aparecen en los exámenes originales y con `@gmail`. Expected: sin coincidencias.
- [ ] **Step 3: Commit y push** `git commit -am "Documentar modo examen y contrarreloj" && git push`
- [ ] **Step 4: Esperar el build de Pages** (`gh api repos/Alejandro347/arc115-parcial2/pages/builds/latest --jq .status` → `built` con el commit nuevo) y abrir `https://alejandro347.github.io/arc115-parcial2/#/examen`. Expected: la pantalla de configuración carga, un examen de 10 preguntas se puede entregar y muestra la nota.

(function () {
  'use strict';
  const content = document.getElementById('content');
  const sidebar = document.getElementById('sidebar');
  const DEFAULT = 'README.md';
  const FLASH = ['Flashcards_Parcial2_ARC115.md', 'Flashcards_Teoria_Diapositivas.md', 'Ejercicios_Diapositiva.md'];

  // ---------- almacenamiento seguro ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  };

  // ---------- tema ----------
  const root = document.documentElement;
  const savedTheme = store.get('theme', null);
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  document.getElementById('themeBtn').addEventListener('click', () => {
    const dark = root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    const next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store.set('theme', next);
  });
  document.getElementById('menuBtn').addEventListener('click', () => sidebar.classList.toggle('open'));

  // ---------- utilidades ----------
  const cache = {};
  async function load(path) {
    if (cache[path]) return cache[path];
    const r = await fetch(encodeURI(path), { cache: 'no-cache' });
    if (!r.ok) throw new Error('No se encontró ' + path);
    return (cache[path] = await r.text());
  }
  function dirOf(p) { const i = p.lastIndexOf('/'); return i < 0 ? '' : p.slice(0, i + 1); }
  function resolve(base, rel) {
    const parts = (dirOf(base) + rel).split('/');
    const out = [];
    for (const s of parts) { if (s === '..') out.pop(); else if (s && s !== '.') out.push(s); }
    return out.join('/');
  }
  function currentPath() {
    const h = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    return h ? h.split(/[?#]/)[0] : DEFAULT;
  }
  function render(md, path) {
    const div = document.createElement('div');
    div.innerHTML = marked.parse(md, { gfm: true });
    div.querySelectorAll('table').forEach(t => {
      const w = document.createElement('div'); w.className = 'table-wrap';
      t.parentNode.insertBefore(w, t); w.appendChild(t);
    });
    div.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (/^(https?:|mailto:|#)/.test(href)) { if (/^https?:/.test(href)) a.target = '_blank'; return; }
      const [file] = href.split(':');
      if (/\.md$/i.test(file)) a.setAttribute('href', '#/' + resolve(path, file));
    });
    return div;
  }
  function setActive(path) {
    sidebar.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#/' + path));
  }

  // ---------- flashcards ----------
  function wrapTables(el) {
    el.querySelectorAll('table').forEach(t => {
      if (t.parentNode.classList && t.parentNode.classList.contains('table-wrap')) return;
      const w = document.createElement('div'); w.className = 'table-wrap'; t.parentNode.insertBefore(w, t); w.appendChild(t);
    });
  }

  function extractCards(div, deck) {
    const cards = []; let section = ''; let cur = null;
    for (const el of Array.from(div.childNodes)) {
      if (el.nodeType === 8) { if (cur && !cur.opts) cur.opts = QuizCore.parseOptions(el.data); continue; }
      if (el.nodeType !== 1) continue;
      const tag = el.tagName;
      if (tag === 'H2') { section = el.textContent; cur = null; continue; }
      if (tag === 'H3') { cur = { title: el.textContent, section, front: [], back: [], opts: null, deck: deck || '' }; cards.push(cur); continue; }
      if (tag === 'HR' || tag === 'H1') { cur = null; continue; }
      if (!cur) continue;
      if (tag === 'DETAILS') {
        Array.from(el.childNodes).forEach(n => { if (n.nodeName !== 'SUMMARY') cur.back.push(n.cloneNode(true)); });
      } else cur.front.push(el.cloneNode(true));
    }
    return cards.filter(c => c.back.length);
  }

  const LETTERS = 'ABCDEFGH';
  // Dibuja las opciones como botones. Devuelve { reveal() } para marcar la correcta sin elección (tiempo agotado).
  function renderOptions(container, opts, onAnswer) {
    const box = document.createElement('div'); box.className = 'opts';
    let done = false;
    const btns = opts.options.map((text, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'opt';
      b.innerHTML = '<span class="opt-letter">' + LETTERS[i] + '</span>';
      b.appendChild(document.createTextNode(text));
      b.onclick = () => choose(i);
      box.appendChild(b); return b;
    });
    function lock(chosen) {
      done = true;
      btns.forEach(b => { b.disabled = true; });
      btns[opts.correct].classList.add('correct');
      if (chosen !== undefined && chosen !== opts.correct) btns[chosen].classList.add('wrong');
    }
    function choose(i) { if (done) return; lock(i); onAnswer(i, i === opts.correct); }
    container.appendChild(box);
    return { reveal() { if (!done) lock(undefined); }, choose, get done() { return done; } };
  }

  function showAnswer(cardEl, c, note) {
    const ans = document.createElement('div'); ans.className = 'answer';
    if (note) { const p = document.createElement('p'); p.className = 'verdict'; p.innerHTML = note; ans.appendChild(p); }
    c.back.forEach(n => ans.appendChild(n.cloneNode(true)));
    wrapTables(ans);
    cardEl.appendChild(ans);
  }

  function practice(path, div) {
    const all = extractCards(div, path);
    const key = 'known:' + path;
    let known = new Set(store.get(key, []));
    let filter = store.get('filter:' + path, 'pendientes');
    let shuffle = store.get('shuffle', true);
    let withOpts = store.get('conOpciones', true);
    let deck = [], idx = 0, shown = false, optCtl = null;
    let tiempo = store.get('tiempoTarjeta', 0);

    const wrap = document.createElement('div'); wrap.className = 'practice';
    const stats = document.createElement('div'); stats.className = 'pstats';
    const bar = document.createElement('div'); bar.className = 'pbar'; bar.innerHTML = '<div></div>';
    const modes = document.createElement('div'); modes.className = 'modebar';
    modes.innerHTML =
      '<button class="btn" id="mOpt">🔘 Con opciones</button>' +
      '<button class="btn" id="mFlip">🃏 Sin opciones</button>';
    const controls = document.createElement('div'); controls.className = 'modebar';
    controls.innerHTML =
      '<select class="btn" id="fsel" aria-label="Filtro">' +
      '<option value="pendientes">Pendientes</option><option value="todas">Todas</option>' +
      '<option value="rep">Solo 🔁 repetidas</option><option value="warn">Solo ⚠️ dudosas</option><option value="star">Solo ⭐ últimos vistos</option>' +
      '<option value="dominadas">Ya dominadas</option></select>' +
      '<button class="btn" id="shuf" aria-pressed="' + shuffle + '">Aleatorio</button>' +
      '<button class="btn" id="reset">Reiniciar progreso</button>' +
      '<select class="btn" id="tsel" aria-label="Contrarreloj"><option value="0">⏱ Sin tiempo</option>' +
      '<option value="15">⏱ 15 s</option><option value="30">⏱ 30 s</option><option value="60">⏱ 60 s</option></select>';
    const timerEl = document.createElement('div'); timerEl.className = 'timer'; timerEl.hidden = true;
    const cardEl = document.createElement('div'); cardEl.className = 'card';
    const actions = document.createElement('div'); actions.className = 'pactions';
    wrap.append(modes, stats, bar, controls, timerEl, cardEl, actions);

    function setTime(t) { timerEl.textContent = '⏱ ' + QuizCore.formatTime(t); timerEl.classList.toggle('low', t <= 5); }
    function stopTimer() { if (activeTimer) { activeTimer.stop(); activeTimer = null; } timerEl.hidden = true; }
    function startTimer(c) {
      stopTimer(); if (!tiempo) return;
      timerEl.hidden = false; setTime(tiempo);
      activeTimer = QuizCore.createCountdown(tiempo, setTime, () => { activeTimer = null; timeout(c); });
    }
    function timeout(c) {
      if (withOpts) { if (optCtl && !optCtl.done) { optCtl.reveal(); answered(c, false, true); } }
      else if (!shown) flip();
    }

    function syncModes() {
      modes.querySelector('#mOpt').setAttribute('aria-pressed', withOpts);
      modes.querySelector('#mFlip').setAttribute('aria-pressed', !withOpts);
    }
    function build() {
      deck = all.map((c, i) => i).filter(i => {
        const c = all[i];
        if (withOpts && !c.opts) return false;
        if (filter === 'pendientes') return !known.has(c.title);
        if (filter === 'dominadas') return known.has(c.title);
        if (filter === 'rep') return c.title.includes('🔁');
        if (filter === 'warn') return c.title.includes('⚠️');
        if (filter === 'star') return c.title.includes('⭐');
        return true;
      });
      if (shuffle) deck = QuizCore.shuffle(deck);
      idx = 0; shown = false; draw();
    }
    function draw() {
      const n = all.filter(c => known.has(c.title)).length;
      const withCount = all.filter(c => c.opts).length;
      stats.innerHTML = '<span><b>' + n + '</b> / ' + all.length + ' dominadas</span>' +
        '<span>Mazo: ' + (deck.length ? (Math.min(idx + 1, deck.length) + ' de ' + deck.length) : '0') + '</span>' +
        (withOpts ? '<span>' + withCount + ' con opciones</span><span class="kbd">1–4: elegir · →: siguiente</span>'
                  : '<span class="kbd">Espacio: voltear · 1: repasar · 2: lo sé · →: saltar</span>');
      bar.firstChild.style.width = (all.length ? (100 * n / all.length) : 0) + '%';
      cardEl.innerHTML = ''; actions.innerHTML = ''; optCtl = null; stopTimer();
      if (!deck.length || idx >= deck.length) {
        cardEl.innerHTML = '<div class="empty">' + (deck.length ? '¡Terminaste este mazo! 🎉' : 'No hay tarjetas con este filtro.') +
          '<br><br><button class="btn primary" id="again">Volver a barajar</button></div>';
        cardEl.querySelector('#again').onclick = build; return;
      }
      const c = all[deck[idx]];
      cardEl.classList.toggle('known', known.has(c.title));
      const tag = document.createElement('div'); tag.className = 'tag'; tag.textContent = c.section;
      const h = document.createElement('h3'); h.textContent = c.title;
      cardEl.append(tag, h); c.front.forEach(nd => cardEl.appendChild(nd.cloneNode(true)));
      wrapTables(cardEl);
      if (withOpts) {
        optCtl = renderOptions(cardEl, QuizCore.shuffleOptions(c.opts), (i, ok) => answered(c, ok, false));
        actions.append(mk('Saltar →', '', next));
      } else if (shown) {
        showAnswer(cardEl, c);
        actions.append(mk('Repasar otra vez', 'warn', () => mark(false)), mk('¡Lo sé!', 'good', () => mark(true)));
      } else {
        actions.append(mk('Mostrar respuesta', 'primary', flip), mk('Saltar →', '', next));
      }
      if (withOpts || !shown) startTimer(c);
    }
    function answered(c, ok, timeout) {
      stopTimer();
      if (ok) known.add(c.title); else { known.delete(c.title); deck.push(deck[idx]); }
      store.set(key, Array.from(known));
      showAnswer(cardEl, c, timeout ? '⏰ <b>Tiempo agotado.</b>' : (ok ? '✅ <b>¡Correcto!</b>' : '❌ <b>Incorrecto.</b>'));
      actions.innerHTML = ''; actions.append(mk('Siguiente →', 'primary', next));
    }
    function mk(t, cls, fn) { const b = document.createElement('button'); b.className = 'btn ' + cls; b.textContent = t; b.onclick = fn; return b; }
    function flip() { shown = true; draw(); }
    function next() { idx++; shown = false; draw(); window.scrollTo({ top: 0 }); }
    function mark(ok) {
      const t = all[deck[idx]].title;
      if (ok) known.add(t); else { known.delete(t); deck.push(deck[idx]); }
      store.set(key, Array.from(known)); next();
    }
    modes.querySelector('#mOpt').onclick = () => { withOpts = true; store.set('conOpciones', true); syncModes(); build(); };
    modes.querySelector('#mFlip').onclick = () => { withOpts = false; store.set('conOpciones', false); syncModes(); build(); };
    controls.querySelector('#fsel').value = filter;
    controls.querySelector('#tsel').value = String(tiempo);
    controls.querySelector('#tsel').onchange = e => { tiempo = +e.target.value; store.set('tiempoTarjeta', tiempo); draw(); };
    controls.querySelector('#fsel').onchange = e => { filter = e.target.value; store.set('filter:' + path, filter); build(); };
    controls.querySelector('#shuf').onclick = e => { shuffle = !shuffle; store.set('shuffle', shuffle); e.target.setAttribute('aria-pressed', shuffle); build(); };
    controls.querySelector('#reset').onclick = () => { if (confirm('¿Borrar tu progreso de este mazo?')) { known = new Set(); store.set(key, []); build(); } };
    keyHandler = e => {
      if (e.target.tagName === 'SELECT' || e.ctrlKey || e.metaKey) return;
      if (withOpts) {
        if (optCtl && !optCtl.done && /^[1-4]$/.test(e.key)) { const i = +e.key - 1; const b = cardEl.querySelectorAll('.opt')[i]; if (b) optCtl.choose(i); }
        else if (e.key === 'ArrowRight' || e.key === 'Enter') next();
        return;
      }
      if (e.key === ' ') { e.preventDefault(); if (!shown) flip(); }
      else if (e.key === 'ArrowRight') next();
      else if (shown && e.key === '1') mark(false);
      else if (shown && e.key === '2') mark(true);
    };
    syncModes(); build();
    return wrap;
  }

  let keyHandler = null;
  let activeTimer = null;
  document.addEventListener('keydown', e => { if (keyHandler) keyHandler(e); });

  // ---------- modo examen ----------
  const DECKS = [
    ['Flashcards_Parcial2_ARC115.md', 'Preguntas de parciales'],
    ['Flashcards_Teoria_Diapositivas.md', 'Teoría de la diapositiva'],
    ['Ejercicios_Diapositiva.md', 'Ejercicios de la diapositiva']
  ];
  const PER_Q = [[0, 'Sin límite'], [30, '30 s por pregunta'], [60, '1 min por pregunta'], [120, '2 min por pregunta']];

  function exam() {
    const root = document.createElement('div'); root.className = 'exam';
    const cfg = store.get('examCfg', { decks: DECKS.map(d => d[0]), count: 10, perQ: 0 });

    function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
    async function loadCards(paths) {
      const out = [];
      for (const p of paths) out.push(...extractCards(render(await load(p), p), p));
      return out;
    }

    function setup() {
      root.innerHTML = '<h1>📝 Modo examen</h1><p class="muted">Responde como en el parcial: eliges una opción por pregunta y al final entregas para ver tu nota.</p>';
      const form = el('div', 'exam-setup');
      form.appendChild(el('h3', '', 'Mazos'));
      DECKS.forEach(([p, name]) => {
        const l = el('label', 'check');
        l.innerHTML = '<input type="checkbox" value="' + p + '"' + (cfg.decks.includes(p) ? ' checked' : '') + '> ' + name;
        form.appendChild(l);
      });
      form.appendChild(el('h3', '', 'Número de preguntas'));
      const cnt = el('select', 'btn'); [10, 20, 30, 9999].forEach(n => cnt.add(new Option(n === 9999 ? 'Todas' : String(n), n)));
      cnt.value = String(cfg.count); form.appendChild(cnt);
      form.appendChild(el('h3', '', '⏱ Contrarreloj'));
      const tim = el('select', 'btn'); PER_Q.forEach(([s, t]) => tim.add(new Option(t, s)));
      tim.value = String(cfg.perQ); form.appendChild(tim);
      const go = el('button', 'btn primary start', 'Comenzar');
      const sync = () => { go.disabled = !form.querySelectorAll('input:checked').length; };
      form.addEventListener('change', sync); sync();
      go.onclick = async () => {
        cfg.decks = Array.from(form.querySelectorAll('input:checked')).map(i => i.value);
        cfg.count = +cnt.value; cfg.perQ = +tim.value; store.set('examCfg', cfg);
        go.disabled = true; go.textContent = 'Cargando…';
        const cards = await loadCards(cfg.decks);
        start(QuizCore.buildExam(cards, cfg.count));
      };
      form.appendChild(el('div', '', '')).appendChild(go);
      root.appendChild(form);
    }

    function start(questions) {
      if (!questions.length) { root.innerHTML = '<h1>📝 Modo examen</h1><p>No hay preguntas con opciones en los mazos elegidos.</p>'; return; }
      const answers = new Array(questions.length);
      const total = cfg.perQ * questions.length;
      const t0 = Date.now();
      root.innerHTML = '';
      const barEl = el('div', 'exam-bar');
      const prog = el('span', 'exam-prog'); const clock = el('span', 'timer'); const send = el('button', 'btn primary', 'Entregar');
      barEl.append(prog, clock, send);
      root.append(el('h1', '', '📝 Examen'), barEl);
      const upd = () => { prog.textContent = 'Respondidas ' + answers.filter(a => a !== undefined).length + '/' + questions.length; };
      questions.forEach((q, qi) => {
        const box = el('section', 'exam-q');
        box.appendChild(el('div', 'tag', (qi + 1) + ' · ' + q.section));
        const h = el('h3'); h.textContent = q.title; box.appendChild(h);
        q.front.forEach(n => box.appendChild(n.cloneNode(true)));
        wrapTables(box);
        const opts = el('div', 'opts');
        q.opts.options.forEach((text, i) => {
          const b = el('button', 'opt', '<span class="opt-letter">' + LETTERS[i] + '</span>'); b.type = 'button';
          b.appendChild(document.createTextNode(text));
          b.onclick = () => { answers[qi] = i; opts.querySelectorAll('.opt').forEach((x, j) => x.classList.toggle('selected', j === i)); upd(); };
          opts.appendChild(b);
        });
        box.appendChild(opts); root.appendChild(box);
      });
      const send2 = el('button', 'btn primary', 'Entregar examen'); root.appendChild(el('div', 'pactions')).appendChild(send2);
      upd();
      let finished = false;
      const finish = (auto) => {
        if (finished) return;
        const blank = answers.filter(a => a === undefined).length;
        if (!auto && blank && !confirm('Tienes ' + blank + ' preguntas sin responder. ¿Entregar?')) return;
        finished = true;
        if (activeTimer) { activeTimer.stop(); activeTimer = null; }
        results(questions, answers, Math.round((Date.now() - t0) / 1000), auto);
      };
      send.onclick = () => finish(false); send2.onclick = () => finish(false);
      if (total) {
        clock.textContent = '⏱ ' + QuizCore.formatTime(total);
        activeTimer = QuizCore.createCountdown(total, t => { clock.textContent = '⏱ ' + QuizCore.formatTime(t); clock.classList.toggle('low', t <= 30); },
          () => { activeTimer = null; finish(true); });
      } else clock.textContent = '⏱ Sin límite';
      window.scrollTo({ top: 0 });
    }

    function results(questions, answers, secs, auto) {
      const r = QuizCore.gradeExam(questions, answers);
      root.innerHTML = '';
      root.appendChild(el('h1', '', '📝 Resultado'));
      const sum = el('div', 'result');
      sum.innerHTML = (auto ? '<p>⏰ <b>Se acabó el tiempo</b>: el examen se entregó automáticamente.</p>' : '') +
        '<p class="grade">Nota: <b>' + r.grade.toFixed(1) + '</b>/10</p>' +
        '<p>' + r.correct + ' de ' + r.total + ' correctas · ' + r.details.filter(d => d.blank).length + ' sin responder · tiempo usado ' + QuizCore.formatTime(secs) + '</p>';
      const again = el('div', 'pactions');
      const failed = questions.filter((q, i) => !r.details[i].ok);
      const bFail = el('button', 'btn warn', 'Repetir solo las falladas (' + failed.length + ')');
      bFail.disabled = !failed.length;
      bFail.onclick = () => start(QuizCore.shuffle(failed).map(q => Object.assign({}, q, { opts: QuizCore.shuffleOptions(q.opts) })));
      const bNew = el('button', 'btn primary', 'Nuevo examen'); bNew.onclick = setup;
      again.append(bFail, bNew); sum.appendChild(again); root.appendChild(sum);
      questions.forEach((q, qi) => {
        const d = r.details[qi];
        const box = el('section', 'exam-q ' + (d.ok ? 'ok' : 'bad'));
        box.appendChild(el('div', 'tag', (qi + 1) + ' · ' + (d.ok ? '✅ Correcta' : d.blank ? '⬜ Sin responder' : '❌ Incorrecta')));
        const h = el('h3'); h.textContent = q.title; box.appendChild(h);
        q.front.forEach(n => box.appendChild(n.cloneNode(true)));
        const opts = el('div', 'opts');
        q.opts.options.forEach((text, i) => {
          const b = el('button', 'opt', '<span class="opt-letter">' + LETTERS[i] + '</span>'); b.disabled = true; b.type = 'button';
          b.appendChild(document.createTextNode(text));
          if (i === d.correct) b.classList.add('correct'); else if (i === d.chosen) b.classList.add('wrong');
          opts.appendChild(b);
        });
        box.appendChild(opts);
        const det = el('details', '', '<summary>Ver explicación</summary>');
        q.back.forEach(n => det.appendChild(n.cloneNode(true)));
        box.appendChild(det); wrapTables(box);
        root.appendChild(box);
      });
      window.scrollTo({ top: 0 });
    }

    setup();
    return root;
  }

  // ---------- router ----------
  async function route() {
    const path = currentPath();
    const mode = new URLSearchParams(location.hash.split('?')[1] || '').get('modo');
    sidebar.classList.remove('open'); setActive(path); keyHandler = null;
    if (activeTimer) { activeTimer.stop(); activeTimer = null; }
    if (path === 'examen') {
      content.innerHTML = ''; content.appendChild(exam());
      document.title = 'ARC115 · Modo examen'; window.scrollTo({ top: 0 }); return;
    }
    try {
      const md = await load(path);
      const div = render(md, path);
      content.innerHTML = '';
      if (FLASH.includes(path)) {
        const h1 = div.querySelector('h1');
        const bar = document.createElement('div'); bar.className = 'modebar';
        const practiceMode = mode !== 'lista';
        bar.innerHTML = '<a class="btn" aria-pressed="' + practiceMode + '" href="#/' + path + '">🃏 Modo práctica</a>' +
          '<a class="btn" aria-pressed="' + !practiceMode + '" href="#/' + path + '?modo=lista">📄 Ver todas (lista)</a>';
        if (h1) content.appendChild(h1.cloneNode(true));
        content.appendChild(bar);
        if (practiceMode) content.appendChild(practice(path, div));
        else { if (h1) h1.remove(); content.appendChild(div); }
      } else content.appendChild(div);
      const h1now = content.querySelector('h1');
      document.title = h1now ? 'ARC115 · ' + h1now.textContent : 'ARC115 · Parcial 2';
      window.scrollTo({ top: 0 });
    } catch (err) {
      content.innerHTML = '<h1>No se pudo cargar</h1><p class="muted">' + err.message + '</p>';
    }
  }
  window.addEventListener('hashchange', route);
  route();
})();

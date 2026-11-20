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

  // ---------- router ----------
  async function route() {
    const path = currentPath();
    const mode = new URLSearchParams(location.hash.split('?')[1] || '').get('modo');
    sidebar.classList.remove('open'); setActive(path); keyHandler = null;
    if (activeTimer) { activeTimer.stop(); activeTimer = null; }
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

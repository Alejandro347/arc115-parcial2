// Lógica pura del quiz: sin DOM. Funciona en el navegador (window.QuizCore) y en Node (module.exports).
(function (root, factory) {
  const m = factory();
  if (typeof module === 'object' && module.exports) module.exports = m;
  else root.QuizCore = m;
})(this, function () {
  'use strict';

  const PREFIX = /^\s*[a-dA-D]\)\s*/;

  function parseOptions(text) {
    const lines = String(text).split('\n').map(l => l.trim()).filter(Boolean);
    if (lines[0] !== 'opciones') return null;
    const options = []; let correct = -1, stars = 0;
    for (const raw of lines.slice(1)) {
      let l = raw;
      if (l.startsWith('*')) { stars++; correct = options.length; l = l.slice(1); }
      options.push(l.replace(PREFIX, '').trim());
    }
    if (options.length < 2 || stars !== 1) return null;
    return { options, correct };
  }

  function shuffle(arr, rng = Math.random) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function isTrueFalse(q) {
    return q.options.length === 2 && q.options[0] === 'Verdadero' && q.options[1] === 'Falso';
  }

  function shuffleOptions(q, rng = Math.random) {
    if (isTrueFalse(q)) return { options: q.options.slice(), correct: q.correct };
    const order = shuffle(q.options.map((_, i) => i), rng);
    return { options: order.map(i => q.options[i]), correct: order.indexOf(q.correct) };
  }

  function buildExam(cards, count, rng = Math.random) {
    return shuffle(cards.filter(c => c && c.opts), rng)
      .slice(0, Math.max(0, count))
      .map(c => Object.assign({}, c, { opts: shuffleOptions(c.opts, rng) }));
  }

  function gradeExam(questions, answers) {
    const details = questions.map((q, i) => {
      const chosen = answers[i];
      const blank = chosen === undefined || chosen === null;
      return { chosen: blank ? undefined : chosen, correct: q.opts.correct, ok: !blank && chosen === q.opts.correct, blank };
    });
    const correct = details.filter(d => d.ok).length;
    const total = questions.length;
    const grade = total ? Math.round((100 * correct) / total) / 10 : 0;
    return { correct, total, grade, details };
  }

  function fold(t) { return String(t).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
  function matchesQuery(text, query) {
    const q = fold(query).trim();
    return !q || fold(text).includes(q);
  }

  function countBlank(answers, n) {
    let k = 0;
    for (let i = 0; i < n; i++) if (answers[i] === undefined || answers[i] === null) k++;
    return k;
  }

  function formatTime(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }

  function createCountdown(seconds, onTick, onEnd, clock) {
    const c = clock || { setInterval: (f, ms) => setInterval(f, ms), clearInterval: id => clearInterval(id) };
    let left = seconds, done = false;
    const id = c.setInterval(() => {
      if (done) return;
      left -= 1;
      onTick(left);
      if (left <= 0) { done = true; c.clearInterval(id); onEnd(); }
    }, 1000);
    return { stop() { if (!done) { done = true; c.clearInterval(id); } } };
  }

  return { matchesQuery, countBlank, parseOptions, shuffle, shuffleOptions, buildExam, gradeExam, formatTime, createCountdown };
});

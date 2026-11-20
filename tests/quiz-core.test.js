'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const Q = require('../assets/quiz-core.js');

test('parseOptions lee opciones con letras y marca la correcta', () => {
  assert.deepEqual(
    Q.parseOptions('opciones\na) Reemplazo\n*b) Identificación\nc) Ubicación\nd) Escritura'),
    { options: ['Reemplazo', 'Identificación', 'Ubicación', 'Escritura'], correct: 1 }
  );
});

test('parseOptions lee V/F', () => {
  assert.deepEqual(Q.parseOptions('opciones\nVerdadero\n*Falso'), { options: ['Verdadero', 'Falso'], correct: 1 });
});

test('parseOptions rechaza bloques inválidos', () => {
  assert.equal(Q.parseOptions('otra cosa'), null);
  assert.equal(Q.parseOptions('opciones\n*a) x'), null);
  assert.equal(Q.parseOptions('opciones\n*a) x\n*b) y'), null);
  assert.equal(Q.parseOptions('opciones\na) x\nb) y'), null);
});

test('shuffleOptions conserva el texto de la correcta', () => {
  const q = { options: ['Reemplazo', 'Identificación', 'Ubicación', 'Escritura'], correct: 1 };
  const reverseRng = () => 0; // Fisher–Yates con j=0 siempre: desordena
  const s = Q.shuffleOptions(q, reverseRng);
  assert.equal(s.options[s.correct], 'Identificación');
  assert.notDeepEqual(s.options, q.options);
  assert.deepEqual(q.options, ['Reemplazo', 'Identificación', 'Ubicación', 'Escritura']); // sin mutar
});

test('shuffleOptions no baraja V/F', () => {
  const s = Q.shuffleOptions({ options: ['Verdadero', 'Falso'], correct: 0 }, () => 0);
  assert.deepEqual(s, { options: ['Verdadero', 'Falso'], correct: 0 });
});

test('buildExam solo usa tarjetas con opciones y no pasa de las disponibles', () => {
  const opts = { options: ['a', 'b'], correct: 0 };
  const cards = [
    { title: 'A', opts }, { title: 'B', opts: null }, { title: 'C', opts },
    { title: 'D', opts: null }, { title: 'E', opts }
  ];
  const ex = Q.buildExam(cards, 10);
  assert.equal(ex.length, 3);
  assert.equal(new Set(ex.map(c => c.title)).size, 3);
  assert.ok(ex.every(c => c && c.opts));
  assert.equal(Q.buildExam(cards, 2).length, 2);
});

test('gradeExam califica, cuenta en blanco y da nota sobre 10', () => {
  const qs = [
    { opts: { options: ['a', 'b'], correct: 1 } },
    { opts: { options: ['a', 'b'], correct: 0 } },
    { opts: { options: ['a', 'b', 'c'], correct: 2 } }
  ];
  const r = Q.gradeExam(qs, [1, undefined, 0]);
  assert.equal(r.correct, 1);
  assert.equal(r.total, 3);
  assert.equal(r.grade, 3.3);
  assert.equal(r.details[0].ok, true);
  assert.equal(r.details[1].blank, true);
  assert.equal(r.details[1].ok, false);
  assert.equal(r.details[2].ok, false);
  assert.equal(r.details[2].blank, false);
});

test('gradeExam de examen vacío da 0', () => {
  assert.equal(Q.gradeExam([], []).grade, 0);
});

test('formatTime da mm:ss y no baja de cero', () => {
  assert.equal(Q.formatTime(75), '01:15');
  assert.equal(Q.formatTime(-3), '00:00');
});

test('createCountdown hace tick, termina una vez y se puede detener', () => {
  let cb = null, cleared = false;
  const clock = { setInterval: (f) => { cb = f; return 1; }, clearInterval: () => { cleared = true; } };
  const ticks = []; let ends = 0;
  Q.createCountdown(2, t => ticks.push(t), () => ends++, clock);
  cb(); cb(); cb();
  assert.deepEqual(ticks, [1, 0]);
  assert.equal(ends, 1);
  assert.ok(cleared);

  let cb2 = null; const t2 = []; let e2 = 0;
  const c2 = Q.createCountdown(5, t => t2.push(t), () => e2++, { setInterval: f => { cb2 = f; return 2; }, clearInterval: () => {} });
  cb2(); c2.stop(); cb2(); cb2();
  assert.deepEqual(t2, [4]);
  assert.equal(e2, 0);
});

test('countBlank cuenta huecos aunque el arreglo sea disperso', () => {
  const a = new Array(10); a[0] = 1; a[3] = 0; a[5] = 2;
  assert.equal(Q.countBlank(a, 10), 7);
  assert.equal(Q.countBlank([], 3), 3);
});

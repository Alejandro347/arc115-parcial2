'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Q = require('../assets/quiz-core.js');

const DECKS = {
  'Flashcards_Parcial2_ARC115.md': 72,
  'Flashcards_Teoria_Diapositivas.md': 45,
  'Ejercicios_Diapositiva.md': 17
};

function cards(md) {
  return md.split(/^### /m).slice(1)
    .filter(sec => sec.includes('<details>'))
    .map(sec => ({ title: sec.split('\n')[0], body: sec }));
}

for (const [file, expected] of Object.entries(DECKS)) {
  test(file + ': cada tarjeta tiene opciones válidas', () => {
    const md = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    const cs = cards(md);
    assert.equal(cs.length, expected, 'número de tarjetas');
    for (const c of cs) {
      const m = c.body.match(/<!--(opciones[\s\S]*?)-->/);
      assert.ok(m, 'sin bloque de opciones: ' + c.title);
      assert.ok(m.index < c.body.indexOf('<details>'), 'opciones después de <details>: ' + c.title);
      const o = Q.parseOptions(m[1]);
      assert.ok(o, 'bloque inválido: ' + c.title);
      const tf = o.options.length === 2 && o.options[0] === 'Verdadero' && o.options[1] === 'Falso';
      if (!tf) assert.equal(o.options.length, 4, 'debe tener 4 opciones: ' + c.title);
      assert.equal(new Set(o.options).size, o.options.length, 'opciones repetidas: ' + c.title);
      for (const t of o.options) assert.ok(t.length <= 120, 'opción > 120 caracteres: ' + c.title + ' → ' + t);
    }
  });
}

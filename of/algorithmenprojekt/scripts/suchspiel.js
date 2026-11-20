(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const names = ['Mia', 'Luca', 'Sofia', 'Noah', 'Elina', 'Leon', 'Amira', 'Finn', 'Lina', 'Elias', 'Nora', 'Ben', 'Lea', 'Jonas', 'Aylin', 'Tim', 'Emma', 'Milan', 'Zoe', 'David', 'Alina', 'Liam', 'Sara', 'Nico', 'Jana', 'Matteo', 'Ella', 'Robin', 'Yara', 'Jan'];
  const numbers = Array.from({
    length: 99
  }, (_, i) => String(i + 1));
  let mode = 'names',
    ownPending = false,
    items = [],
    ordered = [],
    target = '',
    tries = 0,
    startTime = 0,
    timer = null,
    finished = false,
    results = [],
    lastTarget = null;
  const format = s => s.toFixed(1).replace('.', ',') + ' s';
  const elapsed = () => (performance.now() - startTime) / 1000;
  const setMode = m => {
    mode = m;
    ownPending = false;
    $('own').textContent = 'Eigene Liste';
    $('entries').value = (m === 'numbers' ? numbers : names).join('\n');
    $('entries').disabled = m === 'numbers';
    $('info').textContent = (m === 'numbers' ? 'Zahlenraten von 1 bis 99 (ohne Liste)' : '30 Demo-Vornamen') + '.';
    ['demoNumbers', 'demoNames', 'own'].forEach(id => $(id).classList.remove('active'));
    $(m === 'numbers' ? 'demoNumbers' : 'demoNames').classList.add('active');
    $('error').textContent = '';
  };
  for (let i = 1; i <= 12; i++) {
    const o = document.createElement('option');
    o.value = String(i);
    o.textContent = new Intl.DateTimeFormat('de-CH', {
      month: 'long'
    }).format(new Date(2024, i - 1, 1));
    $('month').append(o);
  }
  $('demoNumbers').addEventListener('click', () => setMode('numbers'));
  $('demoNames').addEventListener('click', () => setMode('names'));
  $('own').addEventListener('click', () => {
    if (!ownPending) {
      mode = 'own';
      ownPending = true;
      $('entries').value = '';
      $('entries').disabled = false;
      $('own').textContent = 'Einlesen';
      $('info').textContent = 'Füge eine eigene Liste ein (ein Element pro Zeile).';
      ['demoNumbers', 'demoNames', 'own'].forEach(id => $(id).classList.remove('active'));
      $('own').classList.add('active');
      $('entries').focus();
    } else {
      const arr = readItems();
      if (arr.length < 2) {
        $('error').textContent = 'Bitte mindestens zwei verschiedene Einträge eingeben.';
        return;
      }
      $('info').textContent = arr.length + ' Einträge eingelesen.';
      $('own').textContent = 'Eigene Liste';
      ownPending = false;
      $('error').textContent = '';
    }
  });
  function readItems() {
    return $('entries').value.split(/\r?\n/).map(x => x.trim()).filter(Boolean);
  }
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function start() {
    const raw = readItems();
    const month = Number($('month').value);
    if (!month) {
      $('error').textContent = 'Bitte wählen Sie Ihren Geburtsmonat.';
      return;
    }
    if (mode !== 'numbers' && (raw.length < 2 || raw.length > 300)) {
      $('error').textContent = 'Bitte 2 bis 300 Einträge verwenden.';
      return;
    }
    if (mode !== 'numbers' && new Set(raw.map(x => x.toLocaleLowerCase('de-CH'))).size !== raw.length) {
      $('error').textContent = 'Die Liste enthält doppelte Einträge. Bitte unterscheidbar benennen.';
      return;
    }
    $('error').textContent = '';
    items = raw.slice();
    $('setup').classList.add('hidden');
    $('game').classList.remove('hidden');
    newRound();
  }
  function newRound() {
    clearInterval(timer);
    finished = false;
    tries = 0;
    $('attempts').textContent = '0';
    $('clock').textContent = '0,0 s';
    $('feedback').textContent = '';
    $('feedback').className = '';
    $('next').classList.add('hidden');
    $('guessLog').replaceChildren();
    const numeric = mode === 'numbers';
    $('tiles').classList.toggle('hidden', numeric);
    $('numberForm').classList.toggle('hidden', !numeric);
    $('guessLog').classList.toggle('hidden', !numeric);
    if (numeric) {
      const options = numbers.filter(x => x !== lastTarget);
      target = options[Math.floor(Math.random() * options.length)] || '50';
      lastTarget = target;
      $('instruction').textContent = 'Ich denke mir eine Zahl zwischen 1 und 99. Welche ist es?';
      $('numberGuess').value = '';
      $('numberGuess').disabled = false;
      $('numberForm').querySelector('button').disabled = false;
      $('numberGuess').focus();
    } else {
      const sorted = Number($('month').value) % 2 === 0;
      ordered = items.slice().sort((a, b) => a.localeCompare(b, 'de-CH', {
        sensitivity: 'base'
      }));
      if (!sorted) shuffle(ordered);
      const choices = items.filter(x => x !== lastTarget);
      target = choices[Math.floor(Math.random() * choices.length)] || items[0];
      lastTarget = target;
      $('instruction').textContent = 'Finden Sie ' + target + '!\nKlicken Sie auf ein Feld, um den Namen aufzudecken.';
      $('tiles').replaceChildren();
      ordered.forEach(value => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'tile';
        b.textContent = '';
        b.setAttribute('aria-label', 'Verdecktes Feld');
        b.addEventListener('click', () => reveal(b, value));
        $('tiles').append(b);
      });
    }
    startTime = performance.now();
    timer = setInterval(() => {
      if (!finished) $('clock').textContent = format(elapsed());
    }, 100);
  }
  function complete() {
    finished = true;
    clearInterval(timer);
    const sec = elapsed();
    $('clock').textContent = format(sec);
    $('feedback').className = 'result';
    $('feedback').textContent = 'Volltreffer! ' + tries + ' Versuch' + (tries === 1 ? '' : 'e') + ' in ' + format(sec) + '.';
    $('next').classList.remove('hidden');
    results.push({
      kind: mode === 'numbers' ? 'Zahlen' : 'Namen',
      order: mode === 'numbers' ? '–' : Number($('month').value) % 2 === 0 ? 'O' : 'U',
      tries,
      sec
    });
    renderHistory();
  }
  function reveal(b, value) {
    if (finished || b.disabled) return;
    tries++;
    $('attempts').textContent = String(tries);
    b.textContent = value;
    b.disabled = true;
    if (value === target) {
      b.classList.add('right');
      $('tiles').querySelectorAll('button').forEach(x => x.disabled = true);
      complete();
    } else {
      b.classList.add('wrong');
      $('feedback').textContent = 'Noch nicht gefunden.';
    }
  }
  $('numberForm').addEventListener('submit', e => {
    e.preventDefault();
    if (finished) return;
    const input = $('numberGuess');
    const raw = input.value.trim();
    const n = Number(raw);
    if (!raw || !Number.isInteger(n) || n < 1 || n > 99) {
      $('feedback').className = 'error';
      $('feedback').textContent = 'Bitte eine ganze Zahl von 1 bis 99 eingeben.';
      return;
    }
    tries++;
    $('attempts').textContent = String(tries);
    const verdict = n === Number(target) ? 'Volltreffer!' : n > Number(target) ? 'Zu gross' : 'Zu klein';
    const li = document.createElement('li');
    li.textContent = n + ' – ' + verdict;
    $('guessLog').append(li);
    $('feedback').className = '';
    if (n === Number(target)) {
      input.disabled = true;
      $('numberForm').querySelector('button').disabled = true;
      complete();
    } else {
      $('feedback').textContent = verdict + '!';
      input.value = '';
      input.focus();
    }
  });
  function renderHistory() {
    $('history').replaceChildren();
    results.forEach((r, i) => {
      const tr = document.createElement('tr');
      [i + 1, r.kind, r.order, r.tries, format(r.sec)].forEach(x => {
        const td = document.createElement('td');
        td.textContent = String(x);
        tr.append(td);
      });
      $('history').append(tr);
    });
  }
  $('start').addEventListener('click', start);
  $('next').addEventListener('click', newRound);
  $('back').addEventListener('click', () => {
    clearInterval(timer);
    $('game').classList.add('hidden');
    $('setup').classList.remove('hidden');
  });
  setMode('names');
})();

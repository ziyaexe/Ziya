// ===== Short Boot Sequence =====
const bootLines = [
  '>>> ZIYA.EXE bootloader v1.0',
  'System status: ONLINE'
];
const boot = document.getElementById('boot');
const bootLog = document.getElementById('bootLog');

const typeLine = (text) =>
  new Promise((res) => {
    const line = document.createElement('div');
    const span = document.createElement('span');
    span.className = 'type';
    line.appendChild(span);
    bootLog.appendChild(line);
    let i = 0;
    const tick = () => {
      span.textContent = text.slice(0, i++);
      if (i <= text.length) requestAnimationFrame(tick);
      else { span.classList.remove('type'); res(); }
    };
    tick();
  });

(async () => {
  for (const l of bootLines) {
    // eslint-disable-next-line no-await-in-loop
    await typeLine(l);
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 150));
    bootLog.scrollTop = bootLog.scrollHeight;
  }
  await new Promise((r) => setTimeout(r, 250));
  boot.style.opacity = '0';
  setTimeout(() => boot.remove(), 500);

  // Animate skill bars once boot finishes
  document.querySelectorAll('.bar > span').forEach((el) => {
    const pct = el.style.getPropertyValue('--pct') || '70%';
    requestAnimationFrame(() => { el.style.width = pct; });
  });
})();

// ===== Matrix Rain =====
(function () {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  const symbols =
    'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ0123456789';
  let cols, drops, w, h, fontSize;

  const resize = () => {
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    w = (canvas.width = Math.floor(innerWidth * dpr));
    h = (canvas.height = Math.floor(innerHeight * dpr));
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    fontSize = Math.max(12, Math.floor(16 * dpr));
    cols = Math.floor(w / fontSize);
    drops = new Array(cols).fill(0).map(() => Math.floor(Math.random() * h));
    ctx.font = fontSize + 'px monospace';
  };
  resize();
  addEventListener('resize', resize);

  function draw(ts) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < cols; i++) {
      const char = symbols[Math.floor(Math.random() * symbols.length)];
      ctx.fillStyle = i % 10 === 0 ? 'rgba(255,0,193,0.9)' : 'rgba(0,255,249,0.9)';
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

// ===== VHS Noise (procedural static) =====
(function () {
  const canvas = document.getElementById('noiseCanvas');
  const ctx = canvas.getContext('2d');
  const resize = () => {
    const dpr = Math.max(1, Math.min(devicePixelRatio || 1, 2));
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
  };
  resize();
  addEventListener('resize', resize);

  function frame() {
    const img = ctx.createImageData(canvas.width, canvas.height);
    const data = img.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = data[i + 1] = data[i + 2] = v;
      data[i + 3] = Math.random() * 18; // low alpha for subtle static
    }
    ctx.putImageData(img, 0, 0);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// ===== Konami Code (↑↑↓↓←→←→BA) =====
(function () {
  const sequence = [
    'ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'
  ];
  let idx = 0;
  const toast = document.getElementById('toast');

  const enableHackMode = () => {
    document.documentElement.style.setProperty('--text', '#ffffff');
    document.body.animate(
      [{ filter: 'hue-rotate(0deg)' }, { filter: 'hue-rotate(360deg)' }],
      { duration: 1200 }
    );
    toast.textContent = 'HACK MODE ENABLED • Access Granted';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
  };

  addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === sequence[idx]) {
      idx++;
      if (idx === sequence.length) {
        enableHackMode();
        idx = 0;
      }
    } else {
      idx = 0;
    }
  });
})();

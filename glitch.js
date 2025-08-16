// Minor glitch effect for header text (for fun)
window.onload = function () {
  const glitchEl = document.querySelector('.glitch');
  if (!glitchEl) return;
  let originalText = glitchEl.textContent;

  function glitchText() {
    let chars = '!@#$%^&*<>?/|\\~';
    let glitched = '';
    for (let i = 0; i < originalText.length; i++) {
      if (Math.random() < 0.12) {
        glitched += chars[Math.floor(Math.random() * chars.length)];
      } else {
        glitched += originalText[i];
      }
    }
    glitchEl.textContent = glitched;
    setTimeout(() => {
      glitchEl.textContent = originalText;
    }, 150);
  }

  setInterval(glitchText, 1800);
};

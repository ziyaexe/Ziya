document.addEventListener('DOMContentLoaded', () => {
    // Boot Screen Sequence
    const bootScreen = document.getElementById('boot-screen');
    const progress = document.querySelector('.progress');
    const bootText = document.querySelector('.boot-text');
    
    const bootSequence = [
        { text: 'Initializing system...', progress: 10 },
        { text: 'Loading core modules...', progress: 25 },
        { text: 'Establishing secure connection...', progress: 40 },
        { text: 'Mounting cyberdeck drives...', progress: 60 },
        { text: 'Running security protocols...', progress: 75 },
        { text: 'Accessing neural network...', progress: 90 },
        { text: 'System ready.', progress: 100 }
    ];

    let currentStep = 0;

    function runBootSequence() {
        if (currentStep < bootSequence.length) {
            const step = bootSequence[currentStep];
            bootText.textContent = step.text;
            progress.style.width = `${step.progress}%`;
            currentStep++;
            setTimeout(runBootSequence, 800);
        } else {
            setTimeout(() => {
                bootScreen.style.opacity = '0';
                document.body.classList.remove('loading');
                setTimeout(() => {
                    bootScreen.style.display = 'none';
                }, 1000);
            }, 500);
        }
    }

    runBootSequence();

    // Matrix Rain Effect
    const canvas = document.getElementById('matrix-rain');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01ZIYAEXE♟️💪⚽💻SECURITY'.split('');
    const drops = [];
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);

    // Scroll Animation
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1 }
    );

    sections.forEach(section => observer.observe(section));

    // Glitch Text Effect
    function createGlitchEffect(element) {
        const text = element.textContent;
        let glitchInterval;

        element.addEventListener('mouseover', () => {
            glitchInterval = setInterval(() => {
                const glitchedText = text.split('').map(char => {
                    return Math.random() > 0.9 ? 
                        chars[Math.floor(Math.random() * chars.length)] : char;
                }).join('');
                element.textContent = glitchedText;
            }, 50);
        });

        element.addEventListener('mouseout', () => {
            clearInterval(glitchInterval);
            element.textContent = text;
        });
    }

    document.querySelectorAll('.cyber-glitch').forEach(createGlitchEffect);

    // Skill Bars Animation
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = `${level}%`;
        }, 500);
    });

    // Visitor Counter
    const visitorCount = document.getElementById('visitor-count');
    let count = 0;
    const targetCount = Math.floor(Math.random() * 1000) + 500;

    function updateCounter() {
        if (count < targetCount) {
            count += Math.floor(Math.random() * 10) + 1;
            if (count > targetCount) count = targetCount;
            visitorCount.textContent = `> ${count} hackers connected`;
            requestAnimationFrame(updateCounter);
        }
    }

    updateCounter();

    // Parallax Effect
    window.addEventListener('mousemove', (e) => {
        const cityscape = document.querySelector('.parallax-cityscape');
        const grid = document.querySelector('.parallax-grid');
        
        const mouseX = (window.innerWidth / 2 - e.clientX) / 50;
        const mouseY = (window.innerHeight / 2 - e.clientY) / 50;

        cityscape.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        grid.style.transform = `rotateX(45deg) translate(${mouseX * 2}px, ${mouseY * 2}px)`;
    });

    // Easter Egg: Konami Code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateMatrixMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateMatrixMode() {
        document.body.style.animation = 'matrix-effect 2s linear';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }

    // Window Resize Handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

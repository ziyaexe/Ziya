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
                    initializeSkillBars();
                }, 1000);
            }, 500);
        }
    }

    runBootSequence();

    // Initialize Skill Bars
    function initializeSkillBars() {
        document.querySelectorAll('.skill-bar').forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.setProperty('--skill-level', `${level}%`);
            bar.style.width = `${level}%`;
        });
    }

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

    // Window Resize Handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

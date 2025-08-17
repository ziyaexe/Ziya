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
            bar.style.width = `${level}%`;
        });
    }

    // Matrix Rain Effect
    const canvas = document.getElementById('matrix-rain');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = '01ZIYAEXE♟️💪⚽💻SECURITY'.split('');
    const drops = Array(Math.ceil(window.innerWidth / 16)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = '16px monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * 16, drops[i] * 16);

            if (drops[i] * 16 > canvas.height && Math.random() > 0.975) {
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

    // Typing Effect
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Project Cards Hover Effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.card-inner').style.transform = 'rotateY(180deg)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.card-inner').style.transform = 'rotateY(0)';
        });
    });

    // Visitor Counter
    const visitorCount = document.getElementById('visitor-count');
    let count = 0;
    const targetCount = Math.floor(Math.random() * 1000) + 500;

    function updateCounter() {
        if (count < targetCount) {
            count += Math.floor(Math.random() * 10) + 1;
            if (count > targetCount) count = targetCount;
            visitorCount.textContent = `> ${count} hackers connected | Last Update: 2025-08-17 08:01:52 UTC`;
            requestAnimationFrame(updateCounter);
        }
    }

    updateCounter();

    // Parallax Effect
    document.addEventListener('mousemove', (e) => {
        const cityscape = document.querySelector('.parallax-cityscape');
        const grid = document.querySelector('.parallax-grid');
        
        const mouseX = (window.innerWidth / 2 - e.clientX) / 50;
        const mouseY = (window.innerHeight / 2 - e.clientY) / 50;

        if (cityscape && grid) {
            cityscape.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            grid.style.transform = `rotateX(45deg) translate(${mouseX * 2}px, ${mouseY * 2}px)`;
        }
    });

    // Easter Egg: Konami Code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.style.animation = 'matrix-mode 2s linear';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 2000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        drops.length = Math.ceil(window.innerWidth / 16);
        drops.fill(1);
    });

    // Initialize everything when the page loads
    window.addEventListener('load', () => {
        initializeSkillBars();
        document.querySelectorAll('.typing-effect p').forEach(p => {
            typeWriter(p, p.textContent);
        });
    });
});

// Add this to your CSS if not already present
const style = document.createElement('style');
style.textContent = `
@keyframes matrix-mode {
    0% { filter: hue-rotate(0deg); }
    50% { filter: hue-rotate(180deg); }
    100% { filter: hue-rotate(360deg); }
}
`;
document.head.appendChild(style);

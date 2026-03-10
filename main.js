document.addEventListener('DOMContentLoaded', () => {
    
    // --- Loader Removal ---
    const loader = document.getElementById('loader');
    const wrapper = document.querySelector('.wrapper');

    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        setTimeout(() => {
            wrapper.classList.add('loaded');
        }, 300); 

    }, 2000); 


    // --- 3D Tilt Interaction ---
    const card = document.getElementById('business-card');
    const shine = document.querySelector('.shine');
    
    const isHoverableDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (isHoverableDevice) {
        document.addEventListener('mousemove', (e) => {
            if (!wrapper.classList.contains('loaded')) return;

            const x = window.innerWidth / 2 - e.pageX;
            const y = window.innerHeight / 2 - e.pageY;
            
            // Subtler tilt for a professional feel
            const xAxis = x / 40; 
            const yAxis = -y / 40;

            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            
            const angle = Math.atan2(y, x) * (180 / Math.PI) - 90;
            shine.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`;
        });

        document.addEventListener('mouseleave', () => {
            if (!wrapper.classList.contains('loaded')) return;
            
            card.style.transition = 'all 0.5s ease';
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
            shine.style.opacity = '0';
            
            setTimeout(() => {
                card.style.transition = 'all 0.1s ease-out';
            }, 500);
        });
    }

    // --- Language Toggle Logic ---
    const btnKo = document.getElementById('btn-ko');
    const btnEn = document.getElementById('btn-en');
    const translatables = document.querySelectorAll('[data-ko]');
    
    let currentLang = 'ko';

    function setLanguage(lang, initial = false) {
        if (!initial && currentLang === lang) return;
        currentLang = lang;

        // Update active class
        if (lang === 'ko') {
            btnKo.classList.add('active');
            btnEn.classList.remove('active');
            document.documentElement.lang = 'ko';
        } else {
            btnEn.classList.add('active');
            btnKo.classList.remove('active');
            document.documentElement.lang = 'en';
        }

        if (initial) {
            translatables.forEach(el => {
                el.textContent = el.getAttribute(`data-${lang}`);
            });
            return;
        }

        // Apply fade out animation
        translatables.forEach(el => {
            el.classList.add('lang-fade-out');
        });

        // Wait for CSS transition (0.25s), change text, then fade in
        setTimeout(() => {
            translatables.forEach(el => {
                el.textContent = el.getAttribute(`data-${lang}`);
                el.classList.remove('lang-fade-out');
            });
        }, 250);
    }

    btnKo.addEventListener('click', () => setLanguage('ko'));
    btnEn.addEventListener('click', () => setLanguage('en'));

    // Initialize with Korean default (no animation)
    setLanguage('ko', true);
});

// js/transitions.js
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    const transitionOverlay = document.querySelector('.page-transition-overlay');
    const body = document.body;

    const handleLoad = () => {
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => body.classList.add('page-loaded'), 100);
        } else {
            body.classList.add('page-loaded');
        }
    };

    const handleLinkClick = (event) => {
        const href = event.currentTarget.getAttribute('href');
        const isInternal = href && (href.startsWith('/') || href.startsWith('.') || href.includes('.html'));

        if (isInternal && transitionOverlay) {
            event.preventDefault();
            body.classList.add('page-exiting');
            setTimeout(() => window.location.href = href, 750);
        }
    };

    window.addEventListener('load', handleLoad);
    
    document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([href*="javascript:"])')
        .forEach(link => link.addEventListener('click', handleLinkClick));

    window.addEventListener('pageshow', (event) => {
        if (event.persisted && preloader) {
            body.classList.remove('page-exiting', 'page-loaded');
            preloader.classList.remove('hidden');
            setTimeout(() => {
                preloader.classList.add('hidden');
                preloader.addEventListener('transitionend', () => {
                    body.classList.add('page-loaded');
                }, { once: true });
            }, 50);
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    const transitionOverlay = document.querySelector('.page-transition-overlay');
    const body = document.body;

    window.addEventListener('load', () => {
        if (preloader) {
            preloader.classList.add('hidden');

            // После того, как прелоадер начал исчезать (или исчез), показываем контент
            // Можно использовать transitionend или небольшой setTimeout
            // preloader.addEventListener('transitionend', () => {
            //      // Показываем основной контент страницы
            //      body.classList.add('page-loaded');
            // }, { once: true }); // Обработчик сработает один раз

            setTimeout(() => {
                body.classList.add('page-loaded');
            }, 100);
        } else {
             body.classList.add('page-loaded');
        }
    });

    const internalLinks = document.querySelectorAll(
        'a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([href*="javascript:"])'
    );

    internalLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');

            const isInternalPageLink = href && (href.startsWith('/') || href.startsWith('.') || href.includes('.html'));

            if (isInternalPageLink && transitionOverlay) {
                event.preventDefault();

                body.classList.add('page-exiting');

                setTimeout(() => {
                    window.location.href = href;
                }, 750);
            }
        });
    });

    window.addEventListener('pageshow', function(event) {
        if (event.persisted && preloader) {
             body.classList.remove('page-exiting');
             body.classList.remove('page-loaded');
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
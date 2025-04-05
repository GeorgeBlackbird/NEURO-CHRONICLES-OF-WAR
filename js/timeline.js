// js/timeline.js
document.addEventListener('DOMContentLoaded', () => {
    const years = document.querySelectorAll('.timeline-year');
    const contents = document.querySelectorAll('.year-content');
    let currentTimeout = null;

    function switchContent(targetYearButton) {
        const targetYearId = targetYearButton.dataset.year;
        const targetContent = document.querySelector(`.year-content[data-year="${targetYearId}"]`);
        const activeContent = document.querySelector('.year-content.active');

        if (!targetContent || targetYearButton.classList.contains('active')) return;

        if (activeContent) {
            activeContent.style.opacity = '0';
        }

        if (currentTimeout) clearTimeout(currentTimeout);
        
        currentTimeout = setTimeout(() => {
            years.forEach(y => y.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            targetYearButton.classList.add('active');
            targetContent.classList.add('active');
            targetContent.style.opacity = '1';
        }, 500);
    }

    years.forEach(yearButton => {
        yearButton.addEventListener('click', () => switchContent(yearButton));
    });

    // Инициализация
    const initialActiveYear = document.querySelector('.timeline-year.active') || years[0];
    const initialYearId = initialActiveYear?.dataset.year;
    const initialContent = document.querySelector(`.year-content[data-year="${initialYearId}"]`);
    
    if (initialContent) {
        initialContent.classList.add('active');
        initialContent.style.opacity = '1';
    }
});
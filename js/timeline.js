document.addEventListener('DOMContentLoaded', () => {
    const years = document.querySelectorAll('.timeline-year');
    const contents = document.querySelectorAll('.year-content');
    let isAnimating = false;
    let currentTimeout = null;

    function switchContent(targetYearButton) {
        if (isAnimating) return;
        
        const activeContent = document.querySelector('.year-content.active');
        const targetYearId = targetYearButton.dataset.year;
        const targetContent = document.querySelector(`.year-content[data-year="${targetYearId}"]`);

        if (!targetContent || targetYearButton.classList.contains('active')) return;

        isAnimating = true;
        
        // Запускаем анимацию исчезновения
        if (activeContent) {
            activeContent.style.opacity = '0';
        }

        // Очищаем предыдущий таймер
        if (currentTimeout) clearTimeout(currentTimeout);
        
        currentTimeout = setTimeout(() => {
            // Удаляем активные классы
            years.forEach(y => y.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Добавляем новые активные классы
            targetYearButton.classList.add('active');
            targetContent.classList.add('active');
            targetContent.style.opacity = '1';
            
            isAnimating = false;
        }, 500); // Должно совпадать с временем CSS-перехода
    }

    years.forEach(yearButton => {
        yearButton.addEventListener('click', () => switchContent(yearButton));
    });

    // Инициализация первого контента
    const initialActiveYear = document.querySelector('.timeline-year.active') || years[0];
    const initialYearId = initialActiveYear?.dataset.year;
    const initialContent = document.querySelector(`.year-content[data-year="${initialYearId}"]`);
    
    if (initialContent) {
        initialContent.classList.add('active');
        initialContent.style.opacity = '1';
    }
});
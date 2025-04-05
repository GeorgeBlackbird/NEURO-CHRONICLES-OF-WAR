// js/movie.js
document.addEventListener('DOMContentLoaded', () => {
    // Модальные окна
    const modals = {
        image: document.getElementById('image-modal'),
        video: document.getElementById('video-modal'),
        imageContent: document.getElementById('modal-image'),
        videoContent: document.getElementById('modal-video'),
        caption: document.getElementById('modal-caption')
    };

    // Галерея
    const galleryItems = document.querySelectorAll('.gallery-item:not(.gallery-item-main)');
    const mainVideoItem = document.querySelector('.gallery-item-main video');

    // Обработчики галереи
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption')?.textContent || '';
            
            modals.imageContent.src = img.src;
            modals.imageContent.alt = img.alt;
            modals.caption.textContent = caption;
            
            modals.image.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (mainVideoItem) {
        const videoContainer = mainVideoItem.closest('.gallery-item');
        const videoSource = mainVideoItem.querySelector('source').src;
        
        videoContainer.addEventListener('click', () => {
            modals.videoContent.querySelector('source').src = videoSource;
            modals.videoContent.load();
            modals.video.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            modals.videoContent.play().catch(e => console.log('Автовоспроизведение не разрешено:', e));
        });
    }

    // Закрытие модальных окон
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModals();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModals();
    });

    function closeModals() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
            
            if (modal.id === 'video-modal') {
                modals.videoContent.pause();
                modals.videoContent.currentTime = 0;
            }
        });
        
        document.body.style.overflow = '';
    }

    // Табы
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
});
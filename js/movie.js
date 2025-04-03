document.addEventListener('DOMContentLoaded', () => {
    // Элементы модальных окон
    const imageModal = document.getElementById('image-modal');
    const videoModal = document.getElementById('video-modal');
    const modalImg = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const modalCaption = document.getElementById('modal-caption');
    
    // Кнопки закрытия
    const closeButtons = document.querySelectorAll('.modal-close');
    
    // Галерея
    const galleryItems = document.querySelectorAll('.gallery-item');
    const mainVideoItem = document.querySelector('.gallery-item-main video');

    // Обработчик для обычных изображений
    galleryItems.forEach(item => {
        if (item.classList.contains('gallery-item-main')) return;
        
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption')?.textContent || '';
            
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modalCaption.textContent = caption;
            
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Обработчик для главного видео (трейлера)
    if (mainVideoItem) {
        const videoContainer = mainVideoItem.closest('.gallery-item');
        const videoSource = mainVideoItem.querySelector('source').src;
        
        videoContainer.addEventListener('click', () => {
            modalVideo.querySelector('source').src = videoSource;
            modalVideo.load(); // Перезагружаем видео
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Автовоспроизведение при открытии
            modalVideo.play().catch(e => console.log('Автовоспроизведение не разрешено:', e));
        });
    }

    // Закрытие модальных окон
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.classList.remove('active');
                
                // Пауза видео при закрытии
                if (modal.id === 'video-modal') {
                    modalVideo.pause();
                    modalVideo.currentTime = 0;
                }
            });
            
            document.body.style.overflow = '';
        });
    });

    // Закрытие по клику вне контента
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                
                // Пауза видео при закрытии
                if (modal.id === 'video-modal') {
                    modalVideo.pause();
                    modalVideo.currentTime = 0;
                }
            }
        });
    });

    // Закрытие по Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Пауза видео при закрытии
                    if (modal.id === 'video-modal') {
                        modalVideo.pause();
                        modalVideo.currentTime = 0;
                    }
                }
            });
        }
    });
});
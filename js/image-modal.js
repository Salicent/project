document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalImage = modalOverlay.querySelector('img');
    const closeButton = modalOverlay.querySelector('.modal-close');
    
    // Функция для открытия модального окна
    function openModal(imageSrc, imageAlt) {
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
    }
    
    // Функция для закрытия модального окна
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Разблокируем прокрутку страницы
    }
    
    // Добавляем обработчики кликов для всех изображений в галерее
    const galleryImages = document.querySelectorAll('.main-image, .thumbnail-grid img');
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            openModal(image.src, image.alt);
        });
    });
    
    // Закрытие по клику на кнопку закрытия
    closeButton.addEventListener('click', closeModal);
    
    // Закрытие по клику на затемненную область
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Закрытие по нажатию клавиши Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}); 
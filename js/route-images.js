// Функция для загрузки изображений маршрута
function loadRouteImages(routeId) {
    // Получаем элементы изображений
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail-grid img');
    
    // Определяем изображения для каждого маршрута
    const routeImages = {
        'winnie-pooh': {
            main: 'images/winnie-pooh.jpg',
            thumbnails: [
                'images/winnie-pooh-1.png',
                'images/winnie-pooh-2.webp',
                'images/winnie-pooh-3.webp',
                'images/winnie-pooh-4.jpg'
            ]
        },
        'harry-potter': {
            main: 'images/harry-potter.jpg',
            thumbnails: [
                'images/route-1.jpg',
                'images/route-2.jpg',
                'images/route-3.jpg'
            ]
        }
    };

    // Получаем изображения для выбранного маршрута или используем изображения по умолчанию
    const images = routeImages[routeId] || {
        main: 'images/route-main.jpg',
        thumbnails: [
            'images/route-1.jpg',
            'images/route-2.jpg',
            'images/route-3.jpg'
        ]
    };

    // Обновляем главное изображение
    if (mainImage) {
        mainImage.src = images.main;
        mainImage.alt = `Главное фото маршрута ${routeId || 'по умолчанию'}`;
    }

    // Обновляем миниатюры
    thumbnails.forEach((thumbnail, index) => {
        if (images.thumbnails[index]) {
            thumbnail.src = images.thumbnails[index];
            thumbnail.alt = `Фото локации ${index + 1} маршрута ${routeId || 'по умолчанию'}`;
        }
    });
}

// Добавляем обработчики событий для карточек маршрутов
document.addEventListener('DOMContentLoaded', () => {
    // Получаем ID маршрута из URL
    const urlParams = new URLSearchParams(window.location.search);
    const routeId = urlParams.get('id');

    // Если есть ID в URL, загружаем соответствующие изображения
    if (routeId) {
        loadRouteImages(routeId);
    }

    // Добавляем обработчики для карточек на странице маршрутов
    const routeItems = document.querySelectorAll('.route-item');
    routeItems.forEach(item => {
        const link = item.querySelector('.read-more');
        if (link) {
            link.addEventListener('click', (e) => {
                const routeId = item.id;
                if (routeId) {
                    loadRouteImages(routeId);
                }
            });
        }
    });
}); 
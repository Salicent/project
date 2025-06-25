document.addEventListener('DOMContentLoaded', function() {
    // Получаем ID маршрута из URL
    const urlParams = new URLSearchParams(window.location.search);
    const routeId = urlParams.get('route');

    // Проверяем, есть ли данные для этого маршрута
    if (!routeId || !routesData[routeId]) {
        console.error('Маршрут не найден');
        return;
    }

    const route = routesData[routeId];

    // Заполняем основную информацию
    document.querySelector('.route-header h2').textContent = route.title;
    document.querySelector('.route-meta .location').textContent = route.location;
    document.querySelector('.route-meta .duration').textContent = route.duration;
    document.querySelector('.route-description p').textContent = route.description;

    // Загружаем изображения
    const mainImage = document.querySelector('.route-gallery .main-image');
    mainImage.src = route.mainImage;
    mainImage.alt = route.title;

    const thumbnailGrid = document.querySelector('.thumbnail-grid');
    thumbnailGrid.innerHTML = ''; // Очищаем существующие миниатюры

    route.gallery.forEach(imagePath => {
        const thumbnail = document.createElement('img');
        thumbnail.src = imagePath;
        thumbnail.alt = route.title;
        thumbnail.loading = 'lazy';
        thumbnail.addEventListener('click', () => {
            const modal = document.querySelector('.modal-overlay');
            const modalImg = modal.querySelector('img');
            modalImg.src = imagePath;
            modalImg.alt = route.title;
            modal.classList.add('active');
        });
        thumbnailGrid.appendChild(thumbnail);
    });

    // Заполняем точки маршрута
    const pointsContainer = document.querySelector('.route-points');
    pointsContainer.innerHTML = '<h3>Точки маршрута</h3>';
    route.points.forEach(point => {
        const pointElement = document.createElement('div');
        pointElement.className = 'point';
        pointElement.innerHTML = `
            <h4>${point.title}</h4>
            <p>${point.description}</p>
        `;
        pointsContainer.appendChild(pointElement);
    });

    // Заполняем полезную информацию
    const infoCards = document.querySelectorAll('.info-card');
    infoCards[0].querySelector('p').textContent = route.info.howToGet;
    infoCards[1].querySelector('p').textContent = route.info.bestTime;
    infoCards[2].querySelector('p').textContent = route.info.whatToTake;
}); 
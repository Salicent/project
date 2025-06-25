// Получаем ID маршрута из URL
const urlParams = new URLSearchParams(window.location.search);
const routeId = urlParams.get('route');

// Определяем точки маршрута в зависимости от ID
let routePoints = [];
if (routeId === 'winnie-pooh') {
    routePoints = [
        {
            lat: 51.0833,
            lng: 0.1167,
            title: 'Стоу-Вудс (Stowe Woods)',
            description: 'Знаменитый лес, который стал прототипом Стоакрского леса из книг о Винни-Пухе.'
        },
        {
            lat: 51.1000,
            lng: 0.1167,
            title: 'Дом А.А. Милна в Хартфилде',
            description: 'Дом, где писатель создавал свои знаменитые истории.'
        },
        {
            lat: 51.0833,
            lng: 0.1000,
            title: 'Мост Пуха (Pooh Bridge)',
            description: 'Легендарный мост, где происходила игра в палочки из книги.'
        },
        {
            lat: 51.0917,
            lng: 0.1083,
            title: 'Музей Винни Пуха',
            description: 'Музей, посвященный истории создания книг о Винни Пухе'
        }
    ];
} else if (routeId === 'harry-potter') {
    routePoints = [
        {
            lat: 55.9497,
            lng: -3.1908,
            title: 'Кафе "Элефант Хаус"',
            description: 'Легендарное кафе, где Дж.К. Роулинг написала большую часть первой книги о Гарри Поттере.'
        },
        {
            lat: 55.9472,
            lng: -3.1928,
            title: 'Кладбище Грейфрайерс',
            description: 'Место, где можно найти могилы с именами, вдохновившими Роулинг на создание имен персонажей, включая Тома Реддла.'
        },
        {
            lat: 55.9475,
            lng: -3.1917,
            title: 'Виктория-стрит',
            description: 'Улица, которая стала прототипом Косого переулка.'
        },
        {
            lat: 55.9486,
            lng: -3.2008,
            title: 'Эдинбургский замок',
            description: 'Величественный замок, который вдохновил Роулинг на создание Хогвартса.'
        }
    ];
}else if (routeId === 'sherlock-holmes') {
    routePoints = [
        {
            lat: 51.5238,
            lng: -0.1586,
            title: 'Музей Шерлока Холмса',
            description: 'Расположен по легендарному адресу Бейкер-стрит 221Б.'
        },
        {
            lat: 51.5075,
            lng: -0.1279,
            title: 'Скорланд-Ярд',
            description: 'Знаменитое здание полиции, где инспектор Лестрейд часто сотрудничал с Холмсом.'
        },
        {
            lat: 51.5072,
            lng: -0.1238,
            title: 'Паб “The Sherlock Holmes”',
            description: 'Паб с тематическим интерьером, посвящённым Холмсу.'
        },
        {
            lat: 51.5166,
            lng: -0.1004,
            title: 'Сент-Бартс',
            description: 'Больница, где Холмс и Ватсон впервые встретились.'
        }
    ];
} else if (routeId === 'peter-pan') {
    routePoints = [
        {
            lat: 51.5056,
            lng: -0.1829,
            title: 'Статуя Питера Пэна',
            description: 'Бронзовая статуя в Кенсингтонском саду, установленная по распоряжению Дж.М. Барри.'
        },
        {
            lat: 51.5072,
            lng: -0.1809,
            title: 'Сад загубленных мальчиков',
            description: 'Место в саду, вдохновившее на создание потерянных мальчиков.'
        },
        {
            lat: 51.5066,
            lng: -0.1743,
            title: 'Серпантин (The Serpentine)',
            description: 'Живописное озеро, часто описываемое в историях Барри.'
        },
        {
            lat: 51.5070,
            lng: -0.1902,
            title: 'Дом Дж.М. Барри',
            description: 'Дом рядом с парком, в котором жил автор Питера Пэна.'
        }
    ];
}


// Инициализация карты после загрузки API
ymaps.ready(initMap);

function initMap() {
    if (routePoints.length === 0) return;

    // Создаем карту
    const map = new ymaps.Map('route-map', {
        center: [routePoints[0].lat, routePoints[0].lng],
        zoom: 14,
        controls: ['zoomControl', 'fullscreenControl']
    });

    // Добавляем маркеры для каждой точки маршрута
    routePoints.forEach((point, index) => {
        const placemark = new ymaps.Placemark([point.lat, point.lng], {
            balloonContent: `
                <h4>${point.title}</h4>
                <p>${point.description}</p>
            `
        }, {
            preset: 'islands#blueStretchyIcon',
            iconContent: index + 1
        });
        map.geoObjects.add(placemark);
    });

    // Строим маршрут между точками
    if (routePoints.length > 1) {
        const points = routePoints.map(point => [point.lat, point.lng]);
        const multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: points,
            params: {
                routingMode: 'pedestrian'
            }
        }, {
            boundsAutoApply: true
        });
        map.geoObjects.add(multiRoute);
    }
} 
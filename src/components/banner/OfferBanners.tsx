import {Link} from "react-router-dom";
import {Fade} from "react-awesome-reveal";
import {Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useState, useEffect} from "react";

const OfferBanners = () => {
    // Получаем функцию перевода и объект i18n
    const {t, i18n} = useTranslation("offerBanners");
    const lang = localStorage.getItem("i18nextLng");

    // Состояние для хранения данных о скидках
    const [discounts, setDiscounts] = useState([]);
    // Состояние для обработки загрузки
    const [isLoading, setIsLoading] = useState(true);

    // Функция для получения данных с API
    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const response = await fetch("https://admin.beauty-point.uz/api/discounts");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();

                // Проверяем, что данные существуют и это массив, и сохраняем первые 2 элемента
                if (result.status && Array.isArray(result.data.data)) {
                    setDiscounts(result.data.data.slice(0, 2));
                } else {
                    console.error("API returned an unexpected data structure or status is false.");
                }
            } catch (error) {
                console.error("Error fetching discounts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDiscounts();
    }, []);

    // Функция для получения текста на текущем языке из объекта локализации
    const getLocalizedText = (textObject) => {
        if (!textObject || typeof textObject !== 'object') return '...';
        const currentLang = i18n.language;
        // Возвращаем текст на текущем языке, либо на русском как запасной, либо "..."
        return textObject[currentLang] || textObject['ru'] || '...';
    };

    // --- СТИЛИ ДЛЯ ПОЛНОЭКРАННОГО ОВЕРЛЕЯ ---

    // Базовый стиль баннера (фон + позиционирование)
    const fullBannerStyle = {
        minHeight: '250px',
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center', // Центрируем контент по вертикали
        padding: '20px', // Внутренний отступ для контента
    };

    // Стиль для темного оверлея
    const fullOverlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        // Полупрозрачный черный цвет. Можно изменить 0.4 для регулировки затемнения.
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 5,
    };

    // Стиль для контента (текст и кнопка)
    const contentStyle = {
        position: 'relative',
        zIndex: 10, // Контент должен быть над оверлеем
        color: '#fff', // Белый текст для читаемости
    };

    // ----------------------------------------

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (discounts.length === 0) {
        return null;
    }

    // Извлекаем первый и второй баннеры
    const banner1 = discounts[0];
    const banner2 = discounts[1];

    // Вспомогательный компонент для отображения баннера
    const BannerItemComponent = ({banner, className}) => (
        <Fade
            triggerOnce
            direction={className.includes('left') ? "left" : "right"}
            duration={2000}
            className={className}
            data-wow-duration="2s"
        >
            <div
                className="gi-ofr-banners"
                style={{
                    ...fullBannerStyle,
                    backgroundImage: `url(${banner.upload.file_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* 1. Добавление Оверлея */}
                <div style={fullOverlayStyle} />

                {/* 2. Контент поверх оверлея */}
                <div style={contentStyle}>
                    <div className="gi-bnr-detail">
                        {/* Метка скидки */}
                        <span
                            className="lbl"
                            style={{
                                backgroundColor: '#5caf90', // Красный цвет для скидки
                                color: '#fff',
                                padding: '3px 6px',
                                borderRadius: '4px',
                                display: 'inline-block',
                                marginBottom: '10px',
                                fontSize: '13px',
                            }}
                        >
                            {banner.discounts}% {lang === "ru" ? "скидка" : "chegirma"}
                        </span>

                        {/* Заголовок (h5) */}
                        <h5 style={{color: 'inherit'}}>
                            {getLocalizedText(banner.title)}
                        </h5>

                        {/* Подзаголовок (p) */}
                        <p style={{color: 'inherit'}}>
                            {getLocalizedText(banner.subtitle)}
                        </p>

                        {/* Кнопка */}
                        <Link to={banner.button_link} className="gi-btn-2" style={{marginTop: '15px'}}>
                            {getLocalizedText(banner.button_text)}
                        </Link>
                    </div>
                </div>
            </div>
        </Fade>
    );

    return (
        <section className="gi-offer-section padding-tb-40">
            <div className="container">
                <Row>
                    {/* --- Первый баннер (banner1) --- */}
                    {banner1 && (
                        <BannerItemComponent
                            banner={banner1}
                            className="col-md-6 wow fadeInLeft"
                        />
                    )}

                    {/* --- Второй баннер (banner2) --- */}
                    {banner2 && (
                        <BannerItemComponent
                            banner={banner2}
                            // m-t-767 - это класс для отступа на мобильных (вероятно)
                            className="col-md-6 wow fadeInRight m-t-767"
                        />
                    )}
                </Row>
            </div>
        </section>
    );
};

export default OfferBanners;
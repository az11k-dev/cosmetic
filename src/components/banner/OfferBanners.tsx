import {Link} from "react-router-dom";
import {Fade} from "react-awesome-reveal";
import {Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useState, useEffect} from "react"; // Импортируем useState и useEffect

const OfferBanners = () => {
    // Получаем функцию перевода и объект i18n
    const {t, i18n} = useTranslation("offerBanners");
    const lang = localStorage.getItem("i18nextLng");

    // Состояние для хранения данных о скидках
    const [discounts, setDiscounts] = useState([]);
    // Состояние для обработки загрузки (опционально)
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

                // Проверяем, что данные существуют и это массив, и сохраняем их
                if (result.status && Array.isArray(result.data.data)) {
                    // Используем только первые 2 элемента, как в статическом примере
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
    }, []); // Пустой массив зависимостей означает, что useEffect сработает один раз при монтировании

    // Функция для получения текста на текущем языке
    const getLocalizedText = (textObject: string) => {
        // i18n.language может быть 'ru', 'uz' или 'en'.
        // Мы проверяем, есть ли такой ключ в объекте, иначе используем 'ru' как запасной.
        const currentLang: string = i18n.language;
        return textObject[currentLang] || textObject['ru'] || '...';
    };

    // Если данные еще загружаются, можно показать заглушку (или просто ничего)
    if (isLoading) {
        return <div>Загрузка...</div>; // Можно заменить на более красивый лоадер
    }

    // Если данные не получены (например, API вернул пустой массив), не отображаем секцию
    if (discounts.length === 0) {
        return null;
    }

    // Извлекаем первый и второй баннеры
    const banner1 = discounts[0];
    const banner2 = discounts[1];

    return (
        <section className="gi-offer-section padding-tb-40">
            <div className="container">
                <Row>
                    {/* --- Первый баннер (banner1) --- */}
                    {banner1 && (
                        <Fade
                            triggerOnce
                            direction="left"
                            duration={2000}
                            className="col-md-6 wow fadeInLeft"
                            data-wow-duration="2s"
                        >
                            <div className="gi-ofr-banners">
                                <div className="gi-bnr-body">
                                    <div className="gi-bnr-img">
                                        {/* Используем значение discounts из API */}
                                        <span
                                            className="lbl">{banner1.discounts}% {lang === "ru" ? "скидка" : "chegirma"}</span>
                                        <img
                                            // Используем file_url из API
                                            src={banner1.upload.file_url}
                                            alt={getLocalizedText(banner1.title)}
                                        />
                                    </div>
                                    <div className="gi-bnr-detail">
                                        {/* Используем title на текущем языке */}
                                        <h5>{getLocalizedText(banner1.title)}</h5>
                                        {/* Используем subtitle на текущем языке */}
                                        <p>{getLocalizedText(banner1.subtitle)}</p>
                                        <Link to={banner1.button_link} className="gi-btn-2">
                                            {/* Используем button_text на текущем языке */}
                                            {getLocalizedText(banner1.button_text)}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    )}

                    {/* --- Второй баннер (banner2) --- */}
                    {banner2 && (
                        <Fade
                            triggerOnce
                            direction="right"
                            duration={2000}
                            className="col-md-6 wow fadeInRight"
                            data-wow-duration="2s"
                        >
                            <div className="gi-ofr-banners m-t-767">
                                <div className="gi-bnr-body">
                                    <div className="gi-bnr-img">
                                        {/* Используем значение discounts из API */}
                                        <span
                                            className="lbl">{banner2.discounts}% {lang === "ru" ? "скидка" : "chegirma"}</span>
                                        <img
                                            // Используем file_url из API
                                            src={banner2.upload.file_url}
                                            alt={getLocalizedText(banner2.title)}
                                        />
                                    </div>
                                    <div className="gi-bnr-detail">
                                        {/* Используем title на текущем языке */}
                                        <h5>{getLocalizedText(banner2.title)}</h5>
                                        {/* Используем subtitle на текущем языке */}
                                        <p>{getLocalizedText(banner2.subtitle)}</p>
                                        <Link to={banner2.button_link} className="gi-btn-2">
                                            {/* Используем button_text на текущем языке */}
                                            {getLocalizedText(banner2.button_text)}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    )}
                </Row>
            </div>
        </section>
    );
};

export default OfferBanners;
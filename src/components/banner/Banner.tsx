import React, {useState, useEffect} from "react"; // 💡 Добавили useState и useEffect
import {Link} from "react-router-dom";
import {Fade} from "react-awesome-reveal";
import {Col, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const lang = localStorage.getItem("i18nextLng");

const Banner = () => {
    const {i18n} = useTranslation("banner"); // 💡 i18n нужен для локализации
    const [bannerData, setBannerData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Вспомогательная функция для получения текста на нужном языке
    const getLangContent = (contentObj) => {
        if (!contentObj) return "";
        const lang = i18n.language || "ru";
        return contentObj[lang] || contentObj["ru"];
    };

    // 1. Загрузка данных с API
    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await fetch("https://admin.beauty-point.uz/api/discounts");
                const data = await response.json();

                // 💡 Проверяем статус и наличие данных
                if (data.status && data.data && data.data.data && data.data.data.length > 0) {
                    // Берем только первый элемент для этого компонента
                    setBannerData(data.data.data[data.data.data.length - 1]);
                }
            } catch (error) {
                console.error("Ошибка при загрузке баннера:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanner();
    }, []);

    // 2. Отображение состояния загрузки или отсутствие данных
    if (loading) {
        return (
            <div className="container padding-tb-40">
                <p>Загрузка баннера...</p>
            </div>
        );
    }

    if (!bannerData) {
        return null; // Не показываем компонент, если данных нет
    }

    // 3. Извлечение необходимых данных
    const title = getLangContent(bannerData.title);
    const discount = bannerData.discounts;
    const buttonText = getLangContent(bannerData.button_text);
    const buttonLink = bannerData.button_link;
    const imageUrl = bannerData.upload?.file_url;

    // Разбиваем заголовок на две строки (если он содержит пробел)
    const titleParts = title.split(' ');
    const titleLine1 = titleParts.slice(0, Math.ceil(titleParts.length / 2)).join(' ');
    const titleLine2 = titleParts.slice(Math.ceil(titleParts.length / 2)).join(' ');


    return (
        <Fade triggerOnce direction="up" duration={2000} delay={200}>
            <section
                className="gi-banner padding-tb-40 wow fadeInUp"
                data-wow-duration="2s"
                // 💡 Добавляем фоновое изображение
            >
                <div className="container" style={{
                    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '5px',
                }}>
                    <Row>
                        <Col md={12}>
                            <div
                                className="gi-animated-banner"
                                data-aos="fade-up"
                                data-aos-duration="2000"
                                data-aos-delay="200"
                            >
                                {/* Теперь заголовок не нужен, так как данные уже загружены */}
                                <h2 className="d-none">{lang === "ru" ? "Скидка" : "Chegirma"}: {discount}%</h2>
                                <div className="gi-bnr-detail">
                                    <div className="gi-bnr-info">
                                        <h2>
                                            {/* 💡 Динамический заголовок, разбитый на две строки */}
                                            {titleLine1} <br></br>
                                            {titleLine2}
                                        </h2>
                                        <h3>
                                            {/* 💡 Динамическая скидка */}
                                            {discount}% <span> — {lang === "ru" ? "Торопитесь" : "Shoshiling"}!</span>
                                        </h3>
                                        {/* Используем <a> для внешних ссылок и _blank для новой вкладки */}
                                        <a
                                            href={buttonLink}
                                            className="gi-btn-2"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {/* 💡 Динамический текст кнопки */}
                                            {buttonText}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </Fade>
    );
};

export default Banner;
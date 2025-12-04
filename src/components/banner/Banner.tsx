import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Fade} from "react-awesome-reveal";
import {Col, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const lang = localStorage.getItem("i18nextLng");

const Banner = () => {
    const {i18n} = useTranslation("banner");
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

                if (data.status && data.data && data.data.data && data.data.data.length > 0) {
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
        return null;
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

    // ⭐ 4. Стиль для темного оверлея, покрывающего весь контейнер
    const fullBannerOverlayStyle: React.CSSProperties = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        // Полупрозрачный черный цвет: rgba(0, 0, 0, 0.4). Измени 0.4 для настройки затемнения.
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: '5px', // Чтобы оверлей соответствовал скруглению контейнера
    };

    // ⭐ 5. Стиль для блока текста, чтобы он был поверх оверлея
    const textContentWrapperStyle: React.CSSProperties = {
        position: "relative",
        zIndex: 10, // Убеждаемся, что контент поверх оверлея
        color: '#fff', // Устанавливаем белый цвет для текста
    };


    return (
        <Fade triggerOnce direction="up" duration={2000} delay={200}>
            <section
                className="gi-banner padding-tb-40 wow fadeInUp"
                data-wow-duration="2s"
            >
                <div
                    className="container"
                    style={{
                        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        // Стили для позиционирования
                        // minHeight: '350px',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        // paddingTop: '30px',
                        // paddingBottom: '30px',
                    }}
                >

                    {/* ⭐ 6. ДОБАВЛЕНИЕ ОВЕРЛЕЯ НА ВЕСЬ КОНТЕЙНЕР */}
                    <div style={fullBannerOverlayStyle} />

                    <Row style={{width: '100%'}}>
                        <Col md={12}>
                            <div
                                className="gi-animated-banner"
                                data-aos="fade-up"
                                data-aos-duration="2000"
                                data-aos-delay="200"
                                style={textContentWrapperStyle} // ⭐ Применяем стили текста и zIndex
                            >
                                <h2 className="d-none">{lang === "ru" ? "Скидка" : "Chegirma"}: {discount}%</h2>

                                <div className="gi-bnr-detail">
                                    <div className="gi-bnr-info">
                                        <h2 style={{color: 'inherit'}}> {/* Цвет наследуется от textContentWrapperStyle */}
                                            {/* 💡 Динамический заголовок, разбитый на две строки */}
                                            {titleLine1} <br></br>
                                            {titleLine2}
                                        </h2>
                                        <h3 > {/* Цвет наследуется */}
                                            {/* 💡 Динамическая скидка */}
                                            {discount}% <span  style={{color:"white"}}> — {lang === "ru" ? "Торопитесь" : "Shoshiling"}!</span>
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
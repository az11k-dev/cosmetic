// src/components/About.tsx (или где он у тебя находится)

import React from "react";
import { Col, Row } from "react-bootstrap";
// Импортируем хук useTranslation
import { useTranslation, Trans } from "react-i18next";

const About = () => {
    // Получаем функцию t (translate) и объект i18n (для смены языка)
    const { t, i18n } = useTranslation("about");

    // ДОБАВЛЕНИЕ: Функция для переключения языка (для примера)
    // В реальном проекте ты ее вызовешь из компонента переключателя
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <>
            <section className="gi-about padding-tb-40">
                <div className="container">

                    {/* Кнопки для демонстрации переключения языка */}

                    {/* Конец демонстрационных кнопок */}

                    <Row>
                        <Col xl={6} md={12}>
                            <div className="gi-about-img">
                                {/* Изображения остались без изменений */}
                                <img
                                    src={"/assets/firstAbout.jpg"}
                                    className="v-img"
                                    alt="about"
                                />
                                <img
                                    src={"/assets/secondAbout.png"}
                                    className="h-img"
                                    alt="about"
                                />
                                <img
                                    src={"/assets/secondAbout.png"}
                                    className="h-img"
                                    alt="about"
                                />
                            </div>
                        </Col>
                        <Col xl={6} md={12}>
                            <div className="gi-about-detail">
                                <div className="section-title">
                                    <h2>
                                        {/* Используем компонент Trans для перевода,
                                            так как в ключе есть HTML (<span>) */}
                                        <Trans i18nKey="about_title">
                                            {t("about_title")}
                                        </Trans>
                                    </h2>
                                    {/* Используем функцию t() для простого текста */}
                                    <p>
                                        {t('about_subtitle')}
                                    </p>
                                </div>
                                <p>
                                    {t('about_paragraph_1')}
                                </p>
                                <p>
                                    {t('about_paragraph_2')}
                                </p>
                                <p>
                                    {t('about_paragraph_3')}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    );
};

export default About;
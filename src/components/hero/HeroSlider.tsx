import {useState, useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay} from "swiper/modules";
import "swiper/css";
import {useTranslation} from "react-i18next";

const lang = localStorage.getItem("i18nextLng");

function HeroSlider() {
    const {i18n} = useTranslation("heroSlider");
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Загрузка данных с API
    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await fetch("https://admin.beauty-point.uz/api/discounts");
                const data = await response.json();

                if (data.status && data.data && data.data.data) {
                    setSlides(data.data.data);
                }
            } catch (error) {
                console.error("Ошибка при загрузке слайдера:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);

    // 2. Вспомогательная функция для получения текста на нужном языке
    const getLangContent = (contentObj: any) => {
        // Берем текущий язык (uz или ru), если его нет - по умолчанию ru
        const lang = i18n.language || "ru";
        return contentObj[lang] || contentObj["ru"];
    };

    if (loading) {
        return <div className="container m-tb-40">Loading slider...</div>; // Можно заменить на спиннер
    }

    if (slides.length === 0) {
        return null; // Или заглушка, если слайдов нет
    }

    return (
        <>
            <section className="section gi-hero m-tb-40">
                <div className="container">
                    <div className="gi-main-content">
                        <div className="gi-slider-content">
                            <div className="gi-main-slider">
                                <Swiper
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination, Autoplay]}
                                    loop={true}
                                    speed={2000}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    slidesPerView={1}
                                    className="swiper-pagination-white gi-slider main-slider-nav main-slider-dot swiper-wrapper"
                                >
                                    {/* 3. Перебор массива слайдов */}
                                    {slides.map((slide: any) => (
                                        <SwiperSlide
                                            key={slide.id}
                                            className="gi-slide-item swiper-slide d-flex"
                                            // Добавляем картинку фоном
                                            style={{
                                                backgroundImage: `url(${slide.upload?.file_url})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                        >
                                            <div className="gi-slide-content slider-animation">
                                                <p>
                                                    {/* Вывод скидки */}
                                                    {slide.discounts}% - {lang === "ru" ? "скидка" : "chegirma"}
                                                </p>
                                                <h1 className="gi-slide-title">
                                                    {/* Вывод заголовка на текущем языке */}
                                                    {getLangContent(slide.title)}
                                                </h1>
                                                {/* Можно вывести subtitle, если нужно: <p>{getLangContent(slide.subtitle)}</p> */}

                                                <div className="gi-slide-btn">
                                                    <a
                                                        href={slide.button_link}
                                                        className="gi-btn-1"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {/* Вывод текста кнопки на текущем языке */}
                                                        {getLangContent(slide.button_text)}{" "}
                                                        <i
                                                            className="fi-rr-angle-double-small-right"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}

                                    <div className="swiper-pagination swiper-pagination-white"></div>
                                    <div className="swiper-buttons">
                                        <div className="swiper-button-next"></div>
                                        <div className="swiper-button-prev"></div>
                                    </div>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HeroSlider;
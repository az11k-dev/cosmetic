import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
// 💡 Yangi import: Tarjima uchun
import { useTranslation } from "react-i18next";

function HeroSlider() {
    // 💡 useTranslation hook'ini ishlatish
    const { t } = useTranslation("heroSlider");

    return (
        <>
            <section className="section gi-hero m-tb-40">
                <div className="container">
                    <div className="gi-main-content">
                        {/* */}
                        <div className="gi-slider-content">
                            <div className="gi-main-slider">
                                <>
                                    {/* */}
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
                                        <SwiperSlide className="gi-slide-item swiper-slide d-flex slide-1">
                                            <div className="gi-slide-content slider-animation">
                                                <p>
                                                    {/* 💡 TARJIMA 1: Narx matni (Bu yerda narxni dinamik usulda JSON ga qo'shish tavsiya etiladi) */}
                                                    {t("slide1Price")}
                                                </p>
                                                <h1 className="gi-slide-title">
                                                    {/* 💡 TARJIMA 2: Slayd sarlavhasi (Kosmetika) */}
                                                    {t("slide1Title")}
                                                </h1>
                                                <div className="gi-slide-btn">
                                                    <a className="gi-btn-1">
                                                        {/* 💡 TARJIMA 3: Tugma matni */}
                                                        {t("shopNow")}{" "}
                                                        <i
                                                            className="fi-rr-angle-double-small-right"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="gi-slide-item swiper-slide d-flex slide-2">
                                            <div className="gi-slide-content slider-animation">
                                                <p>
                                                    {/* 💡 TARJIMA 4: Narx matni */}
                                                    {t("slide2Price")}
                                                </p>
                                                <h1 className="gi-slide-title">
                                                    {/* 💡 TARJIMA 5: Slayd sarlavhasi (Kosmetika) */}
                                                    {t("slide2Title")}
                                                </h1>
                                                <div className="gi-slide-btn">
                                                    <Link to={`/`} className="gi-btn-1">
                                                        {/* 💡 TARJIMA 6: Tugma matni */}
                                                        {t("shopNow")}{" "}
                                                        <i
                                                            className="fi-rr-angle-double-small-right"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <div className=" swiper-pagination swiper-pagination-white"></div>
                                        <div className="swiper-buttons">
                                            <div className="swiper-button-next"></div>
                                            <div className="swiper-button-prev"></div>
                                        </div>
                                    </Swiper>
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HeroSlider;
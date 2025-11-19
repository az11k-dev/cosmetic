import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // i18next dan import

const OfferBanners = () => {
    // useTranslation hook'ini ishlatish
    const { t } = useTranslation("offerBanners");

    return (
        <>
            <section className="gi-offer-section padding-tb-40">
                <div className="container">
                    {/* */}
                    <Row>
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
                                        {/* Yangi kalit: 50% chegirma */}
                                        <span className="lbl">{t("offer_50_percent")}</span>
                                        <img
                                            src={
                                                "/assets/img/banner/2.jpg" // Rasmni kosmetikaga mos o'zgartirishni unutmang!
                                            }
                                            alt="banner"
                                        />
                                    </div>
                                    <div className="gi-bnr-detail">
                                        {/* Yangi kalit: Parvarish to'plamlari */}
                                        <h5>{t("care_set_title")}</h5>
                                        <p>{t("care_set_text")}</p>
                                        <Link to="/shop-left-sidebar-col-3" className="gi-btn-2">
                                            {t("shop_now")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Fade>
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
                                        {/* Yangi kalit: 30% chegirma */}
                                        <span className="lbl">{t("offer_30_percent")}</span>
                                        <img
                                            src={
                                                "/assets/img/banner/3.jpg" // Rasmni kosmetikaga mos o'zgartirishni unutmang!
                                            }
                                            alt="banner"
                                        />
                                    </div>
                                    <div className="gi-bnr-detail">
                                        {/* Yangi kalit: Makiyaj mahsulotlari */}
                                        <h5>{t("makeup_title")}</h5>
                                        <p>{t("makeup_text")}</p>
                                        <Link to="/shop-left-sidebar-col-3" className="gi-btn-2">
                                            {t("shop_now")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </Row>
                </div>
            </section>
        </>
    );
};

export default OfferBanners;
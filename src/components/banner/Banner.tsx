import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { Col, Row } from "react-bootstrap";
// 💡 useTranslation importi
import { useTranslation } from "react-i18next";

const Banner = () => {
    // 💡 'banner' namespace'ini yuklaymiz
    const { t } = useTranslation("banner");

    return (
        <Fade triggerOnce direction="up" duration={2000} delay={200}>
            <section
                className="gi-banner padding-tb-40 wow fadeInUp"
                data-wow-duration="2s"
            >
                <div className="container">
                    <Row>
                        <Col md={12}>
                            <div
                                className="gi-animated-banner"
                                data-aos="fade-up"
                                data-aos-duration="2000"
                                data-aos-delay="200"
                            >
                                {/* Yordamchi sarlavha */}
                                <h2 className="d-none">{t("bannerOffer")}</h2>
                                <div className="gi-bnr-detail">
                                    <div className="gi-bnr-info">
                                        <h2>
                                            {/* 💡 Birinchi sarlavha qismi */}
                                            {t("bannerTitleLine1")} <br></br>
                                            {/* 💡 Ikkinchi sarlavha qismi */}
                                            {t("bannerTitleLine2")}
                                        </h2>
                                        <h3>
                                            {/* 💡 Chegirma matni */}
                                            {t("bannerDiscount")} <span>{t("bannerHurryUp")}</span>
                                        </h3>
                                        <Link to="/shop-left-sidebar-col-3" className="gi-btn-2">
                                            {/* 💡 Tugma matni */}
                                            {t("shopNowButton")}
                                        </Link>
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
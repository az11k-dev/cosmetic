import {Fade} from "react-awesome-reveal";
import {Col, Row} from "react-bootstrap";
import ScrollButton from "../../button/ScrollButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {setSelectedCategory} from "@/store/reducers/filterReducer";
import {useEffect, useState} from "react";
import {slice} from "lodash";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
// 💡 Yangi import: Tarjima uchun
import {useTranslation} from "react-i18next";

const API_URL = "https://admin.beauty-point.uz/api/categories";

function Footer() {
    // 💡 useTranslation hook'ini ishlatish
    const {t} = useTranslation("footer");
    const lang = localStorage.getItem("i18nextLng");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dropdownState, setDropdownState] = useState(null);
    const {selectedCategory} = useSelector((state: RootState) => state.filter);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();

                if (result.status && result.data && result.data.data) {
                    setCategories(result.data.data);
                } else {
                    throw new Error("Invalid API response format");
                }
            } catch (err) {
                console.error("Failed to fetch categories:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);


    if (error) return <div>{t("failedToLoadProducts")}</div>; // Tarjima qo'shildi

    const toggleDropdown = (dropdown: any) => {
        setDropdownState((menu) => (menu === dropdown ? null : dropdown));
    };

    const handleCategoryChange = (category: any) => {
        const updatedCategory = selectedCategory.includes(category)
            ? selectedCategory.filter((cat) => cat !== category)
            : [...selectedCategory, category];
        dispatch(setSelectedCategory(updatedCategory));
        navigate("/shop-left-sidebar-col-3");
    };

    return (
        <>
            <footer className="gi-footer m-t-40">
                <div className="footer-container">
                    <div className="footer-top padding-tb-80">
                        <div className="container">
                            <Row className="m-minus-991">
                                <Col sm={12} lg={3}>
                                    <Fade
                                        duration={400}
                                        triggerOnce
                                        direction="up"
                                        className=" gi-footer-cat"
                                    >
                                        <div className="gi-footer-widget gi-footer-company">
                                            <a href="/">
                                                <img
                                                    src={"/assets/img/logo/logo.png"}
                                                    className="gi-footer-logo"
                                                    alt="footer logo"
                                                />
                                            </a>
                                            <p className="gi-footer-detail">
                                                {/* 💡 TARJIMA 1: Kompaniya tavsifi (Kosmetikaga moslangan) */}
                                                {t("companyDetail")}
                                            </p>
                                        </div>
                                    </Fade>
                                </Col>
                                <Col sm={12} lg={2} className="gi-footer-info">
                                    <>
                                        <div className="gi-footer-widget">
                                            <h4
                                                onClick={() => toggleDropdown("category")}
                                                className="gi-footer-heading"
                                            >
                                                {/* 💡 TARJIMA 2: CategoryFilter sarlavhasi */}
                                                {t("categoryHeading")}
                                                <div className="gi-heading-res">
                                                    <i
                                                        className="fi-rr-angle-small-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </div>
                                            </h4>
                                            <motion.div
                                                className="gi-footer-links gi-footer-dropdown"
                                                initial={{height: 0, opacity: 0, translateY: -20}}
                                                animate={{
                                                    height: dropdownState === "category" ? "auto" : 0,
                                                    opacity: dropdownState === "category" ? 1 : 0,
                                                    translateY: dropdownState === "category" ? 0 : -20,
                                                }}
                                                transition={{duration: 0.3, ease: "easeInOut"}}
                                                style={{
                                                    overflow: "hidden",
                                                    display: "block",
                                                    paddingBottom:
                                                        dropdownState === "category" ? "20px" : "0px",
                                                }}
                                            >
                                                <ul className="align-itegi-center">
                                                    {slice(categories, 0, 5)?.map((data: any, index: number) => (
                                                        <li key={index} className="gi-footer-link">
                                                            <a
                                                                style={{textTransform: "capitalize"}}
                                                                onClick={() =>
                                                                    handleCategoryChange(data.category)
                                                                }
                                                            >
                                                                {lang === "ru" ? data?.name?.ru : data?.name?.uz}
                                                                {/* Eslatma: data.category dinamik, lekin ba'zi frameworklar uni ham avtomatik tarjima qiladi */}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        </div>
                                    </>
                                </Col>
                                <Col sm={12} lg={2} className="gi-footer-account">
                                    <>
                                        <div className="gi-footer-widget">
                                            <h4
                                                onClick={() => toggleDropdown("company")}
                                                className="gi-footer-heading"
                                            >
                                                {/* 💡 TARJIMA 3: Company sarlavhasi */}
                                                {t("companyHeading")}
                                                <div className="gi-heading-res">
                                                    <i
                                                        className="fi-rr-angle-small-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </div>
                                            </h4>
                                            <motion.div
                                                className="gi-footer-links gi-footer-dropdown"
                                                initial={{height: 0, opacity: 0, translateY: -20}}
                                                animate={{
                                                    height: dropdownState === "company" ? "auto" : 0,
                                                    opacity: dropdownState === "company" ? 1 : 0,
                                                    translateY: dropdownState === "company" ? 0 : -20,
                                                }}
                                                transition={{duration: 0.3, ease: "easeInOut"}}
                                                style={{
                                                    overflow: "hidden",
                                                    display: "block",
                                                    paddingBottom:
                                                        dropdownState === "company" ? "20px" : "0px",
                                                }}
                                            >
                                                <ul className="align-itegi-center">
                                                    <li className="gi-footer-link">
                                                        <Link to="/about-us">{t("companyAboutUs")}</Link>
                                                    </li>
                                                    <li className="gi-footer-link">
                                                        <Link to={`/track-order`}>{t("companyDelivery")}</Link>
                                                    </li>
                                                    <li className="gi-footer-link">
                                                        <Link to={`/terms-condition`}>{t("companyTerms")}</Link>
                                                    </li>
                                                    <li className="gi-footer-link">
                                                        <Link to={`/contact-us`}>{t("companyContactUs")}</Link>
                                                    </li>
                                                </ul>
                                            </motion.div>
                                        </div>
                                    </>
                                </Col>
                                <Col sm={12} lg={2} className="gi-footer-service">
                                    <>
                                        <div className="gi-footer-widget">
                                            <h4
                                                onClick={() => toggleDropdown("account")}
                                                className="gi-footer-heading"
                                            >
                                                {/* 💡 TARJIMA 4: Account sarlavhasi */}
                                                {t("accountHeading")}
                                                <div className="gi-heading-res">
                                                    <i
                                                        className="fi-rr-angle-small-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </div>
                                            </h4>
                                            <motion.div
                                                className="gi-footer-links gi-footer-dropdown"
                                                initial={{height: 0, opacity: 0, translateY: -20}}
                                                animate={{
                                                    height: dropdownState === "account" ? "auto" : 0,
                                                    opacity: dropdownState === "account" ? 1 : 0,
                                                    translateY: dropdownState === "account" ? 0 : -20,
                                                }}
                                                transition={{duration: 0.3, ease: "easeInOut"}}
                                                style={{
                                                    overflow: "hidden",
                                                    display: "block",
                                                    paddingBottom:
                                                        dropdownState === "account" ? "20px" : "0px",
                                                }}
                                            >
                                                <ul className="align-itegi-center">
                                                    <li className="gi-footer-link">
                                                        <Link to={`/cart`}>{t("accountViewCart")}</Link>
                                                    </li>
                                                    <li className="gi-footer-link">
                                                        <Link to={`/privacy-policy`}>{t("accountReturnPolicy")}</Link>
                                                    </li>
                                                    <li className="gi-footer-link">
                                                        <Link to={`/checkout`}>{t("accountPayments")}</Link>
                                                    </li>
                                                </ul>
                                            </motion.div>
                                        </div>
                                    </>
                                </Col>
                                <Col sm={12} lg={3} className=" gi-footer-cont-social">
                                    <>
                                        <div className="gi-footer-contact">
                                            <div className="gi-footer-widget">
                                                <h4
                                                    onClick={() => toggleDropdown("contact")}
                                                    className="gi-footer-heading"
                                                >
                                                    {/* 💡 TARJIMA 5: Contact sarlavhasi */}
                                                    {t("contactHeading")}
                                                    <div className="gi-heading-res">
                                                        <i
                                                            className="fi-rr-angle-small-down"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </div>
                                                </h4>
                                                <motion.div
                                                    className="gi-footer-links gi-footer-dropdown"
                                                    initial={{height: 0, opacity: 0, translateY: -20}}
                                                    animate={{
                                                        height: dropdownState === "contact" ? "auto" : 0,
                                                        opacity: dropdownState === "contact" ? 1 : 0,
                                                        translateY: dropdownState === "contact" ? 0 : -20,
                                                    }}
                                                    transition={{duration: 0.3, ease: "easeInOut"}}
                                                    style={{
                                                        overflow: "hidden",
                                                        display: "block",
                                                        paddingBottom:
                                                            dropdownState === "contact" ? "20px" : "0px",
                                                    }}
                                                >
                                                    <ul className="align-itegi-center">
                                                        <li className="gi-footer-link gi-foo-location">
                              <span>
                                <i className="fi fi-rr-marker location svg_img foo_svg"></i>
                              </span>
                                                            <p>
                                                                {t("firstAddress")} <br/>
                                                                {t("secondAddress")}
                                                            </p>
                                                        </li>
                                                        <li className="gi-footer-link gi-foo-call">
                              <span>
                                <i className="fi fi-rs-circle-phone svg_img foo_svg"></i>
                              </span>
                                                            <a target={"_blank"}
                                                               href="tel:+998990996050">+998990996050</a>
                                                        </li>
                                                        <li className="gi-footer-link gi-foo-call">
                              <span>
                                <i className="fi fi-brands-telegram svg_img foo_svg"></i>
                              </span>
                                                            <a target={"_blank"}
                                                               href="https://t.me/your_beautypoint">BEAUTY
                                                                POINT</a>
                                                        </li>
                                                        <li className="gi-footer-link gi-foo-call">
                              <span>
                                <i className="fi fi-brands-instagram svg_img foo_svg"></i>
                              </span>
                                                            <a target={"_blank"}
                                                               href="https://www.instagram.com/beautypoint.uz">beautypoint.uz</a>
                                                        </li>
                                                    </ul>
                                                </motion.div>
                                            </div>
                                        </div>
                                        <div className="gi-footer-social">
                                            <div className="gi-footer-widget">
                                                {/* ... (Ijtimoiy tarmoqlar havolalari, tarjima talab qilinmaydi) ... */}
                                            </div>
                                        </div>
                                    </>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="container">
                            <div className="row">
                                <div className="gi-bottom-info">
                                    {/* */}
                                    <div className="footer-copy">
                                        <div className="footer-bottom-copy ">
                                            <div className="gi-copy">
                                                {/* 💡 TARJIMA 6: Copyright matni */}
                                                {t("copyright", {siteName: "Beauty Point"})}
                                            </div>
                                        </div>
                                    </div>
                                    {/* */}
                                    <div className="footer-bottom-right">
                                        <div className="footer-bottom-payment d-flex justify-content-center">
                                            <div className="payment-link">
                                                <a target={"_blank"} href="https://uzcard.uz/">
                                                    <img style={{width: "50px", height: "auto", marginRight: "20px"}}
                                                         src={"https://wp.logos-download.com/wp-content/uploads/2022/01/Uzcard_Logo-700x367.png"}
                                                         alt="payment"
                                                    />
                                                </a>
                                                <a target={"_blank"} href="https://humocard.uz/">
                                                    <img style={{width: "50px", height: "auto", marginRight: "20px"}}
                                                         src={"https://humocard.uz/upload/medialibrary/208/8x0p9hi3h9jww0flwdm92dayhn0flulj/humo-logo-more.png"}
                                                         alt="payment"
                                                    />
                                                </a>
                                                <a target={"_blank"} href="https://paynet.uz/">
                                                    <img style={{width: "60px", height: "auto", marginRight: "20px"}}
                                                         src={"https://pr.uz/wp-content/uploads/2022/12/logo-paynet.png"}
                                                         alt="payment"
                                                    />
                                                </a>
                                                <a target={"_blank"} href="https://payme.uz/">
                                                    <img style={{width: "60px", height: "auto"}}
                                                         src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Paymeuz_logo.png/2560px-Paymeuz_logo.png"}
                                                         alt="payment"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <ScrollButton/>
        </>
    )
        ;
}

export default Footer;
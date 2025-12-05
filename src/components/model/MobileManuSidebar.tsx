import {useState} from "react";
import {useTranslation} from "react-i18next";
import classic from "@/utility/header/classic";
import {Link, useNavigate} from "react-router-dom";
import banner from "@/utility/header/benner";
import column from "@/utility/header/columns";
import list from "@/utility/header/list";
import blog from "@/utility/header/blog";
import pages from "@/utility/header/pages";
import SmoothCollapse from "react-smooth-collapse";

const MobileManuSidebar = ({
                               isMobileMenuOpen,
                               closeMobileManu,
                               toggleMainMenu,
                               activeMainMenu,
                           }: any) => {
    // 'headerMenu' nom maydonidan tarjima funksiyasini chaqiramiz

    const {t} = useTranslation("headerManu");
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

    const toggleSubMenu = (submenu: string) => {
        setActiveSubMenu((prevSubMenu) =>
            prevSubMenu === submenu ? null : submenu
        );
    };
    const navigate = useNavigate();
    const data = [
        {
            id: 1,
            name: t("contact"),
            link: "/contact-us",
        },
        {
            id: 2,
            name: t("about"),
            link: "/about-us",
        },
        {
            id: 3,
            name: t("checkout"),
            link: "/checkout",
        },
        {
            id: 4,
            name: t("cart"),
            link: "/cart",
        },
        {
            id: 5,
            name: t("faq"),
            link: "/faq",
        }
    ]

    return (
        <>
            <div
                style={{display: isMobileMenuOpen ? "block" : "none"}}
                onClick={closeMobileManu}
                className="gi-mobile-menu-overlay"
            ></div>


            {isMobileMenuOpen && (
                <div id="gi-mobile-menu" className="gi-mobile-menu gi-menu-open">
                    <div className="gi-menu-title">
                        {/* ✅ TARJIMA: My Menu */}
                        <span className="menu_title">{t("menuTitle")}</span>
                        <button onClick={closeMobileManu} className="gi-close-menu">
                            ×
                        </button>
                    </div>
                    <div className="gi-menu-inner">
                        {data.map((item: any) => (
                            <div className="gi-menu-content" key={item?.id}>
                                <ul>
                                    <li className="dropdown" >
                                        {/*<span*/}
                                        {/*    onClick={() => toggleMainMenu("pages")}*/}
                                        {/*    className="menu-toggle"*/}
                                        {/*></span>*/}
                                        <a onClick={()=>{navigate(item?.link)}}>
                                            {/* ✅ TARJIMA: Pages */}
                                            {/*{t("menuPages")}*/}
                                            {item?.name}
                                        </a>
                                        <SmoothCollapse
                                            expanded={activeMainMenu === "pages"}
                                            heightTransition="1s ease"
                                        >

                                        </SmoothCollapse>
                                    </li>
                                </ul>
                            </div>
                        ))}
                        <div className="header-res-lan-curr">
                            {/* */}
                            <div className="header-res-social">
                                <div className="header-top-social">
                                    <ul className="mb-0">
                                        <li className="list-inline-item">
                                            <Link to="#">
                                                <i className="gicon gi-facebook"></i>
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="#">
                                                <i className="gicon gi-telegram"></i>
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="#">
                                                <i className="gicon gi-instagram"></i>
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="#">
                                                <i className="gicon gi-linkedin"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileManuSidebar;
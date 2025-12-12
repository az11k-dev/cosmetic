import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
// Boshqa importlar...
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
        },
        {
            id: 6,
            name: t("orders"),
            link: "/orders",
        }
    ]

    // ** DIQQAT: Style qo'shilgan joylar: **

    // ** 1. gi-mobile-menu uchun yuqoridagi kodda `height:"100vh"` allaqachon bor, bu yaxshi. **

    const menuInnerStyle = {
        height: "100%", // Ota elementning to'liq balandligini egallashi uchun
        display: "flex", // Flexbox ni yoqish
        flexDirection: "column", // Elementlarni ustma-ust taxlash
        justifyContent: "space-between", // Asosiy kontentni yuqoriga, pastki kontentni pastga itarish uchun
    };

    return (
        <>
            <div
                style={{display: isMobileMenuOpen ? "block" : "none"}}
                onClick={closeMobileManu}
                className="gi-mobile-menu-overlay"
            ></div>


            {isMobileMenuOpen && (
                <div id="gi-mobile-menu" className="gi-mobile-menu gi-menu-open" style={{height: "100vh"}}>
                    <div className="gi-menu-title">
                        {/* ✅ TARJIMA: My Menu */}
                        <span className="menu_title">{t("menuTitle")}</span>
                        <button onClick={closeMobileManu} className="gi-close-menu">
                            ×
                        </button>
                    </div>
                    {/* ** 2. gi-menu-inner ga yangi stil berildi ** */}
                    <div className="gi-menu-inner" style={menuInnerStyle}>

                        {/* ** 3. Yangi o'ram (wrapper) qo'shildi va unga flex-grow berildi ** */}
                        <div style={{flexGrow: 1, overflowY: 'auto'}}>
                            {data.map((item: any) => (
                                <div className="gi-menu-content" key={item?.id}>
                                    <ul>
                                        <li className="dropdown">
                                            <a onClick={() => {
                                                navigate(item?.link)
                                            }}>
                                                {item?.name}
                                            </a>
                                            <SmoothCollapse
                                                expanded={activeMainMenu === "pages"}
                                                heightTransition="1s ease"
                                            >
                                                {/* Sub menyu joyi */}
                                            </SmoothCollapse>
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* ** 4. Ijtimoiy tarmoqlar bloki endi eng pastda qoladi ** */}
                        <div className="header-res-lan-curr" style={{padding: '5px 0'}}>
                            <div className="header-res-social">
                                <div className="header-top-social">
                                    <ul className="mb-0">
                                        <li className="list-inline-item">
                                            <Link to="tel:+998990996050">
                                                <i className="gicon gi-phone"></i>
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="https://t.me/your_beautypoint">
                                                <i className="gicon gi-telegram"></i>
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="https://www.instagram.com/beautypoint.uz">
                                                <i className="gicon gi-instagram"></i>
                                            </Link>
                                        </li>
                                        {/*<li className="list-inline-item">*/}
                                        {/*    <Link to="#">*/}
                                        {/*        <i className="gicon gi-linkedin"></i>*/}
                                        {/*    </Link>*/}
                                        {/*</li>*/}
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
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
// Boshqa importlar...
import SmoothCollapse from "react-smooth-collapse";

// MobileManuSidebar komponenti uchun TypeScript interfeysi
interface MobileManuSidebarProps {
    isMobileMenuOpen: boolean;
    closeMobileManu: () => void; // Menyuni yopish funksiyasi
    toggleMainMenu: (menu: string) => void;
    activeMainMenu: string | null;
}

const MobileManuSidebar = ({
                               isMobileMenuOpen,
                               closeMobileManu, // Funksiyani propslardan qabul qilamiz
                               toggleMainMenu,
                               activeMainMenu,
                           }: MobileManuSidebarProps) => {

    // 'headerMenu' nom maydonidan tarjima funksiyasini chaqiramiz
    const {t} = useTranslation("headerManu");
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

    // Sub-menuni ochish/yopish logikasi (hozir ishlatilmayapti, lekin kodda bor)
    const toggleSubMenu = (submenu: string) => {
        setActiveSubMenu((prevSubMenu) =>
            prevSubMenu === submenu ? null : submenu
        );
    };

    const navigate = useNavigate();

    // Mobil menyu elementlari
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
    ];

    // Menyuning ichki qismi uchun stil
    const menuInnerStyle = {
        height: "100%",
        display: "flex",
        flexDirection: "column" as const, // TS uchun to'g'ri tur
        justifyContent: "space-between",
    };

    return (
        <>
            {/* Menyuni yopuvchi qavat (overlay) */}
            <div
                style={{display: isMobileMenuOpen ? "block" : "none"}}
                onClick={closeMobileManu}
                className="gi-mobile-menu-overlay"
            ></div>

            {/* Asosiy mobil menyu konteyneri */}
            {isMobileMenuOpen && (
                <div id="gi-mobile-menu" className="gi-mobile-menu gi-menu-open" style={{height: "100vh"}}>
                    <div className="gi-menu-title">
                        <span className="menu_title">{t("menuTitle")}</span>
                        {/* Menyuni yopish tugmasi */}
                        <button onClick={closeMobileManu} className="gi-close-menu">
                            ×
                        </button>
                    </div>

                    {/* Menyuning ichki qismi (kontent va ijtimoiy tarmoqlar) */}
                    <div className="gi-menu-inner" style={menuInnerStyle}>

                        {/* Asosiy menyu elementlari o'rami (scrolling uchun) */}
                        <div style={{flexGrow: 1, overflowY: 'auto'}}>
                            {data.map((item: any) => (
                                <div className="gi-menu-content" key={item?.id}>
                                    <ul>
                                        <li className="dropdown">
                                            {/* 👇 MUHIM O'ZGARTIRISH: navigate va closeMobileManu birgalikda chaqiriladi */}
                                            <a onClick={() => {
                                                navigate(item?.link);
                                                closeMobileManu(); // Sahifaga o'tilganda menyuni yopish
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

                        {/* Ijtimoiy tarmoqlar bloki (pastda qoladi) */}
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
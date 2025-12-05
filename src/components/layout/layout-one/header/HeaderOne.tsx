import {Link} from "react-router-dom";
import {useState} from "react";
import SidebarCart from "@/components/model/SidebarCart";
import MobileManuSidebar from "@/components/model/MobileManuSidebar";
import Dropdown from "react-bootstrap/Dropdown";
import {useTranslation} from "react-i18next"; // t funksiyasini olamiz!

// === TYPESCRIPT INTERFEYSLARI ===
interface Item {
    id: string | number;
}

// ================================

function HeaderOne() {
    // 1. t (tarjima) va i18n (tilni boshqarish) funksiyalarini olamiz
    const {t, i18n} = useTranslation("headerOne");

    // State'lar
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeMainMenu, setActiveMainMenu] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // ... (Qolgan funksiyalar) ...
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleMainMenu = (menuKey: string) => {
        setActiveMainMenu((prevMenu) => (prevMenu === menuKey ? null : menuKey));
    };
    const openMobileManu = () => setIsMobileMenuOpen((prev) => !prev);
    const closeMobileManu = () => setIsMobileMenuOpen(false);

    // Tilni o'zgartirish funksiyasi
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        window.location.reload();
    };

    // Til kodiga mos keluvchi matnni qaytarish (endilikda tarjima kaliti orqali)
    const getCurrentLanguageName = (lngCode: string) => {
        if (lngCode.startsWith('uz')) return t('common.uzbek_language');
        if (lngCode.startsWith('ru')) return t('common.russian_language');
        // Agar til sozlamalarda topilmasa
        return t('common.select_language');
    };

    const getCurrentLanguageName2 = (lngCode: string) => {
        if (lngCode.startsWith('uz')) return t('common2.uzbek_language');
        if (lngCode.startsWith('ru')) return t('common2.russian_language');
        // Agar til sozlamalarda topilmasa
        return t('common.select_language');
    };

    // Til tanlash uchun massiv (Faqat 'uz' va 'ru')
    const availableLanguages = [
        {code: 'uz', nameKey: 'common.uzbek_language'},
        {code: 'ru', nameKey: 'common.russian_language'},
    ];

    const availableLanguages2 = [
        {code2: 'uz', nameKey2: 'common2.uzbek_language'},
        {code2: 'ru', nameKey2: 'common2.russian_language'},
    ];


    return (
        <>
            <div className="header-top">
                <div className="container">
                    <div className="row align-itegi-center">

                        {/* */}
                        <div className="col text-center header-top-center">
                            <div className="header-top-message">
                                {/* Matnni tarjima qilish */}
                                {t('header.slogan')}
                            </div>
                        </div>
                        {/* */}
                        <div className="col header-top-right d-none d-lg-block">
                            <div className="header-top-right-inner d-flex justify-content-end">
                                <Link className="gi-help" to="/faq">
                                    {/* Matnni tarjima qilish */}
                                    {t('header.help')}
                                </Link>


                                <Dropdown className="header-top-lan-curr header-top-lan">
                                    <Dropdown.Toggle variant="" className="dropdown-toggle" id="dropdown-basic">
                                        {/* Hozirgi aktiv til nomini tarjima orqali ko'rsatish */}
                                        {getCurrentLanguageName(i18n.language)}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu as="ul">
                                        {availableLanguages.map((lang) => (
                                            <Dropdown.Item
                                                as="li"
                                                key={lang.code}
                                                onClick={() => changeLanguage(lang.code)}
                                                className={i18n.language.startsWith(lang.code) ? 'active' : ''}
                                            >


                                                {/* Dropdown menyusidagi tillarning nomini tarjima orqali ko'rsatish */}
                                                {t(lang.nameKey)}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>

                                </Dropdown>
                                {/* */}
                            </div>
                        </div>
                        {/* */}
                        <div className="col header-top-res d-lg-none">
                            <div className="gi-header-bottons">
                                <div className="right-icons">
                                    <div className="gi-header-btn gi-header-user gi-header-rtl-btn">
                                        <Dropdown className="header-top-lan-curr header-top-lan  ">
                                            <Dropdown.Toggle variant="" className="dropdown-toggle" id="dropdown-basic">
                                                {getCurrentLanguageName2(i18n.language)}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu as="ul">
                                                {availableLanguages2.map((lang) => (
                                                    <Dropdown.Item
                                                        as="li"
                                                        key={lang.code2}
                                                        onClick={() => changeLanguage(lang.code2)}
                                                        className={i18n.language.startsWith(lang.code2) ? 'active' : ''}
                                                    >
                                                        {/* Dropdown menyusidagi tillarning nomini tarjima orqali ko'rsatish */}
                                                        {t(lang.nameKey2)}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>

                                    </div>


                                    <Link
                                        to="/user-profile"
                                        className="gi-header-btn gi-header-user gi-header-rtl-btn"
                                        title={t('header.login')} // title atributini ham tarjima qilamiz
                                    >
                                        <div className="header-icon">
                                            <i className="fi-rr-user"></i>
                                        </div>
                                    </Link>
                                    {/* */}
                                    <Link
                                        to="/wishlist"
                                        className="gi-header-btn gi-wish-toggle gi-header-rtl-btn"
                                        title={t('header.wishlist')} // title atributini ham tarjima qilamiz
                                    >
                                        <div className="header-icon">
                                            <i className="fi-rr-heart"></i>
                                        </div>
                                    </Link>
                                    {/* */}
                                    <Link
                                        to="#"
                                        className="gi-header-btn gi-cart-toggle gi-header-rtl-btn"
                                        onClick={openCart}
                                        title={t('header.shopping_bag')} // title atributini ham tarjima qilamiz
                                    >
                                        <div className="header-icon">
                                            <i className="fi-rr-shopping-bag"></i>
                                            <span className="main-label-note-new"></span>
                                        </div>
                                    </Link>
                                    {/* */}
                                    <Link
                                        onClick={openMobileManu}
                                        to="#"
                                        className="gi-header-btn gi-site-menu-icon d-lg-none"
                                    >
                                        <i className="fi-rr-menu-burger"></i>
                                    </Link>

                                    {/* */}
                                </div>
                            </div>
                        </div>
                        {/* */}
                    </div>
                </div>
            </div>
            <SidebarCart isCartOpen={isCartOpen} closeCart={closeCart}/>
            <MobileManuSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                closeMobileManu={closeMobileManu}
                toggleMainMenu={toggleMainMenu as (key: string) => void}
                activeMainMenu={activeMainMenu}
            />
        </>
    );
}

export default HeaderOne;
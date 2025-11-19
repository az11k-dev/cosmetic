import { Link } from "react-router-dom";
import { useState } from "react";
// 💡 Redux/i18next uchun qo'shilgan importlar
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux"; // useSelector hozirgi tilni o'qish uchun foydali bo'lishi mumkin
import { setLanguage } from "@/store/reducers/i18nSlice.ts"; // Redux action'imiz
// import { RootState } from "../store";

// import SidebarCart from "@/components/model/SidebarCart";
import MobileManuSidebar from "@/components/model/MobileManuSidebar";
import Dropdown from "react-bootstrap/Dropdown";

function HeaderOne({ cartItems, wishlistItems }: any) {
    // 💡 1. i18next hook'ini ishlatish
    const { t, i18n } = useTranslation('headerOne');

    // 💡 2. Redux dispatch'ni ishlatish
    const dispatch = useDispatch();
    // Tilni Redux state'dan o'qish (agar kerak bo'lsa)
    // const currentReduxLang = useSelector((state: RootState) => state.i18n.currentLanguage);


    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeMainMenu, setActiveMainMenu] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // ... (Boshqa funksiyalar joyida qoladi) ...

    const openCart = () => {
        setIsCartOpen(true);
    };

    // ... (Boshqa funksiyalar joyida qoladi) ...


    // 💡 3. Tilni o'zgartirish funksiyasini yangilash
    const changeLanguage = (lng: string) => {
        // A. i18next'ni yangilash (sahifa matnlarini o'zgartiradi)
        i18n.changeLanguage(lng);

        // B. Redux state'ni yangilash (tilni localStorage da saqlaydi)
        dispatch(setLanguage(lng));
    };


    return (
        <>
            <div className="header-top">
                <div className="container">
                    <div className="row align-itegi-center">

                        {/* */}
                        <div className="col text-center header-top-center">
                            <div className="header-top-message">
                                {/* 💡 TARJIMA 1: Matnni t() funksiyasi bilan almashtiramiz */}
                                {t('fastShopping')}
                            </div>
                        </div>
                        {/* */}
                        <div className="col header-top-right d-none d-lg-block">
                            <div className="header-top-right-inner d-flex justify-content-end">
                                <Link className="gi-help" to="/faq">
                                    {/* 💡 TARJIMA 2: Help? */}
                                    {t('help')}
                                </Link>
                                <Link className="gi-help" to="/track-order">
                                    {/* 💡 TARJIMA 3: Track Order? */}
                                    {t('trackOrder')}
                                </Link>
                                {/* */}
                                <Dropdown className="header-top-lan-curr header-top-lan">
                                    <Dropdown.Toggle
                                        variant=""
                                        className="dropdown-toggle"
                                        id="dropdown-basic"
                                    >
                                        {/* 💡 Matnni dinamik ko'rsatish: i18n.language dan foydalanish */}
                                        {i18n.language === 'uz' ? t('languageUzbek') : t('languageRussian')}
                                        <i
                                            className="fi-rr-angle-small-down"
                                            aria-hidden="true"
                                        ></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu as="ul">
                                        {/* 💡 O'zbek tili varianti (uz) */}
                                        <Dropdown.Item
                                            as="li"
                                            onClick={() => changeLanguage('uz')} // 💡 Tilni o'zgartirish
                                            className={i18n.language === 'uz' ? 'active' : ''}
                                        >
                                            {t('languageUzbek')}
                                        </Dropdown.Item>
                                        {/* 💡 Rus tili varianti (ru) */}
                                        <Dropdown.Item
                                            as="li"
                                            onClick={() => changeLanguage('ru')} // 💡 Tilni o'zgartirish
                                            className={i18n.language === 'ru' ? 'active' : ''}
                                        >
                                            {t('languageRussian')}
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                {/* */}

                            </div>
                        </div>
                        {/* ... (Komponentning qolgan qismi o'zgarishsiz qoladi) ... */}
                    </div>
                </div>
            </div>
            {/*<SidebarCart isCartOpen={isCartOpen} closeCart={closeCart} />*/}
            <MobileManuSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                // closeMobileManu={closeMobileManu}
                // toggleMainMenu={toggleMainMenu}
                activeMainMenu={activeMainMenu}
            />
        </>
    );
}

export default HeaderOne;
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import SidebarCart from "../../../model/SidebarCart";
import {useAuth} from "@/context/AuthContext";
import {useTranslation} from "react-i18next";
import useDebounce from "@/hooks/useDebounce";
import Dropdown from "react-bootstrap/Dropdown";
import {changeLanguage} from "i18next"; // Используем хук, созданный ранее

// 💡 НОВЫЕ ТИПЫ ДЛЯ ЛОКАЛИЗАЦИИ И РЕЗУЛЬТАТА
interface LocalizedString {
    uz: string;
    ru: string;
    // Добавьте другие языки, если они поддерживаются
}

interface SearchResult {
    id: number;
    name: LocalizedString;
    price: string;
    image_url?: string;
}

const SEARCH_API_URL = "https://admin.beauty-point.uz/api/search?q=";



function HeaderTwo({cartItems, wishlistItems}: any) {
    // 💡 Получаем i18n instance для доступа к текущему языку
    const {t, i18n} = useTranslation("headerTwo");

    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedSearchTerm = useDebounce(searchInput, 500);

    const {isAuthenticated, logout: contextLogout} = useAuth();

    // 💡 ФУНКЦИЯ ДЛЯ ОПРЕДЕЛЕНИЯ ИМЕНИ НА ТЕКУЩЕМ ЯЗЫКЕ
    const getProductName = (name: LocalizedString) => {
        // Получаем текущий язык (например, 'ru' или 'uz')
        const currentLang = i18n.language as keyof LocalizedString;

        // Возвращаем имя на текущем языке. Если нет, по умолчанию берем 'ru' или 'uz'.
        return name[currentLang] || name['ru'] || name['uz'] || 'Product Name';
    };


    // 💡 useEffect для выполнения API-запроса
    useEffect(() => {
        const fetchSearchResults = async (query: string) => {
            if (query.trim().length < 2) {
                setSearchResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`${SEARCH_API_URL}${query}`);
                const jsonResponse = await response.json();

                // 💡 ИЗВЛЕЧЕНИЕ ДАННЫХ: Извлекаем массив из data.products
                const productsArray = jsonResponse?.data?.products || [];

                if (Array.isArray(productsArray)) {
                    setSearchResults(productsArray.slice(0, 5) as SearchResult[]);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error("Ошибка при поиске:", error);
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearchResults(debouncedSearchTerm);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm]);


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchInput.trim()) {
            navigate(`/shop-full-width-col-4?q=${searchInput}`);
            setSearchResults([]);
        }
    };

    const handleResultClick = () => {
        // Очищаем поле ввода и результаты после клика
        setSearchResults([]);
        setSearchInput("");
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const handleLogout = () => {
        // 1. Context Logout: очищает контекст и localStorage
        contextLogout();
        navigate("/");
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        window.location.reload();
    };

    const getCurrentLanguageName = (lngCode: string) => {
        if (lngCode.startsWith('uz')) return t('common.uzbek_language');
        if (lngCode.startsWith('ru')) return t('common.russian_language');
        // Agar til sozlamalarda topilmasa
        return t('common.select_language');
    };
    const availableLanguages = [
        {code: 'uz', nameKey: 'common.uzbek_language'},
        {code: 'ru', nameKey: 'common.russian_language'},
    ];

    return (
        <>
            <div className="gi-header-bottom d-lg-block">
                <div className="container position-relative">
                    <div className="row">
                        <div className="gi-flex">

                            {/* 💡 ВОССТАНОВЛЕН: ЛОГОТИП */}
                            <div className="align-self-center gi-header-logo">
                                <div className="header-logo">
                                    <Link to="/">
                                        <img
                                            src={
                                                "/assets/img/logo/logo.png"
                                            }
                                            alt="Site Logo"
                                        />
                                    </Link>
                                </div>
                            </div>

                            {/* ... СЕКЦИЯ ПОИСКА ... */}
                            <div className="align-self-center gi-header-search">
                                <div className="header-search position-relative">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="gi-search-group-form"
                                        action="#"
                                    >
                                        <input
                                            className="form-control gi-search-bar"
                                            placeholder={t("searchProducts")}
                                            type="text"
                                            value={searchInput}
                                            onChange={handleSearch}
                                        />
                                        <button className="search_submit" type="submit">
                                            <i className="fi-rr-search"></i>
                                        </button>
                                    </form>

                                    {/* 💡 РЕНДЕРИНГ РЕЗУЛЬТАТОВ */}
                                    {searchInput.trim() && (searchResults.length > 0 || isLoading || (debouncedSearchTerm.length > 1 && !isLoading && searchResults.length === 0)) && (
                                        <div className="search-results-dropdown">
                                            {isLoading && <div className="loading-indicator">{t("loading")}...</div>}

                                            {!isLoading && searchResults.length > 0 && (
                                                <ul className="list-group">
                                                    {searchResults.map((result) => (
                                                        // 💡 Используем красивый макет с изображением
                                                        <li key={result.id}
                                                            className="list-group-item search-item-with-image">
                                                            <Link
                                                                to={`/product-details/${result.id}`}
                                                                onClick={handleResultClick}
                                                                className="search-item-link"
                                                            >

                                                                {/* 💡 СЕКЦИЯ ДЕТАЛЕЙ */}
                                                                <div className="item-details">
                                                                    <div className="item-title">
                                                                        {getProductName(result.name)}
                                                                    </div>
                                                                    <div className="item-price">
                                                                        {result.price} UZS
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* Если нет результатов и поиск завершен */}
                                            {!isLoading && debouncedSearchTerm.length > 1 && searchResults.length === 0 && (
                                                <div className="no-results p-2 text-muted">
                                                    {t("noResultsFound", {query: searchInput})}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 💡 ВОССТАНОВЛЕН: КНОПКИ ДЕЙСТВИЙ (АККАУНТ, ИЗБРАННОЕ, КОРЗИНА) */}
                            <div className="gi-header-action align-self-center">
                                <div className="gi-header-bottons">
                                    {/* Account Dropdown (использует isAuthenticated из Context) */}
                                    <div className="gi-acc-drop">
                                        <Link
                                            to="/"
                                            className="gi-header-btn gi-header-user dropdown-toggle gi-user-toggle gi-header-rtl-btn"
                                            title={t("account")}
                                        >
                                            <div className="header-icon">
                                                <i className="fi-rr-user"></i>
                                            </div>
                                            <div className="gi-btn-desc">
                                                <span className="gi-btn-title">{t("account")}</span>
                                                <span className="gi-btn-stitle">
                                                    {isAuthenticated ? t("logout") : t("login")}
                                                </span>
                                            </div>
                                        </Link>
                                        <ul className="gi-dropdown-menu">
                                            {isAuthenticated ? (
                                                <>
                                                    <li>
                                                        <Link className="dropdown-item" to="/user-profile">
                                                            {t("myProfile")}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/orders">
                                                            {t("orders")}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        {/* 💡 Используем handleLogout */}
                                                        <a className="dropdown-item" onClick={handleLogout}>
                                                            {t("logout")}
                                                        </a>
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li>
                                                        <Link className="dropdown-item" to="/register">
                                                            {t("register")}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/checkout">
                                                            {t("checkout")}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/login">
                                                            {t("login")}
                                                        </Link>
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                    {/* Wishlist */}
                                    <Link
                                        to="/wishlist"
                                        className="gi-header-btn gi-wish-toggle gi-header-rtl-btn"
                                        title={t("wishlist")}
                                    >
                                        <div className="header-icon">
                                            <i className="fi-rr-heart"></i>
                                        </div>
                                        <div className="gi-btn-desc">
                                            <span className="gi-btn-stitle">{t("wishlist")}</span>
                                        </div>
                                    </Link>
                                    <Dropdown className="header-top-lan-curr header-top-lan gi-header-btn gi-header-user dropdown-toggle gi-user-toggle gi-header-rtl-btn">
                                        <Dropdown.Toggle variant="" className="gi-btn-stitle" id="dropdown-basic">
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
                                    {/* Cart */}
                                    <Link
                                        onClick={openCart}
                                        to={{hash: "#"}}
                                        className="gi-header-btn gi-cart-toggle gi-header-rtl-btn"
                                        title={t("cart")}
                                    >
                                        <div className="header-icon">
                                            <i className="fi-rr-shopping-bag"></i>
                                            <span className="main-label-note-new"></span>
                                        </div>
                                        <div className="gi-btn-desc">
                                            <span className="gi-btn-stitle">{t("cart")}</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SidebarCart isCartOpen={isCartOpen} closeCart={closeCart}/>
        </>
    );
}

export default HeaderTwo;
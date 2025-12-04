import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import SidebarCart from "../../../model/SidebarCart";
import {useAuth} from "@/context/AuthContext";
import {useTranslation} from "react-i18next";
import useDebounce from "@/hooks/useDebounce"; // Используем хук, созданный ранее

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

                // 💡 ГЛАВНОЕ ИЗМЕНЕНИЕ: Извлекаем массив из data.products
                const productsArray = jsonResponse?.data?.products || [];

                if (Array.isArray(productsArray)) {
                    // Используем .slice() для ограничения количества отображаемых результатов
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

    // ... openCart, closeCart, handleLogout (без изменений) ...
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const handleLogout = () => {
        contextLogout();
        navigate("/");
    };

    return (
        <>
            <div className="gi-header-bottom d-lg-block">
                <div className="container position-relative">
                    <div className="row">
                        <div className="gi-flex">
                            {/* ... Логотип ... */}
                            {/* ... Поле поиска ... */}
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
                                                        // 💡 КЛАССЫ ИЗМЕНЕНЫ ДЛЯ НОВОГО МАКЕТА
                                                        <li key={result.id}
                                                            className="list-group-item search-item-with-image">
                                                            <Link
                                                                to={`/product-details/${result.id}`}
                                                                onClick={handleResultClick}
                                                                className="search-item-link"
                                                            >
                                                                {/* 💡 СЕКЦИЯ ИЗОБРАЖЕНИЯ */}

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
                                                    {/* Ссылка на полную страницу поиска (без изменений) */}
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
                        </div>
                    </div>
                </div>
            </div>
            <SidebarCart isCartOpen={isCartOpen} closeCart={closeCart}/>
        </>
    );
}

export default HeaderTwo;
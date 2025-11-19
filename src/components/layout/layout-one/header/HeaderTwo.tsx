import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import SidebarCart from "../../../model/SidebarCart";

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {setSearchTerm} from "@/store/reducers/filterReducer";

// 💡 ИМПОРТИРУЕМ useAuth ДЛЯ АУТЕНТИФИКАЦИИ
import {useAuth} from "@/context/AuthContext";

import {useTranslation} from "react-i18next";

function HeaderTwo({cartItems, wishlistItems}: any) {
    const {t} = useTranslation("headerTwo");

    const [isCartOpen, setIsCartOpen] = useState(false);

    // --- Redux ОСТАВЛЕН только для Filter/Search ---
    const dispatch = useDispatch();
    const {searchTerm} = useSelector((state: RootState) => state.filter);
    const [searchInput, setSearchInput] = useState(searchTerm || "");
    // ------------------------------------------------

    const navigate = useNavigate();

    // 💡 ЗАМЕНА Redux Hooks: используем хук useAuth
    const {isAuthenticated, logout: contextLogout} = useAuth(); // Переименовываем, чтобы избежать конфликта, если бы мы оставили Redux logout

    // ❌ УДАЛЯЕМ: useEffect для загрузки login_user,
    //            так как это теперь обрабатывается в AuthProvider.
    // useEffect(() => { ... }, [dispatch]);

    const handleSearch = (event: any) => {
        setSearchInput(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setSearchTerm(searchInput));
        navigate("/shop-full-width-col-4");
    };

    const openCart = () => {
        setIsCartOpen(true);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    // 💡 ОБНОВЛЕННАЯ ФУНКЦИЯ LOGOUT
    const handleLogout = () => {
        // 1. Context Logout: очищает контекст и localStorage
        contextLogout();

        navigate("/");
    };

    return (
        <>
            <div className="gi-header-bottom d-lg-block">
                <div className="container position-relative">
                    <div className="row">
                        <div className="gi-flex">
                            {/* */}
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
                            {/* */}
                            <div className="align-self-center gi-header-search">
                                <div className="header-search">
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
                                </div>
                            </div>
                            {/* */}
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
                                            <span className="gi-btn-title">{t("wishlist")}</span>
                                            <span className="gi-btn-stitle">
                        <b className="gi-wishlist-count">
                          {wishlistItems.length}
                        </b>
                                                {t("items")}
                      </span>
                                        </div>
                                    </Link>
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
                                            <span className="gi-btn-title">{t("cart")}</span>
                                            <span className="gi-btn-stitle">
                        <b className="gi-cart-count">{cartItems.length}</b>
                                                {t("items")}
                      </span>
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
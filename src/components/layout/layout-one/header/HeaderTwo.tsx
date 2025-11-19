import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SidebarCart from "../../../model/SidebarCart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { logout, setUserData } from "@/store/reducers/registrationSlice";
import { setSearchTerm } from "@/store/reducers/filterReducer";
// 💡 Yangi import: Tarjima uchun
import { useTranslation } from "react-i18next";

function HeaderTwo({ cartItems, wishlistItems }: any) {
    // 💡 useTranslation hook'ini ishlatish, nom maydoni (namespace) "headerTwo"
    const { t } = useTranslation("headerTwo");

    const [isCartOpen, setIsCartOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(
        (state: RootState) => state.registration.isAuthenticated
    );
    const { searchTerm } = useSelector((state: RootState) => state.filter);
    const [searchInput, setSearchInput] = useState(searchTerm || "");

    useEffect(() => {
        const userdata = localStorage.getItem("login_user") ?? "";
        const user = userdata !== "" ? JSON.parse(userdata) : null;
        dispatch(setUserData({ isAuthenticated: userdata !== "", user }));
    }, [dispatch]);

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

    const handleLogout = () => {
        localStorage.removeItem("login_user");
        dispatch(logout());
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
                                            // 💡 TARJIMA: placeholder matni
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
                                    {/* */}
                                    <div className="gi-acc-drop">
                                        <Link
                                            to="/"
                                            className="gi-header-btn gi-header-user dropdown-toggle gi-user-toggle gi-header-rtl-btn"
                                            // 💡 TARJIMA: Title atributi
                                            title={t("account")}
                                        >
                                            <div className="header-icon">
                                                <i className="fi-rr-user"></i>
                                            </div>
                                            <div className="gi-btn-desc">
                                                {/* 💡 TARJIMA: Akkaunt nomi */}
                                                <span className="gi-btn-title">{t("account")}</span>
                                                <span className="gi-btn-stitle">
                          {" "}
                                                    {/* 💡 TARJIMA: Login/Logout holati */}
                                                    {isAuthenticated ? t("logout") : t("login")}
                        </span>
                                            </div>
                                        </Link>
                                        <ul className="gi-dropdown-menu">
                                            {isAuthenticated ? (
                                                <>
                                                    <li>
                                                        <Link className="dropdown-item" to="/user-profile">
                                                            {/* 💡 TARJIMA: Mening profilim */}
                                                            {t("myProfile")}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/orders">
                                                            {/* 💡 TARJIMA: Buyurtmalar */}
                                                            {t("orders")}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" onClick={handleLogout}>
                                                            {/* 💡 TARJIMA: Chiqish */}
                                                            {t("logout")}
                                                        </a>
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li>
                                                        <Link className="dropdown-item" to="/register">
                                                            {/* 💡 TARJIMA: Ro'yxatdan o'tish */}
                                                            {t("register")}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/checkout">
                                                            {/* 💡 TARJIMA: To'lov */}
                                                            {t("checkout")}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/login">
                                                            {/* 💡 TARJIMA: Kirish */}
                                                            {t("login")}
                                                        </Link>
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                    {/* */}
                                    <Link
                                        to="/wishlist"
                                        className="gi-header-btn gi-wish-toggle gi-header-rtl-btn"
                                        // 💡 TARJIMA: Title atributi
                                        title={t("wishlist")}
                                    >
                                        <div className="header-icon">
                                            <i className="fi-rr-heart"></i>
                                        </div>
                                        <div className="gi-btn-desc">
                                            {/* 💡 TARJIMA: Sevimlilar nomi */}
                                            <span className="gi-btn-title">{t("wishlist")}</span>
                                            <span className="gi-btn-stitle">
                        <b className="gi-wishlist-count">
                          {wishlistItems.length}
                        </b>
                                                {/* 💡 TARJIMA: elementlar soni matni */}
                                                {t("items")}
                      </span>
                                        </div>
                                    </Link>
                                    {/* */}
                                    <Link
                                        onClick={openCart}
                                        to={{ hash: "#" }}
                                        className="gi-header-btn gi-cart-toggle gi-header-rtl-btn"
                                        // 💡 TARJIMA: Title atributi
                                        title={t("cart")}
                                    >
                                        <div className="header-icon">
                                            <i className="fi-rr-shopping-bag"></i>
                                            <span className="main-label-note-new"></span>
                                        </div>
                                        <div className="gi-btn-desc">
                                            {/* 💡 TARJIMA: Savat nomi */}
                                            <span className="gi-btn-title">{t("cart")}</span>
                                            <span className="gi-btn-stitle">
                        <b className="gi-cart-count">{cartItems.length}</b>
                                                {/* 💡 TARJIMA: elementlar soni matni */}
                                                {t("items")}
                      </span>
                                        </div>
                                    </Link>
                                    {/* */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SidebarCart isCartOpen={isCartOpen} closeCart={closeCart} />
        </>
    );
}

export default HeaderTwo;
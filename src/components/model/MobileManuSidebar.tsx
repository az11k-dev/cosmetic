import { useState } from "react";
import { useTranslation } from "react-i18next";
import classic from "@/utility/header/classic";
import { Link } from "react-router-dom";
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
    const { t } = useTranslation("manuMobile");
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

    const toggleSubMenu = (submenu: string) => {
        setActiveSubMenu((prevSubMenu) =>
            prevSubMenu === submenu ? null : submenu
        );
    };

    return (
        <>
            <div
                style={{ display: isMobileMenuOpen ? "block" : "none" }}
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
                        <div className="gi-menu-content">
                            <ul>
                                {/* === CATEGORIES (TOIFALAR) === */}
                                <li>
                  <span
                      onClick={() => toggleMainMenu("Categories")}
                      className="menu-toggle"
                  ></span>
                                    <Link to="#" onClick={() => toggleMainMenu("Categories")}>
                                        {/* ✅ TARJIMA: Categories */}
                                        {t("menuCategories")}
                                    </Link>
                                    <SmoothCollapse
                                        expanded={activeMainMenu === "Categories"}
                                        heightTransition="1s ease"
                                    >
                                        <ul
                                            style={{
                                                display:
                                                    activeMainMenu === "Categories" ? "block" : "none",
                                            }}
                                            className="sub-menu"
                                        >
                                            {/* Sub-menu 1: Classic Variation */}
                                            <li className={`${activeSubMenu ? "active" : ""}`}>
                        <span
                            onClick={() => toggleSubMenu("Classic")}
                            className="menu-toggle-plus togglr-plus-rtl"
                        >
                          {activeSubMenu === "Classic" ? "-" : "+"}
                        </span>
                                                <a onClick={() => toggleSubMenu("Classic")} >
                                                    {/* ✅ TARJIMA: Classic Variation */}
                                                    {t("varClassic")}
                                                </a>
                                                <SmoothCollapse
                                                    expanded={activeSubMenu === "Classic"}
                                                    heightTransition="1s ease"
                                                >
                                                    <ul
                                                        style={{
                                                            display:
                                                                activeSubMenu === "Classic" ? "block" : "none",
                                                        }}
                                                        className="sub-menu"
                                                    >
                                                        {classic.map((data, index) => (
                                                            <li key={index}>
                                                                {/* data.name utility faylidan olinadi va keyin tarjima qilinishi kerak */}
                                                                <Link to={data.href}>{data.name}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </SmoothCollapse>
                                            </li>
                                            {/* Sub-menu 2: Banner Variation */}
                                            <li>
                        <span
                            onClick={() => toggleSubMenu("Banner")}
                            className="menu-toggle-plus togglr-plus-rtl"
                        >
                          {activeSubMenu === "Banner" ? "-" : "+"}
                        </span>
                                                <a onClick={() => toggleSubMenu("Banner")} >
                                                    {/* ✅ TARJIMA: Banner Variation */}
                                                    {t("varBanner")}
                                                </a>
                                                <SmoothCollapse
                                                    expanded={activeSubMenu === "Banner"}
                                                    heightTransition="1s ease"
                                                >
                                                    <ul
                                                        style={{
                                                            display:
                                                                activeSubMenu === "Banner" ? "block" : "none",
                                                        }}
                                                        className="sub-menu"
                                                    >
                                                        {banner.map((data, index) => (
                                                            <li key={index}>
                                                                {/* Banner {data.name} - bu yerdagi "Banner" so'zi hozircha qoldi, uni ham tarjima qilish mumkin */}
                                                                <Link to={data.href}>Banner {data.name}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </SmoothCollapse>
                                            </li>
                                            {/* Sub-menu 3: Columns Variation */}
                                            <li>
                        <span
                            onClick={() => toggleSubMenu("Columns")}
                            className="menu-toggle-plus togglr-plus-rtl"
                        >
                          {activeSubMenu === "Columns" ? "-" : "+"}
                        </span>
                                                <a onClick={() => toggleSubMenu("Columns")} >
                                                    {/* ✅ TARJIMA: Columns Variation */}
                                                    {t("varColumns")}
                                                </a>
                                                <SmoothCollapse
                                                    expanded={activeSubMenu === "Columns"}
                                                    heightTransition="1s ease"
                                                >
                                                    <ul
                                                        style={{
                                                            display:
                                                                activeSubMenu === "Columns" ? "block" : "none",
                                                        }}
                                                        className="sub-menu"
                                                    >
                                                        {column.map((data, index) => (
                                                            <li key={index}>
                                                                <Link to={data.href}>{data.name}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </SmoothCollapse>
                                            </li>
                                            {/* Sub-menu 4: List Variation */}
                                            <li>
                        <span
                            onClick={() => toggleSubMenu("List")}
                            className="menu-toggle-plus togglr-plus-rtl"
                        >
                          {activeSubMenu === "List" ? "-" : "+"}
                        </span>
                                                <a onClick={() => toggleSubMenu("List")} >
                                                    {/* ✅ TARJIMA: List Variation */}
                                                    {t("varList")}
                                                </a>
                                                <SmoothCollapse
                                                    expanded={activeSubMenu === "List"}
                                                    heightTransition="1s ease"
                                                >
                                                    <ul
                                                        style={{
                                                            display:
                                                                activeSubMenu === "List" ? "block" : "none",
                                                        }}
                                                        className="sub-menu"
                                                    >
                                                        {list.map((data, index) => (
                                                            <li key={index}>
                                                                <Link to={data.href}>{data.name}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </SmoothCollapse>
                                            </li>
                                        </ul>
                                    </SmoothCollapse>
                                </li>
                                {/* === PRODUCTS (MAHSULOTLAR) === */}
                                <li>
                  <span
                      onClick={() => toggleMainMenu("Products")}
                      className="menu-toggle"
                  ></span>
                                    <a onClick={() => toggleMainMenu("Products")} >
                                        {/* ✅ TARJIMA: Products */}
                                        {t("menuProducts")}
                                    </a>
                                    <SmoothCollapse
                                        expanded={activeMainMenu === "Products"}
                                        heightTransition="1s ease"
                                    >
                                        <ul
                                            style={{
                                                display:
                                                    activeMainMenu === "Products" ? "block" : "none",
                                            }}
                                            className="sub-menu"
                                        >
                                            {/* Sub-menu: Product page */}
                                            <li>
                        <span
                            onClick={() => toggleSubMenu("product")}
                            className="menu-toggle-plus togglr-plus-rtl"
                        >
                          {activeSubMenu === "product" ? "-" : "+"}
                        </span>
                                                <a onClick={() => toggleSubMenu("product")} >
                                                    {/* ✅ TARJIMA: Product page */}
                                                    {t("prodPage")}
                                                </a>
                                                <SmoothCollapse
                                                    expanded={activeSubMenu === "product"}
                                                    heightTransition="1s ease"
                                                >
                                                    <ul
                                                        style={{
                                                            display:
                                                                activeSubMenu === "product" ? "block" : "none",
                                                        }}
                                                        className="sub-menu"
                                                    >
                                                        <li>
                                                            <Link to="/product-left-sidebar">
                                                                {/* ✅ TARJIMA: Product left sidebar */}
                                                                {t("prodLeftSidebar")}
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/product-right-sidebar">
                                                                {/* ✅ TARJIMA: Product right sidebar */}
                                                                {t("prodRightSidebar")}
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </SmoothCollapse>
                                            </li>
                                            {/* Sub-menu: Product accordion */}
                                            <li>
                        <span
                            onClick={() => toggleSubMenu("productAccordion")}
                            className="menu-toggle-plus togglr-plus-rtl"
                        >
                          {activeSubMenu === "productAccordion" ? "-" : "+"}
                        </span>
                                                <a
                                                    onClick={() => toggleSubMenu("productAccordion")}
                                                >
                                                    {/* ✅ TARJIMA: Product accordion */}
                                                    {t("prodAccordion")}
                                                </a>
                                                <SmoothCollapse
                                                    expanded={activeSubMenu === "productAccordion"}
                                                    heightTransition="1s ease"
                                                >
                                                    <ul
                                                        style={{
                                                            display:
                                                                activeSubMenu === "productAccordion"
                                                                    ? "block"
                                                                    : "none",
                                                        }}
                                                        className="sub-menu"
                                                    >
                                                        <li>
                                                            <Link to="/product-according-left-sidebar">
                                                                {/* ✅ TARJIMA: left sidebar */}
                                                                {t("prodAccLeftSidebar")}
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/product-according-right-sidebar">
                                                                {/* ✅ TARJIMA: right sidebar */}
                                                                {t("prodAccRightSidebar")}
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </SmoothCollapse>
                                            </li>
                                            {/* Link: Product full width */}
                                            <li>
                                                <Link to="/product-full-width">
                                                    {/* ✅ TARJIMA: Product full width */}
                                                    {t("prodFullWidth")}
                                                </Link>
                                            </li>
                                            {/* Link: accordion full width */}
                                            <li>
                                                <Link to="/product-according-full-width">
                                                    {/* ✅ TARJIMA: accordion full width */}
                                                    {t("prodAccordionFullWidth")}
                                                </Link>
                                            </li>
                                        </ul>
                                    </SmoothCollapse>
                                </li>
                                {/* === BLOG === */}
                                <li className="dropdown">
                  <span
                      onClick={() => toggleMainMenu("blog")}
                      className="menu-toggle"
                  ></span>
                                    <a onClick={() => toggleMainMenu("blog")} >
                                        {/* ✅ TARJIMA: Blog */}
                                        {t("menuBlog")}
                                    </a>
                                    <SmoothCollapse
                                        expanded={activeMainMenu === "blog"}
                                        heightTransition="1s ease"
                                    >
                                        <ul
                                            style={{
                                                display: activeMainMenu === "blog" ? "block" : "none",
                                            }}
                                            className="sub-menu"
                                        >
                                            {blog.map((data, index) => (
                                                <li key={index}>
                                                    <Link to={data.href}>{data.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </SmoothCollapse>
                                </li>
                                {/* === PAGES === */}
                                <li className="dropdown">
                  <span
                      onClick={() => toggleMainMenu("pages")}
                      className="menu-toggle"
                  ></span>
                                    <a onClick={() => toggleMainMenu("pages")}>
                                        {/* ✅ TARJIMA: Pages */}
                                        {t("menuPages")}
                                    </a>
                                    <SmoothCollapse
                                        expanded={activeMainMenu === "pages"}
                                        heightTransition="1s ease"
                                    >
                                        <ul
                                            style={{
                                                display: activeMainMenu === "pages" ? "block" : "none",
                                            }}
                                            className="sub-menu"
                                        >
                                            {pages.map((data, index) => (
                                                <li key={index}>
                                                    <Link to={data.href}>{data.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </SmoothCollapse>
                                </li>
                            </ul>
                        </div>


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
                                                <i className="gicon gi-twitter"></i>
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
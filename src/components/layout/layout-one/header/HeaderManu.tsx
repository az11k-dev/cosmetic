import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import classic from "@/utility/header/classic";
import banner from "@/utility/header/benner";
import column from "@/utility/header/columns";
import list from "@/utility/header/list";
import blog from "@/utility/header/blog";
import pages from "@/utility/header/pages";
import fruits from "@/utility/header/fruits";
import bakery from "@/utility/header/bakery";
import snacks from "@/utility/header/snacks";
import spice from "@/utility/header/spice";
import juice from "@/utility/header/juice";
import softdrink from "@/utility/header/softdrink";
import productpage from "@/utility/header/productpage";
import CurrentLocation from "./CurrentLocation";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {Fade} from "react-awesome-reveal";


function HeaderManu() {
    const {t} = useTranslation("headerManu"); // Namespace 'headerMenu'
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleProductClick = (index: number) => {
        setSelectedIndex(index);
    };
    return (
        <>
            <div className="gi-header-cat d-none d-lg-block">
                <div className="container position-relative">
                    <div className="gi-nav-bar">
                        {/* */}
                        <Tabs
                            selectedIndex={selectedIndex}
                            onSelect={(selectedIndex) => setSelectedIndex(selectedIndex)}
                            className="gi-category-icon-block"
                        >
                            <div className="gi-category-menu">
                                <div className="gi-category-toggle">
                                    <i className="fi fi-rr-apps"></i>
                                    {/* 💡 TARJIMA 1: All Categories */}
                                    <span className="text">{t("allCategories")}</span>
                                    <i
                                        className="fi-rr-angle-small-down d-1199 gi-angle"
                                        aria-hidden="true"
                                    ></i>
                                </div>
                            </div>
                            <div className="gi-cat-dropdown">
                                <div className="gi-cat-block">
                                    <div className="gi-cat-tab">
                                        <TabList>
                                            <div
                                                className="gi-tab-list nav flex-column nav-pills me-3"
                                                id="v-pills-tab"
                                                role="tablist"
                                                aria-orientation="vertical"
                                            >
                                                <Tab>
                                                    <button
                                                        className={`tab nav-link ${
                                                            selectedIndex == 0 ? "active" : ""
                                                        }`}
                                                        onClick={() => handleProductClick(0)}
                                                        key={"Face Care & Makeup"}
                                                        id="v-pills-home-tab"
                                                        data-bs-toggle="pill"
                                                        data-bs-target="#v-pills-home"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="v-pills-home"
                                                        aria-selected="true"
                                                        style={{
                                                            padding: "10px 50px 10px 20px",
                                                            marginBottom: "10px",
                                                        }}
                                                    >
                                                        <i className="fi-rr-cupcake"></i>
                                                        {/* 💡 TARJIMA 2: Yuz parvarishi & Makiyaj */}
                                                        {t("tabFaceMakeup")}
                                                    </button>
                                                </Tab>
                                                <Tab>
                                                    <button
                                                        className={`nav-link ${
                                                            selectedIndex == 1 ? "active" : ""
                                                        }`}
                                                        onClick={() => handleProductClick(1)}
                                                        key={"Hair Care & Body Care"}
                                                        id="v-pills-profile-tab"
                                                        data-bs-toggle="pill"
                                                        data-bs-target="#v-pills-profile"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="v-pills-profile"
                                                        aria-selected="false"
                                                        style={{
                                                            padding: "10px 22px",
                                                            marginBottom: "10px",
                                                        }}
                                                    >
                                                        <i className="fi fi-rs-apple-whole"></i>
                                                        {/* 💡 TARJIMA 3: Soch parvarishi & Tana parvarishi */}
                                                        {t("tabHairBodyCare")}
                                                    </button>
                                                </Tab>
                                                <Tab>
                                                    <button
                                                        className={`nav-link ${
                                                            selectedIndex == 2 ? "active" : ""
                                                        }`}
                                                        onClick={() => handleProductClick(2)}
                                                        key={"Perfumes & Nails"}
                                                        id="v-pills-messages-tab"
                                                        data-bs-toggle="pill"
                                                        data-bs-target="#v-pills-messages"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="v-pills-messages"
                                                        aria-selected="false"
                                                        style={{
                                                            padding: "10px 50px 10px 20px",
                                                            marginBottom: "10px",
                                                        }}
                                                    >
                                                        <i className="fi fi-rr-popcorn"></i>
                                                        {/* 💡 TARJIMA 4: Parfyumeriya & Tirnoq */}
                                                        {t("tabPerfumeNails")}
                                                    </button>
                                                </Tab>
                                                <Tab>
                                                    <button
                                                        className={`nav-link ${
                                                            selectedIndex == 3 ? "active" : ""
                                                        }`}
                                                        onClick={() => handleProductClick(3)}
                                                        key={"Accessories & Tools"}
                                                        id="v-pills-settings-tab"
                                                        data-bs-toggle="pill"
                                                        data-bs-target="#v-pills-settings"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="v-pills-settings"
                                                        aria-selected="false"
                                                        style={{
                                                            padding: "10px 50px 10px 20px",
                                                            marginBottom: "10px",
                                                        }}
                                                    >
                                                        <i className="fi fi-rr-drink-alt"></i>
                                                        {/* 💡 TARJIMA 5: Aksessuarlar & Asboblar */}
                                                        {t("tabAccessoriesTools")}
                                                    </button>
                                                </Tab>
                                            </div>
                                        </TabList>
                                        <div className="tab-content" id="v-pills-tabContent">
                                            <Fade duration={500} delay={200}>
                                                <TabPanel
                                                    className={`tab-pane fade ${
                                                        selectedIndex === 0
                                                            ? "show active product-block"
                                                            : ""
                                                    }`}
                                                    role="tabpanel"
                                                    aria-labelledby="v-pills-home-tab"
                                                >
                                                    <div className="tab-list row">
                                                        <div className="col">
                                                            {/* 💡 TARJIMA 6: Yuz parvarishi */}
                                                            <h6 className="gi-col-title">{t("colFaceCare")}</h6>
                                                            <ul className="cat-list">
                                                                {/* fruits - Endi Face Care sub-toifalari */}
                                                                {fruits.map((data, index) => (
                                                                    <li key={index}>
                                                                        <Link to={data.href}>{data.name}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="col">
                                                            {/* 💡 TARJIMA 7: Makiyaj */}
                                                            <h6 className="gi-col-title">{t("colMakeup")}</h6>
                                                            <ul className="cat-list">
                                                                {/* bakery - Endi Makeup sub-toifalari */}
                                                                {bakery.map((data, index) => (
                                                                    <li key={index}>
                                                                        <Link to={data.href}>{data.name}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </TabPanel>
                                            </Fade>
                                            <Fade duration={500} delay={200}>
                                                <TabPanel
                                                    className={`tab-pane fade ${
                                                        selectedIndex === 1
                                                            ? "show active product-block"
                                                            : ""
                                                    }`}
                                                    role="tabpanel"
                                                    aria-labelledby="v-pills-profile-tab"
                                                >
                                                    <div className="tab-list row">
                                                        <div className="col">
                                                            {/* 💡 TARJIMA 8: Soch parvarishi */}
                                                            <h6 className="gi-col-title">{t("colHairCare")}</h6>
                                                            <ul className="cat-list">
                                                                {/* fruits - Endi Hair Care sub-toifalari */}
                                                                {fruits.map((data, index) => (
                                                                    <li key={index}>
                                                                        <Link to={data.href}>{data.name}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="col">
                                                            {/* 💡 TARJIMA 9: Tana parvarishi */}
                                                            <h6 className="gi-col-title">{t("colBodyCare")}</h6>
                                                            <ul className="cat-list">
                                                                {/* fruits - Endi Body Care sub-toifalari */}
                                                                {fruits.map((data, index) => (
                                                                    <li key={index}>
                                                                        <Link to={data.href}>{data.name}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </TabPanel>
                                            </Fade>
                                            <Fade duration={500} delay={200}>
                                                <TabPanel
                                                    className={`tab-pane fade ${
                                                        selectedIndex === 2
                                                            ? "show active product-block"
                                                            : ""
                                                    }`}
                                                    id="v-pills-messages"
                                                    role="tabpanel"
                                                    aria-labelledby="v-pills-messages-tab"
                                                >
                                                    <div className="tab-list row">
                                                        <div className="col">
                                                            {/* 💡 TARJIMA 10: Parfyumeriya */}
                                                            <h6 className="gi-col-title">{t("colPerfumes")}</h6>
                                                            <ul className="cat-list">
                                                                {/* snacks - Endi Perfumes sub-toifalari */}
                                                                {snacks.map((data, index) => (
                                                                    <li key={index}>
                                                                        <Link to={data.href}>{data.name}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="col">
                                                            {/* 💡 TARJIMA 11: Tirnoqlar */}
                                                            <h6 className="gi-col-title">{t("colNails")}</h6>
                                                            <ul className="cat-list">
                                                                {/* spice - Endi Nails sub-toifalari */}
                                                                {spice.map((data, index) => (
                                                                    <li key={index}>
                                                                        <Link to={data.href}>{data.name}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </TabPanel>
                                            </Fade>
                                            <Fade duration={500} delay={200}>
                                                <TabPanel
                                                    className={`tab-pane fade ${
                                                        selectedIndex === 3
                                                            ? "show active product-block"
                                                            : ""
                                                    }`}
                                                    id="v-pills-settings"
                                                    role="tabpanel"
                                                    aria-labelledby="v-pills-settings-tab"
                                                >
                                                    <div className="tab-list row">
                                                        <div className="col">
                                                            {/* 💡 TARJIMA 12: Aksessuarlar */}
                                                            <h6 className="gi-col-title">{t("colAccessories")}</h6>
                                                            <ul className="cat-list">
                                                                {/* juice - Endi Accessories sub-toifalari */}
                                                                {juice.map((data, index) => (
                                                                    <li key={index}>
                                                                        <Link to={data.href}>{data.name}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="col">
                                                            {/* 💡 TARJIMA 13: Asboblar */}
                                                            <h6 className="gi-col-title">{t("colTools")}</h6>
                                                            <ul className="cat-list">
                                                                {/* softdrink - Endi Tools sub-toifalari */}
                                                                {softdrink.map((data, index) => (
                                                                    <li key={index}>
                                                                        <Link to={data.href}>{data.name}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </TabPanel>
                                            </Fade>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tabs>

                        {/* */}
                        <div
                            id="gi-main-menu-desk"
                            className="d-none d-lg-block sticky-nav"
                        >
                            <div className="nav-desk">
                                <div className="row">
                                    <div className="col-md-12 align-self-center">
                                        <div className="gi-main-menu">
                                            <ul>
                                                <li className="dropdown drop-list position-static">
                                                    <Link to="#" className="dropdown-arrow">
                                                        {/* 💡 TARJIMA 14: Categories */}
                                                        {t("menuCategories")}
                                                        <i className="fi-rr-angle-small-right"></i>
                                                    </Link>
                                                    {/* Mega Menu Qismi (Oldingidek qoladi) */}
                                                    <ul className="mega-menu d-block">
                                                        <li className="d-flex">
                                                            <span className="bg"></span>
                                                            <ul className="d-block mega-block">
                                                                <li className="menu_title">
                                                                    <Link to="/">{t("megaClassic")}</Link>
                                                                </li>
                                                                {classic.map((data, index) => (
                                                                    <li key={index}>
                                                                        <Link to={data.href}>{data.name}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <ul className="d-block mega-block">
                                                                <li className="menu_title">
                                                                    <Link to="#">{t("megaBanner")}</Link>
                                                                </li>
                                                                {banner.map((data, index) => (
                                                                    <li key={index}>
                                                                        <Link to={data.href}>{data.name}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <ul className="d-block mega-block">
                                                                <li className="menu_title">
                                                                    <Link to="#">{t("megaColumns")}</Link>
                                                                </li>
                                                                {column.map((data, index) => (
                                                                    <li key={index}>
                                                                        <Link to={data.href}>{data.name}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <ul className="d-block mega-block">
                                                                <li className="menu_title">
                                                                    <Link to="#">{t("megaList")}</Link>
                                                                </li>
                                                                {list.map((data, index) => (
                                                                    <li key={index}>
                                                                        <Link to={data.href}>{data.name}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown drop-list">
                                                    <Link to="#" className="dropdown-arrow">
                                                        {/* 💡 TARJIMA 19: Products */}
                                                        {t("menuProducts")}<i className="fi-rr-angle-small-right"></i>
                                                    </Link>
                                                    <ul className="sub-menu">
                                                        {productpage.map((data, index) => (
                                                            <li
                                                                key={index}
                                                                className="dropdown position-static"
                                                            >
                                                                <Link to="#">
                                                                    {data.name}
                                                                    <i className="fi-rr-angle-small-right"></i>
                                                                </Link>
                                                                <ul className="sub-menu sub-menu-child">
                                                                    {data.subname && data.subname.map((subPage, subIndex) => (
                                                                        <React.Fragment key={subIndex}>
                                                                            <li>
                                                                                <Link to={subPage.href}>
                                                                                    {subPage.name}
                                                                                </Link>
                                                                            </li>
                                                                        </React.Fragment>
                                                                    ))}
                                                                </ul>
                                                            </li>
                                                        ))}
                                                        <li>
                                                            <Link to={`/product-full-width`}>
                                                                {t("prodFullWidth")}
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/product-according-full-width`}>
                                                                {t("prodAccordionFullWidth")}
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown drop-list">
                                                    <Link to="#" className="dropdown-arrow">
                                                        {t("menuBlog")}<i className="fi-rr-angle-small-right"></i>
                                                    </Link>
                                                    <ul className="sub-menu">
                                                        {blog.map((data, index) => (
                                                            <li key={index}>
                                                                <Link to={data.href}>{data.name}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <li className="dropdown drop-list">
                                                    <Link to="#" className="dropdown-arrow">
                                                        {t("menuPages")}<i className="fi-rr-angle-small-right"></i>
                                                    </Link>
                                                    <ul className="sub-menu">
                                                        {pages.map((data, index) => (
                                                            <li key={index}>
                                                                <Link to={data.href}>{data.name}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <li className="non-drop">
                                                    <Link to="/banner-left-sidebar-col-3">
                                                        <i className="fi-rr-badge-percent"></i>
                                                        {t("menuOffers")}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* */}

                        <CurrentLocation/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderManu;
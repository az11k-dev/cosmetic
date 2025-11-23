import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import classic from "@/utility/header/classic";
import banner from "@/utility/header/benner";
import column from "@/utility/header/columns";
import list from "@/utility/header/list";
import blog from "@/utility/header/blog";
import pages from "@/utility/header/pages";
import productpage from "@/utility/header/productpage";
import CurrentLocation from "./CurrentLocation";
import AllCategories from "@/components/layout/layout-one/header/AllCategories.tsx";
import Categories from "@/components/layout/layout-one/header/Categories.tsx";


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
                        <AllCategories t={t} handleProductClick={handleProductClick} selectedIndex={selectedIndex}
                                       setSelectedIndex={setSelectedIndex}/>
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
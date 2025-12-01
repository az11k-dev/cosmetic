import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import blog from "@/utility/header/blog";
import pages from "@/utility/header/pages";
import productpage from "@/utility/header/productpage";
import AllCategories from "@/components/layout/layout-one/header/AllCategories.tsx";

function HeaderManu() {
    const {t} = useTranslation("headerManu"); // Namespace 'headerMenu'
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

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
        }
    ]

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
                                                <div style={{
                                                    display: "flex",
                                                    gap: "20px",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    paddingTop: "15px",
                                                }}>
                                                    {data.map((item: any) => (
                                                        <div key={item?.id} style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            marginTop: 'auto',
                                                            gap: '5px',
                                                            cursor: 'pointer',
                                                        }}>
                                                            <p onClick={() => {
                                                                navigate(item?.link);
                                                            }} className={"bty-header-hover"}
                                                               style={{
                                                                   fontSize: '15px',
                                                                   fontWeight: '500',
                                                                   color: '#4b5966'
                                                               }}>
                                                                {item?.name}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 'auto',
                            gap: '5px',
                            cursor: 'pointer',
                        }}>
                            <p>
                                <img style={{width: '18px', height: '18px'}}
                                     src="https://cdn-icons-png.flaticon.com/512/5952/5952689.png" alt="discount"/>
                            </p>
                            <p className={"bty-header-hover"}
                               style={{fontSize: '15px', fontWeight: '500', color: '#4b5966'}}>
                                {t("menuOffers")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderManu;
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProductAll from "../product-item/ProductItem";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Fade } from "react-awesome-reveal";
// 💡 useTranslation importi
import { useTranslation } from "react-i18next";

// 💡 Komponent nomi NewArrivals ga o'zgartirildi
const NewArrivals = () => {
    const { t } = useTranslation("newArrivals"); // 💡 'newArrivals' namespace'ini yuklaymiz
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleProductClick = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <section
                className="gi-product-tab gi-products padding-tb-40 wow fadeInUp"
                data-wow-duration="2s"
            >
                <div className="container">
                    <Tabs
                        selectedIndex={selectedIndex}
                        onSelect={(selectedIndex) => setSelectedIndex(selectedIndex)}
                    >
                        <div className="gi-tab-title">
                            <div className="gi-main-title">
                                <div className="section-title">
                                    <div className="section-detail">
                                        <h2 className="gi-title">
                                            {/* 💡 Sarlavha tarjimasi */}
                                            {t("titleNew")} <span>{t("titleArrivals")}</span>
                                        </h2>
                                        {/* 💡 Tagline tarjimasi */}
                                        <p>{t("arrivalTagline")}</p>
                                    </div>
                                </div>
                            </div>
                            {/* */}
                            <TabList className="gi-pro-tab">
                                <ul className="gi-pro-tab-nav nav">
                                    {/* 1. All (Barchasi) */}
                                    <Tab
                                        style={{ outline: "none" }}
                                        className="nav-item gi-header-rtl-arrival"
                                        key={"all"}
                                    >
                                        <a
                                            className={`nav-link ${
                                                selectedIndex == 0 ? "active" : ""
                                            }`}
                                            onClick={() => handleProductClick(0)}
                                            data-bs-toggle="tab"
                                        >
                                            {t("tabAll")} {/* 💡 Tarjima kaliti */}
                                        </a>
                                    </Tab>
                                    {/* 2. Face Care (Snack & Spices o'rniga) */}
                                    <Tab
                                        style={{ outline: "none" }}
                                        className="nav-item gi-header-rtl-arrival"
                                        key={"facecare"}
                                    >
                                        <a
                                            className={`nav-link ${
                                                selectedIndex == 1 ? "active" : ""
                                            }`}
                                            data-bs-toggle="tab"
                                            onClick={() => handleProductClick(1)}
                                        >
                                            {t("tabFaceCare")} {/* 💡 Tarjima kaliti */}
                                        </a>
                                    </Tab>
                                    {/* 3. Makeup (Fruits o'rniga) */}
                                    <Tab
                                        style={{ outline: "none" }}
                                        className="nav-item gi-header-rtl-arrival"
                                        key={"makeup"}
                                    >
                                        <a
                                            className={`nav-link ${
                                                selectedIndex == 2 ? "active" : ""
                                            }`}
                                            data-bs-toggle="tab"
                                            onClick={() => handleProductClick(2)}
                                        >
                                            {t("tabMakeup")} {/* 💡 Tarjima kaliti */}
                                        </a>
                                    </Tab>
                                    {/* 4. Perfumes (Vegetables o'rniga) */}
                                    <Tab
                                        style={{ outline: "none" }}
                                        className="nav-item"
                                        key={"perfumes"}
                                    >
                                        <a
                                            className={`nav-link ${
                                                selectedIndex == 3 ? "active" : ""
                                            }`}
                                            data-bs-toggle="tab"
                                            onClick={() => handleProductClick(3)}
                                        >
                                            {t("tabPerfumes")} {/* 💡 Tarjima kaliti */}
                                        </a>
                                    </Tab>
                                </ul>
                            </TabList>
                            {/* */}
                        </div>
                        {/* */}
                        <Row className="m-b-minus-24px">
                            <Col lg={12}>
                                <div className="tab-content">
                                    {/* */}
                                    <TabPanel>
                                        <Fade
                                            triggerOnce
                                            duration={400}
                                            className={`tab-pane fade ${
                                                selectedIndex === 0 ? "show active product-block" : ""
                                            }`}
                                        >
                                            <Row>
                                                <ProductAll statekey="productall" /> {/* 💡 statekey o'zgarishsiz */}
                                            </Row>
                                        </Fade>
                                    </TabPanel>
                                    <TabPanel>
                                        <Fade
                                            triggerOnce
                                            duration={400}
                                            className={`tab-pane fade ${
                                                selectedIndex === 1 ? "show active product-block" : ""
                                            }`}
                                        >
                                            <Row>
                                                <ProductAll statekey="snack" /> {/* 💡 statekey o'zgartirildi */}
                                            </Row>
                                        </Fade>
                                    </TabPanel>
                                    <TabPanel>
                                        <Fade
                                            triggerOnce
                                            duration={400}
                                            className={`tab-pane fade ${
                                                selectedIndex === 2 ? "show active product-block" : ""
                                            }`}
                                        >
                                            <Row>
                                                <ProductAll statekey="fruits" /> {/* 💡 statekey o'zgartirildi */}
                                            </Row>
                                        </Fade>
                                    </TabPanel>
                                    <TabPanel>
                                        <Fade
                                            triggerOnce
                                            duration={400}
                                            className={`tab-pane fade ${
                                                selectedIndex === 3 ? "show active product-block" : ""
                                            }`}
                                        >
                                            <Row>
                                                <ProductAll statekey="vegetables" /> {/* 💡 statekey o'zgartirildi */}
                                            </Row>
                                        </Fade>
                                    </TabPanel>
                                </div>
                            </Col>
                        </Row>
                    </Tabs>
                </div>
            </section>
        </>
    );
};


export default NewArrivals;
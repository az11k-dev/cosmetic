// src/components/NewArrivals.tsx (To'g'rilangan versiyasi)

import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import ProductAll from "@/components/product-item/ProductItem.tsx";

// 💡 HAR BIR TAB UCHUN CATEGORY ID'ni aniqlaymiz
const CATEGORY_IDS = {
    // 0 index: BARCHASI (filtr yo'q)
    0: null,
    // 1 index: Category ID 1
    1: 1,
    // 2 index: Category ID 5
    2: 5,
    // 3 index: Category ID 7
    3: 7,
};


const NewArrivals = () => {
    const { t } = useTranslation("newArrivals");
    // selectedIndex hozirda tanlangan Tab INDEX'i (0, 1, 2, 3)
    const [selectedIndex, setSelectedIndex] = useState(0);

    // selectedCategoryId hozirda tanlangan Category ID (null, 1, 5, 7)
    const selectedCategoryId = CATEGORY_IDS[selectedIndex as keyof typeof CATEGORY_IDS];


    return (
        <>
            <section
                className="gi-product-tab gi-products padding-tb-40 wow fadeInUp"
                data-wow-duration="2s"
            >
                <div className="container">
                    <Tabs
                        // Tabs komponenti uchun onSelect ishlatish yaxshiroq
                        selectedIndex={selectedIndex}
                        onSelect={(index) => setSelectedIndex(index)}
                    >
                        <div className="gi-tab-title">
                            <div className="gi-main-title">
                                {/* ... Sarlavha qismlari o'zgarishsiz ... */}
                            </div>
                            {/* */}
                            <TabList className="gi-pro-tab">
                                <ul className="gi-pro-tab-nav nav">
                                    {/* Barcha Tablar uchun map ishlatish mumkin, lekin hozircha aniq IDlar bo'yicha qoldiramiz */}

                                    {/* 0. All (Barchasi) - ID: null */}
                                    <Tab style={{ outline: "none" }} className="nav-item gi-header-rtl-arrival">
                                        <a className={`nav-link ${selectedIndex === 0 ? "active" : ""}`}>
                                            {t("tabAll")}
                                        </a>
                                    </Tab>

                                    {/* 1. Category 1 - ID: 1 */}
                                    <Tab style={{ outline: "none" }} className="nav-item gi-header-rtl-arrival">
                                        <a className={`nav-link ${selectedIndex === 1 ? "active" : ""}`}>
                                            {/* Bu nomi Category ID=1 ga tegishli. */}
                                            {t("tabCategory1") || "Category 1"}
                                        </a>
                                    </Tab>

                                    {/* 2. Category 5 - ID: 5 */}
                                    <Tab style={{ outline: "none" }} className="nav-item gi-header-rtl-arrival">
                                        <a className={`nav-link ${selectedIndex === 2 ? "active" : ""}`}>
                                            {/* Bu nomi Category ID=5 ga tegishli. */}
                                            {t("tabCategory5") || "Category 5"}
                                        </a>
                                    </Tab>

                                    {/* 3. Category 7 - ID: 7 */}
                                    <Tab style={{ outline: "none" }} className="nav-item">
                                        <a className={`nav-link ${selectedIndex === 3 ? "active" : ""}`}>
                                            {/* Bu nomi Category ID=7 ga tegishli. */}
                                            {t("tabCategory7") || "Category 7"}
                                        </a>
                                    </Tab>
                                </ul>
                            </TabList>
                            {/* */}
                        </div>
                        <Row className="m-b-minus-24px">
                            <Col lg={12}>
                                <div className="tab-content">

                                    {/* Tab Index 0 -> Category ID: null (Barchasi) */}
                                    <TabPanel>
                                        <Row><ProductAll categoryId={CATEGORY_IDS[0]} /></Row>
                                    </TabPanel>

                                    {/* Tab Index 1 -> Category ID: 1 */}
                                    <TabPanel>
                                        <Row><ProductAll categoryId={CATEGORY_IDS[1]} /></Row>
                                    </TabPanel>

                                    {/* Tab Index 2 -> Category ID: 5 */}
                                    <TabPanel>
                                        <Row><ProductAll categoryId={CATEGORY_IDS[2]} /></Row>
                                    </TabPanel>

                                    {/* Tab Index 3 -> Category ID: 7 */}
                                    <TabPanel>
                                        <Row><ProductAll categoryId={CATEGORY_IDS[3]} /></Row>
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
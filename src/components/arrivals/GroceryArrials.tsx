import {useState} from "react";
import {Col, Row} from "react-bootstrap";
import ProductAll from "../product-item/ProductItem";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {Fade} from "react-awesome-reveal";
// 💡 useTranslation importi
import {useTranslation} from "react-i18next";

// 💡 Komponent nomi NewArrivals ga o'zgartirildi
const NewArrivals = () => {
    const {t} = useTranslation("newArrivals"); // 💡 'newArrivals' namespace'ini yuklaymiz
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
                            <div style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                textAlign: 'center'
                            }} className="gi-main-title">
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
                                                <ProductAll
                                                    statekey="face-care-slug"/> {/* 💡 Замени "snack" на реальный slug */}
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
                                                <ProductAll statekey="snack"/> {/* 💡 statekey o'zgartirildi */}
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
                                                <ProductAll statekey="fruits"/> {/* 💡 statekey o'zgartirildi */}
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
                                                <ProductAll statekey="vegetables"/> {/* 💡 statekey o'zgartirildi */}
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
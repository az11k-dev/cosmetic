import {Col, Row} from "react-bootstrap";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import CategoryItem from "../product-item/CategoryItem";
import Spinner from "../button/Spinner";
import {useEffect, useState} from "react"; // Import React Hooks

// URL Vashego API (Ne izmenyayte)
const API_URL = "https://admin.beauty-point.uz/api/categories";
const lang = localStorage.getItem("i18nextLng");

const CategorySliderOne = ({
                               className = "padding-tb-40",
                           }) => {
    // Sostoyaniya dlya khraneniya dannykh, zagruzki i oshibki
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Opredelyayem yazyk dlya otobrazheniya (Mozhet byt' dinamicheskim)
    const lang = localStorage.getItem("i18nextLng") || "ru";

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                // Izvlekayem massiv dannykh iz polya 'data.data'
                const apiData = result?.data?.data || [];

                setCategories(apiData);
                setError(null);
            } catch (e) {
                console.error("Failed to fetch categories:", e);
                setError("Ne udalos' zagruzit' kategorii.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // --- Logika otobrazheniya sostoyaniya (ostavlyayem kak est') ---
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading) {
        return (
            <div>
                {/* Predpolagayem, chto Spinner pravil'no otobrazhayetsya */}
                <Spinner/>
            </div>
        );
    }

    if (!categories || categories.length === 0) {
        return <div>Categories not found.</div>;
    }

    // 👇👇👇 ИЗМЕНЕНИЕ: Получаем только первые 6 категорий
    const sixCategories = categories.slice(0, 6);

    return (
        <section className={`gi-category body-bg ${className}`}>
            <div className="container">
                <Row className="m-b-minus-15px">
                    <Col xl={12}>
                        <Swiper
                            loop={true}
                            autoplay={{delay: 1000}}
                            slidesPerView={5}
                            spaceBetween={20}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                320: {
                                    slidesPerView: 1,
                                },
                                425: {
                                    slidesPerView: 2,
                                },
                                767: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                                1200: {
                                    slidesPerView: 5,
                                },
                                1440: {
                                    slidesPerView: 6,
                                },
                            }}
                            className="gi-category-block owl-carousel"
                        >
                            {/* OBRABOTKA I OTIBRAZHENIYE KATEGORIY */}
                            {/* 👇 Используем sixCategories вместо categories */}
                            {sixCategories.map((item: any, index: number) => {

                                // Preobrazovaniye dannykh pod format CategoryItem
                                const formattedItem = {
                                    ...item,
                                    name: lang === "ru" ? item?.name?.ru : item?.name?.uz,
                                    num: index + 1,
                                };
                                console.log(item)

                                return (
                                    <SwiperSlide
                                        key={item.id || index} // Unikal'nyy key
                                        className={`gi-cat-box gi-cat-box-${formattedItem.num}`}
                                    >
                                        {/* Peredayem obrabotannyy ob"yekt */}
                                        <CategoryItem data={formattedItem}/>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default CategorySliderOne;
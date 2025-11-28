import React, {useCallback, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Item } from "@/types/data.types";
import {Col, Container} from 'react-bootstrap';
import SingleProductContent from "@/components/product-page/single-product-content/SingleProductContent.tsx";

// ❌ REDUX IMPORTLARINI OLIB TASHLAYMIZ
// import {useDispatch, useSelector} from "react-redux";
// import {RootState} from "@/store";
// import {
//     setRange,
//     setSelectedCategory,
//     setSelectedColor,
//     setSelectedTags,
//     setSelectedWeight
// } from "@/store/reducers/filterReducer.ts";

// 💡 FILTER CONTEXTNI IMPORT QILAMIZ
import { useFilter } from "@/context/FilterContext.tsx";

// Boshqa importlar o'zgarishsiz qoladi
import {useSliceData} from "@/hooks/useSliceData.ts";
import Spinner from "@/components/button/Spinner.tsx";
import {Swiper, SwiperSlide} from "swiper/react";
import StarRating from "@/components/stars/StarRating.tsx";
import ProductTab from "@/components/product-page/product-tab/ProductTab.tsx";
import SidebarArea from "@/components/shop-sidebar/sidebar-area/SidebarArea.tsx";


const ProductDetailsPage: React.FC = ({order = "", none = "none", lg = 12,}:any) => {
    const location = useLocation();
    const [show, setShow] = useState(false);
    const handleClose = useCallback(() => setShow(false), []);

    // ⭐ 1. Получаем объект данных, который был передан из ItemCard.tsx
    const productData = location.state?.productData as Item | undefined;

    // 💡 2. CONTEXTDAN MA'LUMOT VA FUNKSIYALARNI OLISH
    // Redux o'rniga useFilter hookidan foydalanamiz
    const {
        selectedCategory,
        selectedWeight,
        minPrice,
        maxPrice,
        selectedColor,
        selectedTags,
        handlePriceChange,
        handleCategoryChange,
        handleWeightChange,
        handleColorChange,
        handleTagsChange,
    } = useFilter();
    // -----------------------------------------------------------

    const { data, error } = useSliceData('moreitems');

    // ❌ Redux dispatch funksiyalari useFilter ichiga o'tkazilgani uchun endi bu yerda
    // ularni qayta yozishga hojat yo'q. Ular to'g'ridan-to'g'i Contextdan olinadi.

    // const handlePriceChange = useCallback(
    //     (min: number, max: number) => {
    //         dispatch(setRange({ min, max }));
    //     },
    //     [dispatch]
    // );
    // ... boshqa handle funksiyalari (Category, Weight, Color, Tags)

    if (error) return <div>Failed to load products</div>;
    if (!data)
        return (
            <div>
                <Spinner />
            </div>
        );

    // Filterlash funksiyalari endi Contextdan olingani sababli bu yerda yozilmaydi:
    /*
    const handleCategoryChange = (category:any) => { ... };
    const handleWeightChange = (weight:any) => { ... };
    const handleColorChange = (color:any) => { ... };
    const handleTagsChange = (tag:any) => { ... };
    */

    return (
        <>
            <Col
                lg={lg}
                md={12}
                className={`gi-pro-rightside gi-common-rightside ${order}`}
            >
                {/* */}
                <Container className="py-5">
                    {/* `productData` mavjudligini tekshirishni unutmang, aks holda tushib ketishi mumkin */}
                    {productData && <SingleProductContent data={productData}  handleClose={handleClose} show={show}/>}
                </Container>
                {/* */}

                {/* */}
                <div className="single-add-more m-tb-40">
                    <Swiper
                        loop={true}
                        autoplay={{ delay: 1000 }}
                        slidesPerView={3}
                        spaceBetween={20}
                        breakpoints={{
                            0: { slidesPerView: 1, spaceBetween: 20 },
                            320: { slidesPerView: 1, spaceBetween: 20 },
                            425: { slidesPerView: 1, spaceBetween: 20 },
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 2, spaceBetween: 20 },
                            1025: { slidesPerView: 3, spaceBetween: 20 },
                        }}
                        style={{ overflow: "hidden" }}
                        className="gi-add-more-slider owl-carousel"
                    >
                        {data && data.length > 0 ? data.map((item: any, index: number) => (
                            <SwiperSlide key={index} className="add-more-item">
                                <a href="" className="gi-btn-2">
                                    +
                                </a>
                                <div className="add-more-img">
                                    <img src={item.file_url} alt="product" />
                                </div>
                                <div className="add-more-info">
                                    <h5>{item.name}</h5>
                                    <span className="gi-pro-rating">
                                        <StarRating rating={item.rating} />
                                    </span>
                                    <span className="gi-price">
                                        <span className="new-price">${item.price}</span>
                                        <span className="old-price">${item.old_price}</span>
                                    </span>
                                </div>
                            </SwiperSlide>
                        )): <></>}
                    </Swiper>
                </div>

                {/* */}
                <ProductTab />
                {/* */}
            </Col>

            {/* */}
            {/* SidebarArea endi filter holati va funksiyalarini Contextdan oladi */}
            <SidebarArea
                min={minPrice}
                max={maxPrice}
                handleCategoryChange={handleCategoryChange}
                handleWeightChange={handleWeightChange}
                handleColorChange={handleColorChange}
                handleTagsChange={handleTagsChange}
                handlePriceChange={handlePriceChange}
                selectedCategory={selectedCategory}
                selectedWeight={selectedWeight}
                selectedColor={selectedColor}
                selectedTags={selectedTags}
                none={none}
            />
        </>
    );
};

export default ProductDetailsPage;
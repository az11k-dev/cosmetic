import React, {useCallback, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Item } from "@/types/data.types";
import {Col, Container} from 'react-bootstrap';
import SingleProductContent from "@/components/product-page/single-product-content/SingleProductContent.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {useSliceData} from "@/hooks/useSliceData.ts";
import {
    setRange,
    setSelectedCategory,
    setSelectedColor,
    setSelectedTags,
    setSelectedWeight
} from "@/store/reducers/filterReducer.ts";
import Spinner from "@/components/button/Spinner.tsx";
import {Swiper, SwiperSlide} from "swiper/react";
import StarRating from "@/components/stars/StarRating.tsx";
import ProductTab from "@/components/product-page/product-tab/ProductTab.tsx";
import SidebarArea from "@/components/shop-sidebar/sidebar-area/SidebarArea.tsx";


const ProductDetailsPage: React.FC = ({  order = "",
                                          none = "none",
                                          lg = 12,}) => {
    const location = useLocation();
    const [show, setShow] = useState(false);
    const handleClose = useCallback(() => setShow(false), []);
    // ⭐ 1. Получаем объект данных, который был передан из ItemCard.tsx
    const productData = location.state?.productData as Item | undefined;
    const dispatch = useDispatch();
    const {
        selectedCategory,
        selectedWeight,
        minPrice,
        maxPrice,
        selectedColor,
        selectedTags,
    } = useSelector((state: RootState) => state.filter);

    const { data, error } = useSliceData('moreitems');


    const handlePriceChange = useCallback(
        (min: number, max: number) => {
            dispatch(setRange({ min, max }));
        },
        [dispatch]
    );

    if (error) return <div>Failed to load products</div>;
    if (!data)
        return (
            <div>
                <Spinner />
            </div>
        );

    const handleCategoryChange = (category:any) => {
        const updatedCategory = selectedCategory.includes(category)
            ? selectedCategory.filter((cat) => cat !== category)
            : [...selectedCategory, category];
        dispatch(setSelectedCategory(updatedCategory));
    };

    const handleWeightChange = (weight:any) => {
        const updatedweight = selectedWeight.includes(weight)
            ? selectedWeight.filter((wet) => wet !== weight)
            : [...selectedWeight, weight];
        dispatch(setSelectedWeight(updatedweight));
    };

    const handleColorChange = (color:any) => {
        const updatedcolor = selectedColor.includes(color)
            ? selectedColor.filter((clr) => clr !== color)
            : [...selectedColor, color];
        dispatch(setSelectedColor(updatedcolor));
    };

    const handleTagsChange = (tag:any) => {
        const updatedtag = selectedTags.includes(tag)
            ? selectedTags.filter((tg) => tg !== tag)
            : [...selectedTags, tag];
        dispatch(setSelectedTags(updatedtag));
    };

    if (!productData) {
        return (
            <Container className="my-5">
                <h2>Yuklanmoqda... yoki Mahsulot Topilmadi (Loading... or Not Found)</h2>
            </Container>
        );
    }







    return (


        <>
            <Col
                lg={lg}
                md={12}
                className={`gi-pro-rightside gi-common-rightside ${order}`}
            >
                {/* <!-- Single product content Start --> */}
                <Container className="py-5">
                    <SingleProductContent data={productData}  handleClose={handleClose} show={show}/>
                </Container>
                {/* <!--Single product content End -->
                    <!-- Add More and get discount content Start --> */}
                <div className="single-add-more m-tb-40">
                    <Swiper
                        loop={true}
                        autoplay={{ delay: 1000 }}
                        slidesPerView={3}
                        spaceBetween={20}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            425: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1025: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
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
                                    <img src={item.image} alt="product" />
                                </div>
                                <div className="add-more-info">
                                    <h5>{item.title}</h5>
                                    <span className="gi-pro-rating">
                    <StarRating rating={item.rating} />
                  </span>
                                    <span className="gi-price">
                    <span className="new-price">${item.newPrice}</span>
                    <span className="old-price">${item.oldPrice}</span>
                  </span>
                                </div>
                            </SwiperSlide>
                        )): <></>}
                    </Swiper>
                </div>

                {/* <!-- Single product tab start --> */}
                <ProductTab />
                {/* <!-- product details description area end --> */}
            </Col>
            {/* <!-- Sidebar Area Start --> */}

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
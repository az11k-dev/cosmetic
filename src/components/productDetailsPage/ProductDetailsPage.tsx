import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {Col, Container} from 'react-bootstrap';
import SingleProductContent from "@/components/product-page/single-product-content/SingleProductContent.tsx";

// 💡 FILTER CONTEXTNI IMPORT QILAMIZ
import {useFilter} from "@/context/FilterContext.tsx";

// Boshqa importlar o'zgarishsiz qoladi
import Spinner from "@/components/button/Spinner.tsx";
import ProductTab from "@/components/product-page/product-tab/ProductTab.tsx";
import SidebarArea from "@/components/shop-sidebar/sidebar-area/SidebarArea.tsx";

const API_URL = "https://admin.beauty-point.uz/api/products";
const ProductDetailsPage: React.FC = ({order = "", none = "none", lg = 12,}: any) => {
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const [show, setShow] = useState(false);
    const handleClose = useCallback(() => setShow(false), []);
    const {id} = useParams();
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

    useEffect(() => {
        const fetchProducts = async (id: number) => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                const apiData = result?.data?.data || [];
                setProductData(apiData);
                setError(null);
            } catch (e) {
                console.error(e, "Failed to fetch categories:");
                setError("Ne udalos' zagruzit' kategorii.");
            } finally {
                setIsLoading(false);
            }

        };
        fetchProducts(id);
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading)
        return (
            <div>
                <Spinner/>
            </div>
        );

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
                    {<SingleProductContent data={productData} handleClose={handleClose} show={show}/>}
                </Container>
                {/* */}

                {/* */}
                {/*<div className="single-add-more m-tb-40">*/}
                {/*    <Swiper*/}
                {/*        loop={true}*/}
                {/*        autoplay={{ delay: 1000 }}*/}
                {/*        slidesPerView={3}*/}
                {/*        spaceBetween={20}*/}
                {/*        breakpoints={{*/}
                {/*            0: { slidesPerView: 1, spaceBetween: 20 },*/}
                {/*            320: { slidesPerView: 1, spaceBetween: 20 },*/}
                {/*            425: { slidesPerView: 1, spaceBetween: 20 },*/}
                {/*            640: { slidesPerView: 2, spaceBetween: 20 },*/}
                {/*            768: { slidesPerView: 2, spaceBetween: 20 },*/}
                {/*            1024: { slidesPerView: 2, spaceBetween: 20 },*/}
                {/*            1025: { slidesPerView: 3, spaceBetween: 20 },*/}
                {/*        }}*/}
                {/*        style={{ overflow: "hidden" }}*/}
                {/*        className="gi-add-more-slider owl-carousel"*/}
                {/*    >*/}
                {/*        {data && data.length > 0 ? data.map((item: any, index: number) => (*/}
                {/*            <SwiperSlide key={index} className="add-more-item">*/}
                {/*                <a href="" className="gi-btn-2">*/}
                {/*                    +*/}
                {/*                </a>*/}
                {/*                <div className="add-more-img">*/}
                {/*                    <img src={item.file_url} alt="product" />*/}
                {/*                </div>*/}
                {/*                <div className="add-more-info">*/}
                {/*                    <h5>{item.name}</h5>*/}
                {/*                    <span className="gi-pro-rating">*/}
                {/*                        <StarRating rating={item.rating} />*/}
                {/*                    </span>*/}
                {/*                    <span className="gi-price">*/}
                {/*                        <span className="new-price">${item.price}</span>*/}
                {/*                        <span className="old-price">${item.old_price}</span>*/}
                {/*                    </span>*/}
                {/*                </div>*/}
                {/*            </SwiperSlide>*/}
                {/*        )): <></>}*/}
                {/*    </Swiper>*/}
                {/*</div>*/}

                {/* */}
                <ProductTab data={productData}/>
                {/* */}
            </Col>


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
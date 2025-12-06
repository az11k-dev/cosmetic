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
                <Container className="py-5">
                    {<SingleProductContent data={productData} handleClose={handleClose} show={show}/>}
                </Container>
                <ProductTab data={productData}/>

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
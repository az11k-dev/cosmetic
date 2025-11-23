import React, {useCallback, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Item } from "@/types/data.types";
import { Container } from 'react-bootstrap';
import SingleProductContent from "@/components/product-page/single-product-content/SingleProductContent.tsx";


const ProductDetailsPage: React.FC = () => {
    const location = useLocation();
    const [show, setShow] = useState(false);
    const handleClose = useCallback(() => setShow(false), []);
    // ⭐ 1. Получаем объект данных, который был передан из ItemCard.tsx
    const productData = location.state?.productData as Item | undefined;

    if (!productData) {
        return (
            <Container className="my-5">
                <h2>Yuklanmoqda... yoki Mahsulot Topilmadi (Loading... or Not Found)</h2>
            </Container>
        );
    }



    return (
        <Container className="py-5">
            <SingleProductContent data={productData}  handleClose={handleClose} show={show}/>
        </Container>
    );
};

export default ProductDetailsPage;
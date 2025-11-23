// src/components/product-page/ProductPage.tsx

import { Swiper, SwiperSlide } from "swiper/react";
import StarRating from "../stars/StarRating";
import ProductTab from "./product-tab/ProductTab";
import { Col } from "react-bootstrap";
import SingleProductContent from "./single-product-content/SingleProductContent";
import Spinner from "../button/Spinner";
import { useSliceData } from "@/hooks/useSliceData";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {addItem, setItems, updateItemQuantity} from "@/store/reducers/cartSlice.ts";
import {Item} from "@/types/data.types.ts";
import {showSuccessToast} from "@/utility/toast.ts";
import {addWishlist, removeWishlist} from "@/store/reducers/wishlistSlice.ts";
import {addCompare, removeCompareItem} from "@/store/reducers/compareSlice.ts";
import { useLocation, useParams } from "react-router-dom"; // ⭐ useLocation va useParams qo'shildi!

const ProductPage = ({
                         order = "",
                         lg = 12,
                     }) => {

    // 💡 1. useLocation yordamida uzatilgan ma'lumotni qabul qilish
    const location = useLocation();
    const productDataFromState = location.state?.productData as Item | undefined;

    // Agar to'g'ridan-to'g'ri URL orqali kirilsa, ID ni olamiz
    const { id } = useParams<{ id: string }>();

    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    // ... (qolgan Redux selectorlari qoladi)

    // 💡 2. Asosiy mahsulot ma'lumotini aniqlash
    const productData: Item | undefined = productDataFromState;

    // Boshqa (related) mahsulotlar uchun ma'lumot
    const { data: relatedItems, error } = useSliceData('moreitems');

    // ... (qolgan useEffects, handleCart, handleWishlist, handleCompareItem, handleClose, handleShow qoladi)

    // --- Tekshirish va Yuklanish holati ---
    if (!productData) {
        // Agar ma'lumot topilmasa, Redux / API dan ID orqali qidirish logikasi shu yerga yozilishi kerak.
        // Hozircha oddiy xabar chiqariladi.
        if (error) return <div>Mahsulotlarni yuklashda xatolik yuz berdi.</div>;
        if (!relatedItems) return <Spinner />;

        return <div>⚠️ Mahsulot ma'lumotlari mavjud emas. ID: {id}</div>;
    }

    // Agar ma'lumot uzatilgan bo'lsa, davom etamiz.

    return (
        <>
            <Col lg={lg} md={12} className={`gi-pro-rightside gi-common-rightside ${order}`  }>
                {/* */}
                <div className="single-pro-block"  >
                    {/* 💡 3. SingleProductContent ga topilgan ma'lumotni uzatish */}
                    <SingleProductContent
                        data={productData}
                        handleClose={handleClose}
                        show={show}
                    />
                </div>
                {/* */}

                <div className="single-add-more m-tb-40" >
                    <Swiper
                        // ... (Swiper sozlamalari)
                        className="gi-add-more-slider owl-carousel"
                    >
                        {relatedItems && relatedItems.length > 0 ? relatedItems.map((item: any, index: number) => (
                            <SwiperSlide key={index} className="add-more-item">
                                {/* ... (SwiperSlide ichidagi elementlar) */}
                            </SwiperSlide>
                        )): <></>}
                    </Swiper>
                </div>
                {/* */}
                <ProductTab />
            </Col>
        </>
    );
};

export default ProductPage;
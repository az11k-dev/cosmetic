import React, { useState, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Fade } from "react-awesome-reveal";
import ZoomImage from "@/components/zoom-image/ZoomImage"; // Убедитесь в правильности пути
import { RootState } from "@/store"; // Убедитесь в правильности пути
import { Item } from "@/types/data.types"; // Убедитесь в правильности пути
import { addItem, updateItemQuantity } from "@/store/reducers/cartSlice";
import { showSuccessToast } from "@/utility/toast";
import { useTranslation } from "react-i18next";
import QuantitySelector from "@/components/quantity-selector/QuantitySelector.tsx";
import SizeOptions from "@/components/product-item/SizeOptions.tsx";
import StarRating from "@/components/stars/StarRating.tsx";
import Modal from "react-bootstrap/Modal";

// 💡 Props uchun TypeScript interfeys
interface SingleProductContentPageProps {
    data: Item;
}

/**
 * Компонент для отображения деталей продукта на полноценной странице.
 * Дизайн адаптирован из QuickViewModal.tsx.
 */
const SingleProductContentPage: React.FC<SingleProductContentPageProps> = ({ data , show, handleClose}:any) => {
    const { t } = useTranslation(["productCard", "itemNames", "categoryNames"]);
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [quantity, setQuantity] = useState(1);

    // --- Логика корзины (как в твоем QuickViewModal) ---
    const handleCart = useCallback((data: Item) => {
        const isItemInCart = cartItems.some((item: Item) => item.id === data.id);

        if (!isItemInCart) {
            dispatch(addItem({ ...data, quantity: quantity }));
            showSuccessToast(t("addToCartSuccessMsg"), { icon: false });
        } else {
            const updatedCartItems = cartItems.map((item: Item) =>
                item.id === data.id
                    ? {
                        ...item,
                        quantity: item.quantity + quantity,
                        price: item.newPrice + data.newPrice,
                    }
                    : item
            );
            dispatch(updateItemQuantity(updatedCartItems));
            showSuccessToast(t("addToCartSuccessMsg"), { icon: false });
        }
    }, [cartItems, dispatch, quantity, t, data.newPrice]);
    // ---------------------------------------------------------------------

    if (!data) return <div>Mahsulot tafsilotlari yuklanmoqda...</div>;

    return (
        <Fade>
            <Modal
                centered
                     show={show}
                     onHide={handleClose}
                     keyboard={false}
                     className="modal fade quickview-modal"
                     id="gi_quickview_modal"
                     tabIndex="-1"
                     role="dialog">

            </Modal>
            <div className="modal-dialog-centered" role="document">
                <div className="modal-content">
                    <Modal.Body>
                        <Row className="product-details-content-wrapper">

                            {/* 1. ЛЕВАЯ КОЛОНКА (Изображение) */}
                            <Col md={5} sm={12} className="mb-767">
                                <div className="single-pro-img single-pro-img-no-sidebar">
                                    <div className="single-product-scroll">
                                        <div className={`single-slide zoom-image-hover`}>
                                            <ZoomImage src={data.image} alt={t(data.title)} />
                                        </div>

                                    </div>
                                </div>
                            </Col>

                            {/* 2. ПРАВАЯ КОЛОНКА (Контент) */}
                            <Col md={7} sm={12}>
                                <div className="quickview-pro-content single-page-content">

                                    {/* A. Заголовок */}
                                    <h1 className="gi-quick-title gi-single-product-title">
                                        {t(data.title, { ns: 'itemNames' })}
                                    </h1>

                                    {/* B. Рейтинг */}
                                    <div className="gi-quickview-rating gi-single-rating">
                                        <StarRating rating={data.rating} />
                                        <span className="rating-text">({data.rating} baho)</span>
                                    </div>

                                    {/* C. Цена */}
                                    <div className="gi-quickview-price gi-single-price">
                            <span className="new-price">
                                ${data.oldPrice * quantity}
                            </span>
                                        {data.newPrice && (
                                            <span className="old-price">${data.newPrice}.00</span>
                                        )}
                                    </div>

                                    {/* D. Описание */}
                                    <div className="gi-quickview-desc gi-single-desc">
                                        {/* Показываем короткое описание или полное описание */}
                                        <p>{data.shortDescription}</p>
                                    </div>

                                    {/* E. Вариации (Размер/Цвет) */}
                                    <div className="gi-pro-variation">
                                        <div className="gi-pro-variation-inner gi-pro-variation-size gi-pro-size">
                                            <div className="gi-pro-variation-content">
                                                <SizeOptions
                                                    categories={["catHairCare"]}
                                                    subCategory={data.category}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* F. Выбор количества и Кнопка Корзины */}
                                    <div className="gi-quickview-qty gi-single-qty-block">
                                        <div className="qty-plus-minus gi-qty-rtl">
                                            <QuantitySelector
                                                quantity={quantity}
                                                id={data.id}
                                                setQuantity={setQuantity}
                                            />
                                        </div>
                                        <div className="gi-quickview-cart gi-single-cart-btn">
                                            <button
                                                onClick={() => handleCart(data)}
                                                className="gi-btn-1"
                                            >
                                                <i className="fi-rr-shopping-basket"></i>
                                                {t("addToCartButton")}
                                            </button>
                                        </div>
                                    </div>

                                    {/* G. Дополнительная информация */}
                                    <div className="gi-single-pro-meta">
                                        <ul>
                                            <li><span>SKU:</span> {data.sku}</li>
                                            <li><span>Kategoriya:</span> {t(data.category, { ns: 'categoryNames' })}</li>
                                        </ul>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </Modal.Body>
                </div>
            </div>

        </Fade>
    );
};

export default SingleProductContentPage;
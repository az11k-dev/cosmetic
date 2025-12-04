import React, {useCallback, useState} from "react";
import Modal from "react-bootstrap/Modal";
import StarRating from "../stars/StarRating";
// import { useDispatch, useSelector } from "react-redux";
// import { addItem, updateItemQuantity } from "../../store/reducers/cartSlice";
import { Fade } from "react-awesome-reveal";
import { Col, Row } from "react-bootstrap";
import QuantitySelector from "../quantity-selector/QuantitySelector";
// import { RootState } from "@/store";
import { showSuccessToast } from "@/utility/toast";
import ZoomImage from "@/components/zoom-image/ZoomImage";
import SizeOptions from "../product-item/SizeOptions";
import { Item } from "@/types/data.types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useCart} from "@/context/CartContext.tsx";


interface SingleProductContentPageProps {
    data: Item;
    show: boolean;
    handleClose: () => void;
}

const QuickViewModal: React.FC<SingleProductContentPageProps> = ({ show, handleClose, data }: any) => {
    const { t } = useTranslation(["productCard"]); // 💡 'productCard' namespace'idan foydalanish
    const { addItemToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const lang = localStorage.getItem("i18nextLng");

    const handleCart = useCallback((product: Item) => {
        // Redux dispatch o'rniga Context funksiyasi ishlatilmoqda
        addItemToCart(product, quantity);

        showSuccessToast(t("addToCartSuccessMsg"), { icon: false });

    }, [addItemToCart, quantity, t]);



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
                role="dialog"
            >
                <div className="modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button
                            type="button"
                            className="btn-close qty_close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleClose}
                        ></button>
                        <Modal.Body>
                            <Row>
                                <Col md={5} sm={12} className=" mb-767">
                                    <div className="single-pro-img single-pro-img-no-sidebar">
                                        <div className="single-product-scroll">
                                            <div className={`single-slide zoom-image-hover`}>
                                                <>
                                                    <ZoomImage  src={data?.images[0]?.upload?.file_url} alt={"item"} />
                                                </>
                                            </div>
                                        </div>
                                    </div>
                                </Col>


                                <Col md={7} sm={12}>
                                    <div className="quickview-pro-content">
                                        <h5 className="gi-quick-title">
                                            {/* 💡 Mahsulot nomini tarjima qilish */}
                                            <Link to="/product-left-sidebar"> {lang === "ru" ? data?.name?.ru : data?.name?.uz}</Link>
                                        </h5>
                                        <div className="gi-quickview-rating">
                                            <StarRating rating={data?.rating} />
                                        </div>

                                        <div className="gi-quickview-desc">
                                            {lang==="ru"? data?.details?.description?.ru:data?.details?.description?.uz}
                                        </div>

                                        <div className="gi-quickview-price">
                                            <span className="new-price">${data?.price }</span>
                                            <span className="old-price">${data?.old_price}</span>
                                        </div>

                                            <div className="gi-single-list">
                                                <ul>
                                                    <li>
                                                        <strong>{lang==="ru"?"Масса":"Og'irligi"} :</strong>  {data?.details?.weight}
                                                    </li>
                                                </ul>
                                            </div>
                                        <div className="gi-quickview-qty">
                                            <div className="qty-plus-minus gi-qty-rtl">
                                                <QuantitySelector
                                                    quantity={quantity}
                                                    id={data?.id}
                                                    setQuantity={setQuantity}
                                                />
                                            </div>
                                            <div className="gi-quickview-cart ">
                                                <button
                                                    onClick={() => handleCart(data)}
                                                    className="gi-btn-1"
                                                >
                                                    <i className="fi-rr-shopping-basket"></i>
                                                    {t("addToCartButton")} {/* 💡 Tugma matnini tarjima qilish */}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Modal.Body>
                    </div>
                </div>
            </Modal>
        </Fade>
    );
};

export default QuickViewModal;

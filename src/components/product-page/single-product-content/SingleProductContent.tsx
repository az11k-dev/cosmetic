import React, { useState,useRef, useCallback ,useEffect} from "react";
import { Col, Row } from "react-bootstrap";
// ❌ REDUX IMPORTLARI TO'LIQ OLIB TASHLANDI
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/store";
// import { addItem, updateItemQuantity } from "@/store/reducers/cartSlice";

// 💡 CONTEXTDAN FOYDALANAMIZ
import { useCart } from "@/context/CartContext.tsx";

import { Fade } from "react-awesome-reveal";
import ZoomImage from "@/components/zoom-image/ZoomImage";
import { Item } from "@/types/data.types";
import { showSuccessToast } from "@/utility/toast";
import { useTranslation } from "react-i18next";
import QuantitySelector from "@/components/quantity-selector/QuantitySelector.tsx";
import SizeOptions from "@/components/product-item/SizeOptions.tsx";
import StarRating from "@/components/stars/StarRating.tsx";
import Modal from "react-bootstrap/Modal";
import Slider from "react-slick";


// 💡 Props uchun TypeScript interfeysini aniqlaymiz
interface SingleProductContentPageProps {
    data: Item;
    show: boolean;
    handleClose: () => void;
}


const SingleProductContentPage: React.FC<SingleProductContentPageProps> = ({ data , show, handleClose}) => {
    console.log(data)
    const { t } = useTranslation(["productCard", "itemNames", "categoryNames"]);

    // 💡 CART CONTEXTDAN KERAKLI FUNKSIYANI OLISH
    const { addItemToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [nav1, setNav1] = useState<Slider | null>(null);
    const slider1 = useRef<Slider | null>(null);
    const [isSliderInitialized, setIsSliderInitialized] = useState(false);

    useEffect(() => {
        if (slider1.current ) {
            setNav1(slider1.current);
        }
    }, []);

    useEffect(() => {
        setIsSliderInitialized(true);
    }, [isSliderInitialized]);

    const handleCart = useCallback((product: Item) => {
        // Redux dispatch o'rniga Context funksiyasi ishlatilmoqda
        addItemToCart(product, quantity);

        showSuccessToast(t("addToCartSuccessMsg"), { icon: false });

    }, [addItemToCart, quantity, t]);

    if (!data) return <div>Mahsulot ma'lumotlari mavjud emas.</div>;

    // handleSlider2Click funksiyasi
    // const handleSlider2Click = (index: number) => {
    //     if (slider1.current) {
    //         slider1.current.slickGoTo(index);
    //     }
    // };

    // --- Context Savat Logikasi ---
    // ---------------------------------------------------------------------

    return (
        <Fade>
            <Modal
                centered
                show={show}
                onHide={handleClose}
                keyboard={false}
                className="modal fade quickview-modal"
                id="gi_quickview_modal"
                tabIndex={-1}
                role="dialog">
            </Modal>

            <div className="modal-dialog-centered" role="document">
                <div className="modal-content">
                    <Modal.Body>
                        <Row className="product-details-content-wrapper">

                            {/* 1. CHAP KOLONKA (Tasvir) */}
                            <Col className="single-pro-img">
                                <div className="single-product-scroll">
                                    <div className="single-slide zoom-image-hover">
                                        <ZoomImage src={data.image} alt={t(data.title)} />
                                    </div>
                                    {/*{isSliderInitialized && (*/}
                                    {/*    <Slider*/}
                                    {/*        slidesToShow={8}*/}
                                    {/*        slidesToScroll={1}*/}
                                    {/*        asNavFor={nav1 as Slider}*/}
                                    {/*        dots={false}*/}
                                    {/*        arrows={true}*/}
                                    {/*        focusOnSelect={true}*/}
                                    {/*        ref={slider1}*/}
                                    {/*        className="single-nav-thumb"*/}
                                    {/*    >*/}
                                    {/*        <div className="single-slide">*/}
                                    {/*            <img className="img-responsive" src={data.image} alt="" />*/}
                                    {/*        </div>*/}
                                    {/*    </Slider>*/}
                                    {/*)}*/}
                                </div>
                            </Col>

                            {/* 2. O'NG KOLONKA (Kontent) */}
                            {/*<Col md={7} sm={12}>*/}
                            {/*    <div className="quickview-pro-content single-page-content">*/}

                            {/*        /!* A. Sarlavha *!/*/}
                            {/*        <h1 className="gi-quick-title gi-single-product-title">*/}
                            {/*            {t(data.title, { ns: 'itemNames' })}*/}
                            {/*        </h1>*/}

                            {/*        /!* B. Baho *!/*/}
                            {/*        <div className="gi-quickview-rating gi-single-rating">*/}
                            {/*            <StarRating rating={data.rating} />*/}

                            {/*        </div>*/}

                            {/*        /!* C. Narx *!/*/}
                            {/*        <div className="gi-quickview-price gi-single-price">*/}
                            {/*            <span className="new-price">*/}
                            {/*                ${(data.oldPrice * quantity).toFixed(2)}*/}
                            {/*            </span>*/}
                            {/*            {data.newPrice && (*/}
                            {/*                <span className="old-price">${data.newPrice.toFixed(2)}</span>*/}
                            {/*            )}*/}
                            {/*        </div>*/}

                            {/*        /!* D. Tavsif *!/*/}


                            {/*        /!* E. Variatsiyalar *!/*/}
                            {/*        <div className="gi-pro-variation">*/}
                            {/*            <div className="gi-pro-variation-inner gi-pro-variation-size gi-pro-size">*/}
                            {/*                <div className="gi-pro-variation-content">*/}
                            {/*                    <SizeOptions categories={["catHairCare"]} subCategory={data.category} />*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}

                            {/*        /!* F. Miqdor tanlash va Savat tugmasi *!/*/}
                            {/*        <div className="gi-quickview-qty gi-single-qty-block">*/}
                            {/*            <div className="qty-plus-minus gi-qty-rtl">*/}
                            {/*                <QuantitySelector*/}
                            {/*                    quantity={quantity}*/}
                            {/*                    id={data.id}*/}
                            {/*                    setQuantity={setQuantity}*/}
                            {/*                />*/}
                            {/*            </div>*/}
                            {/*            <div className="gi-quickview-cart gi-single-cart-btn">*/}
                            {/*                <button*/}
                            {/*                    onClick={() => handleCart(data)}*/}
                            {/*                    className="gi-btn-1"*/}
                            {/*                >*/}
                            {/*                    <i className="fi-rr-shopping-basket"></i>*/}
                            {/*                    {t("addToCartButton")}*/}
                            {/*                </button>*/}
                            {/*            </div>*/}
                            {/*            <div className="gi-single-wishlist">*/}
                            {/*                <a className="gi-btn-group wishlist" title="Wishlist">*/}
                            {/*                    <i className="fi-rr-heart"></i>*/}
                            {/*                </a>*/}
                            {/*            </div>*/}
                            {/*            <div className="gi-single-quickview">*/}
                            {/*                <a*/}
                            {/*                    className="gi-btn-group quickview"*/}
                            {/*                    data-link-action="quickview"*/}
                            {/*                    title="Quick view"*/}
                            {/*                    data-bs-toggle="modal"*/}
                            {/*                    data-bs-target="#gi_quickview_modal"*/}
                            {/*                >*/}
                            {/*                    <i className="fi-rr-eye"></i>*/}
                            {/*                </a>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}





                            {/*        /!* G. Qo'shimcha ma'lumot *!/*/}
                            {/*        <div className="gi-single-pro-meta">*/}
                            {/*            <ul>*/}
                            {/*                <li><span>SKU:</span> {data.sku}</li>*/}
                            {/*                <li><span>Kategoriya:</span> {t(data.category, { ns: 'categoryNames' })}</li>*/}
                            {/*            </ul>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</Col>*/}
                            <Col className="single-pro-desc m-t-991">
                                <div className="single-pro-content">
                                    <h5 className="gi-pro-title"   >
                                        {data.title}
                                    </h5>
                                    <div className="gi-single-rating-wrap">
                                        <div className="gi-single-rating">
                                            <StarRating rating={data.rating} />
                                        </div>
                                        <span className="gi-read-review">
                  |&nbsp;&nbsp;<a href="#gi-spt-nav-review">992 Ratings</a>
                </span>
                                    </div>

                                    <div className="gi-single-price-stoke">
                                        <div className="gi-single-price">
                                            <div className="final-price">
                                         {/*<span className="new-price">${data.newPrice * data.quantity}</span>*/}
                                                <span className="new-price">
                                            ${(data.oldPrice * quantity).toFixed(2)}
                                        </span>

                                            </div>
                                            <div className="mrp">
                                                {data.newPrice && (
                                                    <span className="old-price ">${data.newPrice.toFixed(2)}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="gi-single-stoke">
                                            <span className="gi-single-sku"> <span>SKU:</span> {data.sku}</span>
                                            <span className="gi-single-ps-title">IN STOCK</span>
                                        </div>
                                    </div>
                                    <div className="gi-single-desc">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                        industry. Lorem Ipsum has been the industry s standard dummy
                                        text ever since the 1990.
                                    </div>

                                    <div className="gi-single-list">
                                        <ul>

                                            <li>
                                                <strong>Sole :</strong> Polyvinyl Chloride
                                            </li>
                                            <li>
                                                <strong>Width :</strong> {(data.weight)}
                                            </li>
                                            <li>
                                                <strong>Outer Material :</strong> A-Grade Standard Quality
                                            </li>
                                            <li>
                                                <strong>Closure:</strong> {t(data.category, { ns: 'categoryNames' })}
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="gi-pro-variation">
                                        <div className="gi-pro-variation-inner gi-pro-variation-size">
                                            <span>Weight</span>
                                            <div className="gi-pro-variation">
                                                <div className="gi-pro-variation-inner gi-pro-variation-size gi-pro-size">
                                                    <div className="gi-pro-variation-content">
                                                        <SizeOptions
                                                            categories={[
                                                                "vegetables",
                                                            ]}
                                                            subCategory={data.category}
                                                        />
                                                        {/* <ul className="gi-opt-size">
                            {options.map((data: any, index) => (
                              <li key={index} onClick={() => handleClick(index)} className={activeIndex === index ? "active" : ""}>
                                <a className="gi-opt-sz" data-tooltip={data.tooltip}>
                                  {data.value}
                                </a>
                              </li>
                            ))}
                          </ul> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="gi-single-qty">
                                        <div className="qty-plus-minus ">
                                            <QuantitySelector setQuantity={setQuantity} quantity={quantity} id={data.id} />
                                        </div>
                                        <div className="gi-quickview-cart ">
                                                            <button
                                                                onClick={() => handleCart(data)}
                                                                className="gi-btn-1"
                                                            >
                                                                <i className="fi-rr-shopping-basket"></i>
                                                                {t("addToCartButton")}
                                                            </button>
                                        </div>
                                        <div className="gi-single-wishlist">
                                            <a className="gi-btn-group wishlist" title="Wishlist">
                                                <i className="fi-rr-heart"></i>
                                            </a>
                                        </div>
                                        <div className="gi-single-quickview">
                                            <a
                                                className="gi-btn-group quickview"
                                                data-link-action="quickview"
                                                title="Quick view"
                                                data-bs-toggle="modal"
                                                data-bs-target="#gi_quickview_modal"
                                            >
                                                <i className="fi-rr-eye"></i>
                                            </a>
                                        </div>
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
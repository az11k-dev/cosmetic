import React, {useState, useRef, useCallback, useEffect, useMemo} from "react";
import {Col, Row} from "react-bootstrap";
import {useCart} from "@/context/CartContext.tsx";
import {Fade} from "react-awesome-reveal";
import ZoomImage from "@/components/zoom-image/ZoomImage";
import {Item} from "@/types/data.types";
import {showSuccessToast} from "@/utility/toast";
import {useTranslation} from "react-i18next";
import QuantitySelector from "@/components/quantity-selector/QuantitySelector.tsx";
import StarRating from "@/components/stars/StarRating.tsx";
import Modal from "react-bootstrap/Modal";
import Slider from "react-slick";
import {useWishlist} from "@/context/WishlistContext.tsx";


interface SingleProductContentPageProps {
    data: Item;
    show: boolean;
    handleClose: () => void;
}


const SingleProductContentPage: React.FC<SingleProductContentPageProps> = ({data, show, handleClose}) => {
    const {t} = useTranslation(["productCard", "itemNames", "categoryNames"]);
    const { wishlistItems, addWishlistItem, removeWishlistItem } = useWishlist();
    const {addItemToCart} = useCart();
    const [quantity, setQuantity] = useState(1);
    const [nav1, setNav1] = useState<Slider | null>(null);
    const [nav2, setNav2] = useState<Slider | null>(null);
    const slider1 = useRef<Slider | null>(null);
    const slider2 = useRef<Slider | null>(null);
    const [isSliderInitialized, setIsSliderInitialized] = useState(false);
    const lang = localStorage.getItem("i18nextLng");
    useEffect(() => {
        if (slider1.current && slider2.current) {
            setNav1(slider1.current);
            setNav2(slider2.current);
        }
    }, []);

    useEffect(() => {
        setIsSliderInitialized(true);
    }, [isSliderInitialized]);

    const handleCart = useCallback((product: Item) => {
        addItemToCart(product, quantity);
        showSuccessToast(t("addToCartSuccessMsg"), {icon: false});
    }, [addItemToCart, quantity, t]);


    if (!data) return <div>Mahsulot ma'lumotlari mavjud emas.</div>;


    const handleSlider2Click = (index: number) => {
        if (slider2.current) {
            slider2.current.slickGoTo(index);
        }
    };
    const handleSlider1Click = (index: number) => {
        if (slider1.current) {
            slider1.current.slickGoTo(index);
        }
    };
    const isInWishlist = useMemo(() =>
            wishlistItems.some((item: Item) => item.id === data.id),
        [wishlistItems, data.id]
    );
    const handleWishlist = useCallback((products: Item) => {
        if (!isInWishlist) {
            addWishlistItem(products);
            showSuccessToast(t("addToWishlistSuccessMsg"), { icon: false });
        }
        else {
            removeWishlistItem(products.id);
            showSuccessToast(t("removeWishlistSuccessMsg"), { icon: false });
        }
    }, [isInWishlist, addWishlistItem, removeWishlistItem, t, data]);

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
                            {isSliderInitialized && (
                                <Col className="single-pro-img">
                                    <div className="single-product-scroll">
                                        <Slider
                                            slidesToShow={1}
                                            slidesToScroll={1}
                                            arrows={false}
                                            fade={false}
                                            asNavFor={nav2 as Slider}
                                            focusOnSelect={true}
                                            ref={slider1}
                                            className="single-product-cover"
                                        >
                                            {data?.images?.map((item: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className="single-slide zoom-image-hover"
                                                    onClick={() => handleSlider1Click(index)}
                                                >
                                                    <ZoomImage src={item?.upload?.file_url} alt=""/>
                                                </div>
                                            ))}

                                        </Slider>

                                        <Slider
                                            slidesToShow={4}
                                            slidesToScroll={1}
                                            asNavFor={nav1 as Slider}
                                            dots={false}
                                            arrows={true}
                                            focusOnSelect={true}
                                            ref={slider2}
                                            className="single-nav-thumb"
                                        >
                                            {data?.images?.map((item: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className="single-slide"
                                                    onClick={() => handleSlider1Click(index)}
                                                >
                                                    <img className="img-responsive" src={item?.upload?.file_url}
                                                         alt=""/>
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                </Col>
                            )}


                            <Col className="single-pro-desc m-t-991">
                                <div className="single-pro-content">
                                    <h5 className="gi-pro-title">
                                        {lang === "ru" ? data?.name?.ru : data?.name?.uz}
                                    </h5>
                                    <div className="gi-single-rating-wrap">
                                        <div className="gi-single-rating">
                                            <StarRating rating={data.rating}/>
                                        </div>
                                        <span className="gi-read-review">|&nbsp;&nbsp;<a href="#gi-spt-nav-review">992 Ratings</a></span>
                                    </div>
                                    <div className="gi-single-price-stoke">
                                        <div className="gi-single-price">
                                            <div className="final-price">
                                                <span className="new-price">
                                            ${(data.price * quantity).toFixed(2)}
                                        </span>
                                            </div>
                                            <div className="mrp">
                                                {data.price && (
                                                    <span className="old-price ">${data?.old_price}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="gi-single-stoke">
                                            <span
                                                className="gi-single-sku"> <span>SKU:</span> {data?.details.sku}</span>
                                            <span
                                                className="gi-single-ps-title"> <span>{lang==="ru"?"ЗАПАС":"QOLGAN"}:</span> {data?.details?.stock}</span>
                                        </div>
                                    </div>
                                    <div className="gi-single-desc">
                                        {lang === "ru" ? data?.details?.description?.ru : data?.details?.description?.uz}
                                    </div>

                                    <div className="gi-single-list">
                                        <ul>


                                            <li>
                                                <strong>{lang==="ru"?"Внешний материал:":"Tashqi material:"}</strong> A-Grade Standard Quality
                                            </li>
                                            <li>
                                                <strong>{lang==="ru"?"Категория:":"Kategoriya"}</strong> {lang === "ru" ? data?.category?.name.ru : data?.category?.name.uz}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="gi-pro-variation">
                                        <div className="gi-pro-variation-inner gi-pro-variation-size">
                                            <span>{lang==="ru"?"Масса":"Og'irligi"}</span>
                                            <div className="gi-pro-variation-content">
                                                {data?.details?.weight}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="gi-single-qty">
                                        <div className="qty-plus-minus ">
                                            <QuantitySelector setQuantity={setQuantity} quantity={quantity}
                                                              id={data.id}/>
                                        </div>
                                        <div className="gi-quickview-cart ">
                                            <button
                                                onClick={() => handleCart(data)}
                                                className="gi-btn-1"
                                                style={{display:"flex",alignItems:"center", gap:"6px"}}
                                            >
                                                <i className="fi-rr-shopping-basket"></i>
                                                {t("addToCartButton")}
                                            </button>
                                        </div>

                                        <div className="gi-single-wishlist">
                                            <button
                                                onClick={() => handleWishlist(data)}
                                                className={`gi-btn-group wishlist ${isInWishlist ? "active" : ""}`}
                                                title={t("wishlistTitle")}>
                                                <i className="fi-rr-heart"></i>
                                            </button>
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
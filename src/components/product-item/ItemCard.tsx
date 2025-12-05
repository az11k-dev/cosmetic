import React, {useState, useCallback, useMemo} from "react";
// Context hooklari
import {useCart} from "@/context/CartContext.tsx";
import {useWishlist} from "@/context/WishlistContext.tsx";

import StarRating from "../stars/StarRating";
import QuickViewModal from "../model/QuickViewModal";
import {Link} from "react-router-dom";
import {showSuccessToast} from "@/utility/toast";
import {Item} from "@/types/data.types";
import {useTranslation} from "react-i18next";


interface SingleProductContentPageProps {
    products: Item;
}

const ItemCard: React.FC<SingleProductContentPageProps> = ({data}: { data: Item }) => {
    const {t} = useTranslation(["productCard", "itemNames"]);

    // 💡 CONTEXTDAN OLINADI
    const {addItemToCart} = useCart();
    const {wishlistItems, addWishlistItem, removeWishlistItem} = useWishlist();

    const [show, setShow] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const lang = localStorage.getItem("i18nextLng");

    // Savatga qo'shish mantiqi
    const handleCart = useCallback((product: Item) => {
        // Savatga tanlangan miqdorda qo'shish
        addItemToCart(product, quantity);
        showSuccessToast(t("addToCartSuccessMsg"), {icon: false});
    }, [addItemToCart, quantity, t]);
    const isInWishlist = useMemo(() =>
            wishlistItems.some((item: Item) => item.id === data.id),
        [wishlistItems, data.id]
    );

    // Wishlistga qo'shish/o'chirish mantiqi
    const handleWishlist = useCallback((products: Item) => {
        if (!isInWishlist) {
            addWishlistItem(products);
            showSuccessToast(t("addToWishlistSuccessMsg"), {icon: false});
        } else {
            removeWishlistItem(products.id);
            showSuccessToast(t("removeWishlistSuccessMsg"), {icon: false});
        }
    }, [isInWishlist, addWishlistItem, removeWishlistItem, t, data]);

    // Quick View Modal'ni boshqarish
    const handleClose = useCallback(() => setShow(false), []);
    const handleShow = useCallback(() => setShow(true), []);

    if (!data.images) {
        return (
            <div>
                <p>
                    NO PRODUCT
                </p>
            </div>
        )
    }


    return (
        <>
            <div className="gi-product-content">
                <div className="gi-product-inner">
                    <div className="gi-pro-image-outer">
                        <div className="gi-pro-image">
                            <Link
                                to={`/product-single/${data.id}`}
                                state={{productData: data}}
                                className="image"
                            >
                                <span className="label veg">
                                    <span className="dot"></span>
                                </span>
                                <img className="main-image" src={data?.images[0]?.upload?.file_url} alt="Product"
                                     loading="lazy"/>
                                <img
                                    className="hover-image"
                                    src={data?.images[1]?.upload?.file_url}
                                    alt="Product"
                                    loading="lazy"
                                />
                            </Link>
                            <span className="flags">
                                {data.sale && (
                                    <span className={data.sale === "Sale" ? "sale" : "new"}>
                                        {t(data.sale)}
                                    </span>
                                )}
                            </span>
                            <div className="gi-pro-actions">
                                {/* Wishlist tugmasi (Contextga ulangan) */}
                                <button
                                    onClick={() => handleWishlist(data)}
                                    className={`gi-btn-group wishlist ${isInWishlist ? "active" : ""}`}
                                    title={t("wishlistTitle")}>
                                    <i className="fi-rr-heart"></i>
                                </button>
                                <button
                                    className="gi-btn-group quickview gi-cart-toggle"
                                    data-link-action="quickview"
                                    title={t("quickViewTitle")}
                                    data-bs-toggle="modal"
                                    data-bs-target="#gi_quickview_modal"
                                    onClick={handleShow}>
                                    <i className="fi-rr-eye"></i>
                                </button>
                                {/* Savatga qo'shish tugmasi (Contextga ulangan) */}
                                <button
                                    title={t("addToCartTitle")}
                                    className="gi-btn-group add-to-cart"
                                    onClick={() => handleCart(data)}>
                                    <i className="fi-rr-shopping-basket"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="gi-pro-content">
                        {/* Kategoriya Link'i */}
                        <Link to="/shop-left-sidebar-col-3">
                            <h6 className="gi-pro-stitle">{lang === "ru" ? data?.category?.name?.ru : data?.category?.name?.uz}</h6>
                        </Link>

                        {/* Sarlavha (ProdTitle) Link'i */}
                        <h5 className="gi-pro-title" style={{fontFamily: "\"Roboto\", sans-serif"}}>
                            <Link
                                style={{fontFamily: "\"Roboto\", sans-serif"}}
                                to={`/product-details/${data.id}`}
                                state={{productData: data}}
                            >
                                {lang === "ru" ? data?.name?.ru : data?.name?.uz}
                            </Link>
                        </h5>

                        <p className="gi-info">
                            {t("shortDescription")}
                        </p>
                        <div className="gi-pro-rat-price">
                            <span className="gi-pro-rating">
                                <StarRating rating={data.rating}/>
                                <span className="qty">{data.weight}</span>
                            </span>
                            <span className="gi-price">
                                <span className="new-price">${data.price}.00</span>
                                <span className="old-price">${data.old_price}.00</span>
                            </span>
                        </div>
                    </div>
                </div>
                <QuickViewModal data={data} handleClose={handleClose} show={show}/>
            </div>
        </>
    );
};

export default ItemCard;
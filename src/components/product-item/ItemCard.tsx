// src/components/product-item/ItemCard.tsx

import { useEffect, useState, useCallback, useMemo } from "react";
import StarRating from "../stars/StarRating";
import QuickViewModal from "../model/QuickViewModal";
import { useDispatch, useSelector } from "react-redux";
import {
    addItem,
    setItems, // Asl kodda bor edi
    updateItemQuantity,
} from "../../store/reducers/cartSlice";
import { Link } from "react-router-dom";
import { RootState } from "@/store";
import { addWishlist, removeWishlist } from "@/store/reducers/wishlistSlice";
import { addCompare, removeCompareItem } from "@/store/reducers/compareSlice";
import { showSuccessToast } from "@/utility/toast";
import { Item } from "@/types/data.types";
import { useTranslation } from "react-i18next";

const ItemCard = ({ data }: { data: Item }) => {
    // Tarjima hook'i
    const { t } = useTranslation(["productCard", "itemNames"]);

    // State va Redux hook'lari
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const compareItems = useSelector((state: RootState) => state.compare.compare);
    const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlist);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    // useEffects va useMemos bu yerda bo'lishi mumkin (sizning asl kodingizdagidek)

    // Memoize callbacks (Savatcha mantiqi)
    const handleCart = useCallback((data: Item) => {
        const isItemInCart = cartItems.some((item: Item) => item.id === data.id);

        if (!isItemInCart) {
            dispatch(addItem({ ...data, quantity: 1 }));
            showSuccessToast(t("addToCartSuccessMsg"));
        } else {
            const updatedCartItems = cartItems.map((item: Item) =>
                item.id === data.id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                        price: item.newPrice + data.newPrice,
                    }
                    : item
            );
            dispatch(updateItemQuantity(updatedCartItems));
            showSuccessToast(t("addToCartSuccessMsg"));
        }
    }, [cartItems, dispatch, t]);

    // Istak ro'yxati (Wishlist) mantiqi
    const isInWishlist = useMemo(() =>
            wishlistItems.some((item: Item) => item.id === data.id),
        [wishlistItems, data.id]
    );

    const handleWishlist = useCallback((data: Item) => {
        if (!isInWishlist) {
            dispatch(addWishlist(data));
            showSuccessToast(t("addToWishlistSuccessMsg"), { icon: false });
        } else {
            dispatch(removeWishlist(data.id));
            showSuccessToast(t("removeWishlistSuccessMsg"), { icon: false });
        }
    }, [isInWishlist, dispatch, t]);

    // Taqqoslash (Compare) mantiqi
    const isInCompare = useMemo(() =>
            compareItems.some((item: Item) => item.id === data.id),
        [compareItems, data.id]
    );


    const handleCompareItem = useCallback((data: Item) => {
        if (!isInCompare) {
            dispatch(addCompare(data));
            showSuccessToast(t("addToCompareSuccessMsg"), { icon: false });
        } else {
            dispatch(removeCompareItem(data.id));
            showSuccessToast(t("removeCompareSuccessMsg"), { icon: false });
        }
    }, [isInCompare, dispatch, t]);

    // Modal mantiqi
    const handleClose = useCallback(() => setShow(false), []);
    const handleShow = useCallback(() => setShow(true), []);

    return (
        <>
            <div className="gi-product-content">
                <div className="gi-product-inner">
                    <div className="gi-pro-image-outer">
                        <div className="gi-pro-image">
                            {/* 💡 Rasm bosilganda barcha ma'lumotlar uzatildi */}
                            <Link
                                to={`/product-details/${data.id}`}
                                state={{ productData: data }} // Barcha 'data' obyekti uzatildi
                                className="image"
                            >
                                <span className="label veg">
                                    <span className="dot"></span>
                                </span>
                                <img className="main-image" src={data.image} alt="Product" loading="lazy" />
                                <img
                                    className="hover-image"
                                    src={data.imageTwo}
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
                                {/* Wishlist tugmasi */}
                                <button
                                    onClick={() => handleWishlist(data)}
                                    className={`gi-btn-group wishlist ${isInWishlist ? "active" : ""}`}
                                    title={t("wishlistTitle")}
                                >
                                    <i className="fi-rr-heart"></i>
                                </button>
                                {/* QuickView tugmasi */}
                                <button
                                    className="gi-btn-group quickview gi-cart-toggle"
                                    data-link-action="quickview"
                                    title={t("quickViewTitle")}
                                    data-bs-toggle="modal"
                                    data-bs-target="#gi_quickview_modal"
                                    onClick={handleShow}
                                >
                                    <i className="fi-rr-eye"></i>
                                </button>
                                {/* Compare tugmasi */}
                                <button
                                    onClick={() => handleCompareItem(data)}
                                    className={`gi-btn-group compare ${isInCompare ? "active" : ""}`}
                                    title={t("compareTitle")}
                                >
                                    <i className="fi fi-rr-arrows-repeat"></i>
                                </button>
                                {/* Savatchaga qo'shish tugmasi */}
                                <button
                                    title={t("addToCartTitle")}
                                    className="gi-btn-group add-to-cart"
                                    onClick={() => handleCart(data)}
                                >
                                    <i className="fi-rr-shopping-basket"></i>
                                </button>
                            </div>
                            {/* ... (Color va Size options bo'lishi mumkin) */}
                        </div>
                    </div>
                    <div className="gi-pro-content">
                        {/* Kategoriya Link'i */}
                        <Link to="/shop-left-sidebar-col-3"  >
                            <h6 className="gi-pro-stitle">{t(data.category, { ns: 'categoryNames' })}</h6>
                        </Link>

                        {/* 💡 Sarlavha (ProdTitle) Link'i: Barcha ma'lumotlar uzatildi */}
                        <h5 className="gi-pro-title">
                            <Link
                                to={`/product-details/${data.id}`}
                                state={{ productData: data }} // Barcha 'data' obyekti uzatildi
                            >
                                {t(data.title)}
                            </Link>
                        </h5>

                        <p className="gi-info">
                            {t("shortDescription")}
                        </p>
                        <div className="gi-pro-rat-price">
                            <span className="gi-pro-rating">
                                <StarRating rating={data.rating} />
                                <span className="qty">{data.weight}</span>
                            </span>
                            <span className="gi-price">
                                <span className="new-price">${data.newPrice}.00</span>
                                <span className="old-price">${data.oldPrice}.00</span>
                            </span>
                        </div>
                    </div>
                </div>
                <QuickViewModal data={data} handleClose={handleClose} show={show} />

            </div>
        </>
    );
};

export default ItemCard;
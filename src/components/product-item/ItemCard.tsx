import { useEffect, useState, useCallback, useMemo } from "react";
import StarRating from "../stars/StarRating";
import QuickViewModal from "../model/QuickViewModal";
import { useDispatch, useSelector } from "react-redux";
import {
    addItem,
    setItems,
    updateItemQuantity,
} from "../../store/reducers/cartSlice";
import { Link } from "react-router-dom";
import { RootState } from "@/store";
import { addWishlist, removeWishlist } from "@/store/reducers/wishlistSlice";
import { addCompare, removeCompareItem } from "@/store/reducers/compareSlice";
import { showSuccessToast } from "@/utility/toast";
import { Item } from "@/types/data.types";
import { useTranslation } from "react-i18next"; // 💡 Tarjima importi

const ItemCard = ({ data }: { data: Item }) => {
    // 💡 Ikki namespace dan foydalanish
    const { t } = useTranslation(["productCard", "itemNames"]);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const compareItems = useSelector((state: RootState) => state.compare.compare);
    const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlist);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    // ... (useEffects va useMemos o'zgarishsiz qoladi)

    // Memoize callbacks
    const handleCart = useCallback((data: Item) => {
        const isItemInCart = cartItems.some((item: Item) => item.id === data.id);

        if (!isItemInCart) {
            dispatch(addItem({ ...data, quantity: 1 }));
            showSuccessToast(t("addToCartSuccessMsg")); // 💡 Tarjima
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
            showSuccessToast(t("addToCartSuccessMsg")); // 💡 Tarjima
        }
    }, [cartItems, dispatch, t]);

    const isInWishlist = useMemo(() =>
            wishlistItems.some((item: Item) => item.id === data.id),
        [wishlistItems, data.id]
    );

    const handleWishlist = useCallback((data: Item) => {
        if (!isInWishlist) {
            dispatch(addWishlist(data));
            showSuccessToast(t("addToWishlistSuccessMsg"), { icon: false }); // 💡 Tarjima
        } else {
            dispatch(removeWishlist(data.id));
            showSuccessToast(t("removeWishlistSuccessMsg"), { icon: false }); // 💡 Tarjima
        }
    }, [isInWishlist, dispatch, t]);

    const isInCompare = useMemo(() =>
            compareItems.some((item: Item) => item.id === data.id),
        [compareItems, data.id]
    );


    const handleCompareItem = useCallback((data: Item) => {
        if (!isInCompare) {
            dispatch(addCompare(data));
            showSuccessToast(t("addToCompareSuccessMsg"), { icon: false }); // 💡 Tarjima
        } else {
            dispatch(removeCompareItem(data.id));
            showSuccessToast(t("removeCompareSuccessMsg"), { icon: false }); // 💡 Tarjima
        }
    }, [isInCompare, dispatch, t]);

    const handleClose = useCallback(() => setShow(false), []);
    const handleShow = useCallback(() => setShow(true), []);

    return (
        <>
            <div className="gi-product-content">
                <div className="gi-product-inner">
                    <div className="gi-pro-image-outer">
                        <div className="gi-pro-image">
                            <Link to="/" className="image">
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
                    {/* 💡 "Sale" va "New" tarjimasi */}
                        {t(data.sale)}
                  </span>
                )}
              </span>
                            <div className="gi-pro-actions">
                                <button
                                    onClick={() => handleWishlist(data)}
                                    className={`gi-btn-group wishlist ${isInWishlist ? "active" : ""}`}
                                    title={t("wishlistTitle")} // 💡 Tarjima
                                >
                                    <i className="fi-rr-heart"></i>
                                </button>
                                <button
                                    className="gi-btn-group quickview gi-cart-toggle"
                                    data-link-action="quickview"
                                    title={t("quickViewTitle")} // 💡 Tarjima
                                    data-bs-toggle="modal"
                                    data-bs-target="#gi_quickview_modal"
                                    onClick={handleShow}
                                >
                                    <i className="fi-rr-eye"></i>
                                </button>
                                <button
                                    onClick={() => handleCompareItem(data)}
                                    className={`gi-btn-group compare ${isInCompare ? "active" : ""}`}
                                    title={t("compareTitle")} // 💡 Tarjima
                                >
                                    <i className="fi fi-rr-arrows-repeat"></i>
                                </button>
                                <button
                                    title={t("addToCartTitle")} // 💡 Tarjima
                                    className="gi-btn-group add-to-cart"
                                    onClick={() => handleCart(data)}
                                >
                                    <i className="fi-rr-shopping-basket"></i>
                                </button>
                            </div>
                            {/* ... (Color va Size options o'zgarishsiz qoladi) ... */}
                        </div>
                    </div>
                    <div className="gi-pro-content">
                        <Link to="/shop-left-sidebar-col-3"  >
                            {/* 💡 Kategoriyani 'categoryNames' orqali tarjima qilish */}
                            <h6 className="gi-pro-stitle">{t(data.category, { ns: 'categoryNames' })}</h6>
                        </Link>
                        <h5 className="gi-pro-title"   >
                            {/* 💡 Mahsulot nomini 'productCard' orqali tarjima qilish */}
                            <Link to="/product-left-sidebar">{t(data.title)}</Link>
                        </h5>

                        <p className="gi-info">
                            {/* 💡 Qisqa tavsifni tarjima qilish */}
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
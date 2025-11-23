// src/components/product-item/ItemCard.tsx

import { useCallback, useMemo, useState } from "react";
import StarRating from "../stars/StarRating";
import QuickViewModal from "../model/QuickViewModal";
import { useDispatch, useSelector } from "react-redux";
import {
    addItem,
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
    const { t } = useTranslation(["productCard", "itemNames"]);

    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const compareItems = useSelector((state: RootState) => state.compare.compare);
    const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlist);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    // ... (handleCart, handleWishlist, handleCompareItem mantiqlari o'zgarishsiz qoladi)

    const handleCart = useCallback((data: Item) => {
        // ... (Savatcha mantiqi)
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

    const isInWishlist = useMemo(() =>
            wishlistItems.some((item: Item) => item.id === data.id),
        [wishlistItems, data.id]
    );

    const handleWishlist = useCallback((data: Item) => {
        // ... (Istak ro'yxati mantiqi)
        if (!isInWishlist) {
            dispatch(addWishlist(data));
            showSuccessToast(t("addToWishlistSuccessMsg"), { icon: false });
        } else {
            dispatch(removeWishlist(data.id));
            showSuccessToast(t("removeWishlistSuccessMsg"), { icon: false });
        }
    }, [isInWishlist, dispatch, t]);

    const isInCompare = useMemo(() =>
            compareItems.some((item: Item) => item.id === data.id),
        [compareItems, data.id]
    );


    const handleCompareItem = useCallback((data: Item) => {
        // ... (Taqqoslash mantiqi)
        if (!isInCompare) {
            dispatch(addCompare(data));
            showSuccessToast(t("addToCompareSuccessMsg"), { icon: false });
        } else {
            dispatch(removeCompareItem(data.id));
            showSuccessToast(t("removeCompareSuccessMsg"), { icon: false });
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
                            {/* 💡 Rasm Link'i: Ma'lumotni state orqali uzatish */}
                            <Link
                                to={`/product-single/${data.id}`}
                                state={{ productData: data }} // ⭐ TO'G'RI UZATISH
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
                            {/* ... (flags va actions qoladi) */}
                        </div>
                    </div>
                    <div className="gi-pro-content">
                        {/* Kategoriya Link'i */}
                        <Link to="/shop-left-sidebar-col-3"  >
                            <h6 className="gi-pro-stitle">{t(data.category, { ns: 'categoryNames' })}</h6>
                        </Link>

                        {/* 💡 Sarlavha (ProdTitle) Link'i: Manzilni to'g'irlash va ma'lumotni uzatish */}
                        <h5 className="gi-pro-title">
                            <Link
                                to={`/product-single/${data.id}`} // ⭐ MANZILNI TO'G'IRLASH
                                state={{ productData: data }} // ⭐ MA'LUMOT UZATISH
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
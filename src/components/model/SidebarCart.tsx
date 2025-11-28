import { useEffect, useState, useCallback } from "react";
// 💡 useCart'dan kerakli funksiyalarni import qilish
import { useCart } from "@/context/CartContext.tsx";

import { Link } from "react-router-dom";
import QuantitySelector from "../quantity-selector/QuantitySelector";
import { useTranslation } from "react-i18next";
import { Item } from "@/types/data.types";

// CartItem turini bu yerda ham e'lon qilishimiz kerak, agar Item'dan foydalanmasa
interface CartItem extends Item {
    quantity: number;
}

const SidebarCart = ({ closeCart, isCartOpen }: { closeCart: () => void; isCartOpen: boolean; }) => {

    const { t } = useTranslation("sidebarCart");
    const lang = localStorage.getItem("i18nextLng");
    // 💡 CONTEXTDAN KERAKLI HOLAT VA FUNKSIYALARNI OLISH
    const {
        cartItems,
        removeItemFromCart, // O'chirish
        updateItemQuantity // Miqdorni yangilash
    } = useCart();

    const [subTotal, setSubTotal] = useState(0);
    const [vat, setVat] = useState(0);

    // Umumiy summani hisoblash (useEffect)
    useEffect(() => {
        if (cartItems.length === 0) {
            setSubTotal(0);
            setVat(0);
            return;
        }

        // Mahsulot narxining miqdorga ko'paytmasi summasi
        const subtotal = cartItems.reduce(
            // item.newPrice birlik narxi deb hisoblaymiz
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setSubTotal(subtotal);

        // QQS (VAT) hisoblash (20%)
        const vatAmount = subtotal * 0.2;
        setVat(vatAmount);
    }, [cartItems]);

    const total = subTotal + vat;

    const handleSubmit = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
    }, []);


    const handleRemoveFromCart = useCallback((id: string) => {
        removeItemFromCart(id);
    }, [removeItemFromCart]);


    const handleQuantityChange = useCallback((id: string, newQuantity: number) => {
        updateItemQuantity(id, newQuantity);
    }, [updateItemQuantity]);


    return (
        <>
            {isCartOpen && (
                <div
                    style={{ display: isCartOpen ? "block" : "none" }}
                    className="gi-side-cart-overlay"
                    onClick={closeCart}
                ></div>
            )}
            <div id="gi-side-cart" className={`gi-side-cart ${isCartOpen ? "gi-open-cart" : ""}`}>
                <div className="gi-cart-inner">
                    <div className="gi-cart-top">
                        {/* ... sarlavha qismi */}
                        {cartItems.length === 0 ? (
                            <div className="gi-pro-content cart-pro-title">
                                {t('cartEmptyMessage')}
                            </div>
                        ) : (
                            <ul className="gi-cart-pro-items">
                                {cartItems.map((item: CartItem, index: number) => (
                                    <li key={index}>
                                        <Link
                                            onClick={handleSubmit}
                                            to="/"
                                            className="gi-pro-img"
                                        >
                                            <img src={item?.images[0]?.upload?.file_url} alt="product" />
                                        </Link>
                                        <div className="gi-pro-content">
                                            <Link to="/" className="cart-pro-title">
                                                {lang === "ru" ? item?.name?.ru : item?.name?.uz}
                                            </Link>
                                            <span className="cart-price">
                                                {/* Umumiy narxni hisoblaymiz */}
                                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                            </span>
                                            <div className="qty-plus-minus gi-qty-rtl">
                                                {/* 💡 QuantitySelector komponentiga funksiyani o'tkazamiz */}
                                                <QuantitySelector
                                                    id={item.id}
                                                    quantity={item.quantity}
                                                    onQuantityChange={handleQuantityChange}
                                                />
                                            </div>
                                            <a
                                                // ID orqali o'chirish funksiyasini chaqiramiz
                                                onClick={() => handleRemoveFromCart(item.id)}
                                                className="remove"
                                            >
                                                {t('removeSymbol')}
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* ... jami hisob va tugmalar */}
                    {cartItems.length > 0 && (
                        <div className="gi-cart-bottom">
                            <div className="cart-sub-total">
                                <table className="table cart-table">
                                    <tbody>
                                    <tr>
                                        <td className="text-left">{t('subTotal')} :</td>
                                        <td className="text-right">${subTotal.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">{t('vat')} (20%) :</td>
                                        <td className="text-right">${vat.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">{t('total')} :</td>
                                        <td className="text-right primary-color">
                                            ${total.toFixed(2)}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="cart_btn">
                                <Link to="/cart" className="gi-btn-1" onClick={closeCart}>
                                    {t('viewCartButton')}
                                </Link>
                                <Link to="/checkout" className="gi-btn-2" onClick={closeCart}>
                                    {t('checkoutButton')}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SidebarCart;
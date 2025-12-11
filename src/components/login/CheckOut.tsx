// CheckOut.tsx

import React, {useEffect, useRef, useState, useCallback} from "react";
import StarRating from "../stars/StarRating";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import {Col, Row} from "react-bootstrap";
import DiscountCoupon from "../discount-coupon/DiscountCoupon";
import {Address, DiscountState} from "@/types/data.types";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

// --- ИМПОРТЫ CONTEXT API ---
import {useCart} from "@/context/CartContext";
import {useAuth} from "@/context/AuthContext";
import {useTranslation, Trans} from "react-i18next";
import {showErrorToast} from "@/utility/toast.ts";
// -----------------------

// 💡 Определяем тип для элементов, отправляемых в API
interface ProductItem {
    id: number;
    quantity: number;
}

// 💡 Убедитесь, что ваш CartContext возвращает useClearCart, или
// что функция clearCart доступна через useCart.
interface CartContextType {
    cartItems: any[]; // Замените any на ваш реальный тип элемента корзины
    clearCart?: () => void; // Добавляем опциональную функцию clearCart
}

const API_URL = "https://admin.beauty-point.uz/api/orders/index";

interface AddressFormProps {
    t: (key: string) => string;
    existingAddresses: Address[];
    selectedAddress: Address | null;
    onSelectAddress: (address: Address | null) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
                                                     t,
                                                     existingAddresses,
                                                     selectedAddress,
                                                     onSelectAddress,
                                                 }) => {
    // Состояние для полей нового адреса
    const [newAddress, setNewAddress] = useState<Address>({
        address: selectedAddress?.address || "",
        latitude: 1,
        longitude: 2,
    });

    // Обработчик выбора существующего адреса
    const handleAddressSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const addressValue = e.target.value;
        if (addressValue === "new") {
            onSelectAddress(null); // Новый адрес
            setNewAddress({address: "", latitude: 1, longitude: 2}); // Очищаем форму
        } else {
            // Ищем адрес по ID или индексу (в зависимости от того, как вы его храните)
            const selected = existingAddresses.find(
                (addr, index) => String(index) === addressValue || String(existingAddresses.indexOf(addr)) === addressValue
            );
            if (selected) {
                onSelectAddress(selected);
                setNewAddress(selected); // Заполняем форму выбранным адресом
            }
        }
    };

    useEffect(() => {
        // Если выбран существующий адрес, обновляем поля формы для отображения
        if (selectedAddress) {
            setNewAddress(selectedAddress);
        } else {
            // Если выбран "Новый адрес", очищаем форму
            setNewAddress({address: "", longitude: 1, latitude: 2});
        }
    }, [selectedAddress]);

    // Определяем, должен ли пользователь редактировать поля (только для "Нового адреса")
    const isEditingDisabled = selectedAddress && existingAddresses.some(addr => addr.address === selectedAddress.address);

    // В случае, если selectedAddress пустой, используем newAddress для формы.
    const formAddress = selectedAddress && !isEditingDisabled ? selectedAddress : newAddress;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        // Обновляем локальное состояние
        const updatedAddress = {...newAddress, [name]: value};
        setNewAddress(updatedAddress);
        // Устанавливаем обновленный адрес как выбранный
        onSelectAddress(updatedAddress);
    };


    return (
        <div className="gi-checkout-form">
            <div className="gi-checkout-wrap">
                {/* 1. ВЫБОР ИЗ СУЩЕСТВУЮЩИХ АДРЕСОВ (если есть) */}
                {existingAddresses.length > 0 && (
                    <Row className="mb-4">
                        <Col md={12}>
                            <label
                                htmlFor="addressSelector">{t("select_existing_address") || "Или выберите существующий адрес"}</label>
                            <select
                                id="addressSelector"
                                className="form-control"
                                onChange={handleAddressSelection}
                                value={selectedAddress && existingAddresses.some(addr => addr.address === selectedAddress.address) ? String(selectedAddress.address) : "new"}
                            >
                                <option value="new">{t("new_address_option") || "Ввести новый адрес"}</option>
                                {existingAddresses.map((addr, index) => (
                                    <option key={index} value={String(index)}>
                                        {addr.address}
                                    </option>
                                ))}
                            </select>
                        </Col>
                    </Row>
                )}

                {/* 2. ФОРМА ВВОДА АДРЕСА */}
                <Row>
                    <Col md={12}>
                        <div className="form-group">
                            <label htmlFor="address">{t("address_street") || "Адрес (улица, дом)"}
                                <span>*</span></label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="form-control"
                                required
                                value={formAddress.address}
                                onChange={handleInputChange}
                                /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                                // @ts-expect-error
                                disabled={isEditingDisabled}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
// ----------------------------------------------------

const CheckOut = () => {
    // Инициализируем t
    const {t} = useTranslation("checkOut");

    // 💡 1. ИСПОЛЬЗОВАНИЕ CONTEXT ДЛЯ КОРЗИНЫ И ОЧИСТКИ
    const {cartItems, clearCart} = useCart() as CartContextType; // Используем clearCart из useCart

    // 💡 2. ИСПОЛЬЗОВАНИЕ CONTEXT ДЛЯ АУТЕНТИФИКАЦИИ
    const {user} = useAuth();

    // 💡 3. ИСПОЛЬЗОВАНИЕ useNavigate
    const navigate = useNavigate();

    // --- СОСТОЯНИЕ ДЛЯ ОТПРАВКИ API ---
    const [comment, setComment] = useState("");
    const [inputPromocode, setInputPromocode] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    // ------------------------------------------

    const [subTotal, setSubTotal] = useState(0);
    const [discountState, setDiscountState] = useState<DiscountState>({
        value: 0,
        type: "amount",
        errorMessage: "",
        code: undefined,
    });
    const [selectedMethod, setSelectedMethod] = useState("flat");
    const [paymentMethod, setPaymentMethod] = useState("click");
    const [addressVisible, setAddressVisible] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const checkboxRef = useRef<HTMLInputElement>(null);
    const lang = localStorage.getItem("i18nextLng");

    const flatDeliveryCost = 30000;

    const vat = selectedMethod === "flat" ? flatDeliveryCost : 0;

    const calculateFinalTotal = useCallback(() => {
        let currentTotal = subTotal + vat;
        const {value, type} = discountState;

        if (value > 0) {
            if (type === "percentage") {
                // Вычитаем процент
                currentTotal -= currentTotal * (value / 100);
            } else if (type === "amount") {
                // Вычитаем фиксированную сумму
                currentTotal -= value;
            }
        }
        // Убеждаемся, что итоговая сумма не отрицательна
        return Math.max(0, currentTotal);
    }, [subTotal, vat, discountState]);

    const finalTotal = calculateFinalTotal();

    const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMethod(event.target.value);
    };

    useEffect(() => {
        const storedAddresses = JSON.parse(
            localStorage.getItem("shippingAddresses") || "[]"
        );
        setAddressVisible(storedAddresses);
    }, []);

    useEffect(() => {
        if (cartItems.length === 0) {
            setSubTotal(0);
            return;
        }

        const subtotal = cartItems.reduce(
            (acc, item) => acc + (item?.price || 0) * item.quantity,
            0
        );
        setSubTotal(subtotal);
    }, [cartItems]);


    // 💡 ОБНОВЛЕННАЯ ФУНКЦИЯ: ОТПРАВКА ЗАКАЗА НА API
    const handlePlaceOrder = useCallback(async () => {
        if (loading) return; // Предотвращаем двойную отправку

        // 1. ПРОВЕРКА НЕОБХОДИМЫХ УСЛОВИЙ
        if (cartItems.length === 0) {
            showErrorToast(t("cart_empty_error") || "Корзина пуста. Невозможно оформить заказ.");
            return;
        }

        if (!isTermsChecked) {
            showErrorToast(t("terms_unchecked_error") || "Пожалуйста, примите условия и положения.");
            if (checkboxRef.current) checkboxRef.current.focus();
            return;
        }

        // ПРОВЕРКА АДРЕСА - КРИТИЧЕСКИ ВАЖНО
        if (!selectedAddress || !selectedAddress.address) {
            showErrorToast(t("address_missing_error") || "Пожалуйста, выберите или введите полный адрес доставки (включая координаты).");
            return;
        }

        setLoading(true);
        setApiError(null);

        try {
            // 2. ПОДГОТОВКА ДАННЫХ
            const productsPayload: ProductItem[] = cartItems.map((item) => ({
                // Убедитесь, что 'id' в CartItem - это именно id продукта, как того требует API
                id: item.id,
                quantity: item.quantity,
            }));

            const orderPayload = {
                products: productsPayload,
                comment: comment,
                // Используем данные из выбранного адреса
                address: selectedAddress.address,
                latitude: selectedAddress.latitude,
                longitude: selectedAddress.longitude,
                promocode: discountState.value > 0 ? discountState.code : undefined,
            };

            // 3. ПОЛУЧЕНИЕ ТОКЕНА
            const token = localStorage.getItem("authToken"); // Замените `user?.token` на фактическое местоположение токена

            if (!token) {
                showErrorToast(t("auth_token_missing") || "Ошибка: Токен аутентификации отсутствует. Пожалуйста, войдите в систему.");
                setLoading(false);
                return;
            }

            // 4. ОТПРАВКА ЗАПРОСА
            const response = await axios.post(
                API_URL,
                orderPayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`, // Отправляем токен в заголовке
                    },
                }
            );
            const res = response.data;

            // 5. ОБРАБОТКА УСПЕХА
            if (response.status === 200) {
                toast.success(t("order_success") || "Заказ успешно оформлен!");
                // 💡 Раскомментируйте, если clearCart доступен
                if (clearCart) {
                    clearCart();
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                navigate("/");
                if (paymentMethod === "payme") {
    window.location.href = res?.data?.payment?.payme || "/";
} else {
    window.location.href = res?.data?.payment?.click || "/";
                }
            
            } else {
                // Если API возвращает 200, но статус не success (может быть 'error' с сообщением)
                const message = response.data.message || "Неизвестная ошибка при оформлении заказа.";
                setApiError(message);
            }

        } catch (error) {
            // 6. ОБРАБОТКА ОШИБКИ
            console.error("Order API Error:", error);
            if (axios.isAxiosError(error) && error.response) {
                // Ошибка от сервера (4xx, 5xx)
                const serverMessage = error.response.data.message || error.response.data.error;
                const errorMessage = serverMessage || "Ошибка сервера при оформлении заказа.";
                setApiError(errorMessage);
            } else {
                // Другие ошибки (сеть, CORS)
                const errorMessage = t("network_error") || "Сетевая ошибка. Попробуйте снова.";
                setApiError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    }, [cartItems, isTermsChecked, selectedAddress, comment, inputPromocode, user, navigate, t, clearCart, discountState]); // Добавили clearCart

    // 💡 Обратите внимание: в `return` части компонент был исправлен, чтобы вызывать `handlePlaceOrder`

    return (
        <>
            <Breadcrumb title={t("checkout_page_title")}/>
            <section className="gi-checkout-section padding-tb-40">
                <h2 className="d-none">{t("checkout_page_heading")}</h2>
                <div className="container">
                    {cartItems.length === 0 ? (
                        <div
                            style={{
                                textAlign: "center",
                                fontSize: "20px",
                                fontWeight: "300",
                            }}
                            className="gi-pro-content cart-pro-title"
                        >
                            {t("cart_empty_message")}
                        </div>
                    ) : (
                        <Row>
                            <Col lg={8} md={12} className="gi-checkout-leftside">
                                {/* 💡 ИНТЕГРАЦИЯ НОВОГО КОМПОНЕНТА ФОРМЫ АДРЕСА */}
                                <AddressForm
                                    t={t}
                                    existingAddresses={addressVisible}
                                    selectedAddress={selectedAddress}
                                    onSelectAddress={setSelectedAddress}
                                />
                                {/* ЛОГИКА ОТОБРАЖЕНИЯ АДРЕСА И МЕТОДОВ ДОСТАВКИ/ОПЛАТЫ */}
                                {/* ... Ваш код для адреса ... */}
                            </Col>
                            <Col lg={4} md={12} className="gi-checkout-rightside">
                                <div className="gi-sidebar-wrap">
                                    <div className="gi-sidebar-block">
                                        <div className="gi-sb-title">
                                            <h3 className="gi-sidebar-title">{t("summary_title")}</h3>
                                        </div>
                                        <div className="gi-sb-block-content">
                                            <div className="gi-checkout-summary">
                                                <div>
                                                    <span className="text-left">{t("summary_subtotal")}</span>
                                                    <span className="text-right">
                                                        {subTotal.toLocaleString("en-US")} so'm
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-left">{t("summary_delivery_charges")}</span>
                                                    <span
                                                        className="text-right">{vat.toLocaleString("en-US")} so'm</span>
                                                </div>
                                                <div>
                                                    {/* Передаем функцию, которая обновит наш discountState */}
                                                    <DiscountCoupon onDiscountApplied={(data: DiscountState) => {
                                                        setDiscountState(data);
                                                    }}/>
                                                </div>
                                                {discountState.value > 0 && (
                                                    <div className="text-success" style={{fontWeight: 600}}>
                                                        <span
                                                            className="text-left">{t("summary_discount") || "Скидка"}</span>
                                                        <span className="text-right">
                                                            {discountState.type === "percentage"
                                                                ? `${discountState.value}%`
                                                                : `- ${discountState.value.toLocaleString("en-US")} so'm`}
                                                        </span>
                                                    </div>
                                                )}
                                                <div style={{
                                                    width: "100%",
                                                }}>
                                                    <p style={{
                                                        textAlign: "end",
                                                        color: "red"
                                                    }}>
                                                        {discountState?.errorMessage}
                                                    </p>
                                                </div>
                                                <div className="gi-checkout-coupan-content">
                                                    <form
                                                        className="gi-checkout-coupan-form"
                                                        name="gi-checkout-coupan-form"
                                                        method="post"
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                            // Здесь можно реализовать логику проверки промокода
                                                            toast.success(`Промокод ${inputPromocode} отправлен на проверку.`);
                                                        }}
                                                    >
                                                        <input
                                                            className="gi-coupan"
                                                            type="text"
                                                            required
                                                            placeholder={t("coupon_placeholder")}
                                                            name="gi-coupan"
                                                            value={inputPromocode}
                                                            onChange={(e) => setInputPromocode(e.target.value)}
                                                        />
                                                        <button
                                                            className="gi-coupan-btn gi-btn-2"
                                                            type="submit"
                                                            name="subscribe"
                                                        >
                                                            {t("coupon_apply_btn")}
                                                        </button>
                                                    </form>
                                                </div>
                                                <div className="gi-checkout-summary-total">
                                                    <span className="text-left">{t("summary_total_amount")}</span>
                                                    <span className="text-right">
                                        {finalTotal.toLocaleString("en-US")} so'm
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="gi-checkout-pro">
                                                {cartItems.map((item, index: number) => (
                                                    // ... Логика отображения товаров ...
                                                    <div key={index} className="col-sm-12 mb-6">
                                                        <div className="gi-product-inner">
                                                            <div className="gi-pro-image-outer">
                                                                <div className="gi-pro-image">
                                                                    <a className="image">
                                                                        <img
                                                                            className="main-image"
                                                                            src={item?.images[0]?.upload.file_url}
                                                                            alt="Product"
                                                                        />
                                                                        <img
                                                                            className="hover-image"
                                                                            src={item?.images[1]?.upload.file_url}
                                                                            alt="Product"
                                                                        />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="gi-pro-content">
                                                                <h5 className="gi-pro-title">
                                                                    <Link to={`/product-details/${item?.id}`}>
                                                                        {lang === "ru" ? item?.name?.ru : item?.name?.uz} x {item?.quantity}
                                                                    </Link>
                                                                </h5>
                                                                <div className="gi-pro-rating">
                                                                    <StarRating rating={item.rating}/>
                                                                </div>
                                                                <span className="gi-price">
                                                                    <span className="new-price">
                                                                        {parseInt(String(item.price))?.toLocaleString("en-US")} so'm
                                                                    </span>
                                                                    <span className="old-price">
                                                                        {parseInt(String(item.old_price))?.toLocaleString("en-US")} so'm
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="gi-sidebar-wrap gi-checkout-del-wrap">
                                    <div className="gi-sidebar-block">
                                        <div className="gi-sb-title">
                                            <h3 className="gi-sidebar-title">{t("delivery_title")}</h3>
                                        </div>
                                        <div className="gi-sb-block-content">
                                            <div className="gi-checkout-del">
                                                <div className="gi-del-desc">
                                                    {t("delivery_description")}
                                                </div>
                                                <form>
                                                    <span className="gi-del-option">
                                                        <span>
                                                            <span className="gi-del-opt-head">
                                                                {t("delivery_free_shipping")}
                                                            </span>
                                                            <input
                                                                type="radio"
                                                                id="del1"
                                                                name="radio-group"
                                                                value="free"
                                                                checked={selectedMethod === "free"}
                                                                onChange={handleDeliveryChange}
                                                            />
                                                            <label htmlFor="del1">{t("delivery_rate")} 0 so'm</label>
                                                        </span>
                                                        <span>
                                                            <span className="gi-del-opt-head">
                                                                {t("delivery_flat_rate")}
                                                            </span>
                                                            <input
                                                                type="radio"
                                                                id="del2"
                                                                name="radio-group"
                                                                value="flat"
                                                                checked={selectedMethod === "flat"}
                                                                onChange={handleDeliveryChange}
                                                            />
                                                            <label
                                                                htmlFor="del2">{t("delivery_rate")} {flatDeliveryCost.toLocaleString("en-US")} so'm</label>
                                                        </span>
                                                    </span>
                                                    <span className="gi-del-comment">
                                                        <span className="gi-del-opt-head">
                                                            {t("delivery_add_comments_head")}
                                                        </span>
                                                        <textarea
                                                            name="your-comment"
                                                            placeholder={t("delivery_comments_placeholder")}
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></textarea>
                                                    </span>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="gi-sidebar-wrap gi-checkout-pay-wrap">
                                    <div className="gi-sidebar-block">
                                        <div className="gi-sb-title">
                                            <h3 className="gi-sidebar-title">{t("payment_title")}</h3>
                                        </div>
                                        <div className="gi-sb-block-content">
                                            <div className="gi-checkout-pay">
                                                <div className="gi-pay-desc">
                                                    {t("payment_description")}
                                                </div>
                                                <form>
                                                    <span className="gi-pay-option">
                                                  <p>
    <input
        type="radio"
        id="pay_click"
        name="radio-group"
        value="click"
        checked={paymentMethod === "click"}
        onChange={(e) => setPaymentMethod(e.target.value)}
    />
    <label style={{
        marginRight: 0,
        marginTop: 0,
        marginLeft: 0,
        marginBottom: 0
    }} htmlFor="pay_click">Click</label>
</p>

<p>
    <input
        type="radio"
        id="pay_payme"
        name="radio-group"
        value="payme"
        checked={paymentMethod === "payme"}
        onChange={(e) => setPaymentMethod(e.target.value)}
    />
    <label style={{
        marginRight: 0,
        marginTop: 0,
        marginLeft: 0,
        marginBottom: 0
    }} htmlFor="pay_payme">Payme</label>
</p>

                                                    </span>
                                                    <span className="gi-pay-agree">
                                                        <input
                                                            ref={checkboxRef}
                                                            required
                                                            checked={isTermsChecked}
                                                            onChange={() =>
                                                                setIsTermsChecked(!isTermsChecked)
                                                            }
                                                            type="checkbox"
                                                            value=""
                                                        />
                                                        <a>
                                                            <Trans i18nKey="payment_agree_terms">
                                                                {lang === "ru" ? "Я прочитал(а) и согласен(на) " : "Men o'qidim va roziman "}
                                                                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                                                {/*@ts-expect-error*/}
                                                                <span>{{terms: t("payment_terms_conditions")}}</span>.
                                                            </Trans>
                                                        </a>
                                                        <span className="checked"></span>
                                                    </span>
                                                    {apiError && (
                                                        <div className="alert alert-danger mt-3">
                                                            Ошибка: {apiError}
                                                        </div>
                                                    )}
                                                    {/* 💡 КНОПКА ОФОРМЛЕНИЯ ЗАКАЗА - ИСПРАВЛЕНО: Теперь она вызывает handlePlaceOrder */}
                                                    <button
                                                        type="button"
                                                        className="gi-btn-1 gi-btn-block mt-4"
                                                        onClick={handlePlaceOrder}
                                                    >
                                                        {loading
                                                            ? (t("placing_order_loading") || "Оформление...")
                                                            : (t("place_order_btn") || "Оформить Заказ")}
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="gi-sidebar-wrap gi-check-pay-img-wrap">
                                    <div className="gi-sidebar-block">
                                        <div className="gi-sb-title">
                                            <h3 className="gi-sidebar-title">{t("payment_title")}</h3>
                                        </div>
                                        <div className="gi-sb-block-content">
                                            <div className="gi-check-pay-img-inner">
                                                <div className="gi-check-pay-img">
                                                    <img
                                                        src={"/assets/img/hero-bg/payment.png"}
                                                        alt="payment"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}
                </div>
            </section>
        </>
    );
};


export default CheckOut;


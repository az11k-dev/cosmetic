// CheckOut.tsx

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ItemCard from "../product-item/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import StarRating from "../stars/StarRating";
import { Fade } from "react-awesome-reveal";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import { Col, Form, Row } from "react-bootstrap";
import Spinner from "../button/Spinner";
import { addOrder, clearCart } from "@/store/reducers/cartSlice";
import { login } from "@/store/reducers/registrationSlice";
import DiscountCoupon from "../discount-coupon/DiscountCoupon";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "@/utility/toast";
import { Address, City, Country, RegistrationData, State } from "@/types/data.types";
import { useCountries } from "@/hooks/useCountries";
import { useStates } from "@/hooks/useStates";
import { useCities } from "@/hooks/useCities";
import { Link } from "react-router-dom";

// --- i18next ИМПОРТЫ ---
import { useTranslation, Trans } from "react-i18next";
// -----------------------

const CheckOut = () => {
    // Инициализируем t
    const { t } = useTranslation("checkOut");

    const [email, setEmail] = useState("");
    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState("");
    const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const orders = useSelector((state: RootState) => state.cart.orders);
    const isLogin = useSelector(
        (state: RootState) => state.registration.isAuthenticated
    );
    const [subTotal, setSubTotal] = useState(0);
    const [vat, setVat] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [selectedMethod, setSelectedMethod] = useState("free");
    const [checkOutMethod, setCheckOutMethod] = useState("guest");
    const [billingMethod, setBillingMethod] = useState("new");
    const [billingVisible, setBillingVisible] = useState(false);
    const [addressVisible, setAddressVisible] = useState<any[]>([]);
    const [optionVisible, setOptionVisible] = useState(true);
    const [loginVisible, setLoginVisible] = useState(false);
    const [btnVisible, setBtnVisible] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const checkboxRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData]: any = useState({
        id: "",
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        state: "",
    });

    useEffect(() => {
        const existingAddresses = JSON.parse(
            localStorage.getItem("shippingAddresses") || "[]"
        );
        setAddressVisible(existingAddresses);

        if (existingAddresses.length > 0 && !selectedAddress) {
            setSelectedAddress(existingAddresses[0]);
        }
    }, [selectedAddress]);

    useEffect(() => {
        if (selectedAddress) {
            setBillingMethod("use");
        } else {
            setBillingMethod("new");
        }
    }, [selectedAddress]);

    useEffect(() => {
        if (isLogin) {
            setBtnVisible(false);
            setOptionVisible(false);
            setBillingVisible(true);
        }
    }, [isLogin]);

    const filteredCountryData: Country[] = useCountries();
    const filteredStateData: State[]  = useStates(formData?.country || "");
    const filteredCityData: City[] = useCities(formData?.state || "");

    const handleDeliveryChange = (event: any) => {
        setSelectedMethod(event.target.value);
    };

    const handleBillingChange = (event: any) => {
        setBillingMethod(event.target.value);
    };

    const handleCheckOutChange = (event: any) => {
        const method = event.target.value;
        setCheckOutMethod(method);
        setBillingVisible(false);
        setLoginVisible(true);
        setBtnVisible(true);

        if (method === "guest") {
            setBillingVisible(false);
            setLoginVisible(false);
        } else if (method === "login") {
            setLoginVisible(true);
            setBtnVisible(false);
        }
    };

    const handleContinueBtn = () => {
        if (checkOutMethod === "register") {
            navigate("/register");
        } else if (checkOutMethod === "guest") {
            setBillingVisible(true);
            setLoginVisible(false);
            setBtnVisible(false);
        } else if (checkOutMethod === "login") {
            setBillingVisible(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        formData.id = `${Date.now()}`;

        const existingAddresses = JSON.parse(
            localStorage.getItem("shippingAddresses") || "[]"
        );

        let updatedAddresses;
        if (existingAddresses.length === 0) {
            updatedAddresses = [formData];
            setSelectedAddress(formData);
        } else {
            updatedAddresses = [...existingAddresses, formData];
        }

        localStorage.setItem("shippingAddresses", JSON.stringify(updatedAddresses));
        setAddressVisible(updatedAddresses);
        setSelectedAddress(formData);

        setFormData({
            id: "",
            first_name: "",
            last_name: "",
            address: "",
            city: "",
            postalCode: "",
            country: "",
            state: "",
        });

        const requiredFields = [
            "first_name",
            "last_name",
            "address",
            "country",
            "state",
            "city",
            "postalCode",
        ];

        for (const field of requiredFields) {
            if (!formData[field]) {
                setValidated(true);
                return;
            }
        }

        setValidated(false);
    };

    useEffect(() => {
        const storedRegistrations = JSON.parse(
            localStorage.getItem("registrationData") || "[]"
        );
        setRegistrations(storedRegistrations);
    }, []);

    useEffect(() => {
        const storedAddresses = JSON.parse(
            localStorage.getItem("shippingAddresses") || "[]"
        );
        setAddressVisible(storedAddresses);
    }, []);

    // item Price

    useEffect(() => {
        if (cartItems.length === 0) {
            setSubTotal(0);
            setVat(0);
            return;
        }

        const subtotal = cartItems.reduce(
            (acc, item) => acc + item.newPrice * item.quantity,
            0
        );
        setSubTotal(subtotal);
        // Calculate VAT
        const vatAmount = subtotal * 0.2;
        setVat(vatAmount);
    }, [cartItems]);

    const discountAmount = subTotal * (discount / 100);
    const total = subTotal + vat - discountAmount;
    // item Price end

    const { data, error } = useSelector((state: RootState) => state.deal);


    if (error) return <div>{t('error_loading_products')}</div>;
    if (!data)
        return (
            <div>
                <Spinner />
            </div>
        );

    const getData = () => {
        return data;
    };

    const generateRandomId = () => {
        const randomNum = Math.floor(Math.random() * 100000);
        return `${randomNum}`;
    };

    const randomId = generateRandomId();

    const handleCheckout = () => {
        if (!isTermsChecked) {
            // Переводим сообщение об ошибке
            showErrorToast(t("toast_agree_terms_error"));
            checkboxRef.current?.focus();
            return;
        }

        if (!selectedAddress) {
            // Переводим сообщение об ошибке
            showErrorToast(t("toast_select_address_error"));
            return;
        }

        const newOrder = {
            orderId: randomId,
            date: new Date().getTime(),
            shippingMethod: selectedMethod,
            totalItems: cartItems.length,
            totalPrice: total,
            status: "Pending",
            products: cartItems,
            address: selectedAddress,
        };

        const orderExists = orders.some(
            (order: any) => order.id === newOrder.orderId
        );

        if (!orderExists) {
            dispatch(addOrder(newOrder));
        } else {
            console.log(
                `Order with ID ${newOrder.orderId} already exists and won't be added again.`
            );
        }
        dispatch(clearCart());

        navigate("/orders");
    };

    const handleRemoveAddress = (index: number) => {
        const updatedAddresses = addressVisible.filter((_, i) => i !== index);
        localStorage.setItem("shippingAddresses", JSON.stringify(updatedAddresses));
        setAddressVisible(updatedAddresses);
    };

    const handleSelectAddress = (address: any) => {
        setSelectedAddress(address);
    };

    const handleLogin = (e: any) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const foundUser = registrations.find(
            (user) => user.email === email && user.password === password
        );

        if (foundUser) {
            const userData = { uid: foundUser.uid, email, password };

            localStorage.setItem("login_user", JSON.stringify(userData));
            dispatch(login(foundUser));
            // Переводим сообщение об успехе
            showSuccessToast(t("toast_login_success"));
            setLoginVisible(false); // Скрываем форму логина после успешного входа
            setBillingVisible(true); // Показываем детали доставки
            setOptionVisible(false); // Скрываем опции оформления
        } else {
            // Переводим сообщение об ошибке
            showErrorToast(t("toast_login_invalid"));
        }

        const requiredFields = ["email", "password"];

        for (const field of requiredFields) {
            if (!formData[field]) {
                setValidated(true);
                return;
            }
        }
        setValidated(true);
    };

    const handleInputChange = async (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    }

    return (
        <>
            <Breadcrumb title={t("checkout_page_title")} />
            <section className="gi-checkout-section padding-tb-40">
                {/* Переводим заголовок для поисковиков, но скрываем его */}
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
                            {/* Переводим сообщение о пустой корзине */}
                            {t("cart_empty_message")}
                        </div>
                    ) : (
                        <Row>
                            {/* */}
                            <Col lg={4} md={12} className="gi-checkout-rightside">
                                <div className="gi-sidebar-wrap">
                                    {/* */}
                                    <div className="gi-sidebar-block">
                                        <div className="gi-sb-title">
                                            {/* Переводим заголовок */}
                                            <h3 className="gi-sidebar-title">{t("summary_title")}</h3>
                                        </div>
                                        <div className="gi-sb-block-content">
                                            <div className="gi-checkout-summary">
                                                <div>
                                                    {/* Переводим Sub-Total */}
                                                    <span className="text-left">{t("summary_subtotal")}</span>
                                                    <span className="text-right">
                            ${subTotal.toFixed(2)}
                          </span>
                                                </div>
                                                <div>
                                                    {/* Переводим Delivery Charges */}
                                                    <span className="text-left">{t("summary_delivery_charges")}</span>
                                                    <span className="text-right">${vat.toFixed(2)}</span>
                                                </div>
                                                <div>
                                                    <DiscountCoupon onDiscountApplied={setDiscount} />
                                                </div>
                                                <div className="gi-checkout-coupan-content">
                                                    <form
                                                        className="gi-checkout-coupan-form"
                                                        name="gi-checkout-coupan-form"
                                                        method="post"
                                                        action="#"
                                                    >
                                                        <input
                                                            className="gi-coupan"
                                                            type="text"
                                                            required
                                                            // Переводим плейсхолдер
                                                            placeholder={t("coupon_placeholder")}
                                                            name="gi-coupan"
                                                            defaultValue=""
                                                        />
                                                        <button
                                                            className="gi-coupan-btn gi-btn-2"
                                                            type="submit"
                                                            name="subscribe"
                                                        >
                                                            {/* Переводим кнопку */}
                                                            {t("coupon_apply_btn")}
                                                        </button>
                                                    </form>
                                                </div>
                                                <div className="gi-checkout-summary-total">
                                                    {/* Переводим Total Amount */}
                                                    <span className="text-left">{t("summary_total_amount")}</span>
                                                    <span className="text-right">
                            ${total.toFixed(2)}
                          </span>
                                                </div>
                                            </div>
                                            <div className="gi-checkout-pro">
                                                {cartItems.map((item: any, index: number) => (
                                                    <div key={index} className="col-sm-12 mb-6">
                                                        <div className="gi-product-inner">
                                                            <div className="gi-pro-image-outer">
                                                                <div className="gi-pro-image">
                                                                    <a
                                                                        href={`${process.env.VITE_APP_URL}/product-left-sidebar`}
                                                                        className="image"
                                                                    >
                                                                        <img
                                                                            className="main-image"
                                                                            src={item?.file_url}
                                                                            alt="Product"
                                                                        />
                                                                        <img
                                                                            className="hover-image"
                                                                            src={item.imageTwo}
                                                                            alt="Product"
                                                                        />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="gi-pro-content">
                                                                <h5 className="gi-pro-title">
                                                                    <Link to="/product-left-sidebar">
                                                                        {item.title}
                                                                    </Link>
                                                                </h5>
                                                                <div className="gi-pro-rating">
                                                                    <StarRating rating={item.rating} />
                                                                </div>
                                                                <span className="gi-price">
                                  <span className="new-price">
                                    ${item.newPrice}.00
                                  </span>
                                  <span className="old-price">
                                    ${item.oldPrice}.00{" "}
                                  </span>
                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/* */}
                                </div>
                                <div className="gi-sidebar-wrap gi-checkout-del-wrap">
                                    {/* */}
                                    <div className="gi-sidebar-block">
                                        <div className="gi-sb-title">
                                            {/* Переводим заголовок */}
                                            <h3 className="gi-sidebar-title">{t("delivery_title")}</h3>
                                        </div>
                                        <div className="gi-sb-block-content">
                                            <div className="gi-checkout-del">
                                                {/* Переводим описание */}
                                                <div className="gi-del-desc">
                                                    {t("delivery_description")}
                                                </div>
                                                <form action="#">
                          <span className="gi-del-option">
                            <span>
                              <span className="gi-del-opt-head">
                                {/* Переводим Free Shipping */}
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
                                {/* Переводим Rate */}
                                <label htmlFor="del1">{t("delivery_rate")} $0.00</label>
                            </span>
                            <span>
                              <span className="gi-del-opt-head">
                                {/* Переводим Flat Rate */}
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
                                {/* Переводим Rate */}
                                <label htmlFor="del2">{t("delivery_rate")} $5.00</label>
                            </span>
                          </span>
                                                    <span className="gi-del-comment">
                            <span className="gi-del-opt-head">
                              {/* Переводим Add Comments */}
                                {t("delivery_add_comments_head")}
                            </span>
                            <textarea
                                name="your-comment"
                                // Переводим плейсхолдер
                                placeholder={t("delivery_comments_placeholder")}
                            ></textarea>
                          </span>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {/* */}
                                </div>
                                <div className="gi-sidebar-wrap gi-checkout-pay-wrap">
                                    {/* */}
                                    <div className="gi-sidebar-block">
                                        <div className="gi-sb-title">
                                            {/* Переводим заголовок */}
                                            <h3 className="gi-sidebar-title">{t("payment_title")}</h3>
                                        </div>
                                        <div className="gi-sb-block-content">
                                            <div className="gi-checkout-pay">
                                                {/* Переводим описание */}
                                                <div className="gi-pay-desc">
                                                    {t("payment_description")}
                                                </div>
                                                <form action="#">
                          <span className="gi-pay-option">
                            <span>
                              <input
                                  readOnly
                                  type="radio"
                                  id="pay1"
                                  name="radio-group"
                                  value=""
                                  checked
                              />
                                {/* Переводим Cash On Delivery */}
                                <label htmlFor="pay1">{t("payment_cash_on_delivery")}</label>
                            </span>
                          </span>
                                                    <span className="gi-pay-commemt">
                            <span className="gi-pay-opt-head">
                              {/* Переводим Add Comments */}
                                {t("delivery_add_comments_head")}
                            </span>
                            <textarea
                                name="your-commemt"
                                // Переводим плейсхолдер
                                placeholder={t("delivery_comments_placeholder")}
                            ></textarea>
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
                                {/* Переводим I have read and agree to the Terms & Conditions. */}
                                <Trans i18nKey="payment_agree_terms">
                                    I have read and agree to the <span>{{ terms: t("payment_terms_conditions") }}</span>.
                                </Trans>
                            </a>
                            <span className="checked"></span>
                          </span>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {/* */}
                                </div>
                                <div className="gi-sidebar-wrap gi-check-pay-img-wrap">
                                    {/* */}
                                    <div className="gi-sidebar-block">
                                        <div className="gi-sb-title">
                                            {/* Переводим заголовок */}
                                            <h3 className="gi-sidebar-title">{t("payment_title")}</h3>
                                        </div>
                                        <div className="gi-sb-block-content">
                                            <div className="gi-check-pay-img-inner">
                                                <div className="gi-check-pay-img">
                                                    <img
                                                        src={

                                                            "/assets/img/hero-bg/payment.png"
                                                        }
                                                        alt="payment"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* */}
                                </div>
                            </Col>
                            <Col lg={8} md={12} className="gi-checkout-leftside m-t-991">
                                {/* */}
                                <div className="gi-checkout-content">
                                    <div className="gi-checkout-inner">
                                        {optionVisible && (
                                            <>
                                                <div className="gi-checkout-wrap m-b-40">
                                                    <div className="gi-checkout-block">
                                                        {/* Переводим заголовок */}
                                                        <h3 className="gi-checkout-title">{t("new_customer_title")}</h3>
                                                        <div className="gi-check-block-content">
                                                            {/* Переводим подзаголовок */}
                                                            <div className="gi-check-subtitle">
                                                                {t("checkout_options_title")}
                                                            </div>
                                                            <form action="#">
                                <span className="gi-new-option">
                                  <span>
                                    <input
                                        type="radio"
                                        id="account2"
                                        name="radio-group"
                                        value="guest"
                                        checked={checkOutMethod === "guest"}
                                        onChange={handleCheckOutChange}
                                    />
                                      {/* Переводим Guest Account */}
                                      <label htmlFor="account2">
                                      {t("option_guest_account")}
                                    </label>
                                  </span>
                                  <span>
                                    <input
                                        type="radio"
                                        id="account1"
                                        name="radio-group"
                                        value="register"
                                        checked={checkOutMethod === "register"}
                                        onChange={handleCheckOutChange}
                                    />
                                      {/* Переводим Register Account */}
                                      <label htmlFor="account1">
                                      {t("option_register_account")}
                                    </label>
                                  </span>
                                  <span>
                                    <input
                                        type="radio"
                                        id="account3"
                                        name="radio-group"
                                        value="login"
                                        checked={checkOutMethod === "login"}
                                        onChange={handleCheckOutChange}
                                    />
                                      {/* Переводим Login Account */}
                                      <label htmlFor="account3">
                                      {t("option_login_account")}
                                    </label>
                                  </span>
                                </span>
                                                            </form>

                                                            {btnVisible ? (
                                                                <>
                                                                    {/* Переводим описание */}
                                                                    <div className="gi-new-desc">
                                                                        {t("option_register_desc")}
                                                                    </div>

                                                                    <div className="gi-new-btn">
                                                                        <a
                                                                            onClick={handleContinueBtn}
                                                                            className="gi-btn-2"
                                                                        >
                                                                            {/* Переводим кнопку */}
                                                                            {t("option_continue_btn")}
                                                                        </a>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {loginVisible && (
                                                                        <div
                                                                            style={{ marginTop: "15px" }}
                                                                            className=" m-b-40"
                                                                        >
                                                                            <div className="gi-checkout-block gi-check-login">
                                                                                <div className="gi-check-login-form">
                                                                                    <Form
                                                                                        noValidate
                                                                                        validated={validated}
                                                                                        onSubmit={handleLogin}
                                                                                        action="#"
                                                                                        method="post"
                                                                                    >
                                            <span className="gi-check-login-wrap">
                                              {/* Переводим Email Address */}
                                                <label>{t("login_email")}</label>
                                              <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    name="email"
                                                    // Переводим плейсхолдер
                                                    placeholder={t("login_email_placeholder")}
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                  {/* Переводим сообщение об ошибке */}
                                                    {t("login_error_email")}
                                                </Form.Control.Feedback>
                                              </Form.Group>
                                            </span>
                                                                                        <span
                                                                                            style={{ marginTop: "24px" }}
                                                                                            className="gi-check-login-wrap"
                                                                                        >
                                              {/* Переводим Password */}
                                                                                            <label>{t("login_password")}</label>
                                              <Form.Group>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    pattern="^\d{6,12}$"
                                                    // Переводим плейсхолдер
                                                    placeholder={t("login_password_placeholder")}
                                                    required
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(e.target.value)
                                                    }
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                  {/* Переводим сообщение об ошибке */}
                                                    {t("login_error_password")}
                                                </Form.Control.Feedback>
                                              </Form.Group>
                                            </span>
                                                                                        <span className="gi-check-login-wrap gi-check-login-btn">
                                              <button
                                                  className="gi-btn-2"
                                                  type="submit"
                                              >
                                                {/* Переводим кнопку */}
                                                  {t("option_continue_btn")}
                                              </button>
                                              <a
                                                  className="gi-check-login-fp"
                                              >
                                                {/* Переводим Forgot Password? */}
                                                  {t("login_forgot_password")}
                                              </a>
                                            </span>
                                                                                    </Form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {billingVisible && (
                                            <div className="gi-checkout-wrap m-b-30 padding-bottom-3">
                                                <div className="gi-checkout-block gi-check-bill">
                                                    {/* Переводим заголовок */}
                                                    <h3 className="gi-checkout-title">{t("billing_details_title")}</h3>
                                                    <div className="gi-bl-block-content">
                                                        {/* Переводим подзаголовок */}
                                                        <div className="gi-check-subtitle">
                                                            {t("checkout_options_title")}
                                                        </div>
                                                        <span className="gi-bill-option">
                              <span>
                                <input
                                    type="radio"
                                    id="bill1"
                                    name="radio-group"
                                    value="use"
                                    checked={billingMethod === "use"}
                                    onChange={handleBillingChange}
                                    disabled={addressVisible.length === 0}
                                />
                                  {/* Переводим опцию */}
                                  <label htmlFor="bill1">
                                  {t("billing_use_existing")}
                                </label>
                              </span>
                              <span>
                                <input
                                    type="radio"
                                    id="bill2"
                                    name="radio-group"
                                    value="new"
                                    checked={
                                        billingMethod === "new" ||
                                        addressVisible.length === 0
                                    }
                                    onChange={handleBillingChange}
                                />
                                  {/* Переводим опцию */}
                                  <label htmlFor="bill2">
                                  {t("billing_use_new")}
                                </label>
                              </span>
                            </span>

                                                        {/* --- Блок отображения существующих адресов (не переведен в оригинале, но здесь нужна логика) --- */}
                                                        {billingMethod === "use" && addressVisible.length > 0 && (
                                                            <div className="gi-existing-address mt-4">
                                                                <h5 className="mb-3">{t("billing_use_existing")}</h5>
                                                                <Row>
                                                                    {addressVisible.map((address: Address, index: number) => (
                                                                        <Col key={index} md={6} className="mb-3">
                                                                            <div
                                                                                className={`gi-address-card p-3 border rounded ${selectedAddress?.id === address.id ? 'border-primary' : ''}`}
                                                                                onClick={() => handleSelectAddress(address)}
                                                                                style={{ cursor: 'pointer' }}
                                                                            >
                                                                                <h6>{address.first_name} {address.last_name}</h6>
                                                                                <p className="mb-1">{address.address}, {address.city}</p>
                                                                                <p className="mb-1">{address.state}, {address.postalCode}</p>
                                                                                <p className="mb-0">{address.country}</p>
                                                                                <button
                                                                                    className="gi-btn-1 btn-sm mt-2"
                                                                                    onClick={(e) => { e.stopPropagation(); handleRemoveAddress(index); }}
                                                                                >
                                                                                    {t("action_remove_from_list")}
                                                                                </button>
                                                                            </div>
                                                                        </Col>
                                                                    ))}
                                                                </Row>
                                                            </div>
                                                        )}

                                                        {/* --- Блок формы нового адреса --- */}
                                                        {(billingMethod === "new" || addressVisible.length === 0) && (
                                                            <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-4">
                                                                <Row>
                                                                    {/* First Name */}
                                                                    <Col md={6}>
                                                                        <div className="gi-bl-wrap gi-bl-half">
                                                                            <label htmlFor="first_name">{t("form_first_name")}*</label>
                                                                            <Form.Group>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="first_name"
                                                                                    value={formData.first_name}
                                                                                    onChange={handleInputChange}
                                                                                    required
                                                                                />
                                                                            </Form.Group>
                                                                        </div>
                                                                    </Col>
                                                                    {/* Last Name */}
                                                                    <Col md={6}>
                                                                        <div className="gi-bl-wrap gi-bl-half">
                                                                            <label htmlFor="last_name">{t("form_last_name")}*</label>
                                                                            <Form.Group>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="last_name"
                                                                                    value={formData.last_name}
                                                                                    onChange={handleInputChange}
                                                                                    required
                                                                                />
                                                                            </Form.Group>
                                                                        </div>
                                                                    </Col>
                                                                    {/* Country */}
                                                                    <Col md={6}>
                                                                        <div className="gi-bl-wrap gi-bl-half">
                                                                            <label htmlFor="country">{t("form_country")}*</label>
                                                                            <Form.Select name="country" value={formData.country} onChange={handleInputChange} required>
                                                                                <option value="">{t("form_select")}</option>
                                                                                {filteredCountryData.map((country) => (
                                                                                    <option key={country.iso2} value={country.iso2}>{country.name}</option>
                                                                                ))}
                                                                            </Form.Select>
                                                                        </div>
                                                                    </Col>
                                                                    {/* State */}
                                                                    <Col md={6}>
                                                                        <div className="gi-bl-wrap gi-bl-half">
                                                                            <label htmlFor="state">{t("form_state")}*</label>
                                                                            <Form.Select name="state" value={formData.state} onChange={handleInputChange} required>
                                                                                <option value="">{t("form_select")}</option>
                                                                                {filteredStateData.map((state) => (
                                                                                    <option key={state.iso2} value={state.iso2}>{state.name}</option>
                                                                                ))}
                                                                            </Form.Select>
                                                                        </div>
                                                                    </Col>
                                                                    {/* City */}
                                                                    <Col md={6}>
                                                                        <div className="gi-bl-wrap gi-bl-half">
                                                                            <label htmlFor="city">{t("form_city")}*</label>
                                                                            <Form.Select name="city" value={formData.city} onChange={handleInputChange} required>
                                                                                <option value="">{t("form_select")}</option>
                                                                                {filteredCityData.map((city) => (
                                                                                    <option key={city.name} value={city.name}>{city.name}</option>
                                                                                ))}
                                                                            </Form.Select>
                                                                        </div>
                                                                    </Col>
                                                                    {/* Address */}
                                                                    <Col md={6}>
                                                                        <div className="gi-bl-wrap gi-bl-half">
                                                                            <label htmlFor="address">{t("form_address")}*</label>
                                                                            <Form.Group>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="address"
                                                                                    value={formData.address}
                                                                                    onChange={handleInputChange}
                                                                                    required
                                                                                />
                                                                            </Form.Group>
                                                                        </div>
                                                                    </Col>
                                                                    {/* Postal Code */}
                                                                    <Col md={6}>
                                                                        <div className="gi-bl-wrap gi-bl-half">
                                                                            <label htmlFor="postalCode">{t("form_postal_code")}*</label>
                                                                            <Form.Group>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="postalCode"
                                                                                    value={formData.postalCode}
                                                                                    onChange={handleInputChange}
                                                                                    required
                                                                                />
                                                                            </Form.Group>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <div className="gi-new-btn mt-4">
                                                                    <button type="submit" className="gi-btn-2">
                                                                        {t("form_save_address")}
                                                                    </button>
                                                                </div>
                                                            </Form>
                                                        )}

                                                        {/* --- Кнопка подтверждения заказа (внизу левой колонки) --- */}
                                                        <div className="gi-bl-btn">
                                                            <a
                                                                onClick={handleCheckout}
                                                                className="gi-btn-2"
                                                            >
                                                                {t("checkout_confirm_order")}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}
                </div>
            </section>

            {/* Секция New Arrivals (без изменений, переведена ранее) */}
            <section className="gi-new-product padding-tb-40">
                <div className="container">
                    <Row className="overflow-hidden m-b-minus-24px">
                        <Col lg={12} className="gi-new-prod-section">
                            <div className="gi-products">
                                <Fade
                                    triggerOnce
                                    direction="up"
                                    duration={2000}
                                    delay={200}
                                    className="section-title-2"
                                >
                                    <h2 className="gi-title">
                                        <Trans i18nKey="new_arrivals_title">
                                            New <span>Arrivals</span>
                                        </Trans>
                                    </h2>
                                    <p>{t("new_arrivals_subtitle")}</p>
                                </Fade>
                                <Fade
                                    triggerOnce
                                    direction="up"
                                    duration={2000}
                                    delay={200}
                                    className="gi-new-block m-minus-lr-12"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                    data-aos-delay="300"
                                >
                                    <Swiper
                                        loop={true}
                                        autoplay={{ delay: 1000 }}
                                        slidesPerView={5}
                                        breakpoints={{
                                            0: {
                                                slidesPerView: 1,
                                            },
                                            320: {
                                                slidesPerView: 1,
                                            },
                                            425: {
                                                slidesPerView: 2,
                                            },
                                            640: {
                                                slidesPerView: 2,
                                            },
                                            768: {
                                                slidesPerView: 3,
                                            },
                                            1024: {
                                                slidesPerView: 3,
                                            },
                                            1025: {
                                                slidesPerView: 5,
                                            },
                                        }}
                                        className="deal-slick-carousel gi-product-slider"
                                    >
                                        {getData().map((item: any, index: number) => (
                                            <SwiperSlide key={index}>
                                                <ItemCard data={item} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </Fade>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    );
};

export default CheckOut;
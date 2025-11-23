import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ItemCard from "../product-item/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { removeItem } from "../../store/reducers/cartSlice";
import { Fade } from "react-awesome-reveal";
import Spinner from "../button/Spinner";
import DiscountCoupon from "../discount-coupon/DiscountCoupon";
import QuantitySelector from "../quantity-selector/QuantitySelector";
import { Link } from "react-router-dom";
import { City, Country, State } from "@/types/data.types";
import { useCountries } from "@/hooks/useCountries";
import { useStates } from "@/hooks/useStates";
import { useCities } from "@/hooks/useCities";
import { useTranslation } from "react-i18next"; // ✅ i18next import qilindi

const Cart = () => {
    // 1. T va I18N funksiyalarini olish. Namespace 'cartAll' ishlatiladi.
    const { t, i18n } = useTranslation('cartAll');

    // Tilni almashtirish funksiyasi
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    // Tilni o'zgartiruvchi tugmalar
    const LanguageSwitcher = () => (
        <div style={{ padding: '10px', textAlign: 'center' }}>
            <button
                onClick={() => changeLanguage('uz')}
                style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer', border: i18n.language === 'uz' ? '2px solid blue' : '1px solid gray' }}
            >
                O'ZBEK (uz)
            </button>
            <button
                onClick={() => changeLanguage('ru')}
                style={{ padding: '5px 10px', cursor: 'pointer', border: i18n.language === 'ru' ? '2px solid blue' : '1px solid gray' }}
            >
                РУССКИЙ (ru)
            </button>
        </div>
    );

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const [subTotal, setSubTotal] = useState(0);
    const [vat, setVat] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [formData, setFormData] = useState<{
        country: string,
        state: string,
        city: string,
    }>({
        country: "",
        state: "",
        city: ""
    });

    const filteredCountryData: Country[] = useCountries();
    // ESLATMA: useStates va useCities funksiyalaridan qabul qilinayotgan qiymatlarni
    // TypeScriptda to'g'ri ishlatish uchun `undefined` yoki bo'sh qatorni hisobga olish kerak.
    const filteredStateData: State[]  = useStates(formData?.country || "") || [];
    const filteredCityData: City[] = useCities(formData?.state || "") || [];

    const handleInputChange = async (e: any) => {
        const { name, value } = e.target;
        console.log("{ name, value }", { name, value })

        // Davlat o'zgarsa, viloyat/shahar maydonlarini tozalash logikasi qo'shildi
        if (name === 'country') {
            setFormData({
                country: value,
                state: "",
                city: ""
            });
        }
        else if (name === 'state') {
            setFormData(prev => ({
                ...prev,
                state: value,
                city: ""
            }));
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    }

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

    const handleDiscountApplied = (discount:any) => {
        setDiscount(discount);
    };

    const discountAmount = subTotal * (discount / 100);
    const total = subTotal + vat - discountAmount;

    const handleRemoveFromCart = (item: any) => {
        dispatch(removeItem(item.id));
    };

    const { data, error } = useSelector((state: RootState) => state.deal);

    if (error) return <div>Failed to load products</div>;
    if (!data)
        return (
            <div>
                <Spinner />
            </div>
        );

    const getData = () => {
        return data;
    };

    return (
        <>

            <section className="gi-cart-section padding-tb-40">
                <h2 className="d-none">{t('cartTitle')}</h2>
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
                            {" "}
                            {t('emptyCart')}
                        </div>
                    ) : (
                        <div className="row">
                            {/* */}
                            <div className="gi-cart-rightside col-lg-4 col-md-12">
                                <div className="gi-sidebar-wrap">
                                    {/* */}
                                    <div className="gi-sidebar-block">
                                        <div className="gi-sb-title">
                                            <h3 className="gi-sidebar-title">{t('sidebar.summaryTitle')}</h3>
                                        </div>
                                        <div className="gi-sb-block-content">
                                            <h4 className="gi-ship-title">{t('sidebar.shippingTitle')}</h4>
                                            <div className="gi-cart-form">
                                                <p>{t('sidebar.shippingEstimateHint')}</p>
                                                <form action="#" method="post">
                          <span className="gi-cart-wrap">
                            <label>{t('sidebar.countryLabel')}</label>
                            <span className="gi-cart-select-inner">
                              <select
                                  name="country"
                                  id="gi-cart-select-country"
                                  className="gi-cart-select"
                                  value={formData.country} // defaultValue o'rniga value
                                  aria-label={t('sidebar.countryPlaceholder')}
                                  onChange={handleInputChange}
                              >
                                <option value="" disabled>
                                  {t('sidebar.countryPlaceholder')}
                                </option>
                                  {filteredCountryData.map(
                                      (country: Country, index: number) => (
                                          <option key={index} value={country.iso2}>
                                              {country.name}
                                          </option>
                                      )
                                  )}
                              </select>
                            </span>
                          </span>
                                                    <span className="gi-cart-wrap">
                            <label>{t('sidebar.stateLabel')}</label>
                            <span className="gi-cart-select-inner">
                              <select
                                  name="state"
                                  id="gi-select-state"
                                  className="gi-register-select"
                                  value={formData.state}
                                  onChange={handleInputChange}
                                  aria-label={t('sidebar.statePlaceholder')}
                                  disabled={!formData.country} // Davlat tanlanmasa o'chirilgan
                              >
                                <option value="" disabled>
                                  {t('sidebar.statePlaceholder')}
                                </option>
                                  {filteredStateData && filteredStateData.length === 0 && formData.country ? (
                                      <option disabled>{t('table.loading')}</option>
                                  ) : (
                                      filteredStateData.map((state: State, index) => (
                                          <option
                                              key={index}
                                              value={state.state_code}
                                          >
                                              {state.name}
                                          </option>
                                      ))
                                  )}
                              </select>
                            </span>
                          </span>
                                                    <span className="gi-cart-wrap">
                            <label>{t('sidebar.cityLabel')}</label>
                            <span className="gi-cart-select-inner">
                              <select
                                  name="city"
                                  id="gi-select-city"
                                  className="gi-register-select"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  aria-label={t('sidebar.cityPlaceholder')}
                                  disabled={!formData.state} // Viloyat tanlanmasa o'chirilgan
                              >
                                <option value="" disabled>
                                  {t('sidebar.cityPlaceholder')}
                                </option>
                                  {filteredCityData && filteredCityData.length === 0 && formData.state ? (
                                      <option disabled>{t('table.loading')}</option>
                                  ) : (
                                      filteredCityData.map((city: City, index) => (
                                          <option
                                              key={index}
                                              value={city.iso2}
                                          >
                                              {city.name}
                                          </option>
                                      ))
                                  )}
                              </select>
                            </span>
                          </span>
                                                    <span className="gi-cart-wrap">
                            <label>{t('sidebar.zipLabel')}</label>
                            <input
                                type="text"
                                name="postalcode"
                                placeholder={t('sidebar.zipPlaceholder')}
                            />
                          </span>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="gi-sb-block-content">
                                            <div className="gi-cart-summary-bottom">
                                                <div className="gi-cart-summary">
                                                    <div>
                                                        <span className="text-left">{t('sidebar.subTotal')}</span>
                                                        <span className="text-right">
                              ${subTotal.toFixed(2)}
                            </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-left">{t('sidebar.deliveryCharges')}</span>
                                                        <span className="text-right">
                              ${vat.toFixed(2)}
                            </span>
                                                    </div>
                                                    <DiscountCoupon
                                                        onDiscountApplied={handleDiscountApplied}
                                                    />
                                                    <div className="gi-cart-coupan-content">
                                                        <form
                                                            className="gi-cart-coupan-form"
                                                            name="gi-cart-coupan-form"
                                                            method="post"
                                                            action="#"
                                                        >
                                                            <input
                                                                className="gi-coupan"
                                                                type="text"
                                                                required
                                                                placeholder={t('sidebar.coupanPlaceholder')}
                                                                name="gi-coupan"
                                                                defaultValue=""
                                                            />
                                                            <button
                                                                className="gi-btn-2"
                                                                type="submit"
                                                                name="subscribe"
                                                            >
                                                                {t('sidebar.applyBtn')}
                                                            </button>
                                                        </form>
                                                    </div>
                                                    <div className="gi-cart-summary-total">
                                                        <span className="text-left">{t('sidebar.totalAmount')}</span>
                                                        <span className="text-right">
                              ${total.toFixed(2)}
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="gi-cart-leftside col-lg-8 col-md-12 m-t-991">
                                {/* */}
                                <div className="gi-cart-content">
                                    <div className="gi-cart-inner">
                                        <div className="row">
                                            <form action="#">
                                                <div className="table-content cart-table-content">
                                                    <table>
                                                        <thead>
                                                        <tr>
                                                            <th>{t('table.productHeader')}</th>
                                                            <th>{t('table.priceHeader')}</th>
                                                            <th style={{ textAlign: "center" }}>
                                                                {t('table.quantityHeader')}
                                                            </th>
                                                            <th>{t('table.totalHeader')}</th>
                                                            <th>{t('table.actionHeader')}</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {cartItems.map((item: any, index: number) => (
                                                            <tr key={index}>
                                                                <td
                                                                    data-label={t('table.productHeader')}
                                                                    className="gi-cart-pro-name"
                                                                >
                                                                    <Link to={`/product-left-sidebar`}>
                                                                        <img
                                                                            className="gi-cart-pro-img mr-4"
                                                                            src={item.image}
                                                                            alt=""
                                                                        />
                                                                        {item.title}
                                                                    </Link>
                                                                </td>
                                                                <td
                                                                    data-label={t('table.priceHeader')}
                                                                    className="gi-cart-pro-price"
                                                                >
                                    <span className="amount">
                                      ${item.newPrice}
                                    </span>
                                                                </td>
                                                                <td
                                                                    data-label={t('table.quantityHeader')}
                                                                    className="gi-cart-pro-qty"
                                                                    style={{ textAlign: "center" }}
                                                                >
                                                                    <div className="cart-qty-plus-minus">
                                                                        <QuantitySelector
                                                                            quantity={item.quantity}
                                                                            id={item.id}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    data-label={t('table.totalHeader')}
                                                                    className="gi-cart-pro-subtotal"
                                                                >
                                                                    ${item.newPrice * item.quantity}
                                                                </td>
                                                                <td
                                                                    onClick={() => handleRemoveFromCart(item)}
                                                                    data-label={t('table.actionHeader')}
                                                                    className="gi-cart-pro-remove"
                                                                >
                                                                    <a>
                                                                        <i className="gicon gi-trash-o"></i>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="gi-cart-update-bottom">
                                                            <Link to={`/`}>{t('actions.continueShopping')}</Link>
                                                            <Link to="/checkout" className="gi-btn-2">
                                                                {t('actions.checkOut')}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* */}
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <section className="gi-new-product padding-tb-40">
                <div className="container">
                    <div className="row overflow-hidden m-b-minus-24px">
                        <div className="gi-new-prod-section col-lg-12">
                            <div className="gi-products">
                                <Fade
                                    triggerOnce
                                    direction="up"
                                    duration={2000}
                                    delay={200}
                                    className="section-title-2"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                    data-aos-delay="200"
                                >
                                    <>
                                        <h2 className="gi-title">
                                            New <span>Arrivals</span>
                                        </h2>
                                        <p>Browse The Collection of Top Products</p>
                                    </>
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
             spaceBetween: 25,
             },
             426: {
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
             </div>
             </div>
             </div>
            </section>
        </>
    );
};

export default Cart;
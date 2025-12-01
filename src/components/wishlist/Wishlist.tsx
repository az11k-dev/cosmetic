// Wishlist.tsx

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ItemCard from "../product-item/ItemCard";
import { Fade } from "react-awesome-reveal";
import { Col, Row } from "react-bootstrap";
import Spinner from "../button/Spinner";
import { useSliceData } from "@/hooks/useSliceData";
import { Item } from "@/types/data.types";
import { showSuccessToast } from "@/utility/toast";

// Импортируем useTranslation и Trans для локализации
import { useTranslation, Trans } from "react-i18next";

// 💡 Context hooklari importi
import { useWishlist } from "@/context/WishlistContext.tsx";
import { useCart } from "@/context/CartContext.tsx";

const Wishlist = () => {
    // Получаем функцию t (translate)
    const { t } = useTranslation("wishlist");

    // 💡 CONTEXTDAN OLINADI
    const { wishlistItems, removeWishlistItem } = useWishlist();
    const { addItemToCart } = useCart();

    const [currentDate, setCurrentDate] = useState(
        // Здесь можно использовать t('date_format') для форматирования даты,
        // но оставим toLocaleDateString("en-GB") для примера
        new Date().toLocaleDateString("en-GB")
    );

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString("en-GB"));
    }, []);

    // Redux dispatch o'rniga Context funksiyasi
    const handleRemoveFromwishlist = (id: string | number) => {
        removeWishlistItem(id);
        // Используем переведенное сообщение
        showSuccessToast(t("toast_remove_wishlist"));
    };

    // Savatga qo'shish (Redux o'rniga Context funksiyasi)
    const handleCart = (data: Item) => {
        // Savatga 1 miqdorda qo'shish
        addItemToCart(data, 1);
        // Используем переведенное сообщение
        showSuccessToast(t("toast_add_to_cart"));
    };

    // Mahsulot ma'lumotlarini yuklash (O'zgarishsiz)
    const { data, error } = useSliceData('deal');

    // Переводим сообщения об ошибке/загрузке
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

    return (
        <>
            <section className="gi-faq padding-tb-40 gi-wishlist">
                <div className="container">
                    <div className="section-title-2">
                        <h2 className="gi-title">
                            {/* Перевод главного заголовка с HTML */}
                            <Trans >
                                {t("wishlist_main_title")} <span>{t("wishlist_main_title2")}</span>
                            </Trans>
                        </h2>
                        {/* Перевод подзаголовка */}
                        <p>{t("wishlist_main_subtitle")}</p>
                    </div>
                    {wishlistItems.length === 0 ? (
                        <h4 className="text-center">
                            {/* Перевод сообщения о пустом списке */}
                            {t("wishlist_empty_message")}
                        </h4>
                    ) : (
                        <Row>
                            <Col md={12}>
                                <div className="gi-vendor-dashboard-card">
                                    <div className="gi-vendor-card-header">
                                        {/* Перевод заголовка блока */}
                                        <h5>{t("wishlist_table_title")}</h5>
                                        <div className="gi-header-btn">
                                            <a className="gi-btn-2">
                                                {/* Перевод кнопки */}
                                                {t("wishlist_shop_now")}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="gi-vendor-card-body">
                                        <div className="gi-vendor-card-table">
                                            <table className="table gi-table">
                                                <thead>
                                                <tr>
                                                    {/* Перевод заголовков колонок */}
                                                    <th scope="col">{t("wishlist_col_id")}</th>
                                                    <th scope="col">{t("wishlist_col_image")}</th>
                                                    <th scope="col">{t("wishlist_col_name")}</th>
                                                    <th scope="col">{t("wishlist_col_date")}</th>
                                                    <th scope="col">{t("wishlist_col_price")}</th>
                                                    <th scope="col">{t("wishlist_col_status")}</th>
                                                    <th scope="col">{t("wishlist_col_actions")}</th>
                                                </tr>
                                                </thead>
                                                <tbody className="wish-empt">
                                                {wishlistItems.map((data: Item, index: number) => (
                                                    <tr key={index} className="pro-gl-content">
                                                        <td scope="row">
                                                            <span>{index + 1}</span>
                                                        </td>
                                                        <td>
                                                            <img
                                                                className="prod-img"
                                                                // data.image o'rniga to'g'ri rasm manbasini ko'rsating, masalan data.images[0].file_url
                                                                src={data?.images && data?.images?.length > 0 ? data?.images[0]?.upload?.file_url : ''}
                                                                alt="product image"
                                                            />
                                                        </td>
                                                        <td>
                                                            <span>{data?.name?.uz}</span> {/* data.title o'rniga data.name ishlatiladi */}
                                                        </td>
                                                        <td>
                                                            <span>{currentDate}</span>
                                                        </td>
                                                        <td>
                                                            <span>${data?.price}</span>
                                                        </td>
                                                        <td>
                                                            <span
                                                                className={
                                                                    data?.status === "Available" ? "avl" : "out"
                                                                }
                                                            >
                                                                {/* Переводим статус */}
                                                                {data?.status === "Available"
                                                                    ? t("status_available")
                                                                    : t("status_out_of_stock")
                                                                }
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="tbl-btn">
                                                                <a
                                                                    className="gi-btn-2 add-to-cart"
                                                                    title={t("action_add_to_cart")}
                                                                    onClick={() => handleCart(data)}
                                                                >
                                                                    <i className="fi-rr-shopping-basket"></i>
                                                                </a>
                                                                <a
                                                                    onClick={() =>
                                                                        handleRemoveFromwishlist(data?.id)
                                                                    }
                                                                    className="gi-btn-1 gi-remove-wish btn"
                                                                    title={t("action_remove_from_list")}
                                                                >
                                                                    ×
                                                                </a>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}
                </div>
            </section>

            {/* Секция New Arrivals */}
            <section className="gi-new-product padding-tb-40">
                <div className="container">
                    <Row className="overflow-hidden m-b-minus-24px">
                        <Col lg={12} className="gi-new-prod-section">


                            <div className="gi-products">
                                <div
                                    triggerOnce
                                    direction="up"
                                    duration={2000}
                                    delay={200}
                                    className="section-title-2">
                                    <h2 className="gi-title">
                                            {t("new_arrivals_title")} <span>{t("new_arrivals_title2")}</span>
                                    </h2>
                                    <p>{t("new_arrivals_subtitle")}</p>
                                </div>
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
                                        className="deal-slick-carousel gi-product-slider">
                                        {data?.map((item: any, index: number) => (
                                            <div key={index}>
                                                <ItemCard data={item}/>
                                            </div>
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

export default Wishlist;
import { Swiper, SwiperSlide } from "swiper/react";
import StarRating from "../stars/StarRating";
import ProductTab from "./product-tab/ProductTab";
import { Col } from "react-bootstrap";
import SingleProductContent from "./single-product-content/SingleProductContent";
import Spinner from "../button/Spinner";
import { useSliceData } from "@/hooks/useSliceData";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {addItem, setItems, updateItemQuantity} from "@/store/reducers/cartSlice.ts";
import {Item} from "@/types/data.types.ts";
import {showSuccessToast} from "@/utility/toast.ts";
import {addWishlist, removeWishlist} from "@/store/reducers/wishlistSlice.ts";
import {addCompare, removeCompareItem} from "@/store/reducers/compareSlice.ts";
const ProductPage = ({
                         order = "",
                         none = "none",
                         lg = 12,
                     }) => {



    const { data, error } = useSliceData('moreitems');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const compareItems = useSelector((state: RootState) => state.compare.compare);
    const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlist);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const products = [
        {
            "rating": 3,
            "title": "Honey Spiced Nuts",
            "image": "/assets/img/product-images/8_1.jpg",
            "oldPrice": 55,
            "newPrice": 32
        },
        {
            "rating": 5,
            "title": "Dates Value Pouch",
            "image": "/assets/img/product-images/2_1.jpg",
            "oldPrice": 60,
            "newPrice": 56
        },
        {
            "rating": 2,
            "title": "Graps Mix Snack",
            "image": "/assets/img/product-images/5_1.jpg",
            "oldPrice": 35,
            "newPrice": 28
        },
        {
            "rating": 5,
            "title": "Roasted Almonds Pack",
            "image": "/assets/img/product-images/9_1.jpg",
            "oldPrice": 23,
            "newPrice": 16
        }
    ]


    useEffect(() => {
        const itemsFromLocalStorage =
            typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("products") || "[]")
                : [];
        if (itemsFromLocalStorage.length) {
            dispatch(setItems(itemsFromLocalStorage));
        }
    }, [dispatch]);
    const handleCart = useCallback((data: Item) => {
        const isItemInCart = cartItems.some((item: Item) => item.id === data.id);

        if (!isItemInCart) {
            dispatch(addItem({ ...data, quantity: 1 }));
            showSuccessToast("Add product in Cart Successfully!");
        } else {
            const updatedCartItems = cartItems.map((item: Item) =>
                item.id === data.id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                        price: item.newPrice + data.newPrice,
                    } // Increment quantity and update price
                    : item
            );
            dispatch(updateItemQuantity(updatedCartItems));
            showSuccessToast("Add product in Cart Successfully!");
        }
    }, [cartItems, dispatch]);
    const isInWishlist = useMemo(() =>
            wishlistItems.some((item: Item) => item.id === data.id),
        [wishlistItems, data.id]
    );

    const handleWishlist = useCallback((data: Item) => {
        if (!isInWishlist) {
            dispatch(addWishlist(data));
            showSuccessToast("Add product in Wishlist Successfully!", {
                icon: false,
            });
        } else {
            dispatch(removeWishlist(data.id));
            showSuccessToast("Remove product on Wishlist Successfully!", {
                icon: false,
            });
        }
    }, [isInWishlist, dispatch]);

    const isInCompare = useMemo(() =>
            compareItems.some((item: Item) => item.id === data.id),
        [compareItems, data.id]
    );


    const handleCompareItem = useCallback((data: Item) => {
        if (!isInCompare) {
            dispatch(addCompare(data));
            showSuccessToast(`Add product in Compare list Successfully!`, {
                icon: false,
            });
        } else {
            dispatch(removeCompareItem(data.id));
            showSuccessToast("Remove product on Compare list Successfully!", {
                icon: false,
            });
        }
    }, [isInCompare, dispatch]);

    const handleClose = useCallback(() => setShow(false), []);
    const handleShow = useCallback(() => setShow(true), []);

    if (error) return <div>Failed to load products</div>;
    if (!data)
        return (
            <div>
                <Spinner />
            </div>
        );



    return (
        <>
            <Col lg={lg} md={12} className={`gi-pro-rightside gi-common-rightside ${order}`  }>
                {/* <!-- Single product content Start --> */}
                <div className="single-pro-block"  >
                    <SingleProductContent data={products} handleClose={handleClose} show={show} />

                </div>
                {/* <!--Single product content End -->
                    <!-- Add More and get discount content Start --> */}
                <div className="single-add-more m-tb-40" >
                    <Swiper
                        loop={true}
                        autoplay={{ delay: 1000 }}
                        slidesPerView={3}
                        spaceBetween={20}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            425: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1025: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                        }}
                        style={{ overflow: "hidden" }}
                        className="gi-add-more-slider owl-carousel"
                    >
                        {data && data.length > 0 ? data.map((data: any, index: number) => (
                            <SwiperSlide key={index} className="add-more-item">
                                <a href="" className="gi-btn-2">
                                    +
                                </a>
                                <div className="add-more-img">
                                    <img src={data.image} alt="product" />
                                </div>
                                <div className="add-more-info">
                                    <h5>{data.title}</h5>
                                    <span className="gi-pro-rating">
                    <StarRating rating={data.rating} />
                  </span>
                                    <span className="gi-price">
                    <span className="new-price">${data.newPrice}</span>
                    <span className="old-price">${data.oldPrice}</span>
                  </span>
                                </div>
                            </SwiperSlide>
                        )): <></>}
                    </Swiper>
                </div>

                {/* <!-- Single product tab start --> */}
                <ProductTab />
                {/* <!-- product details description area end --> */}
            </Col>


        </>
    );
};

export default ProductPage;

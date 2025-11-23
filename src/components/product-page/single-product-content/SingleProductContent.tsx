// src/components/product-page/single-product-content/SingleProductContent.tsx

import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import QuantitySelector from "../../quantity-selector/QuantitySelector";
import {Link} from "react-router-dom";
import StarRating from "@/components/stars/StarRating.tsx";
import SizeOptions from "@/components/product-item/SizeOptions.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {Item} from "@/types/data.types.ts";
import {addItem, updateItemQuantity} from "@/store/reducers/cartSlice.ts";
import {showSuccessToast} from "@/utility/toast.ts";
import ZoomImage from "@/components/zoom-image/ZoomImage.tsx";
import {Fade} from "react-awesome-reveal";
import Modal from "react-bootstrap/Modal";

// 💡 Props uchun TypeScript interfeys
interface SingleProductContentProps {
    show: boolean;
    handleClose: () => void;
    data: Item; // Item tipi aniq kiritildi
}

const SingleProductContent: React.FC<SingleProductContentProps> = ({show, handleClose, data}) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const handleCart = (data: Item) => {
        // ... (Savatcha mantiqi qoladi)
        const isItemInCart = cartItems.some((item: Item) => item.id === data.id);

        if (!isItemInCart) {
            dispatch(addItem({ ...data, quantity: quantity }));
            showSuccessToast("Add product in Cart Successfully!", {
                icon: false,
            });
        } else {
            const updatedCartItems = cartItems.map((item: Item) =>
                item.id === data.id
                    ? {
                        ...item,
                        quantity: item.quantity + quantity,
                        price: item.newPrice + data.newPrice,
                    }
                    : item
            );
            dispatch(updateItemQuantity(updatedCartItems));
            showSuccessToast("Add product in Cart Successfully!", {
                icon: false,
            });
        }
    };

    // 💡 Agar data obyekti mavjud bo'lmasa, Render qilishdan oldin chiqib ketish
    if (!data) return <div>Mahsulot tafsilotlari yuklanmoqda...</div>;

    return (

        <Fade>
            <Modal
                // ... (Modal mantiqi)
            >
            </Modal>
            <div className="modal-dialog-centered" role="document">
                <div className="modal-content">
                    {/* ... (Modal.Body ichida data ma'lumotlaridan foydalanish) */}
                    <Modal.Body>
                        <Row>
                            <Col   className=" mb-767">
                                <div className="single-pro-img single-pro-img-no-sidebar">
                                    <div className="single-product-scroll">
                                        <div className={`single-slide zoom-image-hover`}>
                                            <>
                                                <ZoomImage src={data.image} alt="" /> {/* data.image ishlatildi */}
                                            </>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col className="single-pro-desc m-t-991">
                                <div className="single-pro-content">
                                    <h5 className="gi-quick-title">
                                        <Link to="/product-left-sidebar">{data.title}</Link> {/* data.title ishlatildi */}
                                    </h5>
                                    <div className="gi-single-rating-wrap">
                                        <div className="gi-single-rating">
                                            <StarRating rating={data.rating} /> {/* data.rating ishlatildi */}
                                        </div>
                                        {/* ... */}
                                    </div>

                                    <div className="gi-single-price-stoke">
                                        <div className="gi-single-price">
                                            <div className="final-price">
                                         <span className="new-price">
                        ${data.newPrice * quantity} {/* data.newPrice ishlatildi */}
                      </span>
                                            </div>
                                            {/* ... */}
                                        </div>
                                        {/* ... */}
                                    </div>
                                    {/* ... (boshqa data fieldlari ham shu tartibda ishlatiladi) */}
                                </div>
                            </Col>
                        </Row>
                    </Modal.Body>
                </div>


            </div>
        </Fade>
    );
};

export default SingleProductContent;
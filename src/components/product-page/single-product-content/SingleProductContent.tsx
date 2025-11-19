import {   useState } from "react";
import { Col, Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import QuantitySelector from "../../quantity-selector/QuantitySelector";
// import {Link} from "react-router-dom";
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

const SingleProductContent = ({show, handleClose, data}:(any)) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);


    const handleCart = (data: Item) => {
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
                        quantity1: item.quantity + quantity,
                        price1: item.newPrice + data.newPrice,
                    } // Increment quantity and update price
                    : item
            );
            dispatch(updateItemQuantity(updatedCartItems));
            showSuccessToast("Add product in Cart Successfully!", {
                icon: false,
            });
        }
    };





    return (

        <Fade>
            <Modal
                centered
                show={show}
                onHide={handleClose}
                keyboard={false}
                className="modal fade quickview-modal"
                id="gi_quickview_modal"
                tabIndex="-1"
                role="dialog">

            </Modal>
            <div className="modal-dialog-centered" role="document">
                <div className="modal-content">
                    <button
                        type="button"
                        className="btn-close qty_close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handleClose}
                    ></button>
                    <Modal.Body>
                        <Row>
                            <Col   className=" mb-767">
                                <div className="single-pro-img single-pro-img-no-sidebar">
                                    <div className="single-product-scroll">
                                        <div className={`single-slide zoom-image-hover`}>
                                            <>
                                                <ZoomImage src={data.image} alt="" />
                                            </>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col className="single-pro-desc m-t-991">
                                <div className="single-pro-content">
                                    <h5 className="gi-pro-title"   >
                                        {data[0].title}
                                    </h5>
                                    <div className="gi-single-rating-wrap">
                                        <div className="gi-single-rating">
                                            <StarRating rating={data.rating} />
                                        </div>
                                        <span className="gi-read-review">
                  |&nbsp;&nbsp;<a href="#gi-spt-nav-review">992 Ratings</a>
                </span>
                                    </div>

                                    <div className="gi-single-price-stoke">
                                        <div className="gi-single-price">
                                            <div className="final-price">
                                         <span className="new-price">
                        ${data.newPrice1 * data.quantity1}
                      </span>
                                            </div>
                                            <div className="mrp">
                                                M.R.P. : <span>$2,999.00</span>
                                            </div>
                                        </div>
                                        <div className="gi-single-stoke">
                                            <span className="gi-single-sku">SKU#: WH12</span>
                                            <span className="gi-single-ps-title">IN STOCK</span>
                                        </div>
                                    </div>
                                    <div className="gi-single-desc">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                        industry. Lorem Ipsum has been the industry s standard dummy
                                        text ever since the 1990.
                                    </div>

                                    <div className="gi-single-list">
                                        <ul>
                                            <li>
                                                <strong>Closure :</strong> Hook & Loop
                                            </li>
                                            <li>
                                                <strong>Sole :</strong> Polyvinyl Chloride
                                            </li>
                                            <li>
                                                <strong>Width :</strong> Medium
                                            </li>
                                            <li>
                                                <strong>Outer Material :</strong> A-Grade Standard Quality
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="gi-pro-variation">
                                        <div className="gi-pro-variation-inner gi-pro-variation-size">
                                            <span>Weight</span>
                                            <div className="gi-pro-variation">
                                                <div className="gi-pro-variation-inner gi-pro-variation-size gi-pro-size">
                                                    <div className="gi-pro-variation-content">
                                                        <SizeOptions
                                                            categories={[
                                                                "vegetables",
                                                            ]}
                                                            subCategory={data.category1}
                                                        />
                                                        {/* <ul className="gi-opt-size">
                            {options.map((data: any, index) => (
                              <li key={index} onClick={() => handleClick(index)} className={activeIndex === index ? "active" : ""}>
                                <a className="gi-opt-sz" data-tooltip={data.tooltip}>
                                  {data.value}
                                </a>
                              </li>
                            ))}
                          </ul> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="gi-single-qty">
                                        <div className="qty-plus-minus ">
                                            <QuantitySelector setQuantity={setQuantity} quantity={quantity} id={data.id1} />
                                        </div>
                                        <div className="gi-quickview-cart ">
                                            <button
                                                onClick={() => handleCart(data)}
                                                className="gi-btn-1"
                                            >
                                                <i className="fi-rr-shopping-basket"></i> Add To Cart
                                            </button>
                                        </div>
                                        <div className="gi-single-wishlist">
                                            <a className="gi-btn-group wishlist" title="Wishlist">
                                                <i className="fi-rr-heart"></i>
                                            </a>
                                        </div>
                                        <div className="gi-single-quickview">
                                            <a
                                                className="gi-btn-group quickview"
                                                data-link-action="quickview"
                                                title="Quick view"
                                                data-bs-toggle="modal"
                                                data-bs-target="#gi_quickview_modal"
                                            >
                                                <i className="fi-rr-eye"></i>
                                            </a>
                                        </div>
                                    </div>
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

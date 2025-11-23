// src/pages/ProductDetailsPage.tsx (Bu yangi komponent bo'lishi kerak)

import React, {useState} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Item } from "@/types/data.types.ts";

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";


const ProductDetailsPage: React.FC = () => {
    // 1. useLocation yordamida uzatilgan state (ma'lumot) ni olamiz
    const location = useLocation();
    const { id } = useParams<{ id: string }>(); // URL dan ID ham olinadi
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    // 2. Ma'lumotni location.state dan ajratib olamiz
    const productData = location.state?.productData as Item | undefined;




    // const handleCart = (productData: Item) => {
    //     const isItemInCart = cartItems.some((item: Item) => item.id === productData.id);
    //
    //     if (!isItemInCart) {
    //         dispatch(addItem({ ...productData, quantity: quantity }));
    //         showSuccessToast("Add product in Cart Successfully!", {
    //             icon: false,
    //         });
    //     } else {
    //         const updatedCartItems = cartItems.map((item: Item) =>
    //             item.id === productData.id
    //                 ? {
    //                     ...item,
    //                     quantity1: item.quantity + quantity,
    //                     price1: item.newPrice + productData.newPrice,
    //                 } // Increment quantity and update price
    //                 : item
    //         );
    //         dispatch(updateItemQuantity(updatedCartItems));
    //         showSuccessToast("Add product in Cart Successfully!", {
    //             icon: false,
    //         });
    //     }
    // };
    // 3. Agar ma'lumot state orqali uzatilmagan bo'lsa (masalan, URL to'g'ridan-to'g'ri kiritilgan bo'lsa),
    // ID orqali serverdan yuklash mantiqini qo'shish tavsiya etiladi.
    if (!productData) {
        return <div>Mahsulot ID {id} bo'yicha ma'lumot yuklanmoqda... (yoki xato)</div>;
    }

    // 4. Endi barcha ma'lumotlardan foydalanishimiz mumkin:
    return (
        <div style={{ padding: '20px' }}>
            <h1>{productData.title}</h1>
            <p>ID: {productData.id}</p>
            <img src={productData.image} alt={productData.title} style={{ width: '200px' }} />
            <p>Narxi: ${productData.newPrice}</p>
            <p>Kategoriya: {productData.category}</p>
            {/* Va hokazo... */}
            <hr/>
            <h3>💡 Eslatma: Barcha ma'lumotlar (data) uzatildi!</h3>
        </div>
        // <div>
        //     <Fade>
        //         <Modal
        //             centered
        //             show={show}
        //             onHide={handleClose}
        //             keyboard={false}
        //             className="modal fade quickview-modal"
        //             id="gi_quickview_modal"
        //             tabIndex="-1"
        //             role="dialog">
        //
        //         </Modal>
        //         <div className="modal-dialog-centered" role="document">
        //             <div className="modal-content">
        //                 <button
        //                     type="button"
        //                     className="btn-close qty_close"
        //                     data-bs-dismiss="modal"
        //                     aria-label="Close"
        //                     onClick={handleClose}
        //                 ></button>
        //                 <Modal.Body>
        //                     <Row>
        //                         <Col   className=" mb-767">
        //                             <div className="single-pro-img single-pro-img-no-sidebar">
        //                                 <div className="single-product-scroll">
        //                                     <div className={`single-slide zoom-image-hover`}>
        //                                         <>
        //                                             <ZoomImage src={productData.image} alt="" />
        //                                         </>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </Col>
        //                         <Col className="single-pro-desc m-t-991">
        //                             <div className="single-pro-content">
        //                                 <h5 className="gi-pro-title"   >
        //                                     {productData.title}
        //                                 </h5>
        //                                 <div className="gi-single-rating-wrap">
        //                                     <div className="gi-single-rating">
        //                                         <StarRating rating={productData.rating} />
        //                                     </div>
        //                                     <span className="gi-read-review">
        //           |&nbsp;&nbsp;<a href="#gi-spt-nav-review">992 Ratings</a>
        //         </span>
        //                                 </div>
        //
        //                                 <div className="gi-single-price-stoke">
        //                                     <div className="gi-single-price">
        //                                         <div className="final-price">
        //                                  <span className="new-price">
        //                 ${productData.newPrice * productData.quantity}
        //               </span>
        //                                         </div>
        //                                         <div className="mrp">
        //                                             M.R.P. : <span>$2,999.00</span>
        //                                         </div>
        //                                     </div>
        //                                     <div className="gi-single-stoke">
        //                                         <span className="gi-single-sku">SKU#: WH12</span>
        //                                         <span className="gi-single-ps-title">IN STOCK</span>
        //                                     </div>
        //                                 </div>
        //                                 <div className="gi-single-desc">
        //                                     Lorem Ipsum is simply dummy text of the printing and typesetting
        //                                     industry. Lorem Ipsum has been the industry s standard dummy
        //                                     text ever since the 1990.
        //                                 </div>
        //
        //                                 <div className="gi-single-list">
        //                                     <ul>
        //                                         <li>
        //                                             <strong>Closure :</strong> Hook & Loop
        //                                         </li>
        //                                         <li>
        //                                             <strong>Sole :</strong> Polyvinyl Chloride
        //                                         </li>
        //                                         <li>
        //                                             <strong>Width :</strong> Medium
        //                                         </li>
        //                                         <li>
        //                                             <strong>Outer Material :</strong> A-Grade Standard Quality
        //                                         </li>
        //                                     </ul>
        //                                 </div>
        //
        //                                 <div className="gi-pro-variation">
        //                                     <div className="gi-pro-variation-inner gi-pro-variation-size">
        //                                         <span>Weight</span>
        //                                         <div className="gi-pro-variation">
        //                                             <div className="gi-pro-variation-inner gi-pro-variation-size gi-pro-size">
        //                                                 <div className="gi-pro-variation-content">
        //                                                     <SizeOptions
        //                                                         categories={[
        //                                                             "vegetables",
        //                                                         ]}
        //                                                         subCategory={productData.category}
        //                                                     />
        //                                                     {/* <ul className="gi-opt-size">
        //                     {options.map((data: any, index) => (
        //                       <li key={index} onClick={() => handleClick(index)} className={activeIndex === index ? "active" : ""}>
        //                         <a className="gi-opt-sz" data-tooltip={data.tooltip}>
        //                           {data.value}
        //                         </a>
        //                       </li>
        //                     ))}
        //                   </ul> */}
        //                                                 </div>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                                 <div className="gi-single-qty">
        //                                     <div className="qty-plus-minus ">
        //                                         <QuantitySelector setQuantity={setQuantity} quantity={quantity} id={productData.id} />
        //                                     </div>
        //                                     <div className="gi-quickview-cart ">
        //                                         <button
        //                                             onClick={() => handleCart(productData)}
        //                                             className="gi-btn-1"
        //                                         >
        //                                             <i className="fi-rr-shopping-basket"></i> Add To Cart
        //                                         </button>
        //                                     </div>
        //                                     <div className="gi-single-wishlist">
        //                                         <a className="gi-btn-group wishlist" title="Wishlist">
        //                                             <i className="fi-rr-heart"></i>
        //                                         </a>
        //                                     </div>
        //                                     <div className="gi-single-quickview">
        //                                         <a
        //                                             className="gi-btn-group quickview"
        //                                             data-link-action="quickview"
        //                                             title="Quick view"
        //                                             data-bs-toggle="modal"
        //                                             data-bs-target="#gi_quickview_modal"
        //                                         >
        //                                             <i className="fi-rr-eye"></i>
        //                                         </a>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </Col>
        //                     </Row>
        //
        //                 </Modal.Body>
        //             </div>
        //         </div>
        //     </Fade>
        //
        // </div>
    );
};

export default ProductDetailsPage;
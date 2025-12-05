import {useDispatch, useSelector} from "react-redux";
import {addItem, updateItemQuantity} from "../../../store/reducers/cartSlice";
import {showSuccessToast} from "@/utility/toast";
import {RootState} from "@/store";
import {Item} from "@/types/data.types";
import {Link} from "react-router-dom";

const TrendingItem = ({data}: { data: Item }) => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const handleCart = (data: Item) => {
        const isItemInCart = cartItems.some((item: Item) => item.id === data.id);

        if (!isItemInCart) {
            dispatch(addItem({...data, quantity: 1}));
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
    };

    return (
        <>
            <div className="col-sm-12 gi-all-product-block">
                <div className="gi-all-product-inner">
                    <div className="gi-pro-image-outer">
                        <div className="gi-pro-image">
                            <Link to={`/product-details/${data.id}`} className="image">
                                <img className="main-image" src={data.image} alt="Product"/>
                            </Link>
                        </div>
                    </div>
                    <div className="gi-pro-content">
                        <h5 className="gi-pro-title">
                            <Link to={`/product-details/${data.id}`}>{data.title}</Link>
                        </h5>
                        <div className="gi-pro-rat-price">
                            <div className="gi-pro-rat-pri-inner">
                <span className="gi-price">
                  <span className="new-price">{data.newPrice.toLocaleString("en-US")} so'm</span>
                  <span className="old-price">{data.oldPrice.toLocaleString("en-US")} so'm</span>
                  <span className="qty">- {data.waight}</span>
                </span>
                            </div>
                        </div>
                        <a
                            className="add-to-cart"
                            title="Add To Cart"
                            onClick={() => handleCart(data)}
                        >
                            <i className="fi-rr-shopping-basket"></i>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TrendingItem;

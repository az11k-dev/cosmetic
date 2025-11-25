import HeaderManu from "./header/HeaderManu";
import HeaderOne from "./header/HeaderOne";
import HeaderTwo from "./header/HeaderTwo";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.wishlist
  );
  return (
    <>
      {/* <Loader /> */}

      <header className="gi-header">
        <HeaderOne  />
        <HeaderTwo />
        <HeaderManu />
      </header>
    </>
  );
}

export default Header;

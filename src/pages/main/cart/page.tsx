import Cart from '@/components/cart/Cart'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
const lang = localStorage.getItem("i18nextLng");
const page = () => {
  return (
    <>
      <Breadcrumb title={lang ==="ru"?"Корзинка":"Savat"} />
      <Cart />
    </>
  )
}

export default page

import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import OrderPage from '@/components/order-page/Orders'

const lang = localStorage.getItem("i18nextLng")

const page = () => {
    return (
        <>


            <Breadcrumb title={lang === "ru" ? "Мои заказы" : "Buyurtamalarim"} />
            <OrderPage />

        </>
    )
}

export default page

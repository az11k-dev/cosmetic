import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import Wishlist from '@/components/wishlist/Wishlist'
const lang = localStorage.getItem("i18nextLng");


const page = () => {
    return (
        <>
            <Breadcrumb title={lang==="ru"?"":""} />
            <Wishlist />
        </>
    )
}

export default page

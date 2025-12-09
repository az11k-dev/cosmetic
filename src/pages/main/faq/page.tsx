import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import Faq from '@/components/faq/Faq'

const lang =localStorage.getItem("i18nextLng`");



const page = () => {
    return (
        <>
            <Breadcrumb title={lang==="ru" ?"Страница помощи":"Yordam sahifasi"} />
            <Faq />
        </>
    )
}

export default page

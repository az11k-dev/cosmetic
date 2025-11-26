import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import Contact from '@/components/contact-us/Contact'

const lang = localStorage.getItem("i18nextLng");

const page = () => {
    return (
        <>
            <Breadcrumb title={lang ===
            "ru" ? "Связаться с нами" : "Biz bilan bog'lanish"}/>
            <Contact/>
        </>
    )
}

export default page

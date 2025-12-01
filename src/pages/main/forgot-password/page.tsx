import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import ForgotPassword from '@/components/password/ForgotPassword'


const lang = localStorage.getItem("i18nextLng");
const page = () => {
    return (
        <>


            <Breadcrumb title={lang==="ru"?"Восстановление Пароля":"Parolni tiklash"} />
            <ForgotPassword />

        </>
    )
}

export default page

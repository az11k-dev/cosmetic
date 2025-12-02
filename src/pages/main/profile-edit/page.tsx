import RagisterEditPage from '@/components/profile-Edit/ProfileEdit'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
const lang = localStorage.getItem("i18nextLng");
const page = () => {
    return (
        <>


            <Breadcrumb title={lang==="ru"?"Редактировать  Профиля":"Profilni Tahrirlash"} />
            <RagisterEditPage />

        </>
    )
}

export default page

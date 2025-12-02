import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import About from '@/components/about-us/About'
import Service from '@/components/about-us/Service'
import Facts from '@/components/about-us/Facts'

const lang = localStorage.getItem("i18nextLng");


const Page = () => {
    return (
        <>
            <Breadcrumb title={lang ===
            "ru" ? "О нас" : "Biz haqimizda"}/>
            <About/>
            <Facts/>
            <Service/>
            {/*<Team/>*/}
        </>
    )
}

export default Page;

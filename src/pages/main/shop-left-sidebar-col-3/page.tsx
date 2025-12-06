import Shop from '@/components/shop-sidebar/Shop';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import CategorySliderOne from '@/components/category/CategorySliderOne';
import CategorySliderTwo from "@/components/category/CategorySliderTwo.tsx";
import CategoryFilter from "@/components/category/CategoryFilter.tsx";

const page = () => {
    const lang = localStorage.getItem("i18nextLng");
    return (
        <>


            <Breadcrumb title={lang === "ru" ? "Страница магазина" : "Do'kon sahifasi"}/>
            <section className="gi-shop">
                <div className="container">
                    <CategorySliderOne/>
                    {/*<Shop*/}
                    {/*  order={"order-lg-last order-md-first"}*/}
                    {/*  lg={9}*/}
                    {/*  xl={4}*/}
                    {/*/>*/}
                    <CategoryFilter/>
                </div>
            </section>

        </>
    )
}

export default page;

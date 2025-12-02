// src/components/TrendingProduct/TrendingProduct.jsx (или .tsx)

import {Fade} from "react-awesome-reveal";
import {Col} from "react-bootstrap";
import Slider from "react-slick";
import TrendingItem from "../trendingItem/TrendingItem";
import Spinner from "@/components/button/Spinner";
// ❌ Удаляем старый хук useSliceData
// import { useSliceData } from "@/hooks/useSliceData";
// ✅ Импортируем новый хук для API
import {useFetchProducts} from "@/hooks/useFetchProducts";
import {useTranslation} from "react-i18next";

const TrendingProduct = () => {
    const {t} = useTranslation('tredingAll');

    const settings = {
        // ... (settings o'zgarishsiz qoladi) ...
        dots: false,
        infinite: true,
        rows: 3,
        arrows: true,
        autoplay: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {breakpoint: 1200, settings: {slidesToShow: 1, rows: 3}},
            {breakpoint: 1024, settings: {slidesToShow: 1, rows: 3}},
            {breakpoint: 992, settings: {slidesToShow: 1, rows: 3}},
            {breakpoint: 767, settings: {slidesToShow: 1, rows: 2}},
            {breakpoint: 576, settings: {slidesToShow: 1, rows: 2}},
        ],
    };

    // ✅ Используем новый хук для получения данных
    // const { data, error } = useSliceData('trending');
    const {data, error, loading} = useFetchProducts();

    // Обработка состояния загрузки и ошибки
    if (loading)
        return (
            <div>
                <Spinner/>
            </div>
        );

    if (error) return <div>Failed to load products: {error}</div>; // Вывод ошибки

    // Если данных нет после загрузки
    if (!data || data.length === 0) {
        return <div>No products found.</div>;
    }

    // Функция getData больше не нужна, используем 'data' напрямую
    // const getData = () => {
    //   return data;
    // };

    return (
        <Col
            xl={3}
            lg={6}
            md={6}
            sm={12}
            className="col-xs-6 gi-all-product-content gi-new-product-content mt-767-40 wow fadeInUp"
        >
            <Fade triggerOnce direction="up" delay={400}>
                <Col md={12}>
                    <div className="section-title">
                        <div className="section-detail">
                            <h2 className="gi-title">
                                {/* ✅ FAQQAT SHU YER TARJIMAGA O'TKAZILDI */}
                                {t('titles.trendingItemsTitle')}
                            </h2>
                        </div>
                    </div>
                </Col>
                <Slider {...settings} className="gi-trending-slider">
                    {/* ✅ Используем data напрямую */}
                    {data.map((item: any) => (
                        // Убедитесь, что используете уникальный ключ, например, item.id
                        <TrendingItem key={item.id} data={item}/>
                    ))}
                </Slider>
            </Fade>
        </Col>
    );
};

export default TrendingProduct;
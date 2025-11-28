import { Col, Row } from "react-bootstrap";
import { Swiper,  } from "swiper/react";
import "swiper/css";
import ItemCard from "../product-item/ItemCard";
import { Fade } from "react-awesome-reveal";
// import DealendTimer from "../dealend-timer/DealendTimer";
import Spinner from "../button/Spinner";
// import { useSliceData } from "@/hooks/useSliceData";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
// import {display} from "html2canvas/dist/types/css/property-descriptors/display"; // 💡 Tarjima importi

// const data = [
//
//     {
//         name: "prodTitle_1",
//         sale: "Sale",
//         images:  [
//             {
//                 is_main: 1,
//                 file_url: "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg"
//             },
//             {
//                 is_main: 0,
//                 file_url: "https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png"
//             }
//         ],
//         category: "catPerfumes",
//         old_price: 20.00,
//         price: 3.0,
//         location: "Online",
//         brand: "Glamour Glow",
//         sku: 23122,
//         id: 1,
//         quantity: 1,
//         weight: "100ml",
//         rating: 4,
//         status: "Out Of Stock",
//     },
//     {
//         name: "prodTitle_2",
//         sale: "Sale",
//         images:  [
//             {
//                 is_main: 1,
//                 file_url: "https://playcontestofchampions.com/wp-content/uploads/2023/04/champion-iron-man-infinity-war.webp"
//             },
//             {
//                 is_main: 0,
//                 file_url: "https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png"
//             }
//         ],
//         category: "catPerfumes",
//         old_price: 40.00,
//         price: 19.0,
//         location: "Online",
//         brand: "Glamour Glow",
//         sku: 23122,
//         id: 2,
//         quantity: 1,
//         weight: "20ml",
//         rating: 0,
//         status: "Out Of Stock",
//
//     }
//
// ];
const API_URL = "https://admin.beauty-point.uz/api/products";
const lang = localStorage.getItem("i18nextLng");
const Deal = () => {
    const { t } = useTranslation("deal1"); // 💡 'deal' namespace'idan foydalanish
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts=async ()=>{
            try{
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                const apiData = result?.data?.data || [];
                setData(apiData);
                setError(null);}
                catch (e){
                console.error(e,"Failed to fetch categories:");
                setError("Ne udalos' zagruzit' kategorii.");
                }finally {
                setIsLoading(false);
            }

        };
        fetchProducts();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading)
        return (
            <div>
                <Spinner />
            </div>
        );
    // const formattedItem = {
    //     ...item,
    //     name: lang === "ru" ? item?.name?.ru : item?.name?.uz,
    //     num: index + 1,
    // };
    return (
        <>
            <section
                className="gi-deal-section padding-tb-40 wow fadeInUp"
                data-wow-duration="2s"
            >
                <div className="container">
                    <Row className="overflow-hidden m-b-minus-24px">
                        <Col lg={12} className="gi-deal-section col-lg-12">
                            <div className="gi-products">
                                <div
                                    className="section-title"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                    data-aos-delay="200"
                                    style={{display:"flex", justifyContent:"center"}}
                                >
                                    <Fade triggerOnce direction="up" duration={2000} delay={200} >
                                        <div className="section-detail" >
                                                <h2 className="gi-title">
                                                    {t("dealTitle")} <span>{t("dealTitleSpan")}</span>
                                                </h2>
                                            <p>{t("dealTagline")}</p>
                                        </div>
                                    </Fade>
                                    {/*<DealendTimer />*/}
                                </div>
                                <Fade
                                    triggerOnce
                                    direction="up"
                                    duration={2000}
                                    delay={200}
                                    className="gi-deal-block m-minus-lr-12"
                                >
                                    <div className="deal-slick-carousel gi-product-slider slick-initialized slick-slider">
                                        <div className="slick-list draggable">
                                            <Swiper
                                                loop={true}
                                                autoplay={{ delay: 1000 }}
                                                slidesPerView={5}
                                                breakpoints={{
                                                    0: { slidesPerView: 1 }, 320: { slidesPerView: 1 },
                                                    425: { slidesPerView: 2 }, 640: { slidesPerView: 2 },
                                                    768: { slidesPerView: 3 }, 1024: { slidesPerView: 3 },
                                                    1200: { slidesPerView: 5 }, 1440: { slidesPerView: 5 },
                                                }}
                                                className="slick-track"
                                            >
                                                {data?.map((item: any, index: number) => (

                                                    <div key={index}>
                                                        <ItemCard data={item}   />
                                                    </div>
                                                ))}
                                            </Swiper>
                                        </div>
                                    </div>
                                </Fade>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    );
};
export default Deal;
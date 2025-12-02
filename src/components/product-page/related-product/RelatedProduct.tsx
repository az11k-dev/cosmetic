import { Swiper, SwiperSlide } from "swiper/react";
import ItemCard from "../../product-item/ItemCard";
import { Fade } from "react-awesome-reveal";
import Spinner from "@/components/button/Spinner";
import { useSliceData } from "@/hooks/useSliceData";
import {useEffect, useState} from "react";
const API_URL = "https://admin.beauty-point.uz/api/products";
const lang = localStorage.getItem("i18nextLng");
const RelatedProduct = () => {
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



  return (
    <>
      <section className="gi-related-product gi-new-product padding-tb-40">
        <div className="container">
          <div className="row overflow-hidden m-b-minus-24px">
            <div className="gi-new-prod-section col-lg-12">
              <div className="gi-products">
                <Fade
                  triggerOnce
                  direction="up"
                  duration={2000}
                  delay={200}
                  className="section-title-2"
                >
                  <>
                    <h2 className="gi-title">
                        {lang==="ru"?"Сопутствующие ":"Tegishli "} <span> {lang==="ru"?" товары":" mahsulotlar"}</span>
                    </h2>
                    <p> {lang==="ru"?"Просмотрите коллекцию лучших товаров":"Eng yaxshi mahsulotlar to'plamini ko'rib chiqing"}</p>
                  </>
                </Fade>
                <Fade
                  triggerOnce
                  direction="up"
                  duration={2000}
                  delay={300}
                  className="gi-new-block m-minus-lr-12"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  data-aos-delay="300"
                >
                  <Swiper
                    loop={true}
                    autoplay={{ delay: 1000 }}
                    slidesPerView={5}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      320: {
                        slidesPerView: 1,
                      },
                      425: {
                        slidesPerView: 2,
                      },
                      640: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 3,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                      1025: {
                        slidesPerView: 5,
                      },
                    }}
                    className="deal-slick-carousel gi-product-slider"
                  >
                    {data?.map((item: any, index: number) => (
                      <SwiperSlide key={index}>
                        <ItemCard data={item} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RelatedProduct;

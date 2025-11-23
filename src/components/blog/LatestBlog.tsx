import {Swiper, SwiperSlide} from "swiper/react";
import BlogItem from "../product-item/BlogItem";
import {Fade} from "react-awesome-reveal";
import Spinner from "../button/Spinner";
import {useSliceData} from "@/hooks/useSliceData";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const LatestBlog = () => {
    const {data, error} = useSliceData('latestblog');

    const {t} = useTranslation('tredingAll');
    if (error) return <div>Failed to load products</div>;
    if (!data) return (<div><Spinner/></div>);

    const getData = () => {
        return data;
    };
    return (
        <Fade triggerOnce direction="up">
            <section className="gi-blog-section padding-tb-40 wow fadeInUp">
                <div className="container">
                    <div className="row m-b-minus-24px">
                        <div className="section-title">
                            <div className="section-detail">
                                <h2 className="gi-title">
                                    {t('titles.fullBlogTitle')}
                                </h2>
                                <p>{t('titles.latestBlogSubtitle')} </p>
                            </div>
                            <span className="title-link">
               <Link to={`/blog-left-sidebar`}>
                     {t('titles.allBlogsLink')}<i className="fi-rr-angle-double-small-right"></i>
               </Link>
              </span>
                        </div>
                        <Swiper
                            loop={true}
                            autoplay={{delay: 1000}}
                            slidesPerView={4}
                            spaceBetween={25}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                },
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 2,
                                },
                                425: {
                                    slidesPerView: 1,
                                    spaceBetween: 2,
                                },
                                576: {
                                    slidesPerView: 2,
                                    spaceBetween: 200,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 2,
                                },
                                991: {
                                    slidesPerView: 2,
                                    spaceBetween: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 2,
                                },
                                1200: {
                                    slidesPerView: 4,
                                    spaceBetween: 2,
                                },
                                1440: {
                                    slidesPerView: 5,
                                    spaceBetween: 2,
                                },
                            }}
                            className="gi-blog-carousel owl-carousel"
                        >
                            <div className="gi-blog-item">
                                {getData().map((item: any, index: number) => (
                                    <SwiperSlide
                                        key={index}
                                        style={{padding: "0 12px", backgroundColor: "transparent", border: "none"}}
                                        className="blog-info">
                                        <BlogItem data={item}/>
                                    </SwiperSlide>
                                ))}
                            </div>
                        </Swiper>
                    </div>
                </div>
            </section>
        </Fade>
    );
};

export default LatestBlog;

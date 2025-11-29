// Services.tsx
import { Row } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import Spinner from "../button/Spinner";
// import { useSliceData } from "@/hooks/useSliceData"; // Bu sizning custom hook'ingiz
import { useTranslation } from 'react-i18next'; // 👈 i18next ni import qilamiz

// 3.1 qismdagi kalitlar joylashgan faylni import qilamiz
import service from '/src/utility/data/service.ts';

const datas = [
    {
        id: 1,
        icon: "fa-globe",
        nameKey: "name",
        titleKey: "title",
    },
    {
        id: 2,
        icon: "fa-paper-plane",
        nameKey: "name",
        titleKey: "title",
    }
]

const Services = ({children = <></>}: any) => {
    // const { data, error } = useSliceData('service'); // Agar bu serverdan kelmasa, qattiq kodlangan ma'lumotdan foydalanamiz

    // 't' funksiyasini olamiz - u tarjima kalitlarini tarjima qiladi
    const { t } = useTranslation("services");

    // Agar ma'lumotlar serverdan kelmasa, serviceKeys ni ishlatamiz:
    const data = service;
    const error = false; // Xatolarni tekshirishni o'zgartirdim, agar kerak bo'lsa

    // Agar serverdan kelsa, yuqoridagi 3.1-qismdagi kalitlarni serverdan olishingiz kerak

    if (error) return <div>Failed to load products</div>;
    if (!data)
        return (
            <div>
                <Spinner />
            </div>
        );

    const getData = () => {
        return data;
    };

    return (
        <>
            <section className="gi-service-section padding-tb-40">
                <div className="container">
                    {children}
                    <Row className=" m-tb-minus-12">
                        {getData().map((item: any, index: number) => (
                            <Fade
                                triggerOnce
                                direction="up"
                                delay={400}
                                key={index}
                                className="gi-ser-content gi-ser-content-2 col-sm-6 col-md-6 col-lg-3 p-tp-12 wow fadeInUp">
                                <div className="gi-ser-inner" key={index}>
                                    <div className="gi-service-image">
                                        <i className={item.icon}></i>
                                    </div>
                                    <div className="gi-service-desc">
                                        {/* Tarjima kalitini 't' funksiyasi orqali tarjima qilamiz */}
                                        <h3>{t(item.nameKey)}</h3>
                                        <p>{t(item.titleKey)}</p>
                                    </div>
                                </div>
                            </Fade>
                        ))}
                    </Row>
                </div>
            </section>
        </>
    );
};

export default Services;
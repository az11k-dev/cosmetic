// Facts.tsx
import {Col, Row} from "react-bootstrap";
import Spinner from "../button/Spinner";
// import {useSliceData} from "@/hooks/useSliceData"; // Bu hook hozir ishlatilmagan
import {useTranslation} from "react-i18next";

// Data massivini o'zgartirmaymiz, faqat uni ishlatamiz.
const data = [
    {
        id: 1,
        counter: "100K+",
        nameKey: "stats.item1.name",
        descriptionKey: "stats.item1.description",
    },
    {
        id: 2,
        counter: "20K+",
        nameKey: "stats.item2.name",
        descriptionKey: "stats.item2.description",
    },
    {
        id: 3,
        counter: "6+",
        nameKey: "stats.item3.name",
        descriptionKey: "stats.item3.description",
    },
    {
        id: 4,
        counter: "10K+",
        nameKey: "stats.item4.name",
        descriptionKey: "stats.item4.description",
    },
];

const Facts = () => {
    // 🎉 1. useTranslation ni komponentning ichida chaqiramiz
    // 'fact' - bu sizning tarjima namespace'ingiz, masalan: fact.json
    const {t} = useTranslation("facts");

    if (!data)
        return (
            <div>
                <Spinner/>
            </div>
        );

    // getData funksiyasi ma'lumotlarni qaytaradi
    const getData = () => {
        return data;
    };

    return (
        <>
            <section className="gi-facts-section padding-tb-40">
                <div className="container">
                    <Row className="m-tb-minus-12">
                        {getData().map((item: any, index: any) => (
                            <Col
                                sm={12}
                                md={6}
                                lg={3}
                                key={index}
                                className="gi-facts-content p-tp-12"
                            >
                                <div className="gi-facts-inner">
                                    <div className="gi-count">
                                        <span className="counter">{item.counter}</span>
                                    </div>
                                    <div className="gi-facts-desc">
                                        {/* 🎉 2. nameKey va descriptionKey orqali t() funksiyasiga murojaat qilamiz */}
                                        <h4>{t(item.nameKey)}</h4>
                                        <p>{t(item.descriptionKey)}</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>
        </>
    );
};

export default Facts;
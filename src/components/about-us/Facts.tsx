// Facts.tsx

import {Col, Row} from "react-bootstrap";
import Spinner from "../button/Spinner";
import {useSliceData} from "@/hooks/useSliceData";
// Импортируем useTranslation
import {useTranslation} from "react-i18next";

const data = [
    {
        id: 1,
        counter: "100K+",
        name: "Sotuvlar",
        description: "Umumiy sotilgan mahsulotlar soni",
    },
    {
        id: 2,
        counter: "20K+",
        name: "Mijozlar",
        description: "Bizga ishonch bildirgan mijozlar soni",
    },
    {
        id: 3,
        counter: "6+",
        name: "Tajriba",
        description: "Bozorda faoliyat yuritayotgan yillar",
    },
    {
        id: 4,
        counter: "10K+",
        name: "Ijobiy fikrlar",
        description: "Mamnun mijozlar tomonidan qoldirilgan sharhlar",
    },
]

const Facts = () => {
    // Инициализируем t (translate)
    const {t} = useTranslation("facts");

    if (!data)
        return (
            <div>
                <Spinner/>
            </div>
        );

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
                                        {/* Переводим ключ name */}
                                        <h4>{item.name}</h4>
                                        {/* Переводим ключ description */}
                                        <p>{item.description}</p>
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
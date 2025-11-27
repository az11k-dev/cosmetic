// Facts.tsx

import { Col, Row } from "react-bootstrap";
import Spinner from "../button/Spinner";
import { useSliceData } from "@/hooks/useSliceData";
// Импортируем useTranslation
import { useTranslation } from "react-i18next";

const Facts = () => {
    // Инициализируем t (translate)
    const { t } = useTranslation("facts");

    // Здесь предполагается, что data.name и data.discription
    // теперь содержат ключи перевода (например, 'facts_name_1')
    const { data, error } = useSliceData('facts');

    if (error) return <div>{t('error_loading_products')}</div>; // Можно перевести это сообщение
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
                                        <h4>{t(item.name)}</h4>
                                        {/* Переводим ключ discription */}
                                        <p>{t(item.discription)}</p>
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
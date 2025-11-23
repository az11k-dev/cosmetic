import {Col, Row} from "react-bootstrap";
import Questions from "./questions/Questions";
import {useTranslation} from "react-i18next";

const Faq = () => {
    const {t} = useTranslation('faqAll');
    return (
        <>
            <section className="gi-faq padding-tb-40">
                <div className="container">
                    <div className="section-title-2">
                        <h2 className="gi-title">
                            {t('titles.faqTitle')}
                        </h2>
                        <p>  {t('titles.faqSubtitle')}</p>
                    </div>
                    <Row>
                        <Col lg={6}>
                            <Questions keyslice="questions"/>
                        </Col>
                        <Col lg={6} className="m-t-991">
                            <Questions keyslice="questionstwo"/>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    );
};

export default Faq;

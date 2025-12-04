import {Col, Row} from "react-bootstrap";
import {Fade} from "react-awesome-reveal";
import TrendingProduct from "./grocery-item/TrendingProduct";
import TopRatedProduct from "./grocery-item/TopRatedProduct";
import SellingProduct from "./grocery-item/SellingProduct";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next"; // 💡 Kerakli import

const Trending = () => {
    // 'common' nom maydonidan foydalanish
    const {t} = useTranslation('treding');

    return (
        <div>
            <section className="gi-offer-section padding-tb-40">
                <div className={"container"}>
                    <Row style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        // paddingLeft: 160,
                        // paddingRight: 160,
                    }}>
                        <TrendingProduct/>
                        <SellingProduct />
                        <TopRatedProduct/>
                    </Row>
                </div>
            </section>
        </div>
    );
};

export default Trending;
import { Link } from "react-router-dom";
// 💡 useTranslation importi
import { useTranslation } from "react-i18next";

const CategoryItem = ({ data }: any) => {
    // 💡 'categoryNames' namespace'i
    const { t } = useTranslation("categoryNames");

    return (
        <div className="gi-cat-icon">
            <span className="gi-lbl">{data.percentage}</span>
            <i className={data.icon}></i>
            <div className="gi-cat-detail">
                <Link to="/shop-left-sidebar-col-3">
                    <h4 className="gi-cat-title">
                        {/* data.name endi tarjima kaliti bo'ladi */}
                        {t(data.name)}
                    </h4>
                </Link>
                <p className="items">
                    {/* Tovar soni tarjimasi */}
                    {t("itemCount", { count: data.item })}
                </p>
            </div>
        </div>
    );
};

export default CategoryItem;
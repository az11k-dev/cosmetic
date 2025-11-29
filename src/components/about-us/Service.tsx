// Service.tsx

import Services from "../service/Services";
// Импортируем useTranslation и Trans
import {useTranslation, Trans} from "react-i18next";

const Service = () => {
    // Получаем функцию t (translate)
    const {t} = useTranslation("about");

    return (
        <>
            <Services>
                <div className="section-title-2">
                    <h2 className="gi-title">
                        {/* Используем компонент Trans для перевода с HTML (<span>) */}
                        <Trans i18nKey="service_title">
                            {t("service_title")} <span>{t("service_title2")}</span>
                        </Trans>
                    </h2>
                    {/* Используем функцию t() для простого текста */}
                    <p>
                        {t('service_subtitle')}
                    </p>
                </div>
            </Services>
        </>
    );
};

export default Service;
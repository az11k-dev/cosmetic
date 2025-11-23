// src/components/TrackOrder.tsx

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// 💡 i18next'дан useTranslation хукини импорт қиламиз
import { useTranslation } from "react-i18next";

const TrackOrder = () => {
    // 💡 t - таржима функциясини оламиз
        const { t } = useTranslation("trackOrder");

    const login = useSelector(
        (state: RootState) => state.registration.isAuthenticated
    );

    if (!login) {
        // 💡 1. Рўйхатдан ўтиш/Кириш талаб қилинган хабарни таржима қиламиз
        return (
            <div className="container">
                <p>
                    {/* translation.json'да "please" ва "toViewThisPage" калитлари бўлиши керак */}
                    {t('loginRequiredMessage')}
                    <Link to="/login">{t('loginLink')}</Link>
                    {' '} {t('or')} {' '}
                    <Link to="/register">{t('registerLink')}</Link>
                    {t('toViewThisPage')}
                </p>
            </div>
        );
    }
    return (
        <>
            <section className="gi-track padding-tb-40">
                <div className="container">
                    <div className="section-title-2">
                        <h2 className="gi-title">
                            {/* 💡 2. Сарлавҳани таржима қиламиз */}
                            {t('trackOrderTitle')}
                        </h2>
                        {/* 💡 3. Кичик сарлавҳани таржима қиламиз */}
                        <p>{t('trackOrderSubtitle')}</p>
                    </div>
                    <div className="row">
                        <div className="container">
                            <div className="gi-track-box">
                                {/* */}
                                <div className="row">
                                    <div className="col-md-4 m-b-767">
                                        <div className="gi-track-card">
                                            {/* 💡 4. "order" матнини таржима қиламиз */}
                                            <span className="gi-track-title">{t('order')}</span>
                                            <span>#6152</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 m-b-767">
                                        <div className="gi-track-card">
                                            {/* Бренд номи, уни таржима қилиш шарт эмас, лекин калит беришимиз мумкин */}
                                            <span className="gi-track-title">{t('brandName', {defaultValue: 'Grasshoppers'})}</span>
                                            <span>v534hb</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 m-b-767">
                                        <div className="gi-track-card">
                                            {/* 💡 5. "Expected date" матнини таржима қиламиз */}
                                            <span className="gi-track-title">{t('expectedDate')}</span>
                                            <span>June 17, 2019</span>
                                        </div>
                                    </div>
                                </div>
                                {/* */}
                                <div className="gi-steps">
                                    <div className="gi-steps-body">
                                        {/* 💡 6. Трекинг қадамларини таржима қиламиз */}
                                        <div className="gi-step gi-step-completed">
                      <span className="gi-step-indicator">
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </span>
                                            <span className="gi-step-icon">
                        <i className="fi fi-rs-comment-check"></i>
                      </span>
                                            {/* Order confirmed */}
                                            {t('orderConfirmed')}
                                        </div>

                                        <div className="gi-step gi-step-completed">
                      <span className="gi-step-indicator">
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </span>
                                            <span className="gi-step-icon">
                        <i className="fi fi-rs-settings"></i>
                      </span>
                                            {/* Processing order */}
                                            {t('processingOrder')}
                                        </div>
                                        <div className="gi-step gi-step-active">
                      <span className="gi-step-icon">
                        <i className="fi fi-rs-gift"></i>
                      </span>
                                            {/* Quality check */}
                                            {t('qualityCheck')}
                                        </div>
                                        <div className="gi-step">
                      <span className="gi-step-icon">
                        <i className="fi fi-rs-truck-side"></i>
                      </span>
                                            {/* Product dispatched */}
                                            {t('productDispatched')}
                                        </div>
                                        <div className="gi-step">
                      <span className="gi-step-icon">
                        <i className="fi fi-rs-home"></i>
                      </span>
                                            {/* Product delivered */}
                                            {t('productDelivered')}
                                        </div>
                                    </div>
                                    <div className="gi-steps-header">
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: "50%" }}
                                                aria-valuenow={50}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TrackOrder;
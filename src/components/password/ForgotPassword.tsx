// src/components/ForgotPassword.tsx (С локализацией i18n)

import { RootState } from "@/store";
import { useEffect, useRef } from "react";
import { Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as formik from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../breadcrumb/Breadcrumb"; // Добавляем импорт Breadcrumb

// --- i18next ИМПОРТЫ ---
import { useTranslation, Trans } from "react-i18next";
// -----------------------

const ForgotPassword = () => {
    // Инициализируем t
    const { t } = useTranslation("login");

    const { Formik } = formik;
    const formikRef = useRef<any>(null);

    // 📢 Локализация yup-схемы
    const schema = yup.object().shape({
        email: yup
            .string()
            .email(t("yup_email_invalid")) // Используем ключ перевода
            .required(t("yup_email_required")), // Используем ключ перевода
    });

    const initialValues = {
        email: "",
    };

    const navigate = useNavigate();

    // Примечание: Используем Redux, как в оригинальном коде
    const isAuthenticated = useSelector(
        (state: RootState) => state.registration.isAuthenticated
    );

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = () => {
        // Здесь должна быть логика отправки ссылки на сброс пароля
        // После успешной отправки можно показать toast
        // showSuccessToast(t("toast_forgot_success"));
        navigate("/login");
    };

    return (
        <>
            {/* 📢 Локализация Breadcrumb */}


            <section className="gi-login padding-tb-40">
                <Container>
                    <div className="section-title-2">
                        <h2 className="gi-title">
                            {/* 📢 Локализация заголовка */}
                            <Trans i18nKey="forgot_heading">
                                {t("forgot_page_title")} <span></span>
                            </Trans>
                        </h2>
                        {/* 📢 Локализация подзаголовка */}
                        <p>{t("forgot_subtitle")}</p>
                    </div>
                    <div className="gi-login-content">
                        <div className="gi-login-box">
                            <div className="gi-login-wrapper">
                                <div className="gi-login-container">
                                    <div className="gi-login-form">
                                        <Formik
                                            innerRef={formikRef}
                                            validationSchema={schema}
                                            onSubmit={onSubmit}
                                            initialValues={initialValues}
                                        >
                                            {({
                                                  handleSubmit,
                                                  handleChange,
                                                  values,
                                                  errors,
                                              }) => (
                                                <>
                                                    <Form noValidate onSubmit={handleSubmit}>
                            <span className="gi-login-wrap">
                              {/* 📢 Локализация метки */}
                                <label>{t("label_email_address")}</label>
                              <Form.Group>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    // 📢 Локализация плейсхолдера
                                    placeholder={t("placeholder_email")}
                                    required
                                    isInvalid={!!errors.email}
                                />
                                  {errors.email &&
                                      typeof errors.email === "string" && (
                                          <Form.Control.Feedback type="invalid">
                                              {/* Сообщение об ошибке берется из локализованной yup-схемы */}
                                              {errors.email}
                                          </Form.Control.Feedback>
                                      )}
                              </Form.Group>
                            </span>

                                                        <span className="gi-login-wrap gi-login-btn">
                              <button className="gi-btn-1 btn" type="submit">
                                {/* 📢 Локализация кнопки */}
                                  {t("btn_forgot_submit")}
                              </button>
                            </span>
                                                    </Form>
                                                </>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gi-login-box d-n-991">
                            <div className="gi-login-img">
                                <img
                                    src={
                                        "/assets/img/common/login.png"
                                    }
                                    alt="login"
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default ForgotPassword;
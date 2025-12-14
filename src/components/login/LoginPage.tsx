// src/pages/LoginPage.tsx

import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import {Container, Form} from "react-bootstrap";
import {showErrorToast, showSuccessToast} from "@/utility/toast";
import axios from "axios";

// --- i18next ИМПОРТЫ ---
import { useTranslation, Trans } from "react-i18next";
// -----------------------

// 💡 ИМПОРТ ХУКА useAuth
import {useAuth} from "@/context/AuthContext";

const LOGIN_API_URL = "https://admin.beauty-point.uz/api/login";

const LoginPage = () => {
    // Инициализируем t
    const { t } = useTranslation("login");

    const [loginField, setLoginField] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const {isAuthenticated, login} = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(LOGIN_API_URL, {
                login: loginField,
                password: password,
            });

            const {user, token} = response.data.data;

            login(token, user);

            // 📢 Локализация Toast
            showSuccessToast(t("toast_login_success"));
            navigate("/");

        } catch (error) {
            console.error("Login Error:", error);

            const errorResponse = axios.isAxiosError(error) && error.response;
            const apiErrorMessage = errorResponse?.data?.data?.message || errorResponse?.data?.message;

            // 📢 Локализация сообщения об ошибке
            const genericError = t("toast_login_failed_generic");
            const errorMessage = apiErrorMessage || t("toast_login_failed_unexpected");

            // Отображаем сообщение об ошибке, используя локализованный текст
            showErrorToast(`${genericError}: ${errorMessage}`);

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* 📢 Локализация Breadcrumb */}
            <Breadcrumb title={t("login_page_title")}/>
            <section className="gi-login padding-tb-40">
                <Container>
                    <div className="section-title-2">
                        <h2 className="gi-title">
                            {/* 📢 Локализация заголовка */}
                            <Trans i18nKey="login_heading">
                                {t("login_page_title")} <span></span>
                            </Trans>
                        </h2>
                        {/* 📢 Локализация подзаголовка */}
                        <p>{t("login_subtitle")}</p>
                    </div>
                    <div className="gi-login-content">
                        <div className="gi-login-box">
                            <div className="gi-login-wrapper">
                                <div className="gi-login-container">
                                    <div className="gi-login-form">
                                        <Form
                                            noValidate
                                            validated={validated}
                                            onSubmit={handleLogin}
                                            action="#"
                                            method="post"
                                        >
                      <span className="gi-login-wrap">
                          {/* 📢 Локализация метки */}
                          <label>{t("label_login_field")}</label>
                        <Form.Group>
                          <Form.Control
                              type="text"
                              name="login"
                              value={loginField}
                              onChange={(e) => setLoginField(e.target.value)}
                              // 📢 Локализация плейсхолдера
                              placeholder={t("placeholder_login_field")}
                              required
                          />
                          <Form.Control.Feedback type="invalid">
                            {/* 📢 Локализация валидации */}
                              {t("validation_login_field")}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </span>

                                            <span
                                                style={{marginTop: "24px"}}
                                                className="gi-login-wrap"
                                            >
                        {/* 📢 Локализация метки */}
                                                <label>{t("label_password")}</label>
                        <Form.Group>
                          <Form.Control
                              type="password"
                              name="password"
                              min={6}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              // 📢 Локализация плейсхолдера
                              placeholder={t("placeholder_password")}
                              required
                          />
                          <Form.Control.Feedback type="invalid">
                            {/* 📢 Локализация валидации */}
                              {t("validation_password_length")}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </span>

                                            <span className="gi-login-wrap gi-login-fp">
                        <label>
                          <Link to="/forgot-password">
                            {/* 📢 Локализация ссылки */}
                              {t("link_forgot_password")}
                          </Link>
                        </label>
                      </span>
                                            <span className="gi-login-wrap gi-login-btn">
                        <span>
                          <Link to="/register" className="">
                            {/* 📢 Локализация ссылки */}
                              {t("link_create_account")}
                          </Link>
                        </span>
                        <button
                            className="gi-btn-1 btn"
                            type="submit"
                            disabled={loading}
                        >
                          {/* 📢 Локализация кнопки, зависит от состояния */}
                            {loading ? t("btn_logging_in") : t("btn_login")}
                        </button>
                      </span>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gi-login-box d-n-991">
                            <div className="gi-login-img">
                                <img
                                    src={
                                        "https://skyatransdermic.com/cdn/shop/articles/Top_10_Cosmetic_Companies_in_Uganda_1100x.jpg?v=1734583296"
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

export default LoginPage;
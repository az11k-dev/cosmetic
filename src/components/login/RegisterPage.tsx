// RegisterPage.tsx

import {useRef} from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import {Form} from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import {useNavigate, Link} from "react-router-dom";

// --- i18next ИМПОРТЫ ---
import { useTranslation, Trans } from "react-i18next";
// --- Предполагается, что настройка Yup локали выполняется при старте приложения ---


// 💡 ИМПОРТИРУЕМ ХУК useAuth
import {useAuth} from "@/context/AuthContext"; // Предполагая, что он находится по этому пути

const API_URL = "https://admin.beauty-point.uz/api/register";

interface UserData {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    id: number;
}

interface RegisterSuccessResponse {
    status: true;
    data: {
        message: string;
        user: UserData;
        token: string;
    };
}

interface RegisterErrorResponse {
    status: false;
    data: {
        message: string;
        errors?: Record<string, string[]>;
    };
}

const RegisterPage = () => {
    // Инициализируем t
    const { t } = useTranslation("register");

    const {Formik} = formik;
    const formikRef = useRef<any>(null);
    const navigate = useNavigate();

    // 💡 ИСПОЛЬЗУЕМ useAuth ДЛЯ ПОЛУЧЕНИЯ ФУНКЦИИ LOGIN
    const {login} = useAuth(); // Получаем функцию login из контекста

    // 1. Yup Validation Schema (большинство сообщений берется из yup-locale.ts)
    const schema = yup.object().shape({
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        email: yup
            .string()
            .email()
            .required(),
        phone_number: yup
            .string()
            .matches(/^[\d\s()+-]{5,20}$/)
            .required(),
        password: yup
            .string()
            .min(6)
            .required(),
        confirmPassword: yup
            .string()
            .required()
            // oneOf переводим вручную, используя ключ из JSON
            .oneOf([yup.ref("password")], t("yup_passwords_match")),
    });

    // 2. Начальные значения (без изменений)
    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        confirmPassword: "",
    };

    // 3. Обновленная функция отправки (переводим alert-сообщения)
    const registerUser = async (values: typeof initialValues) => {
        const payload = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone_number: values.phone_number,
            password: values.password,
            password_confirmation: values.confirmPassword,
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data: RegisterSuccessResponse | RegisterErrorResponse = await response.json();

            if (response.ok && data.status) {
                // --- ЛОГИКА УСПЕШНОЙ РЕГИСТРАЦИИ ---
                const {user, token} = (data as RegisterSuccessResponse).data;


                login(token, user);
                navigate("/");


            } else {
                const errorData = data as RegisterErrorResponse;
                const errorMessage = errorData.data.message || t("error_register_failed_generic");

                console.error("Registration failed:", errorData);
                alert(`${t("error_register_failed_generic")}: ${errorMessage}`);

                if (errorData.data.errors) {
                    console.error("Validation Errors:", errorData.data.errors);
                }

            }
        } catch (error) {
            console.error("Network or submission error:", error);
            // Используем переведенное сообщение
            alert(t("error_network"));
        }
    };

    const onSubmit = async (values: typeof initialValues) => {
        await registerUser(values);
    };

    return (
        <>
            {/* Предполагается, что Breadcrumb принимает переведенный заголовок */}
            <Breadcrumb title={t("register_page_title")}/>
            <section className="gi-register padding-tb-40">
                <div className="container">
                    <div className="section-title-2">
                        <h2 className="gi-title">
                            {/* Перевод заголовка с Trans */}
                            <Trans i18nKey="register_page_title">
                                {t("register_page_title")}
                            </Trans>
                        </h2>
                        {/* Перевод подзаголовка */}
                        <p>{t("register_page_subtitle")}</p>
                    </div>
                    <div className="row">
                        <div className="gi-register-wrapper">
                            <div className="gi-register-container">
                                <div className="gi-register-form">
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
                                                    {/* First Name */}
                                                    <span className="gi-register-wrap gi-register-half">
                                                        <label htmlFor="first_name">{t("label_first_name")}</label>
                                                        <Form.Group>
                                                          <Form.Control
                                                              type="text"
                                                              name="first_name"
                                                              placeholder={t("placeholder_first_name")}
                                                              value={values.first_name}
                                                              onChange={handleChange}
                                                              isInvalid={!!errors.first_name}
                                                              required
                                                          />
                                                            {errors.first_name &&
                                                                typeof errors.first_name === "string" && (
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errors.first_name}
                                                                    </Form.Control.Feedback>
                                                                )}
                                                        </Form.Group>
                                                  </span>
                                                    {/* Last Name */}
                                                    <span className="gi-register-wrap gi-register-half">
                                                        <label>{t("label_last_name")}</label>
                                                        <Form.Group>
                                                          <Form.Control
                                                              type="text"
                                                              name="last_name"
                                                              placeholder={t("placeholder_last_name")}
                                                              required
                                                              value={values.last_name}
                                                              onChange={handleChange}
                                                              isInvalid={!!errors.last_name}
                                                          />
                                                            {errors.last_name &&
                                                                typeof errors.last_name === "string" && (
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errors.last_name}
                                                                    </Form.Control.Feedback>
                                                                )}
                                                        </Form.Group>
                                                  </span>
                                                    {/* Email */}
                                                    <span
                                                        style={{marginTop: "10px"}}
                                                        className="gi-register-wrap gi-register-half"
                                                    >
                                                        <label>{t("label_email")}</label>
                                                        <Form.Group>
                                                          <Form.Control
                                                              type="email"
                                                              name="email"
                                                              placeholder={t("placeholder_email")}
                                                              required
                                                              value={values.email}
                                                              onChange={handleChange}
                                                              isInvalid={!!errors.email}
                                                          />
                                                            {errors.email &&
                                                                typeof errors.email === "string" && (
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errors.email}
                                                                    </Form.Control.Feedback>
                                                                )}
                                                        </Form.Group>
                                                  </span>
                                                    {/* Phone Number */}
                                                    <span
                                                        style={{marginTop: "10px"}}
                                                        className="gi-register-wrap gi-register-half"
                                                    >
                                                        <label>{t("label_phone_number")}</label>
                                                        <Form.Group>
                                                          <Form.Control
                                                              type="text"
                                                              name="phone_number"
                                                              placeholder={t("placeholder_phone_number")}
                                                              required
                                                              value={values.phone_number}
                                                              onChange={handleChange}
                                                              isInvalid={!!errors.phone_number}
                                                          />
                                                            {errors.phone_number &&
                                                                typeof errors.phone_number === "string" && (
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errors.phone_number}
                                                                    </Form.Control.Feedback>
                                                                )}
                                                        </Form.Group>
                                                  </span>
                                                    {/* Password */}
                                                    <span
                                                        style={{marginTop: "10px"}}
                                                        className="gi-register-wrap gi-register-half"
                                                    >
                                                        <label>{t("label_password")}</label>
                                                        <Form.Group>
                                                          <Form.Control
                                                              type="password"
                                                              name="password"
                                                              placeholder={t("placeholder_password")}
                                                              required
                                                              value={values.password}
                                                              onChange={handleChange}
                                                              isInvalid={!!errors.password}
                                                          />
                                                            {errors.password &&
                                                                typeof errors.password === "string" && (
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errors.password}
                                                                    </Form.Control.Feedback>
                                                                )}
                                                        </Form.Group>
                                                  </span>
                                                    {/* Confirm Password */}
                                                    <span
                                                        style={{marginTop: "10px"}}
                                                        className="gi-register-wrap gi-register-half"
                                                    >
                                                        <label>{t("label_confirm_password")}</label>
                                                        <Form.Group>
                                                          <Form.Control
                                                              type="password"
                                                              name="confirmPassword"
                                                              placeholder={t("placeholder_confirm_password")}
                                                              required
                                                              value={values.confirmPassword}
                                                              onChange={handleChange}
                                                              isInvalid={!!errors.confirmPassword}
                                                          />
                                                            {errors.confirmPassword &&
                                                                typeof errors.confirmPassword === "string" && (
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errors.confirmPassword}
                                                                    </Form.Control.Feedback>
                                                                )}
                                                        </Form.Group>
                                                  </span>

                                                    {/* reCAPTCHA */}
                                                    <span className="gi-register-wrap gi-recaptcha">
                                                        <span
                                                            className="g-recaptcha"
                                                            data-sitekey="6LfKURIUAAAAAO50vlwWZkyK_G2ywqE52NU7YO0S"
                                                            data-callback="verifyRecaptchaCallback"
                                                            data-expired-callback="expiredRecaptchaCallback"
                                                        ></span>
                                                        <input
                                                            className="form-control d-none"
                                                            data-recaptcha="true"
                                                            required
                                                            data-error="Please complete the Captcha"
                                                        />
                                                        <span className="help-block with-errors"></span>
                                                  </span>
                                                    {/* Register Button and Link to Login */}
                                                    <span
                                                        style={{marginTop: "10px"}}
                                                        className="gi-register-wrap gi-register-btn"
                                                    >
                                                        <span>
                                                          {t("already_have_account")}
                                                            <Link to="/login">{t("link_login")}</Link>
                                                        </span>
                                                        <button className="gi-btn-1" type="submit">
                                                          {t("register_btn")}
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
                </div>
            </section>
        </>
    );
};

export default RegisterPage;
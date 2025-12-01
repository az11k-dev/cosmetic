// NewsletterModal.tsx (С локализацией i18n и отправкой в Telegram)

import {useEffect, useState} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {Formik, FormikHelpers} from "formik";
import * as yup from "yup";
import {useTranslation} from "react-i18next";

// Define types for initial values
interface FormValues {
    phone: string;
}

const NewsletterModal = () => {
    // Инициализируем t
    const {t} = useTranslation("newsletter");

    // ⚙️ НАСТРОЙКИ TELEGRAM
    // В реальном проекте эти данные лучше хранить в .env файле
    const TG_BOT_TOKEN = "8231848673:AAGufSiOI32ASRWeRUzOQ-AOKh2sMsUzZVw";
    const TG_CHAT_ID = "7963820017";

    // 📢 Локализация yup-схемы
    const schema = yup.object().shape({
        phone: yup.string().required(t("yup_newsletter_email_required")),
    });

    const initialValues: FormValues = {
        phone: "",
    };

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    // Функция отправки сообщения в Telegram
    const sendMessageToTelegram = async (phone: string) => {
        const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`;

        const text = `📬 *Новая подписка!*\n\n📞 Телефон: ${phone}`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: TG_CHAT_ID,
                    text: text,
                    parse_mode: "Markdown", // Позволяет делать текст жирным
                }),
            });

            if (!response.ok) {
                console.error("Ошибка отправки в Telegram");
            }
        } catch (error) {
            console.error("Ошибка сети:", error);
        }
    };

    const handleSubmit = async (
        values: FormValues,
        formikHelpers: FormikHelpers<FormValues>
    ) => {
        console.log("Subscribed phone:", values.phone);

        // 🚀 Отправляем данные в Telegram
        await sendMessageToTelegram(values.phone);

        // После успешной подписки закрываем модальное окно
        setIsVisible(false);
        formikHelpers.setSubmitting(false);

        // Опционально: Очистить форму
        formikHelpers.resetForm();
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleBackgroundClick = (e: any) => {
        if (e.target.id === "gi-popnews-bg") {
            setIsVisible(false);
        }
    };

    // --- Стили остаются без изменений ---
    const modalBgStyle: any = {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: isVisible ? "block" : "none",
        zIndex: 25,
    };

    const modalBoxStyle: any = {
        width: "90%",
        maxWidth: "600px",
        padding: "24px",
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        color: "#4b5966",
        display: isVisible ? "block" : "none",
        zIndex: 26,
        textAlign: "center",
        boxShadow: "0 0 25px 0 rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
    };

    const modalCloseStyle: any = {
        position: "absolute",
        top: 0,
        right: 0,
        cursor: "pointer",
        width: "30px",
        height: "30px",
        color: "red",
        borderRadius: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        lineHeight: "1",
        opacity: "0.5",
        transition: "all 0.3s ease-in-out",
    };
    // ---------------------------------------------------------

    return (
        <>
            <div
                id="gi-popnews-bg"
                style={modalBgStyle}
                onClick={handleBackgroundClick}
            ></div>
            <div id="gi-popnews-box" style={modalBoxStyle}>
                <div
                    id="gi-popnews-close"
                    style={modalCloseStyle}
                    onClick={handleClose}
                >
                    ×
                </div>
                <div className="row">
                    <div className="col-md-6 disp-no-767">
                        <img
                            src={
                                "https://m.media-amazon.com/images/I/71q57VkRRgS._SL1500_.jpg"
                            }
                            alt="newsletter"
                            style={{width: "100%", borderRadius: "5px"}}
                        />
                    </div>
                    <div className="col-md-6">
                        <div id="gi-popnews-box-content">
                            <h2
                                style={{
                                    fontSize: "22px",
                                    lineHeight: "33px",
                                    fontWeight: "600",
                                    margin: "0 auto 10px",
                                    textTransform: "capitalize",
                                }}
                            >
                                {t("newsletter_title")}.
                            </h2>
                            <p style={{color: "#777"}}>
                                {t("newsletter_subtitle")}.
                            </p>

                            <Formik
                                validationSchema={schema}
                                onSubmit={handleSubmit}
                                initialValues={initialValues}
                            >
                                {({
                                      handleSubmit,
                                      handleChange,
                                      values,
                                      touched,
                                      errors,
                                  }: any) => {
                                    return (
                                        <Form
                                            noValidate
                                            onSubmit={handleSubmit}
                                            id="gi-popnews-form"
                                        >
                                            <Form.Group controlId="validationFormik01">
                                                <InputGroup hasValidation>
                                                    <Form.Control
                                                        type="text"
                                                        name="phone"
                                                        placeholder={t("newsletter_placeholder_email")}
                                                        value={values.phone}
                                                        onChange={handleChange}
                                                        required
                                                        isValid={touched.phone && !errors.phone}
                                                        isInvalid={!!errors.phone}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.phone}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                            <button
                                                type="submit"
                                                style={{marginTop: "10px"}}
                                                className="gi-btn-2"
                                                name="subscribe"
                                            >
                                                {t("newsletter_button_subscribe")}
                                            </button>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewsletterModal;
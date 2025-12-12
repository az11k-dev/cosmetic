import {Col, Form, Row, Button} from "react-bootstrap";
import {
    FaMobileAlt,
    FaGlobeAmericas,
    FaMapMarkerAlt, FaTelegram,
} from "react-icons/fa";
import {useState} from "react";
import {useTranslation} from "react-i18next";

// --- КОНФИГУРАЦИЯ TELEGRAM ---
// 1. Замени на свой токен бота
const TELEGRAM_BOT_TOKEN = "8231848673:AAGufSiOI32ASRWeRUzOQ-AOKh2sMsUzZVw";
// 2. Замени на ID чата, куда придет сообщение (твой личный или группы)
const TELEGRAM_CHAT_ID = "7963820017";
// ------------------------------
const lang = localStorage.getItem("i18nextLng");
const Contact = () => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        message: "",
    });
    const [submitMessage, setSubmitMessage] = useState(""); // Для сообщений о статусе
    const {t} = useTranslation("contacts");

    // Обработчик изменения полей формы
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Функция отправки сообщения в Telegram
    const sendToTelegram = async (data) => {
        const messageText = `
*Новая заявка с формы контактов*
👤 **Имя:** ${data.fullName}
📧 **Email:** ${data.email}
📞 **Телефон:** ${data.phone}
💬 **Сообщение:** ${data.message}
        `.trim(); // Форматируем сообщение в Markdown

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: messageText,
                    parse_mode: "Markdown", // Используем Markdown для форматирования
                }),
            });

            if (response.ok) {
                return {success: true, message: "Сообщение успешно отправлено!"};
            } else {
                const errorData = await response.json();
                console.error("Telegram API Error:", errorData);
                return {success: false, message: `Ошибка отправки: ${errorData.description || 'Неизвестная ошибка'}`};
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            return {success: false, message: "Произошла сетевая ошибка. Пожалуйста, попробуйте позже."};
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitMessage(""); // Сброс предыдущих сообщений

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true); // Установка валидации

        // Если форма валидна, отправляем данные
        const result = await sendToTelegram(formData);

        if (result.success) {
            setSubmitMessage("✅ Success!");
            setFormData({fullName: "", email: "", phone: "", message: ""}); // Очистка формы
            setValidated(false); // Сброс состояния валидации
        } else {
            setSubmitMessage(`❌ Ошибка: ${result.message}`);
        }
    };

    return (
        <>
            <section className="gi-contact padding-tb-40">
                <div className="container">
                    <div className="section-title-2">
                        <h2 className="gi-title">
                            {t("firstText")}
                        </h2>
                        <p>
                            {t("secondText")}
                        </p>
                    </div>
                    {/* ... (Ваша существующая разметка с контактными данными) ... */}
                    <Row className="gi-contact-detail m-tb-minus-12">
                        <Col sm={6} lg={4} className="p-tp-12">
                            <div className="gi-box">
                                <div className="detail">
                                    <div className="icon">
                                        <i className="fa fa-telegram" aria-hidden="true">
                                            <FaTelegram/>
                                        </i>
                                    </div>
                                    <div className="info">
                                        <h3 className="title">{t("website")}</h3>
                                        <p style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 5
                                        }}>
                                            <i className="fa fa-telegram" aria-hidden="true">
                                                <FaTelegram/>
                                            </i>{" "}
                                            <a href="https://t.me/your_beautypoint">BEAUTY POINT</a>
                                        </p>
                                    </div>
                                </div>
                                <div className="space"></div>
                            </div>
                        </Col>

                        <Col sm={6} lg={4} className="p-tp-12">
                            <div className="gi-box">
                                <div className="detail">
                                    <div className="icon">
                                        <i className="fa fa-mobile" aria-hidden="true">
                                            <FaMobileAlt/>
                                        </i>
                                    </div>
                                    <div className="info">
                                        <h3 className="title">{t("contact")}</h3>
                                        <p style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 5
                                        }}>
                                            <i className="fa fa-mobile" aria-hidden="true">
                                                <FaMobileAlt/>
                                            </i>{" "}
                                            <a href="tel:+998990996050">+998 99 099 60 50</a>
                                        </p>
                                    </div>
                                </div>
                                <div className="space"></div>
                            </div>
                        </Col>

                        <Col sm={6} lg={4} className="p-tp-12 m-auto">
                            <div className="gi-box">
                                <div className="detail">
                                    <div className="icon">
                                        <i className="fa fa-map-marker" aria-hidden="true">
                                            <FaMapMarkerAlt/>
                                        </i>
                                    </div>
                                    <div className="info">
                                        <h3 className="title">{t("address")}</h3>
                                        <p>
                                            <i className="fa fa-map-marker" aria-hidden="true">
                                                <FaMapMarkerAlt/>
                                            </i>{" "}
                                            {lang === "ru" ? "Мирабадский район, Ул Авлие-ота 63А" : "Mirobod tumani, Avliyo ota ko‘chasi 63A"}
                                            <br/>
                                            {lang === "ru" ? "Юнус Абад 13 квартал, дом 4" : "Yunusobod 13-kvartal, 4-uy"}
                                        </p>
                                    </div>
                                </div>
                                <div className="space"></div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="p-t-80">
                        <Col md={6}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.7271261750943!2d69.2763114!3d41.293042899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8acf5d8da733%3A0x2fcf5f9eefedbf25!2s77VG%2B7G4%2C%20Avliyoota%20Street%2063%2C%20100015%2C%20Tashkent!5e0!3m2!1sen!2s!4v1765534794672!5m2!1sen!2s"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </Col>
                        <Col md={6}>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="form-group">
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="fname"
                                        name="fullName" // Добавлено поле `name`
                                        placeholder={t("fullName")}
                                        required
                                        value={formData.fullName} // Привязка к состоянию
                                        onChange={handleChange} // Обработка изменений
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter Full Name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="form-group">
                                    <Form.Control
                                        type="email"
                                        className="form-control"
                                        id="umail"
                                        name="email" // Добавлено поле `name`
                                        placeholder={t("email")}
                                        required
                                        value={formData.email} // Привязка к состоянию
                                        onChange={handleChange} // Обработка изменений
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter correct username.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="form-group">
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        name="phone" // Добавлено поле `name`
                                        placeholder={t("phone")}
                                        required
                                        value={formData.phone} // Привязка к состоянию
                                        onChange={handleChange} // Обработка изменений
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter 10-12 digit number.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="form-group">
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        name="message" // Добавлено поле `name`
                                        rows={3}
                                        placeholder={t("message")}
                                        required
                                        value={formData.message} // Привязка к состоянию
                                        onChange={handleChange} // Обработка изменений
                                    ></textarea>
                                    <Form.Control.Feedback type="invalid">
                                        {lang === "ru" ? "Пожалуйста, введите сообщение." : "Iltimos, xabarni kiriting."}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit" className="gi-btn-2">
                                    {lang === "ru" ? "Отправить" : "Yuborish"}
                                </Button>
                                {/* Поле для отображения статуса отправки */}
                                {submitMessage && (
                                    <p style={{
                                        marginTop: '10px',
                                        fontWeight: 'bold',
                                        color: submitMessage.startsWith('❌') ? 'red' : 'green'
                                    }}>
                                        {submitMessage}
                                    </p>
                                )}
                            </Form>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    );
};

export default Contact;
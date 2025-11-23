import React, {useState} from "react";
import {Col, Form, Row, Button} from "react-bootstrap";
import {
    FaEnvelope,
    FaMobileAlt,
    FaGlobeAmericas,
    FaMapMarkerAlt,
} from "react-icons/fa";

// --- КОНФИГУРАЦИЯ TELEGRAM ---
// 1. Замени на свой токен бота
const TELEGRAM_BOT_TOKEN = "8231848673:AAGufSiOI32ASRWeRUzOQ-AOKh2sMsUzZVw";
// 2. Замени на ID чата, куда придет сообщение (твой личный или группы)
const TELEGRAM_CHAT_ID = "7963820017";
// ------------------------------

const Contact = () => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        message: "",
    });
    const [submitMessage, setSubmitMessage] = useState(""); // Для сообщений о статусе

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
                            Get in <span>Touch</span>
                        </h2>
                        <p>
                            Please select a topic below related to you inquiry. If you don t
                            fint what you need, fill out our contact form.
                        </p>
                    </div>
                    {/* ... (Ваша существующая разметка с контактными данными) ... */}
                    <Row className="gi-contact-detail m-tb-minus-12">
                        <Col sm={6} lg={4} className="p-tp-12">
                            <div className="gi-box">
                                <div className="detail">
                                    <div className="icon">
                                        <i className="fa fa-envelope" aria-hidden="true">
                                            <FaEnvelope/>
                                        </i>
                                    </div>
                                    <div className="info">
                                        <h3 className="title">Mail & Website</h3>
                                        <p>
                                            <i className="fa fa-envelope" aria-hidden="true">
                                                <FaEnvelope/>
                                            </i>{" "}
                                            mail.example@gmail.com
                                        </p>
                                        <p>
                                            <i className="fa fa-globe" aria-hidden="true">
                                                <FaGlobeAmericas/>
                                            </i>{" "}
                                            www.yourdomain.com
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
                                        <h3 className="title">Contact</h3>
                                        <p>
                                            <i className="fa fa-mobile" aria-hidden="true">
                                                <FaMobileAlt/>
                                            </i>{" "}
                                            (+91)-9876XXXXX
                                        </p>
                                        <p>
                                            <i className="fa fa-mobile" aria-hidden="true">
                                                <FaMobileAlt/>
                                            </i>{" "}
                                            (+91)-987654XXXX
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
                                        <h3 className="title">Address</h3>
                                        <p>
                                            <i className="fa fa-map-marker" aria-hidden="true">
                                                <FaMapMarkerAlt/>
                                            </i>{" "}
                                            Ruami Mello Moraes Filho, 987 - Salvador - MA,
                                            40352, Brazil.
                                        </p>
                                    </div>
                                </div>
                                <div className="space"></div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="p-t-80">
                        <Col md={6}>
                            <iframe src="//maps.google.com/maps?q=-12.942227,-38.480291&z=15&output=embed"></iframe>
                        </Col>
                        <Col md={6}>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="form-group">
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="fname"
                                        name="fullName" // Добавлено поле `name`
                                        placeholder="Full Name"
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
                                        placeholder="Email"
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
                                        placeholder="Phone"
                                        pattern="^\d{10,12}$"
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
                                        placeholder="Message"
                                        required
                                        value={formData.message} // Привязка к состоянию
                                        onChange={handleChange} // Обработка изменений
                                    ></textarea>
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter Message.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit" className="gi-btn-2">
                                    Submit
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
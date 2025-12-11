import {useEffect, useState, useCallback} from "react";
import Badge from "react-bootstrap/Badge";
import {motion, AnimatePresence} from "framer-motion";

// Базовый URL для API
const API_BASE_URL = "https://admin.beauty-point.uz/api/promocode/check";

/**
 * Компонент для ввода и применения дисконтного купона/промокода
 * @param {object} props
 * @param {function} props.onDiscountApplied - Колбэк, вызываемый при изменении скидки
 */
const DiscountCoupon = ({onDiscountApplied}: any) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isBtnVisible, setIsBtnVisible] = useState(true);
    const [couponCode, setCouponCode] = useState("");
    const [discountValue, setDiscountValue] = useState(0); // Значение скидки (сумма или процент)
    const [discountType, setDiscountType] = useState("amount"); // Тип скидки: 'amount' или 'percentage'
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

    // Получение языка из localStorage
    const lang = localStorage.getItem("i18nextLng");

    // Мемоизированный колбэк для применения скидки
    const applyDiscount = useCallback(() => {
        // Мы передаем объект с типом и значением, чтобы родительский компонент мог
        // правильно рассчитать итоговую скидку (сумма или процент)
        onDiscountApplied({
            value: discountValue,
            type: discountType,
            errorMessage: errorMessage,
            code: couponCode
        });
    }, [onDiscountApplied, discountValue, discountType]);

    // Эффект для вызова колбэка при изменении скидки
    useEffect(() => {
        applyDiscount();
    }, [applyDiscount]);

    const toggleCoupon = () => {
        setIsVisible(prev => !prev);
    };
    const token = localStorage.getItem("authToken");

    /**
     * Обработчик применения скидки - отправка запроса на API
     */
    const handleApplyDiscount = async () => {
        if (couponCode === "") {
            setErrorMessage(lang === "ru" ? "Поле промокода не может быть пустым" : "Promokod bo'sh bo'lishi mumkin emas");
            setDiscountValue(0);
            return;
        }

        setIsLoading(true);
        setErrorMessage("");
        setDiscountValue(0);

        try {
            const response = await fetch(`${API_BASE_URL}?promocode=${couponCode}`, {
                headers: {"Authorization": `Bearer ${token}`}
            });

            const data = await response.json();
            // Проверка на ошибки HTTP (например, 404, 500)
            if (!response.ok) {
                let errorMsg = lang === "ru" ? "Неизвестная ошибка сервера" : "Noma'lum server xatosi";

                if (response.status === 422 && data && data.message) {
                    // Если статус 422 и в теле ответа есть сообщение (message),
                    // используем его как текст ошибки.
                    // Если API возвращает ошибки валидации в другом поле (например, 'errors'),
                    // то нужно адаптировать эту часть.
                    errorMsg = data.message;
                } else if (response.status === 422) {
                    // Случай 422, но без поля 'message'
                    errorMsg = lang === "ru" ? "Неверный или недействительный промокод" : "Noto'g'ri yoki yaroqsiz promokod";
                } else {
                    // Другие HTTP ошибки (404, 500 и т.д.)
                    errorMsg = `${lang === "ru" ? "Ошибка HTTP" : "HTTP xatosi"}! Status: ${response.status}`;
                }

                setErrorMessage(errorMsg);
                setDiscountValue(0);
                setIsBtnVisible(true);
                setIsLoading(false); // Завершаем загрузку здесь
                return; // Прерываем выполнение, если ответ неуспешный
            }

            if (data.status === true && data.data && data.data.promocode) {
                const promo = data.data.promocode;

                // Проверяем, что промокод еще действителен
                const expiresAt = promo.expires_at ? new Date(promo.expires_at) : null;
                if (expiresAt && expiresAt < new Date()) {
                    setErrorMessage(lang === "ru" ? "Срок действия промокода истёк" : "Promokodning amal qilish muddati tugagan");
                    setIsBtnVisible(true);
                    return;
                }

                // Определяем тип и значение скидки
                let newDiscountValue = 0;
                let newDiscountType = "amount"; // По умолчанию 'amount'

                if (promo.discount_percentage !== null) {
                    // Если есть процентная скидка
                    newDiscountValue = parseFloat(promo.discount_percentage);
                    newDiscountType = "percentage";
                } else if (promo.discount_amount !== null) {
                    // Иначе используем фиксированную сумму
                    newDiscountValue = parseFloat(promo.discount_amount);
                    newDiscountType = "amount";
                }

                if (newDiscountValue > 0) {
                    setDiscountValue(newDiscountValue);
                    setDiscountType(newDiscountType);
                    setErrorMessage("");
                    setIsBtnVisible(false);
                } else {
                    // Промокод действителен, но скидка 0
                    setErrorMessage(lang === "ru" ? "Промокод не дает скидку" : "Promokod chegirma bermaydi");
                    setDiscountValue(0);
                    setIsBtnVisible(true);
                }

            } else {
                // Сервер ответил, но status: false (промокод не найден/недействителен)
                // Предполагаем, что сервер должен возвращать осмысленное сообщение в случае ошибки,
                // но в данном случае выводим общее сообщение.
                setErrorMessage(lang === "ru" ? "Неверный или недействительный промокод" : "Noto'g'ri yoki yaroqsiz promokod");
                setDiscountValue(0);
                setIsBtnVisible(true);
            }
        } catch (error) {
            console.error("Error applying discount:", error);
            // Ошибка сети или другая техническая ошибка
            setErrorMessage(lang === "ru" ? "Ошибка подключения к серверу. Попробуйте позже." : "Serverga ulanishda xato. Keyinroq urinib ko'ring.");
            setDiscountValue(0);
            setIsBtnVisible(true);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Обработчик удаления купона
     */
    const handleRemoveCoupon = () => {
        setCouponCode("");
        setDiscountValue(0);
        setDiscountType("amount"); // Сброс типа скидки
        setIsVisible(false);
        setIsBtnVisible(true);
        setErrorMessage("");
    };

    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
            }}>
                <span className="text-left">{lang === "ru" ? "Промокод:" : "Promokod:"}</span>
                <span className="text-right" style={{
                    marginRight: "10px",
                    marginTop: "10px"
                }}>
                    <a className="gi-cart-coupan"
                       onClick={toggleCoupon}>
                        {isBtnVisible ? (lang === "ru" ? "Ввести" : "Kiritish") : (lang === "ru" ? "Изменить" : "O'zgartirish")}
                    </a>
                </span>
            </div>

            <AnimatePresence>
                {(isVisible && isBtnVisible) && (
                    <motion.div className="gi-cart-coupan-content d-block"
                                initial={{height: 0, opacity: 0}}
                                animate={{height: "auto", opacity: 1}}
                                exit={{height: 0, opacity: 0}}
                                transition={{duration: 0.4}}
                    >
                        <form className="gi-cart-coupan-form" name="gi-cart-coupan-form" onSubmit={(e) => {
                            e.preventDefault();
                            handleApplyDiscount();
                        }}>
                            <input style={{
                                minWidth: "200px"
                            }} className="gi-coupan" type="text" value={couponCode}
                                   onChange={(e) => setCouponCode(e.target.value.toUpperCase())} // Приводим к верхнему регистру
                                   required
                                   placeholder={lang === "ru" ? "Введите промокод" : "Promokodni kiriting"}
                                   name="gi-coupan"/>
                            <button className="gi-btn-2" type="button" name="apply"
                                    onClick={handleApplyDiscount}
                                    disabled={isLoading} // Блокируем кнопку во время загрузки
                            >
                                {isLoading
                                    ? (lang === "ru" ? "Загрузка..." : "Yuklanmoqda...")
                                    : (lang === "ru" ? "Подтвердить" : "Tasdiqlash")}
                            </button>
                        </form>
                    </motion.div>
                )}
                {!isBtnVisible && (
                    <motion.span style={{position: "relative", marginTop: "10px", display: "inline-block"}}
                                 initial={{height: 0, opacity: 0}}
                                 animate={{height: "auto", opacity: 1}}
                                 exit={{height: 0, opacity: 0}}
                                 transition={{duration: 0.4}}
                    >
                        <Badge bg="success"> {/* Изменил цвет на success, т.к. купон применен */}
                            {couponCode}
                            <a onClick={handleRemoveCoupon}
                               style={{
                                   color: "white",
                                   paddingLeft: "5px",
                                   fontSize: "12px",
                                   cursor: "pointer", // Добавил курсор
                               }}
                               className="gi-select-cancel"
                            >×</a>
                        </Badge>
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Сообщения */}
            <AnimatePresence>
                {discountValue > 0 && (
                    <motion.div className="text-success mt-2" // Используем Bootstrap класс для успеха
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                    >
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DiscountCoupon;
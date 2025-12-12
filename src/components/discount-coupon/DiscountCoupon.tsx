import {useState} from "react";
import Badge from "react-bootstrap/Badge";
import {motion, AnimatePresence} from "framer-motion";
import {Check, Clock} from "lucide-react";

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
    const token = localStorage.getItem("authToken");

    // Удалены applyDiscount (useCallback) и useEffect для устранения бесконечного цикла.
    // onDiscountApplied теперь вызывается явно в обработчиках.

    const toggleCoupon = () => {
        setIsVisible(prev => !prev);
    };

    /**
     * Вспомогательная функция для вызова колбэка
     * @param value - значение скидки
     * @param type - тип скидки ('amount' или 'percentage')
     * @param error - сообщение об ошибке
     * @param code - примененный код
     */
    const callOnDiscountApplied = (value: number, type: string, error: string, code: string) => {
        onDiscountApplied({
            value: value,
            type: type,
            errorMessage: error,
            code: code
        });
    };

    /**
     * Обработчик применения скидки - отправка запроса на API
     */
    const handleApplyDiscount = async () => {
        if (couponCode === "") {
            const msg = lang === "ru" ? "Поле промокода не может быть пустым" : "Promokod bo'sh bo'lishi mumkin emas";
            setErrorMessage(msg);
            setDiscountValue(0);
            callOnDiscountApplied(0, "amount", msg, "");
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

            // ----------------------------------------------------
            // 1. Обработка HTTP ошибок
            // ----------------------------------------------------
            if (!response.ok) {
                let errorMsg = lang === "ru" ? "Неизвестная ошибка сервера" : "Noma'lum server xatosi";

                if (response.status === 422 && data && data.message) {
                    errorMsg = data.message;
                } else if (response.status === 422) {
                    errorMsg = lang === "ru" ? "Неверный или недействительный промокод" : "Noto'g'ri yoki yaroqsiz promokod";
                } else {
                    errorMsg = `${lang === "ru" ? "Ошибка HTTP" : "HTTP xatosi"}! Status: ${response.status}`;
                }

                setErrorMessage(errorMsg);
                setDiscountValue(0);
                setIsBtnVisible(true);
                setIsLoading(false);

                // Уведомляем родителя о сбросе скидки и ошибке
                callOnDiscountApplied(0, "amount", errorMsg, couponCode);
                return;
            }

            // ----------------------------------------------------
            // 2. Обработка успешного HTTP ответа
            // ----------------------------------------------------
            if (data.status === true && data.data && data.data.promocode) {
                const promo = data.data.promocode;

                // Проверка на срок действия
                const expiresAt = promo.expires_at ? new Date(promo.expires_at) : null;
                if (expiresAt && expiresAt < new Date()) {
                    const expiredMsg = lang === "ru" ? "Срок действия промокода истёк" : "Promokodning amal qilish muddati tugagan";
                    setErrorMessage(expiredMsg);
                    setIsBtnVisible(true);
                    callOnDiscountApplied(0, "amount", expiredMsg, couponCode);
                    return;
                }

                let newDiscountValue = 0;
                let newDiscountType = "amount";

                if (promo.discount_percentage !== null) {
                    newDiscountValue = parseFloat(promo.discount_percentage);
                    newDiscountType = "percentage";
                } else if (promo.discount_amount !== null) {
                    newDiscountValue = parseFloat(promo.discount_amount);
                    newDiscountType = "amount";
                }

                if (newDiscountValue > 0) {
                    // Успешное применение
                    setDiscountValue(newDiscountValue);
                    setDiscountType(newDiscountType);
                    setErrorMessage("");
                    setIsBtnVisible(false);

                    // Уведомляем родителя о примененной скидке
                    callOnDiscountApplied(newDiscountValue, newDiscountType, "", couponCode);

                } else {
                    // Промокод действителен, но скидка 0
                    const zeroDiscountMsg = lang === "ru" ? "Промокод не дает скидку" : "Promokod chegirma bermaydi";
                    setErrorMessage(zeroDiscountMsg);
                    setDiscountValue(0);
                    setIsBtnVisible(true);

                    // Уведомляем родителя о нулевой скидке и предупреждении
                    callOnDiscountApplied(0, "amount", zeroDiscountMsg, couponCode);
                }

            } else {
                // Сервер ответил, но status: false (промокод не найден/недействителен)
                const invalidCodeMsg = lang === "ru" ? "Неверный или недействительный промокод" : "Noto'g'ri yoki yaroqsiz promokod";
                setErrorMessage(invalidCodeMsg);
                setDiscountValue(0);
                setIsBtnVisible(true);

                // Уведомляем родителя о сбросе скидки и ошибке
                callOnDiscountApplied(0, "amount", invalidCodeMsg, couponCode);
            }
        } catch (error) {
            console.error("Error applying discount:", error);
            const connectionErrorMsg = lang === "ru" ? "Ошибка подключения к серверу. Попробуйте позже." : "Serverga ulanishda xato. Keyinroq urinib ko'ring.";
            setErrorMessage(connectionErrorMsg);
            setDiscountValue(0);
            setIsBtnVisible(true);

            // Уведомляем родителя о сбросе скидки и ошибке
            callOnDiscountApplied(0, "amount", connectionErrorMsg, couponCode);
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
        setDiscountType("amount");
        setIsVisible(false);
        setIsBtnVisible(true);
        setErrorMessage("");

        // Уведомляем родителя о полном сбросе скидки
        callOnDiscountApplied(0, "amount", "", "");
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
                                minWidth: "100px"
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
                                    ? <Clock/>
                                    : <Check/>}
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
                        <Badge bg="success">
                            {couponCode}
                            <a onClick={handleRemoveCoupon}
                               style={{
                                   color: "white",
                                   paddingLeft: "5px",
                                   fontSize: "12px",
                                   cursor: "pointer",
                               }}
                               className="gi-select-cancel"
                            >×</a>
                        </Badge>
                    </motion.span>
                )}
            </AnimatePresence>
        </>
    );
};

export default DiscountCoupon;
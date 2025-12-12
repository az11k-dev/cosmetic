import {useEffect, useState} from "react";
import TrackViewModal from "../model/TrackViewModal"; // Убедитесь, что путь верен
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const lang = localStorage.getItem("i18nextLng");

// Импортируем типы или определяем их здесь (как в OrderPage.types.ts)
interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: string;
    total: string;
    created_at: string;
    updated_at: string;
}

interface Order {
    id: number;
    user_id: number;
    total_amount: string;
    address: string;
    status: string; // Используем статус из API, например "100"
    created_at: string;
    items: OrderItem[];
    // ... остальные поля, которые вы используете
}

// Заменяем статус из вашего API на более понятное название для фронтенда
// Вам может потребоваться более сложная логика маппинга,
// но для примера используем эти значения
const API_STATUS_MAPPING: { [key: string]: string } = {
    "100": lang === "ru" ? "В ожидании" : "Kutilmoqda",
    "200": lang === "ru" ? "В ожидании" : "Kutilmoqda",
    "300": lang === "ru" ? "Успешно" : "Muvaffaqiyatli",
    "400": lang === "ru" ? "Отменено" : "Bekor qilingan",
    "500": lang === "ru" ? "Неуспешный" : "Muvaffaqiyatsiz",
};

const OrderPage = () => {
    const [show, setShow] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Вы можете удалить эту переменную, если она не используется в логике
    const [currentDate, setCurrentDate] = useState(
        new Date().toLocaleDateString("en-GB")
    );

    const API_URL = "https://admin.beauty-point.uz/api/myorders";
    // !!! ВАЖНО: Замените 'YOUR_AUTH_TOKEN' на реальный токен аутентификации пользователя
    const AUTH_TOKEN = `Bearer ${localStorage.getItem("authToken")}`;

    /**
     * Загружает данные о заказах с API
     */
    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    // Добавление заголовка авторизации
                    "Authorization": AUTH_TOKEN,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.status && result.data?.orders?.data) {
                setOrders(result.data.orders.data);
            } else {
                // Если API вернуло status: true, но нет данных
                setOrders([]);
            }
        } catch (e) {
            console.error("Failed to fetch orders:", e);
            setError("Не удалось загрузить заказы. Попробуйте снова.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        // Обновление даты при монтировании (если нужно)
        setCurrentDate(new Date().toLocaleDateString("ru-RU"));
    }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз при монтировании

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };

    // --- Вспомогательные функции для рендеринга ---

    /**
     * Преобразует статус API (например, "100") в отображаемый статус (например, "Pending")
     */
    const getDisplayStatus = (apiStatus: string) => {
        return API_STATUS_MAPPING[apiStatus] || "Unknown";
    };

    /**
     * Возвращает общее количество товаров в заказе
     */
    const getTotalQuantity = (items: OrderItem[]): number => {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    };

    /**
     * Компонент для отображения строк таблицы заказов
     */
    const OrdersTableBody = ({
                                 filterStatus,
                                 isCompleted,
                             }: {
        filterStatus: keyof typeof API_STATUS_MAPPING;
        isCompleted?: boolean;
    }) => {
        const filteredOrders = orders.filter(
            (order) => getDisplayStatus(order.status) === filterStatus
        );

        if (isLoading) {
            return (
                <tr>
                    <td colSpan={7} className="text-center">
                        <span style={{display: "block"}}>Загрузка заказов...</span>
                    </td>
                </tr>
            );
        }

        if (error) {
            return (
                <tr>
                    <td colSpan={7} className="text-center" style={{color: 'red'}}>
                        <span style={{display: "block"}}>{error}</span>
                    </td>
                </tr>
            );
        }

        if (filteredOrders.length === 0) {
            return (
                <tr>
                    <td colSpan={7} className="text-center">
                        <span style={{display: "block"}}>Заказов не найдено</span>
                    </td>
                </tr>
            );
        }

        return (
            <>
                {filteredOrders.map((data, index) => (
                    <tr
                        key={data.id} // Лучше использовать уникальный ID, а не index
                        style={{cursor: isCompleted ? "pointer" : "default"}}
                        onClick={isCompleted ? handleShow : undefined} // Только для завершенных
                        className="pro-gl-content"
                    >
                        <td scope="row">
                            <span>{data.id}</span>
                        </td>
                        {/* В API нет поля shippingMethod. Используем address в качестве примера. */}
                        <td>
                            <span>{data.address}</span>
                        </td>
                        <td>
                            <span>{getTotalQuantity(data.items)}</span>
                        </td>
                        <td>
              <span>
                {/* Форматируем дату из ISO-строки created_at */}
                  {new Date(data.created_at).toLocaleDateString("ru-RU")}
              </span>
                        </td>
                        <td>
                            {/* total_amount из API - это строка, не нужно добавлять $ вручную, если это узбекская валюта, но сохраняем $ для соответствия оригиналу */}
                            <span>{parseInt(data.total_amount).toLocaleString("en-US")} so'm</span>
                        </td>
                        <td>
                            {/* Отображаем статус, сопоставленный с API */}
                            <span className={isCompleted ? "out" : "avl"}>
                {getDisplayStatus(data.status)}
              </span>
                        </td>
                    </tr>
                ))}
            </>
        );
    };

    return (
        <>
            <section className="gi-faq padding-tb-40 gi-wishlist">
                <div className="container">
                    <div className="section-title-2">
                        <h2 className="gi-title">
                            {lang === "ru" ? "Список " : "Mahsulot "}
                            <span>{lang === "ru" ? "Товаров для заказа" : "Buyurtmalar roʻyxati"}</span>
                        </h2>
                        <p>{lang === "ru" ? "Ваш заказ — наш главный приоритет." : "Sizning mahsulotingizga buyurtma berish bizning ustuvor vazifamizdir."}</p>
                    </div>
                    <Row>
                        <Col md={12}>
                            <div className="gi-vendor-dashboard-card">
                                <div className="gi-vendor-card-header">
                                    <h5>{lang === "ru" ? "Ожидающие заказы" : "Kutilayotgan buyurtmalar"}</h5> {/* Заказы в ожидании */}
                                    <div className="gi-header-btn">
                                        <Link className="gi-btn-2" to="/">
                                            {lang === "ru" ? "Купить сейчас" : "Hozir xarid qiling"}
                                        </Link>
                                    </div>
                                </div>
                                <div className="gi-vendor-card-body">
                                    <div className="gi-vendor-card-table">
                                        <table className="table gi-table">
                                            <thead>
                                            <tr>
                                                <th scope="col">{lang === "ru" ? "Идентификатор заказа" : "Buyurtmalar identifikatori"}</th>
                                                <th scope="col">{lang === "ru" ? "Адрес" : "Manzil"}</th>
                                                <th scope="col">{lang === "ru" ? "Количество" : "Miqdori"}</th>
                                                <th scope="col">{lang === "ru" ? "Дата" : "Sana"}</th>
                                                <th scope="col">{lang === "ru" ? "Цена" : "Narxi"}</th>
                                                <th scope="col">{lang === "ru" ? "Статус" : "Status"}</th>
                                            </tr>
                                            </thead>
                                            <tbody className="wish-empt">
                                            <OrdersTableBody
                                                filterStatus={lang === "ru" ? "В ожидании" : "Kutilmoqda"}/>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            <section className="gi-faq padding-tb-40 gi-wishlist">
                <div className="container">
                    <Row>
                        <Col md={12}>
                            <div className="gi-vendor-dashboard-card">
                                <div className="gi-vendor-card-header">
                                    <h5>{lang === "ru" ? "Оформить заказы" : "Buyurtmalarni to'ldirish"}</h5> {/* Завершенные заказы */}
                                </div>
                                <div className="gi-vendor-card-body">
                                    <div className="gi-vendor-card-table">
                                        <table className="table gi-table">
                                            <thead>
                                            <tr>
                                                <th scope="col">{lang === "ru" ? "Идентификатор заказа" : "Buyurtmalar identifikatori"}</th>
                                                <th scope="col">{lang === "ru" ? "Адрес" : "Manzil"}</th>
                                                <th scope="col">{lang === "ru" ? "Количество" : "Miqdori"}</th>
                                                <th scope="col">{lang === "ru" ? "Дата" : "Sana"}</th>
                                                <th scope="col">{lang === "ru" ? "Цена" : "Narxi"}</th>
                                                <th scope="col">{lang === "ru" ? "Статус" : "Status"}</th>
                                            </tr>
                                            </thead>
                                            <tbody className="wish-empt">
                                            <OrdersTableBody
                                                filterStatus="Completed"
                                                isCompleted={true}
                                            />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            <TrackViewModal
                currentDate={currentDate}
                handleClose={handleClose}
                show={show}
            />
        </>
    );
};

export default OrderPage;
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {toggleSwitch} from "@/store/reducers/cartSlice";
import VendorEdit from "./VendorEdit";
import {Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from "@/context/AuthContext.tsx";

// --- Типы данных ---

// Интерфейс для данных профиля, которые мы получаем и отправляем
interface ProfileData {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
}

// Интерфейс для вложенной структуры ответа API
interface ProfileApiResponseData {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    telegram_user_id: string | null;
    email: string;
    phone_number: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

// Интерфейс для полной структуры ответа API
interface ProfileApiResponse {
    status: boolean;
    data: {
        status: boolean;
        data: ProfileApiResponseData;
    }
}


const ProfileEdit = () => {
    const API_PROFILE_URL = "https://admin.beauty-point.uz/api/profile";
    const API_UPDATE_URL = "https://admin.beauty-point.uz/api/profile/update";
    const {updateUser} = useAuth();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isSwitchOnFromRedux = useSelector(
        (state: RootState) => state.cart.isSwitchOn
    );

    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
    const [validated, setValidated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Для отслеживания загрузки данных
    const [apiError, setApiError] = useState<string | null>(null); // Для отображения ошибок при загрузке

    // Инициализация с пустыми строками
    const [formData, setFormData] = useState<ProfileData>({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
    });

    // **Функция для загрузки данных профиля**
    const fetchProfileData = async () => {
        setIsLoading(true);
        setApiError(null);
        const token = localStorage.getItem("authToken"); // **Замените на ваш токен**

        try {
            const response = await axios.get<ProfileApiResponse>(API_PROFILE_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.status && response.data.data.status) {
                const profileData = response.data.data.data;
                // Заполняем только те поля, которые мы используем в форме
                setFormData({
                    first_name: profileData.first_name,
                    last_name: profileData.last_name,
                    email: profileData.email,
                    phone_number: profileData.phone_number,
                });
            } else {
                // Обработка логической ошибки в ответе
                setApiError("Не удалось получить данные профиля.");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("Ошибка API при загрузке:", error.response.data);
                setApiError("Ошибка загрузки профиля: " + (error.response.data.message || "Сетевая ошибка."));
            } else {
                console.error("Неизвестная ошибка при загрузке:", error);
                setApiError("Произошла неизвестная ошибка при загрузке.");
            }
        } finally {
            setIsLoading(false);
        }
    };


    // **Загрузка данных при монтировании компонента**
    useEffect(() => {
        fetchProfileData();
    }, []);

    // Остальная логика переключателя и обработчиков
    useEffect(() => {
        setIsSwitchOn(isSwitchOnFromRedux);
    }, [isSwitchOnFromRedux]);

    const handleSwitchToggle = () => {
        dispatch(toggleSwitch());
    };

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Функция для отправки обновлений (осталась из предыдущего ответа)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);
        setIsSubmitting(true);
        setApiError(null);

        const token = localStorage.getItem("authToken");

        try {
            const response = await axios.post(API_UPDATE_URL, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200 || response.status === 201) {
                updateUser(formData);
                navigate("/user-profile");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("Ошибка API при обновлении:", error.response.data);
                alert("Ошибка обновления: " + (error.response.data.message || "Произошла ошибка."));
            } else {
                console.error("Неизвестная ошибка:", error);
                alert("Произошла неизвестная ошибка.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };


    if (isSwitchOn) {
        return <VendorEdit/>;
    }

    // Отображение статусов загрузки и ошибки
    if (isLoading) {
        return (
            <div className="gi-register padding-tb-40">
                <div className="container">
                    <p>Загрузка данных профиля...</p>
                </div>
            </div>
        );
    }

    if (apiError) {
        return (
            <div className="gi-register padding-tb-40">
                <div className="container">
                    <p style={{color: 'red'}}>Ошибка: {apiError}. Пожалуйста, попробуйте позже.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <section className="gi-register padding-tb-40">
                <div className="container">
                    <div className="section-title-2">
                        <h2 className="gi-title">
                            Edit Profile<span></span>
                        </h2>
                        <p>Best place to buy and sell digital products.</p>
                    </div>
                    <div className="row">
                        <div className="gi-register-wrapper">
                            <div className="gi-register-container">
                                <div className="gi-register-form">
                                    <Form
                                        noValidate
                                        validated={validated}
                                        className="gi-blog-form"
                                        action="#"
                                        method="post"
                                        onSubmit={handleSubmit}
                                    >
                    <span className="gi-register-wrap gi-register-half">
                      <label>First Name*</label>
                      <Form.Group>
                        <Form.Control
                            type="text"
                            name="first_name"
                            placeholder="Enter your first name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter First Name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </span>
                                        <span className="gi-register-wrap gi-register-half">
                      <label>Last Name*</label>
                      <Form.Group>
                        <Form.Control
                            type="text"
                            name="last_name"
                            placeholder="Enter your last name"
                            required
                            value={formData.last_name}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter Last Name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </span>
                                        <span
                                            style={{marginTop: "10px"}}
                                            className="gi-register-wrap gi-register-half"
                                        >
                      <label>Email*</label>
                      <Form.Group>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter your email add..."
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter correct email.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </span>
                                        <span
                                            style={{marginTop: "10px"}}
                                            className="gi-register-wrap gi-register-half"
                                        >
                      <label>Phone Number*</label>
                      <Form.Group>
                        <Form.Control
                            type="text"
                            name="phone_number"
                            placeholder="Enter your phone number"
                            pattern="^\+?\d{9,15}$"
                            required
                            value={formData.phone_number}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter a valid phone number (9-15 digits, optionally with +).
                        </Form.Control.Feedback>
                      </Form.Group>
                    </span>

                                        <span
                                            style={{justifyContent: "end", marginTop: "10px"}}
                                            className="gi-register-wrap gi-register-btn"
                                        >
                      <button className="gi-btn-1" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save"}
                      </button>
                    </span>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProfileEdit;
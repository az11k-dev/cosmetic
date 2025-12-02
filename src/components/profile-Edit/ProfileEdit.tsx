// ProfileEdit.tsx (С локализацией i18n)

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {toggleSwitch} from "@/store/reducers/cartSlice";
import VendorEdit from "./VendorEdit";
import {Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from "@/context/AuthContext.tsx";

// --- i18next ИМПОРТЫ ---
import { useTranslation, Trans } from "react-i18next";
// -----------------------

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
    // Инициализируем t
    const { t } = useTranslation("profileEdit");

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
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);

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
        const token = localStorage.getItem("authToken");

        try {
            const response = await axios.get<ProfileApiResponse>(API_PROFILE_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.status && response.data.data.status) {
                const profileData = response.data.data.data;
                setFormData({
                    first_name: profileData.first_name,
                    last_name: profileData.last_name,
                    email: profileData.email,
                    phone_number: profileData.phone_number,
                });
            } else {
                // 📢 Локализация ошибки
                setApiError(t("error_failed_fetch"));
            }
        } catch (error) {
            let errorMessage = t("error_network_unknown");

            if (axios.isAxiosError(error) && error.response) {
                console.error("Ошибка API при загрузке:", error.response.data);
                // 📢 Локализация ошибки
                errorMessage = error.response.data.message || t("error_network_unknown");
            } else {
                console.error("Неизвестная ошибка при загрузке:", error);
            }
            // 📢 Локализация ошибки
            setApiError(t("error_loading_profile", { message: errorMessage }));
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

    // Функция для отправки обновлений
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
                // 📢 Уведомление об успехе (можно использовать showSuccessToast)
                navigate("/user-profile");
            }
        } catch (error) {
            let errorMessage = t("error_network_unknown");

            if (axios.isAxiosError(error) && error.response) {
                console.error("Ошибка API при обновлении:", error.response.data);
                errorMessage = error.response.data.message || t("error_network_unknown");
            } else {
                console.error("Неизвестная ошибка:", error);
            }
            // 📢 Локализация и отображение ошибки
            alert(t("error_update_generic", { message: errorMessage }));
        } finally {
            setIsSubmitting(false);
        }
    };


    if (isSwitchOn) {
        return <VendorEdit/>;
    }

    // 📢 Отображение статусов загрузки и ошибки
    if (isLoading) {
        return (
            <div className="gi-register padding-tb-40">
                <div className="container">
                    <p>{t("state_loading")}</p>
                </div>
            </div>
        );
    }

    if (apiError) {
        return (
            <div className="gi-register padding-tb-40">
                <div className="container">
                    <p style={{color: 'red'}}>
                        {/* Используем ключ с интерполяцией */}
                        <Trans i18nKey="state_error_generic" values={{ error: apiError }}>
                            Ошибка: {{apiError}}. Пожалуйста, попробуйте позже.
                        </Trans>
                    </p>
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
                            {/* 📢 Локализация заголовка */}
                            <Trans i18nKey="profile_edit_title">
                                {t("profile_edit_title")}<span></span>
                            </Trans>
                        </h2>
                        {/* 📢 Локализация подзаголовка */}
                        <p>{t("profile_edit_subtitle")}</p>
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
                      {/* 📢 Локализация метки */}
                        <label>{t("label_first_name")}</label>
                      <Form.Group>
                        <Form.Control
                            type="text"
                            name="first_name"
                            // 📢 Локализация плейсхолдера
                            placeholder={t("placeholder_first_name")}
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                          {/* 📢 Локализация валидации */}
                            {t("validation_first_name")}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </span>
                                        <span className="gi-register-wrap gi-register-half">
                      {/* 📢 Локализация метки */}
                                            <label>{t("label_last_name")}</label>
                      <Form.Group>
                        <Form.Control
                            type="text"
                            name="last_name"
                            // 📢 Локализация плейсхолдера
                            placeholder={t("placeholder_last_name")}
                            required
                            value={formData.last_name}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {/* 📢 Локализация валидации */}
                            {t("validation_last_name")}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </span>
                                        <span
                                            style={{marginTop: "10px"}}
                                            className="gi-register-wrap gi-register-half"
                                        >
                      {/* 📢 Локализация метки */}
                                            <label>{t("label_email")}</label>
                      <Form.Group>
                        <Form.Control
                            type="email"
                            name="email"
                            // 📢 Локализация плейсхолдера
                            placeholder={t("placeholder_email_add")}
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {/* 📢 Локализация валидации */}
                            {t("validation_email_correct")}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </span>
                                        <span
                                            style={{marginTop: "10px"}}
                                            className="gi-register-wrap gi-register-half"
                                        >
                      {/* 📢 Локализация метки */}
                                            <label>{t("label_phone_number")}</label>
                      <Form.Group>
                        <Form.Control
                            type="text"
                            name="phone_number"
                            // 📢 Локализация плейсхолдера
                            placeholder={t("placeholder_phone_number")}
                            pattern="^\+?\d{9,15}$"
                            required
                            value={formData.phone_number}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {/* 📢 Локализация валидации */}
                            {t("validation_phone_number")}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </span>

                                        <span
                                            style={{justifyContent: "end", marginTop: "10px"}}
                                            className="gi-register-wrap gi-register-btn"
                                        >
                      <button className="gi-btn-1" type="submit" disabled={isSubmitting}>
                        {/* 📢 Локализация кнопки, зависит от состояния */}
                          {isSubmitting ? t("btn_saving") : t("btn_save")}
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
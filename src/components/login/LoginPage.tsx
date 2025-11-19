// src/pages/LoginPage.tsx (Обновленный компонент БЕЗ Redux)

import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import {Container, Form} from "react-bootstrap";

import {showErrorToast, showSuccessToast} from "@/utility/toast";
import axios from "axios";

// 💡 ИМПОРТИРУЕМ НОВЫЙ ХУК useAuth
import {useAuth} from "@/context/AuthContext"; // Предполагая, что он находится по этому пути

const LOGIN_API_URL = "https://admin.beauty-point.uz/api/login";

const LoginPage = () => {
    const [loginField, setLoginField] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // 💡 ЗАМЕНА Redux Hooks: используем хук useAuth
    const {isAuthenticated, login} = useAuth(); // Получаем isAuthenticated и функцию login из контекста

    // Эффект остается для перенаправления
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // --- Логика валидации Form, если нужно
        const form = e.currentTarget as HTMLFormElement;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }
        // ---

        setLoading(true);

        try {
            const response = await axios.post(LOGIN_API_URL, {
                login: loginField,
                password: password,
            });

            // Извлекаем "user" и "token" из "response.data.data"
            const {user, token} = response.data.data;

            login(token, user);

            showSuccessToast("Login Successful!");
            navigate("/");

        } catch (error) {
            console.error("Login Error:", error);

            const errorResponse = axios.isAxiosError(error) && error.response;
            const apiErrorMessage = errorResponse?.data?.data?.message || errorResponse?.data?.message;
            const errorMessage = apiErrorMessage || "An unexpected error occurred. Please try again.";

            showErrorToast(errorMessage);

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Breadcrumb title={"Login Page"}/>
            <section className="gi-login padding-tb-40">
                <Container>
                    <div className="section-title-2">
                        <h2 className="gi-title">
                            Login<span></span>
                        </h2>
                        <p>Get access to your Orders, Wishlist and Recommendations.</p>
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
                          <label>Phone Number / Login*</label>
                        <Form.Group>
                          <Form.Control
                              type="text"
                              name="login"
                              value={loginField}
                              onChange={(e) => setLoginField(e.target.value)}
                              placeholder="Enter your phone number..."
                              required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please Enter your login/phone number.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </span>

                                            <span
                                                style={{marginTop: "24px"}}
                                                className="gi-login-wrap"
                                            >
                        <label>Password*</label>
                        <Form.Group>
                          <Form.Control
                              type="password"
                              name="password"
                              min={6}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter your password"
                              required
                          />
                          <Form.Control.Feedback type="invalid">
                            Password must be at least 6 characters
                          </Form.Control.Feedback>
                        </Form.Group>
                      </span>

                                            <span className="gi-login-wrap gi-login-fp">
                        <label>
                          <Link to="/forgot-password">Forgot Password?</Link>
                        </label>
                      </span>
                                            <span className="gi-login-wrap gi-login-btn">
                        <span>
                          <Link to="/register" className="">
                            Create Account?
                          </Link>
                        </span>
                        <button
                            className="gi-btn-1 btn"
                            type="submit"
                            disabled={loading}
                        >
                          {loading ? "Logging In..." : "Login"}
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
                                        "/assets/img/common/login.png"
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
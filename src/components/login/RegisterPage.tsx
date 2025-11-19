import {useRef} from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import {Form} from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import {useNavigate, Link} from "react-router-dom";
// 💡 ИМПОРТИРУЕМ НОВЫЙ ХУК useAuth
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
    const {Formik} = formik;
    const formikRef = useRef<any>(null);
    const navigate = useNavigate();

    // 💡 ИСПОЛЬЗУЕМ useAuth ДЛЯ ПОЛУЧЕНИЯ ФУНКЦИИ LOGIN
    const {login} = useAuth(); // Получаем функцию login из контекста

    // 1. Yup Validation Schema (без изменений)
    const schema = yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup
            .string()
            .email("Invalid email address")
            .required("Email is required"),
        phoneNumber: yup
            .string()
            .matches(/^[\d\s()+-]{5,20}$/, "Invalid phone number format")
            .required("Phone number is required"),
        password: yup
            .string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: yup
            .string()
            .required("Confirm password is required")
            .oneOf([yup.ref("password")], "Passwords must match"),
    });

    // 2. Начальные значения (без изменений)
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    };

    // 3. Обновленная функция отправки (теперь использует login из Context)
    const registerUser = async (values: typeof initialValues) => {
        const payload = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            phone_number: values.phoneNumber,
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
                const {user, token, message} = (data as RegisterSuccessResponse).data;

                console.log("Registration successful:", message);

                login(token, user);

                // 3. Перенаправление
                navigate("/");
                // --------------------------------------

            } else {
                // --- ОБРАБОТКА ОШИБОК API ---
                const errorData = data as RegisterErrorResponse;
                const errorMessage = errorData.data.message || "Registration failed. Please check the form.";

                console.error("Registration failed:", errorData);
                alert(`Registration Error: ${errorMessage}`);

                if (errorData.data.errors) {
                    console.error("Validation Errors:", errorData.data.errors);
                }
                // -----------------------------
            }
        } catch (error) {
            console.error("Network or submission error:", error);
            alert("A network error occurred. Please try again.");
        }
    };

    const onSubmit = async (values: typeof initialValues) => {
        await registerUser(values);
    };

    return (
        <>
            <Breadcrumb title={"Register Page"}/>
            <section className="gi-register padding-tb-40">
                <div className="container">
                    <div className="section-title-2">
                        <h2 className="gi-title">
                            Register<span></span>
                        </h2>
                        <p>Best place to buy and sell digital products.</p>
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
                                                        <label htmlFor="firstname">First Name*</label>
                                                        <Form.Group>
                                                          <Form.Control
                                                              type="text"
                                                              name="firstName"
                                                              placeholder="Enter your first name"
                                                              value={values.firstName}
                                                              onChange={handleChange}
                                                              isInvalid={!!errors.firstName}
                                                              required
                                                          />
                                                            {errors.firstName &&
                                                                typeof errors.firstName === "string" && (
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errors.firstName}
                                                                    </Form.Control.Feedback>
                                                                )}
                                                        </Form.Group>
                                                  </span>
                                                    {/* Last Name */}
                                                    <span className="gi-register-wrap gi-register-half">
                                                        <label>Last Name*</label>
                                                        <Form.Group>
                                                          <Form.Control
                                                              type="text"
                                                              name="lastName"
                                                              placeholder="Enter your last name"
                                                              required
                                                              value={values.lastName}
                                                              onChange={handleChange}
                                                              isInvalid={!!errors.lastName}
                                                          />
                                                            {errors.lastName &&
                                                                typeof errors.lastName === "string" && (
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errors.lastName}
                                                                    </Form.Control.Feedback>
                                                                )}
                                                        </Form.Group>
                                                  </span>
                                                    {/* Email */}
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
                                                        <label>Phone Number*</label>
                                                        <Form.Group>
                                                          <Form.Control
                                                              type="text"
                                                              name="phoneNumber"
                                                              placeholder="Enter your phone number"
                                                              required
                                                              value={values.phoneNumber}
                                                              onChange={handleChange}
                                                              isInvalid={!!errors.phoneNumber}
                                                          />
                                                            {errors.phoneNumber &&
                                                                typeof errors.phoneNumber === "string" && (
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errors.phoneNumber}
                                                                    </Form.Control.Feedback>
                                                                )}
                                                        </Form.Group>
                                                  </span>
                                                    {/* Password */}
                                                    <span
                                                        style={{marginTop: "10px"}}
                                                        className="gi-register-wrap gi-register-half"
                                                    >
                                                        <label>Password*</label>
                                                        <Form.Group>
                                                          <Form.Control
                                                              type="password"
                                                              name="password"
                                                              placeholder="Enter your password"
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
                                                        <label>Confirm Password*</label>
                                                        <Form.Group>
                                                          <Form.Control
                                                              type="password"
                                                              name="confirmPassword"
                                                              placeholder="Enter your Conform password"
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
                                                          Already have an account?
                                                          <Link to="/login">Login</Link>
                                                        </span>
                                                        <button className="gi-btn-1" type="submit">
                                                          Register
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
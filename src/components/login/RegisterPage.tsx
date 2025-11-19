import {useRef} from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import {useDispatch} from "react-redux";
import {Form} from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import {login} from "@/store/reducers/registrationSlice"; // Предположим, что это используется для локального входа после регистрации
import {useNavigate, Link} from "react-router-dom";
// Убраны: useCountries, useStates, useCities, City, Country, State

const API_URL = "http://beauty.loc/api/register"; // Константа для URL API

const RegisterPage = () => {
    const {Formik} = formik;
    const formikRef = useRef<any>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Оставим, если используется для сохранения состояния входа

    // 1. Обновленная Yup Validation Schema (убраны поля адреса)
    const schema = yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup
            .string()
            .email("Invalid email address")
            .required("Email is required"),
        // Обновил regex для номера телефона, чтобы он соответствовал формату +998901234567,
        // но оставил твою исходную длину (14) с более гибким regex
        phoneNumber: yup
            .string()
            .matches(/^[\d\s()+-]{5,20}$/, "Invalid phone number format") // Более общий regex для международного номера
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

    // 2. Обновленные начальные значения (убраны поля адреса)
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        // Убраны: address, country, state, city, postCode
    };

    // 3. Убраны: formData, handleSelectChange, filteredCountryData, filteredStateData, filteredCityData

    // 4. Обновленная функция отправки (теперь отправляет данные на API)
    const registerUser = async (values: typeof initialValues) => {
        // Подготовка данных в формате, ожидаемом API
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
                    // Добавь здесь любые другие необходимые заголовки (например, Accept)
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Registration successful:", data);
                // Логика после успешной регистрации:
                // Например, сохранение токена и данных пользователя, затем навигация
                // dispatch(login(data.user)); // Если API возвращает данные пользователя
                navigate("/"); // Перенаправление на главную страницу
            } else {
                // Обработка ошибок API (например, неверный email, слабый пароль)
                console.error("Registration failed:", data);
                alert(`Registration Error: ${data.message || 'Check your data.'}`);
            }
        } catch (error) {
            console.error("Network or submission error:", error);
            alert("A network error occurred. Please try again.");
        } finally {
            // Опционально: сброс формы после попытки, независимо от успеха
            // if (formikRef.current) {
            //     formikRef.current.resetForm();
            // }
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
                                                              // Убрал твой pattern="^\d{12,15}$" для более гибкого
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
                                                              // Убрал твой pattern="^\d{6,12}$"
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
                                                              // Убрал твой pattern="^\d{6,12}$"
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
                                                    {/* УДАЛЕНЫ поля: Address, Country, State, City, Post Code */}

                                                    {/* reCAPTCHA (оставлен, если нужен для стилей/разметки) */}
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
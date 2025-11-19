import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import {Container, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {login} from "@/store/reducers/registrationSlice"; // Assuming this handles setting user/auth state
import {RootState} from "@/store";
import {showErrorToast, showSuccessToast} from "@/utility/toast";
import axios from "axios"; // 👈 Import axios for API calls

const LOGIN_API_URL = "http://beauty.loc/api/login"; // 👈 Define your API URL

const LoginPage = () => {
    // 💡 Changed from email to login, as the API expects a 'login' field (phone number)
    const [loginField, setLoginField] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false); // 👈 Added loading state for API call

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Use Redux state to check if the user is authenticated
    const isAuthenticated = useSelector(
        (state: RootState) => state.registration.isAuthenticated
    );

    // 👈 Removed the useEffect that fetched local registration data, as it's no longer needed.

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e: React.FormEvent) => { // 👈 Changed function to async
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        setValidated(true); // Always set validated to show immediate feedback

        // Perform basic client-side check if the form is valid (e.g., fields are filled)
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return; // Stop if client-side validation fails
        }

        // Set loading state before making the API call
        setLoading(true);

        try {
            // 💡 API Call to the backend
            const response = await axios.post(LOGIN_API_URL, {
                login: loginField, // Use loginField state
                password: password,
            });

            // Assuming a successful response means authentication is successful
            // The API response might contain a token or user data (response.data)
            const userDataFromApi = response.data;

            // 💡 Dispatch the login action with the data received from the API
            // You might need to update your Redux `login` action to handle the actual API response structure (e.g., token, user object).
            dispatch(login(userDataFromApi));

            showSuccessToast("Login Successful!");

            // Optional: Store token or essential user info (like the token) in localStorage if needed for subsequent requests
            // localStorage.setItem("authToken", userDataFromApi.token);

        } catch (error) {
            console.error("Login Error:", error);
            // 💡 Handle API errors (e.g., 401 Unauthorized, Network Error)

            // Axios error handling: Check for the specific error response from the server
            const errorMessage = axios.isAxiosError(error) && error.response
                ? error.response.data.message || "Invalid login or password."
                : "An unexpected error occurred. Please try again.";

            showErrorToast(errorMessage);

        } finally {
            setLoading(false); // Reset loading state
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
                                            onSubmit={handleLogin} // 💡 Use onSubmit on Form and call handleLogin
                                            action="#"
                                            method="post"
                                        >
                      <span className="gi-login-wrap">
                        {/* 💡 Label changed from Email Address to Login/Phone Number */}
                          <label>Phone Number / Login*</label>
                        <Form.Group>
                          <Form.Control
                              type="text"
                              name="login" // 💡 Changed name to 'login'
                              value={loginField} // 💡 Use loginField state
                              onChange={(e) => setLoginField(e.target.value)} // 💡 Use setLoginField
                              placeholder="Enter your phone number..." // 💡 Updated placeholder
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
                            // 💡 Removed onClick, Form onSubmit handles the submission
                            className="gi-btn-1 btn"
                            type="submit"
                            disabled={loading} // 👈 Disable button while loading
                        >
                          {loading ? "Logging In..." : "Login"} {/* 👈 Loading text */}
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
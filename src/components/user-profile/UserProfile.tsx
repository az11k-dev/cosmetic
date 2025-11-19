import {Col, Row} from "react-bootstrap";
import VendorSidebar from "../vendor-sidebar/VendorSidebar";
import {useNavigate, Link} from "react-router-dom";

// 💡 ИМПОРТИРУЕМ НОВЫЙ ХУК useAuth И ТИПЫ
import {useAuth, UserState} from "@/context/AuthContext"; // Предполагая, что он находится по этому пути

const UserProfile = () => {
    // 💡 Используем useAuth для получения состояния аутентификации и данных пользователя
    const {isAuthenticated, user} = useAuth();
    const navigate = useNavigate();

    // 💡 ПРОВЕРКА АУТЕНТИФИКАЦИИ (используя isAuthenticated из Context)
    if (!isAuthenticated) {
        return (
            <div className="container">
                <p>
                    Please <Link to="/login">login</Link> or <Link to="/register">register</Link>{" "}
                    to view this page.
                </p>
            </div>
        );
    }

    // 💡 ПРОВЕРКА ЗАГРУЗКИ ДАННЫХ (user должен быть заполнен, если isAuthenticated = true)
    if (!user) {
        // Это должно быть редкостью, если Context работает правильно, 
        // но служит защитой, пока данные загружаются из localStorage.
        return <div>Loading user data...</div>;
    }

    // Теперь мы используем 'user' напрямую
    const userData: UserState = user;

    const handleSubmit = (e: any) => {
        e.preventDefault();
        navigate("/profile-edit");
    };

    return (
        <>
            <section className="gi-vendor-profile padding-tb-40">
                <div className="container">
                    <Row className="mb-minus-24px">
                        <VendorSidebar/>
                        <Col lg={9} md={12} className="mb-24">
                            <Row>
                                <div className="container">
                                    <div className="gi-vendor-cover">
                    <span
                        style={{float: "inline-end", margin: "15px"}}
                        className="gi-register-wrap"
                    >
                      <button
                          onClick={handleSubmit}
                          style={{
                              backgroundColor: "white",
                              padding: "5px 10px",
                              borderRadius: "4px",
                          }}
                          className=""
                          type="submit"
                      >
                        Edit <i className="fi fi-rr-pencil"></i>
                      </button>
                    </span>
                                        <div className="detail">
                                            <img
                                                src={
                                                    // Предполагаем, что profilePhoto есть в UserState или нужно добавить
                                                    (userData as any).profilePhoto ||
                                                    "/assets/img/avatar/placeholder.jpg"
                                                }
                                                alt="vendor"
                                            />
                                            <div className="v-detail">
                                                <h5>
                                                    {userData.firstName} {userData.lastName}
                                                </h5>
                                                {/* <p>{userData.description}</p> - У вас не было этого поля в UserState */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                            <div className="gi-vendor-profile-card gi-vendor-profile-card">
                                <div className="gi-vendor-card-body">
                                    <div className="gi-vender-about-block">
                                        <h5>Account Information</h5>
                                    </div>
                                    <Row className="mb-minus-24px">
                                        <div className="col-md-6 col-sm-12 mb-24">
                                            <div className="gi-vendor-detail-block">
                                                <h6>E-mail address</h6>
                                                <ul>
                                                    <li>
                                                        <strong>Email 1 : </strong>
                                                        {userData.email}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 mb-24">
                                            <div className="gi-vendor-detail-block">
                                                <h6>Contact nubmer</h6>
                                                <ul>
                                                    <li>
                                                        <strong>Phone Nubmer 1 : </strong>
                                                        {userData.phoneNumber}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12 mb-24">
                                            <div className="gi-vendor-detail-block">
                                                <h6>Address</h6>
                                                <ul>
                                                    <li>
                                                        <strong>Home : </strong>
                                                        N/A.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    );
};

export default UserProfile;
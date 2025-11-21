import {Col, Row} from "react-bootstrap";
import VendorSidebar from "../vendor-sidebar/VendorSidebar";
import {useNavigate, Link} from "react-router-dom";

// 💡 ИМПОРТИРУЕМ НОВЫЙ ХУК useAuth И ТИПЫ
import {useAuth, UserData} from "@/context/AuthContext"; // Предполагая, что вы переименовали тип на UserData

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
    // Также TypeScript будет ругаться, если user - null, поэтому сужаем тип
    if (!user) {
        // Это должно быть редкостью, если Context работает правильно,
        // но служит защитой, пока данные загружаются.
        return <div>Loading user data...</div>;
    }

    // Теперь мы используем 'user' напрямую и приводим его к ожидаемому типу (UserData из AuthContext)
    const userData: UserData = user as UserData;

    const handleSubmit = (e: any) => {
        e.preventDefault();
        navigate("/profile-edit");
    };

    // 💡 Определение URL-адреса аватара
    const avatarUrl =
        userData.avatar && userData.avatar.length > 0
            ? userData.avatar
            : "/assets/img/avatar/placeholder.jpg";


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
                                                // 💡 ИСПОЛЬЗУЕМ ПОЛЕ 'avatar'
                                                src={avatarUrl}
                                                alt="vendor"
                                            />
                                            <div className="v-detail">
                                                <h5>
                                                    {/* 💡 ИСПОЛЬЗУЕМ ПОЛЯ 'first_name' И 'last_name' */}
                                                    {userData.first_name} {userData.last_name}
                                                </h5>
                                                {/* <p>{userData.description}</p> */}
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
                                                        <strong>Email: </strong>
                                                        {/* 💡 ИСПОЛЬЗУЕМ ПОЛЕ 'email' */}
                                                        {userData.email}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 mb-24">
                                            <div className="gi-vendor-detail-block">
                                                <h6>Contact number</h6>
                                                <ul>
                                                    <li>
                                                        <strong>Phone Number: </strong>
                                                        {/* 💡 ИСПОЛЬЗУЕМ ПОЛЕ 'phone_number' */}
                                                        {userData.phone_number}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12 mb-24">
                                            <div className="gi-vendor-detail-block">
                                                <h6>Username</h6>
                                                <ul>
                                                    <li>
                                                        <strong>Username : </strong>
                                                        {/* 💡 ДОБАВЛЯЕМ ОТОБРАЖЕНИЕ 'username' */}
                                                        {userData.username}
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
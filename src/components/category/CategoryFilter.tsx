import {Col, Row} from "react-bootstrap";
import "swiper/css";
import ItemCard from "../product-item/ItemCard";
import {Fade} from "react-awesome-reveal";
import Spinner from "../button/Spinner";
import {useEffect, useState, useMemo} from "react"; // ✨ Добавлен useMemo
import {useParams} from "react-router-dom";
// ✨ Импорт только для примера, t("deal1") не используется после изменений
const API_URL = "https://admin.beauty-point.uz/api/products";

const lang = localStorage.getItem("i18nextLng");

const CategoryFilter = () => {
    // 💡 t("deal1") удален, так как заголовок будет динамическим
    const {id} = useParams(); // 💡 ID категории из URL-параметров (строка)
    const categoryId = parseInt(id); // 💡 Преобразуем ID в число для сравнения

    const [allProducts, setAllProducts] = useState([]); // 💡 Все полученные товары
    const [categoryName, setCategoryName] = useState(null); // 💡 Имя текущей категории
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // 1. ✨ Логика получения данных и определения имени категории
    useEffect(() => {
        const fetchProducts = async () => {
            if (isNaN(categoryId)) {
                setError(lang === 'ru' ? "Неверный ID категории." : "Kategoriya identifikatori noto‘g‘ri");
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                const apiData = result?.data?.data || [];

                setAllProducts(apiData);

                // 💡 Поиск имени категории в полученных данных
                // Находим первый товар, у которого category_id совпадает, и берем его имя категории.
                const firstProductWithCategory = apiData.find(
                    (product) => product.category && product.category.id === categoryId
                );

                if (firstProductWithCategory) {
                    // 💡 Получаем имя категории в соответствии с текущим языком
                    const nameObject = firstProductWithCategory.category.name;
                    const name = nameObject[lang] || nameObject["ru"] || "Категория";
                    setCategoryName(name);
                } else {
                    setCategoryName(lang === "ru" ? "Товары не найдены" : "Hech qanday mahsulot topilmadi");
                }

                setError("");
            } catch (e) {
                console.error(e, "Failed to fetch products:");
                setError(lang === "ru" ? "Не удалось загрузить товары." : "Elementlarni yuklab bo'lmadi.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [categoryId]); // 💡 Зависимость от categoryId, чтобы перезапускать при смене ID

    // 2. ✨ Логика фильтрации товаров (используем useMemo для оптимизации)
    const filteredProducts = useMemo(() => {
        if (!allProducts || isNaN(categoryId)) return [];

        return allProducts.filter(
            (product) => product.category_id === categoryId
        );
    }, [allProducts, categoryId]);

    // --- Отображение состояния загрузки/ошибки ---
    if (error) {
        return <div>{lang === "ru" ? "Ошибка" : "Xato"}: {error}</div>;
    }

    if (isLoading)
        return (
            <div>
                <Spinner/>
            </div>
        );

    // --- Отображение, если нет товаров в категории ---
    if (filteredProducts.length === 0 && !isLoading) {
        return (
            <div className="container padding-tb-40">
                <h2 className="gi-title text-center">
                    {lang === "ru" ? "Товары в категории" : "Kategoriyadagi mahsulotlar"}: <span>{categoryName || "Неизвестная категория"}</span> {lang === "ru" ? "не найдены." : "topilmadi"}
                </h2>
            </div>
        );
    }


    // 3. ✨ Обновленный JSX
    return (
        <>
            <section
                className="gi-deal-section padding-tb-40 wow fadeInUp"
                data-wow-duration="2s"
            >
                <div className="container">
                    <Row className="overflow-hidden m-b-minus-24px">
                        <Col lg={12} className="gi-deal-section col-lg-12">
                            <div className="gi-products">
                                <div
                                    className="section-title"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                    data-aos-delay="200"
                                >
                                    <Fade triggerOnce direction="up" duration={2000} delay={200}>
                                        <div className="section-detail">
                                            {/* ✨ Отображаем динамическое имя категории */}
                                            <h2 className="gi-title">
                                                {lang === "ru" ? "Товары в категории" : "Kategoriyadagi mahsulotlar"}: <span>{categoryName || "Категория"}</span>
                                            </h2>
                                            {/* 💡 Здесь можно добавить другое описание, если нужно */}
                                        </div>
                                    </Fade>
                                </div>
                                <Fade
                                    triggerOnce
                                    direction="up"
                                    duration={2000}
                                    delay={200}
                                    className="gi-deal-block m-minus-lr-12"
                                >
                                    <div
                                        className="deal-slick-carousel gi-product-slider slick-initialized slick-slider">
                                        <div className="slick-list draggable">
                                            <div id={"special_grid_container"}>
                                                {/* ✨ Отображаем отфильтрованные товары */}
                                                {filteredProducts.map((item) => (
                                                    <ItemCard data={item} key={item.id}/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    );
};
export default CategoryFilter;
import {Tab, TabList, Tabs} from "react-tabs";
import {useState, useEffect} from "react";

const API_URL = "https://admin.beauty-point.uz/api/categories";

const AllCategories = ({selectedIndex, setSelectedIndex, handleProductClick, t}) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Загрузка данных из API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();

                if (result.status && result.data && result.data.data) {
                    setCategories(result.data.data);
                } else {
                    throw new Error("Invalid API response format");
                }
            } catch (err) {
                console.error("Failed to fetch categories:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Функция для получения имени категории на нужном языке
    const getCategoryName = (nameObject) => {
        // Логика определения текущего языка
        const currentLang = (localStorage.getItem('i18nextLng') === 'ru' || t('currentLang') === 'ru') ? 'ru' : 'uz';
        return nameObject[currentLang] || nameObject['ru'] || 'Category Name';
    };

    if (loading) {
        return <div className="gi-category-icon-block">Loading categories...</div>;
    }

    if (error) {
        return <div className="gi-category-icon-block">Error loading categories: {error}</div>;
    }

    if (categories.length === 0) {
        return null;
    }

    return (
        <div>
            <Tabs
                selectedIndex={selectedIndex}
                onSelect={(index) => setSelectedIndex(index)}
                className="gi-category-icon-block"
            >
                {/* Элемент меню, который показывает общий заголовок категорий */}
                <div className="gi-category-menu">
                    <div className="gi-category-toggle">
                        <i className="fi fi-rr-apps"></i>
                        <span className="text">{t("allCategories")}</span>
                        <i
                            className="fi-rr-angle-small-down d-1199 gi-angle"
                            aria-hidden="true"
                        ></i>
                    </div>
                </div>
                {/* Блок, содержащий только список категорий (TabList) */}
                <div className="gi-cat-dropdown" style={{width: "fit-content"}}>
                    <div className="gi-cat-tab">
                        <TabList>
                            <div
                                style={{
                                    background: "transparent",
                                    display: "grid",
                                    columnGap: "15px",
                                    gridTemplateRows: "repeat(5, 1fr)",
                                    gridAutoFlow: "column",
                                }}
                                className="gi-tab-list nav flex-column nav-pills me-3"
                                id="v-pills-tab"
                                role="tablist"
                                aria-orientation="vertical"
                            >
                                {/* 1. Динамическое создание вкладок (Tab) */}
                                {categories.map((category, index) => (
                                    <Tab key={category.id}>
                                        <button
                                            className={`tab nav-link ${
                                                selectedIndex === index ? "active" : ""
                                            }`}
                                            // При клике на вкладку вызываем обработчик
                                            onClick={() => {
                                                handleProductClick(index);
                                                // Опционально: здесь можно выполнить навигацию
                                                // navigate(`/category/${category.id}`);
                                            }}
                                            id={`v-pills-tab-${category.id}`}
                                            type="button"
                                            role="tab"
                                            aria-selected={selectedIndex === index}
                                            style={{
                                                padding: "10px 20px 10px 20px",
                                                marginBottom: "10px",
                                                width: "100%",
                                            }}
                                        >
                                            <img src={category?.upload?.file_url} alt="logo" style={{
                                                width: "20px",
                                                height: "20px",
                                                marginRight: "10px",
                                                borderRadius: "2px"
                                            }}/>
                                            {getCategoryName(category.name)}
                                        </button>
                                    </Tab>
                                ))}
                            </div>
                        </TabList>
                    </div>
                </div>
                {/* Удален блок TabPanel, так как нужно оставить только иконки и названия */}
            </Tabs>
        </div>
    );
};

export default AllCategories;
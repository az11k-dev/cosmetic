// src/hooks/useFetchProducts.ts

import {useState, useEffect} from 'react';
import {Item} from "@/types/data.types"; // Убедитесь, что у вас есть этот тип

// Интерфейс для ответа API
interface ApiResponse {
    status: boolean;
    data: {
        data: any[]; // Я буду использовать 'any' для простоты, но лучше использовать Product[]
    };
}

const API_URL = "https://admin.beauty-point.uz/api/products";

export const useFetchProducts = () => {
    const [data, setData] = useState<Item[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json: ApiResponse = await response.json();

                // Проверяем статус и извлекаем массив продуктов
                if (json.status && json.data && Array.isArray(json.data.data)) {
                    // 💡 ПРИМЕЧАНИЕ: Здесь может потребоваться преобразование данных,
                    // чтобы они соответствовали вашему типу Item,
                    // так как API возвращает вложенные данные (name: {uz, ru}, images: [])
                    const transformedData = json.data.data.map(item => ({
                        id: item.id,
                        // Выбор имени продукта (например, русское)
                        title: item.name.ru || item.name.uz || `Product ${item.id}`,
                        price: parseFloat(item.price),
                        newPrice: parseFloat(item.price), // В вашем случае price = newPrice
                        oldPrice: parseFloat(item.old_price),
                        rating: item.rating,
                        category: item.category ? item.category.name.ru : 'Uncategorized', // Предполагаем, что category - это объект с name.ru
                        sale: 'Sale', // Заглушка, если нет данных о скидке
                        weight: item.details.weight,
                        // Основное изображение (первое, где is_main=1, или просто первое)
                        image: item.images.find((img: any) => img.is_main)?.upload.file_url || (item.images[0] ? item.images[0].upload.file_url : '/path/to/default/image.jpg'),
                        // Второе изображение (если есть)
                        imageTwo: item.images[1] ? item.images[1].upload.file_url : (item.images[0] ? item.images[0].upload.file_url : '/path/to/default/image.jpg'),
                        // Добавьте другие поля, необходимые вашему ItemCard
                        // ...
                    }));

                    setData(transformedData as Item[]); // Приводим к типу Item[]
                } else {
                    throw new Error("Invalid API response structure or status false");
                }
            } catch (e) {
                const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
                setError(errorMessage);
                console.error("Error fetching products:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return {data, loading, error};
};
// src/components/product-item/ProductAll.tsx (Yangilangan versiya)

import { useEffect, useState, useMemo } from "react";
import { Col } from "react-bootstrap";
import ItemCard from "./ItemCard";
import { Product, ProductAllProps } from "@/types/data.types";
import Spinner from "../button/Spinner";

const API_URL = "https://admin.beauty-point.uz/api/products";

function ProductAll({ categoryId }: ProductAllProps) {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // [O'zgarish yo'q] Ma'lumotlarni API'dan olib kelish (Fetching data)
    useEffect(() => {
        const fetchProducts = async () => {
            // ... (API chaqiruvi kodi) ...
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP xatosi! status: ${response.status}`);
                }
                const result = await response.json();
                const apiData: Product[] = result?.data?.data || [];
                setAllProducts(apiData);
                setError(null);
            } catch (e) {
                console.error(e, "Mahsulotlarni olishda xato:");
                setError("Mahsulotlarni yuklashda xato yuz berdi.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);



    const filteredProducts = useMemo(() => {

        if (categoryId === null) {
            return allProducts;
        }
        const targetId = categoryId;
        return allProducts.filter(item => {
            const itemCategoryId = item.category_id ? Number(item.category_id) : null;
            return itemCategoryId === targetId;
        });
    }, [allProducts, categoryId]);

    //     // const filteredProducts = useMemo(() => {
    //     // 1. Qaysi kategoriya ID'si kirib kelayotganini tekshirish
    //     console.log("Qidirilayotgan Category ID:", categoryId);
    //
    //     if (categoryId === null) {
    //         console.log("-> Barcha Mahsulotlar qaytarildi.");
    //         return allProducts;
    //     }
    //
    //     const targetId = categoryId;
    //
    //     const result = allProducts.filter(item => {
    //         const itemCategoryId = item.category_id ? Number(item.category_id) : null;
    //
    //         // 2. Taqqoslashlarni tekshirish
    //         // Har bir mahsulotni solishtirish natijasini ko'rish
    //         if(itemCategoryId === targetId) {
    //             console.log(`MAHSULOT TOPILDI: ID ${item.id} -> Category ID: ${itemCategoryId}`);
    //         }
    //
    //         return itemCategoryId === targetId;
    //     });
    //
    //     // 3. Filtrlashdan keyingi natijani tekshirish
    //     console.log(`-> Filtrlash natijasi (Topilgan Mahsulotlar soni): ${result.length}`);
    //
    //     return result;
    //
    // }, [allProducts, categoryId]);

    // ... (Qolgan isLoading va error qismlari o'zgarishsiz) ...
    if (error) {
        return <div style={{ color: 'red', padding: '20px' }}>Xato: {error}</div>;
    }

    if (isLoading)
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <Spinner />
            </div>
        );

    if (filteredProducts.length === 0 && !isLoading) {
        return <p style={{ padding: '20px', textAlign: 'center' }}>Tanlangan kategoriyada mahsulot topilmadi.</p>;
    }



    return (
        <>
            {filteredProducts.map((item: Product) => (
                <Col
                    key={item.id}
                    md={4}
                    className="col-sm-6 gi-product-box gi-col-5"
                    style={{marginTop:"20px"}}
                >
                    <ItemCard data={item} />
                </Col>
            ))}
        </>
    );
}

export default ProductAll;
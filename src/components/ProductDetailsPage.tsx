// src/pages/ProductDetailsPage.tsx (Bu yangi komponent bo'lishi kerak)

import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Item } from "@/types/data.types"; // Item tipini import qilish

const ProductDetailsPage: React.FC = () => {
    // 1. useLocation yordamida uzatilgan state (ma'lumot) ni olamiz
    const location = useLocation();
    const { id } = useParams<{ id: string }>(); // URL dan ID ham olinadi

    // 2. Ma'lumotni location.state dan ajratib olamiz
    const productData = location.state?.productData as Item | undefined;

    // 3. Agar ma'lumot state orqali uzatilmagan bo'lsa (masalan, URL to'g'ridan-to'g'ri kiritilgan bo'lsa),
    // ID orqali serverdan yuklash mantiqini qo'shish tavsiya etiladi.
    if (!productData) {
        return <div>Mahsulot ID {id} bo'yicha ma'lumot yuklanmoqda... (yoki xato)</div>;
    }

    // 4. Endi barcha ma'lumotlardan foydalanishimiz mumkin:
    return (
        <div style={{ padding: '20px' }}>
            <h1>{productData.title}</h1>
            <p>ID: {productData.id}</p>
            <img src={productData.image} alt={productData.title} style={{ width: '200px' }} />
            <p>Narxi: ${productData.newPrice}</p>
            <p>Kategoriya: {productData.category}</p>
            {/* Va hokazo... */}
            <hr/>
            <h3>💡 Eslatma: Barcha ma'lumotlar (data) uzatildi!</h3>
        </div>
    );
};

export default ProductDetailsPage;
import React, { useCallback } from 'react';

// 💡 Props tipini yangilaymiz: endi Redux dispatch kerak emas
interface QuantitySelectorProps {
    id: string; // IDni string deb o'zgartirdik (Contextga mos)
    quantity: number;
    // Savat miqdorini o'zgartirish uchun kerakli funksiya
    onQuantityChange?: (id: string, newQuantity: number) => void;
    // Lokal miqdorni o'zgartirish uchun (masalan, mahsulot sahifasida)
    setQuantity?: React.Dispatch<React.SetStateAction<number>>;
}

// Bizning QuantitySelector endi Context/Redux bilan to'g'ridan-to'g'ri bog'liq emas
const QuantitySelector: React.FC<QuantitySelectorProps> = ({
                                                               id,
                                                               quantity,
                                                               setQuantity,
                                                               onQuantityChange, // Yangi prop
                                                           }) => {

    // Miqdorni kamaytirish funksiyasi
    const handleDecrease = useCallback(() => {
        const newQuantity = quantity - 1;

        if (newQuantity >= 0) {
            // Agar onQuantityChange prop berilgan bo'lsa (ya'ni, bu savat ichida ishlatilyapti)
            if (onQuantityChange) {
                // newQuantity = 0 bo'lsa ham yuboramiz. CartProvider uni o'chiradi.
                onQuantityChange(id, newQuantity);
            }
            // Agar setQuantity prop berilgan bo'lsa (ya'ni, bu lokal holatni o'zgartiryapti)
            else if (setQuantity) {
                // Lokal miqdor 1 dan kam bo'lmasligi kerak (yoki 0)
                setQuantity(newQuantity);
            }
        }
    }, [id, quantity, setQuantity, onQuantityChange]);


    // Miqdorni oshirish funksiyasi
    const handleIncrease = useCallback(() => {
        const newQuantity = quantity + 1;

        // Savatni yangilash
        if (onQuantityChange) {
            onQuantityChange(id, newQuantity);
        }
        // Lokal holatni yangilash
        else if (setQuantity) {
            setQuantity(newQuantity);
        }
    }, [id, quantity, setQuantity, onQuantityChange]);


    return (
        <>
            {/* Kamaytirish tugmasi */}
            <div
                style={{ margin: " 0 0 0 10px", cursor: "pointer" }}
                // Miqdor 1 dan katta bo'lsa yoki savatda bo'lsa (o'chirish uchun) kamaytirishni yoqamiz
                onClick={handleDecrease}
            >
                -
            </div>
            <input
                readOnly
                className="qty-input"
                type="text"
                name="gi-qtybtn"
                value={quantity}
            />
            {/* Oshirish tugmasi */}
            <div
                style={{ margin: " 0 10px 0 0", cursor: "pointer" }}
                onClick={handleIncrease}
            >
                +
            </div>
        </>
    );
};

export default QuantitySelector;